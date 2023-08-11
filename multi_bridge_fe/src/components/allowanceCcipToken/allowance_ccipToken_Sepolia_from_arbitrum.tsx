'use client'


import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {ccip_abi_config_sepolia} from "../abiContract/abiDepKs/ccip_abi_sepolia"
import { stringify } from '../../utils/stringify'

const addressSpender = "0xf4aE2c1e01A3a4435A571b7D7b4AB372d8c4a87e"

export function Allowance_ccipToken_Sepolia_from_arbitrum() {
   
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...ccip_abi_config_sepolia,
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
