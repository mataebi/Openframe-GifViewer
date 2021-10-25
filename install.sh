#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Installing Openframe GIF Viewer..."

# Make sure FBpyGIF is installed and executable
which FBpyGIF > /dev/null
if [ $? -eq 0 ]; then
    echo "FBpyGIF is already installed."
else
    echo -e "\n***** Installing FBpyGIF"
    sudo apt install python3-pip
    sudo pip3 install fbpygif
fi
