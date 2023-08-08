// NewCardContent.tsx

import React from 'react';
import { SendTransaction } from './SendTransaction';
import Form from './form';
import { WriteContract } from './WriteContract';

const NewCardContent: React.FC<{ cardId: number }> = ({ cardId }) => {

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

