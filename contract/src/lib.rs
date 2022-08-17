use near_sdk::json_types::U128;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, log, near_bindgen, AccountId, Promise, Balance};
use near_sdk::collections::{UnorderedMap};

pub const STORAGE_COST: u128 = 1_000_000_000_000_000_000_000;
// const 1_NEAR: u128 = 1000000000000000000000000;
const DEFAULT_BENEFICIARY: &str = "tungnguyen1.testnet";

mod views;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
  pub beneficiary: AccountId,
  pub camps: UnorderedMap<String, u128>,
}

impl Default for Contract {
  fn default() -> Self {
    Self{
      beneficiary: DEFAULT_BENEFICIARY.parse().unwrap(),
      camps: UnorderedMap::new(b"u"),
    }
  }
}

#[near_bindgen]
impl Contract {
  #[init]
  #[private] // Public - but only callable by env::current_account_id()
  pub fn new(beneficiary: AccountId) -> Self {
    assert!(!env::state_exists(), "Already initialized");
    Self {
      beneficiary,
      camps: UnorderedMap::new(b"u"),
    }
  }

  #[payable] // Public - People can attach money
  pub fn pay_camp(&mut self, camp: String) -> U128 {
    // Get who is calling the method and how much $NEAR they attached
    let donor: AccountId = env::predecessor_account_id();
    let camp_amount: Balance = env::attached_deposit();
    let mut camp_so_far = self.camps.get(&camp).unwrap_or(0);
    // let tong = donor.clone().to_string() + "_" + &camp.clone();

    // Persist in storage the amount campaign so far
    camp_so_far += camp_amount;
    self.camps.insert(&camp, &camp_so_far);
    
    log!("Thank you {} for purchasing campaign {} with total {}!", donor.clone(), camp.clone(), camp_amount);

    // Return the total amount of campaign so far
    U128(camp_so_far)
  }

  pub fn partial_settlement(&mut self, camp: String, amount: u128) {
    let total_amount = self.camps.get(&camp).unwrap_or(0);
    if total_amount > 0 && total_amount > STORAGE_COST && total_amount > amount {
      // Promise::new(self.beneficiary.clone()).transfer(2*NEAR1);
      Promise::new(self.beneficiary.clone()).transfer(amount);
      log!("Done: Transferred {} in total {}", amount.clone(), total_amount.clone());
    } else {
      log!("Can not transfer {} in total {}", amount.clone(), total_amount.clone());
    }  
  }

  // Public - but only callable by env::current_account_id(). Sets the beneficiary
  #[private]
  pub fn change_beneficiary(&mut self, beneficiary: AccountId) {
    self.beneficiary = beneficiary;
  }
}