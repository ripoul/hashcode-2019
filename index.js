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

function tags_in_common(slide1, slide2) {
    intersec = slide1.tags.filter(value => -1 !== slide2.tags.indexOf(value));
    return intersec.length
}

function have_tags_in_common(slide1, slide2) {
    return tags_in_common(slide1, slide2) > 0
}

function find_slide_with_hashtag_in_common(slides, slide) {
    return slides.filter(s => have_tags_in_common(s, slide));
}

function initSession(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').split('\r\n');
  return content.slice(1, -1).map((value, index) => {
    const splitedValue = value.split(' ');
    return new Photo(index, splitedValue[0], splitedValue.slice(2));
  });
}

function return_comme_c_attendu(slides) {
    let toWrite = ""
    toWrite += slides.length +"\n"
    slides.forEach(slide => {
        let line = "";
        slide.photoIds.forEach(id => {
            line += id + " ";
        });
        line+="\n"
        toWrite += line;
    });
    fs.writeFile("retFile.txt", toWrite);
}

main();
