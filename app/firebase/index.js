import firebase from 'firebase';

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
  };

  firebase.initializeApp(config);
} catch (e) {
	console.log('Firebase setup failed');
}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var dbRef = firebase.database().ref();
export default firebase;