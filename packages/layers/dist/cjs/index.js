'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@craftjs/utils');
var React = require('react');
var core = require('@craftjs/core');
var styled = require('styled-components');
var ContentEditable = require('react-contenteditable');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              }
        );
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var styled__default = /*#__PURE__*/ _interopDefaultLegacy(styled);
var ContentEditable__default = /*#__PURE__*/ _interopDefaultLegacy(
  ContentEditable
);

const LayerContext = React__default['default'].createContext({});

const LayerManagerContext = React.createContext({});

function useLayerManager(collector) {
  const { store } = React.useContext(LayerManagerContext);
  const collected = utils.useCollector(store, collector);
  return React.useMemo(
    () => ({
      store,
      ...collected,
    }),
    [store, collected]
  );
}

function useLayer(collect) {
  const { id, depth, connectors: internalConnectors } = React.useContext(
    LayerContext
  );
  const { actions: managerActions, ...collected } = useLayerManager((state) => {
    return id && state.layers[id] && collect && collect(state.layers[id]);
  });
  const { children } = core.useEditor((state, query) => ({
    children: state.nodes[id] && query.node(id).descendants(),
  }));
  const actions = React.useMemo(() => {
    return {
      toggleLayer: () => managerActions.toggleLayer(id),
      setExpandedState: (expanded) =>
        managerActions.setExpandedState(id, expanded),
    };
  }, [managerActions, id]);
  const connectors = React.useMemo(
    () =>
      utils.wrapConnectorHooks({
        layer: (el) => internalConnectors.layer(el, id),
        drag: (el) => internalConnectors.drag(el, id),
        layerHeader: (el) => internalConnectors.layerHeader(el, id),
      }),
    [internalConnectors, id]
  );
  return {
    id,
    depth,
    children,
    actions,
    connectors,
    ...collected,
  };
}

const LayerNode = () => {
  const { id, depth, children, expanded } = useLayer((layer) => ({
    expanded: layer.expanded,
  }));
  const { data, shouldBeExpanded } = core.useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const selected = query.getEvent('selected').first();
    return {
      data: state.nodes[id] && state.nodes[id].data,
      shouldBeExpanded:
        selected && query.node(selected).ancestors(true).includes(id),
    };
  });
  const {
    actions: { registerLayer, toggleLayer },
    renderLayer,
    expandRootOnLoad,
  } = useLayerManager((state) => ({
    renderLayer: state.options.renderLayer,
    expandRootOnLoad: state.options.expandRootOnLoad,
  }));
  const [isRegistered, setRegistered] = React.useState(false);
  React.useLayoutEffect(() => {
    registerLayer(id);
    setRegistered(true);
  }, [registerLayer, id]);
  const expandedRef = React.useRef(expanded);
  expandedRef.current = expanded;
  const shouldBeExpandedOnLoad = React.useRef(
    expandRootOnLoad && id === core.ROOT_NODE
  );
  React.useEffect(() => {
    if (!expandedRef.current && shouldBeExpanded) {
      toggleLayer(id);
    }
  }, [toggleLayer, id, shouldBeExpanded]);
  React.useEffect(() => {
    if (shouldBeExpandedOnLoad.current) {
      toggleLayer(id);
    }
  }, [toggleLayer, id]);
  return data && isRegistered
    ? React__default['default'].createElement(
        'div',
        { className: `craft-layer-node ${id}` },
        React__default['default'].createElement(
          renderLayer,
          {},
          children && expanded
            ? children.map((id) =>
                React__default['default'].createElement(LayerContextProvider, {
                  key: id,
                  id: id,
                  depth: depth + 1,
                })
              )
            : null
        )
      )
    : null;
};

const LayerEventHandlerContext = React.createContext(null);
const useLayerEventHandler = () => React.useContext(LayerEventHandlerContext);

