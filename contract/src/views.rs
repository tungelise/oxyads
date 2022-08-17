use near_sdk::serde::Serialize;
use crate::*; 

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Campaign {
  pub campaign_id: String,
  pub total_amount: U128,
}

#[near_bindgen]
impl Contract {
  // Public - get Campagne by campaign ID
  pub fn get_balance_of_campaign(&self, camp: String) -> Campaign {
    Campaign {
      campaign_id: camp.clone(),
      total_amount: U128(self.camps.get(&camp).unwrap_or(0)),
    }
  }

  // Public - get total number of allcamps
  pub fn total_allcamps(&self) -> u64 {
    self.camps.len()
  }

  // Public - paginate through all allcamps on the contract
  pub fn get_allcamps(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<Campaign> {
      //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
      let start = u128::from(from_index.unwrap_or(U128(0)));

      //iterate through Campaign
      self.camps.keys()
        //skip to the index we specified in the start variable
        .skip(start as usize) 
        //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
        .take(limit.unwrap_or(50) as usize) 
        .map(|account| self.get_balance_of_campaign(account))
        //since we turned map into an iterator, we need to turn it back into a vector to return
        .collect()
  }
  
  // Public - beneficiary getter
  pub fn beneficiary(&self) -> AccountId {
      self.beneficiary.clone()
  }
}