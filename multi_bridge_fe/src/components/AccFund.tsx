'use client'
import React, { useState } from 'react';
import { SendLinkMumbai } from './transaction/sendLinkToMumbai';
import { SendCcipMumbai } from './transaction/sendCcipToMumbai';
import { SendLinkOptimism } from './transaction/sendLinkToOp';
import { SendCcipOptimism } from './transaction/sendCcipToOp';
import { SendLinkSepolia } from './transaction/sendLinkToSepolia';
import { SendCcipSepolia } from './transaction/sendCcipToSepolia';
import { SendCcipArbitrum } from './transaction/sendCcipToArbitrum';

const sectionTitles = [
  'Buy Link in Etherum chain',
  'Buy Link in Optimism chain',
  'Buy Link in Polygon chain',
  'Buy Link in Arbitrum chain',
];

const sectionContents = [
    <div>
    <p>buy <b>Link</b> in Ethereum</p>
    <a href="https://app.uniswap.org/#/swap?chain=mainnet" target="_blank" rel="noopener noreferrer">uniswap</a>
    <br />
    <a href="https://faucets.chain.link/" target="_blank" rel="noopener noreferrer">testnet</a>
  </div>,

   <div>
   <p>buy <b>Link</b> in Optimism</p>
   <a href="https://app.uniswap.org/#/swap?chain=optimism" target="_blank" rel="noopener noreferrer">uniswap</a>
   <br />
   <a href="https://faucets.chain.link/" target="_blank" rel="noopener noreferrer">testnet</a>
 </div>,


 <div>
 <p>buy <b>Link</b> in Polygon</p>
 <a href="https://app.uniswap.org/#/swap?chain=polygon" target="_blank" rel="noopener noreferrer">uniswap</a>
 <br />
 <a href="https://faucets.chain.link/" target="_blank" rel="noopener noreferrer">testnet</a>
</div>,


 <div>
 <br />
 <p>buy <b>Ccip</b>in Arbitrum</p>
 <a href="https://app.uniswap.org/#/swap?chain=arbitrum" target="_blank" rel="noopener noreferrer">uniswap</a>
 <br />
 <a href="https://faucets.chain.link/" target="_blank" rel="noopener noreferrer">testnet</a>
</div>

  
];

export default function AccFund() {
    const [openSections, setOpenSections] = useState<number[]>([]);
  
    const toggleSection = (sectionIndex: number) => {
      if (openSections.includes(sectionIndex)) {
        setOpenSections(openSections.filter(index => index !== sectionIndex));
      } else {
        setOpenSections([...openSections, sectionIndex]);
      }
    };
  
    return (
      <div className="accordion" id="accordionPanelsStayOpenExample">
        {sectionTitles.map((title, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${openSections.includes(index) ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection(index)}
                aria-expanded={openSections.includes(index)}
                aria-controls={`panelsStayOpen-collapse${index}`}
              >
                {title}
              </button>
            </h2>
            <div
              id={`panelsStayOpen-collapse${index}`}
              className={`accordion-collapse collapse ${openSections.includes(index) ? 'show' : ''}`}
              key={`collapse-${index}`} // Aggiungi la chiave univoca qui
            >
              {sectionContents[index]}
            </div>
          </div>
        ))}
      </div>
    );
  }