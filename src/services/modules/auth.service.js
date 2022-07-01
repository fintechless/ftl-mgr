import CryptoJS from "crypto-js";

export const authService = {
  login,
};

const key = "U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=";
const first = "34b7e5134f109fcd9111c44b9efeffd0e9a1a1c3";
const second = "02b3bbea45d7585beb082378bd35ac048a71cd44";

function login(model) {
  return new Promise((resolve, reject) => {
    var encryptedEmail = CryptoJS.HmacSHA1(model.email, key);
    var encryptedPassword = CryptoJS.HmacSHA1(model.password, key);

    if (
      encryptedEmail.toString() === first &&
      encryptedPassword.toString() == second
    )
      return resolve(encryptedEmail.toString());
    else return reject(new Error("Error!"));
  });
}
