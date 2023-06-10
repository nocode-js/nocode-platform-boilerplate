import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  public render() {
    return (
      <Html lang="en" className="h-full">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
