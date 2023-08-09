'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {SepoliaConfig} from "../abiContract/sepolia"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError, isAddress } from 'viem'


const _destinationChainSelector = "6101244977088475029" 
const tokenAddress = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05" as `0x${string}` 

export function BridgeSepoliaToArbitrum() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...SepoliaConfig,
    functionName: 'transferTokens',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

    const destinationChain = useDebounce(_destinationChainSelector)

  
  return (
    <>
      <h3>Bridge CCIP from Sepolia to Arbitrum</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const receiver = formData.get('receiver') as `0x${string}`;
          const amount = formData.get('amount') as string
          write({
            args: [BigInt(destinationChain), receiver , tokenAddress , parseEther(amount as `${number}`)],
          })
        }}
      >
        <input name="receiver" placeholder="receiver" />
        <input name="amount" placeholder="amount" />
        <button disabled={isLoading} type="submit">
          Send
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
