import jwkToPem from 'jwk-to-pem';
// import JsonWebToken from 'jsonwebtoken';
import pkg from 'jsonwebtoken';
const { JwtHeader, SigningKeyCallback } = pkg;
import jwksClient from 'jwks-rsa';
import fetch from 'node-fetch';

(async () => {
  let jwk = await fetch(`https://selfguard-auth.herokuapp.com/recipe/jwt/jwks`)
  jwk = (await jwk.json()).keys[0];

  let publicKey = jwkToPem(jwk);
  let obj = {
    "type":"RS256",
    "key":publicKey
  }

  console.log(JSON.stringify(obj))

  var client = jwksClient({
    jwksUri: 'https://selfguard-auth.herokuapp.com/recipe/jwt/jwks'
  });

  function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      var signingKey = key.getPublicKey();
      callback(err, signingKey);
    });
  }

  // JsonWebToken.verify(jwt, publicKey, {}, function (err, decoded) {
  //   console.log({err});
  //   let decodedJWT = decoded;
  //   // Use JWT
  // });


})();
