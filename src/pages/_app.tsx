import GlobalStyled from '../styles/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyled />
      <Component {...pageProps} />
    </>
  )
}


