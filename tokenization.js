import SelfGuard from 'selfguard-client';
// import {generateWallet} from 'selfguard-client/wallet.js';

let API_Key = process.argv[2]; // specify your api key
let sg = new SelfGuard(API_Key);

(async () => {
  let token_id = await sg.tokenize('This is some super top secret text!');
  console.log({token_id});

  let data = await sg.detokenize(token_id);
  console.log({data});
})();
