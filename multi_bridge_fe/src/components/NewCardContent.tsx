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
import { DepositFromSepoliaToOptimism } from './deposit/deposit_sepolia_Op';
import { DepositInSepoliaToMumbai } from './deposit/deposit_sepolia_Mumbai';
import { WhitrodwalsFromMumbaiToSepolia } from './withdrawals /wi_mumbaiToSep';
import { WhitrodwalsFromOptimismToSepolia } from './withdrawals /wi_optimismToSep';
import { DepositInSepoliaToArbitrum } from './deposit/deposit_sepolia_Arbitrum';
import { WhitrodwalsFromOptimismToArbitrum } from './withdrawals /wi_arbitrumToSep';

const NewCardContent: React.FC<{ cardId: number }> = ({ cardId }) => {

  let content = null;

  switch (cardId) {
    case 1:
      content = (
        <div>
         
         <DepositFromSepoliaToOptimism/> 
        
        </div>
      );
      break;
    case 2:
      content = (
        <div>
          <WhitrodwalsFromOptimismToSepolia/>
        </div>
      );
      break;
    
    case 3:
      content = (
        <div>
          <DepositInSepoliaToMumbai/>
        </div>
      );
      break;
      case 4:
        content = (
          <div>
            <WhitrodwalsFromMumbaiToSepolia/>
          </div>
        );
        break;
        case 5:
            content = (
              <div>
                <DepositInSepoliaToArbitrum/>
              </div>
            );
            break;
            case 6:
                content = (
                  <div>
                    <WhitrodwalsFromOptimismToArbitrum/>
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

