
const servAccount = require("./serviceAccount.json");
const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp({
	credentials: admin.credential.cert(servAccount),
	databaseURL: "https://parkinglotcapstone.firebaseio.com"
});

var db = admin.database();
var parkingLot = db.ref("parkingLot");


exports.getParkingLot = functions.https.onRequest((request, response) =>{
	console.log("Function executing");
	parkingLot.orderByKey().equalTo("0").once("value").then(function(snapshot){
		if(snapshot.exists()){
			console.log("snapshot exists!!");
			response.json(snapshot.toJSON());
			response.status(200).send();
		} else {
			console.log("No data found!");
			response.status(404).send();
		}
	}, function(error){
		console.log("Failed " + error.code);
	})
})
