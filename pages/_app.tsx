import '../styles/globals.css';
import type { AppProps } from 'next/app';
import "bootstrap/dist/css/bootstrap.min.css";
import "../admin/admin.scss";
import "../pages/main.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
