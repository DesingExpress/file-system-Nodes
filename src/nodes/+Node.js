import { showOpenFilePicker, showSaveFilePicker } from "file-system-access";
export class filePicker {
  static path = "File System";
  static title = "filePicker";
  static description = "filePicker files or Directories.";
  static ["@type"] = {
    type: "enum",
    values: ["read", "write"],
  };
  static funcMap = {
    read: async function () {
      // Open file picker and destructure the result the first handle
      const [fileHandle] = await showOpenFilePicker({
        types: [{ "application/pdf": [".pdf"] }], // default
        multiple: false, // default
        excludeAcceptAllOption: false, // default
        _preferPolyfill: false, // default
      });
      return await fileHandle.getFile();
    },
    write: async function () {
      const fileHandle = await showSaveFilePicker({
        _preferPolyfill: false,
        suggestedName: "modified.pdf",
        types: [{ accept: { "application/pdf": [".pdf"] } }],
        excludeAcceptAllOption: false,
      });
      return fileHandle;
    },
  };
  constructor() {
    //  this.addInput("",'string')
    this.properties = { type: "read" };
    this.addOutput("", "object");
  }

  async onExecute() {
    const _result = await filePicker.funcMap[this.properties.type]();
    this.setOutputData(0, _result);
  }
}
export class read {
  static path = "File System";
  static title = "Read";
  static description = "Read files or Directories.";

  constructor() {
    this.addInput("", "object");
    this.addOutput("", "array");
  }

  async onExecute() {
    const _handler = this.getInputData(0);
    if (!_handler) return;
    console.log(_handler);
    const file = await _handler.arrayBuffer();
    this.setOutputData(0, file);
  }
}

export class writableStream {
  static path = "File System";
  static title = "WritableStream";
  static description = "Write stream files or Directories.";

  constructor() {
    this.addInput("", "object");
    this.addOutput("", "array");
  }

  async onExecute() {
    const _handler = this.getInputData(0);
    if (!_handler) return;

    const file = await _handler.createWritable();
    this.setOutputData(0, file);
  }
}
export class append {
  static path = "File System";
  static title = "WriteStream";
  static description = "Write stream files or Directories.";

  constructor() {
    this.addInput("", "object");
    this.addOutput("", "array");
  }

  async onExecute() {
    const _handler = this.getInputData(0);
    if (!_handler) return;

    const file = await _handler.createWritable();
    this.setOutputData(0, file);
  }
}

export class write {
  static path = "File System";
  static title = "Write";
  static description = "Write files or Directories.";

  constructor() {
    this.addInput("", "object");
    this.addInput("", "binary");
    // this.addOutput("", "array");
  }

  async onExecute() {
    const _handler = this.getInputData(0);
    const _bin = this.getInputData(1);
    if (!_handler) return;

    const writable = await _handler.createWritable();
    console.log(writable, _bin);
    await writable.write(_bin);
    await writable.close();
    // this.setOutputData(0, file);
  }
}
