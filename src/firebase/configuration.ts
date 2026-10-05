import { publicFirebaseConfig } from './public-config.ts';
type PublicConfiguration = Record<string, string | boolean | undefined>;
const required = ['PUBLIC_FIREBASE_API_KEY', 'PUBLIC_FIREBASE_AUTH_DOMAIN', 'PUBLIC_FIREBASE_PROJECT_ID', 'PUBLIC_FIREBASE_APP_ID'] as const;

export function hasFirebaseConfiguration(env: PublicConfiguration): boolean {
  return required.every((key) => typeof env[key] === 'string' && Boolean((env[key] as string).trim()) && !(env[key] as string).includes('<'));
}
export function firebaseConfiguration(env: PublicConfiguration) {
  // A partial override must not combine identities from different Firebase projects.
  if (!required.some((key) => env[key] !== undefined)) return publicFirebaseConfig;
  if (!hasFirebaseConfiguration(env)) return undefined;
  return {
    apiKey: env.PUBLIC_FIREBASE_API_KEY as string,
    authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: env.PUBLIC_FIREBASE_PROJECT_ID as string,
    appId: env.PUBLIC_FIREBASE_APP_ID as string,
  };
}
