'use client'

import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {MumbaiConfig} from "../abiContract/mumbai"
import { useDebounce } from '../../hooks/useDebounce'
import {swapMumbai_config} from "../../components/abiContract/abiWitKs/swapMumb"
import { useState } from 'react'

const _destinationChainSelector = "16015286601757825753" 
const tokenAddressCcipBnmMumbai = "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40" as `0x${string}`

export function WhitrodwalsFromMumbaiToSepolia() {

   const debouncedToKsSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";

    const [depositValue, setDepositValue] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    

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
    <input name="address" 
    placeholder="address"
    value={address}
    onChange={(e)=> setAddress(e.target.value)}  
    />
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
          <div>Transaction Hash Wihdrawals Ccip: {DataWihdrawalsCcip?.hash}</div>
          <div>Transaction Hash to Ccip: {DatatransferCcip?.hash}</div>
          
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isErrorWihdrawalsCcip && <div>Error: {errorWihdrawalsCcip?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )
}
