// Aqui é onde fica o que não muda, como uma Sidebar ou uma Navbar
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
