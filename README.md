# PortMatrix []()

This web application is a tool for managing network switching. It got created as 'Project 2' within the HSR CASFEE
course by Marco Endres and Peter Fuerholz.

## Table Of Contents
* [Specification](Specification.MD)
* [Development](Development.MD)
* [User Tests](UserTests.MD)

## Installation / Setup
1. Download the two project PortMatrix and [PortMatrixServer](https://github.com/peterfuerholzhsrch/PortMatrixServer) into the same base directory
2. Install all dependencies:
   Do `$ cd PortMatrix`, `$ npm install`
   Do `$ cd PortMatrixServer`, `$ npm install`
3. Before starting the server set environment variable:
   `PORTMATRIX_SMTP_CONFIG=smtps://portmatrix@neshendra.ch:<password>@asmtp.mail.hostpoint.ch`
   Ask peter.fuerholz@neshendra.ch for the password to use!
   Alternatively you can set another SMTP server using the scheme above.
4. Start the server: `$ npm run server` (or ./runServer.sh on Mac / *nix)
5. _Optional:_ Load initial user, project and network switches: 
   Execute `runFillExampleData.sh` on the server side (server must be running).
   This script creates:
   one user: a@a.a, password: a
   the user has one project and around 60 network switchings
6. Start the client with `npm run start` (or ./ngServeWithExpressBackend.sh on Mac / *nix)
   (Only needed for deployment: Create /dist of the PortMatrix: `$ $(npm bin)/ng build`)
7. Open browser on: http://localhost:4200
8. If you have run `runFillExampleData.sh` you can log in with following credentials: username: a@a.a, password: a
   Otherwise sign in with an email and preferred password.


## Notable *Cool* Features

* UI is generally responsive 
* Infinite scrolling of the network switchings / lazy loading
* Sorting (by multiple columns) and searching network switchings
* Allows to invite more users into same project (by email)
* Stylelinting for SCSS
* e2e tests with protractor run with: "npm run e2e"



## Technical Decisions

Here we write up our technical decisions (used frameworks, libraries, language levels, tools, etc.):

_Frontend:_

* TypeScript: YES 
* AngularJS 2: YES, (including CLI)
* Bootstrap: Where needed.

_Backend:_

* NodeJS / Express: YES
* NeDB: YES
* MongoDB and Mongoose: NO

_Common:_

* Security: JWT


