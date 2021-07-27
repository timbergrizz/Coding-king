const fs = require("fs");
fs.readdir("./data", (err, files) => {
  console.log(files);
});