const LayerContextProvider = ({ id, depth }) => {
  const handlers = useLayerEventHandler();
  const { store } = React.useContext(LayerManagerContext);
  const storeRef = React.useRef(store);
  storeRef.current = store;
  const connectorsUsage = React.useMemo(
    () => handlers.createConnectorsUsage(),
    [handlers]
  );
  const connectors = React.useMemo(
    () => utils.wrapConnectorHooks(connectorsUsage.connectors),
    [connectorsUsage]
  );
  React.useEffect(() => {
    connectorsUsage.register();
    return () => {
      connectorsUsage.cleanup();
    };
  }, [connectorsUsage]);
  const { exists } = core.useEditor((state) => ({
    exists: !!state.nodes[id],
  }));
  if (!exists) {
    return null;
  }
  return React__default['default'].createElement(
    LayerContext.Provider,
    { value: { id, depth, connectors } },
    React__default['default'].createElement(LayerNode, null)
  );
};

const LayerMethods = (state) => ({
  setLayerEvent: (eventType, id) => {
    if (id !== null && !state.layers[id]) return;
    const current = state.events[eventType];
    if (current && id !== current) {
      state.layers[current].event[eventType] = false;
    }
    if (id) {
      state.layers[id].event[eventType] = true;
      state.events[eventType] = id;
    } else {
      state.events[eventType] = null;
    }
  },
  registerLayer: (id) => {
    if (!state.layers[id]) {
      state.layers[id] = {
        dom: null,
        headingDom: null,
        expanded: false,
        id,
        event: {
          selected: false,
          hovered: false,
        },
      };
    }
  },
  setDOM: (id, domCollection) => {
    state.layers[id] = {
      ...state.layers[id],
      ...(domCollection.dom ? { dom: domCollection.dom } : {}),
      ...(domCollection.headingDom
        ? { headingDom: domCollection.headingDom }
        : {}),
    };
  },
  toggleLayer: (id) => {
    state.layers[id].expanded = !state.layers[id].expanded;
  },
  setExpandedState: (id, expanded) => {
    state.layers[id].expanded = expanded;
  },
  setIndicator: (indicator) => {
    state.events.indicator = indicator;
  },
});

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

