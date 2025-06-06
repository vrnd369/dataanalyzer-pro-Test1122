import {
  useLayoutEffect2
} from "./chunk-4JN3VQHV.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var React = __toESM(require_react(), 1);
function useCallbackRef(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}

// node_modules/@radix-ui/react-id/dist/index.mjs
var React2 = __toESM(require_react(), 1);
var useReactId = React2[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = React2.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

export {
  useCallbackRef,
  useId
};
//# sourceMappingURL=chunk-S274KGUR.js.map
