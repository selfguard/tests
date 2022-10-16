import {streamEncrypt} from 'selfguard-client/helpers/encryption.js'
import fs from 'fs';

let file_input_path = process.argv[2]; //file to be encrypted
let chunk_size = process.argv[3] ? process.argv[3] : 1000 * 1000 * 1000; // size of each encryption

let getName = (text) => text.split('.').slice(0,-1).join('.')
let getEnding = (text) => text.split('.').at(-1)

let writeFilePromise = (path,data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

(async () => {
  let encryption_keys = {};
  let i = 0;

  await streamEncrypt(file_input_path, chunk_size, async (encrypted_bytes, encryption_key)=>{
    //build the name of the chunk
    let name = `${getName(file_input_path)}-${i}.${getEnding(file_input_path)}`;
    console.log(name);
    //write to file
    await writeFilePromise(name,encrypted_bytes, encryption_key);
   
    //map encryption_key to name
    encryption_keys[name] = encryption_key;
    i++;
  });
  
  //save encryption keys
  await writeFilePromise(`${getName(file_input_path)}-keys.json`,JSON.stringify(encryption_keys));

  return;
})();
