import "../styles/global.scss";

import type { AppProps } from "next/app";
import Error from "next/error";
import React from "react";

import { AppWrapper } from "../components/utils/AppWapper";
import { initFirebase } from "../lib/firebase";

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    initFirebase();
  }, []);

  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  } else {
    return (
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    );
  }
};
export default MyApp;
