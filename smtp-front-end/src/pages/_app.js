import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

const theme = createTheme({});

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
    </MantineProvider>
  );
}
