import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfiguration } from './configuration';

// Single Firebase initialisation point. Web SDK config is public browser configuration, not a secret.
// Values come from PUBLIC_-prefixed build variables (see .env.example).
const env = (import.meta as unknown as { env: Record<string, string | boolean | undefined> }).env;

const config = firebaseConfiguration(env);
if (!config) throw new Error('Firebase public configuration is incomplete');

// Emulators are opt-in and only in dev builds; a production build never connects to them.
const useEmulators = env.DEV === true && env.PUBLIC_FIREBASE_USE_EMULATORS === 'true';
if (useEmulators && !config.projectId.startsWith('demo-')) throw new Error('Emulators require a demo Firebase project');

const app: FirebaseApp = getApps()[0] ?? initializeApp(config);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

if (useEmulators && !(globalThis as { __pintatonicaEmulators?: boolean }).__pintatonicaEmulators) {
  (globalThis as { __pintatonicaEmulators?: boolean }).__pintatonicaEmulators = true;
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
