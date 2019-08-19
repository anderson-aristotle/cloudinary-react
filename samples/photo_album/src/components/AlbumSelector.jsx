import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { url } from '../utils/CloudinaryService';

class AlbumSelector extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
      albums: []
    };
  }

  render () {
    return (
      <div className="albums">
        {/* TODO: add all the albums as buttons, so clicking button will update PhotoList */}
      </div>
    );
  }
}

export default AlbumSelector;
