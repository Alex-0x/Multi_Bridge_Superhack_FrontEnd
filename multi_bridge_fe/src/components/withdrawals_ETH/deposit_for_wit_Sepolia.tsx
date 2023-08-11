'use client'

import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {dep_SepoliaConfig_to_op} from "../../components/abiContract/abiDepKs/dep_sepolia_op"
import { stringify } from '../../utils/stringify'

const addressCcipSepolia = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05";

export function Deposit_for_wit_ETH_OP() {
  const { write: writeDeposit, data: dataDeposit, error: errorDeposit, isLoading: isLoadingDeposit, isError: isErrorDeposit } = useContractWrite({
    ...dep_SepoliaConfig_to_op,
    functionName: 'depositERC20',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: dataDeposit?.hash })

  return (
    <>
      <h3>Deposit ccip token for obtain ETH</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amount = formData.get('amount') as string
          writeDeposit({
            args: [ addressCcipSepolia, parseEther(amount as `${number}`)],
          })
        
          
        }}
      >
        <input name="amount" placeholder="amount" />
        <button disabled={isLoadingDeposit} type="submit">
          deposit
        </button>
      </form>

      {isLoadingDeposit && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div> 
          <a href={`https://sepolia.etherscan.io/tx/${dataDeposit?.hash}`} target="_blank" rel="noopener noreferrer">view deposit in explorer</a>
          </div>
          {/* <div>
            
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}
        </>
      )}
      {isErrorDeposit && <div>{(errorDeposit as BaseError)?.shortMessage}</div>}
    </>
  )
}
