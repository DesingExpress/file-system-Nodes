import { Pure } from "@design-express/fabrica";

export class directoryEntries extends Pure {
  static path = "FileSystem/Directory";
  static title = "Entries";

  constructor() {
    super();

    this.addInput("handler", "fs::directoryhandler,object");

    this.addOutput("FileHadlers", "array");
  }
  async onExecute() {
    const handler = this.getInputData(1);
    this.setOutputData(1, await handler.values());
  }
}
