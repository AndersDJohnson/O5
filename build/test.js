(function() {
  var O5, t1, t2;

  O5 = require("./O5");

  t1 = O5.defineProperty({}, "foo", {
    writable: true,
    configurable: false,
    set: function(value) {
      return "[" + value + "-SETTED]";
    }
  });

  O5.defineProperty(t1, "bar", {
    writable: false,
    configurable: true
  });

  O5.defineProperties(t1, {
    "bing": {
      writable: false,
      value: "write blocked!",
      configurable: true
    },
    "taz": {
      get: function() {
        return "tazmanian devil";
      }
    }
  });

  t2 = O5.defineProperties({}, {
    "far": {
      writable: true,
      configurable: false,
      get: function() {
        return "hey";
      }
    },
    "gee": {
      value: "GEEEE"
    }
  });

  t2.normal = "hello";

  O5.set(t1, "foo", "lala");

  O5.set(t1, "bing", "write allowed!");

  console.log(O5.getOwnPropertyDescriptor(t1, "bing"));

  console.log("t1.foo = ", O5.get(t1, "foo"));

  console.log("t1.taz = ", O5.get(t1, "taz"));

  console.log("t2.gee = ", O5.get(t2, "gee"));

  console.log("t1 = ", O5.toJSON(t1));

  console.log("t2 = ", O5.toJSON(t2));

}).call(this);
