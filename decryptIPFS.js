import SelfGuard from 'selfguard-client'
import fs from 'fs';

let API_KEY = process.argv[2]; //file to be encrypted
let key_pair_path = process.argv[3]; // key_pair file that was downloaded
let file_id = process.argv[4]; //file to be encrypted

let readFilePromise = (path, ) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

(async () => {
  let data = await readFilePromise(key_pair_path);
  let {public_key,private_key} = JSON.parse(data);
  let sg = new SelfGuard(API_KEY,public_key,private_key);
  let result = await sg.decryptFile(file_id,(_, data) => {
    console.log(data);
  });
  console.log(result);
  return;
})();
