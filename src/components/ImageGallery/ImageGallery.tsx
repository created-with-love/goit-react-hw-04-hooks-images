import React from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';

interface IImageGallery {
  gallery: {
    id: number;
    webformatURL: string;
    largeImageURL: string;
    previewURL: string;
  }[];
}

export default function ImageGallery({ gallery }: IImageGallery) {
  return (
    <ul className="ImageGallery">
      {gallery.map(image => ImageGalleryItem(image))}
    </ul>
  );
}
