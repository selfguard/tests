import SelfGuard from 'selfguard-client';
// import {generateWallet} from 'selfguard-client/wallet.js';

let API_Key = process.argv[2]; //api key from args
let sg = new SelfGuard(API_Key);

(async () => {
  let {encryption_key_id, ciphertext} = await sg.encrypt("value3");
  console.log({encryption_key_id, ciphertext});

  let decryptedText = await sg.decrypt(ciphertext, encryption_key_id);
  console.log({decryptedText});

  let ciphertext2 = sg.encryptWithPassword('value4','password1');
  console.log({ciphertext2});
  let value = sg.decryptWithPassword(ciphertext2,'password1');
  console.log({value});

})();
