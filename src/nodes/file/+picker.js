import { Pure } from "@design-express/fabrica";
import { START_IN } from "../enum";
import supported from "../supported";
import openfileLegacy from "./legacy/openfile";

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
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("startIn", "string");
    this.addInput("allowAny", "boolean");
    this.addInput("multiple", "boolean");
    this.addInput("types", "array,string");

    this.addOutput("handler", "fs::filehandler,object,array");
    this.addOutput("onNotSupported", -1);
    this.addOutput("onFail", -1);
    this.addOutput("failedInfo", "object");

    this.addWidget("combo", "startIn", this.properties.startIn, "startIn", {
      values: START_IN,
    });
    this.addWidget("toggle", "allowAny", this.properties.allowAny, "allowAny");
    this.addWidget("toggle", "multiple", this.properties.multiple, "multiple");
    this.addWidget("text", "types", this.properties.types, "types");

    this.widgets_up = true;
    this.widgets_start_y = 50;
  }

  async onExecute() {
    const isSupported = supported;
    if (!isSupported) {
      this.triggerSlot(2);
      // return;
    }
    const _types = (this.getInputData(6) ?? this.properties.types).trim();
    const opts = {
      startIn: this.getInputData(3) ?? this.properties.startIn,
      allowAny: this.getInputData(4) ?? this.properties.allowAny,
      multiple: this.getInputData(5) ?? this.properties.multiple,
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
            const [MIME, _EXTs] = i.split(":");
            const EXTs = (_EXTs ?? "").split(",").map((i) => `.${i.trim()}`);
            (opts.types.accept[MIME] ?? (opts.types.accept[MIME] = [])).push(
              ...EXTs
            );
          });
      } else if (typeof _types === "object" && !!_types.accept) {
        opts.types = _types;
      } else if (typeof _types === "object") {
        opts.types = { description: "", accept: _types };
      }
    }
    opts.types = [opts.types];
    const fileHandler = await (isSupported
      ? window.showOpenFilePicker(opts)
      : openfileLegacy({
          multiple: opts.multiple,
          mimeTypes: opts.types?.[0]?.accept
            ? Object.values(opts.types[0].accept).flat(1)
            : "*/*",
        })
    ).catch((e) => {
      this.setOutputData(4, e);
      this.triggerSlot(3);
    });
    this.setOutputData(
      1,
      opts.multiple || !isSupported ? fileHandler : fileHandler[0]
    );
  }
}
