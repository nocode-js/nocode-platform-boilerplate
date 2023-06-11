import { NullableVariable, createStepModel, nullableVariableValueModel, stringValueModel } from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface ReadJsonNodeStep extends Step {
  componentType: 'task';
  type: 'readJsonNode';
  properties: {
    selector: string;
    source: NullableVariable;
    target: NullableVariable;
  };
}

export const readJsonNodeStepModel = createStepModel<ReadJsonNodeStep>('readJsonNode', 'task', step => {
  step.property('selector').value(
    stringValueModel({
      minLength: 1
    })
  );

  step.property('source').value(
    nullableVariableValueModel({
      variableType: 'string',
      isRequired: true
    })
  );

  step.property('target').value(
    nullableVariableValueModel({
      variableType: 'string',
      isRequired: true
    })
  );
});
