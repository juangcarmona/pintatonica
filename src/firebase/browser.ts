import { firebaseConfiguration } from './configuration.ts';
export { hasFirebaseConfiguration } from './configuration.ts';

export async function initializeBrowserFirebase() {
  if (typeof window === 'undefined' || !firebaseConfiguration(import.meta.env)) return undefined;
  // Dynamic import prevents eager SDK initialization in builds and unconfigured shells.
  return import('./client');
}
