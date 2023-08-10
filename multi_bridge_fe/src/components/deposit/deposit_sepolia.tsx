'use client'

import { parseEther } from 'viem'
import { useWaitForTransaction, useContractWrite } from 'wagmi'
import { stringify } from '../../utils/stringify'
import {SepoliaConfig} from "../abiContract/sepolia"
import { useDebounce } from '../../hooks/useDebounce'
import {dep_SepoliaConfig} from "../../components/abiContract/abiDepKs/dep_sepolia"
import {ccip_abi_config_sepolia} from "../../components/abiContract/abiDepKs/ccip_abi"
import { useState } from 'react'

const _destinationChainSelector = "2664363617261496610" 
const tokenAddress = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05" as `0x${string}`
const receiverDepositOp = "0x9Faf785781fD7B2d42741C99b748497Ee2750933";

export function DepositInSepolia() {

   const debouncedToKsSepolia = "0x3Ec372b3506115d000b1B5e4c0C6aa611a677A8f";
    //deposit Eth
    const [depositValue, setDepositValue] = useState<string>('');


    const { write : writeDepositEth, data: DataDepositEth, error: errorDepositEth, isLoading: isLoadingDepositEth, isError: isErrorDepositEth } = useContractWrite({
        ...dep_SepoliaConfig,
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
    const { write, data: DatatransferCcip, error: errorTransferCcip, isLoading: isLoadingTransferCcip, isError: isErrorTransferCcip } = useContractWrite({
        ...SepoliaConfig,
        functionName: 'transferTokens',
      })
      const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
      } = useWaitForTransaction({ hash: DatatransferCcip?.hash })

    //   const {
    //     DatatransferCcip: receiptTransfer,
    //     isLoading: isPending,
    //     isSuccess,
    //   } = useWaitForTransaction({ hash: data?.hash })

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
          write({
            args: [BigInt(destinationChain), receiverDepositOp , tokenAddress , parseEther(value as `${number}`)],
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
          <div>Transaction Hash Deposit: {DataDepositEth?.hash}</div>
          <div>Transaction Hash to Mint-Ccip: {DataMint?.hash}</div>
          <div>Transaction Hash to Ccip: {DatatransferCcip?.hash}</div>
          
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isErrorDepositEth && <div>Error: {errorDepositEth?.message}</div>}
      {isErrorTransferCcip &&  <div>Error: {errorTransferCcip?.message}</div>}
    </>
  )
}
