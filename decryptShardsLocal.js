import {decryptBytes} from 'selfguard-client/helpers/encryption.js'
import fs from 'fs';

let output_file_path = process.argv[2]; // specify your encryption key path

let getName = (text) => text.split('.').slice(0,-1).join('.')
let getEnding = (text) => text.split('.').at(-1)

let encryption_key_path = `${getName(output_file_path)}-keys.json`;

let readFilePromise = (path, ) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
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
  let encryption_keys = await readFilePromise(encryption_key_path);
  encryption_keys = JSON.parse(encryption_keys);
  
  //decrypt each shards and append to file
  for(let i = 0; i < Infinity; i++){
    let name = `${getName(output_file_path)}-${i}.${getEnding(output_file_path)}`;
    if(fs.existsSync(name)){
      let file_data = await readFilePromise(name);
      let decrypted_shard = await decryptBytes(file_data, encryption_keys[name]);
      console.log('decrypted ' + name);
      await appendFilePromise(output_file_path, decrypted_shard);
    }
    else {
      break;
    }
  }
  return;
})();
