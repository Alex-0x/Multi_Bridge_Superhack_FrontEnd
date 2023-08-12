'use client'
import React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import "../assets/styles/networkSwitcher.css";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div className="network-switcher">
      <div className="connected-info">
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </div>
      <br />

      {switchNetwork && (
        <div className="switch-options">
          Switch to:{' '}
          {chains.map((x) => (
            x.id === chain?.id ? null : (
              <button
                key={x.id}
                onClick={() => switchNetwork(x.id)}
                disabled={isLoading || x.id === pendingChainId}
              >
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            )
          ))}
        </div>
      )}

      <div className="error-message">{error?.message}</div>
    </div>
  );
}
