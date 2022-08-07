// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from './../../Assets/firebase/firebase-app.js';


class FirebaseController {
	
	constructor() {
		const firebaseConfig = {
			apiKey: "YOUR_FIREBASE_API_KEY",
			authDomain: "YOUR_FIREBASE_DOMAIN",
			databaseURL: "YOUR_FIREBASE_DATABSE_URL",
			projectId: "YOUR_FIREBASE_PROJECT_ID",
			storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
			messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
			appId: "YOUR_FIREBASE_APP_ID"
		};

		// Initialize Firebase
		initializeApp(firebaseConfig);	
	
		
		
	}	 
}  
export const firebaseInstance = new FirebaseController();