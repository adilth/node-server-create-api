let url = require("url");
let fs = require("fs");
let figlet = require("figlet");
let http = require("http");
let querystring = require("querystring");

const students = [
  { name: "leon", status: "bolder", currentOccupation: "boss" },
  {
    name: "adil",
    status: "confuse",
    currentOccupation: "learn",
  },
  {
    name: "younes",
    status: "exciting",
    currentOccupation: "learn",
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
});

server.listen(8000);
