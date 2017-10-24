# remove build files.
#
rm -rf ./dist/build


# webpack. build client tsx files.
#
webpack -p


# tsc. build server files.
#
tsc

# remove *.map files.
#
find -name *.map | xargs rm -f
