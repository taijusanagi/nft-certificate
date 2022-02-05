import type { AppProps } from "next/app";
import Error from "next/error";

import { AppWrapper } from "../components/utils/AppWapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
