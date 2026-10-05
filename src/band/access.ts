export type AccessState =
  | { kind: 'checking' | 'signed-out' | 'denied' | 'error' }
  | { kind: 'member'; name: string };
export type Identity = { uid: string; provider: string; displayName: string | null };
export type Membership = { active: boolean; name?: string } | null;
export interface AccessPort {
  observeIdentity(next: (identity: Identity | null) => void, error: () => void): () => void;
  watchMembership(uid: string, next: (membership: Membership) => void, error: () => void): () => void;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}

export function createAccessSession(port: AccessPort, render: (state: AccessState) => void) {
  let controller: ReturnType<typeof createAccessController> | undefined;
  return {
    start() {
      if (controller) return;
      controller = createAccessController(port, render);
      controller.start();
    },
    stop() {
      controller?.stop();
      controller = undefined;
      // The browser may preserve this DOM in its back/forward cache.
      render({ kind: 'checking' });
    },
    async signIn() { await controller?.signIn(); },
    async signOut() { await controller?.signOut(); },
  };
}

export function createAccessController(port: AccessPort, render: (state: AccessState) => void) {
  let generation = 0;
  let stopped = false;
  let signingOut = false;
  let cancelIdentity = () => {};
  let cancelMembership = () => {};
  const publish = (state: AccessState) => { if (!stopped) render(state); };
  const invalidate = () => { generation++; cancelMembership(); cancelMembership = () => {}; };
  return {
    start() {
      publish({ kind: 'checking' });
      cancelIdentity = port.observeIdentity((identity) => {
        if (stopped || signingOut) return;
        invalidate();
        if (!identity) { publish({ kind: 'signed-out' }); return; }
        if (identity.provider !== 'google.com') { publish({ kind: 'denied' }); return; }
        publish({ kind: 'checking' });
        const observed = generation;
        cancelMembership = port.watchMembership(identity.uid, (membership) => {
          if (observed !== generation || stopped) return;
          if (membership?.active !== true) { publish({ kind: 'denied' }); return; }
          publish({ kind: 'member', name: membership.name?.trim() || identity.displayName?.trim() || 'Miembro de Pintatónica' });
        }, () => { if (observed === generation) publish({ kind: 'error' }); });
      }, () => { invalidate(); publish({ kind: 'error' }); });
    },
    async signIn() {
      publish({ kind: 'checking' });
      try { await port.signIn(); } catch { invalidate(); publish({ kind: 'error' }); }
    },
    async signOut() {
      signingOut = true;
      invalidate();
      publish({ kind: 'checking' });
      try { await port.signOut(); publish({ kind: 'signed-out' }); }
      catch { publish({ kind: 'error' }); }
      finally { signingOut = false; }
    },
    stop() { stopped = true; invalidate(); cancelIdentity(); },
  };
}
