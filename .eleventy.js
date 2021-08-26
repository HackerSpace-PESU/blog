const { DateTime } = require("luxon");
const { promisify } = require("util");
const fs = require("fs");
const hasha = require("hasha");
const readFile = promisify(require("fs").readFile);
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");

// markdown plugins
const markdownItAnchor = require("markdown-it-anchor");
const md_emoji = require('markdown-it-emoji');
const md_footnote = require('markdown-it-footnote');
const md_toc = require('markdown-it-toc-done-right')
const md_highlight = require('markdown-it-highlightjs');
const md_katex = require('markdown-it-katex');
const md_hlline = require('markdown-it-highlight-lines');

// other stuff
const localImages = require("./third_party/eleventy-plugin-local-images/.eleventy.js");
const CleanCSS = require("clean-css");
const GA_ID = require("./_data/metadata.json").googleAnalyticsId;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addPlugin(localImages, {
    distPath: "_site",
    assetPath: "/img/remote",
    selector:
      "img,amp-img,amp-video,meta[property='og:image'],meta[name='twitter:image'],amp-story",
    verbose: false,
  });

  eleventyConfig.addPlugin(require("./_11ty/img-dim.js"));
  eleventyConfig.addPlugin(require("./_11ty/json-ld.js"));
  eleventyConfig.addPlugin(require("./_11ty/optimize-html.js"));
  eleventyConfig.addPlugin(require("./_11ty/csp.js"));
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addNunjucksAsyncFilter("addHash", function (
    absolutePath,
    callback
  ) {
    readFile(`_site${absolutePath}`, {
      encoding: "utf-8",
    })
      .then((content) => {
        return hasha.async(content);
      })
      .then((hash) => {
        callback(null, `${absolutePath}?hash=${hash.substr(0, 10)}`);
      })
      .catch((error) => callback(error));
  });

  eleventyConfig.addFilter("lastModifiedDate", function (filename) {
    const stats = fs.statSync(filename);
    return stats.mtime; // Date
  });

  eleventyConfig.addFilter("encodeURIComponent", function (str) {
    return encodeURIComponent(str);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addPassthroughCopy("img");

  // eleventyConfig.addPassthroughCopy("**/*.jpg");
  // eleventyConfig.addPassthroughCopy("**/*.png");

  eleventyConfig.addPassthroughCopy("css");
  // We need to copy cached.js only if GA is used
  eleventyConfig.addPassthroughCopy(GA_ID ? "js" : "js/*[!cached].*");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("_headers");

  // We need to rebuild upon JS change to update the CSP.
  eleventyConfig.addWatchTarget("./js/");
  // We need to rebuild on CSS change to inline it.
  eleventyConfig.addWatchTarget("./css/");
  // Unfortunately this means .eleventyignore needs to be maintained redundantly.
  // But without this the JS build artefacts doesn't trigger a build.
  eleventyConfig.setUseGitIgnore(false);

  /* Markdown Overrides */

  var options = {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

      } else {
        // closing tag
        return '</details>\n';
      }
    }
  };

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  })
    .use(require('@gerhobbelt/markdown-it-container'), 'spoiler', options)
    .use(require('@gerhobbelt/markdown-it-container'), 'warning')
    .use(require('@gerhobbelt/markdown-it-container'), 'danger')
    .use(require('@gerhobbelt/markdown-it-container'), 'tip')
    .use(md_emoji)
    .use(md_toc)
    .use(md_footnote)
    .use(md_katex)
    .use(md_highlight)
    .use(md_hlline)

  // set this as the final library
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,


  });


  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
              // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });
  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      // Warning hardcoded throughout repo. Find and replace is your friend :)
      output: "_site",
    },
  };
};
