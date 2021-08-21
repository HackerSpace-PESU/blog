module.exports = function(page) {
  return {
    layout: 'layouts/domain.njk',
    permalink: "/{{page.filePathStem}}/",
    tags: 'domains',
  };
}
