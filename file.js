import SelfGuard from 'selfguard-client';

let API_Key = process.argv[2]; // specify your api key
let key_pair_path = process.argv[3]; // key_pair file that was downloaded
let file_id = process.argv[4]; // key_pair file that was downloaded


let readFilePromise = (path, ) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

(async () => {
  try {
    //instantiate selfguard instance from key_pair
    let data = await readFilePromise(key_pair_path);
    let {public_key,private_key} = JSON.parse(data);
    let sg = new SelfGuard(API_Key,public_key,private_key);
    
    let file2 = await sg.decryptFile(file_id);
    console.log({file2});
  }
  catch(err){
    console.log(err);
  }
})();
