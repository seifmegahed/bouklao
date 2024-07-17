import { initializeApp } from "firebase/app";
import { initializeFirestore } from "@firebase/firestore";

import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth,
} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});

export const firestore = initializeFirestore(app, {
  // experimentalAutoDetectLongPolling: true,
});

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_APPCHECKKEY),
  isTokenAutoRefreshEnabled: true,
});

export const analytics = getAnalytics(app);
