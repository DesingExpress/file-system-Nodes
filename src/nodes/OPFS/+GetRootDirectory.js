import { Pure } from "@design-express/fabrica";

export class getRootDirectory extends Pure {
  static path = "FileSystem/OPFS";
  static title = "GetRootDirectory";
  static description = "";

  constructor() {
    super();
    this.addOutput("handler", "fs::directoryhandler,object");
  }

  async onExecute() {
    this.setOutputData(1, await navigator.storage.getDirectory());
  }
}
