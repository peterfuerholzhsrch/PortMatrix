# Usage

The original setup was generated using IntelliJ's AngularJS-CLI template.
See more under [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.
After the first project creation angular-cli got installed locally and
removed globally. (Angular-CLI is currently under heavy development with breaking changes.)

## Development server

Run `$(npm bin)/ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Testing

### Frontend:
* e2e
  Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
  Before running the tests make sure you are serving the app via `npm run start`.

* TODO OK???
  Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Backend:
* Check REST-services:
  `$(npm bin)/jasmine-node .`
   To run only specific test, e.g.: `$(npm bin)/jasmine-node ./test/twoUsers-spec.js
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
  <dd>Needed????</dd>

  <dt>npm install nodemailer --save</dt>
  <dd>for sending emails</dd>
  <dt>npm install winston --save</dt>
  <dd>A logger implementation, see https://blog.risingstack.com/node-js-logging-tutorial/</dd>
</dl>
