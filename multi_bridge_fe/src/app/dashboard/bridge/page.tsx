import Gridcard from "../../../components/Gridcard"
import NavHome from "../../../components/NavHome"
import { NetworkSwitcher } from "../../../components/NetworkSwitcher"


export default function Page(){
    return(
        <div>
        <NavHome/>
        <br />
        <NetworkSwitcher/>
        <br />
        <Gridcard/>
        </div>
    )
}