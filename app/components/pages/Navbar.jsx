import React from 'react';
import {Link, IndexLink} from 'react-router';

class Navbar extends React.Component{

  onSearch(event){
    event.preventDefault();
    let searchText = this.refs.navSearch.value;
    // Önemli
    // Url olarak kullanman gereken bir metin var ise
    // mutlaka encodeURIComponent kullanarak kodla
    // böylece url içinde kullanılmaya uygun hale gelir...
    searchText = encodeURIComponent(searchText);

    if (searchText.length > 0 ){
      this.refs.navSearch.value = '';
      window.location.hash = '#/?city='+searchText;
    }
  }

  render(){
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">React Hava Durumu</li>
            <li>
              <IndexLink to="/" activeClassName="activeLink">Hava Durumu</IndexLink>
            </li>
            <li>
              <Link to="/about" activeClassName="activeLink">Hakkında</Link>
            </li>
            <li>
              <Link to="/examples" activeClassName="activeLink">Örnekler</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
