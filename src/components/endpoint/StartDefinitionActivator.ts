import { UidGenerator } from '@/lib/core/UidGenerator';
import { EndpointDefinition, endpointDefinitionModel } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { HttpRequestStep } from '@/lib/workflows/endpoint/model/httpRequestModel';
import { ReadJsonNodeStep } from '@/lib/workflows/endpoint/model/readJsonNodeStepModel';
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
    type: 'string'
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
      method: 'POST',
      result: {
        name: 'buffer'
      },
      url: 'http://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json'
    }
  } as HttpRequestStep);

  definition.sequence.push({
    id: UidGenerator.next(),
    type: 'readJsonNode',
    componentType: 'task',
    name: 'Read price',
    properties: {
      selector: 'rates/0/mid',
      source: {
        name: 'buffer'
      },
      target: {
        name: 'plnUsdPrice'
      }
    }
  } as ReadJsonNodeStep);
}
