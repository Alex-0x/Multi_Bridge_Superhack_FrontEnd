import 'bootstrap/dist/css/bootstrap.css'
import { Connect } from './Connect'
import Image from 'next/image'
import bridge from "../assets/img/brige.png";
import "../assets/styles/nav.css"

export default function NavHome(){
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
  <a className="navbar-brand" href="/">
      <Image  src={bridge} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
      MultiBridge
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/dashboard/fund">Buy Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/bridge">Bridges</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/withdrawals-WTETH">Withdrawals WTETH</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/withdrawals-ETH">Withdrawals ETH</a>
        </li>
      </ul>
    </div>
  </div>
  <Connect/>
</nav>
    )
}