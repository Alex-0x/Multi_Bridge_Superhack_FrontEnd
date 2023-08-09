'use client'

import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {BnMMumbai} from "../abiContract/BnMMumbai"
import { useDebounce } from '../../hooks/useDebounce'
import { parseEther, stringify, BaseError } from 'viem'

const contractInMumbai = "0x779766a55ce3bee183FdF54Fc1aaC54544724F07";

export function SendCcipMumbai() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...BnMMumbai,
    functionName: 'transfer',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const debouncedTo = useDebounce(contractInMumbai)

  return (
    <>
      <h3>Transfer CCIP-BnM to Mumbai</h3>
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
