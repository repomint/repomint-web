const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const bs58 = require("bs58");

(async () => {
  // Connect to cluster
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  // decode wallet private key
  const fromDecoded = bs58.decode("wallet 1 private key here");
  // Generate a new wallet keypair and airdrop SOL
  const fromWallet = web3.Keypair.fromSecretKey(fromDecoded);

  /* use this block of code to airdrop SOL to your wallet
  // const fromAirdropSignature = await connection.requestAirdrop(
  //   fromWallet.publicKey,
  //   web3.LAMPORTS_PER_SOL,
  // );

  // //wait for airdrop confirmation
  // await connection.confirmTransaction(fromAirdropSignature);
  */

  //create new token mint
  let mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9,
    splToken.TOKEN_PROGRAM_ID
  );

  //get the token account of the fromWallet Solana address, if it does not exist, create it
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  );

  const toDecoded = bs58.decode("wallet 2 private key here");
  // Generate a new wallet to receive newly minted token
  let toWallet = web3.Keypair.fromSecretKey(toDecoded);

  //get the token account of the toWallet Solana address, if it does not exist, create it
  let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    toWallet.publicKey
  );

  //minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mint.mintTo(
    fromTokenAccount.address, //who it goes to
    fromWallet.publicKey, // minting authority
    [], // multisig
    1000000000 // how many
  );

  await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    fromWallet.publicKey,
    []
  );

  // Add token transfer instructions to transaction
  const transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1
    )
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    { commitment: "confirmed" }
  );
  console.log("SIGNATURE", signature);
})();
