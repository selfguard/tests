import SelfGuard from 'selfguard-client';
// import {generateWallet} from 'selfguard-client/wallet.js';

let API_Key = process.argv[2]; // specify your api key
let address = process.argv[3];
let email = process.argv[4];
let phone = process.argv[5];
let sg = new SelfGuard(API_Key);

(async () => {

  let addresses = await sg.getProfiles();
  console.log(addresses);
  let val = await sg.updateProfile(address,{email,phone});
  console.log(val);

  // let put = await sg.sendEmail({address,from:"test@selfguard.xyz", fromName:"testFromName", replyTo:"test@selfguard.xyz", replyToName:"testReplyToName", subject:"testSubject", html:"testContent"});
  // console.log({put});
  // let put2 = await sg.sendSMS({address,text:'test'});
  // console.log({put2});
})();
