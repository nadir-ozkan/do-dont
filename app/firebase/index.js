import firebase from 'firebase';

var _fbRef;

var _getFirebaseRef = function _getFirebaseRef() {
  if (!_fbRef){
    const config = {
        apiKey: "AIzaSyCgr8v6ARCjL8OzSZRGDNS1JeKLz4bKFtc",
        authDomain: "math-game-c66ec.firebaseapp.com",
        databaseURL: "https://math-game-c66ec.firebaseio.com",
        projectId: "math-game-c66ec",
        storageBucket: "math-game-c66ec.appspot.com",
        messagingSenderId: "447354560168"
      };

      firebase.initializeApp(config);
      _fbRef = firebase.database().ref();
  }
  return _fbRef;
}

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const fbRef = _getFirebaseRef();
export default firebase;
