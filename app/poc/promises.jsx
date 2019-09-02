
const dosyaAdi = "Promisses.jsx";

// Promise example :
let calculateSquare = function(sayi, beklemeSuresi){
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      try {
        let _sayi = parseInt(sayi, 10);
        if (!isNaN(_sayi)){
          resolve(_sayi * _sayi);
        } else {
          reject("Lütfen bir sayı giriniz.")
        }
      } catch (e) {
        resolve("Girilen veri bir sayı değildir.");
      }
    }, beklemeSuresi);

  });
};

let getWeather = function (city){
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve({sicaklik : "23"});
      reject("Geçersiz bir şehir girdiniz.");
    }, 2000);
  });
};

export default  {
  DosyaAdi : dosyaAdi,
  AlertDosyaAdi : function () {
    console.log(dosyaAdi)
  },
  CalculateSquare : calculateSquare,
  GetWeather : getWeather,
  Logger : {
    LogDosyaAdi : function(){
      console.log(dosyaAdi);
    }
  }
}
