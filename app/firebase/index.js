import firebase from 'firebase';

import utils from '../Utils/utils.js';

var _fbRef;

var _getFirebaseRef = function _getFirebaseRef() {
  if (!_fbRef){
      const config = utils.config.firebaseCongif;
      firebase.initializeApp(config);
      _fbRef = firebase.database().ref();
  }
  return _fbRef;
}

const _getData = function(refStr) {
      const fbRef = _getFirebaseRef();
      return new Promise(function(resolve, reject) {
          fbRef.child(refStr).once("value")
              .then((ss) => {
                  ss.exists() ? resolve(ss.val()) : resolve(null);
              })
              .catch((hata) => {
                  console.log("Hata " + hata.toString());
                  reject(hata);
                  throw hata;
              });
        });
    }

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const fbRef = _getFirebaseRef();
export const getData = _getData;
export default firebase;
