# Development

The original setup was generated using IntelliJ's AngularJS-CLI template.
See more under [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.
After the first project creation angular-cli got installed locally and
removed globally.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Testing

### Frontend:
* e2e
  Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
  Before running the tests make sure you are serving the app via `npm run start`.

* Unit tests:
  Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Backend:
* Check REST-services: <br/>
   `./runTest1-users.sh` (or `$(npm bin)/jasmine-node ./test/users-spec.js`) <br/>
   `runTest2-twoUsers.sameProject.sh` <br/>
   `runTest3-twoUsers.inheritAdmin.sh` <br/>
   `runTest4-loginLogout.sh` <br/>
   `runTest5-nwsws.sh` <br/>
   Do not try to run all tests together (`$(npm bin)/jasmine-node ./test) they have side effects!
   For these tests the server must be started before.


## Deploying to Github Pages
Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## Additional Packages
### At the client side:
<dl>
  <dt>npm install --save ng2-bootstrap</dt>
  <dd>For collapsible pane, modal dialogs etc.</dd>
  <dt>npm install --save jquery</dt>
  <dd>Used for Bootstrap.</dd>
  <dt>npm install --save angular2-infinite-scroll</dt>
  <dd>Infinite scrolling of the network switchings.</dd>
  <dt>npm install --save ng2-bootstrap-modal</dt>
  <dd>Simplifies the use of Bootstrap's modal dialogs</dd>
  <dt>npm install ng2-logger --save</dt>
  <dd>A logger implementation, see https://www.npmjs.com/package/ng2-logger</dd>
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
  <dd>For promises at server side</dd>
  <dt>npm install nodemailer --save</dt>
  <dd>for sending emails</dd>
  <dt>npm install winston --save</dt>
  <dd>A logger implementation, see https://blog.risingstack.com/node-js-logging-tutorial/</dd>
</dl>

## Deployment on Heroku
The application got deployed on Heroku: https://rocky-caverns-30136.herokuapp.com
Some information about this deployment:
* data has been populated by means of `runFillExampleData.sh` (thus one user a@a.a...)
* free account -> application gets hibernated and needs some time before getting ready
* user changes get lost every 24 hours
