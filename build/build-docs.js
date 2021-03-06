const _ = require('lodash');
const fs = require('fs-extra');
const fm = require('front-matter');
const globby = require('globby');
const yaml = require('js-yaml');
const hljs = require('highlight.js');
const liquid = require('liquidjs');
const marked = require('marked');
const path = require('path');
const slug = require('slug')
const {
  URL
} = require('url');

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

var markedRenderer = new marked.Renderer();

markedRenderer.code = function(code, lang) {
  if (lang) {
    return getHighlightOutput(lang, code);
  } else {
    return `<pre><code>${code}</code></pre>`;
  }
};

// markedRenderer.html = function(html) {
//   console.log('\n\n----- Marked html -----');
//   console.log(html);
//   console.log('-----------------------\n\n');

//   return html;
// };

// markedRenderer.paragraph = function(text) {
//   console.log('\n\n----- Marked paragraph -----');
//   console.log(text);
//   console.log('-----------------------\n\n');

//   return text;
// };

marked.setOptions({
  renderer: markedRenderer
});

readGlobalConfig();
cleanDestination();
readDataFiles();
readLayouts();
createLiquidEngine();
readPages();
processPages();
copyFiles();

function cleanDestination() {
  fs.emptyDirSync(globalConfig.destination);
}

function copyFiles() {
  const copyPath = path.join(globalConfig.source, '**', '*');
  const globPatterns = [
    copyPath
  ];

  globalConfig.exclude.forEach(function (excludedPath) {
    if (excludedPath.endsWith('/')) {
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath.substring(0, excludedPath.length - 1))}`);
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath, '**', '*')}`);
    } else {
      globPatterns.push(`!${path.join(globalConfig.source, excludedPath)}`);
    }
  });

  globby(globPatterns).then(paths => {
    paths.forEach(function (filePath) {
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

  liquidEngine.registerFilter('absolute_url', function (input) {
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

  liquidEngine.registerFilter('slugify', function (input) {
    if (input) {
      return slug(input, {
        lower: true
      });
    }

    return input;
  });

  // Implement a safer `first`, since the default liquidjs one fails if input is null/undefined
  liquidEngine.registerFilter('first', function (input) {
    if (input) {
      return input[0];
    }

    return input;
  });

  // Implement a safer `last`, since the default liquidjs one fails if input is null/undefined
  liquidEngine.registerFilter('last', function (input) {
    if (input) {
      return input[input.length - 1];
    }

    return input;
  });

  liquidEngine.registerFilter('toc_only', function (input) {
    if (input) {
      return getTOC(input);
    }

    return null;

    // Parse HTML, returning an array of heading data
    function getHeadings(src) {
      const headerRegEx = /<h(\d)(\s*[^>]*)>([\s\S]+?)<\/h\1>/gi;

      let headers = [];
      let m;

      while ((m = headerRegEx.exec(src)) !== null) {
        let header = {
          attrs: '',
          id: '',
          level: 0,
          tag: '',
          text: ''
        };

        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === headerRegEx.lastIndex) {
          headerRegEx.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 0) {
            header.tag = match;
          } else if (groupIndex === 1) {
            header.level = Number(match);
          } else if (groupIndex === 2) {
            header.attrs = match;

            if (match) {
              let idMatch = /id="(\S+)"/gi.exec(match);

              if (idMatch && idMatch.length === 2) {
                header.id = idMatch[1];
              }
            }
          } else if (groupIndex === 3) {
            header.text = match;
          }
        });

        if (header.id) {
          headers.push(header);
        }
      }

      return headers;
    };

    function getTOC(html) {
      const headers = getHeadings(html);
      let cursor = 0;
      let levels = [];
      let tocs = [''];

      headers.forEach(function(header) {
        while (header.level < levels[0]) {
          levels.shift();
          cursor++;
        }

        if (levels.length === 0 || header.level > levels[0]) {
          levels.unshift(header.level);
          header.depth = levels.length;

          if (header.depth == 1) {
            tocs[cursor] += '<ul class="section-nav">';
          } else {
            tocs[cursor] += '<ul>';
          }

          tocs.push('</li></ul>');
        } else {
          header.depth = levels.length;
          tocs[cursor] += '</li>';
        }

        tocs[cursor] += `<li class="toc-entry toc-h${header.level}"><a href="#${header.id}">${header.text}</a>`;
      });

      return `<div class="toc">${tocs.join('')}</div>`;
    };
  });

  liquidEngine.registerTag('callout', {
    parse: function (tagToken, remainTokens) {
      let params = tagToken.args + '';

      if (params) {
        let paramArray = params.split(' ');

        if (paramArray.length > 1) {
          throw new Error('Only a single parameter should be used with the callout tag. Usage: callout type');
        }

        this.theme = paramArray[0];
      } else {
        throw new Error(`You must provide a type to the callout tag. Usage: callout type`);
      }

      this.templates = [];

      var stream = liquidEngine.parser.parseStream(remainTokens);

      stream
        .on('template', (template) => {
          this.templates.push(template);
        })
        .on("tag:endcallout", () => {
          stream.stop();
        })
        .on('end', (x) => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },
    render: function (scope, hash) {
      if (this.templates && this.templates.length > 0) {
        return liquidEngine
          .renderer
          .renderTemplates(this.templates, scope)
          .then((result) => {
            return Promise.resolve(`<div class="docs-callout docs-callout-${this.theme}">${marked(result)}</div>`);
          });
      } else {
        return Promise.resolve(null);
      }
    }
  });

  liquidEngine.registerTag('highlight', {
    parse: function (tagToken, remainTokens) {
      let params = tagToken.args + '';

      if (params) {
        let paramArray = params.split(' ');

        if (paramArray.length > 1) {
          throw new Error('Only a single parameter is accepted at this time. linenos are not supported yet. Usage: highlight langName');
        }

        this.lang = paramArray[0];
      } else {
        throw new Error(`You must provide a language to the highlight tag. Usage: highlight langName`);
      }

      this.templates = [];

      var stream = liquidEngine.parser.parseStream(remainTokens);

      stream
        .on('template', (template) => {
          this.templates.push(template);
        })
        .on("tag:endhighlight", () => {
          stream.stop();
        })
        .on('end', (x) => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },
    render: function (scope, hash) {
      if (this.templates && this.templates.length > 0) {
        return liquidEngine
          .renderer
          .renderTemplates(this.templates, scope)
          .then((result) => {
            return Promise.resolve(getHighlightOutput(this.lang, result));
          });
      } else {
        return Promise.resolve(null);
      }
    }
  });

  liquidEngine.registerTag('example', {
    parse: function (tagToken, remainTokens) {
      let params = tagToken.args + '';

      if (params) {
        let paramArray = params.split(' ');

        if (paramArray.length > 1) {
          throw new Error('Only a single parameter should be used with the example tag. Usage: example langName');
        }

        this.lang = paramArray[0];
      } else {
        throw new Error(`You must provide a language to the example tag. Usage: example langName`);
      }

      this.templates = [];

      var stream = liquidEngine.parser.parseStream(remainTokens);

      stream
        .on('template', (template) => {
          this.templates.push(template);
        })
        .on("tag:endexample", () => {
          stream.stop();
        })
        .on('end', (x) => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },
    render: function (scope, hash) {
      if (this.templates && this.templates.length > 0) {
        // console.log('\n\n----- liquid example tag render');
        // this.templates.forEach((template) => {
        //   console.log(template);
        // });
        // console.log('-----\n\n');

        return liquidEngine
          .renderer
          .renderTemplates(this.templates, scope)
          .then((result) => {
            // console.log(result);
            // console.log('-----\n\n');

            let output = `<div class="docs-example">${result}</div>\n<div class="docs-example-code">${getHighlightOutput(this.lang, result)}</div>`;

            return Promise.resolve(output);
          });
      } else {
        return Promise.resolve(null);
      }
    }
  });
}

function getHighlightOutput(lang, input) {
  let hljsResult = hljs.highlight(lang, input);

  return `<div class="highlight"><pre><code class="language-${lang}" data-lang="${lang}">${hljsResult.value.trim()}</code></pre></div>`;
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
    var destPath = path.join(globalConfig.destination, page.url);

    context.page = page;

    fs.ensureDirSync(path.dirname(destPath));

    console.info(`Processing page ${page.path}, output to ${destPath}`);

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
            // Convert content for markdown files to html
            if (path.extname(page.url).toLowerCase() !== '.md') {
              result = marked(result);
            }

            context.content = result;

            console.info(`Page ${page.path} processed.`);

            // Then we process the layout, using context.content to store the result of the processed page from above.
            liquidEngine
              .parseAndRender(layouts[page.layout], context)
              .then(function (layoutResult) {
                console.info(`Page ${page.path} and layout ${page.layout} processed.`);

                fs.writeFileSync(destPath, layoutResult, globalConfig.encoding);
              }, function (error) {
                console.error(error);
              }).catch(function (error) {
                console.error(error);
              });
          }, function (error) {
            console.error(error);
          }).catch(function (error) {
            console.error(error);
          });
      } else {
        console.error(`Unable to find page layout ${page.layout}`);
      }
    } else {
      liquidEngine
        .parseAndRender(page.contents, context)
        .then(function (result) {
          // Convert content for markdown files to html
          if (path.extname(page.url).toLowerCase() !== '.md') {
            result = marked(result);
          }

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
  const pagesPath = path.join(globalConfig.source, '_pages');
  const globPatterns = [];
  const permalinkType = globalConfig.permalink;

  supportedLiquidFileTypes.forEach(function (value) {
    globPatterns.push(path.join(globalConfig.source, '_pages', '**', `*${value}`));
  });

  const paths = globby.sync(globPatterns);

  paths.forEach(function (filePath) {
    try {
      var contents = fs.readFileSync(filePath, globalConfig.encoding);
      var frontMatter = fm(contents);
      var page = _.extend({}, frontMatter.attributes);

      page.contents = frontMatter.body;
      page.path = filePath;
      page.url = filePath.replace(pagesPath, '');

      // We want to output html pages
      if (path.extname(page.url).toLowerCase() !== '.html') {
        page.url = page.url.replace(path.extname(page.url), '.html');
      }

      // TODO: Add real processing of permalink patterns
      if (permalinkType) {
        if (permalinkType === 'pretty' && page.url !== '/index.html') {
          page.url = page.url.replace(path.extname(page.url), '/index.html');
        }
      }

      if (page.permalink) {
        page.url = path.join(page.permalink, 'index.html');
      }

      liquidContext.site.pages.push(page);
    } catch (e) {
      console.error(e);
    }
  });
}
