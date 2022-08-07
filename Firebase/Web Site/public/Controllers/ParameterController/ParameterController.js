import {firebaseInstance} from "./../FirebaseController/firebase.js"
import {getDatabase, ref, query, onValue, orderByChild, startAt, endAt} from './../../Assets/firebase/firebase-database.js';

class ParameterController {
	constructor() {
	  
	}
	getAll(callback, from, to, onerror) {
		const db = getDatabase();		
		let date_from = from.getTime();
		let date_to = to.getTime();
		let rf = ref(db, 'hist/');

		const qry = query(rf, orderByChild("i"), startAt(date_from, "i"), endAt(date_to, "i"));	
		onValue(qry, (snapshot) => {
	      if(snapshot.exists()){			  
			let ret = [];

			snapshot.forEach(function(item) {
				var itemVal = item.val();
				ret.push(itemVal);
			});	  
			  
			callback(ret); 
		  }else
			 callback([]);			
		},(error) => {
			callback([]);	
			console.log(error);			
		}, {
		  onlyOnce: true
		});
	}       
}  
export const parameterInstance = new ParameterController();


