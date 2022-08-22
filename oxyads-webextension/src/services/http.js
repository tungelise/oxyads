import axios from 'axios';
import { API_BASE_URL } from '../constants';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
} 

function getAccessToken(haveToken) {
  return new Promise((resolve, reject) => {
    if (haveToken) {
      chrome.storage.sync.get("access_token", ({ access_token }) => {
        resolve(access_token);
      });
    } else {
      resolve('');
    }
  });
}

export const callApi = (endpoint, method, payload, withoutToken) => {
  return new Promise((resolve, reject) => {
    getAccessToken(! withoutToken).then((access_token) => {
      if (access_token) {
        headers['Authorization'] = " Bearer " + access_token;
      }
      
      if (method === 'post') {
        axios.post(API_BASE_URL + endpoint, payload, {
          headers: headers
        }).then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
      }
    })
    .catch((error) => {
    });
  });
}