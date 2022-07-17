import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyCNTULeh09SwhmZaZTR7rsxg1_eEg_vfbw",
  authDomain: "simple-trello-ddda1.firebaseapp.com",
  projectId: "simple-trello-ddda1",
  storageBucket: "simple-trello-ddda1.appspot.com",
  messagingSenderId: "487010127369",
  appId: "1:487010127369:web:8752562b0005f10b0cf2d8",
  measurementId: "G-WL4R1H83M2"
}

class Firebase {
  constructor () {
    if (typeof window !== 'undefined') {
      firebase.initializeApp(config)
      this.auth = firebase.auth()
      this.database = firebase.database()
    }
  }
}

export default new Firebase()
