var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.post("/", async function (req, res, next) {
//   try {
//     const result = await postsModel.create(req.body);
//     http.success(res, "新增貼文成功", result);
//   } catch (err) {
//     http.fail(res, `新增貼文失敗:${err}`);
//   }
// });

module.exports = router;
