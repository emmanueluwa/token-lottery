// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import TokenlottoIDL from '../target/idl/tokenlotto.json'
import type { Tokenlotto } from '../target/types/tokenlotto'

// Re-export the generated IDL and type
export { Tokenlotto, TokenlottoIDL }

// The programId is imported from the program IDL.
export const TOKENLOTTO_PROGRAM_ID = new PublicKey(TokenlottoIDL.address)

// This is a helper function to get the Tokenlotto Anchor program.
export function getTokenlottoProgram(provider: AnchorProvider) {
  return new Program(TokenlottoIDL as Tokenlotto, provider)
}

// This is a helper function to get the program ID for the Tokenlotto program depending on the cluster.
export function getTokenlottoProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Tokenlotto program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return TOKENLOTTO_PROGRAM_ID
  }
}
