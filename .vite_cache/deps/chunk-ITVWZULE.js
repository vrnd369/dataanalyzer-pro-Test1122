import {
  __commonJS,
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/graphology/dist/graphology.mjs
var import_events = __toESM(require_events(), 1);
function assignPolyfill() {
  const target = arguments[0];
  for (let i = 1, l = arguments.length; i < l; i++) {
    if (!arguments[i]) continue;
    for (const k in arguments[i]) target[k] = arguments[i][k];
  }
  return target;
}
var assign = assignPolyfill;
if (typeof Object.assign === "function") assign = Object.assign;
function getMatchingEdge(graph, source, target, type) {
  const sourceData = graph._nodes.get(source);
  let edge = null;
  if (!sourceData) return edge;
  if (type === "mixed") {
    edge = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target];
  } else if (type === "directed") {
    edge = sourceData.out && sourceData.out[target];
  } else {
    edge = sourceData.undirected && sourceData.undirected[target];
  }
  return edge;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null;
}
function isEmpty(o) {
  let k;
  for (k in o) return false;
  return true;
}
function privateProperty(target, name, value) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: true,
    value
  });
}
function readOnlyProperty(target, name, value) {
  const descriptor = {
    enumerable: true,
    configurable: true
  };
  if (typeof value === "function") {
    descriptor.get = value;
  } else {
    descriptor.value = value;
    descriptor.writable = false;
  }
  Object.defineProperty(target, name, descriptor);
}
function validateHints(hints) {
  if (!isPlainObject(hints)) return false;
  if (hints.attributes && !Array.isArray(hints.attributes)) return false;
  return true;
}
function incrementalIdStartingFromRandomByte() {
  let i = Math.floor(Math.random() * 256) & 255;
  return () => {
    return i++;
  };
}
function chain() {
  const iterables = arguments;
  let current = null;
  let i = -1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let step = null;
      do {
        if (current === null) {
          i++;
          if (i >= iterables.length) return { done: true };
          current = iterables[i][Symbol.iterator]();
        }
        step = current.next();
        if (step.done) {
          current = null;
          continue;
        }
        break;
      } while (true);
      return step;
    }
  };
}
function emptyIterator() {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { done: true };
    }
  };
}
var GraphError = class extends Error {
  constructor(message) {
    super();
    this.name = "GraphError";
    this.message = message;
  }
};
var InvalidArgumentsGraphError = class _InvalidArgumentsGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentsGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(
        this,
        _InvalidArgumentsGraphError.prototype.constructor
      );
  }
};
var NotFoundGraphError = class _NotFoundGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "NotFoundGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, _NotFoundGraphError.prototype.constructor);
  }
};
var UsageGraphError = class _UsageGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "UsageGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, _UsageGraphError.prototype.constructor);
  }
};
function MixedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
MixedNodeData.prototype.clear = function() {
  this.inDegree = 0;
  this.outDegree = 0;
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;
  this.directedLoops = 0;
  this.in = {};
  this.out = {};
  this.undirected = {};
};
function DirectedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
DirectedNodeData.prototype.clear = function() {
  this.inDegree = 0;
  this.outDegree = 0;
  this.directedLoops = 0;
  this.in = {};
  this.out = {};
};
function UndirectedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
UndirectedNodeData.prototype.clear = function() {
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;
  this.undirected = {};
};
function EdgeData(undirected, key, source, target, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.undirected = undirected;
  this.source = source;
  this.target = target;
}
EdgeData.prototype.attach = function() {
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  const source = this.source.key;
  const target = this.target.key;
  this.source[outKey][target] = this;
  if (this.undirected && source === target) return;
  this.target[inKey][source] = this;
};
EdgeData.prototype.attachMulti = function() {
  let outKey = "out";
  let inKey = "in";
  const source = this.source.key;
  const target = this.target.key;
  if (this.undirected) outKey = inKey = "undirected";
  const adj = this.source[outKey];
  const head = adj[target];
  if (typeof head === "undefined") {
    adj[target] = this;
    if (!(this.undirected && source === target)) {
      this.target[inKey][source] = this;
    }
    return;
  }
  head.previous = this;
  this.next = head;
  adj[target] = this;
  this.target[inKey][source] = this;
};
EdgeData.prototype.detach = function() {
  const source = this.source.key;
  const target = this.target.key;
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  delete this.source[outKey][target];
  delete this.target[inKey][source];
};
EdgeData.prototype.detachMulti = function() {
  const source = this.source.key;
  const target = this.target.key;
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  if (this.previous === void 0) {
    if (this.next === void 0) {
      delete this.source[outKey][target];
      delete this.target[inKey][source];
    } else {
      this.next.previous = void 0;
      this.source[outKey][target] = this.next;
      this.target[inKey][source] = this.next;
    }
  } else {
    this.previous.next = this.next;
    if (this.next !== void 0) {
      this.next.previous = this.previous;
    }
  }
};
var NODE = 0;
var SOURCE = 1;
var TARGET = 2;
var OPPOSITE = 3;
function findRelevantNodeData(graph, method, mode, nodeOrEdge, nameOrEdge, add1, add2) {
  let nodeData, edgeData, arg1, arg2;
  nodeOrEdge = "" + nodeOrEdge;
  if (mode === NODE) {
    nodeData = graph._nodes.get(nodeOrEdge);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" node in the graph.`
      );
    arg1 = nameOrEdge;
    arg2 = add1;
  } else if (mode === OPPOSITE) {
    nameOrEdge = "" + nameOrEdge;
    edgeData = graph._edges.get(nameOrEdge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nameOrEdge}" edge in the graph.`
      );
    const source = edgeData.source.key;
    const target = edgeData.target.key;
    if (nodeOrEdge === source) {
      nodeData = edgeData.target;
    } else if (nodeOrEdge === target) {
      nodeData = edgeData.source;
    } else {
      throw new NotFoundGraphError(
        `Graph.${method}: the "${nodeOrEdge}" node is not attached to the "${nameOrEdge}" edge (${source}, ${target}).`
      );
    }
    arg1 = add1;
    arg2 = add2;
  } else {
    edgeData = graph._edges.get(nodeOrEdge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" edge in the graph.`
      );
    if (mode === SOURCE) {
      nodeData = edgeData.source;
    } else {
      nodeData = edgeData.target;
    }
    arg1 = nameOrEdge;
    arg2 = add1;
  }
  return [nodeData, arg1, arg2];
}
function attachNodeAttributeGetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    return data.attributes[name];
  };
}
function attachNodeAttributesGetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge) {
    const [data] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge
    );
    return data.attributes;
  };
}
function attachNodeAttributeChecker(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    return data.attributes.hasOwnProperty(name);
  };
}
function attachNodeAttributeSetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, value] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );
    data.attributes[name] = value;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributeUpdater(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );
    const attributes = data.attributes;
    const value = updater(attributes[name]);
    attributes[name] = value;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributeRemover(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    delete data.attributes[name];
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "remove",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributesReplacer(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    data.attributes = attributes;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "replace",
      attributes: data.attributes
    });
    return this;
  };
}
function attachNodeAttributesMerger(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    assign(data.attributes, attributes);
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "merge",
      attributes: data.attributes,
      data: attributes
    });
    return this;
  };
}
function attachNodeAttributesUpdater(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );
    data.attributes = updater(data.attributes);
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "update",
      attributes: data.attributes
    });
    return this;
  };
}
var NODE_ATTRIBUTES_METHODS = [
  {
    name: (element) => `get${element}Attribute`,
    attacher: attachNodeAttributeGetter
  },
  {
    name: (element) => `get${element}Attributes`,
    attacher: attachNodeAttributesGetter
  },
  {
    name: (element) => `has${element}Attribute`,
    attacher: attachNodeAttributeChecker
  },
  {
    name: (element) => `set${element}Attribute`,
    attacher: attachNodeAttributeSetter
  },
  {
    name: (element) => `update${element}Attribute`,
    attacher: attachNodeAttributeUpdater
  },
  {
    name: (element) => `remove${element}Attribute`,
    attacher: attachNodeAttributeRemover
  },
  {
    name: (element) => `replace${element}Attributes`,
    attacher: attachNodeAttributesReplacer
  },
  {
    name: (element) => `merge${element}Attributes`,
    attacher: attachNodeAttributesMerger
  },
  {
    name: (element) => `update${element}Attributes`,
    attacher: attachNodeAttributesUpdater
  }
];
function attachNodeAttributesMethods(Graph2) {
  NODE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
    attacher(Graph2, name("Node"), NODE);
    attacher(Graph2, name("Source"), SOURCE);
    attacher(Graph2, name("Target"), TARGET);
    attacher(Graph2, name("Opposite"), OPPOSITE);
  });
}
function attachEdgeAttributeGetter(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes[name];
  };
}
function attachEdgeAttributesGetter(Class, method, type) {
  Class.prototype[method] = function(element) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 1) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + arguments[1];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes;
  };
}
function attachEdgeAttributeChecker(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes.hasOwnProperty(name);
  };
}
function attachEdgeAttributeSetter(Class, method, type) {
  Class.prototype[method] = function(element, name, value) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      value = arguments[3];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    data.attributes[name] = value;
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributeUpdater(Class, method, type) {
  Class.prototype[method] = function(element, name, updater) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      updater = arguments[3];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );
    data.attributes[name] = updater(data.attributes[name]);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributeRemover(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    delete data.attributes[name];
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "remove",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributesReplacer(Class, method, type) {
  Class.prototype[method] = function(element, attributes) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + attributes;
      attributes = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    data.attributes = attributes;
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "replace",
      attributes: data.attributes
    });
    return this;
  };
}
function attachEdgeAttributesMerger(Class, method, type) {
  Class.prototype[method] = function(element, attributes) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + attributes;
      attributes = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    assign(data.attributes, attributes);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "merge",
      attributes: data.attributes,
      data: attributes
    });
    return this;
  };
}
function attachEdgeAttributesUpdater(Class, method, type) {
  Class.prototype[method] = function(element, updater) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + updater;
      updater = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );
    data.attributes = updater(data.attributes);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "update",
      attributes: data.attributes
    });
    return this;
  };
}
var EDGE_ATTRIBUTES_METHODS = [
  {
    name: (element) => `get${element}Attribute`,
    attacher: attachEdgeAttributeGetter
  },
  {
    name: (element) => `get${element}Attributes`,
    attacher: attachEdgeAttributesGetter
  },
  {
    name: (element) => `has${element}Attribute`,
    attacher: attachEdgeAttributeChecker
  },
  {
    name: (element) => `set${element}Attribute`,
    attacher: attachEdgeAttributeSetter
  },
  {
    name: (element) => `update${element}Attribute`,
    attacher: attachEdgeAttributeUpdater
  },
  {
    name: (element) => `remove${element}Attribute`,
    attacher: attachEdgeAttributeRemover
  },
  {
    name: (element) => `replace${element}Attributes`,
    attacher: attachEdgeAttributesReplacer
  },
  {
    name: (element) => `merge${element}Attributes`,
    attacher: attachEdgeAttributesMerger
  },
  {
    name: (element) => `update${element}Attributes`,
    attacher: attachEdgeAttributesUpdater
  }
];
function attachEdgeAttributesMethods(Graph2) {
  EDGE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
    attacher(Graph2, name("Edge"), "mixed");
    attacher(Graph2, name("DirectedEdge"), "directed");
    attacher(Graph2, name("UndirectedEdge"), "undirected");
  });
}
var EDGES_ITERATION = [
  {
    name: "edges",
    type: "mixed"
  },
  {
    name: "inEdges",
    type: "directed",
    direction: "in"
  },
  {
    name: "outEdges",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundEdges",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundEdges",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedEdges",
    type: "directed"
  },
  {
    name: "undirectedEdges",
    type: "undirected"
  }
];
function forEachSimple(breakable, object, callback, avoid) {
  let shouldBreak = false;
  for (const k in object) {
    if (k === avoid) continue;
    const edgeData = object[k];
    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );
    if (breakable && shouldBreak) return edgeData.key;
  }
  return;
}
function forEachMulti(breakable, object, callback, avoid) {
  let edgeData, source, target;
  let shouldBreak = false;
  for (const k in object) {
    if (k === avoid) continue;
    edgeData = object[k];
    do {
      source = edgeData.source;
      target = edgeData.target;
      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        source.key,
        target.key,
        source.attributes,
        target.attributes,
        edgeData.undirected
      );
      if (breakable && shouldBreak) return edgeData.key;
      edgeData = edgeData.next;
    } while (edgeData !== void 0);
  }
  return;
}
function createIterator(object, avoid) {
  const keys = Object.keys(object);
  const l = keys.length;
  let edgeData;
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      do {
        if (!edgeData) {
          if (i >= l) return { done: true };
          const k = keys[i++];
          if (k === avoid) {
            edgeData = void 0;
            continue;
          }
          edgeData = object[k];
        } else {
          edgeData = edgeData.next;
        }
      } while (!edgeData);
      return {
        done: false,
        value: {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        }
      };
    }
  };
}
function forEachForKeySimple(breakable, object, k, callback) {
  const edgeData = object[k];
  if (!edgeData) return;
  const sourceData = edgeData.source;
  const targetData = edgeData.target;
  if (callback(
    edgeData.key,
    edgeData.attributes,
    sourceData.key,
    targetData.key,
    sourceData.attributes,
    targetData.attributes,
    edgeData.undirected
  ) && breakable)
    return edgeData.key;
}
function forEachForKeyMulti(breakable, object, k, callback) {
  let edgeData = object[k];
  if (!edgeData) return;
  let shouldBreak = false;
  do {
    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );
    if (breakable && shouldBreak) return edgeData.key;
    edgeData = edgeData.next;
  } while (edgeData !== void 0);
  return;
}
function createIteratorForKey(object, k) {
  let edgeData = object[k];
  if (edgeData.next !== void 0) {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!edgeData) return { done: true };
        const value = {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        };
        edgeData = edgeData.next;
        return {
          done: false,
          value
        };
      }
    };
  }
  let done = false;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (done === true) return { done: true };
      done = true;
      return {
        done: false,
        value: {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        }
      };
    }
  };
}
function createEdgeArray(graph, type) {
  if (graph.size === 0) return [];
  if (type === "mixed" || type === graph.type) {
    return Array.from(graph._edges.keys());
  }
  const size = type === "undirected" ? graph.undirectedSize : graph.directedSize;
  const list = new Array(size), mask = type === "undirected";
  const iterator = graph._edges.values();
  let i = 0;
  let step, data;
  while (step = iterator.next(), step.done !== true) {
    data = step.value;
    if (data.undirected === mask) list[i++] = data.key;
  }
  return list;
}
function forEachEdge(breakable, graph, type, callback) {
  if (graph.size === 0) return;
  const shouldFilter = type !== "mixed" && type !== graph.type;
  const mask = type === "undirected";
  let step, data;
  let shouldBreak = false;
  const iterator = graph._edges.values();
  while (step = iterator.next(), step.done !== true) {
    data = step.value;
    if (shouldFilter && data.undirected !== mask) continue;
    const { key, attributes, source, target } = data;
    shouldBreak = callback(
      key,
      attributes,
      source.key,
      target.key,
      source.attributes,
      target.attributes,
      data.undirected
    );
    if (breakable && shouldBreak) return key;
  }
  return;
}
function createEdgeIterator(graph, type) {
  if (graph.size === 0) return emptyIterator();
  const shouldFilter = type !== "mixed" && type !== graph.type;
  const mask = type === "undirected";
  const iterator = graph._edges.values();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let step, data;
      while (true) {
        step = iterator.next();
        if (step.done) return step;
        data = step.value;
        if (shouldFilter && data.undirected !== mask) continue;
        break;
      }
      const value = {
        edge: data.key,
        attributes: data.attributes,
        source: data.source.key,
        target: data.target.key,
        sourceAttributes: data.source.attributes,
        targetAttributes: data.target.attributes,
        undirected: data.undirected
      };
      return { value, done: false };
    }
  };
}
function forEachEdgeForNode(breakable, multi, type, direction, nodeData, callback) {
  const fn = multi ? forEachMulti : forEachSimple;
  let found;
  if (type !== "undirected") {
    if (direction !== "out") {
      found = fn(breakable, nodeData.in, callback);
      if (breakable && found) return found;
    }
    if (direction !== "in") {
      found = fn(
        breakable,
        nodeData.out,
        callback,
        !direction ? nodeData.key : void 0
      );
      if (breakable && found) return found;
    }
  }
  if (type !== "directed") {
    found = fn(breakable, nodeData.undirected, callback);
    if (breakable && found) return found;
  }
  return;
}
function createEdgeArrayForNode(multi, type, direction, nodeData) {
  const edges = [];
  forEachEdgeForNode(false, multi, type, direction, nodeData, function(key) {
    edges.push(key);
  });
  return edges;
}
function createEdgeIteratorForNode(type, direction, nodeData) {
  let iterator = emptyIterator();
  if (type !== "undirected") {
    if (direction !== "out" && typeof nodeData.in !== "undefined")
      iterator = chain(iterator, createIterator(nodeData.in));
    if (direction !== "in" && typeof nodeData.out !== "undefined")
      iterator = chain(
        iterator,
        createIterator(nodeData.out, !direction ? nodeData.key : void 0)
      );
  }
  if (type !== "directed" && typeof nodeData.undirected !== "undefined") {
    iterator = chain(iterator, createIterator(nodeData.undirected));
  }
  return iterator;
}
function forEachEdgeForPath(breakable, type, multi, direction, sourceData, target, callback) {
  const fn = multi ? forEachForKeyMulti : forEachForKeySimple;
  let found;
  if (type !== "undirected") {
    if (typeof sourceData.in !== "undefined" && direction !== "out") {
      found = fn(breakable, sourceData.in, target, callback);
      if (breakable && found) return found;
    }
    if (typeof sourceData.out !== "undefined" && direction !== "in" && (direction || sourceData.key !== target)) {
      found = fn(breakable, sourceData.out, target, callback);
      if (breakable && found) return found;
    }
  }
  if (type !== "directed") {
    if (typeof sourceData.undirected !== "undefined") {
      found = fn(breakable, sourceData.undirected, target, callback);
      if (breakable && found) return found;
    }
  }
  return;
}
function createEdgeArrayForPath(type, multi, direction, sourceData, target) {
  const edges = [];
  forEachEdgeForPath(
    false,
    type,
    multi,
    direction,
    sourceData,
    target,
    function(key) {
      edges.push(key);
    }
  );
  return edges;
}
function createEdgeIteratorForPath(type, direction, sourceData, target) {
  let iterator = emptyIterator();
  if (type !== "undirected") {
    if (typeof sourceData.in !== "undefined" && direction !== "out" && target in sourceData.in)
      iterator = chain(iterator, createIteratorForKey(sourceData.in, target));
    if (typeof sourceData.out !== "undefined" && direction !== "in" && target in sourceData.out && (direction || sourceData.key !== target))
      iterator = chain(iterator, createIteratorForKey(sourceData.out, target));
  }
  if (type !== "directed") {
    if (typeof sourceData.undirected !== "undefined" && target in sourceData.undirected)
      iterator = chain(
        iterator,
        createIteratorForKey(sourceData.undirected, target)
      );
  }
  return iterator;
}
function attachEdgeArrayCreator(Class, description) {
  const { name, type, direction } = description;
  Class.prototype[name] = function(source, target) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return [];
    if (!arguments.length) return createEdgeArray(this, type);
    if (arguments.length === 1) {
      source = "" + source;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );
      return createEdgeArrayForNode(
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData
      );
    }
    if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );
      return createEdgeArrayForPath(
        type,
        this.multi,
        direction,
        sourceData,
        target
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function attachForEachEdge(Class, description) {
  const { name, type, direction } = description;
  const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[forEachName] = function(source, target, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(false, this, type, callback);
    }
    if (arguments.length === 2) {
      source = "" + source;
      callback = target;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${forEachName}: could not find the "${source}" node in the graph.`
        );
      return forEachEdgeForNode(
        false,
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }
    if (arguments.length === 3) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${target}" target node in the graph.`
        );
      return forEachEdgeForPath(
        false,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${forEachName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const mapName = "map" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[mapName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    let result;
    if (args.length === 0) {
      let length = 0;
      if (type !== "directed") length += this.undirectedSize;
      if (type !== "undirected") length += this.directedSize;
      result = new Array(length);
      let i = 0;
      args.push((e, ea, s, t, sa, ta, u) => {
        result[i++] = callback(e, ea, s, t, sa, ta, u);
      });
    } else {
      result = [];
      args.push((e, ea, s, t, sa, ta, u) => {
        result.push(callback(e, ea, s, t, sa, ta, u));
      });
    }
    this[forEachName].apply(this, args);
    return result;
  };
  const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[filterName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    const result = [];
    args.push((e, ea, s, t, sa, ta, u) => {
      if (callback(e, ea, s, t, sa, ta, u)) result.push(e);
    });
    this[forEachName].apply(this, args);
    return result;
  };
  const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[reduceName] = function() {
    let args = Array.prototype.slice.call(arguments);
    if (args.length < 2 || args.length > 4) {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: invalid number of arguments (expecting 2, 3 or 4 and got ${args.length}).`
      );
    }
    if (typeof args[args.length - 1] === "function" && typeof args[args.length - 2] !== "function") {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    }
    let callback;
    let initialValue;
    if (args.length === 2) {
      callback = args[0];
      initialValue = args[1];
      args = [];
    } else if (args.length === 3) {
      callback = args[1];
      initialValue = args[2];
      args = [args[0]];
    } else if (args.length === 4) {
      callback = args[2];
      initialValue = args[3];
      args = [args[0], args[1]];
    }
    let accumulator = initialValue;
    args.push((e, ea, s, t, sa, ta, u) => {
      accumulator = callback(accumulator, e, ea, s, t, sa, ta, u);
    });
    this[forEachName].apply(this, args);
    return accumulator;
  };
}
function attachFindEdge(Class, description) {
  const { name, type, direction } = description;
  const findEdgeName = "find" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[findEdgeName] = function(source, target, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return false;
    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(true, this, type, callback);
    }
    if (arguments.length === 2) {
      source = "" + source;
      callback = target;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}: could not find the "${source}" node in the graph.`
        );
      return forEachEdgeForNode(
        true,
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }
    if (arguments.length === 3) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${target}" target node in the graph.`
        );
      return forEachEdgeForPath(
        true,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${findEdgeName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const someName = "some" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[someName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    args.push((e, ea, s, t, sa, ta, u) => {
      return callback(e, ea, s, t, sa, ta, u);
    });
    const found = this[findEdgeName].apply(this, args);
    if (found) return true;
    return false;
  };
  const everyName = "every" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[everyName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    args.push((e, ea, s, t, sa, ta, u) => {
      return !callback(e, ea, s, t, sa, ta, u);
    });
    const found = this[findEdgeName].apply(this, args);
    if (found) return false;
    return true;
  };
}
function attachEdgeIteratorCreator(Class, description) {
  const { name: originalName, type, direction } = description;
  const name = originalName.slice(0, -1) + "Entries";
  Class.prototype[name] = function(source, target) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return emptyIterator();
    if (!arguments.length) return createEdgeIterator(this, type);
    if (arguments.length === 1) {
      source = "" + source;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );
      return createEdgeIteratorForNode(type, direction, sourceData);
    }
    if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );
      return createEdgeIteratorForPath(type, direction, sourceData, target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function attachEdgeIterationMethods(Graph2) {
  EDGES_ITERATION.forEach((description) => {
    attachEdgeArrayCreator(Graph2, description);
    attachForEachEdge(Graph2, description);
    attachFindEdge(Graph2, description);
    attachEdgeIteratorCreator(Graph2, description);
  });
}
var NEIGHBORS_ITERATION = [
  {
    name: "neighbors",
    type: "mixed"
  },
  {
    name: "inNeighbors",
    type: "directed",
    direction: "in"
  },
  {
    name: "outNeighbors",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundNeighbors",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundNeighbors",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedNeighbors",
    type: "directed"
  },
  {
    name: "undirectedNeighbors",
    type: "undirected"
  }
];
function CompositeSetWrapper() {
  this.A = null;
  this.B = null;
}
CompositeSetWrapper.prototype.wrap = function(set) {
  if (this.A === null) this.A = set;
  else if (this.B === null) this.B = set;
};
CompositeSetWrapper.prototype.has = function(key) {
  if (this.A !== null && key in this.A) return true;
  if (this.B !== null && key in this.B) return true;
  return false;
};
function forEachInObjectOnce(breakable, visited, nodeData, object, callback) {
  for (const k in object) {
    const edgeData = object[k];
    const sourceData = edgeData.source;
    const targetData = edgeData.target;
    const neighborData = sourceData === nodeData ? targetData : sourceData;
    if (visited && visited.has(neighborData.key)) continue;
    const shouldBreak = callback(neighborData.key, neighborData.attributes);
    if (breakable && shouldBreak) return neighborData.key;
  }
  return;
}
function forEachNeighbor(breakable, type, direction, nodeData, callback) {
  if (type !== "mixed") {
    if (type === "undirected")
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.undirected,
        callback
      );
    if (typeof direction === "string")
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData[direction],
        callback
      );
  }
  const visited = new CompositeSetWrapper();
  let found;
  if (type !== "undirected") {
    if (direction !== "out") {
      found = forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.in,
        callback
      );
      if (breakable && found) return found;
      visited.wrap(nodeData.in);
    }
    if (direction !== "in") {
      found = forEachInObjectOnce(
        breakable,
        visited,
        nodeData,
        nodeData.out,
        callback
      );
      if (breakable && found) return found;
      visited.wrap(nodeData.out);
    }
  }
  if (type !== "directed") {
    found = forEachInObjectOnce(
      breakable,
      visited,
      nodeData,
      nodeData.undirected,
      callback
    );
    if (breakable && found) return found;
  }
  return;
}
function createNeighborArrayForNode(type, direction, nodeData) {
  if (type !== "mixed") {
    if (type === "undirected") return Object.keys(nodeData.undirected);
    if (typeof direction === "string") return Object.keys(nodeData[direction]);
  }
  const neighbors = [];
  forEachNeighbor(false, type, direction, nodeData, function(key) {
    neighbors.push(key);
  });
  return neighbors;
}
function createDedupedObjectIterator(visited, nodeData, object) {
  const keys = Object.keys(object);
  const l = keys.length;
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let neighborData = null;
      do {
        if (i >= l) {
          if (visited) visited.wrap(object);
          return { done: true };
        }
        const edgeData = object[keys[i++]];
        const sourceData = edgeData.source;
        const targetData = edgeData.target;
        neighborData = sourceData === nodeData ? targetData : sourceData;
        if (visited && visited.has(neighborData.key)) {
          neighborData = null;
          continue;
        }
      } while (neighborData === null);
      return {
        done: false,
        value: { neighbor: neighborData.key, attributes: neighborData.attributes }
      };
    }
  };
}
function createNeighborIterator(type, direction, nodeData) {
  if (type !== "mixed") {
    if (type === "undirected")
      return createDedupedObjectIterator(null, nodeData, nodeData.undirected);
    if (typeof direction === "string")
      return createDedupedObjectIterator(null, nodeData, nodeData[direction]);
  }
  let iterator = emptyIterator();
  const visited = new CompositeSetWrapper();
  if (type !== "undirected") {
    if (direction !== "out") {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.in)
      );
    }
    if (direction !== "in") {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.out)
      );
    }
  }
  if (type !== "directed") {
    iterator = chain(
      iterator,
      createDedupedObjectIterator(visited, nodeData, nodeData.undirected)
    );
  }
  return iterator;
}
function attachNeighborArrayCreator(Class, description) {
  const { name, type, direction } = description;
  Class.prototype[name] = function(node) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return [];
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${name}: could not find the "${node}" node in the graph.`
      );
    return createNeighborArrayForNode(
      type === "mixed" ? this.type : type,
      direction,
      nodeData
    );
  };
}
function attachForEachNeighbor(Class, description) {
  const { name, type, direction } = description;
  const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[forEachName] = function(node, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${forEachName}: could not find the "${node}" node in the graph.`
      );
    forEachNeighbor(
      false,
      type === "mixed" ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
  const mapName = "map" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[mapName] = function(node, callback) {
    const result = [];
    this[forEachName](node, (n, a) => {
      result.push(callback(n, a));
    });
    return result;
  };
  const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[filterName] = function(node, callback) {
    const result = [];
    this[forEachName](node, (n, a) => {
      if (callback(n, a)) result.push(n);
    });
    return result;
  };
  const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[reduceName] = function(node, callback, initialValue) {
    if (arguments.length < 3)
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let accumulator = initialValue;
    this[forEachName](node, (n, a) => {
      accumulator = callback(accumulator, n, a);
    });
    return accumulator;
  };
}
function attachFindNeighbor(Class, description) {
  const { name, type, direction } = description;
  const capitalizedSingular = name[0].toUpperCase() + name.slice(1, -1);
  const findName = "find" + capitalizedSingular;
  Class.prototype[findName] = function(node, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${findName}: could not find the "${node}" node in the graph.`
      );
    return forEachNeighbor(
      true,
      type === "mixed" ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
  const someName = "some" + capitalizedSingular;
  Class.prototype[someName] = function(node, callback) {
    const found = this[findName](node, callback);
    if (found) return true;
    return false;
  };
  const everyName = "every" + capitalizedSingular;
  Class.prototype[everyName] = function(node, callback) {
    const found = this[findName](node, (n, a) => {
      return !callback(n, a);
    });
    if (found) return false;
    return true;
  };
}
function attachNeighborIteratorCreator(Class, description) {
  const { name, type, direction } = description;
  const iteratorName = name.slice(0, -1) + "Entries";
  Class.prototype[iteratorName] = function(node) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return emptyIterator();
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${iteratorName}: could not find the "${node}" node in the graph.`
      );
    return createNeighborIterator(
      type === "mixed" ? this.type : type,
      direction,
      nodeData
    );
  };
}
function attachNeighborIterationMethods(Graph2) {
  NEIGHBORS_ITERATION.forEach((description) => {
    attachNeighborArrayCreator(Graph2, description);
    attachForEachNeighbor(Graph2, description);
    attachFindNeighbor(Graph2, description);
    attachNeighborIteratorCreator(Graph2, description);
  });
}
function forEachAdjacency(breakable, assymetric, disconnectedNodes, graph, callback) {
  const iterator = graph._nodes.values();
  const type = graph.type;
  let step, sourceData, neighbor, adj, edgeData, targetData, shouldBreak;
  while (step = iterator.next(), step.done !== true) {
    let hasEdges = false;
    sourceData = step.value;
    if (type !== "undirected") {
      adj = sourceData.out;
      for (neighbor in adj) {
        edgeData = adj[neighbor];
        do {
          targetData = edgeData.target;
          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );
          if (breakable && shouldBreak) return edgeData;
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (type !== "directed") {
      adj = sourceData.undirected;
      for (neighbor in adj) {
        if (assymetric && sourceData.key > neighbor) continue;
        edgeData = adj[neighbor];
        do {
          targetData = edgeData.target;
          if (targetData.key !== neighbor) targetData = edgeData.source;
          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );
          if (breakable && shouldBreak) return edgeData;
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (disconnectedNodes && !hasEdges) {
      shouldBreak = callback(
        sourceData.key,
        null,
        sourceData.attributes,
        null,
        null,
        null,
        null
      );
      if (breakable && shouldBreak) return null;
    }
  }
  return;
}
function serializeNode(key, data) {
  const serialized = { key };
  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);
  return serialized;
}
function serializeEdge(type, key, data) {
  const serialized = {
    key,
    source: data.source.key,
    target: data.target.key
  };
  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);
  if (type === "mixed" && data.undirected) serialized.undirected = true;
  return serialized;
}
function validateSerializedNode(value) {
  if (!isPlainObject(value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
    );
  if (!("key" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized node is missing its key."
    );
  if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
}
function validateSerializedEdge(value) {
  if (!isPlainObject(value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
    );
  if (!("source" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized edge is missing its source."
    );
  if (!("target" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized edge is missing its target."
    );
  if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
  if ("undirected" in value && typeof value.undirected !== "boolean")
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid undirectedness information. Undirected should be boolean or omitted."
    );
}
var INSTANCE_ID = incrementalIdStartingFromRandomByte();
var TYPES = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]);
var EMITTER_PROPS = /* @__PURE__ */ new Set([
  "domain",
  "_events",
  "_eventsCount",
  "_maxListeners"
]);
var EDGE_ADD_METHODS = [
  {
    name: (verb) => `${verb}Edge`,
    generateKey: true
  },
  {
    name: (verb) => `${verb}DirectedEdge`,
    generateKey: true,
    type: "directed"
  },
  {
    name: (verb) => `${verb}UndirectedEdge`,
    generateKey: true,
    type: "undirected"
  },
  {
    name: (verb) => `${verb}EdgeWithKey`
  },
  {
    name: (verb) => `${verb}DirectedEdgeWithKey`,
    type: "directed"
  },
  {
    name: (verb) => `${verb}UndirectedEdgeWithKey`,
    type: "undirected"
  }
];
var DEFAULTS = {
  allowSelfLoops: true,
  multi: false,
  type: "mixed"
};
function addNode(graph, node, attributes) {
  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(
      `Graph.addNode: invalid attributes. Expecting an object but got "${attributes}"`
    );
  node = "" + node;
  attributes = attributes || {};
  if (graph._nodes.has(node))
    throw new UsageGraphError(
      `Graph.addNode: the "${node}" node already exist in the graph.`
    );
  const data = new graph.NodeDataClass(node, attributes);
  graph._nodes.set(node, data);
  graph.emit("nodeAdded", {
    key: node,
    attributes
  });
  return data;
}
function unsafeAddNode(graph, node, attributes) {
  const data = new graph.NodeDataClass(node, attributes);
  graph._nodes.set(node, data);
  graph.emit("nodeAdded", {
    key: node,
    attributes
  });
  return data;
}
function addEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes) {
  if (!undirected && graph.type === "undirected")
    throw new UsageGraphError(
      `Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
    );
  if (undirected && graph.type === "directed")
    throw new UsageGraphError(
      `Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
    );
  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
    );
  source = "" + source;
  target = "" + target;
  attributes = attributes || {};
  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  const sourceData = graph._nodes.get(source), targetData = graph._nodes.get(target);
  if (!sourceData)
    throw new NotFoundGraphError(
      `Graph.${name}: source node "${source}" not found.`
    );
  if (!targetData)
    throw new NotFoundGraphError(
      `Graph.${name}: target node "${target}" not found.`
    );
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };
  if (mustGenerateKey) {
    edge = graph._edgeKeyGenerator();
  } else {
    edge = "" + edge;
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }
  if (!graph.multi && (undirected ? typeof sourceData.undirected[target] !== "undefined" : typeof sourceData.out[target] !== "undefined")) {
    throw new UsageGraphError(
      `Graph.${name}: an edge linking "${source}" to "${target}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
    );
  }
  const edgeData = new EdgeData(
    undirected,
    edge,
    sourceData,
    targetData,
    attributes
  );
  graph._edges.set(edge, edgeData);
  const isSelfLoop = source === target;
  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;
    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;
    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();
  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;
  eventData.key = edge;
  graph.emit("edgeAdded", eventData);
  return edge;
}
function mergeEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes, asUpdater) {
  if (!undirected && graph.type === "undirected")
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
    );
  if (undirected && graph.type === "directed")
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
    );
  if (attributes) {
    if (asUpdater) {
      if (typeof attributes !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid updater function. Expecting a function but got "${attributes}"`
        );
    } else {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
        );
    }
  }
  source = "" + source;
  target = "" + target;
  let updater;
  if (asUpdater) {
    updater = attributes;
    attributes = void 0;
  }
  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  let sourceData = graph._nodes.get(source);
  let targetData = graph._nodes.get(target);
  let edgeData;
  let alreadyExistingEdgeData;
  if (!mustGenerateKey) {
    edgeData = graph._edges.get(edge);
    if (edgeData) {
      if (edgeData.source.key !== source || edgeData.target.key !== target) {
        if (!undirected || edgeData.source.key !== target || edgeData.target.key !== source) {
          throw new UsageGraphError(
            `Graph.${name}: inconsistency detected when attempting to merge the "${edge}" edge with "${source}" source & "${target}" target vs. ("${edgeData.source.key}", "${edgeData.target.key}").`
          );
        }
      }
      alreadyExistingEdgeData = edgeData;
    }
  }
  if (!alreadyExistingEdgeData && !graph.multi && sourceData) {
    alreadyExistingEdgeData = undirected ? sourceData.undirected[target] : sourceData.out[target];
  }
  if (alreadyExistingEdgeData) {
    const info = [alreadyExistingEdgeData.key, false, false, false];
    if (asUpdater ? !updater : !attributes) return info;
    if (asUpdater) {
      const oldAttributes = alreadyExistingEdgeData.attributes;
      alreadyExistingEdgeData.attributes = updater(oldAttributes);
      graph.emit("edgeAttributesUpdated", {
        type: "replace",
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes
      });
    } else {
      assign(alreadyExistingEdgeData.attributes, attributes);
      graph.emit("edgeAttributesUpdated", {
        type: "merge",
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes,
        data: attributes
      });
    }
    return info;
  }
  attributes = attributes || {};
  if (asUpdater && updater) attributes = updater(attributes);
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };
  if (mustGenerateKey) {
    edge = graph._edgeKeyGenerator();
  } else {
    edge = "" + edge;
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }
  let sourceWasAdded = false;
  let targetWasAdded = false;
  if (!sourceData) {
    sourceData = unsafeAddNode(graph, source, {});
    sourceWasAdded = true;
    if (source === target) {
      targetData = sourceData;
      targetWasAdded = true;
    }
  }
  if (!targetData) {
    targetData = unsafeAddNode(graph, target, {});
    targetWasAdded = true;
  }
  edgeData = new EdgeData(undirected, edge, sourceData, targetData, attributes);
  graph._edges.set(edge, edgeData);
  const isSelfLoop = source === target;
  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;
    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;
    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();
  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;
  eventData.key = edge;
  graph.emit("edgeAdded", eventData);
  return [edge, true, sourceWasAdded, targetWasAdded];
}
function dropEdgeFromData(graph, edgeData) {
  graph._edges.delete(edgeData.key);
  const { source: sourceData, target: targetData, attributes } = edgeData;
  const undirected = edgeData.undirected;
  const isSelfLoop = sourceData === targetData;
  if (undirected) {
    sourceData.undirectedDegree--;
    targetData.undirectedDegree--;
    if (isSelfLoop) {
      sourceData.undirectedLoops--;
      graph._undirectedSelfLoopCount--;
    }
  } else {
    sourceData.outDegree--;
    targetData.inDegree--;
    if (isSelfLoop) {
      sourceData.directedLoops--;
      graph._directedSelfLoopCount--;
    }
  }
  if (graph.multi) edgeData.detachMulti();
  else edgeData.detach();
  if (undirected) graph._undirectedSize--;
  else graph._directedSize--;
  graph.emit("edgeDropped", {
    key: edgeData.key,
    attributes,
    source: sourceData.key,
    target: targetData.key,
    undirected
  });
}
var Graph = class _Graph extends import_events.EventEmitter {
  constructor(options) {
    super();
    options = assign({}, DEFAULTS, options);
    if (typeof options.multi !== "boolean")
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${options.multi}".`
      );
    if (!TYPES.has(options.type))
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${options.type}".`
      );
    if (typeof options.allowSelfLoops !== "boolean")
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${options.allowSelfLoops}".`
      );
    const NodeDataClass = options.type === "mixed" ? MixedNodeData : options.type === "directed" ? DirectedNodeData : UndirectedNodeData;
    privateProperty(this, "NodeDataClass", NodeDataClass);
    const instancePrefix = "geid_" + INSTANCE_ID() + "_";
    let edgeId = 0;
    const edgeKeyGenerator = () => {
      let availableEdgeKey;
      do {
        availableEdgeKey = instancePrefix + edgeId++;
      } while (this._edges.has(availableEdgeKey));
      return availableEdgeKey;
    };
    privateProperty(this, "_attributes", {});
    privateProperty(this, "_nodes", /* @__PURE__ */ new Map());
    privateProperty(this, "_edges", /* @__PURE__ */ new Map());
    privateProperty(this, "_directedSize", 0);
    privateProperty(this, "_undirectedSize", 0);
    privateProperty(this, "_directedSelfLoopCount", 0);
    privateProperty(this, "_undirectedSelfLoopCount", 0);
    privateProperty(this, "_edgeKeyGenerator", edgeKeyGenerator);
    privateProperty(this, "_options", options);
    EMITTER_PROPS.forEach((prop) => privateProperty(this, prop, this[prop]));
    readOnlyProperty(this, "order", () => this._nodes.size);
    readOnlyProperty(this, "size", () => this._edges.size);
    readOnlyProperty(this, "directedSize", () => this._directedSize);
    readOnlyProperty(this, "undirectedSize", () => this._undirectedSize);
    readOnlyProperty(
      this,
      "selfLoopCount",
      () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
    );
    readOnlyProperty(
      this,
      "directedSelfLoopCount",
      () => this._directedSelfLoopCount
    );
    readOnlyProperty(
      this,
      "undirectedSelfLoopCount",
      () => this._undirectedSelfLoopCount
    );
    readOnlyProperty(this, "multi", this._options.multi);
    readOnlyProperty(this, "type", this._options.type);
    readOnlyProperty(this, "allowSelfLoops", this._options.allowSelfLoops);
    readOnlyProperty(this, "implementation", () => "graphology");
  }
  _resetInstanceCounters() {
    this._directedSize = 0;
    this._undirectedSize = 0;
    this._directedSelfLoopCount = 0;
    this._undirectedSelfLoopCount = 0;
  }
  /**---------------------------------------------------------------------------
   * Read
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning whether the given node is found in the graph.
   *
   * @param  {any}     node - The node.
   * @return {boolean}
   */
  hasNode(node) {
    return this._nodes.has("" + node);
  }
  /**
   * Method returning whether the given directed edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasDirectedEdge(source, target) {
    if (this.type === "undirected") return false;
    if (arguments.length === 1) {
      const edge = "" + source;
      const edgeData = this._edges.get(edge);
      return !!edgeData && !edgeData.undirected;
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return nodeData.out.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given undirected edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasUndirectedEdge(source, target) {
    if (this.type === "directed") return false;
    if (arguments.length === 1) {
      const edge = "" + source;
      const edgeData = this._edges.get(edge);
      return !!edgeData && edgeData.undirected;
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return nodeData.undirected.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasEdge(source, target) {
    if (arguments.length === 1) {
      const edge = "" + source;
      return this._edges.has(edge);
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return typeof nodeData.out !== "undefined" && nodeData.out.hasOwnProperty(target) || typeof nodeData.undirected !== "undefined" && nodeData.undirected.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning the edge matching source & target in a directed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  directedEdge(source, target) {
    if (this.type === "undirected") return;
    source = "" + source;
    target = "" + target;
    if (this.multi)
      throw new UsageGraphError(
        "Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead."
      );
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.out && sourceData.out[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning the edge matching source & target in a undirected fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  undirectedEdge(source, target) {
    if (this.type === "directed") return;
    source = "" + source;
    target = "" + target;
    if (this.multi)
      throw new UsageGraphError(
        "Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead."
      );
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.undirected && sourceData.undirected[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning the edge matching source & target in a mixed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  edge(source, target) {
    if (this.multi)
      throw new UsageGraphError(
        "Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead."
      );
    source = "" + source;
    target = "" + target;
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning whether two nodes are directed neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areDirectedNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areDirectedNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.in || neighbor in nodeData.out;
  }
  /**
   * Method returning whether two nodes are out neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.out;
  }
  /**
   * Method returning whether two nodes are in neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.in;
  }
  /**
   * Method returning whether two nodes are undirected neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areUndirectedNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areUndirectedNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return false;
    return neighbor in nodeData.undirected;
  }
  /**
   * Method returning whether two nodes are neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.in || neighbor in nodeData.out) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning whether two nodes are inbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInboundNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInboundNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.in) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning whether two nodes are outbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutboundNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutboundNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.out) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree;
  }
  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.outDegree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree + nodeData.outDegree;
  }
  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return 0;
    return nodeData.undirectedDegree;
  }
  /**
   * Method returning the given node's inbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's outbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.outDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree + nodeData.outDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's in degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree - nodeData.directedLoops;
  }
  /**
   * Method returning the given node's out degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.outDegree - nodeData.directedLoops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree + nodeData.outDegree - nodeData.directedLoops * 2;
  }
  /**
   * Method returning the given node's undirected degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return 0;
    return nodeData.undirectedDegree - nodeData.undirectedLoops * 2;
  }
  /**
   * Method returning the given node's inbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree;
      loops += nodeData.directedLoops;
    }
    return degree - loops;
  }
  /**
   * Method returning the given node's outbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.outDegree;
      loops += nodeData.directedLoops;
    }
    return degree - loops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree + nodeData.outDegree;
      loops += nodeData.directedLoops * 2;
    }
    return degree - loops;
  }
  /**
   * Method returning the given edge's source.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's source.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  source(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.source: could not find the "${edge}" edge in the graph.`
      );
    return data.source.key;
  }
  /**
   * Method returning the given edge's target.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's target.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  target(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.target: could not find the "${edge}" edge in the graph.`
      );
    return data.target.key;
  }
  /**
   * Method returning the given edge's extremities.
   *
   * @param  {any}   edge - The edge's key.
   * @return {array}      - The edge's extremities.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  extremities(edge) {
    edge = "" + edge;
    const edgeData = this._edges.get(edge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.extremities: could not find the "${edge}" edge in the graph.`
      );
    return [edgeData.source.key, edgeData.target.key];
  }
  /**
   * Given a node & an edge, returns the other extremity of the edge.
   *
   * @param  {any}   node - The node's key.
   * @param  {any}   edge - The edge's key.
   * @return {any}        - The related node.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph or if the
   *                   edge & node are not related.
   */
  opposite(node, edge) {
    node = "" + node;
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.opposite: could not find the "${edge}" edge in the graph.`
      );
    const source = data.source.key;
    const target = data.target.key;
    if (node === source) return target;
    if (node === target) return source;
    throw new NotFoundGraphError(
      `Graph.opposite: the "${node}" node is not attached to the "${edge}" edge (${source}, ${target}).`
    );
  }
  /**
   * Returns whether the given edge has the given node as extremity.
   *
   * @param  {any}     edge - The edge's key.
   * @param  {any}     node - The node's key.
   * @return {boolean}      - The related node.
   *
   * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
   */
  hasExtremity(edge, node) {
    edge = "" + edge;
    node = "" + node;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.hasExtremity: could not find the "${edge}" edge in the graph.`
      );
    return data.source.key === node || data.target.key === node;
  }
  /**
   * Method returning whether the given edge is undirected.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isUndirected(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isUndirected: could not find the "${edge}" edge in the graph.`
      );
    return data.undirected;
  }
  /**
   * Method returning whether the given edge is directed.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isDirected(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isDirected: could not find the "${edge}" edge in the graph.`
      );
    return !data.undirected;
  }
  /**
   * Method returning whether the given edge is a self loop.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isSelfLoop(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isSelfLoop: could not find the "${edge}" edge in the graph.`
      );
    return data.source === data.target;
  }
  /**---------------------------------------------------------------------------
   * Mutation
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to add a node to the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   *
   * @throws {Error} - Will throw if the given node already exist.
   * @throws {Error} - Will throw if the given attributes are not an object.
   */
  addNode(node, attributes) {
    const nodeData = addNode(this, node, attributes);
    return nodeData.key;
  }
  /**
   * Method used to merge a node into the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   */
  mergeNode(node, attributes) {
    if (attributes && !isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.mergeNode: invalid attributes. Expecting an object but got "${attributes}"`
      );
    node = "" + node;
    attributes = attributes || {};
    let data = this._nodes.get(node);
    if (data) {
      if (attributes) {
        assign(data.attributes, attributes);
        this.emit("nodeAttributesUpdated", {
          type: "merge",
          key: node,
          attributes: data.attributes,
          data: attributes
        });
      }
      return [node, false];
    }
    data = new this.NodeDataClass(node, attributes);
    this._nodes.set(node, data);
    this.emit("nodeAdded", {
      key: node,
      attributes
    });
    return [node, true];
  }
  /**
   * Method used to add a node if it does not exist in the graph or else to
   * update its attributes using a function.
   *
   * @param  {any}      node      - The node.
   * @param  {function} [updater] - Optional updater function.
   * @return {any}                - The node.
   */
  updateNode(node, updater) {
    if (updater && typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.updateNode: invalid updater function. Expecting a function but got "${updater}"`
      );
    node = "" + node;
    let data = this._nodes.get(node);
    if (data) {
      if (updater) {
        const oldAttributes = data.attributes;
        data.attributes = updater(oldAttributes);
        this.emit("nodeAttributesUpdated", {
          type: "replace",
          key: node,
          attributes: data.attributes
        });
      }
      return [node, false];
    }
    const attributes = updater ? updater({}) : {};
    data = new this.NodeDataClass(node, attributes);
    this._nodes.set(node, data);
    this.emit("nodeAdded", {
      key: node,
      attributes
    });
    return [node, true];
  }
  /**
   * Method used to drop a single node & all its attached edges from the graph.
   *
   * @param  {any}    node - The node.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node doesn't exist.
   */
  dropNode(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.dropNode: could not find the "${node}" node in the graph.`
      );
    let edgeData;
    if (this.type !== "undirected") {
      for (const neighbor in nodeData.out) {
        edgeData = nodeData.out[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
      for (const neighbor in nodeData.in) {
        edgeData = nodeData.in[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (this.type !== "directed") {
      for (const neighbor in nodeData.undirected) {
        edgeData = nodeData.undirected[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    this._nodes.delete(node);
    this.emit("nodeDropped", {
      key: node,
      attributes: nodeData.attributes
    });
  }
  /**
   * Method used to drop a single edge from the graph.
   *
   * Arity 1:
   * @param  {any}    edge - The edge.
   *
   * Arity 2:
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropEdge(edge) {
    let edgeData;
    if (arguments.length > 1) {
      const source = "" + arguments[0];
      const target = "" + arguments[1];
      edgeData = getMatchingEdge(this, source, target, this.type);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${source}" -> "${target}" edge in the graph.`
        );
    } else {
      edge = "" + edge;
      edgeData = this._edges.get(edge);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${edge}" edge in the graph.`
        );
    }
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to drop a single directed edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropDirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        "Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new UsageGraphError(
        "Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    source = "" + source;
    target = "" + target;
    const edgeData = getMatchingEdge(this, source, target, "directed");
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropDirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to drop a single undirected edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropUndirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        "Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new UsageGraphError(
        "Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    const edgeData = getMatchingEdge(this, source, target, "undirected");
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropUndirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to remove every edge & every node from the graph.
   *
   * @return {Graph}
   */
  clear() {
    this._edges.clear();
    this._nodes.clear();
    this._resetInstanceCounters();
    this.emit("cleared");
  }
  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {
    const iterator = this._nodes.values();
    let step;
    while (step = iterator.next(), step.done !== true) {
      step.value.clear();
    }
    this._edges.clear();
    this._resetInstanceCounters();
    this.emit("edgesCleared");
  }
  /**---------------------------------------------------------------------------
   * Attributes-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning the desired graph's attribute.
   *
   * @param  {string} name - Name of the attribute.
   * @return {any}
   */
  getAttribute(name) {
    return this._attributes[name];
  }
  /**
   * Method returning the graph's attributes.
   *
   * @return {object}
   */
  getAttributes() {
    return this._attributes;
  }
  /**
   * Method returning whether the graph has the desired attribute.
   *
   * @param  {string}  name - Name of the attribute.
   * @return {boolean}
   */
  hasAttribute(name) {
    return this._attributes.hasOwnProperty(name);
  }
  /**
   * Method setting a value for the desired graph's attribute.
   *
   * @param  {string}  name  - Name of the attribute.
   * @param  {any}     value - Value for the attribute.
   * @return {Graph}
   */
  setAttribute(name, value) {
    this._attributes[name] = value;
    this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method using a function to update the desired graph's attribute's value.
   *
   * @param  {string}   name    - Name of the attribute.
   * @param  {function} updater - Function use to update the attribute's value.
   * @return {Graph}
   */
  updateAttribute(name, updater) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateAttribute: updater should be a function."
      );
    const value = this._attributes[name];
    this._attributes[name] = updater(value);
    this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method removing the desired graph's attribute.
   *
   * @param  {string} name  - Name of the attribute.
   * @return {Graph}
   */
  removeAttribute(name) {
    delete this._attributes[name];
    this.emit("attributesUpdated", {
      type: "remove",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method replacing the graph's attributes.
   *
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  replaceAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        "Graph.replaceAttributes: provided attributes are not a plain object."
      );
    this._attributes = attributes;
    this.emit("attributesUpdated", {
      type: "replace",
      attributes: this._attributes
    });
    return this;
  }
  /**
   * Method merging the graph's attributes.
   *
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  mergeAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        "Graph.mergeAttributes: provided attributes are not a plain object."
      );
    assign(this._attributes, attributes);
    this.emit("attributesUpdated", {
      type: "merge",
      attributes: this._attributes,
      data: attributes
    });
    return this;
  }
  /**
   * Method updating the graph's attributes.
   *
   * @param  {function} updater - Function used to update the attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given updater is not a function.
   */
  updateAttributes(updater) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateAttributes: provided updater is not a function."
      );
    this._attributes = updater(this._attributes);
    this.emit("attributesUpdated", {
      type: "update",
      attributes: this._attributes
    });
    return this;
  }
  /**
   * Method used to update each node's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachNodeAttributes(updater, hints) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachNodeAttributes: expecting an updater function."
      );
    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      nodeData.attributes = updater(nodeData.key, nodeData.attributes);
    }
    this.emit("eachNodeAttributesUpdated", {
      hints: hints ? hints : null
    });
  }
  /**
   * Method used to update each edge's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachEdgeAttributes(updater, hints) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachEdgeAttributes: expecting an updater function."
      );
    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const iterator = this._edges.values();
    let step, edgeData, sourceData, targetData;
    while (step = iterator.next(), step.done !== true) {
      edgeData = step.value;
      sourceData = edgeData.source;
      targetData = edgeData.target;
      edgeData.attributes = updater(
        edgeData.key,
        edgeData.attributes,
        sourceData.key,
        targetData.key,
        sourceData.attributes,
        targetData.attributes,
        edgeData.undirected
      );
    }
    this.emit("eachEdgeAttributesUpdated", {
      hints: hints ? hints : null
    });
  }
  /**---------------------------------------------------------------------------
   * Iteration-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method iterating over the graph's adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAdjacencyEntry(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAdjacencyEntry: expecting a callback."
      );
    forEachAdjacency(false, false, false, this, callback);
  }
  forEachAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAdjacencyEntryWithOrphans: expecting a callback."
      );
    forEachAdjacency(false, false, true, this, callback);
  }
  /**
   * Method iterating over the graph's assymetric adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAssymetricAdjacencyEntry(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAssymetricAdjacencyEntry: expecting a callback."
      );
    forEachAdjacency(false, true, false, this, callback);
  }
  forEachAssymetricAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback."
      );
    forEachAdjacency(false, true, true, this, callback);
  }
  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    return Array.from(this._nodes.keys());
  }
  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      callback(nodeData.key, nodeData.attributes);
    }
  }
  /**
   * Method iterating attempting to find a node matching the given predicate
   * function.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  findNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.findNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes)) return nodeData.key;
    }
    return;
  }
  /**
   * Method mapping nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  mapNodes(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.mapNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    const result = new Array(this.order);
    let i = 0;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      result[i++] = callback(nodeData.key, nodeData.attributes);
    }
    return result;
  }
  /**
   * Method returning whether some node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  someNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.someNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes)) return true;
    }
    return false;
  }
  /**
   * Method returning whether all node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  everyNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.everyNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (!callback(nodeData.key, nodeData.attributes)) return false;
    }
    return true;
  }
  /**
   * Method filtering nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  filterNodes(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.filterNodes: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    const result = [];
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes))
        result.push(nodeData.key);
    }
    return result;
  }
  /**
   * Method reducing nodes.
   *
   * @param  {function}  callback - Callback (accumulator, key, attributes).
   */
  reduceNodes(callback, initialValue) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.reduceNodes: expecting a callback."
      );
    if (arguments.length < 2)
      throw new InvalidArgumentsGraphError(
        "Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."
      );
    let accumulator = initialValue;
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      accumulator = callback(accumulator, nodeData.key, nodeData.attributes);
    }
    return accumulator;
  }
  /**
   * Method returning an iterator over the graph's node entries.
   *
   * @return {Iterator}
   */
  nodeEntries() {
    const iterator = this._nodes.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const step = iterator.next();
        if (step.done) return step;
        const data = step.value;
        return {
          value: { node: data.key, attributes: data.attributes },
          done: false
        };
      }
    };
  }
  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to export the whole graph.
   *
   * @return {object} - The serialized graph.
   */
  export() {
    const nodes = new Array(this._nodes.size);
    let i = 0;
    this._nodes.forEach((data, key) => {
      nodes[i++] = serializeNode(key, data);
    });
    const edges = new Array(this._edges.size);
    i = 0;
    this._edges.forEach((data, key) => {
      edges[i++] = serializeEdge(this.type, key, data);
    });
    return {
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      },
      attributes: this.getAttributes(),
      nodes,
      edges
    };
  }
  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(data, merge = false) {
    if (data instanceof _Graph) {
      data.forEachNode((n, a) => {
        if (merge) this.mergeNode(n, a);
        else this.addNode(n, a);
      });
      data.forEachEdge((e, a, s, t, _sa, _ta, u) => {
        if (merge) {
          if (u) this.mergeUndirectedEdgeWithKey(e, s, t, a);
          else this.mergeDirectedEdgeWithKey(e, s, t, a);
        } else {
          if (u) this.addUndirectedEdgeWithKey(e, s, t, a);
          else this.addDirectedEdgeWithKey(e, s, t, a);
        }
      });
      return this;
    }
    if (!isPlainObject(data))
      throw new InvalidArgumentsGraphError(
        "Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance."
      );
    if (data.attributes) {
      if (!isPlainObject(data.attributes))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid attributes. Expecting a plain object."
        );
      if (merge) this.mergeAttributes(data.attributes);
      else this.replaceAttributes(data.attributes);
    }
    let i, l, list, node, edge;
    if (data.nodes) {
      list = data.nodes;
      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid nodes. Expecting an array."
        );
      for (i = 0, l = list.length; i < l; i++) {
        node = list[i];
        validateSerializedNode(node);
        const { key, attributes } = node;
        if (merge) this.mergeNode(key, attributes);
        else this.addNode(key, attributes);
      }
    }
    if (data.edges) {
      let undirectedByDefault = false;
      if (this.type === "undirected") {
        undirectedByDefault = true;
      }
      list = data.edges;
      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid edges. Expecting an array."
        );
      for (i = 0, l = list.length; i < l; i++) {
        edge = list[i];
        validateSerializedEdge(edge);
        const {
          source,
          target,
          attributes,
          undirected = undirectedByDefault
        } = edge;
        let method;
        if ("key" in edge) {
          method = merge ? undirected ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : undirected ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey;
          method.call(this, edge.key, source, target, attributes);
        } else {
          method = merge ? undirected ? this.mergeUndirectedEdge : this.mergeDirectedEdge : undirected ? this.addUndirectedEdge : this.addDirectedEdge;
          method.call(this, source, target, attributes);
        }
      }
    }
    return this;
  }
  /**---------------------------------------------------------------------------
   * Utils
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning a null copy of the graph, i.e. a graph without nodes
   * & edges but with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The null copy.
   */
  nullCopy(options) {
    const graph = new _Graph(assign({}, this._options, options));
    graph.replaceAttributes(assign({}, this.getAttributes()));
    return graph;
  }
  /**
   * Method returning an empty copy of the graph, i.e. a graph without edges but
   * with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The empty copy.
   */
  emptyCopy(options) {
    const graph = this.nullCopy(options);
    this._nodes.forEach((nodeData, key) => {
      const attributes = assign({}, nodeData.attributes);
      nodeData = new graph.NodeDataClass(key, attributes);
      graph._nodes.set(key, nodeData);
    });
    return graph;
  }
  /**
   * Method returning an exact copy of the graph.
   *
   * @param  {object} options - Upgrade options.
   * @return {Graph}          - The copy.
   */
  copy(options) {
    options = options || {};
    if (typeof options.type === "string" && options.type !== this.type && options.type !== "mixed")
      throw new UsageGraphError(
        `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${options.type}" because this would mean losing information about the current graph.`
      );
    if (typeof options.multi === "boolean" && options.multi !== this.multi && options.multi !== true)
      throw new UsageGraphError(
        "Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph."
      );
    if (typeof options.allowSelfLoops === "boolean" && options.allowSelfLoops !== this.allowSelfLoops && options.allowSelfLoops !== true)
      throw new UsageGraphError(
        "Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph."
      );
    const graph = this.emptyCopy(options);
    const iterator = this._edges.values();
    let step, edgeData;
    while (step = iterator.next(), step.done !== true) {
      edgeData = step.value;
      addEdge(
        graph,
        "copy",
        false,
        edgeData.undirected,
        edgeData.key,
        edgeData.source.key,
        edgeData.target.key,
        assign({}, edgeData.attributes)
      );
    }
    return graph;
  }
  /**---------------------------------------------------------------------------
   * Known methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method used by JavaScript to perform JSON serialization.
   *
   * @return {object} - The serialized graph.
   */
  toJSON() {
    return this.export();
  }
  /**
   * Method returning [object Graph].
   */
  toString() {
    return "[object Graph]";
  }
  /**
   * Method used internally by node's console to display a custom object.
   *
   * @return {object} - Formatted object representation of the graph.
   */
  inspect() {
    const nodes = {};
    this._nodes.forEach((data, key) => {
      nodes[key] = data.attributes;
    });
    const edges = {}, multiIndex = {};
    this._edges.forEach((data, key) => {
      const direction = data.undirected ? "--" : "->";
      let label = "";
      let source = data.source.key;
      let target = data.target.key;
      let tmp;
      if (data.undirected && source > target) {
        tmp = source;
        source = target;
        target = tmp;
      }
      const desc = `(${source})${direction}(${target})`;
      if (!key.startsWith("geid_")) {
        label += `[${key}]: `;
      } else if (this.multi) {
        if (typeof multiIndex[desc] === "undefined") {
          multiIndex[desc] = 0;
        } else {
          multiIndex[desc]++;
        }
        label += `${multiIndex[desc]}. `;
      }
      label += desc;
      edges[label] = data.attributes;
    });
    const dummy = {};
    for (const k in this) {
      if (this.hasOwnProperty(k) && !EMITTER_PROPS.has(k) && typeof this[k] !== "function" && typeof k !== "symbol")
        dummy[k] = this[k];
    }
    dummy.attributes = this._attributes;
    dummy.nodes = nodes;
    dummy.edges = edges;
    privateProperty(dummy, "constructor", this.constructor);
    return dummy;
  }
};
if (typeof Symbol !== "undefined")
  Graph.prototype[Symbol.for("nodejs.util.inspect.custom")] = Graph.prototype.inspect;
