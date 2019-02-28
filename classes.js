class Photo {
    constructor(id, orientation, tags) {
        this.id = id;
        this.orientation = orientation;
        this.tags = tags;
    }
}

class Slide {
    constructor(photoIds, tags) {
        this.photoIds = photoIds;
        this.tags = tags;
    }
}

module.exports.Photo = Photo;
module.exports.Slide = Slide;