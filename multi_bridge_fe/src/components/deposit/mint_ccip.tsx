'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {ccip_abi_config_sepolia} from "../abiContract/abiDepKs/ccip_abi_sepolia"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError } from 'viem'

const contractInSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";


export function MintCcipSepolia() {
    const debouncedTo = useDebounce(contractInSepolia)
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...ccip_abi_config_sepolia,
    functionName: 'drip',
    args:[debouncedTo]
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

 

  return (
    <>
      <h3>Mint ccip to Sepolia</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write()
        }}
      >
        <button disabled={isLoading} type="submit">
        Mint
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
