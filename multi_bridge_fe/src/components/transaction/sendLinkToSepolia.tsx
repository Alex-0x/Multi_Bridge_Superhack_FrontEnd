'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {LinkSepolia} from "../abiContract/linkSepolia"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError } from 'viem'

const contractInSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";

export function SendLinkSepolia() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...LinkSepolia,
    functionName: 'transfer',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const debouncedTo = useDebounce(contractInSepolia)

  return (
    <>
      <h3>Transfer Link to Sepolia</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amount = formData.get('amount') as string
          write({
            args: [debouncedTo, parseEther(amount as `${number}`)],
          })
        }}
      >
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
