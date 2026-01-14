#!/usr/bin/env bash

# -------------------------------------------------------------------
# Script: Automatically download and install AppImageLauncher Lite
# if not present, then launch your AppImage with system integration
# if possible.
#
# Supported distributions: Ubuntu, Debian, Fedora, Arch, openSUSE,
# and other Linux distributions with FUSE support.
#
# Usage:
#   ./launcher.sh path/to/Mudita-Center.AppImage
# -------------------------------------------------------------------

set -euo pipefail

# Constants
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_VERSION="1.1.0"
readonly CURL_TIMEOUT="${LAUNCHER_CURL_TIMEOUT:-60}"
readonly CURL_RETRY="${LAUNCHER_CURL_RETRY:-3}"

# Skip AppImageLauncher installation if set
readonly SKIP_LAUNCHER="${MUDITA_SKIP_LAUNCHER:-0}"

# Temporary directory (use dedicated variable to avoid conflicts)
LAUNCHER_TMPDIR=""

# Colors (only if terminal supports them)
if [[ -t 1 ]] && command -v tput >/dev/null 2>&1; then
  readonly RED="$(tput setaf 1 2>/dev/null || echo '')"
  readonly GREEN="$(tput setaf 2 2>/dev/null || echo '')"
  readonly YELLOW="$(tput setaf 3 2>/dev/null || echo '')"
  readonly RESET="$(tput sgr0 2>/dev/null || echo '')"
else
  readonly RED="" GREEN="" YELLOW="" RESET=""
fi

# Logging functions
log_info() {
  echo "${GREEN}[INFO]${RESET} $1"
}

log_warn() {
  echo "${YELLOW}[WARN]${RESET} $1" >&2
}

log_error() {
  echo "${RED}[ERROR]${RESET} $1" >&2
}

die() {
  log_error "$1"
  exit "${2:-1}"
}

# Cleanup function
cleanup() {
  if [[ -n "$LAUNCHER_TMPDIR" && -d "$LAUNCHER_TMPDIR" ]]; then
    rm -rf "$LAUNCHER_TMPDIR" 2>/dev/null || true
  fi
}

# Set up trap for cleanup
trap cleanup EXIT INT TERM

# Detect CPU architecture
get_architecture() {
  local arch
  arch="$(uname -m)"
  case "$arch" in
    x86_64|amd64)
      echo "x86_64"
      ;;
    aarch64|arm64)
      echo "aarch64"
      ;;
    armv7l|armhf)
      echo "armhf"
      ;;
    i686|i386)
      echo "i686"
      ;;
    *)
      echo "$arch"
      ;;
  esac
}

# Check if running as root (not recommended for AppImages)
check_root() {
  if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
    log_warn "Running as root is not recommended for AppImages."
    log_warn "Some features may not work correctly."
  fi
}

# Check for required dependencies
check_dependencies() {
  local missing_deps=()

  # Check for FUSE (required for AppImages)
  if ! command -v fusermount >/dev/null 2>&1 && ! command -v fusermount3 >/dev/null 2>&1; then
    if [[ ! -e /dev/fuse ]]; then
      missing_deps+=("fuse")
    fi
  fi

  if [[ ${#missing_deps[@]} -gt 0 ]]; then
    log_warn "Missing recommended dependencies: ${missing_deps[*]}"
    log_warn "AppImage may not run correctly without FUSE support."
    log_warn "Install with:"
    log_warn "  Ubuntu/Debian: sudo apt install fuse libfuse2"
    log_warn "  Fedora: sudo dnf install fuse fuse-libs"
    log_warn "  Arch: sudo pacman -S fuse2"
    log_warn "  openSUSE: sudo zypper install fuse"
  fi
}

# Check if download tool is available
get_download_command() {
  if command -v curl >/dev/null 2>&1; then
    echo "curl"
  elif command -v wget >/dev/null 2>&1; then
    echo "wget"
  else
    echo ""
  fi
}

# Download file using available tool
download_file() {
  local url="$1"
  local output="$2"
  local download_cmd

  download_cmd="$(get_download_command)"

  case "$download_cmd" in
    curl)
      curl -fsSL --connect-timeout "$CURL_TIMEOUT" --retry "$CURL_RETRY" -o "$output" "$url"
      ;;
    wget)
      wget --timeout="$CURL_TIMEOUT" --tries="$CURL_RETRY" -q -O "$output" "$url"
      ;;
    *)
      log_error "No download tool available (curl or wget required)."
      return 1
      ;;
  esac
}

# Check if FUSE is available
is_fuse_available() {
  # Check for fusermount command or /dev/fuse device
  if command -v fusermount >/dev/null 2>&1 || command -v fusermount3 >/dev/null 2>&1; then
    return 0
  fi
  if [[ -e /dev/fuse ]] && [[ -r /dev/fuse ]]; then
    return 0
  fi
  return 1
}

# Run AppImage directly without AppImageLauncher
run_direct() {
  log_info "Running AppImage directly..."

  local extra_args=()

  # If FUSE is not available, try extract-and-run mode
  if ! is_fuse_available; then
    log_warn "FUSE not available. Trying extract-and-run mode..."
    export APPIMAGE_EXTRACT_AND_RUN=1
  fi

  # Check for common Electron/Chromium sandbox issues
  # This is needed on some distros with strict kernel settings
  if [[ -f /proc/sys/kernel/unprivileged_userns_clone ]]; then
    local userns_clone
    userns_clone="$(cat /proc/sys/kernel/unprivileged_userns_clone 2>/dev/null || echo "1")"
    if [[ "$userns_clone" == "0" ]]; then
      log_warn "Unprivileged user namespaces are disabled. Using --no-sandbox."
      extra_args+=("--no-sandbox")
    fi
  fi

  # Try running the AppImage
  exec "$APPIMAGE" "${extra_args[@]}" "$@"
}

