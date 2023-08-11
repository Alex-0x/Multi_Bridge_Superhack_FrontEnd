import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";

import { Allowance_ccipToken_Mumbai } from "../../../components/allowanceCcipToken/allowance_mumbai";
import { Allowance_ccipToken_Sepolia_from_mumbai } from "../../../components/allowanceCcipToken/allowance_sepolia_from_mumbai";
import { Deposit_for_wit_ETH_Mumbai } from "../../../components/withdrawals_ETH/deposit_for_wit_Sep_Mumb";
import { Deposit_for_wit_ETH_OP } from "../../../components/withdrawals_ETH/deposit_for_wit_Sepolia";
import { Wihdrawals_ETH_Mumbai } from "../../../components/withdrawals_ETH/with_sep_mumb";
import { Wihdrawals_ETH_OP } from "../../../components/withdrawals_ETH/withdrawals_Sepolia";


export default function WithdrawalsPage_ETH(){
    return (
        <div>
        <NavHome/>
        <br />
        <NetworkSwitcher/>
        <br />
        <h1>Withdrawals ETH</h1>
        <br />

        <h2>Withdrawals ETH you come from Optimism</h2>
        <br />
           
          <h3>3..Now yoy can chain network switch from Optimism to Sepolia</h3>
          <br />
             <br />
            <NetworkSwitcher/>
            <br />
          <div>
          <Deposit_for_wit_ETH_OP/>
          </div>
          <div>
          <Wihdrawals_ETH_OP/>
          </div>


          <br />
          <h2>Withdrawals ETH you come from Mumbai</h2>
        <br />
           
          <h3>3..Now yoy can chain network switch from Mumbai to Sepolia</h3>
          <br />
          <br />
            <NetworkSwitcher/>
            <br />
          <h3>4..approve spender contract with allowance:</h3>
          <br />
          <Allowance_ccipToken_Sepolia_from_mumbai/>
           <br />
          <div>
          <Deposit_for_wit_ETH_Mumbai/>
          </div>
          <div>
          <Wihdrawals_ETH_Mumbai/>
          </div>

          <br />
          <h2>Withdrawals ETH you come from Arbitrum</h2>
        <br />
           
          <h3>3..Now yoy can chain network switch from Arbitrum to Sepolia</h3>
          <br />
          <br />
            <NetworkSwitcher/>
            <br />
          <h3>4..approve spender contract with allowance:</h3>
          <br />


</div>
        )
}