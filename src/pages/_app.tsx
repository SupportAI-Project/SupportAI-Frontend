import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
