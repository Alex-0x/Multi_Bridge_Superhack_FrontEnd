// NewCardContent.tsx

import React from 'react';
import { SendTransaction } from './SendTransaction';
import Form from './form';
import { WriteContract } from './WriteContract';
import { BridgeMumbaiToSepolia } from './interactionBridge/mumbaiToSepolia';
import { BridgeSepoliaToMumbai } from './interactionBridge/sepoliaToMumbai';
import { BridgeSepoliaToOp } from './interactionBridge/sepoliaToOp';
import { BridgeOptimismToSepolia } from './interactionBridge/opToSepolia';
import { BridgeOptimismToArbitrum} from './interactionBridge/opToArbitrum';
import { BridgeSepoliaToArbitrum } from './interactionBridge/sepoliaToArbitrum';
import { BridgeArbitrumToSepolia } from './interactionBridge/arbitrumToSepolia';
import { BridgeArbitrumToOp } from './interactionBridge/arbitrumToOp';

const NewCardContent: React.FC<{ cardId: number }> = ({ cardId }) => {

  let content = null;

  switch (cardId) {
    case 1:
      content = (
        <div>
         <BridgeSepoliaToOp/>
        </div>
      );
      break;
    case 2:
      content = (
        <div>
          <BridgeOptimismToSepolia/>
        </div>
      );
      break;
    
    case 3:
      content = (
        <div>
          <BridgeSepoliaToMumbai/>
        </div>
      );
      break;
      case 4:
        content = (
          <div>
            <BridgeMumbaiToSepolia/>
          </div>
        );
        break;
        case 5:
            content = (
              <div>
                <BridgeSepoliaToArbitrum/>
              </div>
            );
            break;
            case 6:
                content = (
                  <div>
                    <BridgeArbitrumToSepolia/>
                  </div>
                );
                break;
                case 7:
                    content = (
                      <div>
                        <BridgeArbitrumToOp/>
                      </div>
                    );
                    break;
                    case 8:
                        content = (
                          <div>
                            <BridgeOptimismToArbitrum/>
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

