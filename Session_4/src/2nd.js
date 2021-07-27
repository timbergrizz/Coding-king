let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let fs = require("fs");
let cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// 파일 생성
app.post("/create", function (request, response) {
  //post타입으로 전달된 파일이름과 파일 내용 변수에 저장
  let content = request.body.content;
  let fileName = request.body.filename;

  //파일을 다루기 위해서는 fs라는 Node.js에 내장된 객체 필요로함
  //fs 객체를 통해 새로운 파일 생성
  fs.writeFile(`./data/${fileName}`, content, "utf-8", function (err) {
    //데이터와 관련된 작업을 할때 문제가 발생하면, 이렇게 문제를 처리할 수 있음.
    if (err) {
      console.log(err);
      //에러가 발생했다는 것은 작업이 정상적으로 수행되지 않았다는 뜻.
      //
      response.json({
        success: false,
      });
      return;
    }
    //작업이 정상적으로 수행되었다면 정상적으로 수행되었다고 메시지 보냄.
    response.json({
      success: true,
    });
  });
});

app.get("/view/:filename", function (request, response) {
  // 조회는 get방식으로 사용해도 ok
  // get방식으로 파라미터 받고, 받은 파라미터 변수에 저장
  let fileName = request.params.filename;
  // fs 객체를 이용해 파일을 읽음.
  fs.readFile(`./data/${fileName}`, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      response.json({
        success: false,
      });
      return;
    }
    response.json({
      filename: fileName,
      content: data,
      success: true,
    });
  });
});

app.post("/update", function (request, response) {
  // post 타입으로 전달받은 기존 파일명, 새 파일명, 내용 새로운 변수에 저장
  let pre_file = request.body.pre_file;
  let new_file = request.body.new_file;
  let content = request.body.content;

  // fs객체로 파일명을 재설정.
  fs.rename(`data/${pre_file}`, `data/${new_file}`, function (err) {
    if (err) {
      console.log(err);
      response.json({
        success: false,
      });
      return;
    }
    fs.writeFile(`data/${new_file}`, content, "utf-8", function (err) {
      if (err) {
        console.log(err);
        response.json({
          success: false,
        });
        return;
      }
      response.json({
        success: true,
      });
    });
  });
});

app.post("/delete", function (request, response) {
  // 입력받은 파일명을 변수에 저장
  let filename = request.body.filename;
  // 파일 삭제를 fs 모듈을 이용해 수행
  fs.unlink(`./data/${filename}`, function (error) {
    // 항상 마찬가지로 에러가 발생했을 때는 에러를 따로 처리해야함.
    if (error) {
      console.log(error);
      response.json({
        success: false,
      });
      return;
    }
    // 작업 성공적으로 수행했다고 메시지 전송
    response.json({
      success: true,
    });
  });
});

// form.html을 보내줌.
// 파일 읽어서 보내주는 역할이 끝
app.get("/form", function (request, response) {
  fs.readFile("./form.html", "utf8", function (err, data) {
    response.send(data);
  });
});

app.get("/list", function (request, response) {
  fs.readdir("./data", (err, files) => {
    response.json(files);
  });
});

//n번 포트로 입력받겠습니다!
app.listen(3030);
