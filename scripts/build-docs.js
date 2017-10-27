const _ = require('lodash');
const fs = require('fs-extra');
const fm = require('front-matter');
const globby = require('globby');
const yaml = require('js-yaml');
const liquid = require('liquidjs');
const marked = require('marked');
const path = require('path');
const { URL } = require('url');

const supportedLiquidFileTypes = ['.html', '.md'];

var baseUrl = null;
var defaultPageLayout = null;
var globalConfig = {
  data_dir: '_data',
  encoding: 'UTF-8',
  includes_dir: '_includes',
  layouts_dir: '_layouts',
  // Exclude the default directory structure for Jekyll
  exclude: [
    '_config.yml',
    '_drafts/',
    '_includes/',
    '_layouts/',
    '_pages/',
    '_posts/',
    '_data/',
    '_sass/',
    '_site/',
    '.jekyll-metadata'
  ],
  source: '.',
  destination: './_site'
};
var layouts = [];
var liquidEngine;
var liquidContext = {
  content: null,
  page: null,
  site: {
    data: {},
    pages: [],
    time: new Date(),
    timeStamp: new Date().getTime()
  }
}

readGlobalConfig();
cleanDestination();
readDataFiles();
readLayouts();
createLiquidEngine();
readPages();
processPages();
copyFiles();

// console.log(layouts);

function cleanDestination() {
  fs.emptyDirSync(globalConfig.destination);
}

