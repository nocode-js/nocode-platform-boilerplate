import { Button } from '../primitives/Button';

export function ErrorPage(props: { message: string }) {
  return (
    <div className="py-10 px-2 text-center">
      <h2 className="text-3xl font-bold mb-8">{props.message}</h2>

      <Button href="/">Go to home</Button>
    </div>
  );
}
