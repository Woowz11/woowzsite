console.log("LOAD DATABASE");
/*I can't hide this data ☹️😢😨😰😭😪*/
const firebaseConfig = {
	apiKey: "AIzaSyCXq5AwWMlwO7lYlcVLxorPJPdPakdzLI4",
	authDomain: "woowzsitesdatabase.firebaseapp.com",
	projectId: "woowzsitesdatabase",
	storageBucket: "woowzsitesdatabase.appspot.com",
	messagingSenderId: "695634918360",
	appId: "1:695634918360:web:bcf4e389c542a7c50050ad",
	databaseURL: "https://woowzsitesdatabase-default-rtdb.firebaseio.com/"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const databaseApp = initializeApp(firebaseConfig);
var database = getDatabase(databaseApp);

export function SaveData(key,data){
	const dataref = ref(database, key);
	set(dataref, data).then(()=>{console.log("Save to ["+key+"] database!");}).catch((error)=>{console.error("Error saving data for key [" + key + "]:",error);});
}

export function LoadData(key){
    const dataref = ref(database, key);
    
    return new Promise((resolve, reject) => {
        get(dataref).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val());
            } else {
                console.error("Data [" + key + "] not found!");
                resolve(null);
            }
        }).catch((error) => {
            console.error("Error loading data for key [" + key + "]:", error);
            reject(error);
        });
    });
}