# URL Performance Metric Tracking

## Why
We needed a tool that could track the historical trend of a suite of webpages that belong to our application.
Several tools allow for immediate feedback but lack saving results for historical purposes. In addition, we could not find
a tool that correctly timed a SPA (Single Page Application) using Angular. If you do not use angular, please run 'npm start -- --angular false'
when executing tests instead.

## Getting started

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