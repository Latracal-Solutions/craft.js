'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = require('@craftjs/utils'),
  t = require('react'),
  n = require('tiny-invariant'),
  r = require('lodash'),
  o = require('lodash/cloneDeep');
function a(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e };
}
var i = a(t),
  d = a(n),
  s = a(o);
const c = i.default.createContext(null),
  u = ({ id: e, related: t = !1, children: n }) =>
    i.default.createElement(c.Provider, { value: { id: e, related: t } }, n);
function l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function f(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? l(Object(n), !0).forEach(function (t) {
          g(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : l(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
  }
  return e;
}
function p(e) {
  return (
    (p =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          }),
    p(e)
  );
}
function v(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, C(r.key), r);
  }
}
function y(e, t, n) {
  return (
    t && h(e.prototype, t),
    n && h(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function g(e, t, n) {
  return (
    (t = C(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function E(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && O(e, t);
}
function m(e) {
  return (
    (m = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    m(e)
  );
}
function O(e, t) {
  return (
    (O = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        }),
    O(e, t)
  );
}
function N(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = (function (e, t) {
      if (null == e) return {};
      var n,
        r,
        o = {},
        a = Object.keys(e);
      for (r = 0; r < a.length; r++)
        t.indexOf((n = a[r])) >= 0 || (o[n] = e[n]);
      return o;
    })(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      t.indexOf((n = a[r])) >= 0 ||
        (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
  }
  return o;
}
function b(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function R(e) {
  var t = (function () {
    if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ('function' == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (e) {
      return !1;
    }
  })();
  return function () {
    var n,
      r = m(e);
    if (t) {
      var o = m(this).constructor;
      n = Reflect.construct(r, arguments, o);
    } else n = r.apply(this, arguments);
    return (function (e, t) {
      if (t && ('object' == typeof t || 'function' == typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        );
      return b(e);
    })(this, n);
  };
}
function T(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return _(e);
    })(e) ||
    (function (e) {
      if (
        ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e['@@iterator']
      )
        return Array.from(e);
    })(e) ||
    D(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    })()
  );
}
function D(e, t) {
  if (e) {
    if ('string' == typeof e) return _(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === n && e.constructor && (n = e.constructor.name),
      'Map' === n || 'Set' === n
        ? Array.from(e)
        : 'Arguments' === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? _(e, t)
        : void 0
    );
  }
}
function _(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function C(e) {
  var t = (function (e, t) {
    if ('object' != typeof e || null === e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
      var r = n.call(e, 'string');
      if ('object' != typeof r) return r;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return String(e);
  })(e);
  return 'symbol' == typeof t ? t : String(t);
}
const I = t.createContext(null);
var S = t.createContext(null),
  x = function () {
    return t.useContext(S);
  };
function w(n) {
  var r = x(),
    o = t.useContext(I);
  d.default(o, e.ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT);
  var a = e.useCollector(o, n),
    i = t.useMemo(
      function () {
        return r && r.createConnectorsUsage();
      },
      [r]
    );
  t.useEffect(
    function () {
      return (
        i.register(),
        function () {
          i.cleanup();
        }
      );
    },
    [i]
  );
  var s = t.useMemo(
    function () {
      return i && e.wrapConnectorHooks(i.connectors);
    },
    [i]
  );
  return f(f({}, a), {}, { connectors: s, inContext: !!o, store: o });
}
var k = ['actions', 'query', 'connectors'];
function j(n) {
  var r = t.useContext(c);
  d.default(r, e.ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT);
  var o = r.id,
    a = r.related,
    i = w(function (e) {
      return o && e.nodes[o] && n && n(e.nodes[o]);
    }),
    s = i.actions,
    u = i.connectors,
    l = N(i, k),
    p = t.useMemo(
      function () {
        return e.wrapConnectorHooks({
          connect: function (e) {
            return u.connect(e, o);
          },
          drag: function (e) {
            return u.drag(e, o);
          },
        });
      },
      [u, o]
    ),
    v = t.useMemo(
      function () {
        return {
          setProp: function (e, t) {
            t ? s.history.throttle(t).setProp(o, e) : s.setProp(o, e);
          },
          setCustom: function (e, t) {
            t ? s.history.throttle(t).setCustom(o, e) : s.setCustom(o, e);
          },
          setHidden: function (e) {
            return s.setHidden(o, e);
          },
        };
      },
      [s, o]
    );
  return f(
    f({}, l),
    {},
    { id: o, related: a, inNodeContext: !!r, actions: v, connectors: p }
  );
}
var P = ['id', 'related', 'actions', 'inNodeContext', 'connectors'];
function A(t) {
  var n = j(t),
    r = n.id,
    o = n.related,
    a = n.actions,
    i = n.inNodeContext,
    d = n.connectors;
  return f(
    f({}, N(n, P)),
    {},
    {
      actions: a,
      id: r,
      related: o,
      setProp: function (t, n) {
        return (
          e.deprecationWarning('useNode().setProp()', {
            suggest: 'useNode().actions.setProp()',
          }),
          a.setProp(t, n)
        );
      },
      inNodeContext: i,
      connectors: d,
    }
  );
}
const L = ({ render: e }) => {
    const {
      connectors: { connect: t, drag: n },
    } = A();
    return 'string' == typeof e.type ? t(n(i.default.cloneElement(e))) : e;
  },
  M = () => {
    const { type: e, props: n, nodes: r, hydrationTimestamp: o } = j((e) => ({
      type: e.data.type,
      props: e.data.props,
      nodes: e.data.nodes,
      hydrationTimestamp: e._hydrationTimestamp,
    }));
    return t.useMemo(() => {
      let t = n.children;
      r &&
        r.length > 0 &&
        (t = i.default.createElement(
          i.default.Fragment,
          null,
          r.map((e) => i.default.createElement(V, { id: e, key: e }))
        ));
      const o = i.default.createElement(e, n, t);
      return 'string' == typeof e
        ? i.default.createElement(L, { render: o })
        : o;
    }, [e, n, o, r]);
  },
  q = ({ render: e }) => {
    const { hidden: t } = j((e) => ({ hidden: e.data.hidden })),
      { onRender: n } = w((e) => ({ onRender: e.options.onRender }));
    return t
      ? null
      : i.default.createElement(n, {
          render: e || i.default.createElement(M, null),
        });
  },
  V = ({ id: e, render: t }) =>
    i.default.createElement(
      u,
      { id: e },
      i.default.createElement(q, { render: t })
    ),
  F = { is: 'div', canvas: !1, custom: {}, hidden: !1 },
  H = { is: 'type', canvas: 'isCanvas' };
function z({ id: n, children: r, ...o }) {
  const { is: a } = { ...F, ...o },
    { query: s, actions: c } = w(),
    { node: u, inNodeContext: l } = j((e) => ({
      node: { id: e.id, data: e.data },
    })),
    [f, p] = t.useState(null);
  return (
    e.useEffectOnce(() => {
      d.default(!!n, e.ERROR_TOP_LEVEL_ELEMENT_NO_ID);
      const { id: t, data: f } = u;
      if (l) {
        let e;
        const d =
          f.linkedNodes && f.linkedNodes[n] && s.node(f.linkedNodes[n]).get();
        if (d && d.data.type === a) e = d.id;
        else {
          const a = i.default.createElement(z, o, r),
            d = s.parseReactElement(a).toNodeTree();
          (e = d.rootNodeId), c.history.ignore().addLinkedNodeFromTree(d, t, n);
        }
        p(e);
      }
    }),
    f ? i.default.createElement(V, { id: f }) : null
  );
}
const B = () =>
  e.deprecationWarning('<Canvas />', { suggest: '<Element canvas={true} />' });
function Canvas({ ...e }) {
  return (
    t.useEffect(() => B(), []), i.default.createElement(z, { ...e, canvas: !0 })
  );
}
const W = () => {
  const { timestamp: t } = w((t) => ({
    timestamp: t.nodes[e.ROOT_NODE] && t.nodes[e.ROOT_NODE]._hydrationTimestamp,
  }));
  return t ? i.default.createElement(V, { id: e.ROOT_NODE, key: t }) : null;
};
var U;
(exports.NodeSelectorType = void 0),
  ((U = exports.NodeSelectorType || (exports.NodeSelectorType = {}))[
    (U.Any = 0)
  ] = 'Any'),
  (U[(U.Id = 1)] = 'Id'),
  (U[(U.Obj = 2)] = 'Obj');
const $ = (e) => {
  const {
    addLinkedNodeFromTree: t,
    setDOM: n,
    setNodeEvent: r,
    replaceNodes: o,
    reset: a,
    ...i
  } = e;
  return i;
};
function G(e) {
  const { connectors: n, actions: r, query: o, store: a, ...i } = w(e),
    d = $(r);
  return {
    connectors: n,
    actions: t.useMemo(
      () => ({
        ...d,
        history: {
          ...d.history,
          ignore: (...e) => $(d.history.ignore(...e)),
          throttle: (...e) => $(d.history.throttle(...e)),
        },
      }),
      [d]
    ),
    query: o,
    store: a,
    ...i,
  };
}
var X = function (e) {
    return Object.fromEntries
      ? Object.fromEntries(e)
      : e.reduce(function (e, t) {
          var n,
            r =
              (function (e) {
                if (Array.isArray(e)) return e;
              })((n = t)) ||
              (function (e, t) {
                var n =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                      e['@@iterator'];
                if (null != n) {
                  var r,
                    o,
                    a,
                    i,
                    d = [],
                    s = !0,
                    c = !1;
                  try {
                    for (
                      a = (n = n.call(e)).next;
                      !(s = (r = a.call(n)).done) &&
                      (d.push(r.value), 2 !== d.length);
                      s = !0
                    );
                  } catch (e) {
                    (c = !0), (o = e);
                  } finally {
                    try {
                      if (
                        !s &&
                        null != n.return &&
                        ((i = n.return()), Object(i) !== i)
                      )
                        return;
                    } finally {
                      if (c) throw o;
                    }
                  }
                  return d;
                }
              })(n) ||
              D(n, 2) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
              })(),
            o = r[0],
            a = r[1];
          return f(f({}, e), {}, g({}, o, a));
        }, {});
  },
  Y = function (t, n, r) {
    var o = Array.isArray(n) ? n : [n],
      a = f({ existOnly: !1, idOnly: !1 }, r || {}),
      i = o
        .filter(function (e) {
          return !!e;
        })
        .map(function (e) {
          return 'string' == typeof e
            ? { node: t[e], exists: !!t[e] }
            : 'object' !== p(e) || a.idOnly
            ? { node: null, exists: !1 }
            : { node: e, exists: !!t[e.id] };
        });
    return (
      a.existOnly &&
        d.default(
          0 ===
            i.filter(function (e) {
              return !e.exists;
            }).length,
          e.ERROR_INVALID_NODEID
        ),
      i
    );
  },
  J = ['history'],
  K = function (t, n) {
    var r = n.name || n.displayName,
      o = (function () {
        if (t[r]) return r;
        for (var e = 0; e < Object.keys(t).length; e++) {
          var o = Object.keys(t)[e];
          if (t[o] === n) return o;
        }
        return 'string' == typeof n ? n : void 0;
      })();
    return d.default(o, e.ERROR_NOT_IN_RESOLVER.replace('%node_type%', r)), o;
  };
const Q = (e, t) => ('string' == typeof e ? e : { resolvedName: K(t, e) }),
  Z = (e, n) => {
    let { type: r, isCanvas: o, props: a } = e;
    return (
      (a = Object.keys(a).reduce((e, r) => {
        const o = a[r];
        return (
          null == o ||
            'function' == typeof o ||
            (e[r] =
              'children' === r && 'string' != typeof o
                ? t.Children.map(o, (e) => ('string' == typeof e ? e : Z(e, n)))
                : 'function' == typeof o.type
                ? Z(o, n)
                : o),
          e
        );
      }, {})),
      { type: Q(r, n), isCanvas: !!o, props: a }
    );
  },
  ee = (e, t) => {
    const { type: n, props: r, isCanvas: o, name: a, ...i } = e;
    return { ...Z({ type: n, isCanvas: o, props: r }, t), ...i };
  };
function te(t, n) {
  d.default('string' == typeof n, e.ERROR_INVALID_NODE_ID);
  var r = t.nodes[n],
    o = function (e) {
      return te(t, e);
    };
  return {
    isCanvas: function () {
      return !!r.data.isCanvas;
    },
    isRoot: function () {
      return r.id === e.ROOT_NODE;
    },
    isLinkedNode: function () {
      return r.data.parent && o(r.data.parent).linkedNodes().includes(r.id);
    },
    isTopLevelNode: function () {
      return this.isRoot() || this.isLinkedNode();
    },
    isDeletable: function () {
      return !this.isTopLevelNode();
    },
    isParentOfTopLevelNodes: function () {
      return r.data.linkedNodes && Object.keys(r.data.linkedNodes).length > 0;
    },
    isParentOfTopLevelCanvas: function () {
      return (
        e.deprecationWarning('query.node(id).isParentOfTopLevelCanvas', {
          suggest: 'query.node(id).isParentOfTopLevelNodes',
        }),
        this.isParentOfTopLevelNodes()
      );
    },
    isSelected: function () {
      return t.events.selected.has(n);
    },
    isHovered: function () {
      return t.events.hovered.has(n);
    },
    isDragged: function () {
      return t.events.dragged.has(n);
    },
    get: function () {
      return r;
    },
    ancestors: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return (function n(r) {
        var o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          a =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          i = t.nodes[r];
        return i
          ? (o.push(r),
            i.data.parent
              ? ((e || (!e && 0 === a)) && (o = n(i.data.parent, o, a + 1)), o)
              : o)
          : o;
      })(r.data.parent);
    },
    descendants: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        r = arguments.length > 1 ? arguments[1] : void 0;
      return (function n(a) {
        var i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          d =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        return (e || (!e && 0 === d)) && t.nodes[a]
          ? ('childNodes' !== r &&
              o(a)
                .linkedNodes()
                .forEach(function (e) {
                  i.push(e), (i = n(e, i, d + 1));
                }),
            'linkedNodes' !== r &&
              o(a)
                .childNodes()
                .forEach(function (e) {
                  i.push(e), (i = n(e, i, d + 1));
                }),
            i)
          : i;
      })(n);
    },
    linkedNodes: function () {
      return Object.values(r.data.linkedNodes || {});
    },
    childNodes: function () {
      return r.data.nodes || [];
    },
    isDraggable: function (n) {
      try {
        var a = r;
        return (
          d.default(!this.isTopLevelNode(), e.ERROR_MOVE_TOP_LEVEL_NODE),
          d.default(
            te(t, a.data.parent).isCanvas(),
            e.ERROR_MOVE_NONCANVAS_CHILD
          ),
          d.default(a.rules.canDrag(a, o), e.ERROR_CANNOT_DRAG),
          !0
        );
      } catch (e) {
        return n && n(e), !1;
      }
    },
    isDroppable: function (n, a) {
      var i = Y(t.nodes, n),
        s = r;
      try {
        d.default(this.isCanvas(), e.ERROR_MOVE_TO_NONCANVAS_PARENT),
          d.default(
            s.rules.canMoveIn(
              i.map(function (e) {
                return e.node;
              }),
              s,
              o
            ),
            e.ERROR_MOVE_INCOMING_PARENT
          );
        var c = {};
        return (
          i.forEach(function (n) {
            var r = n.node,
              a = n.exists;
            if (
              (d.default(r.rules.canDrop(s, r, o), e.ERROR_MOVE_CANNOT_DROP), a)
            ) {
              d.default(!o(r.id).isTopLevelNode(), e.ERROR_MOVE_TOP_LEVEL_NODE);
              var i = o(r.id).descendants(!0);
              d.default(
                !i.includes(s.id) && s.id !== r.id,
                e.ERROR_MOVE_TO_DESCENDANT
              );
              var u = r.data.parent && t.nodes[r.data.parent];
              d.default(u.data.isCanvas, e.ERROR_MOVE_NONCANVAS_CHILD),
                d.default(
                  u || (!u && !t.nodes[r.id]),
                  e.ERROR_DUPLICATE_NODEID
                ),
                u.id !== s.id && (c[u.id] || (c[u.id] = []), c[u.id].push(r));
            }
          }),
          Object.keys(c).forEach(function (n) {
            var r = t.nodes[n];
            d.default(
              r.rules.canMoveOut(c[n], r, o),
              e.ERROR_MOVE_OUTGOING_PARENT
            );
          }),
          !0
        );
      } catch (e) {
        return a && a(e), !1;
      }
    },
    toSerializedNode: function () {
      return ee(r.data, t.options.resolver);
    },
    toNodeTree: function (e) {
      var t = [n].concat(T(this.descendants(!0, e))).reduce(function (e, t) {
        return (e[t] = o(t).get()), e;
      }, {});
      return { rootNodeId: n, nodes: t };
    },
    decendants: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return (
        e.deprecationWarning('query.node(id).decendants', {
          suggest: 'query.node(id).descendants',
        }),
        this.descendants(t)
      );
    },
    isTopLevelCanvas: function () {
      return !this.isRoot() && !r.data.parent;
    },
  };
}
function ne(e, t, n, r) {
  for (
    var o = { parent: e, index: 0, where: 'before' },
      a = 0,
      i = 0,
      d = 0,
      s = 0,
      c = 0,
      u = 0,
      l = 0,
      f = t.length;
    l < f;
    l++
  ) {
    var p = t[l];
    if (
      ((u = p.top + p.outerHeight),
      (s = p.left + p.outerWidth / 2),
      (c = p.top + p.outerHeight / 2),
      !((i && p.left > i) || (d && c >= d) || (a && p.left + p.outerWidth < a)))
    )
      if (((o.index = l), p.inFlow)) {
        if (r < c) {
          o.where = 'before';
          break;
        }
        o.where = 'after';
      } else
        r < u && (d = u),
          n < s
            ? ((i = s), (o.where = 'before'))
            : ((a = s), (o.where = 'after'));
  }
  return o;
}
var re = function (e) {
  return 'string' == typeof e ? e : e.name;
};
function oe(t, n) {
  var r = t.data.type,
    o = {
      id: t.id || e.getRandomId(),
      _hydrationTimestamp: Date.now(),
      data: f(
        {
          type: r,
          name: re(r),
          displayName: re(r),
          props: {},
          custom: {},
          parent: null,
          isCanvas: !1,
          hidden: !1,
          nodes: [],
          linkedNodes: {},
        },
        t.data
      ),
      related: {},
      events: { selected: !1, dragged: !1, hovered: !1, draggedOver: !1 },
      rules: {
        canDrag: function () {
          return !0;
        },
        canDrop: function () {
          return !0;
        },
        canMoveIn: function () {
          return !0;
        },
        canMoveOut: function () {
          return !0;
        },
      },
      dom: null,
    };
  if (o.data.type === z || o.data.type === Canvas) {
    var a = f(f({}, F), o.data.props);
    (o.data.props = Object.keys(o.data.props).reduce(function (e, t) {
      return (
        Object.keys(F).includes(t)
          ? (o.data[H[t] || t] = a[t])
          : (e[t] = o.data.props[t]),
        e
      );
    }, {})),
      (o.data.name = re((r = o.data.type))),
      (o.data.displayName = re(r)),
      o.data.type === Canvas && ((o.data.isCanvas = !0), B());
  }
  n && n(o);
  var d = r.craft;
  if (
    d &&
    ((o.data.displayName = d.displayName || d.name || o.data.displayName),
    (o.data.props = f(f({}, d.props || d.defaultProps || {}), o.data.props)),
    (o.data.custom = f(f({}, d.custom || {}), o.data.custom)),
    null != d.isCanvas && (o.data.isCanvas = d.isCanvas),
    d.rules &&
      Object.keys(d.rules).forEach(function (e) {
        ['canDrag', 'canDrop', 'canMoveIn', 'canMoveOut'].includes(e) &&
          (o.rules[e] = d.rules[e]);
      }),
    d.related)
  ) {
    var s = { id: o.id, related: !0 };
    Object.keys(d.related).forEach(function (e) {
      o.related[e] = function (t) {
        return i.default.createElement(
          u,
          s,
          i.default.createElement(d.related[e], t)
        );
      };
    });
  }
  return o;
}
const ae = (e, t, n) => {
    let { type: r, props: o } = e;
    const a = ((e, t) =>
      'object' == typeof e && e.resolvedName
        ? 'Canvas' === e.resolvedName
          ? Canvas
          : t[e.resolvedName]
        : 'string' == typeof e
        ? e
        : null)(r, t);
    if (!a) return;
    (o = Object.keys(o).reduce((e, n) => {
      const r = o[n];
      return (
        (e[n] =
          null == r
            ? null
            : 'object' == typeof r && r.resolvedName
            ? ae(r, t)
            : 'children' === n && Array.isArray(r)
            ? r.map((e) => ('string' == typeof e ? e : ae(e, t)))
            : r),
        e
      );
    }, {})),
      n && (o.key = n);
    const d = { ...i.default.createElement(a, { ...o }) };
    return { ...d, name: K(t, d.type) };
  },
  ie = (t, n) => {
    const { type: r, props: o, ...a } = t;
    d.default(
      (void 0 !== r && 'string' == typeof r) ||
        (void 0 !== r && void 0 !== r.resolvedName),
      e.ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER.replace(
        '%displayName%',
        t.displayName
      ).replace('%availableComponents%', Object.keys(n).join(', '))
    );
    const { type: i, name: s, props: c } = ae(t, n),
      {
        parent: u,
        custom: l,
        displayName: f,
        isCanvas: p,
        nodes: v,
        hidden: h,
      } = a;
    return {
      type: i,
      name: s,
      displayName: f || s,
      props: c,
      custom: l || {},
      isCanvas: !!p,
      hidden: !!h,
      parent: u,
      linkedNodes: a.linkedNodes || a._childCanvas || {},
      nodes: v || [],
    };
  },
  de = (e, t) => {
    if (t.length < 1) return { [e.id]: e };
    const n = t.map(({ rootNodeId: e }) => e),
      r = { ...e, data: { ...e.data, nodes: n } };
    return t.reduce(
      (t, n) => {
        const r = n.nodes[n.rootNodeId];
        return {
          ...t,
          ...n.nodes,
          [r.id]: { ...r, data: { ...r.data, parent: e.id } },
        };
      },
      { [e.id]: r }
    );
  },
  se = (e, t) => ({ rootNodeId: e.id, nodes: de(e, t) });
function ce(n) {
  const r = n && n.options,
    o = () => ce(n);
  return {
    getDropPlaceholder: (t, r, a, i = (e) => n.nodes[e.id].dom) => {
      const d = n.nodes[r],
        s = o().node(d.id).isCanvas() ? d : n.nodes[d.data.parent];
      if (!s) return;
      const c = s.data.nodes || [],
        u = ne(
          s,
          c
            ? c.reduce((t, r) => {
                const o = i(n.nodes[r]);
                if (o) {
                  const n = { id: r, ...e.getDOMInfo(o) };
                  t.push(n);
                }
                return t;
              }, [])
            : [],
          a.x,
          a.y
        ),
        l = c.length && n.nodes[c[u.index]],
        f = { placement: { ...u, currentNode: l }, error: null };
      return (
        Y(n.nodes, t).forEach(({ node: e, exists: t }) => {
          t &&
            o()
              .node(e.id)
              .isDraggable((e) => (f.error = e));
        }),
        o()
          .node(s.id)
          .isDroppable(t, (e) => (f.error = e)),
        f
      );
    },
    getOptions: () => r,
    getNodes: () => n.nodes,
    node: (e) => te(n, e),
    getSerializedNodes() {
      const e = Object.keys(n.nodes).map((e) => [
        e,
        this.node(e).toSerializedNode(),
      ]);
      return X(e);
    },
    getEvent: (e) =>
      (function (e, t) {
        var n = e.events[t];
        return {
          contains: function (e) {
            return n.has(e);
          },
          isEmpty: function () {
            return 0 === this.all().length;
          },
          first: function () {
            return this.all()[0];
          },
          last: function () {
            var e = this.all();
            return e[e.length - 1];
          },
          all: function () {
            return Array.from(n);
          },
          size: function () {
            return this.all().length;
          },
          at: function (e) {
            return this.all()[e];
          },
          raw: function () {
            return n;
          },
        };
      })(n, e),
    serialize() {
      return JSON.stringify(this.getSerializedNodes());
    },
    parseReactElement: (e) => ({
      toNodeTree(r) {
        let a = (function (e, n) {
            let r = e;
            return (
              'string' == typeof r &&
                (r = i.default.createElement(t.Fragment, {}, r)),
              oe({ data: { type: r.type, props: { ...r.props } } }, (e) => {
                n && n(e, r);
              })
            );
          })(e, (e, t) => {
            const o = K(n.options.resolver, e.data.type);
            (e.data.displayName = e.data.displayName || o),
              (e.data.name = o),
              r && r(e, t);
          }),
          d = [];
        return (
          e.props &&
            e.props.children &&
            (d = i.default.Children.toArray(e.props.children).reduce(
              (e, t) => (
                i.default.isValidElement(t) &&
                  e.push(o().parseReactElement(t).toNodeTree(r)),
                e
              ),
              []
            )),
          se(a, d)
        );
      },
    }),
    parseSerializedNode: (t) => ({
      toNode(r) {
        const a = ie(t, n.options.resolver);
        d.default(a.type, e.ERROR_NOT_IN_RESOLVER);
        const i = 'string' == typeof r && r;
        return (
          i &&
            e.deprecationWarning('query.parseSerializedNode(...).toNode(id)', {
              suggest:
                'query.parseSerializedNode(...).toNode(node => node.id = id)',
            }),
          o()
            .parseFreshNode({ ...(i ? { id: i } : {}), data: a })
            .toNode(!i && r)
        );
      },
    }),
    parseFreshNode: (t) => ({
      toNode: (r) =>
        oe(t, (t) => {
          t.data.parent === e.DEPRECATED_ROOT_NODE &&
            (t.data.parent = e.ROOT_NODE);
          const o = K(n.options.resolver, t.data.type);
          d.default(null !== o, e.ERROR_NOT_IN_RESOLVER),
            (t.data.displayName = t.data.displayName || o),
            (t.data.name = o),
            r && r(t);
        }),
    }),
    createNode(t, n) {
      e.deprecationWarning(`query.createNode(${t})`, {
        suggest: `query.parseReactElement(${t}).toNodeTree()`,
      });
      const r = this.parseReactElement(t).toNodeTree(),
        o = r.nodes[r.rootNodeId];
      return n
        ? (n.id && (o.id = n.id),
          n.data && (o.data = { ...o.data, ...n.data }),
          o)
        : o;
    },
    getDraggedOverNodes() {
      const e = Array.from(n.events.draggedOver)[0];
      return e ? new Set([e, ...o().node(e).ancestors()]) : new Set();
    },
    getState: () => n,
  };
}
var ue = (function (t) {
    E(r, e.EventHandlers);
    var n = R(r);
    function r() {
      return v(this, r), n.apply(this, arguments);
    }
    return (
      y(r, [
        {
          key: 'handlers',
          value: function () {
            return {
              connect: function (e, t) {},
              select: function (e, t) {},
              hover: function (e, t) {},
              drag: function (e, t) {},
              drop: function (e, t) {},
              create: function (e, t, n) {},
            };
          },
        },
      ]),
      r
    );
  })(),
  le = (function (t) {
    E(r, e.DerivedEventHandlers);
    var n = R(r);
    function r() {
      return v(this, r), n.apply(this, arguments);
    }
    return y(r);
  })(),
  fe = (function () {
    function t(e, n) {
      v(this, t),
        g(this, 'store', void 0),
        g(this, 'dragTarget', void 0),
        g(this, 'currentDropTargetId', void 0),
        g(this, 'currentDropTargetCanvasAncestorId', void 0),
        g(this, 'currentIndicator', null),
        g(this, 'currentTargetId', void 0),
        g(this, 'currentTargetChildDimensions', void 0),
        g(this, 'dragError', void 0),
        g(this, 'draggedNodes', void 0),
        g(this, 'onScrollListener', void 0),
        (this.store = e),
        (this.dragTarget = n),
        (this.currentDropTargetId = null),
        (this.currentDropTargetCanvasAncestorId = null),
        (this.currentTargetId = null),
        (this.currentTargetChildDimensions = null),
        (this.currentIndicator = null),
        (this.dragError = null),
        (this.draggedNodes = this.getDraggedNodes()),
        this.validateDraggedNodes(),
        (this.onScrollListener = this.onScroll.bind(this)),
        window.addEventListener('scroll', this.onScrollListener, !0);
    }
    return (
      y(t, [
        {
          key: 'cleanup',
          value: function () {
            window.removeEventListener('scroll', this.onScrollListener, !0);
          },
        },
        {
          key: 'onScroll',
          value: function (t) {
            var n = t.target,
              r = this.store.query.node(e.ROOT_NODE).get();
            n instanceof Element &&
              r &&
              r.dom &&
              n.contains(r.dom) &&
              (this.currentTargetChildDimensions = null);
          },
        },
        {
          key: 'getDraggedNodes',
          value: function () {
            return Y(
              this.store.query.getNodes(),
              'new' === this.dragTarget.type
                ? this.dragTarget.tree.nodes[this.dragTarget.tree.rootNodeId]
                : this.dragTarget.nodes
            );
          },
        },
        {
          key: 'validateDraggedNodes',
          value: function () {
            var e = this;
            'new' !== this.dragTarget.type &&
              this.draggedNodes.forEach(function (t) {
                t.exists &&
                  e.store.query.node(t.node.id).isDraggable(function (t) {
                    e.dragError = t;
                  });
              });
          },
        },
        {
          key: 'isNearBorders',
          value: function (e, n, r) {
            return (
              e.top + t.BORDER_OFFSET > r ||
              e.bottom - t.BORDER_OFFSET < r ||
              e.left + t.BORDER_OFFSET > n ||
              e.right - t.BORDER_OFFSET < n
            );
          },
        },
        {
          key: 'isDiff',
          value: function (e) {
            return (
              !this.currentIndicator ||
              this.currentIndicator.placement.parent.id !== e.parent.id ||
              this.currentIndicator.placement.index !== e.index ||
              this.currentIndicator.placement.where !== e.where
            );
          },
        },
        {
          key: 'getChildDimensions',
          value: function (t) {
            var n = this,
              r = this.currentTargetChildDimensions;
            return this.currentTargetId === t.id && r
              ? r
              : t.data.nodes.reduce(function (t, r) {
                  var o = n.store.query.node(r).get().dom;
                  return o && t.push(f({ id: r }, e.getDOMInfo(o))), t;
                }, []);
          },
        },
        {
          key: 'getCanvasAncestor',
          value: function (e) {
            var t = this;
            if (
              e === this.currentDropTargetId &&
              this.currentDropTargetCanvasAncestorId
            ) {
              var n = this.store.query
                .node(this.currentDropTargetCanvasAncestorId)
                .get();
              if (n) return n;
            }
            return (function e(n) {
              var r = t.store.query.node(n).get();
              return r && r.data.isCanvas
                ? r
                : r.data.parent
                ? e(r.data.parent)
                : null;
            })(e);
          },
        },
        {
          key: 'computeIndicator',
          value: function (t, n, r) {
            var o = this.getCanvasAncestor(t);
            if (
              o &&
              ((this.currentDropTargetId = t),
              (this.currentDropTargetCanvasAncestorId = o.id),
              o.data.parent &&
                this.isNearBorders(e.getDOMInfo(o.dom), n, r) &&
                !this.store.query.node(o.id).isLinkedNode() &&
                (o = this.store.query.node(o.data.parent).get()),
              o)
            ) {
              (this.currentTargetChildDimensions = this.getChildDimensions(o)),
                (this.currentTargetId = o.id);
              var a = ne(o, this.currentTargetChildDimensions, n, r);
              if (this.isDiff(a)) {
                var i = this.dragError;
                i ||
                  this.store.query.node(o.id).isDroppable(
                    this.draggedNodes.map(function (e) {
                      return e.node;
                    }),
                    function (e) {
                      i = e;
                    }
                  );
                var d = o.data.nodes[a.index],
                  s = d && this.store.query.node(d).get();
                return (
                  (this.currentIndicator = {
                    placement: f(f({}, a), {}, { currentNode: s }),
                    error: i,
                  }),
                  this.currentIndicator
                );
              }
            }
          },
        },
        {
          key: 'getIndicator',
          value: function () {
            return this.currentIndicator;
          },
        },
      ]),
      t
    );
  })();
g(fe, 'BORDER_OFFSET', 10);
var pe = function (e, t) {
    if (
      1 === t.length ||
      (arguments.length > 2 && void 0 !== arguments[2] && arguments[2])
    ) {
      var n = t[0].getBoundingClientRect(),
        r = n.width,
        o = n.height,
        a = t[0].cloneNode(!0);
      return (
        (a.style.position = 'fixed'),
        (a.style.left = '-100%'),
        (a.style.top = '-100%'),
        (a.style.width = ''.concat(r, 'px')),
        (a.style.height = ''.concat(o, 'px')),
        (a.style.pointerEvents = 'none'),
        document.body.appendChild(a),
        e.dataTransfer.setDragImage(a, 0, 0),
        a
      );
    }
    var i = document.createElement('div');
    return (
      (i.style.position = 'fixed'),
      (i.style.left = '-100%'),
      (i.style.top = '-100%'),
      (i.style.width = '100%'),
      (i.style.height = '100%'),
      (i.style.pointerEvents = 'none'),
      t.forEach(function (e) {
        var t = e.getBoundingClientRect(),
          n = t.width,
          r = t.height,
          o = t.top,
          a = t.left,
          d = e.cloneNode(!0);
        (d.style.position = 'absolute'),
          (d.style.left = ''.concat(a, 'px')),
          (d.style.top = ''.concat(o, 'px')),
          (d.style.width = ''.concat(n, 'px')),
          (d.style.height = ''.concat(r, 'px')),
          i.appendChild(d);
      }),
      document.body.appendChild(i),
      e.dataTransfer.setDragImage(i, e.clientX, e.clientY),
      i
    );
  },
  ve = (function (e) {
    E(n, ue);
    var t = R(n);
    function n() {
      var e;
      v(this, n);
      for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
        o[a] = arguments[a];
      return (
        g(
          b((e = t.call.apply(t, [this].concat(o)))),
          'draggedElementShadow',
          void 0
        ),
        g(b(e), 'dragTarget', void 0),
        g(b(e), 'positioner', null),
        g(b(e), 'currentSelectedElementIds', []),
        e
      );
    }
    return (
      y(n, [
        {
          key: 'onDisable',
          value: function () {
            this.options.store.actions.clearEvents();
          },
        },
        {
          key: 'handlers',
          value: function () {
            var e = this,
              t = this.options.store;
            return {
              connect: function (n, r) {
                return (
                  t.actions.setDOM(r, n),
                  e.reflect(function (e) {
                    e.select(n, r), e.hover(n, r), e.drop(n, r);
                  })
                );
              },
              select: function (n, r) {
                var o = e.addCraftEventListener(n, 'mousedown', function (n) {
                    n.craft.stopPropagation();
                    var o = [];
                    if (r) {
                      var a = t.query,
                        i = a.getEvent('selected').all();
                      (e.options.isMultiSelectEnabled(n) || i.includes(r)) &&
                        (o = i.filter(function (e) {
                          var t = a.node(e).descendants(!0),
                            n = a.node(e).ancestors(!0);
                          return !t.includes(r) && !n.includes(r);
                        })),
                        o.includes(r) || o.push(r);
                    }
                    t.actions.setNodeEvent('selected', o);
                  }),
                  a = e.addCraftEventListener(n, 'click', function (n) {
                    n.craft.stopPropagation();
                    var o = t.query.getEvent('selected').all(),
                      a = e.options.isMultiSelectEnabled(n),
                      i = e.currentSelectedElementIds.includes(r),
                      d = T(o);
                    a && i
                      ? (d.splice(d.indexOf(r), 1),
                        t.actions.setNodeEvent('selected', d))
                      : !a &&
                        o.length > 1 &&
                        t.actions.setNodeEvent('selected', (d = [r])),
                      (e.currentSelectedElementIds = d);
                  });
                return function () {
                  o(), a();
                };
              },
              hover: function (n, r) {
                var o = e.addCraftEventListener(n, 'mouseover', function (e) {
                  e.craft.stopPropagation(),
                    t.actions.setNodeEvent('hovered', r);
                });
                return function () {
                  o();
                };
              },
              drop: function (n, r) {
                var o = e.addCraftEventListener(n, 'dragover', function (n) {
                    if (
                      (n.craft.stopPropagation(),
                      n.preventDefault(),
                      e.positioner)
                    ) {
                      var o = e.positioner.computeIndicator(
                        r,
                        n.clientX,
                        n.clientY
                      );
                      o && t.actions.setIndicator(o);
                    }
                  }),
                  a = e.addCraftEventListener(n, 'dragenter', function (e) {
                    t.actions.setNodeEvent('draggedOver', r),
                      e.craft.stopPropagation(),
                      e.preventDefault();
                  });
                return function () {
                  a(), o();
                };
              },
              drag: function (r, o) {
                if (!t.query.node(o).isDraggable()) return function () {};
                r.setAttribute('draggable', 'true');
                var a = e.addCraftEventListener(r, 'dragstart', function (r) {
                    r.craft.stopPropagation();
                    var a = t.query,
                      i = t.actions,
                      d = a.getEvent('selected').all(),
                      s = e.options.isMultiSelectEnabled(r);
                    e.currentSelectedElementIds.includes(o) ||
                      ((d = s ? [].concat(T(d), [o]) : [o]),
                      t.actions.setNodeEvent('selected', d)),
                      i.setNodeEvent('dragged', d);
                    var c = d.map(function (e) {
                      return a.node(e).get().dom;
                    });
                    (e.draggedElementShadow = pe(
                      r,
                      c,
                      n.forceSingleDragShadow
                    )),
                      (e.dragTarget = { type: 'existing', nodes: d }),
                      (e.positioner = new fe(e.options.store, e.dragTarget));
                  }),
                  i = e.addCraftEventListener(r, 'dragend', function (n) {
                    n.craft.stopPropagation(),
                      e.dropElement(function (e, n) {
                        'new' !== e.type &&
                          t.actions.move(
                            e.nodes,
                            n.placement.parent.id,
                            n.placement.index +
                              ('after' === n.placement.where ? 1 : 0)
                          );
                      });
                  });
                return function () {
                  r.setAttribute('draggable', 'false'), a(), i();
                };
              },
              create: function (o, a, d) {
                o.setAttribute('draggable', 'true');
                var s = e.addCraftEventListener(o, 'dragstart', function (r) {
                    var o;
                    if ((r.craft.stopPropagation(), 'function' == typeof a)) {
                      var d = a();
                      o = i.default.isValidElement(d)
                        ? t.query.parseReactElement(d).toNodeTree()
                        : d;
                    } else o = t.query.parseReactElement(a).toNodeTree();
                    (e.draggedElementShadow = pe(
                      r,
                      [r.currentTarget],
                      n.forceSingleDragShadow
                    )),
                      (e.dragTarget = { type: 'new', tree: o }),
                      (e.positioner = new fe(e.options.store, e.dragTarget));
                  }),
                  c = e.addCraftEventListener(o, 'dragend', function (n) {
                    n.craft.stopPropagation(),
                      e.dropElement(function (e, n) {
                        'existing' !== e.type &&
                          (t.actions.addNodeTree(
                            e.tree,
                            n.placement.parent.id,
                            n.placement.index +
                              ('after' === n.placement.where ? 1 : 0)
                          ),
                          d && r.isFunction(d.onCreate) && d.onCreate(e.tree));
                      });
                  });
                return function () {
                  o.removeAttribute('draggable'), s(), c();
                };
              },
            };
          },
        },
        {
          key: 'dropElement',
          value: function (e) {
            var t = this.options.store;
            if (this.positioner) {
              var n = this.draggedElementShadow,
                r = this.positioner.getIndicator();
              this.dragTarget && r && !r.error && e(this.dragTarget, r),
                n &&
                  (n.parentNode.removeChild(n),
                  (this.draggedElementShadow = null)),
                (this.dragTarget = null),
                t.actions.setIndicator(null),
                t.actions.setNodeEvent('dragged', null),
                t.actions.setNodeEvent('draggedOver', null),
                this.positioner.cleanup(),
                (this.positioner = null);
            }
          },
        },
      ]),
      n
    );
  })();
function he(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 2,
    o = 0,
    a = 0,
    i = 0,
    d = 0,
    s = e.where;
  return (
    n
      ? n.inFlow
        ? ((i = n.outerWidth),
          (d = r),
          (o = 'before' === s ? n.top : n.bottom),
          (a = n.left))
        : ((i = r),
          (d = n.outerHeight),
          (o = n.top),
          (a = 'before' === s ? n.left : n.left + n.outerWidth))
      : t &&
        ((o = t.top + t.padding.top),
        (a = t.left + t.padding.left),
        (i =
          t.outerWidth -
          t.padding.right -
          t.padding.left -
          t.margin.left -
          t.margin.right),
        (d = r)),
    {
      top: ''.concat(o, 'px'),
      left: ''.concat(a, 'px'),
      width: ''.concat(i, 'px'),
      height: ''.concat(d, 'px'),
    }
  );
}
g(ve, 'forceSingleDragShadow', e.isChromium() && e.isLinux());
const ye = () => {
    const { indicator: n, indicatorOptions: r, enabled: o } = w((e) => ({
        indicator: e.indicator,
        indicatorOptions: e.options.indicator,
        enabled: e.options.enabled,
      })),
      a = x();
    return (
      t.useEffect(() => {
        a && (o ? a.enable() : a.disable());
      }, [o, a]),
      n
        ? i.default.createElement(e.RenderIndicator, {
            style: {
              ...he(
                n.placement,
                e.getDOMInfo(n.placement.parent.dom),
                n.placement.currentNode &&
                  e.getDOMInfo(n.placement.currentNode.dom),
                r.thickness
              ),
              backgroundColor: n.error ? r.error : r.success,
              transition: r.transition || '0.2s ease-in',
            },
            parentDom: n.placement.parent.dom,
          })
        : null
    );
  },
  ge = ({ children: e }) => {
    const n = t.useContext(I),
      r = t.useMemo(() => n.query.getOptions().handlers(n), [n]);
    return r
      ? i.default.createElement(
          S.Provider,
          { value: r },
          i.default.createElement(ye, null),
          e
        )
      : null;
  },
  Ee = {
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
      onRender: ({ render: e }) => e,
      onBeforeMoveEnd: () => null,
      resolver: {},
      enabled: !0,
      indicator: { error: 'red', success: 'rgb(98, 196, 98)' },
      handlers: (e) =>
        new ve({ store: e, isMultiSelectEnabled: (e) => !!e.metaKey }),
      normalizeNodes: () => {},
    },
  },
  me = {
    methods: function (t, n) {
      return f(
        f(
          {},
          (function (t, n) {
            var r = function (n, r, a) {
                if (
                  ((function r(o, a) {
                    var i = n.nodes[o];
                    'string' != typeof i.data.type &&
                      d.default(
                        t.options.resolver[i.data.name],
                        e.ERROR_NOT_IN_RESOLVER.replace(
                          '%node_type%',
                          ''.concat(i.data.type.name)
                        )
                      ),
                      (t.nodes[o] = f(
                        f({}, i),
                        {},
                        { data: f(f({}, i.data), {}, { parent: a }) }
                      )),
                      i.data.nodes.length > 0 &&
                        (delete t.nodes[o].data.props.children,
                        i.data.nodes.forEach(function (e) {
                          return r(e, i.id);
                        })),
                      Object.values(i.data.linkedNodes).forEach(function (e) {
                        return r(e, i.id);
                      });
                  })(n.rootNodeId, r),
                  r)
                ) {
                  var i = o(r);
                  if ('child' !== a.type)
                    i.data.linkedNodes[a.id] = n.rootNodeId;
                  else {
                    var s = a.index;
                    null != s
                      ? i.data.nodes.splice(s, 0, n.rootNodeId)
                      : i.data.nodes.push(n.rootNodeId);
                  }
                } else
                  d.default(
                    n.rootNodeId === e.ROOT_NODE,
                    'Cannot add non-root Node without a parent'
                  );
              },
              o = function (n) {
                d.default(n, e.ERROR_NOPARENT);
                var r = t.nodes[n];
                return d.default(r, e.ERROR_INVALID_NODEID), r;
              },
              a = function e(n) {
                var r = t.nodes[n],
                  o = t.nodes[r.data.parent];
                if (
                  (r.data.nodes &&
                    T(r.data.nodes).forEach(function (t) {
                      return e(t);
                    }),
                  r.data.linkedNodes &&
                    Object.values(r.data.linkedNodes).map(function (t) {
                      return e(t);
                    }),
                  o.data.nodes.includes(n))
                ) {
                  var a = o.data.nodes;
                  a.splice(a.indexOf(n), 1);
                } else {
                  var i = Object.keys(o.data.linkedNodes).find(function (e) {
                    return o.data.linkedNodes[e] === e;
                  });
                  i && delete o.data.linkedNodes[i];
                }
                !(function (e, t) {
                  Object.keys(e.events).forEach(function (n) {
                    var r = e.events[n];
                    r &&
                      r.has &&
                      r.has(t) &&
                      (e.events[n] = new Set(
                        Array.from(r).filter(function (e) {
                          return t !== e;
                        })
                      ));
                  });
                })(t, n),
                  delete t.nodes[n];
              };
            return {
              addLinkedNodeFromTree: function (e, t, n) {
                var i = o(t).data.linkedNodes[n];
                i && a(i), r(e, t, { type: 'linked', id: n });
              },
              add: function (t, n, o) {
                var a = [t];
                Array.isArray(t) &&
                  (e.deprecationWarning('actions.add(node: Node[])', {
                    suggest: 'actions.add(node: Node)',
                  }),
                  (a = t)),
                  a.forEach(function (e) {
                    r({ nodes: g({}, e.id, e), rootNodeId: e.id }, n, {
                      type: 'child',
                      index: o,
                    });
                  });
              },
              addNodeTree: function (e, t, n) {
                r(e, t, { type: 'child', index: n });
              },
              delete: function (r) {
                var o =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
                Y(t.nodes, r, { existOnly: !0, idOnly: !0 }).forEach(function (
                  t
                ) {
                  var r = t.node;
                  d.default(
                    !!o || !n.node(r.id).isTopLevelNode(),
                    e.ERROR_DELETE_TOP_LEVEL_NODE
                  ),
                    a(r.id);
                });
              },
              deserialize: function (t) {
                var r = 'string' == typeof t ? JSON.parse(t) : t,
                  o = Object.keys(r).map(function (t) {
                    var o = t;
                    return (
                      t === e.DEPRECATED_ROOT_NODE && (o = e.ROOT_NODE),
                      [
                        o,
                        n.parseSerializedNode(r[t]).toNode(function (e) {
                          return (e.id = o);
                        }),
                      ]
                    );
                  });
                this.replaceNodes(X(o));
              },
              move: function (e, r, o) {
                var a = Y(t.nodes, e, { existOnly: !0 }),
                  i = t.nodes[r],
                  d = new Set();
                a.forEach(function (e, a) {
                  var s = e.node,
                    c = s.id,
                    u = s.data.parent;
                  n.node(r).isDroppable([c], function (e) {
                    throw new Error(e);
                  }),
                    t.options.onBeforeMoveEnd(s, i, t.nodes[u]);
                  var l = t.nodes[u].data.nodes;
                  d.add(l);
                  var f = l.indexOf(c);
                  (l[f] = '$$'),
                    i.data.nodes.splice(o + a, 0, c),
                    (t.nodes[c].data.parent = r);
                }),
                  d.forEach(function (e) {
                    var t = e.length;
                    T(e)
                      .reverse()
                      .forEach(function (n, r) {
                        '$$' === n && e.splice(t - 1 - r, 1);
                      });
                  });
              },
              replaceNodes: function (e) {
                this.clearEvents(), (t.nodes = e);
              },
              clearEvents: function () {
                this.setNodeEvent('selected', null),
                  this.setNodeEvent('hovered', null),
                  this.setNodeEvent('dragged', null),
                  this.setNodeEvent('draggedOver', null),
                  this.setIndicator(null);
              },
              reset: function () {
                this.clearEvents(), this.replaceNodes({});
              },
              setOptions: function (e) {
                e(t.options);
              },
              setNodeEvent: function (e, n) {
                if (
                  (t.events[e].forEach(function (n) {
                    t.nodes[n] && (t.nodes[n].events[e] = !1);
                  }),
                  (t.events[e] = new Set()),
                  n)
                ) {
                  var r = Y(t.nodes, n, { idOnly: !0, existOnly: !0 }),
                    o = new Set(
                      r.map(function (e) {
                        return e.node.id;
                      })
                    );
                  o.forEach(function (n) {
                    t.nodes[n].events[e] = !0;
                  }),
                    (t.events[e] = o);
                }
              },
              setCustom: function (e, n) {
                Y(t.nodes, e, { idOnly: !0, existOnly: !0 }).forEach(function (
                  e
                ) {
                  return n(t.nodes[e.node.id].data.custom);
                });
              },
              setDOM: function (e, n) {
                t.nodes[e] && (t.nodes[e].dom = n);
              },
              setIndicator: function (e) {
                (e &&
                  (!e.placement.parent.dom ||
                    (e.placement.currentNode &&
                      !e.placement.currentNode.dom))) ||
                  (t.indicator = e);
              },
              setHidden: function (e, n) {
                t.nodes[e].data.hidden = n;
              },
              setProp: function (e, n) {
                Y(t.nodes, e, { idOnly: !0, existOnly: !0 }).forEach(function (
                  e
                ) {
                  return n(t.nodes[e.node.id].data.props);
                });
              },
              selectNode: function (e) {
                if (e) {
                  var n = Y(t.nodes, e, { idOnly: !0, existOnly: !0 });
                  this.setNodeEvent(
                    'selected',
                    n.map(function (e) {
                      return e.node.id;
                    })
                  );
                } else this.setNodeEvent('selected', null);
                this.setNodeEvent('hovered', null);
              },
              hoverNode: function (e) {
                if (e) {
                  var n = Y(t.nodes, e, { idOnly: !0, existOnly: !0 });
                  this.setNodeEvent(
                    'hovered',
                    n.map(function (e) {
                      return e.node.id;
                    })
                  );
                } else this.setNodeEvent('hovered', null);
              },
            };
          })(t, n)
        ),
        {},
        {
          setState: function (e) {
            var n = N(this, J);
            e(t, n);
          },
        }
      );
    },
    ignoreHistoryForActions: [
      'setDOM',
      'setNodeEvent',
      'selectNode',
      'hoverNode',
      'clearEvents',
      'setOptions',
      'setIndicator',
    ],
    normalizeHistory: (e) => {
      Object.keys(e.events).forEach((t) => {
        Array.from(e.events[t] || []).forEach((n) => {
          e.nodes[n] || e.events[t].delete(n);
        });
      }),
        Object.keys(e.nodes).forEach((t) => {
          const n = e.nodes[t];
          Object.keys(n.events).forEach((t) => {
            n.events[t] &&
              e.events[t] &&
              !e.events[t].has(n.id) &&
              (n.events[t] = !1);
          });
        });
    },
  },
  Oe = (t, n) =>
    e.useMethods(me, { ...Ee, options: { ...Ee.options, ...t } }, ce, n);
var Ne = ['events', 'data'],
  be = ['nodes'],
  Re = ['nodes'],
  Te = ['_hydrationTimestamp', 'rules'],
  De = ['_hydrationTimestamp', 'rules'],
  _e = function (e) {
    var t = e.events,
      n = e.data,
      r = n.nodes,
      o = n.linkedNodes,
      a = N(e, Ne),
      i = oe(s.default(e));
    return {
      node: (e = f(
        f(f({}, i), a),
        {},
        { events: f(f({}, i.events), t), dom: e.dom || i.dom }
      )),
      childNodes: r,
      linkedNodes: o,
    };
  },
  Ce = function (e) {
    var t = {};
    return (
      (function e(n) {
        var r = _e(n),
          o = r.node,
          a = r.childNodes,
          i = r.linkedNodes;
        (t[o.id] = o),
          a &&
            a.forEach(function (n, r) {
              var a = _e(n),
                i = a.node,
                d = a.childNodes,
                s = a.linkedNodes;
              (i.data.parent = o.id),
                (t[i.id] = i),
                (o.data.nodes[r] = i.id),
                e(
                  f(
                    f({}, i),
                    {},
                    {
                      data: f(
                        f({}, i.data),
                        {},
                        { nodes: d || [], linkedNodes: s || {} }
                      ),
                    }
                  )
                );
            }),
          i &&
            Object.keys(i).forEach(function (n) {
              var r = _e(i[n]),
                a = r.node,
                d = r.childNodes,
                s = r.linkedNodes;
              (o.data.linkedNodes[n] = a.id),
                (a.data.parent = o.id),
                (t[a.id] = a),
                e(
                  f(
                    f({}, a),
                    {},
                    {
                      data: f(
                        f({}, a.data),
                        {},
                        { nodes: d || [], linkedNodes: s || {} }
                      ),
                    }
                  )
                );
            });
      })(e),
      t
    );
  };
Object.defineProperty(exports, 'ROOT_NODE', {
  enumerable: !0,
  get: function () {
    return e.ROOT_NODE;
  },
}),
  (exports.ActionMethodsWithConfig = me),
  (exports.Canvas = Canvas),
  (exports.CoreEventHandlers = ue),
  (exports.DefaultEventHandlers = ve),
  (exports.DerivedCoreEventHandlers = le),
  (exports.Editor = ({ children: n, ...r }) => {
    void 0 !== r.resolver &&
      d.default(
        'object' == typeof r.resolver && !Array.isArray(r.resolver),
        e.ERROR_RESOLVER_NOT_AN_OBJECT
      );
    const o = t.useRef(r),
      a = Oe(o.current, (t, n, r, o, a) => {
        if (!r) return;
        const { patches: i, ...d } = r;
        for (let r = 0; r < i.length; r++) {
          const { path: s } = i[r],
            c = s.length > 2 && 'nodes' === s[0] && 'data' === s[2];
          if (
            ([e.HISTORY_ACTIONS.IGNORE, e.HISTORY_ACTIONS.THROTTLE].includes(
              d.type
            ) &&
              d.params &&
              (d.type = d.params[0]),
            ['setState', 'deserialize'].includes(d.type) || c)
          ) {
            a((e) => {
              t.options.normalizeNodes && t.options.normalizeNodes(e, n, d, o);
            });
            break;
          }
        }
      });
    return (
      t.useEffect(() => {
        a &&
          r &&
          void 0 !== r.enabled &&
          a.query.getOptions().enabled !== r.enabled &&
          a.actions.setOptions((e) => {
            e.enabled = r.enabled;
          });
      }, [a, r.enabled]),
      t.useEffect(() => {
        a.subscribe(
          (e) => ({ json: a.query.serialize() }),
          () => {
            a.query.getOptions().onNodesChange(a.query);
          }
        );
      }, [a]),
      a
        ? i.default.createElement(
            I.Provider,
            { value: a },
            i.default.createElement(ge, null, n)
          )
        : null
    );
  }),
  (exports.Element = z),
  (exports.Events = ge),
  (exports.Frame = ({ children: n, json: r, data: o }) => {
    const { actions: a, query: d } = w();
    r &&
      e.deprecationWarning('<Frame json={...} />', {
        suggest: '<Frame data={...} />',
      });
    const s = t.useRef({ initialChildren: n, initialData: o || r });
    return (
      t.useEffect(() => {
        const { initialChildren: t, initialData: n } = s.current;
        if (n) a.history.ignore().deserialize(n);
        else if (t) {
          const n = i.default.Children.only(t),
            r = d
              .parseReactElement(n)
              .toNodeTree((t, r) => (r === n && (t.id = e.ROOT_NODE), t));
          a.history.ignore().addNodeTree(r);
        }
      }, [a, d]),
      i.default.createElement(W, null)
    );
  }),
  (exports.NodeElement = V),
  (exports.NodeHelpers = te),
  (exports.NodeProvider = u),
  (exports.QueryMethods = ce),
  (exports.connectEditor = function (e) {
    return (t) => (n) => {
      const r = e ? G(e) : G();
      return i.default.createElement(t, { ...r, ...n });
    };
  }),
  (exports.connectNode = function (e) {
    return function (t) {
      return (n) => {
        const r = A(e);
        return i.default.createElement(t, { ...r, ...n });
      };
    };
  }),
  (exports.createTestNodes = Ce),
  (exports.createTestState = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.nodes,
      n = e.events;
    return f(
      f(f({}, Ee), e),
      {},
      { nodes: t ? Ce(t) : {}, events: f(f({}, Ee.events), n || {}) }
    );
  }),
  (exports.defaultElementProps = F),
  (exports.deprecateCanvasComponent = B),
  (exports.editorInitialState = Ee),
  (exports.elementPropToNodeData = H),
  (exports.expectEditorState = function (e, t) {
    var n = t.nodes,
      r = N(t, be),
      o = e.nodes,
      a = N(e, Re);
    expect(a).toEqual(r);
    var i = Object.keys(n).reduce(function (e, t) {
        var r = N(n[t], Te);
        return (e[t] = r), e;
      }, {}),
      d = Object.keys(o).reduce(function (e, t) {
        var n = N(o[t], De);
        return (e[t] = n), e;
      }, {});
    expect(d).toEqual(i);
  }),
  (exports.serializeNode = ee),
  (exports.useEditor = G),
  (exports.useEditorStore = Oe),
  (exports.useEventHandler = x),
  (exports.useNode = A);
