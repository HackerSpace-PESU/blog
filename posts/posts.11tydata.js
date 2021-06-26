module.exports = function(page) {
  return {
    layout: 'layouts/post.njk',
    permalink: "/{{page.filePathStem}}/",
    tags: 'posts',
  };
}
