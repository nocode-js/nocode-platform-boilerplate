import { Collection, ObjectId } from 'mongodb';
import { MongoProvider } from '../MongoProvider';
import { Endpoint } from './Endpoint';
import { EndpointJSON } from './EndpointJSON';
import { EndpointRepository } from './EndpointRepository';

interface MongoEndpoint extends Omit<EndpointJSON, 'id'> {
  _id: ObjectId;
  id?: string;
}

export class MongoEndpointRepository implements EndpointRepository {
  public constructor(private readonly provider: MongoProvider) {}

  public async insert(endpoint: Endpoint): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(toMongo(endpoint));
  }

  public async update(endpoint: Endpoint): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      {
        _id: toId(endpoint.id)
      },
      {
        $set: toMongo(endpoint)
      }
    );
  }

  public async tryDeleteById(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({
      _id: toId(id)
    });
    return result.deletedCount === 1;
  }

  public async getAll(): Promise<Endpoint[]> {
    const collection = await this.getCollection();
    const result = await collection.find().toArray();
    return result.map(fromMongo);
  }

  public async tryGetById(id: string): Promise<Endpoint | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({
      _id: toId(id)
    });
    return result ? fromMongo(result) : null;
  }

  public async tryGetByUrl(url: string): Promise<Endpoint | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({
      url
    });
    return result ? fromMongo(result) : null;
  }

  private async getCollection(): Promise<Collection<MongoEndpoint>> {
    return (await this.provider.getDb()).collection('endpoints');
  }
}

function toId(id: string): ObjectId {
  return new ObjectId(id);
}

function toMongo(endpoint: Endpoint): MongoEndpoint {
  const item: MongoEndpoint = {
    ...endpoint.toJSON(),
    _id: toId(endpoint.id)
  };
  delete item.id;
  return item;
}

function fromMongo(endpoint: MongoEndpoint): Endpoint {
  return Endpoint.fromJSON({
    ...endpoint,
    id: endpoint._id.toHexString()
  });
}
