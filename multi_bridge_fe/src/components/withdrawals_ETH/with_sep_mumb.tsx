'use client'

import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import {dep_SepoliaConfig_to_mumbai} from "../../components/abiContract/abiDepKs/dep_sepolia_mumbai"
import { stringify } from '../../utils/stringify'



export function Wihdrawals_ETH_Mumbai() {

 
  const { write: writeWihdrawals, data: dataWihdrawals, error : errorWihdrawals, isLoading : isLoadingWihdrawals, isError: isErrorWihdrawals } = useContractWrite({
    ...dep_SepoliaConfig_to_mumbai,
    functionName: 'withdrawEther',
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: dataWihdrawals?.hash })
  return (
    <>
      <h3>Withdrawals ETH</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          writeWihdrawals();
         
          
          
        }}
      >

        <button disabled={isLoadingWihdrawals} type="submit">
        withdrawal
        </button>
      </form>

      {isLoadingWihdrawals && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>

            <div> 
          <a href={`https://sepolia.etherscan.io/tx/${dataWihdrawals?.hash}`} target="_blank" rel="noopener noreferrer">view withdrawal in explorer</a>
          </div>

          {/* <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}
        </>
      )}
      {isErrorWihdrawals && <div>{(errorWihdrawals as BaseError)?.shortMessage}</div>}
    </>
  )
}
