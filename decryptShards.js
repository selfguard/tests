import SelfGuard from 'selfguard-client';
import {decryptBytes} from 'selfguard-client/helpers/encryption.js'
import fs from 'fs';

let API_Key = process.argv[2]; // specify your api key
let key_pair_path = process.argv[3]; // key_pair file that was downloaded
let file_id = process.argv[4]; //file id to get encryption keys
let file_output_path = process.argv[5]; // file output path
let input_file_names = process.argv.splice(6); //file input paths in order

let readFilePromise = (path, ) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

let appendFilePromise = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

(async () => {
  //instantiate selfguard instance from key_pair
  let data = await readFilePromise(key_pair_path);
  let {public_key,private_key} = JSON.parse(data);
  let sg = new SelfGuard(API_Key,public_key,private_key);
  
  //grab encryption keys for shards
  let file_encryption_keys = await sg.getFileEncryptionKeys(file_id);

  //decrypt each shards and append to file
  for(let i = 0; i < input_file_names.length; i++){
    let file_name = input_file_names[i];
    let {encryption_key} = file_encryption_keys[i];
    let file_data = await readFilePromise(file_name);
    let decrypted_shard = await decryptBytes(file_data, encryption_key.key);
    await appendFilePromise(file_output_path, decrypted_shard);
  }
  return;
})();
