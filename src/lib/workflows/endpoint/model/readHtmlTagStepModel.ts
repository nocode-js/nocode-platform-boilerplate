import { NullableVariable, createStepModel, nullableVariableValueModel, stringValueModel } from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface ReadHtmlTagStep extends Step {
  componentType: 'task';
  type: 'readHtmlTag';
  properties: {
    selector: string;
    htmlVariable: NullableVariable;
    targetVariable: NullableVariable;
  };
}

export const readHtmlTagStepModel = createStepModel<ReadHtmlTagStep>('readHtmlTag', 'task', step => {
  step.property('selector').value(
    stringValueModel({
      minLength: 1
    })
  );

  step.property('htmlVariable').value(
    nullableVariableValueModel({
      variableType: 'html',
      isRequired: true
    })
  );

  step.property('targetVariable').value(
    nullableVariableValueModel({
      variableType: 'string',
      isRequired: true
    })
  );
});
