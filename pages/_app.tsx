import "../styles/index.css";
import "react-tabs/style/react-tabs.css";

import { AppProps } from "next/app";
import React, { ReactElement } from "react";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
