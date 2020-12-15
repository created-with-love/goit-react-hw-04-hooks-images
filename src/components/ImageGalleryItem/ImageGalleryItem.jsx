import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';
import authContext from '../Context';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  previewURL,
}) {
  return (
    <li className="ImageGalleryItem" key={`id-${id}`}>
      <authContext.Consumer>
        {hadleImageClick => (
          <img
            src={previewURL}
            data-src={webformatURL}
            alt="searchedPicture"
            data-large={largeImageURL}
            className="ImageGalleryItem-image lazyload blur-up"
            onClick={hadleImageClick}
          />
        )}
      </authContext.Consumer>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  previewURL: PropTypes.string,
};
