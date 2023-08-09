'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {BnMArbitrum} from "../abiContract/BnMArbitrum"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError } from 'viem'

const contractInOptimism = "0xdb4a1A4479FA807C76aB6781BeD74408f3097900";

export function SendCcipArbitrum() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...BnMArbitrum,
    functionName: 'transfer',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const debouncedTo = useDebounce(contractInOptimism)

  return (
    <>
      <h3>Transfer CCIP-BnM to Arbitrum</h3>
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
