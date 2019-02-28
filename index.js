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
  const intersec =
      slide1.tags.filter(value => -1 !== slide2.tags.indexOf(value));
  return intersec.length
}

function have_tags_in_common(slide1, slide2) {
  return tags_in_common(slide1, slide2) > 0
}

function find_slide_with_hashtag_in_common(slides, slide) {
    return slides.filter(s => have_tags_in_common(s, slide));
}

function getSlideWithMoreCommonTags(slides, slide) {
    let bestFound = {index: 0, tags: 0}
    slides.map((value, index) => {
        const tags = tags_in_common(slide, value);
        if (bestFound.tags < tags) {
            bestFound = {index, tags};
        }
    });
    return bestFound.tags ? slides[bestFound.index] : null;
}

getPhotoWithLessCommonTags(photos, photo, maxTags) {
    let best = { photo: null, tags: maxTags }
    for (let ph of photo) {
        const tags = tags_in_common(photo, ph);
        if (tags < best.tags) {
            best = { photo: ph, tags };
            if (!tags) { continue; }
        }
    }
    return best.photo;
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

function createSlide() {
	var horizontal = [];
	var vertical = [];
	var slide = [];
	var used = [];
	var max = 0;

	//sépare vertical et horizontal
	photos.forEach(element => {
		if(element.tag.length > max) {
			max = element.tag.length;
		}
		if(element.orientation == 'H') {
			horizontal.push(element);
		} else {
			vertical.push(element);
		}
	});
	
	//ajoute photo h à sortie
	horizontal.forEach(element => {
		slide.push(new Slide([element.id], [element.tags]));
	});

	//ajoute photo v à la sortie
	vertical.map((photo) => {
		if(!used.includes(photo)) {
			
			var bestPhoto = getPhotoWithLessCommonTags(vertical, photo, max);
			
			slide.push(new Slide([photo.id, bestPhoto.id], new Set([photo.tags, bestPhoto.tags])));

			used.push(bestPhoto);
		}
	});
	return slide;
}

main();