EDGE_ADD_METHODS.forEach((method) => {
  ["add", "merge", "update"].forEach((verb) => {
    const name = method.name(verb);
    const fn = verb === "add" ? addEdge : mergeEdge;
    if (method.generateKey) {
      Graph.prototype[name] = function(source, target, attributes) {
        return fn(
          this,
          name,
          true,
          (method.type || this.type) === "undirected",
          null,
          source,
          target,
          attributes,
          verb === "update"
        );
      };
    } else {
      Graph.prototype[name] = function(edge, source, target, attributes) {
        return fn(
          this,
          name,
          false,
          (method.type || this.type) === "undirected",
          edge,
          source,
          target,
          attributes,
          verb === "update"
        );
      };
    }
  });
});
attachNodeAttributesMethods(Graph);
attachEdgeAttributesMethods(Graph);
attachEdgeIterationMethods(Graph);
attachNeighborIterationMethods(Graph);
var DirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "directed" }, options);
    if ("multi" in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError(
        "DirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (finalOptions.type !== "directed")
      throw new InvalidArgumentsGraphError(
        'DirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var UndirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "undirected" }, options);
    if ("multi" in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError(
        "UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (finalOptions.type !== "undirected")
      throw new InvalidArgumentsGraphError(
        'UndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var MultiGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    super(finalOptions);
  }
};
var MultiDirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "directed", multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (finalOptions.type !== "directed")
      throw new InvalidArgumentsGraphError(
        'MultiDirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var MultiUndirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "undirected", multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (finalOptions.type !== "undirected")
      throw new InvalidArgumentsGraphError(
        'MultiUndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
function attachStaticFromMethod(Class) {
  Class.from = function(data, options) {
    const finalOptions = assign({}, data.options, options);
    const instance = new Class(finalOptions);
    instance.import(data);
    return instance;
  };
}
attachStaticFromMethod(Graph);
attachStaticFromMethod(DirectedGraph);
attachStaticFromMethod(UndirectedGraph);
attachStaticFromMethod(MultiGraph);
attachStaticFromMethod(MultiDirectedGraph);
attachStaticFromMethod(MultiUndirectedGraph);
Graph.Graph = Graph;
Graph.DirectedGraph = DirectedGraph;
Graph.UndirectedGraph = UndirectedGraph;
Graph.MultiGraph = MultiGraph;
Graph.MultiDirectedGraph = MultiDirectedGraph;
Graph.MultiUndirectedGraph = MultiUndirectedGraph;
Graph.InvalidArgumentsGraphError = InvalidArgumentsGraphError;
Graph.NotFoundGraphError = NotFoundGraphError;
Graph.UsageGraphError = UsageGraphError;

export {
  require_events,
  InvalidArgumentsGraphError,
  NotFoundGraphError,
  UsageGraphError,
  Graph,
  DirectedGraph,
  UndirectedGraph,
  MultiGraph,
  MultiDirectedGraph,
  MultiUndirectedGraph
};
//# sourceMappingURL=chunk-ITVWZULE.js.map
