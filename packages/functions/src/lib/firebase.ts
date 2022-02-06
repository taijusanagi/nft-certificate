import { getApps, initializeApp } from "firebase-admin/app";

export const initFirebase = () => {
  const apps = getApps();
  if (apps.length === 0) {
    initializeApp();
  }
};
