// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

// generateId :: Integer -> String
function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

/*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for the encrypt operation.
  */
function getMessageEncoding(message) {
  let enc = new TextEncoder();
  return enc.encode(message);
}

/*
Get some key material to use as input to the deriveKey method.
The key material is a password supplied by the user.
*/
function getKeyMaterial(password, secret) {
  let enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    new Uint8Array([...enc.encode(password), ...secret]),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
}

function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(plaintext, salt, password, secret, iv) {
  let keyMaterial = await getKeyMaterial(password, secret);
  let key = await getKey(keyMaterial, salt);
  return window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    plaintext
  );
}

//Decrypt the ciphertext using the key derived from the password.
//Needs to be caught in a try/catch block, because the decrypt can fail
async function decrypt(ciphertext, password, secret, iv, salt, encoded = true) {
  let keyMaterial = await getKeyMaterial(password, secret);
  let key = await getKey(keyMaterial, salt);
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  if (encoded) {
    let dec = new TextDecoder();
    return dec.decode(decrypted);
  } else {
    return decrypted;
  }
}

/*Generate a new client secret*/
function generateSecret(password) {
  let secretString = window.crypto.getRandomValues(new Uint8Array(32));
  let salt = window.crypto.getRandomValues(new Uint8Array(16));
  let iv = window.crypto.getRandomValues(new Uint8Array(16));
  localStorage.setItem("secretSalt", JSON.stringify(Array.from(salt)));
  localStorage.setItem("secretIV", JSON.stringify(Array.from(iv)));
  encrypt(secretString, salt, password, new Uint8Array(), iv).then((ct) => {
    localStorage.setItem(
      "encryptedSecret",
      JSON.stringify(Array.from(new Uint8Array(ct)))
    );
  });
  return JSON.stringify(Array.from(secretString));
}

/*Retrieve the client secret*/
function retrieveSecret(password) {
  let salt = new Uint8Array(JSON.parse(localStorage.getItem("secretSalt")));
  let iv = new Uint8Array(JSON.parse(localStorage.getItem("secretIV")));
  let ct = new Uint8Array(JSON.parse(localStorage.getItem("encryptedSecret")));
  return decrypt(ct, password, new Uint8Array(), iv, salt, false);
}

/*Store the client secret with a new IV and salt*/
function storeSecret(secret) {
  let encoded = new Uint8Array(JSON.parse(secret));
  let salt = window.crypto.getRandomValues(new Uint8Array(16));
  let iv = window.crypto.getRandomValues(new Uint8Array(16));
  localStorage.setItem("secretSalt", JSON.stringify(Array.from(salt)));
  localStorage.setItem("secretIV", JSON.stringify(Array.from(iv)));
  encrypt(
    encoded,
    salt,
    sessionStorage.getItem("key"),
    new Uint8Array(),
    iv
  ).then((ct) => {
    localStorage.setItem(
      "encryptedSecret",
      JSON.stringify(Array.from(new Uint8Array(ct)))
    );
  });
}

export {
  encrypt,
  decrypt,
  getMessageEncoding,
  getKeyMaterial,
  generateSecret,
  retrieveSecret,
  storeSecret,
};
