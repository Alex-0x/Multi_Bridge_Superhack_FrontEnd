'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {MumbaiConfig} from "../abiContract/mumbai"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError, isAddress } from 'viem'


const _destinationChainSelector = "16015286601757825753" 
const tokenAddress = "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40" as `0x${string}` 

export function BridgeMumbaiToSepolia() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...MumbaiConfig,
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
      <h3>Bridge CCIP from Mumbai to Sepolia</h3>
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
