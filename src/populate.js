/* eslint-disable */

const fs = require('fs');

let savedPosts = null;

const Post = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  // TODO: implement this
  return Promise.all(
    readPosts().map(post => {
      return Post(post).save();
    }),
  )
    .then(values => {})
    .catch(err => console.log(err));
};

/* // to not use test
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/so-posts')
  .then(_ => {
    Post.create(readPosts()).then(_ => {
      mongoose.disconnect()
    })
    .catch(_ => {});
  })
  .catch(_ => {})
*/

module.exports = { readPosts, populatePosts };
