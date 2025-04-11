#!/bin/bash

echo "Building Angular Chrome Extension..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the Angular app
echo "Building Angular application..."
ng build --configuration production

# Ensure manifest.json is copied
echo "Copying manifest.json to dist folder..."
cp src/manifest.json dist/

# Create assets directory if it doesn't exist
echo "Setting up assets directory..."
mkdir -p dist/assets/icons

# Copy assets if they exist
if [ -d "src/assets" ]; then
  echo "Copying assets..."
  cp -R src/assets/* dist/assets/ 2>/dev/null || :
fi

echo "Build completed. The extension is ready in the 'dist' folder."
echo "To load it in Chrome, go to chrome://extensions, enable Developer Mode,"
echo "and click 'Load unpacked' to select the 'dist' directory." 