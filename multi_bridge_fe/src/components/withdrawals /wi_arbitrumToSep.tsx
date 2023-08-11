'use client'

import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite, useAccount } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {ArbitrumConfig} from "../abiContract/arbitrum"      //the same for every optimism departure
import { useDebounce } from '../../hooks/useDebounce'
import {swapOp_config_arbitrum_from_sepolia} from "../../components/abiContract/abiWitKs/swapArbitrum"     //change for every optimism departure
import { useState } from 'react'

const _destinationChainSelector = "16015286601757825753" 
const tokenAddressCcipBnmArbitrum = "0x0579b4c1C8AcbfF13c6253f1B10d66896Bf399Ef" as `0x${string}`

export function WhitrodwalsFromOptimismToArbitrum() {
    const { address } = useAccount()

    const [depositValue, setDepositValue] = useState<string>('');

    

    //burn WTETH and Wihdrawals Ccip
    const { write : writeWihdrawalsCcip, data: DataWihdrawalsCcip, error: errorWihdrawalsCcip, isLoading: isLoadingWihdrawalsCcip, isError: isErrorWihdrawalsCcip } = useContractWrite({
        ...swapOp_config_arbitrum_from_sepolia,
        functionName: 'withdrawCcip'
    })

        
    //transfer Ccip
    const { write, data: DatatransferCcip, error: errorTransferCcip, isLoading: isLoadingTransferCcip, isError: isErrorTransferCcip } = useContractWrite({
        ...ArbitrumConfig,
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
            args: [BigInt(destinationChain), address as `0x${string}`, tokenAddressCcipBnmArbitrum , parseEther(value as `${number}`)],
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
