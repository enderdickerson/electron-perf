# URL Performance Metric Tracking

## Why
We needed a tool that could track the historical trend of a suite of webpages that belong to our application.
Several tools allow for immediate feedback but lack saving results for historical purposes. In addition, we could not find
a tool that correctly timed a SPA (Single Page Application) using Angular. If you do not use angular, please run 'npm start -- --angular false'
when executing tests instead.

## Getting started

Java JRE is required.

run `NPM install`

create a `config.js` file at the root with the following (Refer to config.example.js):
  1.) A connectionString() function exported that returns your mongo connection string as a string.
  2.) An options() function exported that returns an object containing any options for connection to mongo.

## Running tests

Add any tests to the 'suite' collection on your mongodb. They should follow the format:
  {
    url: '', // A fully qualified URL
    wait: '', // Time to wait between runs of the same URL (useful for cache)
    runs: '', // How many times to run this url consecutively
  }

run `npm start`

## Reviewing results
All results will be posted in the `reports` collection in your mongodb instance

## Libraries
Performance testing is executed using [Protractor](http://www.protractortest.org/) and [Selenium](http://www.seleniumhq.org/projects/webdriver/).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
