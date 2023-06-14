import { VariablesService } from './VariablesService';

export class RichTextService {
  public constructor(private readonly variables: VariablesService) {}

  public updateArray(texts: string[]) {
    for (let i = 0; i < texts.length; i++) {
      if (texts[i].startsWith('$')) {
        const variableName = texts[i].substring(1);
        const variableValue = this.variables.read(variableName);
        texts[i] = String(variableValue);
      }
    }
  }
}
