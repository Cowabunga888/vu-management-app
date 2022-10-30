import '../styles/globals.css';
import type { AppProps } from 'next/app';
import "bootstrap/dist/css/bootstrap.min.css";
import "../admin/admin.scss";
import "../pages/main.scss"
import React from 'react';
import Head from 'next/head';
import ThemeProvider from "../src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Management Chat App</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
