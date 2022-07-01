export const editorHelper = {
  getEditorMode,
};

function getEditorMode(fileName) {
  let type = "gfm";
  let fileExtension = fileName.split(".").pop();

  switch (fileExtension) {
    case "py":
      type = "python";
      break;
    case "yml":
    case "yaml":
      type = "yaml";
      break;
    case "md":
      type = "markdown";
      break;
    case "json":
      type = { name: "javascript", json: true };
      break;
    case "sh":
      type = "shell";
      break;
    default:
      break;
  }

  return type;
}
