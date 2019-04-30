import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
	authDomain: 'think-piece-6bd12.firebaseapp.com',
	databaseURL: 'https://think-piece-6bd12.firebaseio.com',
	projectId: 'think-piece-6bd12',
	storageBucket: 'think-piece-6bd12.appspot.com',
	messagingSenderId: '721275765575'
};

firebase.initializeApp(config);

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return;

	//Get a reference to the place in the data where the user profile might be
	const userRef = firestore.doc(`users/${user.uid}`);

	//Go and fetch the document from that location

	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email, photoURL } = user;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.error('Error creating user', error);
		}
	}

	return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
	if (!uid) return null;

	try {
		return firestore.collection('users').doc(uid);
	} catch (error) {
		console.log('Error fetching user', error.message);
	}
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
