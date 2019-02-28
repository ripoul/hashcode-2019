const fs = require('fs');
const {Photo, Slide} = require('./classes');

function main() {
  const files = [
    './subject/a_example.txt',
    './subject/b_lovely_landscapes.txt',
    './subject/c_memorable_moments.txt',
    './subject/d_pet_pictures.txt',
    './subject/e_shiny_selfies.txt',
  ];

  const photo = initSession(files[0]);
}


function initSession(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').split('\r\n');
  return content.slice(1, -1).map((value, index) => {
    const splitedValue = value.split(' ');
    return new Photo(index, splitedValue[0], splitedValue.slice(2));
  });
}

main();