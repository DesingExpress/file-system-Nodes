import { Pure } from "@design-express/fabrica";
import { START_IN } from "../enum";
import supported from "../supported";
import savefileLegacy from "./legacy/savefile";

export class saveFilePicker extends Pure {
  static path = "FileSystem/File";
  static title = "SaveFilePicker";
  static [`@startIn`] = { type: "enum", values: START_IN };
  constructor() {
    super();
    this.properties = {
      startIn: START_IN[0],
      allowAny: true,
      suggestedName: "untitled",
      types: "any",
    };
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("", "", { hidden: true, locked: true });
    this.addInput("startIn", "string");
    this.addInput("allowAny", "boolean");
    this.addInput("suggestedName", "string");
    this.addInput("types", "array,object,string");

    this.addOutput("handler", "fs::filehandler,object");
    this.addOutput("onNotSupported", -1);
    this.addOutput("onFail", -1);
    this.addOutput("failedInfo", "object");

    this.addWidget("combo", "startIn", this.properties.startIn, "startIn", {
      values: START_IN,
    });
    this.addWidget("toggle", "allowAny", this.properties.allowAny, "allowAny");
    this.addWidget(
      "text",
      "suggestedName",
      this.properties.suggestedName,
      "suggestedName"
    );
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
      suggestedName: this.getInputData(5) ?? this.properties.suggestedName,
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
      ? window.showSaveFilePicker(opts)
      : savefileLegacy({
          fileName: opts.suggestedName,
          extension: opts.types?.[0]?.accept
            ? Object.values(opts.types[0].accept).flat(1)
            : "*",
        })
    ).catch((e) => {
      this.setOutputData(4, e);
      this.triggerSlot(3);
    });
    console.log(fileHandler);
    this.setOutputData(1, fileHandler);
  }
}
