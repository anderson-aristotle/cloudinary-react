import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import { ALBUM_TAG } from '../utils/Constants';

const defaultOptions = {
    cloudName: 'cantimaginewhy',
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
};

export const url = (publicId, options) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    window.cloudinary.openUploadWidget(scOptions, callback);
};

export const fetchPhotos = cloudName => {
    // instead of maintaining the list of images, we rely on the 'en plein air' tag
    // and simply retrieve a list of all images with that tag.
    // the version property is used for cache bust (lists are cached by the CDN for 1 minute)
    // *************************************************************************
    // Note that this practice is DISCOURAGED in production code and is here
    // for demonstration purposes only
    // *************************************************************************
    console.log('Cloudname: ', cloudName);

    const urlPath = url(ALBUM_TAG, defaultOptions);

    return fetch(urlPath)
        .then(res => res.text())
        .then(text => (text ? JSON.parse(text).resources : []));
};

// fetch all images with specified tag
export const fetchTag = tagName => {
    const urlPath = url(tagName, defaultOptions);
    return fetch(urlPath)
        .then(res => res.text())
        .then(text => (text ? JSON.parse(text).resources : []));
};
