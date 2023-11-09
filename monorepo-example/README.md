## Lerna monorepo

Getting started with monorepo from this [blog][1]

Commands for this project from the top directory:

```shell
# Compile on all packages with the `-ws`
npm run compile -ws

# Run all tests
npm run test 
# Run test on one package
npm run test -- packages/is-odd
```


[1]: https://blog.frankdejonge.nl/setting-up-a-typescript-mono-repo-for-scoped-packages/
