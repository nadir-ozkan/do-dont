import firebase from 'firebase';

var _fbRef;

var _getFirebaseRef = function _getFirebaseRef() {
  if (!_fbRef){
    const config = {
        apiKey: "AIzaSyDRL0tGplOcdGP4dCCrA3sXCOusGbkNmgM",
        authDomain: "do-dont.firebaseapp.com",
        databaseURL: "https://do-dont.firebaseio.com",
        projectId: "do-dont",
        storageBucket: "do-dont.appspot.com",
        messagingSenderId: "1088307007360",
        appId: "1:1088307007360:web:d4d9ebc195ba62e0"
      };

      firebase.initializeApp(config);
      _fbRef = firebase.database().ref();
  }
  return _fbRef;
}

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const fbRef = _getFirebaseRef();
export default firebase;
