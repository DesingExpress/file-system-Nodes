# [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) Nodes

Access files / Directories on the device file system — allows read, write and file management capabilities.

## 🚧 Caution

The **'File System API'** is an experimental API.  
This API does not support all browsers.

Check the compatible browser on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)

## Nodes Structure

```bash
 FileSystem
 ├── Directory
 │   ├── DirectoryPicker
 │   └── Entries
 └── File
     ├── FilePicker
     ├── saveFilePicker
     └── GetFile
```

## 🔲Include Nodes

### `DirectoryPicker` Node

```litegraph
{
  "title": "DirectoryPicker",
  "inputs": [
    { "label": "startIn", "type":"string" },
    { "label": "mode", "type":"string" }
  ],
  "outputs": [
    { "label": "handler", "type":"fs::directoryhandler,object,array" },
    { "label": "onNotSupported", "type":-1 },
    { "label": "onFail", "type":-1 },
    { "label": "failedInfo", "type":"object" }
  ]
}
```

#### Slots

##### Inputs

| Label       | Type     | Description |
| ----------- | -------- | ----------- |
| **startIn** | `string` |             |
| **mode**    | `string` |             |

##### Outputs

| Label              | Type                                    | Description |
| ------------------ | --------------------------------------- | ----------- |
| **handler**        | `fs::directoryhandler`,`object`,`array` |             |
| **onNotSupported** | `Event`                                 |             |
| **onFail**         | `Event`                                 |             |
| **failedInfo**     | `object`                                |             |

---

&nbsp;
&nbsp;

### `FilePicker` Node

```litegraph
{
  "title": "FilePicker",
  "inputs": [
    { "label": "startIn", "type":"string" },
    { "label": "allowAny", "type":"boolean" },
    { "label": "multiple", "type":"boolean" },
    { "label": "types", "type":"array,string" }
    ],
  "outputs": [
    { "label": "handler", "type":"fs::filehandler,object,array" },
    { "label": "onNotSupported", "type":-1 },
    { "label": "onFail", "type":-1 },
    { "label": "failedInfo", "type":"object" }
  ]
}
```

#### Slots

##### Inputs

| Label        | Type             | Description |
| ------------ | ---------------- | ----------- |
| **startIn**  | `string`         |             |
| **allowAny** | `boolean`        |             |
| **multiple** | `boolean`        |             |
| **types**    | `array`,`string` |             |

##### Outputs

| Label              | Type                               | Description |
| ------------------ | ---------------------------------- | ----------- |
| **handler**        | `fs::filehandler`,`object`,`array` |             |
| **onNotSupported** | `Event`                            |             |
| **onFail**         | `Event`                            |             |
| **failedInfo**     | `object`                           |             |

---

&nbsp;
&nbsp;

### `SaveFilePicker` Node

```litegraph
{
  "title": "SaveFilePicker",
  "inputs": [
    { "label": "startIn", "type":"string" },
    { "label": "allowAny", "type":"boolean" },
    { "label": "suggestedName", "type":"string" },
    { "label": "types", "type":"array,string" }
    ],
  "outputs": [
    { "label": "handler", "type":"fs::filehandler,object,array" },
    { "label": "onNotSupported", "type":-1 },
    { "label": "onFail", "type":-1 },
    { "label": "failedInfo", "type":"object" }
  ]
}
```

#### Slots

##### Inputs

| Label             | Type             | Description |
| ----------------- | ---------------- | ----------- |
| **startIn**       | `string`         |             |
| **allowAny**      | `boolean`        |             |
| **suggestedName** | `string`         |             |
| **types**         | `array`,`string` |             |

##### Outputs

| Label              | Type                               | Description |
| ------------------ | ---------------------------------- | ----------- |
| **handler**        | `fs::filehandler`,`object`,`array` |             |
| **onNotSupported** | `Event`                            |             |
| **onFail**         | `Event`                            |             |
| **failedInfo**     | `object`                           |             |

---

&nbsp;
&nbsp;

## Loadmap

## Contributing

Please visit [Github repository [ DesingExpress/file-system-Nodes ]](https://github.com/DesingExpress/file-system-Nodes)

## Sources

[Github repository [ DesingExpress/file-system-Nodes ]](https://github.com/DesingExpress/file-system-Nodes)

## License

[MIT](https://mit-license.org/)
