export class TextModel{
    constructor(title, image, id){
        this.title = title;
        this.imageUri = image.uri;
        this.base64 = image.base64;
        this.id = id;
    }
}