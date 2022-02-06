import { initFirebase } from "./lib/firebase";
initFirebase();

interface Files {
  [key: string]: string;
}

const files: Files = {
  signInByWallet: "./handlers/signInByWallet",
};

const loadFunctions = (filesObj: Files) => {
  Object.entries(filesObj).forEach(([key, value]) => {
    const { FUNCTION_NAME } = process.env;
    const shouldExport = !FUNCTION_NAME || FUNCTION_NAME.startsWith(key);
    if (shouldExport) {
      exports[key] = require(value);
    }
  });
};

loadFunctions(files);
