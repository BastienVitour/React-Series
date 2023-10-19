// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebase-config";

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
