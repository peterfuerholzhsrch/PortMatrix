# PortMatrix []()

This web application is a tool for managing network switching. It got created as 'Project 2' within the HSR CASFEE
course by Marco Endres and Peter Fuerholz.

## Table Of Contents
* [Specification](Specification.MD)
* [Development](Development.MD)


## Installation / Setup
1. Download the two project PortMatrix and PortMatrixServer into the same base directory
2. Install all dependencies
  1. Do `cd PortMatrix`, `npm install`
  2. Do `cd PortMatrixServer`, `npm install`
2. Create dist of the PortMatrix: `$(npm bin)/ng build`
3. Before starting the server set environment variable:
  `PORTMATRIX_SMTP_CONFIG=smtps://portmatrix@neshendra.ch:<password>@asmtp.mail.hostpoint.ch`
  Ask peter.fuerholz@neshendra.ch for the password to use!
  Alternatively you can set another SMTP server using the scheme above.
4. Start the server: `npm run server`
5. _Optional:_ Load initial user, project and network switches: 
  Execute `runFillExampleData.sh`
6. Open browser on: http://localhost:4200
7. If you have run `runFillExampleData.sh` you can log in with following credentials: username: a@a.a, password: a


## Notable *Cool* Features

* UI is generally responsive 
* Infinite scrolling of the network switchings / lazy loading
* Sorting (by multiple columns) and searching network switchings
* Allows to invite more users into same project (by email)


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


