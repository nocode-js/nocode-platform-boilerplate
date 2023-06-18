import { Path } from 'sequential-workflow-editor-model';
import { VariablesService } from './VariablesService';

export class EvaluatorService {
  public constructor(private readonly variables: VariablesService) {}

  public evaluatePath(path: string | Path): Path {
    if (typeof path === 'string') {
      path = Path.create(path);
    }

    const firstIndex = path.parts.findIndex(p => p.startsWith('$'));
    if (firstIndex < 0) {
      return path;
    }

    const parts = [...path.parts];
    for (let i = firstIndex; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('$')) {
        const variableName = part.substring(1);
        parts[i] = this.readVariable(variableName);
      }
    }
    return Path.create(parts);
  }

  public evaluateUrl(url: string): string {
    return url.replaceAll(/\$[a-zA-Z_0-9-]+\$/g, (match: string) => {
      let name = match.substring(1);
      if (name.endsWith('$')) {
        name = name.substring(0, name.length - 1);
      }
      const value = this.readVariable(name);
      return encodeURIComponent(value);
    });
  }

  private readVariable(name: string): string {
    const value = this.variables.read(name);
    return String(value);
  }
}
