#!/usr/bin/env bash

# -------------------------------------------------------------------
# Mudita Center Installation Script
#
# This script installs Mudita Center AppImage with desktop integration.
#
# Usage:
#   ./install.sh [--uninstall] [--system]
#
# Options:
#   --uninstall  Remove Mudita Center from the system
#   --system     Install system-wide (requires root)
# -------------------------------------------------------------------

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly APP_NAME="Mudita Center"
readonly APP_ID="com.mudita.center"
readonly APPIMAGE_NAME="Mudita-Center.AppImage"

# Installation directories
USER_INSTALL_DIR="${HOME}/.local/share/mudita-center"
USER_BIN_DIR="${HOME}/.local/bin"
USER_DESKTOP_DIR="${HOME}/.local/share/applications"
USER_ICON_DIR="${HOME}/.local/share/icons/hicolor"

SYSTEM_INSTALL_DIR="/opt/mudita-center"
SYSTEM_BIN_DIR="/usr/local/bin"
SYSTEM_DESKTOP_DIR="/usr/share/applications"
SYSTEM_ICON_DIR="/usr/share/icons/hicolor"

# Colors
if [[ -t 1 ]] && command -v tput >/dev/null 2>&1; then
  readonly RED="$(tput setaf 1 2>/dev/null || echo '')"
  readonly GREEN="$(tput setaf 2 2>/dev/null || echo '')"
  readonly YELLOW="$(tput setaf 3 2>/dev/null || echo '')"
  readonly BLUE="$(tput setaf 4 2>/dev/null || echo '')"
  readonly RESET="$(tput sgr0 2>/dev/null || echo '')"
else
  readonly RED="" GREEN="" YELLOW="" BLUE="" RESET=""
fi

log_info() { echo "${GREEN}[INFO]${RESET} $1"; }
log_warn() { echo "${YELLOW}[WARN]${RESET} $1" >&2; }
log_error() { echo "${RED}[ERROR]${RESET} $1" >&2; }
die() { log_error "$1"; exit "${2:-1}"; }

# Determine installation mode
SYSTEM_INSTALL=false
UNINSTALL=false

for arg in "$@"; do
  case "$arg" in
    --system) SYSTEM_INSTALL=true ;;
    --uninstall) UNINSTALL=true ;;
    -h|--help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Install or uninstall Mudita Center."
      echo ""
      echo "Options:"
      echo "  --system     Install system-wide (requires root)"
      echo "  --uninstall  Remove Mudita Center"
      echo "  -h, --help   Show this help message"
      exit 0
      ;;
  esac
done

# Set directories based on installation mode
if [[ "$SYSTEM_INSTALL" == "true" ]]; then
  if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
    die "System-wide installation requires root privileges. Use: sudo $0 --system"
  fi
  INSTALL_DIR="$SYSTEM_INSTALL_DIR"
  BIN_DIR="$SYSTEM_BIN_DIR"
  DESKTOP_DIR="$SYSTEM_DESKTOP_DIR"
  ICON_DIR="$SYSTEM_ICON_DIR"
else
  INSTALL_DIR="$USER_INSTALL_DIR"
  BIN_DIR="$USER_BIN_DIR"
  DESKTOP_DIR="$USER_DESKTOP_DIR"
  ICON_DIR="$USER_ICON_DIR"
fi

# Uninstall function
uninstall() {
  log_info "Uninstalling ${APP_NAME}..."

  # Remove symlink
  rm -f "${BIN_DIR}/mudita-center" 2>/dev/null || true

  # Remove desktop file
  rm -f "${DESKTOP_DIR}/${APP_ID}.desktop" 2>/dev/null || true

  # Remove icons
  for size in 16 24 32 48 64 128 256 512; do
    rm -f "${ICON_DIR}/${size}x${size}/apps/${APP_ID}.png" 2>/dev/null || true
  done

  # Remove installation directory
  if [[ -d "$INSTALL_DIR" ]]; then
    rm -rf "$INSTALL_DIR"
    log_info "Removed ${INSTALL_DIR}"
  fi

  # Update desktop database
  if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database "${DESKTOP_DIR}" 2>/dev/null || true
  fi

  log_info "${APP_NAME} has been uninstalled."
  exit 0
}

# Handle uninstall
if [[ "$UNINSTALL" == "true" ]]; then
  uninstall
fi

