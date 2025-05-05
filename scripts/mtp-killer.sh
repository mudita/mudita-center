#!/bin/bash

echo "Searching for MTP processes (libusb)..."
PIDS=$(lsof +c 0 2>/dev/null | grep -Ei 'libusb|IOUSBLib' | grep -vi 'node' | grep -vi 'electron' | awk '{print $2}' | sort -u)

if [ -z "$PIDS" ]; then
  echo "libusb / MTP processes - not found"
else 
  echo "Start killing processes:"
  for pid in $PIDS; do
    pname=$(ps -p $pid -o comm=)
    echo -n "$(basename "$pname"): PID: $pid" && kill -9 "$pid" && echo " ✔"
  done
fi

echo ""

echo "Start killing apps:"

APPS=(
  "Google Drive"
  "Dropbox"
  "Photos"
  "Image Capture"
  "OneDrive"
  "Android File Transfer"
  "PhotoSync"
  "WhatsApp"
  "Lightroom"
  "Preview"
)

for app in "${APPS[@]}"; do
  echo -n "$app: " && killall "$app" 2>/dev/null && echo "✔" || echo "✘"
done

exit 0
