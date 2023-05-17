#!/bin/bash

SERVICE_NAME=$1
ARTIFACT_NAME=$2

SERVICES_DIR=/opt/$USER/services
BUILDS_DIR=/opt/$USER/builds
TMP_BUILDS_DIR=/home/$USER/.tmp/builds

mkdir -p $BUILDS_DIR/$SERVICE_NAME/$ARTIFACT_NAME

# Extract the archive
tar -xzf $TMP_BUILDS_DIR/$SERVICE_NAME/$ARTIFACT_NAME.tar.gz \
    -C $BUILDS_DIR/$SERVICE_NAME/$ARTIFACT_NAME

# Remove symlink if exists
rm $SERVICES_DIR/$SERVICE_NAME || true

# Make symlink to point to latest code directory
ln -s $BUILDS_DIR/$SERVICE_NAME/$ARTIFACT_NAME/ $SERVICES_DIR/$SERVICE_NAME

rm $TMP_BUILDS_DIR/$SERVICE_NAME/$ARTIFACT_NAME.tar.gz