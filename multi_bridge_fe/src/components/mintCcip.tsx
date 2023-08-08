'use client'
import React, { useState } from 'react';
import { WriteContract } from './WriteContract';

const sectionTitles = [
  'Mint CCIP from Sepolia',
  'Mint CCIP from Optimism',
  'Mint CCIP from Mumbai',
];

export default function MintCcip() {
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
          >
            <div className="accordion-body">
              <p>Transfer <b>Link</b></p><WriteContract />
              <br />
              <p>Transfer <b>Ccip</b></p><WriteContract />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}