import {
  VariableDefinitions,
  createDefinitionModel,
  createRootModel,
  variableDefinitionsValueModel
} from 'sequential-workflow-editor-model';
import { Definition } from 'sequential-workflow-model';
import { modelSet } from './modelSet';

export interface EndpointDefinition extends Definition {
  properties: {
    inputs: VariableDefinitions;
    internals: VariableDefinitions;
    outputs: VariableDefinitions;
  };
}

export const rootModel = createRootModel<EndpointDefinition>(root => {
  root
    .property('inputs')
    .value(
      variableDefinitionsValueModel({
        valueTypes: ['string', 'number']
      })
    )
    .label('Input variables');

  root.property('internals').value(variableDefinitionsValueModel({})).label('Internal variables');

  root
    .property('outputs')
    .value(
      variableDefinitionsValueModel({
        valueTypes: ['string', 'number']
      })
    )
    .label('Output variables');
});

export const endpointDefinitionModel = createDefinitionModel<EndpointDefinition>(model => {
  model.valueTypes(['string', 'number', 'json']);
  model.root(rootModel);
  model.steps(modelSet);
});
