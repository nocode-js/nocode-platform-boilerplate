import { EndpointDefinition } from '@/lib/workflows/endpoint/model/endpointDefinitionModel';
import { UidGenerator } from '../../core/UidGenerator';
import { EndpointValidator } from './EndpointValidator';
import { EndpointJSON } from './EndpointJSON';

export class Endpoint {
  public static create(name: string, url: string, description: string, definition: EndpointDefinition): Endpoint {
    EndpointValidator.validName(name);
    EndpointValidator.validUrl(url);
    EndpointValidator.validateDescription(description);
    EndpointValidator.validDefinition(definition);
    const id = UidGenerator.next();
    return new Endpoint(id, name, url, description, definition);
  }

  public static fromJSON(json: EndpointJSON): Endpoint {
    return new Endpoint(json.id, json.name, json.url, json.description, JSON.parse(json.definition));
  }

  private constructor(
    public readonly id: string,
    public name: string,
    public url: string,
    public description: string = '',
    public definition: EndpointDefinition
  ) {}

  public setName(name: string) {
    EndpointValidator.validName(name);
    this.name = name;
  }

  public setUrl(url: string) {
    EndpointValidator.validUrl(url);
    this.url = url;
  }

  public setDescription(description: string) {
    EndpointValidator.validateDescription(description);
    this.description = description;
  }

  public setDefinition(definition: EndpointDefinition) {
    EndpointValidator.validDefinition(definition);
    this.definition = definition;
  }

  public toJSON(): EndpointJSON {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      description: this.description,
      definition: JSON.stringify(this.definition)
    };
  }
}
