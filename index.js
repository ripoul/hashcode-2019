const {Photo, Slide} = require('./classes');

function main() {
    const files = [
        './subject/a_example.txt',
        './subject/b_lovely_landscapes.txt',
        './subject/c_memorable_moments.txt',
        './subject/d_pet_pictures.txt',
        './subject/e_shiny_selfies.txt',
    ];
}

function tags_in_common(slide1, slide2) {
    intersec = slide1.tags.filter(value => -1 !== slide2.tags.indexOf(value));
    return intersec.length
}

function have_tags_in_common(slide1, slide2) {
    return tags_in_common > 0
}

function find_slide_with_hashtag_in_common(slides, slide) {
    ret = Array();
    slides.forEach(s => {
        if (have_tags_in_common(s, slide)) {
            ret.push(slide)
        }
    });
    return ret;
}