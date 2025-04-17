import { Pure } from "@design-express/fabrica";

export class getDirectory extends Pure {
  static path = "FileSystem/OPFS";
  static title = "GetDirectory";
  static description = "";

  constructor() {
    super();
    this.properties = { canCreate: false, name: "" };
    this.addInput("handler", "fs::directoryhandler,object");
    this.addInput("name", "string");
    this.addInput("canCreate", "boolean");
    this.addOutput("handler", "fs::directoryhandler,object");
    this.addWidget("text", "name", this.properties.name, "name");
    this.addWidget(
      "toggle",
      "canCreate",
      this.properties.canCreate,
      "canCreate"
    );

    this.widgets_up = true;
    this.widgets_start_y = 26;
  }

  async onExecute() {
    const _handler = this.getInputData(1);
    const _dname = this.getInputData(2) ?? this.properties.name ?? "";
    const _canCreate = this.getInputData(3) ?? this.properties.canCreate;

    if (!_handler || _dname === "") return;
    this.setOutputData(
      1,
      await _handler.getDirectoryHandle(_dname, { create: _canCreate })
    );
  }
}
