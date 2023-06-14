import { StepModel } from 'sequential-workflow-editor-model';
import { httpRequestStepModel } from './steps/requests/httpRequestStepModel';
import { ifStepModel } from './steps/flow/ifStepModel';
import { jsonValueStepModel } from './steps/json/jsonValueStepModel';
import { logStepModel } from './steps/tracing/logStepModel';
import { setStepModel } from './steps/primitives/setStepModel';
import { forStepModel } from './steps/flow/forStepModel';
import { arrayLengthStepModel } from './steps/json/arrayLengthStepModel';

export const modelSet: StepModel[] = [
  forStepModel,
  httpRequestStepModel,
  logStepModel,
  ifStepModel,
  jsonValueStepModel,
  arrayLengthStepModel,
  setStepModel
];
