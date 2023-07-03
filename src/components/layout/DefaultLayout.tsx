import { Main } from '../theme/layout/Main';
import { Navbar } from '../theme/layout/Navbar';
import { Root } from '../theme/layout/Root';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
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
              children: ['/endpoints']
            }
          ]}
        />
        <Main>{props.children}</Main>
      </Root>
    </>
  );
}
