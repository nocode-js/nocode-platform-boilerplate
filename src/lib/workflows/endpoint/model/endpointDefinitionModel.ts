import { createDefinitionModel, createRootModel, createVariableDefinitionsValueModel } from 'sequential-workflow-editor-model';
import { modelSet } from './modelSet';
import { EndpointDefinition } from './EndpointDefinition';

export const rootModel = createRootModel<EndpointDefinition>(root => {
  root
    .property('inputs')
    .value(
      createVariableDefinitionsValueModel({
        valueTypes: ['string', 'number']
      })
    )
    .label('Input variables');

  root.property('internals').value(createVariableDefinitionsValueModel({})).label('Internal variables');

  root
    .property('outputs')
    .value(
      createVariableDefinitionsValueModel({
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
