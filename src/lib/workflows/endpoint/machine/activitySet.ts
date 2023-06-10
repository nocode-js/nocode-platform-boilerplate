import { createActivitySet } from 'sequential-workflow-machine';
import { downloadHtmlActivity } from './activities/downloadHtmlActivity';
import { readHtmlTagActivity } from './activities/readHtmlTagActivity';

export const activitySet = createActivitySet([downloadHtmlActivity, readHtmlTagActivity]);
