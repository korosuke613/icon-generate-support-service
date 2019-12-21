import firebase from 'firebase/app'
import 'firebase/analytics'

const serviceAccount = require('~/plugins/secret_key.json')

// Initialize Firebase
firebase.initializeApp({ ...serviceAccount })
firebase.analytics()
