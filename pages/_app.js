function GlobalStyle() {
    return (
      <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100%;
        display: flex;
        flex: 1;
        margin: 0 ;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
      
    `}</style>
    );
  }

export default function MyApp({ Component, pageProps }) {

       
    return (
        <>
            <Component {...pageProps} />
            <GlobalStyle />
        </>
    );
  }

