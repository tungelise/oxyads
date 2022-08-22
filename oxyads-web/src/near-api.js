import { connect, Contract, WalletConnection, utils, providers, keyStores } from 'near-api-js'
import { getConfig } from './near-config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initialize a Contract Object (to interact with the contract)
  window.contract = await new Contract(
    window.walletConnection.account(), // user's account
    nearConfig.contractName, // contract's account
    {
      viewMethods: ['beneficiary', 'get_allcamps', 'total_allcamps', 'get_balance_of_campaign'],
      changeMethods: ['pay_camp'],
    }
  );
}

export function signOutNearWallet() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function signInWithNearWallet() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function getTransactionResult(txhash) {
  const transaction = await window.near.connection.provider.txStatus(txhash, window.walletConnection.getAccountId())
  let donated_so_far = providers.getTransactionLastResult(transaction)
  return utils.format.formatNearAmount(donated_so_far);
}

export async function getBeneficiary() {
  return await window.contract.beneficiary()
}

export async function latestDonations() {
  const total_donations = await window.contract.total_donations()

  const min = total_donations > 10 ? total_donations - 9 : 0

  let donations = await window.contract.get_donations({ from_index: min.toString(), limit: total_donations })
  
  return donations
}

export async function deposit(amount, campId) {
  amount = utils.format.parseNearAmount(amount.toString());
  console.log(amount);
  let response = await window.contract.pay_camp({
    args: {"camp": campId}, amount: amount
  })
  return response
}