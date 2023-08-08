'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import opToMatic from "../assets/img/opToMatic.png";
import maticToOp from "../assets/img/maticToOp.png";
import maticToEth from "../assets/img/maticToEth.png";
import ethToMatic from "../assets/img/ethToMatic.png";
import opToEth from "../assets/img/opToEth.png";
import ethToOp from "../assets/img/ethToOp.png";
import '../assets/styles/card.css';
import NewCardContent from './NewCardContent';


const cardData = [
  { id: 1, title: 'Sepolia - Optimism', content: 'Transfer your CCIP from Sepolia to Optimism', imageSrc: ethToOp },
  { id: 2, title: 'Optimism - Sepolia', content: 'Transfer your CCIP from Optimism to Sepolia', imageSrc: opToEth },
  { id: 3, title: 'Sepolia - Mumbai', content: 'Transfer your CCIP from Sepolia to Mumbai', imageSrc: ethToMatic },
  { id: 4, title: 'Mumbai - Sepolia', content: 'Transfer your CCIP from Mumbai to Sepolia', imageSrc: maticToEth },
  { id: 5, title: 'Optimism - Mumbai', content: 'Transfer your CCIP from Optimism to Mumbai', imageSrc: opToMatic },
  { id: 6, title: 'Mumbai - Optimism', content: 'Transfer your CCIP from Mumbai to Optimism', imageSrc: maticToOp },
  // Aggiungi altre informazioni per le altre cards come necessario
];

const Gridcard: React.FC = () => {
  const [cards, setCards] = useState(cardData.map(card => ({ ...card, isRotated: false })));

  const handleCardClick = (cardId: number) => {
    setCards(prevCards => prevCards.map(card =>
      card.id === cardId ? { ...card, isRotated: !card.isRotated } : card
    ));
  };

  return (
    <div className="row row-cols-3 row-cols-md-500 g-4">
      {cards.map(card => (
        <div className={`col`} key={card.id}>
          <div className={`card ${card.isRotated ? 'rotated' : ''}`} onClick={() => handleCardClick(card.id)}>
            <div className="card-image">
              <Image src={card.imageSrc} className="card-img-top" alt="..." width={300} height={300}/>
            </div>
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.content}</p>
            </div>
            {card.isRotated && (
              <div className="card-content">
                <NewCardContent cardId={card.id} /> {/* Nuova card con logica */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gridcard;
