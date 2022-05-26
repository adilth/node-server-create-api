let url = require("url");
let fs = require("fs");
let figlet = require("figlet");
let http = require("http");
let querystring = require("querystring");
// class Student {
//   constructor(
//     name = "unknown",
//     status = "unknown",
//     currentOccupation = "unknown"
//   ) {
//     this.name = name;
//     this.status = status;
//     this.currentOccupation = currentOccupation;
//   }
// }
const students = [
  { name: "leon", status: "bold", currentOccupation: "boss" },
  {
    name: "adil",
    status: "walo",
    currentOccupation: "noss",
  },
];
const server = http.createServer((req, res) => {
  function createfile(filename, contentType) {
    fs.readFile(filename, (err, data) => {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    });
  }
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  switch (page) {
    case "/":
      createfile("index.html", "text/html");
      break;
    case "/otherpage":
      createfile("otherpage.html", "text/html");
      break;
    case "/otherotherpage":
      createfile("otherotherpage.html", "text/html");
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      let obj = {
        name: "unknown",
        status: "unknown",
        currentOccupation: "unknown",
      };
      if (params.student == "flip") {
        let flipResult =
          params["student"] == "flip"
            ? Math.random() <= 0.5
              ? "heads"
              : "tails"
            : "type 'flip' in the input box";
        obj = {
          name: "the result is",
          status: Math.random() <= 0.5 ? "heads" : "tails",
          currentOccupation: "",
        };
      } else if ("student" in params) {
        const found = students.find(
          (student) => student.name === params["student"]
        );
        if (found) obj = found;
      }
      res.end(JSON.stringify(obj));
      break;
    case "/css/style.css":
      fs.readFile("css/style.css", (err, data) => {
        res.write(data);
        res.end();
      });
      break;
    case "/js/main.js":
      createfile("js/main.js", "text/javascript");
      break;
    default:
      figlet("404!!", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        res.write(data);
        res.end();
      });
  }
  // if (page == "/") {
  //   createfile("index.html", "text/html");
  // } else if (page == "/otherpage") {
  //   createfile("otherpage.html", "text/html");
  // } else if (page == "/otherotherpage") {
  //   createfile("otherotherpage.html", "text/html");
  // } else if (page == "/api") {
  //   // if ("student" in params) {
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   if (params["student"] == "leon") {
  //     const leonsss = new Student("leon", "boss", "boll");
  //     res.end(JSON.stringify(leonsss));
  //   } //student = leon
  //   const unknown = new Student("unknown", "unknwon", "unknown");
  //   res.end(JSON.stringify(unknown));
  //   // } //student if
  // } //else if
  // else if (page == "/css/style.css") {
  //   fs.readFile("css/style.css", (err, data) => {
  //     res.write(data);
  //     res.end();
  //   });
  //   // createfile("css/style.css", "text/css");
  // } else if (page == "/js/main.js") {
  //   createfile("js/main.js", "text/javascript");
  // } else {
  //   figlet("404!!", function (err, data) {
  //     if (err) {
  //       console.log("Something went wrong...");
  //       console.dir(err);
  //       return;
  //     }
  //     res.write(data);
  //     res.end();
  //   });
  // }
});

server.listen(8000);
