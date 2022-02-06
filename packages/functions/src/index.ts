import { initFirebase } from "./lib/firebase";
initFirebase();

import { ethers } from "ethers";
import { getAuth } from "firebase-admin/auth";
import * as functions from "firebase-functions";

export const signInByWallet = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature } = data;
  const recoveredAccount = ethers.utils.verifyMessage("login", signature);
  const account = recoveredAccount.toLowerCase();
  const auth = getAuth();
  const customToken = await auth.createCustomToken(account);
  return { customToken };
});
