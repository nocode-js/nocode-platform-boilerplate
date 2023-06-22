import { EndpointTemplate } from './EndpointTemplate';

const definition = () => ({
  properties: {
    inputs: {
      variables: [
        {
          name: 'height_meters',
          type: 'number'
        },
        {
          name: 'mass_kg',
          type: 'number'
        }
      ]
    },
    internals: {
      variables: [
        {
          name: 'height2',
          type: 'number'
        }
      ]
    },
    outputs: {
      variables: [
        {
          name: 'result',
          type: 'number'
        }
      ]
    }
  },
  sequence: [
    {
      componentType: 'task',
      id: 'c0704261d1a515248182165bac3482cb',
      name: '$height2 = $height_meters * $height_meters',
      properties: {
        a: {
          modelId: 'nullableVariable',
          value: {
            name: 'height_meters'
          }
        },
        b: {
          modelId: 'nullableVariable',
          value: {
            name: 'height_meters'
          }
        },
        operator: '*',
        result: {
          name: 'height2'
        }
      },
      type: 'equation'
    },
    {
      componentType: 'task',
      id: '2b4564cd2de4427e6f1efb2434e6ca8f',
      name: '$result = $mass_kg / $height2',
      properties: {
        a: {
          modelId: 'nullableVariable',
          value: {
            name: 'mass_kg'
          }
        },
        b: {
          modelId: 'nullableVariable',
          value: {
            name: 'height2'
          }
        },
        operator: '/',
        result: {
          name: 'result'
        }
      },
      type: 'equation'
    }
  ]
});

export const bmiCalculatorEndpointTemplate: EndpointTemplate = () => ({
  name: 'BMI Calculator',
  description: 'Calculate BMI based on height and weight',
  url: 'bmi-calculator',
  definition: JSON.stringify(definition())
});
