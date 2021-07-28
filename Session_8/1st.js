let express = require("express");
let mongoose = require("mongoose");
let app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/onClass", {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Succesfully Connected");
  });

let FileSchema = new mongoose.Schema({
  filename: String,
  content: String,
});

let File = mongoose.model("file", FileSchema);

app.post("/create", function (request, response) {
  let filename = request.body.filename;
  let content = request.body.content;

  let newFile = new File({
    filename: filename,
    content: content,
  });

  newFile
    .save()
    .then(function () {
      response.json({ success: true });
    })
    .catch(function (err) {
      console.log(err);
      response.json({ success: false });
    });
});

app.get("/read/:filename", function (request, response) {
  File.find({
    filename: request.params.filename,
  }).then(function (post) {
    response.json(post);
  });
});

app.get("/form", function (request, response) {
  response.send(`
    <form action="/create" method="post">
    <p>제목 : <input type="text" name="filename" /></p>
    <p>내용 : <input type="text" name="content" /></p>
    <input type="submit" value="전송" />
    </form>
  `);
});

app.listen(3003);
