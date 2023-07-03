import Head from 'next/head';

import '../styles/global.css';
import 'sequential-workflow-designer/css/designer.css';
import 'sequential-workflow-designer/css/designer-light.css';
import 'sequential-workflow-editor/css/editor.css';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>{props.children}</body>
    </html>
  );
}
