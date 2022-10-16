import SelfGuard from 'selfguard-client';

let API_Key = process.argv[2]; // specify your api key
let sg = new SelfGuard(API_Key);

(async () => {
  try {
    let files = await sg.getFiles();
    for(let {name,id} of files.files){
      console.log({name,file_id:id});
    }
  }
  catch(err){
    console.log(err);
  }
})();
