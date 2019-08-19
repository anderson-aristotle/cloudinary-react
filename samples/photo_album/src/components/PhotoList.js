import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { openUploadWidget } from '../utils/CloudinaryService';
import { photosUploaded } from '../actions';
import Photo from './Photo';
import { ALBUM_TAG } from '../utils/Constants';

class PhotoList extends Component {
    render() {
        return (
            <div className="photoList">

                <div className="actions">
                    <NavLink className="upload_link" exact to="/photos/new">
                        Add photo with React File upload
                    </NavLink>
                </div>

                <h1>Your Photos</h1>
                <h3>(tag: "{ALBUM_TAG}")</h3>
                
                <div className="photos">
                    {this.props.photos.length === 0 && (
                        <p>No photos were added yet.</p>
                    )}
                    {this.props.photos.map(photo => {
                        return (
                            <Photo
                                key={photo.public_id}
                                publicId={photo.public_id}
                            />
                        );
                    })}
                </div>
                <div className="note">
                    Take a look at our documentation of{' '}
                    <a
                        href="https://cloudinary.com/documentation/image_transformations"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Image Transformations
                    </a>{' '}
                    for a full list of supported transformations.
                </div>
            </div>
        );
    }

    uploadImageWithCloudinary() {
        const uploadOptions = { tags: ALBUM_TAG, ...this.context };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                this.props.onPhotosUploaded(photos);
            } else {
                console.log(error);
            }
        });
    }
}

PhotoList.propTypes = {
    photos: PropTypes.array,
    onPhotosUploaded: PropTypes.func,
};

PhotoList.contextTypes = {
    cloudName: PropTypes.string,
    uploadPreset: PropTypes.string,
};

const PhotoListContainer = connect(
    state => ({ photos: state.photos }),
    {
        onPhotosUploaded: photosUploaded,
    }
)(PhotoList);

Object.assign(PhotoListContainer.contextTypes, PhotoList.contextTypes);

export default PhotoListContainer;
