import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDFtv6SdybFMhNa3TZoqDETyhjlwIGRxBw',
  authDomain: 'crwn-db-ecf9d.firebaseapp.com',
  projectId: 'crwn-db-ecf9d',
  storageBucket: 'crwn-db-ecf9d.appspot.com',
  messagingSenderId: '526151370434',
  appId: '1:526151370434:web:3bbf8075a0d29e9bc8dd5b',
  measurementId: 'G-Y76C301W8L'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('err creatung user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;