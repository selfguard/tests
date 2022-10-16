import SelfGuard from 'selfguard-client';
import fs from 'fs';

let API_Key = process.argv[2]; //api key from args
let sg = new SelfGuard(API_Key);

(async () => {
  try {
    //grab all key pairs
    let key_pairs = await sg.getKeyPairs();

    //take password from args
    let password = process.argv[3];

    //iterate through key pairs
    for(let i = 0; i < key_pairs.length; i++) {
      let name = key_pairs.length > 1 ? `key_pair-${i}.json` : 'key_pair.json';

      //decrypt private key with password from cli arg
      let private_key = sg.decryptWithPassword(key_pairs[i].encrypted_private_key,password);

      //save key pair to file
      let key_pair = {
        public_key: key_pairs[i].public_key,
        private_key
      }
      fs.writeFile(name, JSON.stringify(key_pair), ()=>{
        console.log(`Saved key pair to ${name}`);
      });
    }
  }
  catch(err){
    console.log(err);
  }
})();
