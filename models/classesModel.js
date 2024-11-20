// 課程資訊表

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  classID: {
    type: String,
    required: [true, "不可空白"],
  },
  className: {
    type: String,
    required: [true, "不可空白"],
  },
  classTeacher: {
    type: String,
    required: [false, "不可空白"],
  },
  level: {
    type: String,
    required: [false, ""],
  },
  classIntro: {
    type: String,
    required: [true, "不可空白"],
  },
});

const classesModel = mongoose.model("Classes", schema);
console.log(classesModel);
module.exports = classesModel;
