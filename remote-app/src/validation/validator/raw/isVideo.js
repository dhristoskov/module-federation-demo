const isVideo = (value) => {
    return /^.+\.(mp4|webm|ogg|ogv|mov|wmv|flv|avi)$/.test(value);
}

export default isVideo;