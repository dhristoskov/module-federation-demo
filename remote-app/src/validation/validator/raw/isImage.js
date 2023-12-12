const isImage = (value) => {
    if(typeof value !== 'string') {
        return false;
    }
    if(value.length > 0) {
        return /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.tiff|\.svg)$/i.test(value);
    }
    return true;
}
export default isImage;
