var e = "prod",
  r = wx.getLaunchOptionsSync();

r && r.query.env && (e = r.query.env);

var s = require("./default.js"),
  t = require("./test.js"),
  i = require("./test2.js"),
  u = require("./pre.js"),
  a = require("./prod.js");

module.exports = "local" === e ? s : "test" === e ? Object.assign(s, t) : "test2" === e ? Object.assign(s, i) : "pre" === e ? Object.assign(s, u) : "prod" === e ? Object.assign(s, a) : s;