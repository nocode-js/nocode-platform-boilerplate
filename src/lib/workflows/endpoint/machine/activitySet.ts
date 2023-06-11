import { createActivitySet } from 'sequential-workflow-machine';
import { httpRequestActivity } from './activities/httpRequestActivity';
import { readJsonNodeActivity } from './activities/readJsonNodeActivity';

export const activitySet = createActivitySet([httpRequestActivity, readJsonNodeActivity]);
