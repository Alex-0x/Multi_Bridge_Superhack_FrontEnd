import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";
import { Allowance_ccipToken_Arbitrum } from "../../../components/allowanceCcipToken/allowance_arbitrum";
import { Allowance_ccipToken_Mumbai } from "../../../components/allowanceCcipToken/allowance_mumbai";
import { Allowance_ccipToken_Op } from "../../../components/allowanceCcipToken/allowance_op";
import { MintCcipSepolia } from "../../../components/deposit/mint_ccip";
import MintCcip from "../../../components/mintCcip";
import { Deposit_for_wit_ETH_OP } from "../../../components/withdrawals_ETH/deposit_for_wit_Sepolia";
import { Wihdrawals_ETH_OP } from "../../../components/withdrawals_ETH/withdrawals_Sepolia";
import { WihdrawalsWTETH_Arbitrum } from "../../../components/withdrawals_WTETH/withdrawals_Arbitrum";
import { WihdrawalsWTETH_Mumbai } from "../../../components/withdrawals_WTETH/withdrawals_Mumbai";
import { WihdrawalsWTETH_OP } from "../../../components/withdrawals_WTETH/withdrawals_Optimism";


export default function WithdrawalsPageWTETH(){
    return (
        <div>
        <NavHome/>
        <br />
        <NetworkSwitcher/>
        <br />
        <h1>Withdrawals WTETH</h1>
        <br />
        
        
        
        <h2>Withrowals WTETH in Optimism</h2>
        <br />
        <h1>remaind to switch network in Optimism</h1>
        <br />
        <p>3..add in you metamask WTETH: 0xbd59412cb6668e7a17c99c19108893437cc84f01 </p>
        <br />
        <h2>4..You have to give approve to spend Token Ccip in Optimism chain</h2>
        <Allowance_ccipToken_Op/>
        <br />
        <h2>ad now..Withdrawals WTEHT in Optimism</h2>
        <WihdrawalsWTETH_OP/>
        
        
        <br />
        <h2>Withrowals WTETH in Mumbai</h2>
        <br />

        <h4>3..switch network from Sepolia to Mumbai</h4>
            <br />
            <p>4..add in you metamask WTETH: 0x8ec150b21b2644cfc4f9fff3ead6061e12bcf9e8</p>
          <br />
        <h2>5..You have to give approve to spend Token Ccip in Mumbai chain</h2>
        <Allowance_ccipToken_Mumbai/>
        <br />
        <h2>ad now..Withdrawals WTEHT in Mumbai</h2>
        <WihdrawalsWTETH_Mumbai/>


        <br />
        <h2>Withrowals WTETH in Arbitrum</h2>
        <br />
        <h4>3..switch network from Sepolia to Arbitrum</h4>
            <br />
            <p>4..add in you metamask WTETH: 0x73dedf5607b25ef415be12de7a044013dd53133a </p>
          <br />
        <h2>5..You have to give approve to spend Token Ccip in Arbitrum chain</h2>
        <Allowance_ccipToken_Arbitrum/>
        <br />
        <h2>ad now..Withdrawals WTEHT in Arbitrum</h2>

        <WihdrawalsWTETH_Arbitrum/>




        </div>

        


        
    )
}