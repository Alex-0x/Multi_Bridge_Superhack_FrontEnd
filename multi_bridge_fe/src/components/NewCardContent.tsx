// NewCardContent.tsx

import React from 'react';
import { SendTransaction } from './SendTransaction';
import Form from './form';
import { WriteContract } from './WriteContract';

const NewCardContent: React.FC<{ cardId: number }> = ({ cardId }) => {
  // Implementa qui la logica e il contenuto specifici per ciascuna card ruotata
  
  // Ad esempio, puoi utilizzare uno switch statement per determinare
  // quale logica applicare in base all'ID della card
  let content = null;

  switch (cardId) {
    case 1:
      content = (
        <div>
         <SendTransaction/>
        </div>
      );
      break;
    case 2:
      content = (
        <div>
          <Form/>
        </div>
      );
      break;
    // Aggiungi altri casi per le card con altri ID
    default:
      content = (
        <div>
          <WriteContract/>
        </div>
      );
      break;
  }

  return (
    <div className="new-card">
      {content}
    </div>
  );
};

export default NewCardContent;

