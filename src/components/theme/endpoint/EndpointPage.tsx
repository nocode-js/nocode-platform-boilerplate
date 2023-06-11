import { CenteredBox } from '../layout/CenteredBox';
import { Button } from '../primitives/Button';
import { Dropdown } from '../primitives/Dropdown';

export interface EndpointPageMode {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface EndpointPageTab {
  label: string;
  isSelected: boolean;
  isDirty: boolean;
  isValid: boolean;
}

export interface EndpointPageProps {
  name: string;
  modes: EndpointPageMode[];
  onModeChanged: (index: number) => void;
  children: React.ReactNode;
  tabs: EndpointPageTab[];
  onTabClicked: (index: number) => void;
  primaryButtonLabel?: string;
  isPrimaryButtonDisabled?: boolean;
  onPrimaryButtonClicked?: () => void;
}

export function EndpointPage(props: EndpointPageProps) {
  const modeIndex = props.modes.findIndex(mode => mode.isSelected);

  function onTabClicked(e: React.MouseEvent, index: number) {
    e.preventDefault();
    props.onTabClicked(index);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100">
        <CenteredBox className="flex flex-col w-full md:flex-row md:items-end">
          <div className="flex items-center bg-blue-700 p-2.5 md:order-2 md:w-[300px]">
            <div className="flex-1 text-white truncate">{props.name || 'Endpoint'}</div>
            <div className="flex-1 ml-5">
              <Dropdown selectedIndex={modeIndex} options={props.modes.map(mode => mode.label)} onChanged={props.onModeChanged} />
            </div>
          </div>
          <div className="md:order-1 md:flex-1">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-300/80 px-2.5">
              <ul className="flex flex-wrap -mb-px">
                {props.tabs.map((tab, index) => (
                  <li className="mr-2" key={tab.label}>
                    <button
                      type="button"
                      className={
                        tab.isSelected
                          ? 'inline-block p-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active'
                          : 'inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
                      }
                      onClick={e => onTabClicked(e, index)}
                    >
                      {tab.label}
                      {(tab.isDirty || !tab.isValid) && <span className="text-amber-600"> {!tab.isValid ? '!' : '*'}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CenteredBox>
      </div>
      <div className="flex-1">
        <CenteredBox className="h-full">{props.children}</CenteredBox>
      </div>
      <div className="p-2.5 text-center">
        <Button isDisabled={props.isPrimaryButtonDisabled} onClicked={props.onPrimaryButtonClicked}>
          {props.primaryButtonLabel}
        </Button>
      </div>
    </div>
  );
}
