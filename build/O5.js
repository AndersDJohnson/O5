
/*
Underscore dependency is optional.
Parts actually used are inlined below.
*/

/*
Begin inlined Underscore.js utilities
*/

(function() {

  (function() {
    var idCounter, _ref, _ref2;
    if (typeof _ === "undefined" || _ === null) _ = {};
    if (typeof ArrayProto === "undefined" || ArrayProto === null) {
      ArrayProto = Array.prototype;
    }
    if (typeof slice === "undefined" || slice === null) slice = ArrayProto.slice;
    if (typeof nativeForEach === "undefined" || nativeForEach === null) {
      nativeForEach = ArrayProto.forEach;
    }
    if (typeof nativeIsArray === "undefined" || nativeIsArray === null) {
      nativeIsArray = Array.isArray;
    }
    if (_.isObject == null) {
      _.isObject = function(obj) {
	return obj === Object(obj);
	};;
    }
    if (_.isArray == null) {
      _.isArray = nativeIsArray || function(obj) {
	return toString.call(obj) == '[object Array]';
	};;
    }
    if (typeof each === "undefined" || each === null) {
      each = (_ref = _.each) != null ? _ref : _.each = (_ref2 = _.forEach) != null ? _ref2 : _.forEach = function(obj, iterator, context) {
	if (obj == null) return;
	if (nativeForEach && obj.forEach === nativeForEach) {
	obj.forEach(iterator, context);
	} else if (obj.length === +obj.length) {
	for (var i = 0, l = obj.length; i < l; i++) {
	if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
	}
	} else {
	for (var key in obj) {
	if (_.has(obj, key)) {
	if (iterator.call(context, obj[key], key, obj) === breaker) return;
	}
	}
	}
	};;
    }
    if (_.extend == null) {
      _.extend = function(obj) {
	each(slice.call(arguments, 1), function(source) {
	for (var prop in source) {
	obj[prop] = source[prop];
	}
	});
	return obj;
	};;
    }
    _.clone = function(obj) {
	if (!_.isObject(obj)) return obj;
	return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	};;
    if (_.defaults == null) {
      _.defaults = function(obj) {
	each(slice.call(arguments, 1), function(source) {
	for (var prop in source) {
	if (obj[prop] == null) obj[prop] = source[prop];
	}
	});
	return obj;
	};;
    }
    idCounter = 0;
    if (_.uniqueId == null) {
      _.uniqueId = function(prefix) {
	var id = idCounter++;
	return prefix ? prefix + id : id;
	};;
    }
    return _;
  })();

  /*
  End inlined Underscore.js utilities
  */

  /*
  The good stuff
  */

  (function() {
    var exports, factory, name;
    name = "O5";
    factory = function() {
      /*
      		Default property descriptor values
      		Using prototypical inheritance for defaults improves performance
      */
      var Descriptor, O5, cache, get_id, id_key, set_id;
      Descriptor = (function() {

        function Descriptor() {}

        Descriptor.prototype.writable = true;

        Descriptor.prototype.configurable = true;

        Descriptor.prototype.enumerable = true;

        Descriptor.prototype.value = void 0;

        Descriptor.prototype.get = function() {
          return this.value;
        };

        Descriptor.prototype._set = function(value) {
          return value;
        };

        Descriptor.prototype.set = function(value) {
          if (this.writable) return this.value = this._set(value);
        };

        return Descriptor;

      })();
      id_key = "_05_id";
      get_id = function(obj) {
        return obj[id_key];
      };
      set_id = function(obj) {
        var id;
        id = _.uniqueId();
        return obj[id_key] = id;
      };
      cache = {};
      O5 = {
        init: function(obj) {
          var id;
          id = set_id(obj);
          return cache[id] = {};
        },
        defineProperty: function(obj, prop, descriptor) {
          var defaultDescriptor, id;
          if (get_id(obj) == null) this.init(obj);
          id = get_id(obj);
          defaultDescriptor = new Descriptor();
          if (descriptor["set"] != null) {
            descriptor["_set"] = descriptor["set"];
            delete descriptor["set"];
          }
          descriptor = _.defaults(descriptor, defaultDescriptor);
          cache[id][prop] = descriptor;
          return obj;
        },
        defineProperties: function(obj, props) {
          var descriptor, prop;
          for (prop in props) {
            descriptor = props[prop];
            obj = this.defineProperty(obj, prop, descriptor);
          }
          return obj;
        },
        getOwnPropertyDescriptor: function(obj, prop) {
          var descriptorClone, id, _ref;
          id = get_id(obj);
          descriptorClone = _.clone((_ref = cache[id]) != null ? _ref[prop] : void 0);
          descriptorClone["set"] = descriptorClone["_set"];
          delete descriptorClone["_set"];
          return descriptorClone;
        },
        get: function(obj, prop) {
          var id, _ref, _ref2;
          id = get_id(obj);
          return (_ref = cache[id]) != null ? (_ref2 = _ref[prop]) != null ? _ref2.get() : void 0 : void 0;
        },
        set: function(obj, prop, value) {
          var id, _ref, _ref2;
          id = get_id(obj);
          return (_ref = cache[id]) != null ? (_ref2 = _ref[prop]) != null ? _ref2.set(value) : void 0 : void 0;
        },
        toJSON: function(obj) {
          var descriptor, id, json, prop, value, _ref;
          json = {};
          id = get_id(obj);
          _ref = cache[id];
          for (prop in _ref) {
            descriptor = _ref[prop];
            json[prop] = descriptor.get();
          }
          for (prop in obj) {
            value = obj[prop];
            if (prop !== id_key) json[prop] = value;
          }
          return json;
        }
      };
      return O5;
    };
    if (typeof define !== "undefined" && define !== null) {
      return define([], factory);
    } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
      return module.exports = exports = factory();
    } else if (typeof window !== "undefined" && window !== null) {
      return window[name] = factory();
    }
  })();

}).call(this);
