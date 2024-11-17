import React, { useState } from 'react';
import '../Ficheperso_animal.css'; // Assuming your CSS file is named Ficheperso_animal.css

const Ficheperso_animal = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const images = [  // Array of image objects
    { id: 1, src: '/img/img_galeriechat/Chat_blancnoir1.webp', alt: 'Image 1' },
    { id: 2, src: '/img/img_galeriechat/Chat_blancnoir2.webp', alt: 'Image 2' },
    { id: 3, src: '/img/img_galeriechat/Chat_blancnoir3.webp', alt: 'Image 3' },
    // ... Add more image objects here
  ];

  const handleImageClick = (image) => { // Function to handle image clicks
    setSelectedImage(image);
  };

  return (
    <div className='container_page_ficheperso'>
      {selectedImage && ( // Display enlarged image if selected
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="enlarged-image"
        />
      )}
      <div className="thumbnails">
        {images.map((image, index) => ( // Map through images to display thumbnails
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={
              selectedImage === image ? 'selected' : ''
            }
            onClick={() => handleImageClick(image)}
            style={{ width: index === 0 ? '500px' : '150px' }} 
            style={{ height: index === 0 ? '400px': '150px' }} 
          />
        ))}
      </div>
    </div>
  );
}

export default Ficheperso_animal;