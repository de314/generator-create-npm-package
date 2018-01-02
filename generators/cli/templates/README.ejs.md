# <%= projectName %>

You should change this file!

[![NPM package](https://nodei.co/npm/<%= projectName %>.png)](https://www.npmjs.com/package/<%= projectName %>)

[![Build Status](https://travis-ci.org/<%= user.username %>/<%= projectName %>.svg?branch=master)](https://travis-ci.org/<%= user.username %>/<%= projectName %>)
[![Coverage Status](https://coveralls.io/repos/github/<%= user.username %>/<%= projectName %>/badge.svg?branch=master)](https://coveralls.io/github/<%= user.username %>/<%= projectName %>?branch=master)
[![dependencies Status](https://david-dm.org/<%= user.username %>/<%= projectName %>/status.svg)](https://david-dm.org/<%= user.username %>/<%= projectName %>)

## Demo

[![Try <%= projectName %> on RunKit](https://badge.runkitcdn.com/<%= projectName %>.svg)](https://npm.runkit.com/<%= projectName %>)

## Testing

The following command will generate a coverage report relative to the repo base
`./coverage/lcov-report/index.html`.

```
npm run test
```

## Coverage

1. Push your project to Github
1. Go to [Travis CI](https://travis-ci.org/<%= user.username %>) and link your github repo.
1. Go to [Coveralls](https://coveralls.io/github/<%= user.username %>) and link your github repo.
1. Either commit a new version through Github, or trigger a build in Travis.

## Publishing

This requires that all tests are passing and the project can build successfully.

```
npm run pushToNpm
```
