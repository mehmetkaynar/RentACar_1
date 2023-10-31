"use strict";

// sync():
//! BU MODUL :Bu işlev, veritabanını temizlemek veya test senaryoları için kullanmak gibi senaryolarda faydalı olabilir. Ancak, dikkatli kullanılmalıdır, çünkü verileri kalıcı olarak silecektir.

module.exports = async function () {
  return null; // return null; ifadesi bulunuyor ve bu ifade nedeniyle geri kalan kod kısmına hiçbir zaman ulaşılmayacaktır. Yani, veritabanını silme işlemi gerçekleşmeyecektir. Eğer bu kod veritabanını silmeyi amaçlıyorsa, return null; ifadesi kaldırılmalı veya bu işlev başka bir işlev veya kod parçası içinde kullanılmalıdır.

  /* REMOVE DATABASE */
  const { mongoose } = require("../configs/dbConnection");
  await mongoose.connection.dropDatabase(); // Bu satır, mongoose nesnesi üzerinden MongoDB veritabanını silmek için dropDatabase işlemini kullanır. await anahtar kelimesi, bu işlemin tamamlanmasını beklemeyi sağlar. Yani, bu işlem tamamlanana kadar sonraki adımlara geçmez
  console.log("- Database and all data DELETED!");
  /* REMOVE DATABASE */
};
