export type VariableState = Record<string, unknown>;

export function createVariableState(state?: VariableState): VariableState {
  return state ?? {};
}

export class VariablesService {
  public constructor(private readonly state: VariableState) {}

  public read<TValue>(name: string): TValue {
    const value = this.state[name];
    if (value === undefined) {
      throw new Error(`Cannot read unset variable: ${name}`);
    }
    return value as TValue;
  }

  public set<TValue>(name: string, value: TValue) {
    if (value === undefined) {
      throw new Error('Cannot set variable to undefined');
    }
    this.state[name] = value;
  }

  public isSet(name: string): boolean {
    return this.state[name] !== undefined;
  }

  public delete(name: string) {
    delete this.state[name];
  }
}
