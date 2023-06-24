import { CenteredBox } from '../layout/CenteredBox';

export function HomePage() {
  return (
    <CenteredBox>
      <div className="text-center px-5">
        <h2 className="pt-7 pb-4 text-4xl font-bold">🔨 NoCode API Builder Template</h2>

        <P>
          Powerful no-code API builder template. The API builder allows you to create REST API endpoints using a visual editor. You can
          request the endpoint from any HTTP client. Additionally, the template provides a simple UI to test your endpoints. You can easily
          extend this template and add your own features.
        </P>
        <P>
          This templates uses:
          <br />
          <br />
          <Link href="https://github.com/vercel/next.js/">Next.js</Link>
          <br />
          <Link href="https://github.com/tailwindlabs/tailwindcss">Tailwindcss</Link>
          <br />
          <Link href="https://github.com/nocode-js/sequential-workflow-designer">🌇 Sequential Workflow Designer</Link>
          <br />
          <Link href="https://github.com/nocode-js/sequential-workflow-machine">🚚 Sequential Workflow Machine</Link>
          <br />
          <Link href="https://github.com/nocode-js/sequential-workflow-editor">⛽ Sequential Workflow Editor</Link>
        </P>

        <h4 className="pt-7 pb-4 text-2xl font-bold">💡 License</h4>

        <P>
          This template is released under the MIT license. You can use the template for free for any personal or commercial project. But you
          should note that, this template uses one dependency that requires a license for commercial use:
        </P>
        <P>
          <Link href="https://github.com/nocode-js/sequential-workflow-editor">⛽ Sequential Workflow Editor</Link>- check the{' '}
          <Link href="https://nocode-js.com/sequential-workflow-editor/license">license</Link> and the{' '}
          <Link href="https://nocode-js.com/sequential-workflow-editor/pricing">pricing</Link>.
        </P>

        <h4 className="pt-7 pb-4 text-2xl font-bold">🤩 Links</h4>

        <P>
          <Link href="https://nocode-js.com/">nocode-js.com</Link>
          <br />
          <Link href="https://twitter.com/nocode_js">Twitter</Link>
        </P>
      </div>
    </CenteredBox>
  );
}

function P(props: { children: React.ReactNode }) {
  return <p className="py-3 text-gray-700">{props.children}</p>;
}

function Link(props: { href: string; children: React.ReactNode }) {
  return (
    <a href={props.href} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">
      {props.children}
    </a>
  );
}
