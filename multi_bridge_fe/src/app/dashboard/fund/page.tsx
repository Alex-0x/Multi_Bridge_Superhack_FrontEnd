import AccFund from "../../../components/AccFund";
import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";

export default function Page(){
    return(
        <div>
            <NavHome/>
            <br />
            <NetworkSwitcher/>
            <br />
        <h1>Add funds to the contract</h1>
            <br />
            <AccFund/>
        </div>
        
    )
}