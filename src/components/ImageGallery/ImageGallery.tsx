import "./ImageGallery.scss";
import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import * as UnsplashFunction from "../../globalFunctions/unsplashFunctions";
import type { Urls } from "../../globalFunctions/unsplashFunctions";
interface ImageGalleryProps {
  data: UnsplashFunction.Image[];
  openModal: (imgUrl: string, tags: string, imageUrls: Urls) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  openModal,
  data,
}) => {
  return (
    <ul className="ImageGallery">
      {data &&
        data.map((image) => (
          <ImageGalleryItem
            key={image.id}
            tags={image.alt_description}
            smallPicture={image.urls.small}
            openModal={() =>
              openModal(image.urls.regular, image.alt_description, image.urls)
            }
          />
        ))}
    </ul>
  );
};
