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
     └── GetFile
```

## 🔲Include Nodes

### `DirectoryPicker` Node

```litegraph
{
  "title": "DirectoryPicker",
  "inputs": [
    { "label": "onFail", "type":-1 },
    { "label": "mode", "type":"string" }
    ],
  "outputs": [
    { "label": "handler", "type":"fs::directoryhandler,object,array" }
  ]
}
```

#### Slots

##### Inputs

| Label       | Type     | Description |
| ----------- | -------- | ----------- |
| **onFail**  | `Event`  |             |
| **startIn** | `string` |             |
| **mode**    | `string` |             |

##### Outputs

| Label       | Type                               | Description |
| ----------- | ---------------------------------- | ----------- |
| **handler** | `fs::filehandler`,`object`,`array` |             |

---

&nbsp;
&nbsp;

### `FilePicker` Node

```litegraph
{
  "title": "FilePicker",
  "inputs": [
    { "label": "onFail", "type":-1 },
    { "label": "startIn", "type":"string" },
    { "label": "allowAny", "type":"boolean" },
    { "label": "multiple", "type":"boolean" },
    { "label": "types", "type":"array,string" }
    ],
  "outputs": [
    { "label": "handler", "type":"fs::filehandler,object,array" }
  ]
}
```

#### Slots

##### Inputs

| Label        | Type             | Description |
| ------------ | ---------------- | ----------- |
| **onFail**   | `Event`          |             |
| **startIn**  | `string`         |             |
| **allowAny** | `boolean`        |             |
| **multiple** | `boolean`        |             |
| **types**    | `array`,`string` |             |

##### Outputs

| Label       | Type                               | Description |
| ----------- | ---------------------------------- | ----------- |
| **handler** | `fs::filehandler`,`object`,`array` |             |

---

&nbsp;
&nbsp;

## Loadmap

- showSaveFilePicker node

## Contributing

Please visit [Github repository [ DesingExpress/file-system-Nodes ]](https://github.com/DesingExpress/file-system-Nodes)

## Sources

[Github repository [ DesingExpress/file-system-Nodes ]](https://github.com/DesingExpress/file-system-Nodes)

## License

[MIT](https://mit-license.org/)
