'use client'

import React from 'react';
import { useAccount, useEnsName } from 'wagmi';
import "../assets/styles/account.css";

export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="account">
      <div className="address">
        {ensName ?? address}
        {ensName && <span className="address-ens"> ({address})</span>}
      </div>
    </div>
  );
}