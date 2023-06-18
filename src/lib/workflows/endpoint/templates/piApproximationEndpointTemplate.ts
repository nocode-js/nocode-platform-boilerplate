import { EndpointTemplate } from './EndpointTemplate';

const definition = () => ({
  properties: {
    inputs: {
      variables: [
        {
          name: 'iterations',
          type: 'number'
        }
      ]
    },
    internals: {
      variables: [
        {
          name: 'piece',
          type: 'number'
        },
        {
          name: 'sing',
          type: 'number'
        },
        {
          name: 'to',
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
      id: '8708c21483e78deaea63fc5e4a62a666',
      name: '$to = $iterations * 2',
      properties: {
        a: {
          modelId: 'nullableVariable',
          value: {
            name: 'iterations'
          }
        },
        b: {
          modelId: 'number',
          value: 2
        },
        operator: '*',
        result: {
          name: 'to'
        }
      },
      type: 'equation'
    },
    {
      componentType: 'task',
      id: '54cb2883fa2468a158bf204ea2256c81',
      name: '$to = $to + 3',
      properties: {
        a: {
          modelId: 'nullableVariable',
          value: {
            name: 'to'
          }
        },
        b: {
          modelId: 'number',
          value: 3
        },
        operator: '+',
        result: {
          name: 'to'
        }
      },
      type: 'equation'
    },
    {
      componentType: 'task',
      id: '18f82a525d83d243746384075541f942',
      name: '$result = 4',
      properties: {
        result: {
          name: 'result',
          type: 'number'
        },
        value: {
          modelId: 'number',
          value: 4
        }
      },
      type: 'set'
    },
    {
      componentType: 'task',
      id: '7ab4a2bbe859f4f802d3df15b2d62f73',
      name: '$sign = -1',
      properties: {
        result: {
          name: 'sing',
          type: 'number'
        },
        value: {
          modelId: 'number',
          value: -1
        }
      },
      type: 'set'
    },
    {
      componentType: 'container',
      id: 'fb2f7dcf16c1e0dc5038ac45eb859358',
      name: 'Loop',
      properties: {
        delta: {
          modelId: 'number',
          value: 2
        },
        from: {
          modelId: 'number',
          value: 3
        },
        indexVariable: {
          name: 'index',
          type: 'number'
        },
        to: {
          modelId: 'nullableVariable',
          value: {
            name: 'to'
          }
        }
      },
      sequence: [
        {
          componentType: 'task',
          id: '04f0fb15c6dbeb49a4e6e3a7b99463c7',
          name: '$piece = 4 / $index',
          properties: {
            a: {
              modelId: 'number',
              value: 4
            },
            b: {
              modelId: 'nullableVariable',
              value: {
                name: 'index'
              }
            },
            operator: '/',
            result: {
              name: 'piece'
            }
          },
          type: 'equation'
        },
        {
          componentType: 'task',
          id: 'b6ccbb94b9f7893667d5b41651d3b56c',
          name: '$piece = $piece * $sign',
          properties: {
            a: {
              modelId: 'nullableVariable',
              value: {
                name: 'piece'
              }
            },
            b: {
              modelId: 'nullableVariable',
              value: {
                name: 'sing'
              }
            },
            operator: '*',
            result: {
              name: 'piece'
            }
          },
          type: 'equation'
        },
        {
          componentType: 'task',
          id: 'd11dbfbe4ea1502614c0364b48a90f39',
          name: '$result = $result + $piece',
          properties: {
            a: {
              modelId: 'nullableVariable',
              value: {
                name: 'result'
              }
            },
            b: {
              modelId: 'nullableVariable',
              value: {
                name: 'piece'
              }
            },
            operator: '+',
            result: {
              name: 'result'
            }
          },
          type: 'equation'
        },
        {
          componentType: 'task',
          id: 'd770e6c8ca5dddbc66c83873b9ba48bb',
          name: '$sign = $sign * -1',
          properties: {
            a: {
              modelId: 'nullableVariable',
              value: {
                name: 'sing'
              }
            },
            b: {
              modelId: 'number',
              value: -1
            },
            operator: '*',
            result: {
              name: 'sing'
            }
          },
          type: 'equation'
        },
        {
          componentType: 'task',
          id: '980ccd85ddd1d8aa84fc0010c00583a2',
          name: 'log $result',
          properties: {
            message: {
              modelId: 'string',
              value: 'PI'
            },
            variables: {
              variables: [
                {
                  name: 'result',
                  type: 'number'
                }
              ]
            }
          },
          type: 'log'
        }
      ],
      type: 'for'
    }
  ]
});

export const piApproximationEndpointTemplate: EndpointTemplate = () => ({
  name: 'PI Approximation',
  description: 'Calculate PI approximation',
  url: 'pi-approximation',
  definition: JSON.stringify(definition())
});
