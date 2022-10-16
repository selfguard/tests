import fs from 'fs';

let appendFilePromise = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

(async () => {
  for(let j = 0; j < 3*100;j ++){
    let str = '';
    for(let i = 0; i < 10*1000*1000;i++){
      str+='hello\n';
    }
    console.log(j);
    let buf = Buffer.from(str, 'utf8');
    await appendFilePromise('hello.txt', buf);
  }
  return;
})();
