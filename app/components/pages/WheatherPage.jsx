import React from 'react';
import WeatherForm from './WeatherForm.jsx';
import WeatherMessage from './WeatherMessage.jsx';
import OpenWeatherMap from '../../api/OpenWeatherMap.jsx';
import Promisses from '../../poc/promises.jsx';

class WheatherPage extends React.Component {
  constructor(){
    super();
    this.state = {
      city : '',
      temperature : '',
      isLoading : false,
      errorMessage : undefined
    }
  }

  componentDidMount(){

    // props içindeki location objesi react-router'dan geliyor ve
    // adres çubuğunda yazılı query string bilgilerini içeriyor.
    // location.query nesnesi içinden her bir query stringine ulaşabiliyoruz.

    let city = this.props.location.query.city;
    if (city && city.length>0){
      this.handleGetWeather(city);
      window.location.hash = "#/";
    }

  }

  componentWillReceiveProps(newProps){
    let city = newProps.location.query.city;
    if (city && city.length>0){
      this.handleGetWeather(city);
      window.location.hash = "#/";
    }
  }

  handleGetWeather(city){

    this.setState({
      isLoading:true,
      errorMessage:undefined,
      city : undefined,
      temperature: undefined
    });

    OpenWeatherMap.GetTemp(city).then(function(data){
      let updates = {city : city, temperature: data, isLoading:false};
      this.setState(updates);
    }.bind(this),
    function(err){
      let updates = {
        city : undefined,
        temperature: undefined,
        isLoading:false,
        errorMessage : err.message,
      };
      this.setState(updates);
    }.bind(this));

  }

  onPromiseTest(){

    console.log("onPromiseTest");
    alert(Promisses.DosyaAdi);

    Promisses.CalculateSquare(13, 1000).then(function (sonuc) {
      alert(sonuc);
    }, function(err){
      alert("Hata" + err)
    });

    Promisses.Logger.LogDosyaAdi();

  }

  render(){
    let {temperature, city, isLoading, errorMessage} = this.state;

    let renderMessage = function(){
      if (isLoading){
        return <h3 className="text-center">Hava durumu alınıyor...</h3>;
      } else if (temperature && city){
        return <WeatherMessage il={city} sicaklik={temperature} ></WeatherMessage>;
      }
    }

    let renderError = function(){
      if (typeof errorMessage === 'string'){
        return(
          null
        );
      }
    }

    return(
      <div>
        <WeatherForm
          onGetWeather={this.handleGetWeather.bind(this)}
          title = {this.props.route.pageTitle}
          ></WeatherForm>
        {renderMessage()}
        {renderError()}
        <button className="button" onClick={this.onPromiseTest.bind(this)}>Promise Test </button>
      </div>
    );
  }

}

export default WheatherPage;
