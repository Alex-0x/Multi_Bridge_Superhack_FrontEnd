'use client'
import { Dropdown, Button } from 'react-bootstrap';
import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="connectDropdown">
        {isConnected ? `Connected to ${connector?.name}` : "Connect"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {connectors.map((x) => (
          <Dropdown.Item
            key={x.id}
            onClick={() => connect({ connector: x })}
            disabled={isLoading && x.id === pendingConnector?.id}
          >
            {x.name}
            {isLoading && x.id === pendingConnector?.id && " (connecting)"}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
      {isConnected && (
        <Button variant="light" onClick={() => disconnect()}>
          Disconnect from {connector?.name}
        </Button>
      )}
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </Dropdown>
  );
}
