import { Pure } from "@design-express/fabrica";
import { START_IN } from "../enum";
import supported from "../supported";

export class directoryPicker extends Pure {
  static path = "FileSystem/Directory";
  static title = "DirectoryPicker";
  static [`@startIn`] = { type: "enum", values: START_IN };
  static [`@mode`] = {
    type: "enum",
    values: ["read", "write", "read/write"],
  };
  constructor() {
    super();
    this.properties = {
      mode: directoryPicker["@mode"].values[0],
      startIn: START_IN[0],
    };
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("startIn", "string");
    this.addInput("mode", "string");

    this.addOutput("handler", "fs::directoryhandler,object");
    this.addOutput("onFail", -1);

    this.addWidget("text", "startIn", this.properties.startIn, "startIn");
    this.addWidget("combo", "mode", this.properties.mode, "mode", {
      values: directoryPicker["@mode"].values,
    });

    this.widgets_up = true;
    this.widgets_start_y = 50;
  }
  async onExecute() {
    const isSupported = supported;
    if (!isSupported) {
      this.triggerSlot(2);
      return;
    }
    const opts = {
      startIn: this.getInputData(3) ?? this.properties.startIn,
      mode: this.getInputData(4) ?? this.properties.mode,
    };
    const dirHandler = await window.showDirectoryPicker(opts);
    this.setOutputData(1, dirHandler);
  }
}
