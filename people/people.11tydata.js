module.exports = function(page) {
  return {
    layout: 'layouts/people.njk',
    permalink: "/{{page.filePathStem}}/",
    tags: 'people',
  };
}
