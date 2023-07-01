import { EndpointDefinition } from '@/lib/workflows/endpoint/model/EndpointDefinition';
import { endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { DefinitionValidator } from 'sequential-workflow-editor-model';
import { DefinitionWalker } from 'sequential-workflow-model';

export class EndpointValidator {
  public static validName(name: string) {
    if (!name) {
      throw new Error('Name is empty');
    }
    if (typeof name !== 'string') {
      throw new Error('Name is not a string');
    }
  }

  public static validUrl(url: string) {
    if (!url) {
      throw new Error('Url is empty');
    }
    if (typeof url !== 'string') {
      throw new Error('Url is not a string');
    }
    if (url.length < 3) {
      throw new Error('Url is too short, expected at least 3 characters');
    }
    if (!/^[a-z0-9-_]*$/.test(url)) {
      throw new Error('Url contains invalid characters');
    }
  }

  public static validateDescription(description: string) {
    if (typeof description !== 'string') {
      throw new Error('Description is not a string');
    }
  }

  public static validDefinition(definition: EndpointDefinition) {
    if (!definition) {
      throw new Error('Definition is empty');
    }

    const walker = new DefinitionWalker();
    const validator = DefinitionValidator.create(endpointDefinitionModel, walker);
    const error = validator.validate(definition);
    if (error) {
      const place = error.stepId ? `Step ${error.stepId}` : 'Root';
      const message = Object.values(error.error).join(', ');
      throw new Error(`Definition is invalid. ${place}: ${message}`);
    }
  }
}
