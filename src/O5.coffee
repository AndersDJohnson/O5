###
Underscore dependency is optional.
Parts actually used are inlined below.
###
#_ = require "underscore"

###
Begin inlined Underscore.js utilities
###
do ->
	_ ?= {}
	ArrayProto ?= Array.prototype
	slice ?= ArrayProto.slice
	nativeForEach ?= ArrayProto.forEach
	nativeIsArray ?= Array.isArray
	_.isObject ?= `function(obj) {
	return obj === Object(obj);
	};`
	_.isArray ?= `nativeIsArray || function(obj) {
	return toString.call(obj) == '[object Array]';
	};`
	each ?= _.each ?= _.forEach ?= `function(obj, iterator, context) {
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
	};`
	_.extend ?= `function(obj) {
	each(slice.call(arguments, 1), function(source) {
	for (var prop in source) {
	obj[prop] = source[prop];
	}
	});
	return obj;
	};`
	_.clone = `function(obj) {
	if (!_.isObject(obj)) return obj;
	return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	};`
	_.defaults ?= `function(obj) {
	each(slice.call(arguments, 1), function(source) {
	for (var prop in source) {
	if (obj[prop] == null) obj[prop] = source[prop];
	}
	});
	return obj;
	};`
	idCounter = 0
	_.uniqueId ?= `function(prefix) {
	var id = idCounter++;
	return prefix ? prefix + id : id;
	};`
	return _
###
End inlined Underscore.js utilities
###

###
The good stuff
###
module.exports = exports = O5 = do ->
	
	###
	Default property descriptor values
	Using prototypical inheritance for defaults improves performance
	###
	class Descriptor
		writable: true
		configurable: true
		enumerable: true
		value: undefined
		get: ->
			return @value
		# the user's set function
		_set: (value) ->
			return value
		set: (value) ->
			if @writable
				@value = @_set(value)
	
	id_key = "_05_id"
	
	get_id = (obj) ->
		return obj[id_key]
	
	set_id = (obj) ->
		id = _.uniqueId()
		return obj[id_key] = id
	
	cache = {}
	
	O5 =
		init: (obj) ->
			id = set_id(obj)
			cache[id] = {}
		defineProperty: (obj, prop, descriptor) ->
			@init(obj) unless get_id(obj)?
			id = get_id(obj)
			defaultDescriptor = new Descriptor()
			if descriptor["set"]?
				descriptor["_set"] = descriptor["set"]
				delete descriptor["set"]
			descriptor = _.defaults(descriptor, defaultDescriptor)
			cache[id][prop] = descriptor
			return obj
		defineProperties: (obj, props) ->
			for prop, descriptor of props
				obj = @defineProperty(obj, prop, descriptor)
			return obj
		getOwnPropertyDescriptor: (obj, prop) ->
			id = get_id(obj)
			descriptorClone = _.clone(cache[id]?[prop])
			descriptorClone["set"] = descriptorClone["_set"]
			delete descriptorClone["_set"]
			return descriptorClone
		get: (obj, prop) ->
			id = get_id(obj)
			return cache[id]?[prop]?.get()
		set: (obj, prop, value) ->
			id = get_id(obj)
			return cache[id]?[prop]?.set(value)
		toJSON: (obj) ->
			json = {}
			id = get_id(obj)
			for prop, descriptor of cache[id]
				json[prop] = descriptor.get()
			for prop, value of obj
				json[prop] = value unless prop is id_key
			return json
	
	return O5


