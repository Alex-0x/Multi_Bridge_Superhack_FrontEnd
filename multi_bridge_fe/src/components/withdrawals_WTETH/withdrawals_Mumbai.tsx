'use client'

import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {swapMumbai_config} from "../../components/abiContract/abiWitKs/swapMumb"
import { stringify } from '../../utils/stringify'

export function WihdrawalsWTETH_Mumbai() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...swapMumbai_config,
    functionName: 'depositToken',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <h3>Withdrawals WTETH</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amount = formData.get('amount') as string
          write({
            args: [ parseEther(amount as `${number}`)],
          })
        }}
      >
        <input name="amount" placeholder="amount" />
        <button disabled={isLoading} type="submit">
          withdrawal
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>
          <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`} target="_blank" rel="noopener noreferrer">withdrawal in optimism goerli explorer</a>
          </div>
          {/* <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