var LayerHandlers = /*#__PURE__*/ (function (_DerivedCoreEventHand) {
  _inherits(LayerHandlers, _DerivedCoreEventHand);
  var _super = _createSuper(LayerHandlers);
  function LayerHandlers() {
    _classCallCheck(this, LayerHandlers);
    return _super.apply(this, arguments);
  }
  _createClass(LayerHandlers, [
    {
      key: 'getLayer',
      value: function getLayer(id) {
        return this.options.layerStore.getState().layers[id];
      },
    },
    {
      key: 'handlers',
      value: function handlers() {
        var _this = this;
        var editorStore = this.derived.options.store;
        var layerStore = this.options.layerStore;
        return {
          layer: function layer(el, layerId) {
            layerStore.actions.setDOM(layerId, {
              dom: el,
            });
            var cleanupParentConnectors = _this.inherit(function (connectors) {
              connectors.select(el, layerId);
              connectors.hover(el, layerId);
              connectors.drag(el, layerId);
            });
            var unbindMouseOver = _this.addCraftEventListener(
              el,
              'mouseover',
              function (e) {
                e.craft.stopPropagation();
                layerStore.actions.setLayerEvent('hovered', layerId);
              }
            );
            var unbindDragOver = _this.addCraftEventListener(
              el,
              'dragover',
              function (e) {
                e.craft.stopPropagation();
                e.preventDefault();
                var _LayerHandlers$events = LayerHandlers.events,
                  indicator = _LayerHandlers$events.indicator,
                  currentCanvasHovered =
                    _LayerHandlers$events.currentCanvasHovered;
                if (
                  currentCanvasHovered &&
                  indicator &&
                  currentCanvasHovered.data.nodes
                ) {
                  var heading = _this
                    .getLayer(currentCanvasHovered.id)
                    .headingDom.getBoundingClientRect();
                  if (
                    e.clientY > heading.top + 10 &&
                    e.clientY < heading.bottom - 10
                  ) {
                    var currNode =
                      currentCanvasHovered.data.nodes[
                        currentCanvasHovered.data.nodes.length - 1
                      ];
                    if (!currNode) {
                      return;
                    }
                    LayerHandlers.events.indicator = _objectSpread2(
                      _objectSpread2({}, indicator),
                      {},
                      {
                        placement: {
                          currentNode: editorStore.query.node(currNode).get(),
                          index: currentCanvasHovered.data.nodes.length,
                          where: 'after',
                          parent: currentCanvasHovered,
                        },
                        onCanvas: true,
                      }
                    );
                    layerStore.actions.setIndicator(
                      LayerHandlers.events.indicator
                    );
                  }
                }
              }
            );
            var unbindDragEnter = _this.addCraftEventListener(
              el,
              'dragenter',
              function (e) {
                e.craft.stopPropagation();
                e.preventDefault();
                var dragId = LayerHandlers.draggedElement;
                if (!dragId) return;
                var target = layerId;
                var indicatorInfo = editorStore.query.getDropPlaceholder(
                  dragId,
                  target,
                  {
                    x: e.clientX,
                    y: e.clientY,
                  },
                  function (node) {
                    var layer = _this.getLayer(node.id);
                    return layer && layer.dom;
                  }
                );
                if (indicatorInfo) {
                  var parent = indicatorInfo.placement.parent;
                  var parentHeadingInfo = _this
                    .getLayer(parent.id)
                    .headingDom.getBoundingClientRect();
                  LayerHandlers.events.currentCanvasHovered = null;
                  if (editorStore.query.node(parent.id).isCanvas()) {
                    if (parent.data.parent) {
                      var grandparent = editorStore.query
                        .node(parent.data.parent)
                        .get();
                      if (editorStore.query.node(grandparent.id).isCanvas()) {
                        LayerHandlers.events.currentCanvasHovered = parent;
                        if (
                          (e.clientY > parentHeadingInfo.bottom - 10 &&
                            !_this.getLayer(parent.id).expanded) ||
                          e.clientY < parentHeadingInfo.top + 10
                        ) {
                          indicatorInfo.placement.parent = grandparent;
                          indicatorInfo.placement.currentNode = parent;
                          indicatorInfo.placement.index = grandparent.data.nodes
                            ? grandparent.data.nodes.indexOf(parent.id)
                            : 0;
                          if (
                            e.clientY > parentHeadingInfo.bottom - 10 &&
                            !_this.getLayer(parent.id).expanded
                          ) {
                            indicatorInfo.placement.where = 'after';
                          } else if (e.clientY < parentHeadingInfo.top + 10) {
                            indicatorInfo.placement.where = 'before';
                          }
                        }
                      }
                    }
                  }
                  LayerHandlers.events.indicator = _objectSpread2(
                    _objectSpread2({}, indicatorInfo),
                    {},
                    {
                      onCanvas: false,
                    }
                  );
                  layerStore.actions.setIndicator(
                    LayerHandlers.events.indicator
                  );
                }
              }
            );
            return function () {
              cleanupParentConnectors();
              unbindMouseOver();
              unbindDragOver();
              unbindDragEnter();
            };
          },
          layerHeader: function layerHeader(el, layerId) {
            layerStore.actions.setDOM(layerId, {
              headingDom: el,
            });
          },
          drag: function drag(el, layerId) {
            el.setAttribute('draggable', 'true');
            var unbindDragStart = _this.addCraftEventListener(
              el,
              'dragstart',
              function (e) {
                e.craft.stopPropagation();
                LayerHandlers.draggedElement = layerId;
              }
            );
            var unbindDragEnd = _this.addCraftEventListener(
              el,
              'dragend',
              function (e) {
                e.craft.stopPropagation();
                var events = LayerHandlers.events;
                if (events.indicator && !events.indicator.error) {
                  var placement = events.indicator.placement;
                  var parent = placement.parent,
                    index = placement.index,
                    where = placement.where;
                  var parentId = parent.id;
                  editorStore.actions.move(
                    LayerHandlers.draggedElement,
                    parentId,
                    index + (where === 'after' ? 1 : 0)
                  );
                }
                LayerHandlers.draggedElement = null;
                LayerHandlers.events.indicator = null;
                layerStore.actions.setIndicator(null);
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
  ]);
  return LayerHandlers;
})(core.DerivedCoreEventHandlers);
_defineProperty(LayerHandlers, 'draggedElement', void 0);
_defineProperty(LayerHandlers, 'events', {
  indicator: null,
  currentCanvasHovered: null,
});

const RenderLayerIndicator = ({ children }) => {
  const { layers, events } = useLayerManager((state) => state);
  const { query } = core.useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const { indicator: indicatorStyles } = query.getOptions();
  const indicatorPosition = React.useMemo(() => {
    const { indicator } = events;
    if (indicator) {
      const {
        placement: { where, parent, currentNode },
        error,
      } = indicator;
      const layerId = currentNode ? currentNode.id : parent.id;
      let top;
      const color = error ? indicatorStyles.error : indicatorStyles.success;
      if (indicator.onCanvas && layers[parent.id].dom != null) {
        const parentPos = layers[parent.id].dom.getBoundingClientRect();
        const parentHeadingPos = layers[
          parent.id
        ].headingDom.getBoundingClientRect();
        return {
          top: parentHeadingPos.top,
          left: parentPos.left,
          width: parentPos.width,
          height: parentHeadingPos.height,
          background: 'transparent',
          borderWidth: '1px',
          borderColor: color,
        };
      } else {
        if (!layers[layerId]) return;
        const headingPos = layers[layerId].headingDom.getBoundingClientRect();
        const pos = layers[layerId].dom.getBoundingClientRect();
        if (where === 'after' || !currentNode) {
          top = pos.top + pos.height;
        } else {
          top = pos.top;
        }
        return {
          top,
          left: headingPos.left,
          width: pos.width + pos.left - headingPos.left,
          height: 2,
          borderWidth: 0,
          background: color,
        };
      }
    }
  }, [events, indicatorStyles.error, indicatorStyles.success, layers]);
  return React__default['default'].createElement(
    'div',
    null,
    events.indicator
      ? React__default['default'].createElement(utils.RenderIndicator, {
          style: indicatorPosition,
        })
      : null,
    children
  );
};

const LayerEventContextProvider = ({ children }) => {
  const { store: layerStore } = useLayerManager();
  const coreEventHandler = core.useEventHandler();
  const handler = React.useMemo(
    () =>
      coreEventHandler.derive(LayerHandlers, {
        layerStore,
      }),
    [coreEventHandler, layerStore]
  );
  return React__default['default'].createElement(
    LayerEventHandlerContext.Provider,
    { value: handler },
    React__default['default'].createElement(RenderLayerIndicator, null),
    children
  );
};

const EditableLayerName = () => {
  const { id } = useLayer();
  const { displayName, actions } = core.useEditor((state) => ({
    displayName:
      state.nodes[id] && state.nodes[id].data.custom.displayName
        ? state.nodes[id].data.custom.displayName
        : state.nodes[id].data.displayName,
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
  }));
  const [editingName, setEditingName] = React.useState(false);
  const nameDOM = React.useRef(null);
  const clickOutside = React.useCallback((e) => {
    if (nameDOM.current && !nameDOM.current.contains(e.target)) {
      setEditingName(false);
    }
  }, []);
  React.useEffect(() => {
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [clickOutside]);
  return React__default['default'].createElement(
    ContentEditable__default['default'],
    {
      html: displayName,
      disabled: !editingName,
      ref: (ref) => {
        if (ref) {
          nameDOM.current = ref.el.current;
          window.removeEventListener('click', clickOutside);
          window.addEventListener('click', clickOutside);
        }
      },
      onChange: (e) => {
        actions.setCustom(
          id,
          (custom) => (custom.displayName = e.target.value)
        );
      },
      tagName: 'h2',
      onDoubleClick: () => {
        if (!editingName) setEditingName(true);
      },
    }
  );
};

var _path$2;
function _extends$2() {
  _extends$2 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends$2.apply(this, arguments);
}
var SvgArrow = function SvgArrow(props) {
  return /*#__PURE__*/ React__namespace.createElement(
    'svg',
    _extends$2(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 10 6',
      },
      props
    ),
    _path$2 ||
      (_path$2 = /*#__PURE__*/ React__namespace.createElement('path', {
        d:
          'M9.99 1.01A1 1 0 0 0 8.283.303L5 3.586 1.717.303A1 1 0 1 0 .303 1.717l3.99 3.98a1 1 0 0 0 1.414 0l3.99-3.98a.997.997 0 0 0 .293-.707Z',
      }))
  );
};

var _path$1, _path2$1;
function _extends$1() {
  _extends$1 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends$1.apply(this, arguments);
}
var SvgEye = function SvgEye(props) {
  return /*#__PURE__*/ React__namespace.createElement(
    'svg',
    _extends$1(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 16,
        height: 16,
      },
      props
    ),
    _path$1 ||
      (_path$1 = /*#__PURE__*/ React__namespace.createElement('path', {
        fill: 'none',
        d: 'M0 0h24v24H0z',
      })),
    _path2$1 ||
      (_path2$1 = /*#__PURE__*/ React__namespace.createElement('path', {
        d:
          'M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
      }))
  );
};

var _path, _path2;
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}
var SvgLinked = function SvgLinked(props) {
  return /*#__PURE__*/ React__namespace.createElement(
    'svg',
    _extends(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 18 18',
      },
      props
    ),
    _path ||
      (_path = /*#__PURE__*/ React__namespace.createElement('path', {
        className: 'linked_svg__a',
        d:
          'M16.5 9h-1a.5.5 0 0 0-.5.5V15H3V3h5.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Z',
      })),
    _path2 ||
      (_path2 = /*#__PURE__*/ React__namespace.createElement('path', {
        className: 'linked_svg__a',
        d:
          'M16.75 1h-5.373a.4.4 0 0 0-.377.4.392.392 0 0 0 .117.28l1.893 1.895-3.52 3.521a.5.5 0 0 0 0 .707l.706.708a.5.5 0 0 0 .708 0l3.521-3.521 1.893 1.892A.39.39 0 0 0 16.6 7a.4.4 0 0 0 .4-.377V1.25a.25.25 0 0 0-.25-.25Z',
      }))
  );
};

const StyledDiv = styled__default['default'].div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  background: ${(props) => (props.selected ? '#2680eb' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : 'inherit')};
  svg {
    fill: ${(props) => (props.selected ? '#fff' : '#808184')};
    margin-top: 2px;
  }
  .inner {
    flex: 1;
    > div {
      padding: 0px;
      flex: 1;
      display: flex;
      margin-left: ${(props) => props.depth * 10}px;
      align-items: center;
      div.layer-name {
        flex: 1;
        h2 {
          font-size: 15px;
          line-height: 26px;
        }
      }
    }
  }
`;
const Expand = styled__default['default'].a`
  width: 8px;
  height: 8px;
  display: block;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  transform: rotate(${(props) => (props.expanded ? 180 : 0)}deg);
  opacity: 0.7;
  cursor: pointer;
  transform-origin: 60% center;
`;
const Hide = styled__default['default'].a`
  width: 14px;
  height: 14px;
  margin-right: 10px;
  position: relative;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: ${(props) => (props.isHidden ? 0.2 : 1)};
  }
  &:after {
    content: ' ';
    width: 2px;
    height: ${(props) => (props.isHidden ? 100 : 0)}%;
    position: absolute;
    left: 2px;
    top: 3px;
    background: ${(props) => (props.selected ? '#fff' : '#808184')};
    transform: rotate(-45deg);
    transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: 0% 0%;
    opacity: ${(props) => (props.isHidden ? 0.4 : 1)};
  }
`;
const TopLevelIndicator = styled__default['default'].div`
  margin-left: -22px;
  margin-right: 10px;

  svg {
    width: 12px;
    height: 12px;
  }
`;
const DefaultLayerHeader = () => {
  const {
    id,
    depth,
    expanded,
    children,
    connectors: { drag, layerHeader },
    actions: { toggleLayer },
  } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });
  const { hidden, actions, selected, topLevel } = core.useEditor(
    (state, query) => {
      // TODO: handle multiple selected elements
      const selected = query.getEvent('selected').first() === id;
      return {
        hidden: state.nodes[id] && state.nodes[id].data.hidden,
        selected,
        topLevel: query.node(id).isTopLevelCanvas(),
      };
    }
  );
  return React__default['default'].createElement(
    StyledDiv,
    { selected: selected, ref: drag, depth: depth },
    React__default['default'].createElement(
      Hide,
      {
        selected: selected,
        isHidden: hidden,
        onClick: () => actions.setHidden(id, !hidden),
      },
      React__default['default'].createElement(SvgEye, null)
    ),
    React__default['default'].createElement(
      'div',
      { className: 'inner' },
      React__default['default'].createElement(
        'div',
        { ref: layerHeader },
        topLevel
          ? React__default['default'].createElement(
              TopLevelIndicator,
              null,
              React__default['default'].createElement(SvgLinked, null)
            )
          : null,
        React__default['default'].createElement(
          'div',
          { className: 'layer-name s' },
          React__default['default'].createElement(EditableLayerName, null)
        ),
        React__default['default'].createElement(
          'div',
          null,
          children && children.length
            ? React__default['default'].createElement(
                Expand,
                { expanded: expanded, onMouseDown: () => toggleLayer() },
                React__default['default'].createElement(SvgArrow, null)
              )
            : null
        )
      )
    )
  );
};

const LayerNodeDiv = styled__default['default'].div`
  background: ${(props) => (props.hovered ? '#f1f1f1' : 'transparent')};
  display: block;
  padding-bottom: ${(props) => (props.hasCanvases && props.expanded ? 5 : 0)}px;
`;
const LayerChildren = styled__default['default'].div`
  margin: 0 0 0 ${(props) => (props.hasCanvases ? 35 : 0)}px;
  background: ${(props) =>
    props.hasCanvases ? 'rgba(255, 255, 255, 0.02)' : 'transparent'};
  position: relative;

  ${(props) =>
    props.hasCanvases
      ? `
  
  box-shadow: 0px 0px 44px -1px #00000014;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom:5px;
  margin-top:5px; 
  > * { overflow:hidden; }
    &:before { 
      position:absolute;
      left:-19px;
      width: 2px;
      height:100%;
      content: " ";
      background:#00000012;
    }
  `
      : ''}
`;
const DefaultLayer = ({ children }) => {
  const {
    id,
    expanded,
    hovered,
    connectors: { layer },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));
  const { hasChildCanvases } = core.useEditor((state, query) => {
    return {
      hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
    };
  });
  return React__default['default'].createElement(
    LayerNodeDiv,
    {
      ref: layer,
      expanded: expanded,
      hasCanvases: hasChildCanvases,
      hovered: hovered,
    },
    React__default['default'].createElement(DefaultLayerHeader, null),
    children
      ? React__default['default'].createElement(
          LayerChildren,
          { hasCanvases: hasChildCanvases, className: 'craft-layer-children' },
          children
        )
      : null
  );
};

const LayerManagerProvider = ({ children, options }) => {
  // TODO: fix type
  const store = utils.useMethods(LayerMethods, {
    layers: {},
    events: {
      selected: null,
      dragged: null,
      hovered: null,
    },
    options: {
      renderLayer: DefaultLayer,
      ...options,
    },
  });
  return React__default['default'].createElement(
    LayerManagerContext.Provider,
    { value: { store } },
    React__default['default'].createElement(
      LayerEventContextProvider,
      null,
      children
    )
  );
};

const Layers = ({ ...options }) => {
  return React__default['default'].createElement(
    LayerManagerProvider,
    { options: options },
    React__default['default'].createElement(LayerContextProvider, {
      id: utils.ROOT_NODE,
      depth: 0,
    })
  );
};

exports.DefaultLayer = DefaultLayer;
exports.DefaultLayerHeader = DefaultLayerHeader;
exports.EditableLayerName = EditableLayerName;
exports.Layers = Layers;
exports.useLayer = useLayer;
