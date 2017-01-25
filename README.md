# PortMatrix []()

This web application is a tool for managing network switching. It got created as 'Project 2' within the HSR CASFEE
course by Marco Endres and Peter Fuerholz.

## Table Of Contents
* [Specification](Specification.MD)
* [Usage](Usage.MD)


## Notable *Cool* Features

* Responsive network switching overview
* Infinite scrolling of the network switchings / lazy loading
* Sorting (by multiple columns) and searching network switchings


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


## Testing
Supported Testing:

_Frontend:_

* e2e  

_Backend:_

* Check REST-services:
  `$(npm bin)/jasmine-node .`
   To run only specific test, e.g.: `$(npm bin)/jasmine-node ./test/twoUsers-spec.js
   For these tests the server must be started before.



## Additional Packages
<dl>
  <dt>npm install --save ng2-bootstrap</dt>
  <dd>For collapsible pane, modal dialogs etc.</dd>
  <dt>npm install --save jquery</dt>
  <dd>Used for Bootstrap.</dd>
  <dt>npm install --save angular2-infinite-scroll</dt>
  <dd>Infinite scrolling of the network switchings.</dd>
  
</dl>

### At the server side:
<dl>
  <dt>npm install --save-dev frisby</dt>
  <dd>Needed for REST-service testing, see <a href="http://frisbyjs.com">Frisby</a></dd> 
  <dt>npm install --save-dev jasmine-node</dt>
  <dd>Needed by Frisby (see above).</dd>
  <dt>npm install --save-dev async</dt>
  <dd>Needed by Frisby to easily run one HTTP-command after the other. (See 
  <a href="http://caolan.github.io/async/">Async</a> and
  <a href="https://github.com/vlucas/frisby/issues/64">see comment by codeHatcher</a>)</dd>
  <dt>npm install --save jsonwebtoken</dt>
  <dd>Needed for authenticate (session-less) REST-calls.</dd>   
  
  <dt>npm install --save promise</dt>
  <dd>Needed????</dd>   
  
</dl>



## WebStorm Settings