function copyFiles() {
  const copyPath = path.join(globalConfig.source, '**', '*');
  const globPatterns = [
    copyPath
  ];

  globalConfig.exclude.forEach(function(excludedPath) {
    if (excludedPath.endsWith('/')) {
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath.substring(0, excludedPath.length - 1))}`);
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath, '**', '*')}`);
    } else {
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath)}`);
    }
  });

  globby(globPatterns).then(paths => {
    paths.forEach(function(filePath) {
      if (fs.lstatSync(filePath).isFile()) {
        let destinationPath;

        if (globalConfig.source.startsWith('./')) {
          destinationPath = path.join(globalConfig.destination, filePath.replace(globalConfig.source.substring(2), ''));
        } else if (globalConfig.source === '.') {
          destinationPath = path.join(globalConfig.destination, filePath.replace(globalConfig.source.substring(2), ''));
        } else {
          destinationPath = path.join(globalConfig.destination, filePath.replace(globalConfig.source, ''));
        }

        fs.copySync(filePath, destinationPath);
      }
    });
  });
}

function createLiquidEngine() {
  liquidEngine = new liquid({
    root: [
      path.join(globalConfig.source, globalConfig.layouts_dir),
      path.join(globalConfig.source, globalConfig.includes_dir),
      path.join(globalConfig.source, 'assets')
    ]
  });

  liquidEngine.registerFilter('absolute_url', function(input) {
    if (input.startsWith('/')) {
      input = input.slice(1);
    }

    return `${globalConfig.url}${globalConfig.baseurl}${input}`;
  });

  liquidEngine.registerFilter('markdownify', function (input) {
    return marked(input);
  });

  // Replace any whitespace in the input string with a single space
  liquidEngine.registerFilter('normalize_whitespace', function (input) {
    return input.replace(/\s+/g, ' ').trim();
  });
}

function isSupportedLiquidFile(filename) {
  if (supportedLiquidFileTypes.indexOf(path.extname(filename).toLowerCase()) === -1) {
    return false;
  }

  return true;
}

function processPages() {
  liquidContext.site.pages.forEach(function (page) {
    var context = _.cloneDeep(liquidContext);
    var destPath = path.join(globalConfig.destination, page.filename);

    context.page = page;

    if (page.permalink) {
      destPath = path.join(globalConfig.destination, page.url);
      fs.ensureDirSync(path.join(globalConfig.destination, page.permalink));
    }

    // We want to output html pages
    if (path.extname(destPath).toLowerCase() !== '.html') {
      destPath = destPath.replace(path.extname(destPath), '.html');
    }

    console.info(`Processing page ${page.filename}, output to ${destPath}`);

    // Set the layout to the default if there is one and the page layout wasn't set on the page directly.
    if (!page.layout && defaultPageLayout) {
      page.layout = defaultPageLayout;
    }

    if (page.layout) {
      if (layouts[page.layout]) {
        // If the page has a layout, first we process the page.
        liquidEngine
          .parseAndRender(page.contents, context)
          .then(function (result) {
            context.content = result;

            console.info(`Page ${page.filename} processed.`);

            // Then we process the layout, using context.content to store the result of the processed page from above.
            liquidEngine
              .parseAndRender(layouts[page.layout], context)
              .then(function (layoutResult) {
                console.info(`Page ${page.filename} and layout ${page.layout} processed.`);

                fs.writeFileSync(destPath, layoutResult, globalConfig.encoding);
              }, function(error) {
                console.error(error);
              }).catch(function(error) {
                console.error(error);
              });
          }, function(error) {
            console.error(error);
          }).catch(function(error) {
            console.error(error);
          });
      } else {
        console.error(`Unable to find page layout ${page.layout}`);
      }
    } else {
      liquidEngine
        .parseAndRender(page.contents, context)
        .then(function (result) {
          fs.writeFileSync(destPath, result, globalConfig.encoding);
        });
    }
  });
}

function readDataFiles() {
  const dataPath = path.join(globalConfig.source, globalConfig.data_dir);

  fs.readdirSync(dataPath).forEach(function (filename) {
    try {
      var data = yaml.safeLoad(fs.readFileSync(path.join(dataPath, filename), globalConfig.encoding));

      liquidContext.site.data[filename.replace(path.extname(filename), '')] = data;
    } catch (e) {
      console.error(e);
    }
  });
}

function readGlobalConfig() {
  const configPath = path.join(globalConfig.source, '_config.yml');

  try {
    var config = yaml.safeLoad(fs.readFileSync(configPath, globalConfig.encoding));

    config.baseurl = config.baseurl || '';
    config.url = config.url || '';

    if (config.url.endsWith('/')) {
      config.url = config.url.slice(0, -1);
    }

    if (config.baseurl.endsWith('/')) {
      config.baseurl = config.baseurl.slice(0, -1);
    }

    // if (!config.baseurl.startsWith('/')) {
    //   config.baseurl = '/' + config.baseurl;
    // }


    // The merge doesn't seem to work right, so we do it manually
    let excludes = globalConfig.exclude.concat(config.exclude);

    _.merge(globalConfig, config);
    _.merge(liquidContext.site, config);

    // The merge doesn't seem to work right, so we do it manually
    globalConfig.exclude = excludes;

    if (config.defaults) {
      config.defaults.forEach(function (configDefault) {
        if (configDefault.scope.type === "pages") {
          defaultPageLayout = configDefault.values.layout;
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
}

function readLayouts() {
  const layoutsPath = path.join(globalConfig.source, globalConfig.layouts_dir);

  fs.readdirSync(layoutsPath).forEach(function (filename) {
    if (isSupportedLiquidFile(filename)) {
      try {
        var contents = fs.readFileSync(path.join(layoutsPath, filename), globalConfig.encoding);

        layouts[filename.replace(path.extname(filename), '')] = contents;
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function readPages() {
  const pagesPath = path.join(globalConfig.source, '/_pages');

  fs.readdirSync(pagesPath).forEach(function (filename) {
    if (isSupportedLiquidFile(filename)) {
      try {
        var contents = fs.readFileSync(path.join(pagesPath, filename), globalConfig.encoding);
        var frontMatter = fm(contents);
        var page = _.extend({}, frontMatter.attributes);

        page.contents = frontMatter.body;
        page.filename = filename;
        page.url = filename;

        if (page.permalink) {
          page.url = path.join(page.permalink, 'index.html');
        }

        liquidContext.site.pages.push(page);

        // layouts[filename.replace(path.extname(filename), '')] = contents;
      } catch (e) {
        console.error(e);
      }
    }
  });
}
