const http = require("../services/http");
const classesModel = require("../models/classesModel");
const express = require("express");
const router = express.Router();

/* ============================================== */
/* ============================================== */
/* ============================================== */
/* ============================================== */
/* ============================================== */

/* GET home page. */
// router.get("/callback", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// router.get("/test", async function (req, res, next) {
//   try {
//     const result = await classesModel.find();
//     console.log(result);
//     http.success(res, "取得課程資訊成功", result);
//   } catch (err) {
//     http.fail(res, `取得課程資訊失敗:${err}`);
//   }
// });

const classIntroBubble = require("./../jsonTemplate/classIntro/bubble.json");
const classIntroCarousel = require("./../jsonTemplate/classIntro/carousel.json");
router.get("/classinfo", async function (req, res, next) {
  try {
    classIntroCarousel.contents.length = 0;
    let result = await classesModel.find().limit(5);
    result.forEach((element) => {
      let tempData = JSON.parse(JSON.stringify(classIntroBubble));
      tempData.body.contents[0].text = element.className;
      tempData.body.contents[2].contents[0].contents[0].text =
        element.classIntro;
      tempData.footer.contents[0].action.text = "了解更多" + element.className;
      classIntroCarousel.contents.push(tempData);
      tempData = {};
    });
    console.log(classIntroCarousel.contents.length);
    http.success(res, "取得課程資訊成功", classIntroCarousel);
  } catch (err) {
    http.fail(res, `取得課程資訊失敗:${err}`);
  }
});

router.get("/location", async function (req, res, next) {
  try {
    const locationBubble = require("./../jsonTemplate/location/bubble.json");
    http.success(res, "取得場館資訊成功", locationBubble);
  } catch (err) {
    http.fail(res, `取得場館資訊失敗:${err}`);
  }
});

module.exports = router;
