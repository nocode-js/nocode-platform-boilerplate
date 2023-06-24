import { Db, MongoClient } from 'mongodb';

export class MongoProvider {
  public static create(): MongoProvider {
    const uri = String(process.env.MONGODB_URI);
    if (!uri) {
      throw new Error('Missing MONGODB_URI environment variable');
    }
    const dbName = process.env.MONGODB_DB || 'nocodeApiBuilder';
    return new MongoProvider(uri, dbName);
  }

  private client: MongoClient | null = null;
  private db: Db | null = null;

  private constructor(private readonly uri: string, private readonly dbName: string) {}

  public async getDb(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    this.client = await MongoClient.connect(this.uri);
    this.db = this.client.db(this.dbName);
    return this.db;
  }
}
