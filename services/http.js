const httpHeader = {
  "Access-Control-Request-Headers":
    "Content-type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*", //表示允許所有網域存取目前網域
  "Access-Control-Request-Method": "PATCH, POST, GET, OPTIONS, DELETE",
  "Content-type": "application/json",
};

//封裝http回應
const http = {
  success(res, msg, data) {
    res.writeHead("200", httpHeader);
    res.write(
      JSON.stringify({
        status: "success",
        message: msg,
        data,
      })
    );
    res.end();
  },
  fail(res, msg) {
    res.writeHead("500", httpHeader);
    res.write(
      JSON.stringify({
        status: "false",
        message: msg,
      })
    );
    res.end();
  },
};

module.exports = http;
