import { Pure } from "@design-express/fabrica";

export class directoryPicker extends Pure {
  static path = "FileSystem/Directory";
  static title = "DirectoryPicker";
  static [`@mode`] = {
    type: "enum",
    values: ["read", "write", "read/write"],
  };
  constructor() {
    super();
    this.properties = {
      mode: directoryPicker["@mode"].values[0],
      startIn: "Desktop",
    };
    this.addInput("onFail", -1);

    this.addInput("startIn", "string");
    this.addInput("mode", "string");

    this.addOutput("handler", "fs::directoryhandler,object");

    this.addWidget("text", "startIn", this.properties.startIn, "startIn");
    this.addWidget("combo", "mode", this.properties.mode, "mode", {
      values: directoryPicker["@mode"].values,
    });
    this.widgets_up = true;
    this.widgets_start_y = 24;
  }
  async onExecute() {
    if (!window.showDirectoryPicker) {
      this.triggerSlot(1);
      return;
    }
    const opts = {
      startIn: this.getInputData(2) ?? this.properties.startIn,
      mode: this.getInputData(3) ?? this.properties.mode,
    };
    const dirHandler = await window.showDirectoryPicker(opts);
    this.setOutputData(1, dirHandler);
  }
}
