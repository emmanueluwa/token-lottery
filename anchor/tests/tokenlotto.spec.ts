import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Tokenlotto} from '../target/types/tokenlotto'

describe('tokenlotto', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Tokenlotto as Program<Tokenlotto>

  const tokenlottoKeypair = Keypair.generate()

  it('Initialize Tokenlotto', async () => {
    await program.methods
      .initialize()
      .accounts({
        tokenlotto: tokenlottoKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([tokenlottoKeypair])
      .rpc()

    const currentCount = await program.account.tokenlotto.fetch(tokenlottoKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Tokenlotto', async () => {
    await program.methods.increment().accounts({ tokenlotto: tokenlottoKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenlotto.fetch(tokenlottoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Tokenlotto Again', async () => {
    await program.methods.increment().accounts({ tokenlotto: tokenlottoKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenlotto.fetch(tokenlottoKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Tokenlotto', async () => {
    await program.methods.decrement().accounts({ tokenlotto: tokenlottoKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenlotto.fetch(tokenlottoKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set tokenlotto value', async () => {
    await program.methods.set(42).accounts({ tokenlotto: tokenlottoKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenlotto.fetch(tokenlottoKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the tokenlotto account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        tokenlotto: tokenlottoKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.tokenlotto.fetchNullable(tokenlottoKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
