import Head from "next/head";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS events</title>
          <meta name="description" content="NextJS events in your town" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <Notification />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
