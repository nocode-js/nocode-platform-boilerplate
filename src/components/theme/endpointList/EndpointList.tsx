import { CenteredBox } from '../layout/CenteredBox';
import { Button } from '../primitives/Button';

export interface EndpointListProps {
  createUrl: string;
  onDeleteClicked: (id: string) => void;
  endpoints: {
    id: string;
    name: string;
    method: string;
    url: string;
    editUrl: string;
    testUrl: string;
  }[];
}

export function EndpointList(props: EndpointListProps) {
  return (
    <CenteredBox>
      <div className="bg-gray-100 px-4 pt-5 pb-3 border-b border-gray-300/80 rounded-b-md">
        <div className="flex items-end">
          <div className="flex-1">
            <h3 className="text-2xl font-bold">Endpoints</h3>
          </div>
          <div>
            <Button href={props.createUrl} size="sm">
              Create
            </Button>
          </div>
        </div>
      </div>

      {props.endpoints.length === 0 && (
        <div className="px-4 py-20 text-center">
          <p className="text-sm text-gray-500">No endpoints found.</p>
        </div>
      )}

      {props.endpoints.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 mx-4">
          {props.endpoints.map(e => (
            <div key={e.id} className="p-2.5 border border-gray-300/80 rounded-t-md">
              <h4 className="text-xl font-bold">{e.name}</h4>

              <div className="mt-1">
                <code className="bg-blue-100 px-2 py-1 rounded-md text-xs">
                  {e.method} {e.url}
                </code>
              </div>

              <div className="mt-3">
                <Button href={e.editUrl} size="sm" className="mr-1">
                  Edit
                </Button>
                <Button href={e.testUrl} style="secondary" size="sm" className="mr-1">
                  Test
                </Button>
                <Button onClicked={() => props.onDeleteClicked(e.id)} style="secondary" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CenteredBox>
  );
}
