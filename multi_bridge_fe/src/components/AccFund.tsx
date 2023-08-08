'use client'
import React, { useState } from 'react';
import { SendTransactionPrepared } from './SendTransactionPrepared';

const sectionTitles = [
  'Transaction to Transfer Funds in the Bridge Contract between Sepolia and Optimism',
  'Transaction to Transfer Funds in the Bridge Contract between Optimism and Sepolia',
  'Transaction to Transfer Funds in the Bridge Contract between Sepolia and Mumbai',
  'Transaction to Transfer Funds in the Bridge Contract between Mumbai and Sepolia',
  'Transaction to Transfer Funds in the Bridge Contract between Optimism and Mumbai',
  'Transaction to Transfer Funds in the Bridge Contract between Mumbai and Optimism',
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
          >
            <div className="accordion-body">
              <p>Transfer <b>Link</b></p><SendTransactionPrepared />
              <br />
              <p>Transfer <b>Ccip</b></p><SendTransactionPrepared />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
