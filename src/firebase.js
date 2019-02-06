import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import config from './config/firebase';
// Initialize Firebase
firebase.initializeApp(config);

export const refs = {
  gathering: 'OnlineUsers',
  games: 'Games',
};


// export const provider = new firebase.auth.GoogleAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
// export const authRef = firebase.auth();
export default firebase;
