'use client'

import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite, useAccount, useEnsName } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {SepoliaConfig} from "../abiContract/sepolia"
import { useDebounce } from '../../hooks/useDebounce'
import {dep_SepoliaConfig_to_arbitrum} from "../abiContract/abiDepKs/dep_sepolia_arbitrum" 
import {ccip_abi_config_sepolia} from "../abiContract/abiDepKs/ccip_abi_sepolia"
import { useState } from 'react'

const _destinationChainSelector = "6101244977088475029" 
const tokenAddressCcipBnmSepolia = "0x0579b4c1C8AcbfF13c6253f1B10d66896Bf399Ef" as `0x${string}`

export function DepositInSepoliaToArbitrum() {
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })

   const debouncedToKsSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";

    //deposit Eth
    const [depositValue, setDepositValue] = useState<string>('');
    


    const { write : writeDepositEth, data: DataDepositEth, error: errorDepositEth, isLoading: isLoadingDepositEth, isError: isErrorDepositEth } = useContractWrite({
        ...dep_SepoliaConfig_to_arbitrum,
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
          
          <a href={`https://sepolia.etherscan.io/tx/${DataDepositEth?.hash}`} target="_blank" rel="noopener noreferrer">view deposit eth in explorer </a>
          
          <a href={`https://sepolia.etherscan.io/tx/${DataMint?.hash}`} target="_blank" rel="noopener noreferrer">view mint ccip in explorer </a>

          <div>Copy and paste this hash in ccip explorer: {DatatransferCcip?.hash}</div>
          <a href={`https://ccip.chain.link/msg/`} target="_blank" rel="noopener noreferrer">here</a>
          
          {/* <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div> */}
        </>
      )}
      {isErrorDepositEth && <div>Error: {errorDepositEth?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )
}
