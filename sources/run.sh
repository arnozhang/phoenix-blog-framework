mkdir -p dist/files
mkdir -p dist/files/image
mkdir -p dist/files/temp

sudo forever start ./dist/build/server/index.js
