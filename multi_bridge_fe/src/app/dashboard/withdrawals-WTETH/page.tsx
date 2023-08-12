'use client'

import { useState } from "react";
import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";
import { Allowance_ccipToken_Arbitrum } from "../../../components/allowanceCcipToken/allowance_arbitrum";
import { Allowance_ccipToken_Mumbai } from "../../../components/allowanceCcipToken/allowance_mumbai";
import { Allowance_ccipToken_Op } from "../../../components/allowanceCcipToken/allowance_op";
import { WihdrawalsWTETH_Arbitrum } from "../../../components/withdrawals_WTETH/withdrawals_Arbitrum";
import { WihdrawalsWTETH_Mumbai } from "../../../components/withdrawals_WTETH/withdrawals_Mumbai";
import { WihdrawalsWTETH_OP } from "../../../components/withdrawals_WTETH/withdrawals_Optimism";
import "../../../assets/styles/withdrawalsETHPage.css"; 

export default function WithdrawalsPageWTETH(){
    const [activeSection, setActiveSection] = useState("op"); // Sezione attualmente attiva
  
    const handleSectionClick = (sectionId: string) => {
      setActiveSection(sectionId);
    };
  
    return (
      <div>
        <NavHome />
        <br />
        <NetworkSwitcher />
        <br />
        <div className="container">
          <h1 id="title">Withdrawals WTETH</h1>
          <br />
  
          <div className="menu">
            <div
              className={`menu-item ${activeSection === "op" ? "active" : ""}`}
              onClick={() => handleSectionClick("op")}
            >
              Optimism
            </div>
            <div
              className={`menu-item ${activeSection === "mumb" ? "active" : ""}`}
              onClick={() => handleSectionClick("mumb")}
            >
              Mumbai
            </div>
            <div
              className={`menu-item ${activeSection === "arb" ? "active" : ""}`}
              onClick={() => handleSectionClick("arb")}
            >
              Arbitrum
            </div>
          </div>
  
         
          <section id="op" className={`section ${activeSection === "op" ? "active" : ""}`}>
          <Allowance_ccipToken_Op/>
          <WihdrawalsWTETH_OP/>
          </section>
  
      
          <section id="mumb" className={`section ${activeSection === "mumb" ? "active" : ""}`}>
          <Allowance_ccipToken_Mumbai/>
          <WihdrawalsWTETH_Mumbai/>
          </section>
  
       
          <section id="arb" className={`section ${activeSection === "arb" ? "active" : ""}`}>
          <Allowance_ccipToken_Arbitrum/>
          <WihdrawalsWTETH_Arbitrum/>
          </section>
        </div>
      </div>
    );
}