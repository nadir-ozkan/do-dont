import React from 'react';

// props içinden il ve sicaklik parametrelerini çıkart!
// ({il, sicaklik}) = let {il, sicaklik} = props;
// destructering in the function signature...
let WeatherMessage = ({il, sicaklik}) => {
// Argüman olarak props sağlanacağına göre aşağıdaki kodu yazmak yerine
// doğrudan fonksiyona descructered olarak gönderebiliriz yukarıdaki gibi...

  //let {il, sicaklik} = props;

  let mesaj = null;

  // Bunu ekledim çünkü sıcaklık verisi o an için 0 ise
  // alttaki if ifadesi false dönüyordu ve bu yüzden
  // hiçbir mesaj görüntülenmiyordu. :((
  sicaklik = sicaklik.toString();

  if (il && sicaklik){
    mesaj = il + ' ilinde sıcaklık ' + sicaklik + ' derecedir!';
  }
  return(
    <h4 className="text-center">{mesaj}</h4>
  );
}

export default WeatherMessage;
