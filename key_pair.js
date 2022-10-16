import SelfGuard from 'selfguard-client';

let API_Key = process.argv[2]; // specify your api key
let sg = new SelfGuard(API_Key);

(async () => {
    let rsa = sg.createKeyPair('rsa');
    let ecdsa = sg.createKeyPair('ecdsa');
    console.log({rsa,ecdsa});
    let encrypted_private_key = await sg.uploadKeyPair(rsa,'password');
    let key_pairs = await sg.getKeyPairs();
    let decrypted_keyPair = sg.decryptWithPassword(key_pairs[key_pairs.length -1].encrypted_private_key,'password');
    console.log({key_pairs});
    console.log({decrypted_keyPair});
})();
