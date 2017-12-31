# <%= projectName %>

You should change this file!

## Testing

The following command will generate a coverage report relative to the repo base
`./coverage/lcov-report/index.html`.

```
npm run test
```

## Coverage

1. Push your project to Github
1. Go to [Travis CI](https://travis-ci.org/<%= ghUsername %>) and link your github repo.
1. Go to [Coveralls](https://coveralls.io/github/<%= ghUsername %>) and link your github repo.
1. Either commit a new version through Github, or trigger a build in Travis.

## Publishing

This requires that all tests are passing and the project can build successfully.

```
npm run pushToNpm
```
