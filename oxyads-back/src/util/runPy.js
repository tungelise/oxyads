// import {PythonShell} from 'python-shell';
require("dotenv").config();
const p = require('python-shell');

exports.runJob = async (storeId) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: [],
  };
  
  return new Promise((resolve, reject) => {
    if (storeId) {
      options.args = [storeId];
    }
    
    p.PythonShell.run(process.env.DATA_EXEC_PATH, options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log(results);
        resolve(results);
      }
    })
  });
}

exports.updateNftingNumber = async (storeId) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: [],
  };
  
  return new Promise((resolve, reject) => {
    if (storeId) {
      options.args = [storeId];
    }
    
    p.PythonShell.run(process.env.DATA_EXEC_PATH, options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log(results);
        resolve(results);
      }
    })
  });
}
