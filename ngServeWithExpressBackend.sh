#! /bin/sh
#
# !!! for Linux and OS X !!!
#
# Run this script for developing client with real Express server:
# 1. start server in PortMatrixServer-project (npm run start)
# 2. run this script
#
# Now the web resources are loaded from lite-server while REST-calls get forwarded to the Express server in
# PortMatrixServer.

# see http://stackoverflow.com/questions/9679932/how-to-use-package-installed-locally-in-node-modules
alias npm-exec='PATH=$(npm bin):$PATH'

npm-exec ng serve --proxy-config proxy-conf.json

# To be sure that the proxy configuration works properly check to see 'Proxy created...' when executing this script.
# For example something like this:
#    Peters-MBP:PortMatrix pfu$ ./ngServeWithExpressBackend.sh
#    ** NG Live Development Server is running on http://localhost:4200. **
#           10% building modules 2/2 modules 0 active[HPM] Proxy created: /api  ->  http://localhost:3001
