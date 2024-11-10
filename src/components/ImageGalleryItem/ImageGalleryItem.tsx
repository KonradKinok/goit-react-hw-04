import "./ImageGalleryItem.scss";
import React from "react";

interface ImageGalleryItemProps {
  tags: string;
  smallPicture: string;
  openModal: () => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  tags,
  smallPicture,
  openModal,
}) => {
  return (
    <li className="ImageGalleryItem" onClick={openModal}>
      <img className="ImageGalleryItem-image" src={smallPicture} alt={tags} />
    </li>
  );
};
