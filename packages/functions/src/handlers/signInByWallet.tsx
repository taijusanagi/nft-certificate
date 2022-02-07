import * as bsx from "base-x";
import base64url from "base64url";
import { ethers } from "ethers";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

const MULTIBASE_ENCODED_BASE58_IDENTIFIER = "z";
const SECP256K1_MULTICODEC_IDENTIFIER = 0xe7;
const VARIABLE_INTEGER_TRAILING_BYTE = 0x01;
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = bsx(ALPHABET);

module.exports = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature } = data;
  const messageHash = ethers.utils.hashMessage("message");
  const messageHashBytes = ethers.utils.arrayify(messageHash);
  const recoveredPublicKey = ethers.utils.recoverPublicKey(messageHashBytes, signature);
  const compressedPublicKey = ethers.utils.computePublicKey(recoveredPublicKey, true);
  const compressedPublicKeyBuffer = Buffer.from(compressedPublicKey.replace(/0x/g, ""), "hex");
  const tempIdentifierBuffer = new Uint8Array(2 + compressedPublicKeyBuffer.length);
  tempIdentifierBuffer[0] = SECP256K1_MULTICODEC_IDENTIFIER;
  tempIdentifierBuffer[1] = VARIABLE_INTEGER_TRAILING_BYTE;
  tempIdentifierBuffer.set(compressedPublicKeyBuffer, 2);
  const did = `did:key:${MULTIBASE_ENCODED_BASE58_IDENTIFIER}${bs58.encode(tempIdentifierBuffer)}`;
  const temp = recoveredPublicKey.slice(4);
  const x = temp.substring(0, 64);
  const y = temp.substring(64, 128);
  const jwk = {
    kty: "EC",
    crv: "secp256k1",
    x: base64url.encode(Buffer.from(x, "hex")),
    y: base64url.encode(Buffer.from(y, "hex")),
  };
  const recoveredAddress = ethers.utils.computeAddress(recoveredPublicKey);
  const uid = recoveredAddress.toLowerCase();
  const auth = getAuth();
  const customToken = await auth.createCustomToken(uid);
  const db = getFirestore();
  await db.collection("users").doc(uid).set({
    did,
    jwk,
  });
  return { customToken };
});