# Get AppImageLauncher download URL for current architecture
get_launcher_url() {
  local arch
  arch="$(get_architecture)"

  case "$arch" in
    x86_64)
      echo "https://github.com/TheAssassin/AppImageLauncher/releases/latest/download/appimagelauncher-lite-x86_64.AppImage"
      ;;
    aarch64)
      echo "https://github.com/TheAssassin/AppImageLauncher/releases/latest/download/appimagelauncher-lite-aarch64.AppImage"
      ;;
    *)
      log_warn "Architecture '$arch' may not be supported by AppImageLauncher-Lite."
      echo "https://github.com/TheAssassin/AppImageLauncher/releases/latest/download/appimagelauncher-lite-x86_64.AppImage"
      ;;
  esac
}

# Main script
main() {
  local appimage="${1:-}"

  # Handle special arguments
  case "${appimage}" in
    -h|--help)
      echo "Usage: $SCRIPT_NAME [OPTIONS] <path-to-AppImage>"
      echo ""
      echo "Automatically integrate and launch AppImages with system integration."
      echo ""
      echo "Options:"
      echo "  -h, --help     Show this help message"
      echo "  -v, --version  Show version information"
      echo ""
      echo "Environment variables:"
      echo "  MUDITA_SKIP_LAUNCHER=1       Skip AppImageLauncher, run directly"
      echo "  LAUNCHER_CURL_TIMEOUT=<sec>  Timeout for downloads (default: 60)"
      echo "  LAUNCHER_CURL_RETRY=<num>    Number of retry attempts (default: 3)"
      exit 0
      ;;
    -v|--version)
      echo "$SCRIPT_NAME version $SCRIPT_VERSION"
      exit 0
      ;;
  esac

  # Validate input
  if [[ -z "$appimage" ]]; then
    die "Usage: $SCRIPT_NAME <path-to-AppImage>"
  fi

  # Resolve to absolute path
  if [[ ! "$appimage" = /* ]]; then
    appimage="$(cd "$(dirname "$appimage")" && pwd)/$(basename "$appimage")"
  fi

  if [[ ! -f "$appimage" ]]; then
    die "File '$appimage' does not exist."
  fi

  # Export for use in functions
  export APPIMAGE="$appimage"

  # Pre-flight checks
  check_root
  check_dependencies

  # Make AppImage executable
  if ! chmod +x "$APPIMAGE" 2>/dev/null; then
    log_warn "Could not set executable permission on AppImage."
  fi

  # Skip AppImageLauncher if requested
  if [[ "$SKIP_LAUNCHER" == "1" ]]; then
    log_info "MUDITA_SKIP_LAUNCHER is set. Skipping AppImageLauncher."
    run_direct
  fi

  # Check for existing AppImageLauncher installations
  if command -v appimagelauncher >/dev/null 2>&1; then
    log_info "AppImageLauncher found in the system."
    exec appimagelauncher "$APPIMAGE"
  fi

  if command -v appimagelauncher-lite >/dev/null 2>&1; then
    log_info "AppImageLauncher-Lite found in the system."
    exec appimagelauncher-lite "$APPIMAGE"
  fi

  # Check for ail-cli (alternative AppImageLauncher command)
  if command -v ail-cli >/dev/null 2>&1; then
    log_info "AppImageLauncher CLI found in the system."
    exec ail-cli integrate "$APPIMAGE" && exec "$APPIMAGE"
  fi

  # No AppImageLauncher found - try to download and install
  log_info "AppImageLauncher not found. Attempting to download AppImageLauncher-Lite..."

  # Check if we have a download tool
  if [[ -z "$(get_download_command)" ]]; then
    log_warn "No download tool available (curl or wget). Skipping AppImageLauncher-Lite installation."
    run_direct
  fi

  # Create temporary directory
  LAUNCHER_TMPDIR="$(mktemp -d -t mudita-launcher.XXXXXX)" || {
    log_warn "Failed to create temporary directory."
    run_direct
  }

  local lite_path="$LAUNCHER_TMPDIR/appimagelauncher-lite.AppImage"
  local download_url
  download_url="$(get_launcher_url)"

  log_info "Downloading AppImageLauncher-Lite..."
  if ! download_file "$download_url" "$lite_path"; then
    log_warn "AppImageLauncher-Lite download failed."
    run_direct
  fi

  # Make downloaded file executable
  chmod +x "$lite_path" || {
    log_warn "Failed to set executable permission on AppImageLauncher-Lite."
    run_direct
  }

  log_info "Installing AppImageLauncher-Lite..."
  if ! "$lite_path" install 2>/dev/null; then
    log_warn "AppImageLauncher-Lite installation failed."
    run_direct
  fi

  # Check if installation was successful
  if command -v appimagelauncher-lite >/dev/null 2>&1; then
    log_info "Running Mudita Center with AppImageLauncher-Lite..."
    exec appimagelauncher-lite "$APPIMAGE"
  else
    log_warn "AppImageLauncher-Lite installation unsuccessful."
    run_direct
  fi
}

# Entry point
main "${1:-}"