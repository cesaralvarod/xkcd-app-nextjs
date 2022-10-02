import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Xkdc App - Comics for Devs</title>
        <meta name="description" content="App of cesaralvarod" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container mx-auto">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
