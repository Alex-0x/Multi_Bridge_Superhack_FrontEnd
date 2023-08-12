'use client'
import NavHome from "../../../components/NavHome";
import { NetworkSwitcher } from "../../../components/NetworkSwitcher";
import { Allowance_ccipToken_Sepolia_from_mumbai } from "../../../components/allowanceCcipToken/allowance_sepolia_from_mumbai";
import { Deposit_for_wit_ETH_Mumbai } from "../../../components/withdrawals_ETH/deposit_for_wit_Sep_Mumb";
import { Deposit_for_wit_ETH_OP } from "../../../components/withdrawals_ETH/deposit_for_wit_Sepolia";
import { Wihdrawals_ETH_Mumbai } from "../../../components/withdrawals_ETH/with_sep_mumb";
import { Wihdrawals_ETH_OP } from "../../../components/withdrawals_ETH/withdrawals_Sepolia";
import "../../../assets/styles/withdrawalsETHPage.css"; 
import { useState } from "react";
import { Allowance_ccipToken_Sepolia_from_Optimism } from "../../../components/allowanceCcipToken/allowance_ccip_op-sepolia";

export default function WithdrawalsPage_ETH() {
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
          <h1 id="title">Withdrawals ETH</h1>
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
          <Allowance_ccipToken_Sepolia_from_Optimism/>
          <Deposit_for_wit_ETH_OP />
              <Wihdrawals_ETH_OP />
          </section>
  
      
          <section id="mumb" className={`section ${activeSection === "mumb" ? "active" : ""}`}>
          <Allowance_ccipToken_Sepolia_from_mumbai />
              <Deposit_for_wit_ETH_Mumbai />
              <Wihdrawals_ETH_Mumbai />
          </section>
  
       
          <section id="arb" className={`section ${activeSection === "arb" ? "active" : ""}`}>
            {/* ... */}
          </section>
        </div>
      </div>
    );
  }

