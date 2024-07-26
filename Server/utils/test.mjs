import decrypt from "./decrypt.mjs";
import encrypt from "./encrypt.mjs";

const test = async () => {
  const encrypted = encrypt("123");
  console.log(encrypted);
  const decrypted = decrypt(encrypted);
  console.log(decrypted);
};

test();
