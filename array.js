import SelfGuard from 'selfguard-client';

let API_Key = process.argv[2]; //api key from args
let sg = new SelfGuard(API_Key);

(async () => {
  let key = 'chat'+Math.random();

  await sg.initArray(key);
  await sg.addToArray(key, 'value');

  let array = await sg.getArray(key);
  console.log({array});

  let keys = await sg.getArrayNames();
  console.log({keys});

  let encryption_key = await sg.getMyEncryptionKeyForArray(key);
  console.log({encryption_key})

  let key_pair = await sg.createKeyPair();
  await sg.addUserToArray(key, key_pair.public_key);

})();
