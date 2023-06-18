import { createActivitySet } from 'sequential-workflow-machine';
import { httpRequestActivity } from './activities/requests/httpRequestActivity';
import { jsonValueActivity } from './activities/json/jsonValueActivity';
import { ifActivity } from './activities/flow/ifActivity';
import { logActivity } from './activities/tracing/logActivity';
import { setActivity } from './activities/primitives/setActivity';
import { forActivity } from './activities/flow/forActivity';
import { arrayLengthActivity } from './activities/json/arrayLengthActivity';
import { equationActivity } from './activities/primitives/equationActivity';
import { randomActivity } from './activities/primitives/randomActivity';

export const activitySet = createActivitySet([
  forActivity,
  httpRequestActivity,
  ifActivity,
  logActivity,
  jsonValueActivity,
  arrayLengthActivity,
  equationActivity,
  randomActivity,
  setActivity
]);
