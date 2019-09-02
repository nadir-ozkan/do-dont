import React from 'react';

class WeatherForm extends React.Component{

  onGetWeatherClick(event){
    event.preventDefault();
    if (typeof city === 'string' && city.length > 0 ){
      this.refs.city.value = "";
      this.props.onGetWeather(city);
    }
  }

  render(){
    return(
      <div>
        <h2 className='page-title'>{this.props.title}</h2>
        <form>
          <input type="search" ref="city" placeholder="Lütfen bir şehir giriniz."></input>
          <button className="button expanded hollow" type="submit" onClick={this.onGetWeatherClick.bind(this)}>Tahmin Al</button>
        </form>
      </div>
    );
  }
}

export default WeatherForm;
