import { NullableVariable, createStepModel, nullableVariableValueModel, stringValueModel } from 'sequential-workflow-editor-model';
import { Step } from 'sequential-workflow-model';

export interface DownloadHtmlStep extends Step {
  componentType: 'task';
  type: 'downloadHtml';
  properties: {
    url: string;
    variableName: NullableVariable;
  };
}

export const downloadHtmlStepModel = createStepModel<DownloadHtmlStep>('downloadHtml', 'task', step => {
  step.property('url').value(
    stringValueModel({
      minLength: 1
    })
  );

  step.property('variableName').value(
    nullableVariableValueModel({
      variableType: 'html',
      isRequired: true
    })
  );
});
