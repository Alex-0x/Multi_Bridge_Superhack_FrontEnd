'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {BnMOptimism} from "../abiContract/BnMOptimism"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError } from 'viem'

const contractInOptimism = "0x9Faf785781fD7B2d42741C99b748497Ee2750933";

export function SendCcipOptimism() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...BnMOptimism,
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
      <h3>Transfer CCIP-BnM to Optimism</h3>
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
