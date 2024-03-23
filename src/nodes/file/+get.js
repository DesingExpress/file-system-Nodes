import { Pure } from "@design-express/fabrica";

export class getFile extends Pure {
  static path = "FileSystem/File";
  static title = "GetFile";
  static [`@outputType`] = {
    type: "enum",
    values: ["raw", "text", "arrayBuffer", "stream"],
  };

  constructor() {
    super();
    this.properties = { outputType: getFile["@outputType"].values[1] };
    this.addInput("handler", "fs::filehandler,object");
    this.addInput("outputType", "string");
    this.addOutput("text", "string");
    this.addWidget(
      "combo",
      "outputType",
      this.properties.outputType,
      "outputType",
      {
        values: getFile["@outputType"].values,
      }
    );
  }
  onPropertyChanged(name, val, prev) {
    this.properties[name] = val;
    if (name === "outputType") {
      switch (val) {
        case "text":
          this.outputs[1].type = "string";
          this.outputs[1].label = "text";
          break;
        case "arrayBuffer":
          this.outputs[1].type = "arraybuffer";
          this.outputs[1].label = "buffer";
          break;
        case "stream":
          this.outputs[1].type = "stream,object";
          this.outputs[1].label = "ReadableStream";
          break;
        default:
          this.outputs[1].type = "blob,object";
          this.outputs[1].label = "blob";
          break;
      }
    }
  }
  async onExecute() {
    const handler = this.getInputData(1);
    const dataType = this.getInputData(2) ?? this.properties.outputType;
    if (getFile["@outputType"].values.indexOf(dataType) < 0) return;
    console.log(dataType);
    this.setOutputData(
      1,
      dataType === "raw"
        ? await handler.getFile()
        : await (await handler.getFile())[dataType]()
    );
  }
}
