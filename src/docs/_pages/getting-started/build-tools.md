---
title: Build tools
description: Learn how to use Bootstrap Stencil's included npm scripts to build our documentation, compile source code, run tests, and more.
group: getting-started
toc: true
---

## Tooling setup

Bootstrap Stencil uses [NPM scripts](https://docs.npmjs.com/misc/scripts) for its build system. Our [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json) includes convenient methods for working with this project, including compiling code, running tests, and more.

To use our build system and run our documentation locally, you'll need a copy of Bootstrap Stencil's source files and Node. Follow these steps and you should be ready to rock:

1. [Download and install Node.js](https://nodejs.org/download/), which we use to manage our dependencies.
2. Navigate to the root `/bootstrap-stencil` directory and run `npm install` to install our local dependencies listed in [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json).

When completed, you'll be able to run the various commands provided from the command line.

## Using NPM scripts

Our [package.json]({{ site.repo }}/blob/v{{ site.current_version }}/package.json) includes the following commands and tasks:

| Task | Description |
| --- | --- |
| `npm run dist` | `npm run dist` creates the `/dist` directory with compiled files. **Uses [Stencil][stencil].** |
| `npm test` | Same as `npm run dist` plus it runs tests locally. **Uses [Jest][jest].** |
| `npm run docs` | Builds and lints CSS and JavaScript for docs. You can then run the documentation locally via `npm run docs-serve`. **Uses [Liquidjs][liquidjs].** |

Run `npm run` to see all the npm scripts.

## Local documentation

Running our documentation locally requires only node and npm. The documentation is based on Jekyll, but doesn't actually use Jekyll directly. Instead, it uses [Liquidjs][liquidjs] and a custom build script that emulates a Jekyll like build. Here's how to get it started:

1. Run through the [tooling setup](#tooling-setup) above to install all of the dependencies.
2. From the root `/bootstrap-stencil` directory, run `npm run docs` and then run `npm run docs-serve` in the command line. Alternatively, you can just run `npm run docs-serve-and-watch` which will start the docs server and also build the docs and watch for changes.
3. Open `http://localhost:8080` in your browser, and voilà.

## Troubleshooting

Should you encounter problems with installing dependencies, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

[liquidjs]: https://github.com/harttle/liquidjs
[jest]: https://facebook.github.io/jest
[stencil]: https://stenciljs.com