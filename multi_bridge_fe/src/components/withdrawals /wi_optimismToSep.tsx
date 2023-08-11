'use client'

import { useAccount, useEnsName } from 'wagmi'
import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite, useBalance } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {OpConfig} from "../abiContract/optimism"      //the same for every optimism departure
import { useDebounce } from '../../hooks/useDebounce'
import {swapOp_config_op_from_sepolia} from "../../components/abiContract/abiWitKs/swapOp"     //change for every optimism departure
import { useEffect, useState } from 'react'
import { Deposit_for_wit_ETH_OP } from '../withdrawals_ETH/deposit_for_wit_Sepolia'
import { Wihdrawals_ETH_OP } from '../withdrawals_ETH/withdrawals_Sepolia'
import { NetworkSwitcher } from '../NetworkSwitcher'

const _destinationChainSelector = "16015286601757825753" 
const tokenAddressCcipBnmOptimism = "0xaBfE9D11A2f1D61990D1d253EC98B5Da00304F16" as `0x${string}`
const tokenAddressWEHTOptimism = "0xbd59412cb6668e7a17c99c19108893437cc84f01 " as `0x${string}`

export function WhitrodwalsFromOptimismToSepolia() {

        
    const { address } = useAccount()

    const [depositValue, setDepositValue] = useState<string>('');

    const balance = useBalance({
        address: address,
        token: tokenAddressCcipBnmOptimism,
      })
      const balanceWTEHT = useBalance({
        address: address,
        token: tokenAddressWEHTOptimism,
      })

      const balanceValue = balance.data?.value 
      const balanceValueWTETH = balanceWTEHT.data?.value
    

    //burn WTETH and Wihdrawals Ccip
    const { write : writeWihdrawalsCcip, data: DataWihdrawalsCcip, error: errorWihdrawalsCcip, isLoading: isLoadingWihdrawalsCcip, isError: isErrorWihdrawalsCcip } = useContractWrite({
        ...swapOp_config_op_from_sepolia,
        functionName: 'withdrawCcip'
    })

        
    //transfer Ccip
    const { write, data: DatatransferCcip, error: errorTransferCcip, isLoading: isLoadingTransferCcip, isError: isErrorTransferCcip } = useContractWrite({
        ...OpConfig,
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
            args: [BigInt(destinationChain), address as `0x${string}`, tokenAddressCcipBnmOptimism , parseEther(value as `${number}`)],
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
          <div>
          <a href={`https://goerli-optimism.etherscan.io/tx/${DataWihdrawalsCcip?.hash}`} target="_blank" rel="noopener noreferrer">view wihdrawals Ccip in explorer</a>
          </div>

            <div>copy and past in ccip explorer ${DatatransferCcip?.hash}</div>
          <div>
          <a href={`https://ccip.chain.link/msg/`} target="_blank" rel="noopener noreferrer">view bridge progress in ccip explorer</a>
          </div>
          <h2>1.. Attend the <b>success</b> status in ccip explorer</h2>
            <br />
            <h3>2.. After you can procede for withdrawals in Sepolia chain your Eth</h3>
          <br />
          <h4>go to withdrawals page for continue  <a href="/dashboard/withdrawals-ETH">Withdrawals</a></h4>
          {/* <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}
        

        </>
      )}
      {isErrorWihdrawalsCcip && <div>Error: {errorWihdrawalsCcip?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )

    
 
}
