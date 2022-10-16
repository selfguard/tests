import SelfGuard from 'selfguard-client';
// import {generateWallet} from 'selfguard-client/wallet.js';

let API_Key = process.argv[2]; // specify your api key
let sg = new SelfGuard(API_Key);

(async () => {
  let key = Math.random();
  // key = '0.2470685812973048';
  await sg.put(key,'value3');
  console.log(key);
  let val = await sg.get(key);
  console.log({val});
  // let keys = await sg.getKeys();
  // console.log({keys});
})();
