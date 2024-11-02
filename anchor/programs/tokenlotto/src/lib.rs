#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod tokenlotto {
    use super::*;

  pub fn close(_ctx: Context<CloseTokenlotto>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tokenlotto.count = ctx.accounts.tokenlotto.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tokenlotto.count = ctx.accounts.tokenlotto.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeTokenlotto>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.tokenlotto.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeTokenlotto<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Tokenlotto::INIT_SPACE,
  payer = payer
  )]
  pub tokenlotto: Account<'info, Tokenlotto>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseTokenlotto<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub tokenlotto: Account<'info, Tokenlotto>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub tokenlotto: Account<'info, Tokenlotto>,
}

#[account]
#[derive(InitSpace)]
pub struct Tokenlotto {
  count: u8,
}
