import SelfGuard from 'selfguard-client';
// import {generateWallet} from 'selfguard-client/wallet.js';

let API_Key = process.argv[2]; // specify your api key
let address = process.argv[3];
let email = process.argv[4];
let phone = process.argv[5];
let sg = new SelfGuard(API_Key,null,null,'http://localhost:8080');

//6fda5947-5983-4492-b45f-33e71bbf460b

console.log({API_Key});
(async () => {
  let group = await sg.createNotificationGroup({collection_name:"Hello2",contract_address:"hello2"})
  // console.log({group});
  // let val = await sg.updateProfile({address,value:{email,phone},collection_name:"Hello"});
  // let addresses = await sg.getProfiles({collection_name:"Hello"});
  // console.log(addresses);
  // console.log(val);

  // let put = await sg.sendEmail({address,from:"test@selfguard.xyz", fromName:"testFromName", replyTo:"test@selfguard.xyz", replyToName:"testReplyToName", subject:"testSubject", html:"testContent"});
  // console.log({put});
  // let put2 = await sg.sendBulkSMS({collection_name:"Hello",text:'test'});
  // console.log({put2});
})();
