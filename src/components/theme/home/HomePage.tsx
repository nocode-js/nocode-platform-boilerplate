import { CenteredBox } from '../layout/CenteredBox';

export function HomePage() {
  return (
    <CenteredBox>
      <div className="text-center px-5">
        <h2 className="pt-7 pb-4 text-3xl font-bold">NoCode API Builder Template</h2>

        <p className="py-3 text-gray-700">
          We are thrilled to present the No-Code Boilerplate, an innovative solution designed to revolutionize your development process.
          Whether you are a seasoned developer or a beginner taking your first steps into the world of coding, our free and open-source
          boilerplate, available on GitHub, is here to simplify and streamline your projects.
        </p>
        <p className="py-3 text-gray-700">
          Gone are the days of spending countless hours setting up the basic structure and functionality of your applications. With the
          No-Code Boilerplate, you can jumpstart your projects with just a few clicks, eliminating the need to write extensive lines of code
          from scratch.
        </p>
      </div>
    </CenteredBox>
  );
}
