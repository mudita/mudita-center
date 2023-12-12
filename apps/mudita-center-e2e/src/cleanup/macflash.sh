#!/bin/bash
# Copyright (c) 2017-2021, Mudita Sp. z.o.o. All rights reserved.
# For licensing, see https://github.com/mudita/MuditaOS/LICENSE.md


IMAGE_FILE=""
OS_PARTITION_NAME="MUDITAOS"
PHONE_DEV=""

function get_phone_dev() {
	BLOCK_DEV="/dev/r"$(diskutil info $OS_PARTITION_NAME | grep "Part of Whole" | awk '{print $4}')
	echo ${BLOCK_DEV}
}

function unmount_muditaos_partition() {
	PART_NODE="/dev/"$(diskutil info $OS_PARTITION_NAME | grep "Part of Whole" | awk '{print $4}')
	diskutil unmountDisk $PART_NODE > /dev/null 2>&1
}

function eject_device() {
	diskutil eject $1
}

MAC_DD="gdd"

function test_if_gdd_installed() {
    if ! command -v $MAC_DD &> /dev/null; then
        echo "$MAC_DD command could not be found. Please, run macflash_setup.sh"
        exit 1
	fi
}

print_help() {
	echo "Usage: $0 -i image [-d device] [-h]"
	echo "    -i path to Pure/Bell image file"
	echo "    -d path do Pure/Bell block device (MSC)"
	echo "    -h print help"
	
	exit 1
}

if [ $# -lt 1 ]; then
    print_help
fi

while getopts "hi:d:" arg; do
	case "${arg}" in
		i)
			IMAGE_FILE=$OPTARG
			;;
		d)
			PHONE_DEV=$OPTARG
			;;
		h)
			print_help
			;;
		*)
			print_help
			;;
	esac
done

test_if_gdd_installed

if [ -z $PHONE_DEV ]; then
	PHONE_DEV=$(get_phone_dev)
fi

if [ ! -e $IMAGE_FILE ]; then
	echo "Image file $IMAGE_FILE does not exist"
	exit 1
fi

if [ ! -e $PHONE_DEV ]; then
	echo "Block device $PHONE_DEV does not exist"
	exit 1
fi

unmount_muditaos_partition

sleep 10

echo "Flashing $IMAGE_FILE to $PHONE_DEV..."

gdd if=$IMAGE_FILE of=$PHONE_DEV bs=1M conv=sparse status=progress

sleep 10

eject_device $PHONE_DEV
