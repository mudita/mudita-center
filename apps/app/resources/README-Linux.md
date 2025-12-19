# Mudita Center for Linux

## Quick Start

### Option 1: Run AppImage directly

```bash
chmod +x Mudita-Center.AppImage
./Mudita-Center.AppImage
```

### Option 2: Run with AppImageLauncher integration

Use the launcher script for automatic desktop integration:

```bash
chmod +x launcher.sh
./launcher.sh Mudita-Center.AppImage
```

This will:
- Detect if AppImageLauncher is installed
- If not, download and install AppImageLauncher-Lite
- Integrate Mudita Center with your desktop environment
- Launch the application

### Option 3: Full installation

For a complete installation with desktop integration:

```bash
chmod +x install.sh
./install.sh
```

This will:
- Copy Mudita Center to `~/.local/share/mudita-center/`
- Create a symlink in `~/.local/bin/mudita-center`
- Add a desktop entry to your application menu
- Extract and install icons

For system-wide installation (requires root):

```bash
sudo ./install.sh --system
```

To uninstall:

```bash
./install.sh --uninstall
```

## Troubleshooting

### FUSE not available

If you see errors about FUSE, install it:

- **Ubuntu/Debian**: `sudo apt install fuse libfuse2`
- **Fedora**: `sudo dnf install fuse fuse-libs`
- **Arch**: `sudo pacman -S fuse2`
- **openSUSE**: `sudo zypper install fuse`

### Sandbox errors

If you encounter sandbox-related errors, try:

```bash
./Mudita-Center.AppImage --no-sandbox
```

Or set the environment variable:

```bash
MUDITA_SKIP_LAUNCHER=1 ./launcher.sh Mudita-Center.AppImage
```

### Extract and run mode

On systems without FUSE support, you can extract and run:

```bash
./Mudita-Center.AppImage --appimage-extract-and-run
```

Or set:

```bash
export APPIMAGE_EXTRACT_AND_RUN=1
./Mudita-Center.AppImage
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MUDITA_SKIP_LAUNCHER=1` | Skip AppImageLauncher, run directly |
| `LAUNCHER_CURL_TIMEOUT=60` | Timeout for downloads (seconds) |
| `LAUNCHER_CURL_RETRY=3` | Number of retry attempts |
| `APPIMAGE_EXTRACT_AND_RUN=1` | Run without FUSE |

## Requirements

- Linux x86_64 or ARM64
- FUSE (recommended) or kernel with SquashFS support
- GTK3 libraries

## Support

For issues and support, visit: https://github.com/mudita/mudita-center
