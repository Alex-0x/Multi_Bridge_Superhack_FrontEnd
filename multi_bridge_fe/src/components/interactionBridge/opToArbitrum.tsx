'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {OpConfig} from "../abiContract/optimism"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError, isAddress } from 'viem'


const _destinationChainSelector = "6101244977088475029" 
const tokenAddress = "0xaBfE9D11A2f1D61990D1d253EC98B5Da00304F16" as `0x${string}` 

export function BridgeOptimismToArbitrum() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...OpConfig,
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
      <h3>Bridge CCIP from Optimism to Arbitrum</h3>
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
