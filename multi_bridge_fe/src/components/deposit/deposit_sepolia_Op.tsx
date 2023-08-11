'use client'
import { useAccount, useEnsName } from 'wagmi'
import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {SepoliaConfig} from "../abiContract/sepolia"            //the same for all sepolia departure
import { useDebounce } from '../../hooks/useDebounce'
import {dep_SepoliaConfig_to_op} from "../abiContract/abiDepKs/dep_sepolia_op"          //deposit from sepolia to op
import {ccip_abi_config_sepolia} from "../abiContract/abiDepKs/ccip_abi_sepolia"  //drip the same for all sepolia departure
import { useEffect, useState } from 'react'
import { Allowance_ccipToken_Op } from '../allowanceCcipToken/allowance_op'
import { WihdrawalsWTETH_OP } from '../withdrawals_WTETH/withdrawals_Optimism'
import { NetworkSwitcher } from '../NetworkSwitcher'

const _destinationChainSelector = "2664363617261496610"   //destination chain => optimism
const tokenAddressCcipBnmSepolia = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05" as `0x${string}`  //ccip token sepolia

export function DepositFromSepoliaToOptimism() {
   
   
   
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
   const debouncedToKsSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";      //drip to contract bridge chainlink ccip in sepolia

    //deposit Eth
    const [depositValue, setDepositValue] = useState<string>('');
    
  


    const { write : writeDepositEth, data: DataDepositEth, error: errorDepositEth, isLoading: isLoadingDepositEth, isError: isErrorDepositEth } = useContractWrite({
        ...dep_SepoliaConfig_to_op,
        functionName: 'depositEther',
        value: parseEther(depositValue as `${number}`)
    })

    //mint ccip
    const { write : writeMint, data: DataMint, error: errorMint, isLoading: isLoadingMint, isError: isErrorMint } = useContractWrite({
        ...ccip_abi_config_sepolia,
        functionName: 'drip',
        args:[debouncedToKsSepolia]

    })
        

    //transfer Ccip
    const { write : writeCcip, data: DatatransferCcip, error: errorTransferCcip, isLoading: isLoadingTransferCcip, isError: isErrorTransferCcip } = useContractWrite({
        ...SepoliaConfig,
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
        
          
          writeDepositEth()
          writeMint()
          writeCcip({
            args: [BigInt(destinationChain), address as `0x${string}`, tokenAddressCcipBnmSepolia , parseEther(value as `${number}`)],
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
        
          <div><a href={`https://sepolia.etherscan.io/tx/${DataDepositEth?.hash}`} target="_blank" rel="noopener noreferrer">view deposit in explorer</a></div>
          <div><a href={`https://sepolia.etherscan.io/tx/${DataMint?.hash}`} target="_blank" rel="noopener noreferrer">view mint to contract in explorer</a></div>
          <br />
          <div>copy and paste in ccip explorer${DatatransferCcip?.hash}</div>
          <a href={`https://ccip.chain.link/msg/`} target="_blank" rel="noopener noreferrer">progress bridge in ccip explorer</a>
          
          <br />
            <h2>1.. Attend the <b>success</b> status in ccip explorer</h2>
            <br />
            <h3>2.. After you can procede for withdrawals in Optimism chain your WTETH</h3>
            <br />
            <h4>go to withdrawals page for continue  <a href="/dashboard/withdrawals-WTETH">Withdrawals</a></h4>
            <br />
           
        </>
      )}
      {isErrorDepositEth && <div>Error: {errorDepositEth?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )
}
