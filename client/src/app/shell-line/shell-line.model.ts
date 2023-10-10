export enum LineType {
  introduction,
  userInput,
  stdout,
  stderr
}

export class ShellLineModel {
  type: LineType;
  line: string;

  constructor(type: LineType, line: string) {
    this.type = type;
    this.line = line;
  }
}
