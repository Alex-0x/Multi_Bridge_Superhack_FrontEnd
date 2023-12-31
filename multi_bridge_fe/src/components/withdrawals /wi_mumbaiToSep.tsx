'use client'

import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite, useAccount } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {MumbaiConfig} from "../abiContract/mumbai"
import { useDebounce } from '../../hooks/useDebounce'
import {swapMumbai_config} from "../../components/abiContract/abiWitKs/swapMumb" //the unique swap in mumbai
import { useState } from 'react'

const _destinationChainSelector = "16015286601757825753" 
const tokenAddressCcipBnmMumbai = "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40" as `0x${string}`

export function WhitrodwalsFromMumbaiToSepolia() {
    const { address } = useAccount()


    const [depositValue, setDepositValue] = useState<string>('');

    

    //burn WTETH and Wihdrawals Ccip
    const { write : writeWihdrawalsCcip, data: DataWihdrawalsCcip, error: errorWihdrawalsCcip, isLoading: isLoadingWihdrawalsCcip, isError: isErrorWihdrawalsCcip } = useContractWrite({
        ...swapMumbai_config,
        functionName: 'withdrawCcip'
    })

        
    //transfer Ccip
    const { write, data: DatatransferCcip, error: errorTransferCcip, isLoading: isLoadingTransferCcip, isError: isErrorTransferCcip } = useContractWrite({
        ...MumbaiConfig,
        functionName: 'transferTokens',
      })
      const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
      } = useWaitForTransaction({ hash: DatatransferCcip?.hash })


    const destinationChain = useDebounce(_destinationChainSelector)


  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const value = formData.get('value') as `${number}`
        
          
          writeWihdrawalsCcip({
            args:[ parseEther(value as `${number}`)]
          })
          write({
            args: [BigInt(destinationChain), address as `0x${string}`, tokenAddressCcipBnmMumbai , parseEther(value as `${number}`)],
          })
        }}
      >
    <input
    name="value"
    placeholder="value (ether)"
    value={depositValue}
    onChange={(e) => setDepositValue(e.target.value)}
  />
 
        <button type="submit">Deposit</button>
      </form>

      {isLoadingTransferCcip && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
        <div><a href={`https://mumbai.polygonscan.com/tx/${DataWihdrawalsCcip?.hash}`} target="_blank" rel="noopener noreferrer">burn WTETH and withdrawal ccip</a>
        </div>
        <br />
        <div>
            <p>progress bridge in ccip explorer:</p>
            <p>copy this hash : {DatatransferCcip?.hash} and paste <a href="https://ccip.chain.link/msg" target="_blank" rel="noopener noreferrer">here</a></p>
       
        </div>
        <br />
{/*           
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}

          <h2>1.. Attend the <b>success</b> status in ccip explorer</h2>
            <br />
            <h3>2.. After you can procede for withdrawals in Sepolia chain your Eth</h3>
          <br />
          <h4>go to withdrawals page for continue  <a href="/dashboard/withdrawals-ETH">Withdrawals</a></h4>
        </>
      )}
      {isErrorWihdrawalsCcip && <div>Error: {errorWihdrawalsCcip?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )
}
