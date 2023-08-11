import Gridcard from "../../../components/Gridcard"
import NavHome from "../../../components/NavHome"
import { NetworkSwitcher } from "../../../components/NetworkSwitcher"
import {Account} from "../../../components/Account"


export default function Page(){
    return(
        <div>
        <NavHome/>
        <br />
        <br />
        Account :<Account/>
        <br />
        <NetworkSwitcher/>
        <br />
        <Gridcard/>
        </div>
    )
}