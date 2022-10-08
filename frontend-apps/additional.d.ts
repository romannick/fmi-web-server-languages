import { ChainId } from "./libs/interfaces/src/Network";

export interface Ethereum {
  request: (options: {
    method: string
    params?: { data?: string; from?: string; to?: string; chainId?: ChainId }[]
  }) => Promise<any>
  selectedAddress: string,
  on: (event: string, callback: (data: unknown) => void) => void
}

export interface Solana {}

declare global {
  interface Window {
    ethereum: Ethereum
    solana: Solana
  }
}
