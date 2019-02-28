const {Photo, Slide} = require('./classes');

const photo = new Photo(1, 'V', ['toto']);

console.log(photo.tags);