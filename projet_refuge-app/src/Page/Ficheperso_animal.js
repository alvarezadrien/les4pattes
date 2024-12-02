import React, { useState } from 'react';
import '../Ficheperso_animal.css';

const AnimalDetails = () => {
  const animals = [
    {
      name: "Diablo",
      race: "Labrador",
      age: "2 ans",
      size: "Petit",
      arrivalDate: "2022-06-15",
      description: "Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.Diablo est un chien très énergique, toujours prêt à jouer.",
      mainImg: "/img/img_galeriechat/sydney-chat1.jpg",
      smallImgs: ["./img/img_galeriechat/sydney-chat1.jpg", "./img/img_galeriechat/sydney-chat2.jpg", "./img/img_galeriechat/sydney-chat3.jpg"]
    },
    {
      name: "Bella",
      race: "Bulldog",
      age: "3 ans",
      size: "Petit",
      arrivalDate: "2021-08-22",
      description: "Bella est calme et affectueuse. Elle adore les câlins.",
      mainImg: "/img/chien2.jpg",
      smallImgs: ["https://picsum.photos/200", "https://picsum.photos/200"]
    },
    {
      name: "Max",
      race: "Beagle",
      age: "1 an",
      size: "Petit",
      arrivalDate: "2023-01-10",
      description: "Max est un chiot très curieux et sociable.",
      mainImg: "/img/chien3.jpg",
      smallImgs: ["https://picsum.photos/200", "https://picsum.photos/200"]
    }
  ];

  // État pour l'animal sélectionné
  const [selectedAnimal, setSelectedAnimal] = useState(animals[0]);

  // Fonction pour changer l'image principale
  const handleImageClick = (image) => {
    setSelectedAnimal((prev) => ({ ...prev, mainImg: image }));
  };

  return (
    <div className="animal-details-container">
      <div className="image-section">
        <img
          className="main-image"
          src={selectedAnimal.mainImg}
          alt={`Photo de ${selectedAnimal.name}`}
        />
        <div className="small-images">
          {selectedAnimal.smallImgs.map((img, index) => (
            <img
              key={index}
              className="small-image"
              src={img}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>
      </div>
      <div className="info-section">
        <h2>{selectedAnimal.name}</h2>
        <div className='div_p_infos'>
          <p><strong>Race :</strong> {selectedAnimal.race}</p>
          <p><strong>Âge :</strong> {selectedAnimal.age}</p>
          <p><strong>Taille :</strong> {selectedAnimal.size}</p>
        </div>
        <br />
        <p className='arrival_date'><strong>Date d'arrivée :</strong> {selectedAnimal.arrivalDate}</p>
        <br />
        <p className='paragraphe_description_infos'>{selectedAnimal.description}</p>
      </div>
    </div>
  );
};

export default AnimalDetails;
