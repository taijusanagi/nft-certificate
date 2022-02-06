import * as functions from "firebase-functions";

export const signInByWallet = functions.region("asia-northeast1").https.onCall((data, context) => {
  return "ok";
});
