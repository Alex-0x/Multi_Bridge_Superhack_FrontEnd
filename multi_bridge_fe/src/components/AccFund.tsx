'use client'
import React, { useState } from 'react';
import { SendLinkMumbai } from './transaction/sendLinkToMumbai';
import { SendCcipMumbai } from './transaction/sendCcipToMumbai';
import { SendLinkOptimism } from './transaction/sendLinkToOp';
import { SendCcipOptimism } from './transaction/sendCcipToOp';
import { SendLinkSepolia } from './transaction/sendLinkToSepolia';
import { SendCcipSepolia } from './transaction/sendCcipToSepolia';

const sectionTitles = [
  'Transaction to Transfer Funds in the Bridge Contract between Sepolia and Optimism',
  'Transaction to Transfer Funds in the Bridge Contract between Optimism and Sepolia',
  'Transaction to Transfer Funds in the Bridge Contract between Sepolia and Mumbai',
  'Transaction to Transfer Funds in the Bridge Contract between Mumbai and Sepolia',
  'Transaction to Transfer Funds in the Bridge Contract between Optimism and Mumbai',
  'Transaction to Transfer Funds in the Bridge Contract between Mumbai and Optimism',
];

const sectionContents = [
    <div>
    <p>Transfer <b>Link</b></p><SendLinkSepolia />
    <br />
    <p>Transfer <b>Ccip</b></p><SendCcipSepolia />
  </div>,
   <div>
   <p>Transfer <b>Link</b></p><SendLinkOptimism />
   <br />
   <p>Transfer <b>Ccip</b></p><SendCcipOptimism />
 </div>,
  <div>
  <p>Transfer <b>Link</b></p><SendLinkSepolia />
  <br />
  <p>Transfer <b>Ccip</b></p><SendCcipSepolia />
</div>,
 <div>
 <p>Transfer <b>Link</b></p><SendLinkMumbai />
 <br />
 <p>Transfer <b>Ccip</b></p><SendCcipMumbai />
</div>,
 <div>
 <p>Transfer <b>Link</b></p><SendLinkOptimism />
 <br />
 <p>Transfer <b>Ccip</b></p><SendCcipOptimism />
</div>,
 <div>
 <p>Transfer <b>Link</b></p><SendLinkMumbai />
 <br />
 <p>Transfer <b>Ccip</b></p><SendCcipMumbai />
</div>,
  
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