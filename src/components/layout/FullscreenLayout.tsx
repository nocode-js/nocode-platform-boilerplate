import Head from 'next/head';

export interface FullscreenLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function FullscreenLayout(props: FullscreenLayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </>
  );
}
