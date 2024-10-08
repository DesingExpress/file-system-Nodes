import { Pure } from "@design-express/fabrica";

// https://stackoverflow.com/a/66500919
async function verifyPermission(fileHandle, readWrite) {
  const options = {};
  if (fileHandle instanceof File) {
    return true;
  }

  if (readWrite) {
    options.mode = "readwrite";
  }

  if (!fileHandle) {
    return false;
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === "granted") {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === "granted") {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}
export class getFile extends Pure {
  static path = "FileSystem/File";
  static title = "GetFile";
  static [`@outputType`] = {
    type: "enum",
    values: ["raw", "text", "arrayBuffer", "stream", "node:buffer"],
  };

  constructor() {
    super();
    this.properties = { outputType: getFile["@outputType"].values[1] };
    this.addInput("handler", "fs::filehandler,object");
    this.addInput("outputType", "string");
    this.addOutput("text", "string");
    this.addOutput("empty", "");
    this.addOutput("onError", -1);
    this.addWidget(
      "combo",
      "outputType",
      this.properties.outputType,
      "outputType",
      {
        values: getFile["@outputType"].values,
      }
    );
    this.widgets_up = true;
    this.widgets_start_y = 26;
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
          this.outputs[1].label = "arraybuffer";
          break;
        case "node:buffer":
          this.outputs[1].type =
            "array,typedarray,uint8array,buffer,node:buffer";
          this.outputs[1].label = "node:buffer";
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
    try {
      if (await verifyPermission(handler)) {
        this.setOutputData(
          1,
          dataType === "raw"
            ? await handler.getFile()
            : dataType === "node:buffer"
            ? Buffer.from(await (await handler.getFile())["arrayBuffer"]())
            : await (await handler.getFile())[dataType]()
        );
        this.triggerSlot(0);
      } else {
        this.triggerSlot(3);
      }
    } catch (e) {
      console.error(e);
      this.triggerSlot(3);
    }
  }
  async onAction() {
    if (this.mode === 0) return;
    await this.onExecute();
  }
}
