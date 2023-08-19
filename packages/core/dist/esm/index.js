import {
  ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT,
  useCollector,
  wrapConnectorHooks,
  ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT,
  deprecationWarning,
  useEffectOnce,
  ERROR_TOP_LEVEL_ELEMENT_NO_ID,
  ROOT_NODE,
  ERROR_INVALID_NODEID,
  ERROR_DELETE_TOP_LEVEL_NODE,
  ERROR_NOPARENT,
  DEPRECATED_ROOT_NODE,
  ERROR_NOT_IN_RESOLVER,
  ERROR_INVALID_NODE_ID,
  ERROR_MOVE_TOP_LEVEL_NODE,
  ERROR_MOVE_NONCANVAS_CHILD,
  ERROR_CANNOT_DRAG,
  ERROR_MOVE_TO_NONCANVAS_PARENT,
  ERROR_MOVE_INCOMING_PARENT,
  ERROR_MOVE_CANNOT_DROP,
  ERROR_MOVE_TO_DESCENDANT,
  ERROR_DUPLICATE_NODEID,
  ERROR_MOVE_OUTGOING_PARENT,
  getRandomId,
  ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER,
  getDOMInfo,
  EventHandlers,
  DerivedEventHandlers,
  isChromium,
  isLinux,
  RenderIndicator,
  useMethods,
  ERROR_RESOLVER_NOT_AN_OBJECT,
  HISTORY_ACTIONS,
} from '@craftjs/utils';
export { ROOT_NODE } from '@craftjs/utils';
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  useRef,
  Children,
  Fragment,
} from 'react';
import invariant from 'tiny-invariant';
import { isFunction } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

const NodeContext = React.createContext(null);
const NodeProvider = ({ id, related = false, children }) => {
  return React.createElement(
    NodeContext.Provider,
    { value: { id, related } },
    children
  );
};

