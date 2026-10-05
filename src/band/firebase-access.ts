import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, type Auth } from 'firebase/auth';
import { doc, onSnapshot, type Firestore } from 'firebase/firestore';
import type { AccessPort } from './access';

export function firebaseAccessPort(auth: Auth, db: Firestore): AccessPort {
  return {
    observeIdentity(next, error) {
      let generation = 0;
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        const observed = ++generation;
        // Clear the previous identity before resolving the new token/provider.
        next(null);
        if (!user) return;
        void user.getIdTokenResult().then((token) => {
          if (observed !== generation) return;
          const firebase = token.claims.firebase as { sign_in_provider?: string } | undefined;
          next({ uid: user.uid, provider: firebase?.sign_in_provider ?? '', displayName: user.displayName });
        }).catch(() => { if (observed === generation) error(); });
      }, error);
      return () => { generation++; unsubscribe(); };
    },
    watchMembership(uid, next, error) {
      return onSnapshot(doc(db, 'members', uid), { includeMetadataChanges: true }, (snapshot) => {
        const data = snapshot.data();
        // Cached membership never grants access: verify against the server first.
        if (snapshot.metadata.fromCache) { next(null); return; }
        next(data ? { active: data.active === true, name: typeof data.name === 'string' ? data.name : undefined } : null);
      }, error);
    },
    async signIn() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    },
    async signOut() { await signOut(auth); },
  };
}
