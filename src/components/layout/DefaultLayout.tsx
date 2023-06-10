import Head from 'next/head';
import { Main } from '../theme/layout/Main';
import { Navbar } from '../theme/layout/Navbar';
import { Root } from '../theme/layout/Root';

const defaultTitle = 'NoCode API Builder Template';

export interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title ? `${props.title} - ${defaultTitle}` : defaultTitle}</title>
      </Head>
      <Root>
        <Navbar
          items={[
            {
              label: 'Home',
              href: '/'
            },
            {
              label: 'Endpoints',
              href: '/endpoints',
              children: /\/endpoints\/.*/
            }
          ]}
        />
        <Main>{props.children}</Main>
      </Root>
    </>
  );
}
