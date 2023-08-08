import 'bootstrap/dist/css/bootstrap.css'
import Image from 'next/image'
import { Connect } from './Connect'
import bridge from "../assets/img/brige.png";


export default function Navbar () {
    return (
<nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <Image  src={bridge} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
      MultiBridge
    </a>
    <Connect/>
  </div>
</nav>
    )
}