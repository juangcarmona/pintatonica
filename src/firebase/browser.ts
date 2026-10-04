type PublicConfiguration = Record<string, string | boolean | undefined>;
const required = ['PUBLIC_FIREBASE_API_KEY', 'PUBLIC_FIREBASE_AUTH_DOMAIN', 'PUBLIC_FIREBASE_PROJECT_ID', 'PUBLIC_FIREBASE_APP_ID'] as const;

export function hasFirebaseConfiguration(env: PublicConfiguration): boolean {
  return required.every((key) => typeof env[key] === 'string' && Boolean((env[key] as string).trim()) && !(env[key] as string).includes('<'));
}

export async function initializeBrowserFirebase() {
  if (typeof window === 'undefined' || !hasFirebaseConfiguration(import.meta.env)) return undefined;
  // Dynamic import prevents eager SDK initialization in builds and unconfigured shells.
  return import('./client');
}
