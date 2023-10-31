"use strict";

//crypto modülü, uygulama güvenliği ve kriptografik işlemler için önemli bir araçtır ve birçok kullanım alanı vardır.Örneğin, bu modülle şifreleme yapabilir, parolaları hashleyebilir ve daha fazla kriptografik işlemi uygulayabiliriz.
const crypto = require("node:crypto"),
  keyCode = process.env.SECRET_KEY,
  loopCount = 10_000,
  charCount = 32,
  encType = "sha512";
//sha512, "Secure Hash Algorithm 512" olarak bilinen bir kriptografik karma (hash) fonksiyonunun adıdır. sha512, bir veriyi belirli bir sabit uzunluktaki bir dizeye dönüştüren ve bu dizeyi hesaplarken birçok kriptografik özelliği içeren bir algoritmadır.

module.exports = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
  //Eşzamanlı (synchronous) bir işlemdir ve geri dönüş değeri olarak türetilmiş anahtarı hemen döndürür. Bu nedenle işlem sonuçlanana kadar diğer işlemler bekler. Genellikle senkron işlemler, özellikle parola hashleme gibi işlemler için kullanılır, çünkü sonucu almadan devam etmek güvensiz olabilir.
};
