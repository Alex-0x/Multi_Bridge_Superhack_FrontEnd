'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import maticToEth from "../assets/img/maticToEth.png";
import ethToMatic from "../assets/img/ethToMatic.png";
import opToEth from "../assets/img/opToEth.png";
import ethToOp from "../assets/img/ethToOp.png";
import ethToAb from "../assets/img/ethToAb.png";
import abToEth from "../assets/img/abToEth.png";
import abToOp from "../assets/img/abToOp.png";
import opToAb from "../assets/img/opToAb.png";

import '../assets/styles/card.css';
import NewCardContent from './NewCardContent';


const cardData = [
  { id: 1, title: 'Sepolia - Optimism', content: 'Transfer your CCIP from Sepolia to Optimism', imageSrc: ethToOp },
  { id: 2, title: 'Optimism - Sepolia', content: 'Transfer your CCIP from Optimism to Sepolia', imageSrc: opToEth },
  { id: 3, title: 'Sepolia - Mumbai', content: 'Transfer your CCIP from Sepolia to Mumbai', imageSrc: ethToMatic },
  { id: 4, title: 'Mumbai - Sepolia', content: 'Transfer your CCIP from Mumbai to Sepolia', imageSrc: maticToEth },
  { id: 5, title: 'Sepolia - Arbitrum', content: 'Transfer your CCIP from Sepolia to Arbitrum', imageSrc: ethToAb },
  { id: 6, title: 'Arbitrum - Sepolia', content: 'Transfer your CCIP from Arbitrum to Sepolia', imageSrc: abToEth },
  { id: 7, title: 'Arbitrum - Optimism', content: 'Transfer your CCIP from Arbitrum to Optimism', imageSrc: abToOp },
  { id: 8, title: 'Optimism - Arbitrum', content: 'Transfer your CCIP from Optimism to Arbitrum', imageSrc: opToAb },

];



const Gridcard: React.FC = () => {
    const [cards, setCards] = useState(cardData.map(card => ({ ...card, isRotated: false, isClickable: true })));
  
    const handleCardClick = (cardId: number) => {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === cardId && card.isClickable
            ? { ...card, isRotated: true, isClickable: false } 
            : card
        )
      );
    };
  
    const handleResetClick = (cardId: number) => {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === cardId
            ? { ...card, isRotated: false, isClickable: true } 
            : card
        )
      );
    };
  
    return (
      <div className="row row-cols-3 row-cols-md-500 g-4">
        {cards.map(card => (
          <div className={`col`} key={card.id}>
            <div className={`card ${card.isRotated ? 'rotated' : ''}`}>
              <div className="card-image" onClick={() => handleCardClick(card.id)}>
                <Image src={card.imageSrc} className="card-img-top" alt="..." width={300} height={300}/>
              </div>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.content}</p>
              </div>
              {card.isRotated && (
                <div className="card-content">
                  <NewCardContent cardId={card.id} />
                  <br />
                  <button onClick={() => handleResetClick(card.id)}>Reset</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Gridcard;
  
  
  
  
  
  
  