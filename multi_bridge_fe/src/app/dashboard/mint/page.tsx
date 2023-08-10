import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";
import { MintCcipSepolia } from "../../../components/deposit/mint_ccip";
import MintCcip from "../../../components/mintCcip";


export default function MintPage(){
    return (
        <div>
        <NavHome/>
        <br />
        <NetworkSwitcher/>
        <br />
        <h1>Mint / swap ccip</h1>
        <br />
        <MintCcipSepolia/>
        </div>
    )
}