# Check if AppImage exists
if [[ ! -f "${SCRIPT_DIR}/${APPIMAGE_NAME}" ]]; then
  die "AppImage not found: ${SCRIPT_DIR}/${APPIMAGE_NAME}"
fi

log_info "Installing ${APP_NAME}..."

# Create directories
mkdir -p "$INSTALL_DIR"
mkdir -p "$BIN_DIR"
mkdir -p "$DESKTOP_DIR"

# Copy AppImage
log_info "Copying AppImage to ${INSTALL_DIR}..."
cp "${SCRIPT_DIR}/${APPIMAGE_NAME}" "${INSTALL_DIR}/"
chmod +x "${INSTALL_DIR}/${APPIMAGE_NAME}"

# Copy launcher script if exists
if [[ -f "${SCRIPT_DIR}/launcher.sh" ]]; then
  cp "${SCRIPT_DIR}/launcher.sh" "${INSTALL_DIR}/"
  chmod +x "${INSTALL_DIR}/launcher.sh"
fi

# Create symlink in bin directory
log_info "Creating symlink..."
ln -sf "${INSTALL_DIR}/${APPIMAGE_NAME}" "${BIN_DIR}/mudita-center"

# Extract icon from AppImage (if possible)
extract_icons() {
  local temp_dir
  temp_dir="$(mktemp -d)"

  # Try to extract the AppImage
  cd "$temp_dir"
  if "${INSTALL_DIR}/${APPIMAGE_NAME}" --appimage-extract "*.png" >/dev/null 2>&1 || \
     "${INSTALL_DIR}/${APPIMAGE_NAME}" --appimage-extract "usr/share/icons/*" >/dev/null 2>&1; then

    # Find and copy icons
    find squashfs-root -name "*.png" -path "*/icons/*" 2>/dev/null | while read -r icon; do
      local size
      size="$(echo "$icon" | grep -oP '\d+x\d+' | head -1)"
      if [[ -n "$size" ]]; then
        mkdir -p "${ICON_DIR}/${size}/apps"
        cp "$icon" "${ICON_DIR}/${size}/apps/${APP_ID}.png" 2>/dev/null || true
      fi
    done

    # Also try the main icon
    if [[ -f "squashfs-root/.DirIcon" ]]; then
      mkdir -p "${ICON_DIR}/256x256/apps"
      cp "squashfs-root/.DirIcon" "${ICON_DIR}/256x256/apps/${APP_ID}.png" 2>/dev/null || true
    fi
  fi

  cd - >/dev/null
  rm -rf "$temp_dir"
}

log_info "Extracting icons..."
extract_icons 2>/dev/null || log_warn "Could not extract icons from AppImage."

# Create desktop file
log_info "Creating desktop entry..."
cat > "${DESKTOP_DIR}/${APP_ID}.desktop" << EOF
[Desktop Entry]
Name=${APP_NAME}
Comment=Mudita Center - manage your Mudita devices
Exec=${INSTALL_DIR}/${APPIMAGE_NAME} %U
Icon=${APP_ID}
Terminal=false
Type=Application
Categories=Utility;System;
StartupWMClass=Mudita Center
MimeType=x-scheme-handler/mudita-center;
Keywords=mudita;phone;harmony;pure;
EOF

chmod +x "${DESKTOP_DIR}/${APP_ID}.desktop"

# Update desktop database
if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "${DESKTOP_DIR}" 2>/dev/null || true
fi

# Update icon cache
if command -v gtk-update-icon-cache >/dev/null 2>&1; then
  gtk-update-icon-cache -f -t "${ICON_DIR}" 2>/dev/null || true
fi

echo ""
log_info "${GREEN}${APP_NAME} has been installed successfully!${RESET}"
echo ""
echo "You can now:"
echo "  • Launch from your application menu"
echo "  • Run from terminal: ${BLUE}mudita-center${RESET}"
if [[ "$SYSTEM_INSTALL" != "true" ]]; then
  echo ""
  echo "Note: Make sure ${BLUE}${BIN_DIR}${RESET} is in your PATH."
  echo "Add this to your ~/.bashrc or ~/.zshrc:"
  echo "  ${YELLOW}export PATH=\"\$HOME/.local/bin:\$PATH\"${RESET}"
fi
echo ""
echo "To uninstall, run: ${YELLOW}$0 --uninstall${RESET}"
