'use client'


import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {ccip_abi_config_arbitrum} from "../abiContract/abiDepKs/ccip_abi_arbitrum"
import { stringify } from '../../utils/stringify'

const addressSpender = "0xD2B3c95E0938Cc4c172Ffa552ec2cC926eef19ab"

export function Allowance_ccipToken_Arbitrum() {
   
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...ccip_abi_config_arbitrum,
    functionName: 'approve',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>

      <h3>Approve allowance spend CcipToken</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amount = formData.get('amount') as string
          write({
            args: [addressSpender as `0x${string}` , parseEther(amount as `${number}`)],
          })
        }}
      >
        <input name="amount" placeholder="amount" />
        <button disabled={isLoading} type="submit">
          allowance
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>
          <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`} target="_blank" rel="noopener noreferrer">allowanc optimism goerli explorer</a>
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
