import { EndpointTemplate } from './EndpointTemplate';

const definition = () => ({
  properties: {
    inputs: {
      variables: []
    },
    internals: {
      variables: [
        {
          name: 'buffer',
          type: 'json'
        }
      ]
    },
    outputs: {
      variables: [
        {
          name: 'plnUsdPrice',
          type: 'string'
        }
      ]
    }
  },
  sequence: [
    {
      componentType: 'task',
      id: '8708c21483e78deaea63fc5e4a62a666',
      name: '$buffer = GET http://api.nbp.pl',
      properties: {
        method: 'GET',
        response: {
          name: 'buffer',
          type: 'json'
        },
        url: 'http://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json'
      },
      type: 'httpRequest'
    },
    {
      componentType: 'task',
      id: '54cb2883fa2468a158bf204ea2256c81',
      name: '$plnUsdPrice = $buffer[rates…]',
      properties: {
        json: {
          name: 'buffer',
          type: 'json'
        },
        output: {
          name: 'plnUsdPrice',
          type: 'string'
        },
        path: 'rates/0/mid'
      },
      type: 'jsonValue'
    }
  ]
});

export const usdPlnPriceEndpointTemplate: EndpointTemplate = () => ({
  name: 'USD-PLN Price',
  description: 'Returns current USD-PLN price',
  url: 'usd-pln-price',
  definition: JSON.stringify(definition())
});