function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _typeof(obj) {
  '@babel/helpers - typeof';

  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', {
    writable: false,
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  Object.defineProperty(subClass, 'prototype', {
    writable: false,
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}
function _toPrimitive(input, hint) {
  if (typeof input !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (typeof res !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return typeof key === 'symbol' ? key : String(key);
}

const EditorContext = createContext(null);

var EventHandlerContext = createContext(null);
var useEventHandler = function useEventHandler() {
  return useContext(EventHandlerContext);
};

function useInternalEditor(collector) {
  var handler = useEventHandler();
  var store = useContext(EditorContext);
  invariant(store, ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT);
  var collected = useCollector(store, collector);
  var connectorsUsage = useMemo(
    function () {
      return handler && handler.createConnectorsUsage();
    },
    [handler]
  );
  useEffect(
    function () {
      connectorsUsage.register();
      return function () {
        connectorsUsage.cleanup();
      };
    },
    [connectorsUsage]
  );
  var connectors = useMemo(
    function () {
      return connectorsUsage && wrapConnectorHooks(connectorsUsage.connectors);
    },
    [connectorsUsage]
  );
  return _objectSpread2(
    _objectSpread2({}, collected),
    {},
    {
      connectors: connectors,
      inContext: !!store,
      store: store,
    }
  );
}

var _excluded$3 = ['actions', 'query', 'connectors'];
function useInternalNode(collect) {
  var context = useContext(NodeContext);
  invariant(context, ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT);
  var id = context.id,
    related = context.related;
  var _useInternalEditor = useInternalEditor(function (state) {
      return id && state.nodes[id] && collect && collect(state.nodes[id]);
    }),
    EditorActions = _useInternalEditor.actions;
  _useInternalEditor.query;
  var editorConnectors = _useInternalEditor.connectors,
    collected = _objectWithoutProperties(_useInternalEditor, _excluded$3);
  var connectors = useMemo(
    function () {
      return wrapConnectorHooks({
        connect: function connect(dom) {
          return editorConnectors.connect(dom, id);
        },
        drag: function drag(dom) {
          return editorConnectors.drag(dom, id);
        },
      });
    },
    [editorConnectors, id]
  );
  var actions = useMemo(
    function () {
      return {
        setProp: function setProp(cb, throttleRate) {
          if (throttleRate) {
            EditorActions.history.throttle(throttleRate).setProp(id, cb);
          } else {
            EditorActions.setProp(id, cb);
          }
        },
        setCustom: function setCustom(cb, throttleRate) {
          if (throttleRate) {
            EditorActions.history.throttle(throttleRate).setCustom(id, cb);
          } else {
            EditorActions.setCustom(id, cb);
          }
        },
        setHidden: function setHidden(bool) {
          return EditorActions.setHidden(id, bool);
        },
      };
    },
    [EditorActions, id]
  );
  return _objectSpread2(
    _objectSpread2({}, collected),
    {},
    {
      id: id,
      related: related,
      inNodeContext: !!context,
      actions: actions,
      connectors: connectors,
    }
  );
}

var _excluded$2 = ['id', 'related', 'actions', 'inNodeContext', 'connectors'];
/**
 * A Hook to that provides methods and state information related to the corresponding Node that manages the current component.
 * @param collect - Collector function to consume values from the corresponding Node's state
 */
function useNode(collect) {
  var _useInternalNode = useInternalNode(collect),
    id = _useInternalNode.id,
    related = _useInternalNode.related,
    actions = _useInternalNode.actions,
    inNodeContext = _useInternalNode.inNodeContext,
    connectors = _useInternalNode.connectors,
    collected = _objectWithoutProperties(_useInternalNode, _excluded$2);
  return _objectSpread2(
    _objectSpread2({}, collected),
    {},
    {
      actions: actions,
      id: id,
      related: related,
      setProp: function setProp(cb, throttleRate) {
        deprecationWarning('useNode().setProp()', {
          suggest: 'useNode().actions.setProp()',
        });
        return actions.setProp(cb, throttleRate);
      },
      inNodeContext: inNodeContext,
      connectors: connectors,
    }
  );
}

const SimpleElement = ({ render }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return typeof render.type === 'string'
    ? connect(drag(React.cloneElement(render)))
    : render;
};

const DefaultRender = () => {
  const { type, props, nodes, hydrationTimestamp } = useInternalNode(
    (node) => ({
      type: node.data.type,
      props: node.data.props,
      nodes: node.data.nodes,
      hydrationTimestamp: node._hydrationTimestamp,
    })
  );
  return useMemo(() => {
    let children = props.children;
    if (nodes && nodes.length > 0) {
      children = React.createElement(
        React.Fragment,
        null,
        nodes.map((id) => React.createElement(NodeElement, { id: id, key: id }))
      );
    }
    const render = React.createElement(type, props, children);
    if (typeof type == 'string') {
      return React.createElement(SimpleElement, { render: render });
    }
    return render;
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [type, props, hydrationTimestamp, nodes]);
};

const RenderNodeToElement = ({ render }) => {
  const { hidden } = useInternalNode((node) => ({
    hidden: node.data.hidden,
  }));
  const { onRender } = useInternalEditor((state) => ({
    onRender: state.options.onRender,
  }));
  // don't display the node since it's hidden
  if (hidden) {
    return null;
  }
  return React.createElement(onRender, {
    render: render || React.createElement(DefaultRender, null),
  });
};

const NodeElement = ({ id, render }) => {
  return React.createElement(
    NodeProvider,
    { id: id },
    React.createElement(RenderNodeToElement, { render: render })
  );
};

const defaultElementProps = {
  is: 'div',
  canvas: false,
  custom: {},
  hidden: false,
};
const elementPropToNodeData = {
  is: 'type',
  canvas: 'isCanvas',
};
function Element$1({ id, children, ...elementProps }) {
  const { is } = {
    ...defaultElementProps,
    ...elementProps,
  };
  const { query, actions } = useInternalEditor();
  const { node, inNodeContext } = useInternalNode((node) => ({
    node: {
      id: node.id,
      data: node.data,
    },
  }));
  const [linkedNodeId, setLinkedNodeId] = useState(null);
  useEffectOnce(() => {
    invariant(!!id, ERROR_TOP_LEVEL_ELEMENT_NO_ID);
    const { id: nodeId, data } = node;
    if (inNodeContext) {
      let linkedNodeId;
      const existingNode =
        data.linkedNodes &&
        data.linkedNodes[id] &&
        query.node(data.linkedNodes[id]).get();
      // Render existing linked Node if it already exists (and is the same type as the JSX)
      if (existingNode && existingNode.data.type === is) {
        linkedNodeId = existingNode.id;
      } else {
        // otherwise, create and render a new linked Node
        const linkedElement = React.createElement(
          Element$1,
          elementProps,
          children
        );
        const tree = query.parseReactElement(linkedElement).toNodeTree();
        linkedNodeId = tree.rootNodeId;
        actions.history.ignore().addLinkedNodeFromTree(tree, nodeId, id);
      }
      setLinkedNodeId(linkedNodeId);
    }
  });
  return linkedNodeId
    ? React.createElement(NodeElement, { id: linkedNodeId })
    : null;
}

const deprecateCanvasComponent = () =>
  deprecationWarning('<Canvas />', {
    suggest: '<Element canvas={true} />',
  });
function Canvas({ ...props }) {
  useEffect(() => deprecateCanvasComponent(), []);
  return React.createElement(Element$1, { ...props, canvas: true });
}

const RenderRootNode = () => {
  const { timestamp } = useInternalEditor((state) => ({
    timestamp:
      state.nodes[ROOT_NODE] && state.nodes[ROOT_NODE]._hydrationTimestamp,
  }));
  if (!timestamp) {
    return null;
  }
  return React.createElement(NodeElement, { id: ROOT_NODE, key: timestamp });
};
/**
 * A React Component that defines the editable area
 */
const Frame = ({ children, json, data }) => {
  const { actions, query } = useInternalEditor();
  if (!!json) {
    deprecationWarning('<Frame json={...} />', {
      suggest: '<Frame data={...} />',
    });
  }
  const initialState = useRef({
    initialChildren: children,
    initialData: data || json,
  });
  useEffect(() => {
    const { initialChildren, initialData } = initialState.current;
    if (initialData) {
      actions.history.ignore().deserialize(initialData);
    } else if (initialChildren) {
      const rootNode = React.Children.only(initialChildren);
      const node = query.parseReactElement(rootNode).toNodeTree((node, jsx) => {
        if (jsx === rootNode) {
          node.id = ROOT_NODE;
        }
        return node;
      });
      actions.history.ignore().addNodeTree(node);
    }
  }, [actions, query]);
  return React.createElement(RenderRootNode, null);
};

var NodeSelectorType;
(function (NodeSelectorType) {
  NodeSelectorType[(NodeSelectorType['Any'] = 0)] = 'Any';
  NodeSelectorType[(NodeSelectorType['Id'] = 1)] = 'Id';
  NodeSelectorType[(NodeSelectorType['Obj'] = 2)] = 'Obj';
})(NodeSelectorType || (NodeSelectorType = {}));

const getPublicActions = (actions) => {
  const {
    addLinkedNodeFromTree,
    setDOM,
    setNodeEvent,
    replaceNodes,
    reset,
    ...EditorActions
  } = actions;
  return EditorActions;
};
function useEditor(collect) {
  const {
    connectors,
    actions: internalActions,
    query,
    store,
    ...collected
  } = useInternalEditor(collect);
  const EditorActions = getPublicActions(internalActions);
  const actions = useMemo(() => {
    return {
      ...EditorActions,
      history: {
        ...EditorActions.history,
        ignore: (...args) =>
          getPublicActions(EditorActions.history.ignore(...args)),
        throttle: (...args) =>
          getPublicActions(EditorActions.history.throttle(...args)),
      },
    };
  }, [EditorActions]);
  return {
    connectors,
    actions,
    query,
    store,
    ...collected,
  };
}

function connectEditor(collect) {
  return (WrappedComponent) => {
    return (props) => {
      const Editor = collect ? useEditor(collect) : useEditor();
      return React.createElement(WrappedComponent, { ...Editor, ...props });
    };
  };
}

function connectNode(collect) {
  return function (WrappedComponent) {
    return (props) => {
      const node = useNode(collect);
      return React.createElement(WrappedComponent, { ...node, ...props });
    };
  };
}

var fromEntries = function fromEntries(pairs) {
  if (Object.fromEntries) {
    return Object.fromEntries(pairs);
  }
  return pairs.reduce(function (accum, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      id = _ref2[0],
      value = _ref2[1];
    return _objectSpread2(
      _objectSpread2({}, accum),
      {},
      _defineProperty({}, id, value)
    );
  }, {});
};

var getNodesFromSelector = function getNodesFromSelector(
  nodes,
  selector,
  config
) {
  var items = Array.isArray(selector) ? selector : [selector];
  var mergedConfig = _objectSpread2(
    {
      existOnly: false,
      idOnly: false,
    },
    config || {}
  );
  var nodeSelectors = items
    .filter(function (item) {
      return !!item;
    })
    .map(function (item) {
      if (typeof item === 'string') {
        return {
          node: nodes[item],
          exists: !!nodes[item],
        };
      }
      if (_typeof(item) === 'object' && !mergedConfig.idOnly) {
        var node = item;
        return {
          node: node,
          exists: !!nodes[node.id],
        };
      }
      return {
        node: null,
        exists: false,
      };
    });
  if (mergedConfig.existOnly) {
    invariant(
      nodeSelectors.filter(function (selector) {
        return !selector.exists;
      }).length === 0,
      ERROR_INVALID_NODEID
    );
  }
  return nodeSelectors;
};

var removeNodeFromEvents = function removeNodeFromEvents(state, nodeId) {
  return Object.keys(state.events).forEach(function (key) {
    var eventSet = state.events[key];
    if (eventSet && eventSet.has && eventSet.has(nodeId)) {
      state.events[key] = new Set(
        Array.from(eventSet).filter(function (id) {
          return nodeId !== id;
        })
      );
    }
  });
};

var _excluded$1 = ['history'];
var Methods = function Methods(state, query) {
  /** Helper functions */
  var addNodeTreeToParent = function addNodeTreeToParent(
    tree,
    parentId,
    addNodeType
  ) {
    var iterateChildren = function iterateChildren(id, parentId) {
      var node = tree.nodes[id];
      if (typeof node.data.type !== 'string') {
        invariant(
          state.options.resolver[node.data.name],
          ERROR_NOT_IN_RESOLVER.replace(
            '%node_type%',
            ''.concat(node.data.type.name)
          )
        );
      }
      state.nodes[id] = _objectSpread2(
        _objectSpread2({}, node),
        {},
        {
          data: _objectSpread2(
            _objectSpread2({}, node.data),
            {},
            {
              parent: parentId,
            }
          ),
        }
      );
      if (node.data.nodes.length > 0) {
        delete state.nodes[id].data.props.children;
        node.data.nodes.forEach(function (childNodeId) {
          return iterateChildren(childNodeId, node.id);
        });
      }
      Object.values(node.data.linkedNodes).forEach(function (linkedNodeId) {
        return iterateChildren(linkedNodeId, node.id);
      });
    };
    iterateChildren(tree.rootNodeId, parentId);
    if (!parentId) {
      invariant(
        tree.rootNodeId === ROOT_NODE,
        'Cannot add non-root Node without a parent'
      );
      return;
    }
    var parent = getParentAndValidate(parentId);
    if (addNodeType.type === 'child') {
      var index = addNodeType.index;
      if (index != null) {
        parent.data.nodes.splice(index, 0, tree.rootNodeId);
      } else {
        parent.data.nodes.push(tree.rootNodeId);
      }
      return;
    }
    parent.data.linkedNodes[addNodeType.id] = tree.rootNodeId;
  };
  var getParentAndValidate = function getParentAndValidate(parentId) {
    invariant(parentId, ERROR_NOPARENT);
    var parent = state.nodes[parentId];
    invariant(parent, ERROR_INVALID_NODEID);
    return parent;
  };
  var deleteNode = function deleteNode(id) {
    var targetNode = state.nodes[id],
      parentNode = state.nodes[targetNode.data.parent];
    if (targetNode.data.nodes) {
      // we deep clone here because otherwise immer will mutate the node
      // object as we remove nodes
      _toConsumableArray(targetNode.data.nodes).forEach(function (childId) {
        return deleteNode(childId);
      });
    }
    if (targetNode.data.linkedNodes) {
      Object.values(targetNode.data.linkedNodes).map(function (linkedNodeId) {
        return deleteNode(linkedNodeId);
      });
    }
    var isChildNode = parentNode.data.nodes.includes(id);
    if (isChildNode) {
      var parentChildren = parentNode.data.nodes;
      parentChildren.splice(parentChildren.indexOf(id), 1);
    } else {
      var linkedId = Object.keys(parentNode.data.linkedNodes).find(function (
        id
      ) {
        return parentNode.data.linkedNodes[id] === id;
      });
      if (linkedId) {
        delete parentNode.data.linkedNodes[linkedId];
      }
    }
    removeNodeFromEvents(state, id);
    delete state.nodes[id];
  };
  return {
    /**
     * @private
     * Add a new linked Node to the editor.
     * Only used internally by the <Element /> component
     *
     * @param tree
     * @param parentId
     * @param id
     */
    addLinkedNodeFromTree: function addLinkedNodeFromTree(tree, parentId, id) {
      var parent = getParentAndValidate(parentId);
      var existingLinkedNode = parent.data.linkedNodes[id];
      if (existingLinkedNode) {
        deleteNode(existingLinkedNode);
      }
      addNodeTreeToParent(tree, parentId, {
        type: 'linked',
        id: id,
      });
    },
    /**
     * Add a new Node to the editor.
     *
     * @param nodeToAdd
     * @param parentId
     * @param index
     */
    add: function add(nodeToAdd, parentId, index) {
      // TODO: Deprecate adding array of Nodes to keep implementation simpler
      var nodes = [nodeToAdd];
      if (Array.isArray(nodeToAdd)) {
        deprecationWarning('actions.add(node: Node[])', {
          suggest: 'actions.add(node: Node)',
        });
        nodes = nodeToAdd;
      }
      nodes.forEach(function (node) {
        addNodeTreeToParent(
          {
            nodes: _defineProperty({}, node.id, node),
            rootNodeId: node.id,
          },
          parentId,
          {
            type: 'child',
            index: index,
          }
        );
      });
    },
    /**
     * Add a NodeTree to the editor
     *
     * @param tree
     * @param parentId
     * @param index
     */
    addNodeTree: function addNodeTree(tree, parentId, index) {
      addNodeTreeToParent(tree, parentId, {
        type: 'child',
        index: index,
      });
    },
    /**
     * Delete a Node
     * @param id
     */
    delete: function _delete(selector) {
      var targets = getNodesFromSelector(state.nodes, selector, {
        existOnly: true,
        idOnly: true,
      });
      targets.forEach(function (_ref) {
        var node = _ref.node;
        invariant(
          !query.node(node.id).isTopLevelNode(),
          ERROR_DELETE_TOP_LEVEL_NODE
        );
        deleteNode(node.id);
      });
    },
    deserialize: function deserialize(input) {
      var dehydratedNodes =
        typeof input == 'string' ? JSON.parse(input) : input;
      var nodePairs = Object.keys(dehydratedNodes).map(function (id) {
        var nodeId = id;
        if (id === DEPRECATED_ROOT_NODE) {
          nodeId = ROOT_NODE;
        }
        return [
          nodeId,
          query
            .parseSerializedNode(dehydratedNodes[id])
            .toNode(function (node) {
              return (node.id = nodeId);
            }),
        ];
      });
      this.replaceNodes(fromEntries(nodePairs));
    },
    /**
     * Move a target Node to a new Parent at a given index
     * @param targetId
     * @param newParentId
     * @param index
     */
    move: function move(selector, newParentId, index) {
      var targets = getNodesFromSelector(state.nodes, selector, {
        existOnly: true,
      });
      var newParent = state.nodes[newParentId];
      var nodesArrToCleanup = new Set();
      targets.forEach(function (_ref2, i) {
        var targetNode = _ref2.node;
        var targetId = targetNode.id;
        var currentParentId = targetNode.data.parent;
        query.node(newParentId).isDroppable([targetId], function (err) {
          throw new Error(err);
        });
        // modify node props
        state.options.onBeforeMoveEnd(
          targetNode,
          newParent,
          state.nodes[currentParentId]
        );
        var currentParent = state.nodes[currentParentId];
        var currentParentNodes = currentParent.data.nodes;
        nodesArrToCleanup.add(currentParentNodes);
        var oldIndex = currentParentNodes.indexOf(targetId);
        currentParentNodes[oldIndex] = '$$'; // mark for deletion
        newParent.data.nodes.splice(index + i, 0, targetId);
        state.nodes[targetId].data.parent = newParentId;
      });
      nodesArrToCleanup.forEach(function (nodes) {
        var length = nodes.length;
        _toConsumableArray(nodes)
          .reverse()
          .forEach(function (value, index) {
            if (value !== '$$') {
              return;
            }
            nodes.splice(length - 1 - index, 1);
          });
      });
    },
    replaceNodes: function replaceNodes(nodes) {
      this.clearEvents();
      state.nodes = nodes;
    },
    clearEvents: function clearEvents() {
      this.setNodeEvent('selected', null);
      this.setNodeEvent('hovered', null);
      this.setNodeEvent('dragged', null);
      this.setNodeEvent('draggedOver', null);
      this.setIndicator(null);
    },
    /**
     * Resets all the editor state.
     */
    reset: function reset() {
      this.clearEvents();
      this.replaceNodes({});
    },
    /**
     * Set editor options via a callback function
     *
     * @param cb: function used to set the options.
     */
    setOptions: function setOptions(cb) {
      cb(state.options);
    },
    setNodeEvent: function setNodeEvent(eventType, nodeIdSelector) {
      state.events[eventType].forEach(function (id) {
        if (state.nodes[id]) {
          state.nodes[id].events[eventType] = false;
        }
      });
      state.events[eventType] = new Set();
      if (!nodeIdSelector) {
        return;
      }
      var targets = getNodesFromSelector(state.nodes, nodeIdSelector, {
        idOnly: true,
        existOnly: true,
      });
      var nodeIds = new Set(
        targets.map(function (_ref3) {
          var node = _ref3.node;
          return node.id;
        })
      );
      nodeIds.forEach(function (id) {
        state.nodes[id].events[eventType] = true;
      });
      state.events[eventType] = nodeIds;
    },
    /**
     * Set custom values to a Node
     * @param id
     * @param cb
     */
    setCustom: function setCustom(selector, cb) {
      var targets = getNodesFromSelector(state.nodes, selector, {
        idOnly: true,
        existOnly: true,
      });
      targets.forEach(function (_ref4) {
        var node = _ref4.node;
        return cb(state.nodes[node.id].data.custom);
      });
    },
    /**
     * Given a `id`, it will set the `dom` porperty of that node.
     *
     * @param id of the node we want to set
     * @param dom
     */
    setDOM: function setDOM(id, dom) {
      if (!state.nodes[id]) {
        return;
      }
      state.nodes[id].dom = dom;
    },
    setIndicator: function setIndicator(indicator) {
      if (
        indicator &&
        (!indicator.placement.parent.dom ||
          (indicator.placement.currentNode &&
            !indicator.placement.currentNode.dom))
      )
        return;
      state.indicator = indicator;
    },
    /**
     * Hide a Node
     * @param id
     * @param bool
     */
    setHidden: function setHidden(id, bool) {
      state.nodes[id].data.hidden = bool;
    },
    /**
     * Update the props of a Node
     * @param id
     * @param cb
     */
    setProp: function setProp(selector, cb) {
      var targets = getNodesFromSelector(state.nodes, selector, {
        idOnly: true,
        existOnly: true,
      });
      targets.forEach(function (_ref5) {
        var node = _ref5.node;
        return cb(state.nodes[node.id].data.props);
      });
    },
    selectNode: function selectNode(nodeIdSelector) {
      if (nodeIdSelector) {
        var targets = getNodesFromSelector(state.nodes, nodeIdSelector, {
          idOnly: true,
          existOnly: true,
        });
        this.setNodeEvent(
          'selected',
          targets.map(function (_ref6) {
            var node = _ref6.node;
            return node.id;
          })
        );
      } else {
        this.setNodeEvent('selected', null);
      }
      this.setNodeEvent('hovered', null);
    },
    hoverNode: function hoverNode(nodeIdSelector) {
      if (nodeIdSelector) {
        var targets = getNodesFromSelector(state.nodes, nodeIdSelector, {
          idOnly: true,
          existOnly: true,
        });
        this.setNodeEvent(
          'hovered',
          targets.map(function (_ref7) {
            var node = _ref7.node;
            return node.id;
          })
        );
      } else {
        this.setNodeEvent('hovered', null);
      }
    },
  };
};
var ActionMethods = function ActionMethods(state, query) {
  return _objectSpread2(
    _objectSpread2({}, Methods(state, query)),
    {},
    {
      // Note: Beware: advanced method! You most likely don't need to use this
      // TODO: fix parameter types and cleanup the method
      setState: function setState(cb) {
        this.history;
        var actions = _objectWithoutProperties(this, _excluded$1);
        // We pass the other actions as the second parameter, so that devs could still make use of the predefined actions
        cb(state, actions);
      },
    }
  );
};

function EventHelpers(state, eventType) {
  var event = state.events[eventType];
  return {
    contains: function contains(id) {
      return event.has(id);
    },
    isEmpty: function isEmpty() {
      return this.all().length === 0;
    },
    first: function first() {
      var values = this.all();
      return values[0];
    },
    last: function last() {
      var values = this.all();
      return values[values.length - 1];
    },
    all: function all() {
      return Array.from(event);
    },
    size: function size() {
      return this.all().length;
    },
    at: function at(i) {
      return this.all()[i];
    },
    raw: function raw() {
      return event;
    },
  };
}

var resolveComponent = function resolveComponent(resolver, comp) {
  var componentName = comp.name || comp.displayName;
  var getNameInResolver = function getNameInResolver() {
    if (resolver[componentName]) {
      return componentName;
    }
    for (var i = 0; i < Object.keys(resolver).length; i++) {
      var name = Object.keys(resolver)[i];
      var fn = resolver[name];
      if (fn === comp) {
        return name;
      }
    }
    if (typeof comp === 'string') {
      return comp;
    }
  };
  var resolvedName = getNameInResolver();
  invariant(
    resolvedName,
    ERROR_NOT_IN_RESOLVER.replace('%node_type%', componentName)
  );
  return resolvedName;
};

const reduceType = (type, resolver) => {
  if (typeof type === 'string') {
    return type;
  }
  return { resolvedName: resolveComponent(resolver, type) };
};
const serializeComp = (data, resolver) => {
  let { type, isCanvas, props } = data;
  props = Object.keys(props).reduce((result, key) => {
    const prop = props[key];
    if (prop === undefined || prop === null || typeof prop === 'function') {
      return result;
    }
    if (key === 'children' && typeof prop !== 'string') {
      result[key] = Children.map(prop, (child) => {
        if (typeof child === 'string') {
          return child;
        }
        return serializeComp(child, resolver);
      });
    } else if (typeof prop.type === 'function') {
      result[key] = serializeComp(prop, resolver);
    } else {
      result[key] = prop;
    }
    return result;
  }, {});
  return {
    type: reduceType(type, resolver),
    isCanvas: !!isCanvas,
    props,
  };
};
const serializeNode = (data, resolver) => {
  const { type, props, isCanvas, name, ...nodeData } = data;
  const reducedComp = serializeComp({ type, isCanvas, props }, resolver);
  return {
    ...reducedComp,
    ...nodeData,
  };
};

function NodeHelpers(state, id) {
  invariant(typeof id == 'string', ERROR_INVALID_NODE_ID);
  var node = state.nodes[id];
  var nodeHelpers = function nodeHelpers(id) {
    return NodeHelpers(state, id);
  };
  return {
    isCanvas: function isCanvas() {
      return !!node.data.isCanvas;
    },
    isRoot: function isRoot() {
      return node.id === ROOT_NODE;
    },
    isLinkedNode: function isLinkedNode() {
      return (
        node.data.parent &&
        nodeHelpers(node.data.parent).linkedNodes().includes(node.id)
      );
    },
    isTopLevelNode: function isTopLevelNode() {
      return this.isRoot() || this.isLinkedNode();
    },
    isDeletable: function isDeletable() {
      return !this.isTopLevelNode();
    },
    isParentOfTopLevelNodes: function isParentOfTopLevelNodes() {
      return (
        node.data.linkedNodes && Object.keys(node.data.linkedNodes).length > 0
      );
    },
    isParentOfTopLevelCanvas: function isParentOfTopLevelCanvas() {
      deprecationWarning('query.node(id).isParentOfTopLevelCanvas', {
        suggest: 'query.node(id).isParentOfTopLevelNodes',
      });
      return this.isParentOfTopLevelNodes();
    },
    isSelected: function isSelected() {
      return state.events.selected.has(id);
    },
    isHovered: function isHovered() {
      return state.events.hovered.has(id);
    },
    isDragged: function isDragged() {
      return state.events.dragged.has(id);
    },
    get: function get() {
      return node;
    },
    ancestors: function ancestors() {
      var deep =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : false;
      function appendParentNode(id) {
        var ancestors =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : [];
        var depth =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var node = state.nodes[id];
        if (!node) {
          return ancestors;
        }
        ancestors.push(id);
        if (!node.data.parent) {
          return ancestors;
        }
        if (deep || (!deep && depth === 0)) {
          ancestors = appendParentNode(node.data.parent, ancestors, depth + 1);
        }
        return ancestors;
      }
      return appendParentNode(node.data.parent);
    },
    descendants: function descendants() {
      var deep =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : false;
      var includeOnly = arguments.length > 1 ? arguments[1] : undefined;
      function appendChildNode(id) {
        var descendants =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : [];
        var depth =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        if (deep || (!deep && depth === 0)) {
          var _node = state.nodes[id];
          if (!_node) {
            return descendants;
          }
          if (includeOnly !== 'childNodes') {
            // Include linkedNodes if any
            var linkedNodes = nodeHelpers(id).linkedNodes();
            linkedNodes.forEach(function (nodeId) {
              descendants.push(nodeId);
              descendants = appendChildNode(nodeId, descendants, depth + 1);
            });
          }
          if (includeOnly !== 'linkedNodes') {
            var childNodes = nodeHelpers(id).childNodes();
            childNodes.forEach(function (nodeId) {
              descendants.push(nodeId);
              descendants = appendChildNode(nodeId, descendants, depth + 1);
            });
          }
          return descendants;
        }
        return descendants;
      }
      return appendChildNode(id);
    },
    linkedNodes: function linkedNodes() {
      return Object.values(node.data.linkedNodes || {});
    },
    childNodes: function childNodes() {
      return node.data.nodes || [];
    },
    isDraggable: function isDraggable(onError) {
      try {
        var targetNode = node;
        invariant(!this.isTopLevelNode(), ERROR_MOVE_TOP_LEVEL_NODE);
        invariant(
          NodeHelpers(state, targetNode.data.parent).isCanvas(),
          ERROR_MOVE_NONCANVAS_CHILD
        );
        invariant(
          targetNode.rules.canDrag(targetNode, nodeHelpers),
          ERROR_CANNOT_DRAG
        );
        return true;
      } catch (err) {
        if (onError) {
          onError(err);
        }
        return false;
      }
    },
    isDroppable: function isDroppable(selector, onError) {
      var targets = getNodesFromSelector(state.nodes, selector);
      var newParentNode = node;
      try {
        invariant(this.isCanvas(), ERROR_MOVE_TO_NONCANVAS_PARENT);
        invariant(
          newParentNode.rules.canMoveIn(
            targets.map(function (selector) {
              return selector.node;
            }),
            newParentNode,
            nodeHelpers
          ),
          ERROR_MOVE_INCOMING_PARENT
        );
        var parentNodes = {};
        targets.forEach(function (_ref) {
          var targetNode = _ref.node,
            exists = _ref.exists;
          invariant(
            targetNode.rules.canDrop(newParentNode, targetNode, nodeHelpers),
            ERROR_MOVE_CANNOT_DROP
          );
          // Ignore other checking if the Node is new
          if (!exists) {
            return;
          }
          invariant(
            !nodeHelpers(targetNode.id).isTopLevelNode(),
            ERROR_MOVE_TOP_LEVEL_NODE
          );
          var targetDeepNodes = nodeHelpers(targetNode.id).descendants(true);
          invariant(
            !targetDeepNodes.includes(newParentNode.id) &&
              newParentNode.id !== targetNode.id,
            ERROR_MOVE_TO_DESCENDANT
          );
          var currentParentNode =
            targetNode.data.parent && state.nodes[targetNode.data.parent];
          invariant(
            currentParentNode.data.isCanvas,
            ERROR_MOVE_NONCANVAS_CHILD
          );
          invariant(
            currentParentNode ||
              (!currentParentNode && !state.nodes[targetNode.id]),
            ERROR_DUPLICATE_NODEID
          );
          if (currentParentNode.id !== newParentNode.id) {
            if (!parentNodes[currentParentNode.id]) {
              parentNodes[currentParentNode.id] = [];
            }
            parentNodes[currentParentNode.id].push(targetNode);
          }
        });
        Object.keys(parentNodes).forEach(function (parentNodeId) {
          var childNodes = parentNodes[parentNodeId];
          var parentNode = state.nodes[parentNodeId];
          invariant(
            parentNode.rules.canMoveOut(childNodes, parentNode, nodeHelpers),
            ERROR_MOVE_OUTGOING_PARENT
          );
        });
        return true;
      } catch (err) {
        if (onError) {
          onError(err);
        }
        return false;
      }
    },
    toSerializedNode: function toSerializedNode() {
      return serializeNode(node.data, state.options.resolver);
    },
    toNodeTree: function toNodeTree(includeOnly) {
      var nodes = [id]
        .concat(_toConsumableArray(this.descendants(true, includeOnly)))
        .reduce(function (accum, descendantId) {
          accum[descendantId] = nodeHelpers(descendantId).get();
          return accum;
        }, {});
      return {
        rootNodeId: id,
        nodes: nodes,
      };
    },
    /**
     Deprecated NodeHelpers
     **/
    decendants: function decendants() {
      var deep =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : false;
      deprecationWarning('query.node(id).decendants', {
        suggest: 'query.node(id).descendants',
      });
      return this.descendants(deep);
    },
    isTopLevelCanvas: function isTopLevelCanvas() {
      return !this.isRoot() && !node.data.parent;
    },
  };
}

function findPosition(parent, dims, posX, posY) {
  var result = {
    parent: parent,
    index: 0,
    where: 'before',
  };
  var leftLimit = 0,
    xLimit = 0,
    dimRight = 0,
    yLimit = 0,
    xCenter = 0,
    yCenter = 0,
    dimDown = 0;
  // Each dim is: Top, Left, Height, Width
  for (var i = 0, len = dims.length; i < len; i++) {
    var dim = dims[i];
    // Right position of the element. Left + Width
    dimRight = dim.left + dim.outerWidth;
    // Bottom position of the element. Top + Height
    dimDown = dim.top + dim.outerHeight;
    // X center position of the element. Left + (Width / 2)
    xCenter = dim.left + dim.outerWidth / 2;
    // Y center position of the element. Top + (Height / 2)
    yCenter = dim.top + dim.outerHeight / 2;
    // Skip if over the limits
    if (
      (xLimit && dim.left > xLimit) ||
      (yLimit && yCenter >= yLimit) ||
      // >= avoid issue with clearfixes
      (leftLimit && dimRight < leftLimit)
    )
      continue;
    result.index = i;
    // If it's not in flow (like 'float' element)
    if (!dim.inFlow) {
      if (posY < dimDown) yLimit = dimDown;
      //If x lefter than center
      if (posX < xCenter) {
        xLimit = xCenter;
        result.where = 'before';
      } else {
        leftLimit = xCenter;
        result.where = 'after';
      }
    } else {
      // If y upper than center
      if (posY < yCenter) {
        result.where = 'before';
        break;
      } else result.where = 'after'; // After last element
    }
  }

  return result;
}

var getNodeTypeName = function getNodeTypeName(type) {
  return typeof type == 'string' ? type : type.name;
};
function createNode(newNode, normalize) {
  var actualType = newNode.data.type;
  var id = newNode.id || getRandomId();
  var node = {
    id: id,
    _hydrationTimestamp: Date.now(),
    data: _objectSpread2(
      {
        type: actualType,
        name: getNodeTypeName(actualType),
        displayName: getNodeTypeName(actualType),
        props: {},
        custom: {},
        parent: null,
        isCanvas: false,
        hidden: false,
        nodes: [],
        linkedNodes: {},
      },
      newNode.data
    ),
    related: {},
    events: {
      selected: false,
      dragged: false,
      hovered: false,
      draggedOver: false,
    },
    rules: {
      canDrag: function canDrag() {
        return true;
      },
      canDrop: function canDrop() {
        return true;
      },
      canMoveIn: function canMoveIn() {
        return true;
      },
      canMoveOut: function canMoveOut() {
        return true;
      },
    },
    dom: null,
  };
  // @ts-ignore
  if (node.data.type === Element$1 || node.data.type === Canvas) {
    var mergedProps = _objectSpread2(
      _objectSpread2({}, defaultElementProps),
      node.data.props
    );
    node.data.props = Object.keys(node.data.props).reduce(function (
      props,
      key
    ) {
      if (Object.keys(defaultElementProps).includes(key)) {
        // If a <Element /> specific props is found (ie: "is", "canvas")
        // Replace the node.data with the value specified in the prop
        node.data[elementPropToNodeData[key] || key] = mergedProps[key];
      } else {
        // Otherwise include the props in the node as usual
        props[key] = node.data.props[key];
      }
      return props;
    },
    {});
    actualType = node.data.type;
    node.data.name = getNodeTypeName(actualType);
    node.data.displayName = getNodeTypeName(actualType);
    var usingDeprecatedCanvas = node.data.type === Canvas;
    if (usingDeprecatedCanvas) {
      node.data.isCanvas = true;
      deprecateCanvasComponent();
    }
  }
  if (normalize) {
    normalize(node);
  }
  // TODO: use UserComponentConfig type
  var userComponentConfig = actualType.craft;
  if (userComponentConfig) {
    node.data.displayName =
      userComponentConfig.displayName ||
      userComponentConfig.name ||
      node.data.displayName;
    node.data.props = _objectSpread2(
      _objectSpread2(
        {},
        userComponentConfig.props || userComponentConfig.defaultProps || {}
      ),
      node.data.props
    );
    node.data.custom = _objectSpread2(
      _objectSpread2({}, userComponentConfig.custom || {}),
      node.data.custom
    );
    if (
      userComponentConfig.isCanvas !== undefined &&
      userComponentConfig.isCanvas !== null
    ) {
      node.data.isCanvas = userComponentConfig.isCanvas;
    }
    if (userComponentConfig.rules) {
      Object.keys(userComponentConfig.rules).forEach(function (key) {
        if (['canDrag', 'canDrop', 'canMoveIn', 'canMoveOut'].includes(key)) {
          node.rules[key] = userComponentConfig.rules[key];
        }
      });
    }
    if (userComponentConfig.related) {
      var relatedNodeContext = {
        id: node.id,
        related: true,
      };
      Object.keys(userComponentConfig.related).forEach(function (comp) {
        node.related[comp] = function (props) {
          return React.createElement(
            NodeProvider,
            relatedNodeContext,
            React.createElement(userComponentConfig.related[comp], props)
          );
        };
      });
    }
  }
  return node;
}

const restoreType = (type, resolver) =>
  typeof type === 'object' && type.resolvedName
    ? type.resolvedName === 'Canvas'
      ? Canvas
      : resolver[type.resolvedName]
    : typeof type === 'string'
    ? type
    : null;
const deserializeComp = (data, resolver, index) => {
  let { type, props } = data;
  const main = restoreType(type, resolver);
  if (!main) {
    return;
  }
  props = Object.keys(props).reduce((result, key) => {
    const prop = props[key];
    if (prop === null || prop === undefined) {
      result[key] = null;
    } else if (typeof prop === 'object' && prop.resolvedName) {
      result[key] = deserializeComp(prop, resolver);
    } else if (key === 'children' && Array.isArray(prop)) {
      result[key] = prop.map((child) => {
        if (typeof child === 'string') {
          return child;
        }
        return deserializeComp(child, resolver);
      });
    } else {
      result[key] = prop;
    }
    return result;
  }, {});
  if (index) {
    props.key = index;
  }
  const jsx = {
    ...React.createElement(main, {
      ...props,
    }),
  };
  return {
    ...jsx,
    name: resolveComponent(resolver, jsx.type),
  };
};
const deserializeNode = (data, resolver) => {
  const { type: Comp, props: Props, ...nodeData } = data;
  const isCompAnHtmlElement = Comp !== undefined && typeof Comp === 'string';
  const isCompAUserComponent =
    Comp !== undefined && Comp.resolvedName !== undefined;
  invariant(
    isCompAnHtmlElement || isCompAUserComponent,
    ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER.replace(
      '%displayName%',
      data.displayName
    ).replace('%availableComponents%', Object.keys(resolver).join(', '))
  );
  const { type, name, props } = deserializeComp(data, resolver);
  const { parent, custom, displayName, isCanvas, nodes, hidden } = nodeData;
  const linkedNodes = nodeData.linkedNodes || nodeData._childCanvas;
  return {
    type,
    name,
    displayName: displayName || name,
    props,
    custom: custom || {},
    isCanvas: !!isCanvas,
    hidden: !!hidden,
    parent,
    linkedNodes: linkedNodes || {},
    nodes: nodes || [],
  };
};

const mergeNodes = (rootNode, childrenNodes) => {
  if (childrenNodes.length < 1) {
    return { [rootNode.id]: rootNode };
  }
  const nodes = childrenNodes.map(({ rootNodeId }) => rootNodeId);
  const nodeWithChildren = { ...rootNode, data: { ...rootNode.data, nodes } };
  const rootNodes = { [rootNode.id]: nodeWithChildren };
  return childrenNodes.reduce((accum, tree) => {
    const currentNode = tree.nodes[tree.rootNodeId];
    return {
      ...accum,
      ...tree.nodes,
      // set the parent id for the current node
      [currentNode.id]: {
        ...currentNode,
        data: {
          ...currentNode.data,
          parent: rootNode.id,
        },
      },
    };
  }, rootNodes);
};
const mergeTrees = (rootNode, childrenNodes) => ({
  rootNodeId: rootNode.id,
  nodes: mergeNodes(rootNode, childrenNodes),
});

function parseNodeFromJSX(jsx, normalize) {
  let element = jsx;
  if (typeof element === 'string') {
    element = React.createElement(Fragment, {}, element);
  }
  let actualType = element.type;
  return createNode(
    {
      data: {
        type: actualType,
        props: { ...element.props },
      },
    },
    (node) => {
      if (normalize) {
        normalize(node, element);
      }
    }
  );
}

function QueryMethods(state) {
  const options = state && state.options;
  const _ = () => QueryMethods(state);
  return {
    /**
     * Determine the best possible location to drop the source Node relative to the target Node
     *
     * TODO: replace with Positioner.computeIndicator();
     */
    getDropPlaceholder: (
      source,
      target,
      pos,
      nodesToDOM = (node) => state.nodes[node.id].dom
    ) => {
      const targetNode = state.nodes[target],
        isTargetCanvas = _().node(targetNode.id).isCanvas();
      const targetParent = isTargetCanvas
        ? targetNode
        : state.nodes[targetNode.data.parent];
      if (!targetParent) return;
      const targetParentNodes = targetParent.data.nodes || [];
      const dimensionsInContainer = targetParentNodes
        ? targetParentNodes.reduce((result, id) => {
            const dom = nodesToDOM(state.nodes[id]);
            if (dom) {
              const info = {
                id,
                ...getDOMInfo(dom),
              };
              result.push(info);
            }
            return result;
          }, [])
        : [];
      const dropAction = findPosition(
        targetParent,
        dimensionsInContainer,
        pos.x,
        pos.y
      );
      const currentNode =
        targetParentNodes.length &&
        state.nodes[targetParentNodes[dropAction.index]];
      const output = {
        placement: {
          ...dropAction,
          currentNode,
        },
        error: null,
      };
      const sourceNodes = getNodesFromSelector(state.nodes, source);
      sourceNodes.forEach(({ node, exists }) => {
        // If source Node is already in the editor, check if it's draggable
        if (exists) {
          _()
            .node(node.id)
            .isDraggable((err) => (output.error = err));
        }
      });
      // Check if source Node is droppable in target
      _()
        .node(targetParent.id)
        .isDroppable(source, (err) => (output.error = err));
      return output;
    },
    /**
     * Get the current Editor options
     */
    getOptions() {
      return options;
    },
    getNodes() {
      return state.nodes;
    },
    /**
     * Helper methods to describe the specified Node
     * @param id
     */
    node(id) {
      return NodeHelpers(state, id);
    },
    /**
     * Returns all the `nodes` in a serialized format
     */
    getSerializedNodes() {
      const nodePairs = Object.keys(state.nodes).map((id) => [
        id,
        this.node(id).toSerializedNode(),
      ]);
      return fromEntries(nodePairs);
    },
    getEvent(eventType) {
      return EventHelpers(state, eventType);
    },
    /**
     * Retrieve the JSON representation of the editor's Nodes
     */
    serialize() {
      return JSON.stringify(this.getSerializedNodes());
    },
    parseReactElement: (reactElement) => ({
      toNodeTree(normalize) {
        let node = parseNodeFromJSX(reactElement, (node, jsx) => {
          const name = resolveComponent(state.options.resolver, node.data.type);
          node.data.displayName = node.data.displayName || name;
          node.data.name = name;
          if (normalize) {
            normalize(node, jsx);
          }
        });
        let childrenNodes = [];
        if (reactElement.props && reactElement.props.children) {
          childrenNodes = React.Children.toArray(
            reactElement.props.children
          ).reduce((accum, child) => {
            if (React.isValidElement(child)) {
              accum.push(_().parseReactElement(child).toNodeTree(normalize));
            }
            return accum;
          }, []);
        }
        return mergeTrees(node, childrenNodes);
      },
    }),
    parseSerializedNode: (serializedNode) => ({
      toNode(normalize) {
        const data = deserializeNode(serializedNode, state.options.resolver);
        invariant(data.type, ERROR_NOT_IN_RESOLVER);
        const id = typeof normalize === 'string' && normalize;
        if (id) {
          deprecationWarning(`query.parseSerializedNode(...).toNode(id)`, {
            suggest: `query.parseSerializedNode(...).toNode(node => node.id = id)`,
          });
        }
        return _()
          .parseFreshNode({
            ...(id ? { id } : {}),
            data,
          })
          .toNode(!id && normalize);
      },
    }),
    parseFreshNode: (node) => ({
      toNode(normalize) {
        return createNode(node, (node) => {
          if (node.data.parent === DEPRECATED_ROOT_NODE) {
            node.data.parent = ROOT_NODE;
          }
          const name = resolveComponent(state.options.resolver, node.data.type);
          invariant(name !== null, ERROR_NOT_IN_RESOLVER);
          node.data.displayName = node.data.displayName || name;
          node.data.name = name;
          if (normalize) {
            normalize(node);
          }
        });
      },
    }),
    createNode(reactElement, extras) {
      deprecationWarning(`query.createNode(${reactElement})`, {
        suggest: `query.parseReactElement(${reactElement}).toNodeTree()`,
      });
      const tree = this.parseReactElement(reactElement).toNodeTree();
      const node = tree.nodes[tree.rootNodeId];
      if (!extras) {
        return node;
      }
      if (extras.id) {
        node.id = extras.id;
      }
      if (extras.data) {
        node.data = {
          ...node.data,
          ...extras.data,
        };
      }
      return node;
    },
    /**
     * Helper to get ids of the nodes the user is currently dragging a node over
     *
     * @example
     * ```
     * <div data-nodeid="ROOT">
     *   <div data-nodeid="node-1-1">
     *      <div data-nodeid="node-2-1">A</div>
     *      <div data-nodeid="node-2-2">B</div>
     *   </div>
     *   <div data-nodeid="node-1-2">C</div>
     * </div>
     * ```
     *
     * Let's use the code above as an example. Imagine a user would drag a node over the div with content A. The list that getDraggedOverNodes will return
     * would be `['node-2-1', 'node-1-1', 'ROOT']`
     *
     * @returns The list of the node ids the user is currently dragging a node over. Ordered "descending" by the depth in the node tree.
     * The lowest node the "ROOT" will be last element and deepest element (the one we are dragging over) will be first. In between we have the ancestors of the first element
     * ordered by their depth accordingly.
     */
    getDraggedOverNodes() {
      const draggedOverNodeId = Array.from(state.events.draggedOver)[0];
      if (draggedOverNodeId) {
        return new Set([
          draggedOverNodeId,
          ..._().node(draggedOverNodeId).ancestors(),
        ]);
      } else {
        return new Set();
      }
    },
    getState() {
      return state;
    },
  };
}

var CoreEventHandlers = /*#__PURE__*/ (function (_EventHandlers) {
  _inherits(CoreEventHandlers, _EventHandlers);
  var _super = _createSuper(CoreEventHandlers);
  function CoreEventHandlers() {
    _classCallCheck(this, CoreEventHandlers);
    return _super.apply(this, arguments);
  }
  _createClass(CoreEventHandlers, [
    {
      key: 'handlers',
      value: function handlers() {
        return {
          connect: function connect(el, id) {},
          select: function select(el, id) {},
          hover: function hover(el, id) {},
          drag: function drag(el, id) {},
          drop: function drop(el, id) {},
          create: function create(el, UserElement, options) {},
        };
      },
    },
  ]);
  return CoreEventHandlers;
})(EventHandlers);
var DerivedCoreEventHandlers = /*#__PURE__*/ (function (_DerivedEventHandlers) {
  _inherits(DerivedCoreEventHandlers, _DerivedEventHandlers);
  var _super2 = _createSuper(DerivedCoreEventHandlers);
  function DerivedCoreEventHandlers() {
    _classCallCheck(this, DerivedCoreEventHandlers);
    return _super2.apply(this, arguments);
  }
  return _createClass(DerivedCoreEventHandlers);
})(DerivedEventHandlers);

/**
 * Positioner is responsible for computing the drop Indicator during a sequence of drag-n-drop events
 */
var Positioner = /*#__PURE__*/ (function () {
  // Current Node being hovered on

  // Current closest Canvas Node relative to the currentDropTarget

  function Positioner(store, dragTarget) {
    _classCallCheck(this, Positioner);
    _defineProperty(this, 'store', void 0);
    _defineProperty(this, 'dragTarget', void 0);
    _defineProperty(this, 'currentDropTargetId', void 0);
    _defineProperty(this, 'currentDropTargetCanvasAncestorId', void 0);
    _defineProperty(this, 'currentIndicator', null);
    _defineProperty(this, 'currentTargetId', void 0);
    _defineProperty(this, 'currentTargetChildDimensions', void 0);
    _defineProperty(this, 'dragError', void 0);
    _defineProperty(this, 'draggedNodes', void 0);
    _defineProperty(this, 'onScrollListener', void 0);
    this.store = store;
    this.dragTarget = dragTarget;
    this.currentDropTargetId = null;
    this.currentDropTargetCanvasAncestorId = null;
    this.currentTargetId = null;
    this.currentTargetChildDimensions = null;
    this.currentIndicator = null;
    this.dragError = null;
    this.draggedNodes = this.getDraggedNodes();
    this.validateDraggedNodes();
    this.onScrollListener = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScrollListener, true);
  }
  _createClass(Positioner, [
    {
      key: 'cleanup',
      value: function cleanup() {
        window.removeEventListener('scroll', this.onScrollListener, true);
      },
    },
    {
      key: 'onScroll',
      value: function onScroll(e) {
        var scrollBody = e.target;
        var rootNode = this.store.query.node(ROOT_NODE).get();
        // Clear the currentTargetChildDimensions if the user has scrolled
        // Because we will have to recompute new dimensions relative to the new scroll pos
        var shouldClearChildDimensionsCache =
          scrollBody instanceof Element &&
          rootNode &&
          rootNode.dom &&
          scrollBody.contains(rootNode.dom);
        if (!shouldClearChildDimensionsCache) {
          return;
        }
        this.currentTargetChildDimensions = null;
      },
    },
    {
      key: 'getDraggedNodes',
      value: function getDraggedNodes() {
        if (this.dragTarget.type === 'new') {
          return getNodesFromSelector(
            this.store.query.getNodes(),
            this.dragTarget.tree.nodes[this.dragTarget.tree.rootNodeId]
          );
        }
        return getNodesFromSelector(
          this.store.query.getNodes(),
          this.dragTarget.nodes
        );
      },
      // Check if the elements being dragged are allowed to be dragged
    },
    {
      key: 'validateDraggedNodes',
      value: function validateDraggedNodes() {
        var _this = this;
        // We don't need to check for dragTarget.type = "new" because those nodes are not yet in the state (ie: via the .create() connector)
        if (this.dragTarget.type === 'new') {
          return;
        }
        this.draggedNodes.forEach(function (_ref) {
          var node = _ref.node,
            exists = _ref.exists;
          if (!exists) {
            return;
          }
          _this.store.query.node(node.id).isDraggable(function (err) {
            _this.dragError = err;
          });
        });
      },
    },
    {
      key: 'isNearBorders',
      value: function isNearBorders(domInfo, x, y) {
        var top = domInfo.top,
          bottom = domInfo.bottom,
          left = domInfo.left,
          right = domInfo.right;
        if (
          top + Positioner.BORDER_OFFSET > y ||
          bottom - Positioner.BORDER_OFFSET < y ||
          left + Positioner.BORDER_OFFSET > x ||
          right - Positioner.BORDER_OFFSET < x
        ) {
          return true;
        }
        return false;
      },
    },
    {
      key: 'isDiff',
      value: function isDiff(newPosition) {
        if (
          this.currentIndicator &&
          this.currentIndicator.placement.parent.id === newPosition.parent.id &&
          this.currentIndicator.placement.index === newPosition.index &&
          this.currentIndicator.placement.where === newPosition.where
        ) {
          return false;
        }
        return true;
      },
      /**
       * Get dimensions of every child Node in the specified parent Node
       */
    },
    {
      key: 'getChildDimensions',
      value: function getChildDimensions(newParentNode) {
        var _this2 = this;
        // Use previously computed child dimensions if newParentNode is the same as the previous one
        var existingTargetChildDimensions = this.currentTargetChildDimensions;
        if (
          this.currentTargetId === newParentNode.id &&
          existingTargetChildDimensions
        ) {
          return existingTargetChildDimensions;
        }
        return newParentNode.data.nodes.reduce(function (result, id) {
          var dom = _this2.store.query.node(id).get().dom;
          if (dom) {
            result.push(
              _objectSpread2(
                {
                  id: id,
                },
                getDOMInfo(dom)
              )
            );
          }
          return result;
        }, []);
      },
      /**
       * Get closest Canvas node relative to the dropTargetId
       * Return dropTargetId if it itself is a Canvas node
       *
       * In most cases it will be the dropTarget itself or its immediate parent.
       * We typically only need to traverse 2 levels or more if the dropTarget is a linked node
       *
       * TODO: We should probably have some special rules to handle linked nodes
       */
    },
    {
      key: 'getCanvasAncestor',
      value: function getCanvasAncestor(dropTargetId) {
        var _this3 = this;
        // If the dropTargetId is the same as the previous one
        // Return the canvas ancestor node that we found previuously
        if (
          dropTargetId === this.currentDropTargetId &&
          this.currentDropTargetCanvasAncestorId
        ) {
          var node = this.store.query
            .node(this.currentDropTargetCanvasAncestorId)
            .get();
          if (node) {
            return node;
          }
        }
        var getCanvas = function getCanvas(nodeId) {
          var node = _this3.store.query.node(nodeId).get();
          if (node && node.data.isCanvas) {
            return node;
          }
          if (!node.data.parent) {
            return null;
          }
          return getCanvas(node.data.parent);
        };
        return getCanvas(dropTargetId);
      },
      /**
       * Compute a new Indicator object based on the dropTarget and x,y coords
       * Returns null if theres no change from the previous Indicator
       */
    },
    {
      key: 'computeIndicator',
      value: function computeIndicator(dropTargetId, x, y) {
        var newParentNode = this.getCanvasAncestor(dropTargetId);
        if (!newParentNode) {
          return;
        }
        this.currentDropTargetId = dropTargetId;
        this.currentDropTargetCanvasAncestorId = newParentNode.id;
        // Get parent if we're hovering at the border of the current node
        if (
          newParentNode.data.parent &&
          this.isNearBorders(getDOMInfo(newParentNode.dom), x, y) &&
          // Ignore if linked node because there's won't be an adjacent sibling anyway
          !this.store.query.node(newParentNode.id).isLinkedNode()
        ) {
          newParentNode = this.store.query
            .node(newParentNode.data.parent)
            .get();
        }
        if (!newParentNode) {
          return;
        }
        this.currentTargetChildDimensions = this.getChildDimensions(
          newParentNode
        );
        this.currentTargetId = newParentNode.id;
        var position = findPosition(
          newParentNode,
          this.currentTargetChildDimensions,
          x,
          y
        );
        // Ignore if the position is similar as the previous one
        if (!this.isDiff(position)) {
          return;
        }
        var error = this.dragError;
        // Last thing to check for is if the dragged nodes can be dropped in the target area
        if (!error) {
          this.store.query.node(newParentNode.id).isDroppable(
            this.draggedNodes.map(function (sourceNode) {
              return sourceNode.node;
            }),
            function (dropError) {
              error = dropError;
            }
          );
        }
        var currentNodeId = newParentNode.data.nodes[position.index];
        var currentNode =
          currentNodeId && this.store.query.node(currentNodeId).get();
        this.currentIndicator = {
          placement: _objectSpread2(
            _objectSpread2({}, position),
            {},
            {
              currentNode: currentNode,
            }
          ),
          error: error,
        };
        return this.currentIndicator;
      },
    },
    {
      key: 'getIndicator',
      value: function getIndicator() {
        return this.currentIndicator;
      },
    },
  ]);
  return Positioner;
})();
_defineProperty(Positioner, 'BORDER_OFFSET', 10);

// TODO: this approach does not work with Safari
// Works partially with Linux (except on Chrome)
// We'll need an alternate way to create drag shadows
var createShadow = function createShadow(e, shadowsToCreate) {
  var forceSingleShadow =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (shadowsToCreate.length === 1 || forceSingleShadow) {
    var _shadowsToCreate$0$ge = shadowsToCreate[0].getBoundingClientRect(),
      width = _shadowsToCreate$0$ge.width,
      height = _shadowsToCreate$0$ge.height;
    var shadow = shadowsToCreate[0].cloneNode(true);
    shadow.style.position = 'fixed';
    shadow.style.left = '-100%';
    shadow.style.top = '-100%';
    shadow.style.width = ''.concat(width, 'px');
    shadow.style.height = ''.concat(height, 'px');
    shadow.style.pointerEvents = 'none';
    document.body.appendChild(shadow);
    e.dataTransfer.setDragImage(shadow, 0, 0);
    return shadow;
  }
  /**
   * If there's supposed to be multiple drag shadows, we will create a single container div to store them
   * That container will be used as the drag shadow for the current drag event
   */
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-100%';
  container.style.top = '-100%';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  shadowsToCreate.forEach(function (dom) {
    var _dom$getBoundingClien = dom.getBoundingClientRect(),
      width = _dom$getBoundingClien.width,
      height = _dom$getBoundingClien.height,
      top = _dom$getBoundingClien.top,
      left = _dom$getBoundingClien.left;
    var shadow = dom.cloneNode(true);
    shadow.style.position = 'absolute';
    shadow.style.left = ''.concat(left, 'px');
    shadow.style.top = ''.concat(top, 'px');
    shadow.style.width = ''.concat(width, 'px');
    shadow.style.height = ''.concat(height, 'px');
    container.appendChild(shadow);
  });
  document.body.appendChild(container);
  e.dataTransfer.setDragImage(container, e.clientX, e.clientY);
  return container;
};

/**
 * Specifies Editor-wide event handlers and connectors
 */
var DefaultEventHandlers = /*#__PURE__*/ (function (_CoreEventHandlers) {
  _inherits(DefaultEventHandlers, _CoreEventHandlers);
  var _super = _createSuper(DefaultEventHandlers);
  function DefaultEventHandlers() {
    var _this;
    _classCallCheck(this, DefaultEventHandlers);
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(
      _assertThisInitialized(_this),
      'draggedElementShadow',
      void 0
    );
    _defineProperty(_assertThisInitialized(_this), 'dragTarget', void 0);
    _defineProperty(_assertThisInitialized(_this), 'positioner', null);
    _defineProperty(
      _assertThisInitialized(_this),
      'currentSelectedElementIds',
      []
    );
    return _this;
  }
  _createClass(DefaultEventHandlers, [
    {
      key: 'onDisable',
      value: function onDisable() {
        this.options.store.actions.clearEvents();
      },
    },
    {
      key: 'handlers',
      value: function handlers() {
        var _this2 = this;
        var store = this.options.store;
        return {
          connect: function connect(el, id) {
            store.actions.setDOM(id, el);
            return _this2.reflect(function (connectors) {
              connectors.select(el, id);
              connectors.hover(el, id);
              connectors.drop(el, id);
            });
          },
          select: function select(el, id) {
            var unbindOnMouseDown = _this2.addCraftEventListener(
              el,
              'mousedown',
              function (e) {
                e.craft.stopPropagation();
                var newSelectedElementIds = [];
                if (id) {
                  var query = store.query;
                  var selectedElementIds = query.getEvent('selected').all();
                  var isMultiSelect = _this2.options.isMultiSelectEnabled(e);
                  /**
                   * Retain the previously select elements if the multi-select condition is enabled
                   * or if the currentNode is already selected
                   *
                   * so users can just click to drag the selected elements around without holding the multi-select key
                   */
                  if (isMultiSelect || selectedElementIds.includes(id)) {
                    newSelectedElementIds = selectedElementIds.filter(function (
                      selectedId
                    ) {
                      var descendants = query
                        .node(selectedId)
                        .descendants(true);
                      var ancestors = query.node(selectedId).ancestors(true);
                      // Deselect ancestors/descendants
                      if (descendants.includes(id) || ancestors.includes(id)) {
                        return false;
                      }
                      return true;
                    });
                  }
                  if (!newSelectedElementIds.includes(id)) {
                    newSelectedElementIds.push(id);
                  }
                }
                store.actions.setNodeEvent('selected', newSelectedElementIds);
              }
            );
            var unbindOnClick = _this2.addCraftEventListener(
              el,
              'click',
              function (e) {
                e.craft.stopPropagation();
                var query = store.query;
                var selectedElementIds = query.getEvent('selected').all();
                var isMultiSelect = _this2.options.isMultiSelectEnabled(e);
                var isNodeAlreadySelected = _this2.currentSelectedElementIds.includes(
                  id
                );
                var newSelectedElementIds = _toConsumableArray(
                  selectedElementIds
                );
                if (isMultiSelect && isNodeAlreadySelected) {
                  newSelectedElementIds.splice(
                    newSelectedElementIds.indexOf(id),
                    1
                  );
                  store.actions.setNodeEvent('selected', newSelectedElementIds);
                } else if (!isMultiSelect && selectedElementIds.length > 1) {
                  newSelectedElementIds = [id];
                  store.actions.setNodeEvent('selected', newSelectedElementIds);
                }
                _this2.currentSelectedElementIds = newSelectedElementIds;
              }
            );
            return function () {
              unbindOnMouseDown();
              unbindOnClick();
            };
          },
          hover: function hover(el, id) {
            var unbindMouseover = _this2.addCraftEventListener(
              el,
              'mouseover',
              function (e) {
                e.craft.stopPropagation();
                store.actions.setNodeEvent('hovered', id);
              }
            );
            return function () {
              unbindMouseover();
            };
          },
          drop: function drop(el, targetId) {
            var unbindDragOver = _this2.addCraftEventListener(
              el,
              'dragover',
              function (e) {
                e.craft.stopPropagation();
                e.preventDefault();
                if (!_this2.positioner) {
                  return;
                }
                var indicator = _this2.positioner.computeIndicator(
                  targetId,
                  e.clientX,
                  e.clientY
                );
                if (!indicator) {
                  return;
                }
                store.actions.setIndicator(indicator);
              }
            );
            var unbindDragEnter = _this2.addCraftEventListener(
              el,
              'dragenter',
              function (e) {
                store.actions.setNodeEvent('draggedOver', targetId);
                e.craft.stopPropagation();
                e.preventDefault();
              }
            );
            return function () {
              unbindDragEnter();
              unbindDragOver();
            };
          },
          drag: function drag(el, id) {
            if (!store.query.node(id).isDraggable()) {
              return function () {};
            }
            el.setAttribute('draggable', 'true');
            var unbindDragStart = _this2.addCraftEventListener(
              el,
              'dragstart',
              function (e) {
                e.craft.stopPropagation();
                var query = store.query,
                  actions = store.actions;
                var selectedElementIds = query.getEvent('selected').all();
                var isMultiSelect = _this2.options.isMultiSelectEnabled(e);
                var isNodeAlreadySelected = _this2.currentSelectedElementIds.includes(
                  id
                );
                if (!isNodeAlreadySelected) {
                  if (isMultiSelect) {
                    selectedElementIds = [].concat(
                      _toConsumableArray(selectedElementIds),
                      [id]
                    );
                  } else {
                    selectedElementIds = [id];
                  }
                  store.actions.setNodeEvent('selected', selectedElementIds);
                }
                actions.setNodeEvent('dragged', selectedElementIds);
                var selectedDOMs = selectedElementIds.map(function (id) {
                  return query.node(id).get().dom;
                });
                _this2.draggedElementShadow = createShadow(
                  e,
                  selectedDOMs,
                  DefaultEventHandlers.forceSingleDragShadow
                );
                _this2.dragTarget = {
                  type: 'existing',
                  nodes: selectedElementIds,
                };
                _this2.positioner = new Positioner(
                  _this2.options.store,
                  _this2.dragTarget
                );
              }
            );
            var unbindDragEnd = _this2.addCraftEventListener(
              el,
              'dragend',
              function (e) {
                e.craft.stopPropagation();
                _this2.dropElement(function (dragTarget, indicator) {
                  if (dragTarget.type === 'new') {
                    return;
                  }
                  var index =
                    indicator.placement.index +
                    (indicator.placement.where === 'after' ? 1 : 0);
                  store.actions.move(
                    dragTarget.nodes,
                    indicator.placement.parent.id,
                    index
                  );
                });
              }
            );
            return function () {
              el.setAttribute('draggable', 'false');
              unbindDragStart();
              unbindDragEnd();
            };
          },
          create: function create(el, userElement, options) {
            el.setAttribute('draggable', 'true');
            var unbindDragStart = _this2.addCraftEventListener(
              el,
              'dragstart',
              function (e) {
                e.craft.stopPropagation();
                var tree;
                if (typeof userElement === 'function') {
                  var result = userElement();
                  if (React.isValidElement(result)) {
                    tree = store.query.parseReactElement(result).toNodeTree();
                  } else {
                    tree = result;
                  }
                } else {
                  tree = store.query
                    .parseReactElement(userElement)
                    .toNodeTree();
                }
                var dom = e.currentTarget;
                _this2.draggedElementShadow = createShadow(
                  e,
                  [dom],
                  DefaultEventHandlers.forceSingleDragShadow
                );
                _this2.dragTarget = {
                  type: 'new',
                  tree: tree,
                };
                _this2.positioner = new Positioner(
                  _this2.options.store,
                  _this2.dragTarget
                );
              }
            );
            var unbindDragEnd = _this2.addCraftEventListener(
              el,
              'dragend',
              function (e) {
                e.craft.stopPropagation();
                _this2.dropElement(function (dragTarget, indicator) {
                  if (dragTarget.type === 'existing') {
                    return;
                  }
                  var index =
                    indicator.placement.index +
                    (indicator.placement.where === 'after' ? 1 : 0);
                  store.actions.addNodeTree(
                    dragTarget.tree,
                    indicator.placement.parent.id,
                    index
                  );
                  if (options && isFunction(options.onCreate)) {
                    options.onCreate(dragTarget.tree);
                  }
                });
              }
            );
            return function () {
              el.removeAttribute('draggable');
              unbindDragStart();
              unbindDragEnd();
            };
          },
        };
      },
    },
    {
      key: 'dropElement',
      value: function dropElement(onDropNode) {
        var store = this.options.store;
        if (!this.positioner) {
          return;
        }
        var draggedElementShadow = this.draggedElementShadow;
        var indicator = this.positioner.getIndicator();
        if (this.dragTarget && indicator && !indicator.error) {
          onDropNode(this.dragTarget, indicator);
        }
        if (draggedElementShadow) {
          draggedElementShadow.parentNode.removeChild(draggedElementShadow);
          this.draggedElementShadow = null;
        }
        this.dragTarget = null;
        store.actions.setIndicator(null);
        store.actions.setNodeEvent('dragged', null);
        store.actions.setNodeEvent('draggedOver', null);
        this.positioner.cleanup();
        this.positioner = null;
      },
    },
  ]);
  return DefaultEventHandlers;
})(CoreEventHandlers);
_defineProperty(
  DefaultEventHandlers,
  'forceSingleDragShadow',
  isChromium() && isLinux()
);

function movePlaceholder(
  pos,
  canvasDOMInfo,
  // which canvas is cursor at
  bestTargetDomInfo
) {
  var thickness =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var t = 0,
    l = 0,
    w = 0,
    h = 0,
    where = pos.where;
  var elDim = bestTargetDomInfo;
  if (elDim) {
    // If it's not in flow (like 'float' element)
    if (!elDim.inFlow) {
      w = thickness;
      h = elDim.outerHeight;
      t = elDim.top;
      l = where === 'before' ? elDim.left : elDim.left + elDim.outerWidth;
    } else {
      w = elDim.outerWidth;
      h = thickness;
      t = where === 'before' ? elDim.top : elDim.bottom;
      l = elDim.left;
    }
  } else {
    if (canvasDOMInfo) {
      t = canvasDOMInfo.top + canvasDOMInfo.padding.top;
      l = canvasDOMInfo.left + canvasDOMInfo.padding.left;
      w =
        canvasDOMInfo.outerWidth -
        canvasDOMInfo.padding.right -
        canvasDOMInfo.padding.left -
        canvasDOMInfo.margin.left -
        canvasDOMInfo.margin.right;
      h = thickness;
    }
  }
  return {
    top: ''.concat(t, 'px'),
    left: ''.concat(l, 'px'),
    width: ''.concat(w, 'px'),
    height: ''.concat(h, 'px'),
  };
}

const RenderEditorIndicator = () => {
  const { indicator, indicatorOptions, enabled } = useInternalEditor(
    (state) => ({
      indicator: state.indicator,
      indicatorOptions: state.options.indicator,
      enabled: state.options.enabled,
    })
  );
  const handler = useEventHandler();
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!enabled) {
      handler.disable();
      return;
    }
    handler.enable();
  }, [enabled, handler]);
  if (!indicator) {
    return null;
  }
  return React.createElement(RenderIndicator, {
    style: {
      ...movePlaceholder(
        indicator.placement,
        getDOMInfo(indicator.placement.parent.dom),
        indicator.placement.currentNode &&
          getDOMInfo(indicator.placement.currentNode.dom),
        indicatorOptions.thickness
      ),
      backgroundColor: indicator.error
        ? indicatorOptions.error
        : indicatorOptions.success,
      transition: indicatorOptions.transition || '0.2s ease-in',
    },
    parentDom: indicator.placement.parent.dom,
  });
};

const Events = ({ children }) => {
  const store = useContext(EditorContext);
  const handler = useMemo(() => store.query.getOptions().handlers(store), [
    store,
  ]);
  if (!handler) {
    return null;
  }
  return React.createElement(
    EventHandlerContext.Provider,
    { value: handler },
    React.createElement(RenderEditorIndicator, null),
    children
  );
};

const editorInitialState = {
  nodes: {},
  events: {
    dragged: new Set(),
    selected: new Set(),
    hovered: new Set(),
    draggedOver: new Set(),
  },
  indicator: null,
  options: {
    onNodesChange: () => null,
    onRender: ({ render }) => render,
    onBeforeMoveEnd: () => null,
    resolver: {},
    enabled: true,
    indicator: {
      error: 'red',
      success: 'rgb(98, 196, 98)',
    },
    handlers: (store) =>
      new DefaultEventHandlers({
        store,
        isMultiSelectEnabled: (e) => !!e.metaKey,
      }),
    normalizeNodes: () => {},
  },
};
const ActionMethodsWithConfig = {
  methods: ActionMethods,
  ignoreHistoryForActions: [
    'setDOM',
    'setNodeEvent',
    'selectNode',
    'hoverNode',
    'clearEvents',
    'setOptions',
    'setIndicator',
  ],
  normalizeHistory: (state) => {
    /**
     * On every undo/redo, we remove events pointing to deleted Nodes
     */
    Object.keys(state.events).forEach((eventName) => {
      const nodeIds = Array.from(state.events[eventName] || []);
      nodeIds.forEach((id) => {
        if (!state.nodes[id]) {
          state.events[eventName].delete(id);
        }
      });
    });
    // Remove any invalid node[nodeId].events
    // TODO(prev): it's really cumbersome to have to ensure state.events and state.nodes[nodeId].events are in sync
    // Find a way to make it so that once state.events is set, state.nodes[nodeId] automatically reflects that (maybe using proxies?)
    Object.keys(state.nodes).forEach((id) => {
      const node = state.nodes[id];
      Object.keys(node.events).forEach((eventName) => {
        const isEventActive = !!node.events[eventName];
        if (
          isEventActive &&
          state.events[eventName] &&
          !state.events[eventName].has(node.id)
        ) {
          node.events[eventName] = false;
        }
      });
    });
  },
};
const useEditorStore = (options, patchListener) => {
  // TODO: fix type
  return useMethods(
    ActionMethodsWithConfig,
    {
      ...editorInitialState,
      options: {
        ...editorInitialState.options,
        ...options,
      },
    },
    QueryMethods,
    patchListener
  );
};

/**
 * A React Component that provides the Editor context
 */
const Editor = ({ children, ...options }) => {
  // we do not want to warn the user if no resolver was supplied
  if (options.resolver !== undefined) {
    invariant(
      typeof options.resolver === 'object' && !Array.isArray(options.resolver),
      ERROR_RESOLVER_NOT_AN_OBJECT
    );
  }
  const optionsRef = useRef(options);
  const context = useEditorStore(
    optionsRef.current,
    (state, previousState, actionPerformedWithPatches, query, normalizer) => {
      if (!actionPerformedWithPatches) {
        return;
      }
      const { patches, ...actionPerformed } = actionPerformedWithPatches;
      for (let i = 0; i < patches.length; i++) {
        const { path } = patches[i];
        const isModifyingNodeData =
          path.length > 2 && path[0] === 'nodes' && path[2] === 'data';
        let actionType = actionPerformed.type;
        if (
          [HISTORY_ACTIONS.IGNORE, HISTORY_ACTIONS.THROTTLE].includes(
            actionType
          ) &&
          actionPerformed.params
        ) {
          actionPerformed.type = actionPerformed.params[0];
        }
        if (
          ['setState', 'deserialize'].includes(actionPerformed.type) ||
          isModifyingNodeData
        ) {
          normalizer((draft) => {
            if (state.options.normalizeNodes) {
              state.options.normalizeNodes(
                draft,
                previousState,
                actionPerformed,
                query
              );
            }
          });
          break; // we exit the loop as soon as we find a change in node.data
        }
      }
    }
  );
  // sync enabled prop with editor store options
  useEffect(() => {
    if (!context || !options) {
      return;
    }
    if (
      options.enabled === undefined ||
      context.query.getOptions().enabled === options.enabled
    ) {
      return;
    }
    context.actions.setOptions((editorOptions) => {
      editorOptions.enabled = options.enabled;
    });
  }, [context, options.enabled]);
  useEffect(() => {
    context.subscribe(
      (_) => ({
        json: context.query.serialize(),
      }),
      () => {
        context.query.getOptions().onNodesChange(context.query);
      }
    );
  }, [context]);
  return context
    ? React.createElement(
        EditorContext.Provider,
        { value: context },
        React.createElement(Events, null, children)
      )
    : null;
};

var _excluded = ['events', 'data'],
  _excluded2 = ['nodes'],
  _excluded3 = ['nodes'],
  _excluded4 = ['_hydrationTimestamp', 'rules'],
  _excluded5 = ['_hydrationTimestamp', 'rules'];
var getTestNode = function getTestNode(parentNode) {
  var _parentNode = parentNode,
    events = _parentNode.events,
    _parentNode$data = _parentNode.data,
    childNodes = _parentNode$data.nodes,
    linkedNodes = _parentNode$data.linkedNodes,
    restParentNode = _objectWithoutProperties(_parentNode, _excluded);
  var validParentNode = createNode(cloneDeep(parentNode));
  parentNode = _objectSpread2(
    _objectSpread2(_objectSpread2({}, validParentNode), restParentNode),
    {},
    {
      events: _objectSpread2(
        _objectSpread2({}, validParentNode.events),
        events
      ),
      dom: parentNode.dom || validParentNode.dom,
    }
  );
  return {
    node: parentNode,
    childNodes: childNodes,
    linkedNodes: linkedNodes,
  };
};
var expectEditorState = function expectEditorState(lhs, rhs) {
  var nodesRhs = rhs.nodes,
    restRhs = _objectWithoutProperties(rhs, _excluded2);
  var nodesLhs = lhs.nodes,
    restLhs = _objectWithoutProperties(lhs, _excluded3);
  expect(restLhs).toEqual(restRhs);
  var nodesRhsSimplified = Object.keys(nodesRhs).reduce(function (accum, id) {
    var _nodesRhs$id = nodesRhs[id];
    _nodesRhs$id._hydrationTimestamp;
    _nodesRhs$id.rules;
    var node = _objectWithoutProperties(_nodesRhs$id, _excluded4);
    accum[id] = node;
    return accum;
  }, {});
  var nodesLhsSimplified = Object.keys(nodesLhs).reduce(function (accum, id) {
    var _nodesLhs$id = nodesLhs[id];
    _nodesLhs$id._hydrationTimestamp;
    _nodesLhs$id.rules;
    var node = _objectWithoutProperties(_nodesLhs$id, _excluded5);
    accum[id] = node;
    return accum;
  }, {});
  expect(nodesLhsSimplified).toEqual(nodesRhsSimplified);
};
var createTestNodes = function createTestNodes(rootNode) {
  var nodes = {};
  var iterateNodes = function iterateNodes(testNode) {
    var _getTestNode = getTestNode(testNode),
      parentNode = _getTestNode.node,
      childNodes = _getTestNode.childNodes,
      linkedNodes = _getTestNode.linkedNodes;
    nodes[parentNode.id] = parentNode;
    if (childNodes) {
      childNodes.forEach(function (childTestNode, i) {
        var _getTestNode2 = getTestNode(childTestNode),
          childNode = _getTestNode2.node,
          grandChildNodes = _getTestNode2.childNodes,
          grandChildLinkedNodes = _getTestNode2.linkedNodes;
        childNode.data.parent = parentNode.id;
        nodes[childNode.id] = childNode;
        parentNode.data.nodes[i] = childNode.id;
        iterateNodes(
          _objectSpread2(
            _objectSpread2({}, childNode),
            {},
            {
              data: _objectSpread2(
                _objectSpread2({}, childNode.data),
                {},
                {
                  nodes: grandChildNodes || [],
                  linkedNodes: grandChildLinkedNodes || {},
                }
              ),
            }
          )
        );
      });
    }
    if (linkedNodes) {
      Object.keys(linkedNodes).forEach(function (linkedId) {
        var _getTestNode3 = getTestNode(linkedNodes[linkedId]),
          childNode = _getTestNode3.node,
          grandChildNodes = _getTestNode3.childNodes,
          grandChildLinkedNodes = _getTestNode3.linkedNodes;
        parentNode.data.linkedNodes[linkedId] = childNode.id;
        childNode.data.parent = parentNode.id;
        nodes[childNode.id] = childNode;
        iterateNodes(
          _objectSpread2(
            _objectSpread2({}, childNode),
            {},
            {
              data: _objectSpread2(
                _objectSpread2({}, childNode.data),
                {},
                {
                  nodes: grandChildNodes || [],
                  linkedNodes: grandChildLinkedNodes || {},
                }
              ),
            }
          )
        );
      });
    }
  };
  iterateNodes(rootNode);
  return nodes;
};
var createTestState = function createTestState() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rootNode = state.nodes,
    events = state.events;
  return _objectSpread2(
    _objectSpread2(_objectSpread2({}, editorInitialState), state),
    {},
    {
      nodes: rootNode ? createTestNodes(rootNode) : {},
      events: _objectSpread2(
        _objectSpread2({}, editorInitialState.events),
        events || {}
      ),
    }
  );
};

export {
  ActionMethodsWithConfig,
  Canvas,
  CoreEventHandlers,
  DefaultEventHandlers,
  DerivedCoreEventHandlers,
  Editor,
  Element$1 as Element,
  Events,
  Frame,
  NodeElement,
  NodeHelpers,
  NodeProvider,
  NodeSelectorType,
  QueryMethods,
  connectEditor,
  connectNode,
  createTestNodes,
  createTestState,
  defaultElementProps,
  deprecateCanvasComponent,
  editorInitialState,
  elementPropToNodeData,
  expectEditorState,
  serializeNode,
  useEditor,
  useEditorStore,
  useEventHandler,
  useNode,
};
