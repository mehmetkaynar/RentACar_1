"use strict";

const morgan = require("morgan");
const fs = require("node:fs"); //node:fs ifadesi, Node.js'nin dahili (built-in) bir modülünü içeri aktarmak için kullanılır. Bu modül, dosya ve dizin işlemleri için çeşitli işlevler içerir. fs(file system) = Bu modül, dosyaları oluşturmak, okumak, yazmak, güncellemek, silmek ve diğer dosya işlemlerini gerçekleştirmek için kullanılır.

// const now = new Date().toISOString().split("T")[0]; // bu kod,asagidaki kodun birlestirilmis hali. Farki ise asagidaki her gunlugu farkli dosyada tutarken, bu kod ise gunlugu tek dosyada tutar.

const now = new Date();
const today = now.toISOString().split("T")[0];
//toISOString yöntemi, tarihi ISO 8601 biçiminde bir dizeye dönüştürür. Örneğin, "2023-10-20T13:45:00.000Z" gibi bir dize üretebilir.

module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`),
  //createWriteStream: gunluk verileri bir dosyaya yazmayi ayarlar.
  //createWriteStream günlük verilerini bir dosyaya yazmak için kullanılırken, createReadStream bir dosyadan veri okumak için kullanılır.
});
