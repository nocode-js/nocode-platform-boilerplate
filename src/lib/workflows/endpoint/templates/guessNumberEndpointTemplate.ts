import { EndpointTemplate } from './EndpointTemplate';

const definition = () => ({
  properties: {
    inputs: { variables: [{ name: 'bet', type: 'number' }] },
    internals: { variables: [{ name: 'value', type: 'number' }] },
    outputs: {
      variables: [
        { name: 'score', type: 'number' },
        { name: 'message', type: 'string' }
      ]
    }
  },
  sequence: [
    {
      id: 'ba0cd51d33e1e55e557d21b15b76a07d',
      name: '$value = random(0, 10)',
      type: 'random',
      componentType: 'task',
      properties: { result: { name: 'value' }, from: { modelId: 'number', value: 0 }, to: { modelId: 'number', value: 10 } }
    },
    {
      id: 'ea5974d083ab889d19598ea0b221475b',
      name: 'Log',
      type: 'log',
      componentType: 'task',
      properties: { message: { modelId: 'string', value: 'Drawn number' }, variables: { variables: [{ type: 'number', name: 'value' }] } }
    },
    {
      id: '57b2e5df89d9cf63b0db46166aff4aae',
      name: 'If',
      type: 'if',
      componentType: 'switch',
      properties: {
        a: { modelId: 'nullableAnyVariable', value: { name: 'bet', type: 'number' } },
        comparison: '===',
        b: { modelId: 'nullableAnyVariable', value: { name: 'value', type: 'number' } }
      },
      branches: {
        true: [
          {
            id: 'bc5b37a482e1717840f1f10951335f48',
            name: '$score = 5',
            type: 'set',
            componentType: 'task',
            properties: { result: { name: 'score', type: 'number' }, value: { modelId: 'number', value: 5 } }
          },
          {
            id: '66b3d05ade748b97c016ec7fce4eceae',
            name: "You've won!",
            type: 'set',
            componentType: 'task',
            properties: { result: { name: 'message', type: 'string' }, value: { modelId: 'string', value: "You've won!" } }
          }
        ],
        false: [
          {
            id: 'd63b192819ce78c7bfb03474f97f1bd4',
            name: '$score = 0',
            type: 'set',
            componentType: 'task',
            properties: { result: { name: 'score', type: 'number' }, value: { modelId: 'number', value: 0 } }
          },
          {
            id: 'ed87122c8151bd0ab98f71241ab5d141',
            name: 'Try again',
            type: 'set',
            componentType: 'task',
            properties: { result: { name: 'message', type: 'string' }, value: { modelId: 'string', value: 'Try again' } }
          }
        ]
      }
    }
  ]
});

export const guessNumberEndpointTemplate: EndpointTemplate = () => ({
  name: 'Guess Number',
  description: 'Guess a number between 0 and 10',
  url: 'guess-number',
  definition: JSON.stringify(definition())
});
