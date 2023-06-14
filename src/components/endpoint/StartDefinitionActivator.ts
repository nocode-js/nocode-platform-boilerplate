import { UidGenerator } from '@/lib/core/UidGenerator';
import { EndpointDefinition, endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { JsonValueStep } from '@/lib/workflows/endpoint/model/steps/json/jsonValueStepModel';
import { HttpRequestStep } from '@/lib/workflows/endpoint/model/steps/requests/httpRequestStepModel';
import { ModelActivator } from 'sequential-workflow-editor-model';

export class StartDefinitionActivator {
  public static createDefault(templateName: string): EndpointDefinition {
    const activator = ModelActivator.create(endpointDefinitionModel, UidGenerator.next);
    const definition = activator.activateDefinition();
    switch (templateName) {
      case 'plnUsdPrice':
        applyUsdPriceTemplate(definition);
        break;
    }
    return definition;
  }
}

function applyUsdPriceTemplate(definition: EndpointDefinition) {
  definition.properties.internals.variables.push({
    name: 'buffer',
    type: 'json'
  });

  definition.properties.outputs.variables.push({
    name: 'plnUsdPrice',
    type: 'string'
  });

  definition.sequence.push({
    id: UidGenerator.next(),
    type: 'httpRequest',
    componentType: 'task',
    name: 'Http request',
    properties: {
      method: 'GET',
      response: {
        name: 'buffer',
        type: 'json'
      },
      url: 'http://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json'
    }
  } as HttpRequestStep);

  definition.sequence.push({
    id: UidGenerator.next(),
    type: 'jsonValue',
    componentType: 'task',
    name: 'Read price',
    properties: {
      path: 'rates/0/mid',
      json: {
        name: 'buffer',
        type: 'json'
      },
      output: {
        name: 'plnUsdPrice',
        type: 'string'
      }
    }
  } as JsonValueStep);
}
