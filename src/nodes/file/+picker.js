import { Pure } from "@design-express/fabrica";
import { START_IN } from "../enum";

export class filePicker extends Pure {
  static path = "FileSystem/File";
  static title = "FilePicker";
  static [`@startIn`] = { type: "enum", values: START_IN };
  constructor() {
    super();
    this.properties = {
      startIn: START_IN[0],
      allowAny: true,
      multiple: false,
      types: "any",
    };

    this.addInput("onFail", -1);
    this.addInput("startIn", "string");
    this.addInput("allowAny", "boolean");
    this.addInput("multiple", "boolean");
    this.addInput("types", "array,string");

    this.addOutput("handler", "fs::filehandler,object,array");

    this.addWidget("combo", "startIn", this.properties.startIn, "startIn", {
      values: START_IN,
    });
    this.addWidget("toggle", "allowAny", this.properties.allowAny, "allowAny");
    this.addWidget("toggle", "multiple", this.properties.multiple, "multiple");
    this.addWidget("text", "types", this.properties.types, "types");

    this.widgets_up = true;
    this.widgets_start_y = 24;
  }

  async onExecute() {
    if (!window.showOpenFilePicker) {
      this.triggerSlot(1);
      return;
    }
    const _types = (this.getInputData(5) ?? this.properties.types).trim();
    const opts = {
      startIn: this.getInputData(2) ?? this.properties.startIn,
      allowAny: this.getInputData(3) ?? this.properties.allowAny,
      multiple: this.getInputData(4) ?? this.properties.multiple,
    };
    if (_types !== undefined) {
      if (
        typeof _types === "string" &&
        _types.trim() !== "" &&
        _types !== "any"
      ) {
        opts.types = {
          description: "",
          accept: {},
        };
        _types
          .split(",")
          .map((i) => i.trim())
          .forEach((i) => {
            const [MIME, EXTs] = i.split("/");
            (opts.types.accept[MIME] ?? (opts.types.accept[MIME] = [])).push(
              EXTs
            );
          });
      } else if (typeof _types === "object" && !!_types.accept) {
        opts.types = _types;
      } else if (typeof _types === "object") {
        opts.types = { description: "", accept: _types };
      }
    }
    const fileHandler = await window.showOpenFilePicker(opts);
    this.setOutputData(1, opts.multiple ? fileHandler : fileHandler[0]);
  }
}
