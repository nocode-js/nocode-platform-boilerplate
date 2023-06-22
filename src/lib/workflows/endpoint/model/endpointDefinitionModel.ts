import { createDefinitionModel, createRootModel, variableDefinitionsValueModel } from 'sequential-workflow-editor-model';
import { modelSet } from './modelSet';
import { EndpointDefinition } from './EndpointDefinition';

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
