import {
  ERROR_USE_EDITOR_OUTSIDE_OF_EDITOR_CONTEXT as e,
  useCollector as t,
  wrapConnectorHooks as n,
  ERROR_USE_NODE_OUTSIDE_OF_EDITOR_CONTEXT as r,
  deprecationWarning as o,
  useEffectOnce as a,
  ERROR_TOP_LEVEL_ELEMENT_NO_ID as i,
  ROOT_NODE as d,
  ERROR_INVALID_NODEID as s,
  ERROR_DELETE_TOP_LEVEL_NODE as c,
  ERROR_NOPARENT as u,
  DEPRECATED_ROOT_NODE as l,
  ERROR_NOT_IN_RESOLVER as f,
  ERROR_INVALID_NODE_ID as p,
  ERROR_MOVE_TOP_LEVEL_NODE as v,
  ERROR_MOVE_NONCANVAS_CHILD as h,
  ERROR_CANNOT_DRAG as y,
  ERROR_MOVE_TO_NONCANVAS_PARENT as g,
  ERROR_MOVE_INCOMING_PARENT as m,
  ERROR_MOVE_CANNOT_DROP as N,
  ERROR_MOVE_TO_DESCENDANT as E,
  ERROR_DUPLICATE_NODEID as b,
  ERROR_MOVE_OUTGOING_PARENT as O,
  getRandomId as T,
  ERROR_DESERIALIZE_COMPONENT_NOT_IN_RESOLVER as w,
  getDOMInfo as k,
  EventHandlers as C,
  DerivedEventHandlers as S,
  isChromium as j,
  isLinux as D,
  RenderIndicator as I,
  useMethods as x,
  ERROR_RESOLVER_NOT_AN_OBJECT as P,
  HISTORY_ACTIONS as A,
} from '@craftjs/utils';
export { ROOT_NODE } from '@craftjs/utils';
import q, {
  createContext as R,
  useContext as L,
  useMemo as _,
  useEffect as F,
  useState as z,
  useRef as M,
  Children as B,
  Fragment as H,
} from 'react';
import $ from 'tiny-invariant';
import { isFunction as W } from 'lodash';
import J from 'lodash/cloneDeep';
const U = q.createContext(null),
  V = ({ id: e, related: t = !1, children: n }) =>
    q.createElement(U.Provider, { value: { id: e, related: t } }, n);
function X(e, t) {
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
function Y(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? X(Object(n), !0).forEach(function (t) {
          ee(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : X(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
  }
  return e;
}
function G(e) {
  return (
    (G =
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
    G(e)
  );
}
function K(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function Q(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, ue(r.key), r);
  }
}
function Z(e, t, n) {
  return (
    t && Q(e.prototype, t),
    n && Q(e, n),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function ee(e, t, n) {
  return (
    (t = ue(t)) in e
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
function te(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && re(e, t);
}
function ne(e) {
  return (
    (ne = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    ne(e)
  );
}
function re(e, t) {
  return (
    (re = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        }),
    re(e, t)
  );
}
function oe(e, t) {
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
function ae(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function ie(e) {
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
      r = ne(e);
    if (t) {
      var o = ne(this).constructor;
      n = Reflect.construct(r, arguments, o);
    } else n = r.apply(this, arguments);
    return (function (e, t) {
      if (t && ('object' == typeof t || 'function' == typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        );
      return ae(e);
    })(this, n);
  };
}
function de(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return ce(e);
    })(e) ||
    (function (e) {
      if (
        ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e['@@iterator']
      )
        return Array.from(e);
    })(e) ||
    se(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      );
    })()
  );
}
function se(e, t) {
  if (e) {
    if ('string' == typeof e) return ce(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === n && e.constructor && (n = e.constructor.name),
      'Map' === n || 'Set' === n
        ? Array.from(e)
        : 'Arguments' === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? ce(e, t)
        : void 0
    );
  }
}
function ce(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ue(e) {
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
const le = R(null);
var fe = R(null),
  pe = function () {
    return L(fe);
  };
function ve(r) {
  var o = pe(),
    a = L(le);
  $(a, e);
  var i = t(a, r),
    d = _(
      function () {
        return o && o.createConnectorsUsage();
      },
      [o]
    );
  F(
    function () {
      return (
        d.register(),
        function () {
          d.cleanup();
        }
      );
    },
    [d]
  );
  var s = _(
    function () {
      return d && n(d.connectors);
    },
    [d]
  );
  return Y(Y({}, i), {}, { connectors: s, inContext: !!a, store: a });
}
var he = ['actions', 'query', 'connectors'];
function ye(e) {
  var t = L(U);
  $(t, r);
  var o = t.id,
    a = t.related,
    i = ve(function (t) {
      return o && t.nodes[o] && e && e(t.nodes[o]);
    }),
    d = i.actions,
    s = i.connectors,
    c = oe(i, he),
    u = _(
      function () {
        return n({
          connect: function (e) {
            return s.connect(e, o);
          },
          drag: function (e) {
            return s.drag(e, o);
          },
        });
      },
      [s, o]
    ),
    l = _(
      function () {
        return {
          setProp: function (e, t) {
            t ? d.history.throttle(t).setProp(o, e) : d.setProp(o, e);
          },
          setCustom: function (e, t) {
            t ? d.history.throttle(t).setCustom(o, e) : d.setCustom(o, e);
          },
          setHidden: function (e) {
            return d.setHidden(o, e);
          },
        };
      },
      [d, o]
    );
  return Y(
    Y({}, c),
    {},
    { id: o, related: a, inNodeContext: !!t, actions: l, connectors: u }
  );
}
var ge = ['id', 'related', 'actions', 'inNodeContext', 'connectors'];
function me(e) {
  var t = ye(e),
    n = t.id,
    r = t.related,
    a = t.actions,
    i = t.inNodeContext,
    d = t.connectors;
  return Y(
    Y({}, oe(t, ge)),
    {},
    {
      actions: a,
      id: n,
      related: r,
      setProp: function (e, t) {
        return (
          o('useNode().setProp()', { suggest: 'useNode().actions.setProp()' }),
          a.setProp(e, t)
        );
      },
      inNodeContext: i,
      connectors: d,
    }
  );
}
const Ne = ({ render: e }) => {
    const {
      connectors: { connect: t, drag: n },
    } = me();
    return 'string' == typeof e.type ? t(n(q.cloneElement(e))) : e;
  },
  Ee = () => {
    const { type: e, props: t, nodes: n, hydrationTimestamp: r } = ye((e) => ({
      type: e.data.type,
      props: e.data.props,
      nodes: e.data.nodes,
      hydrationTimestamp: e._hydrationTimestamp,
    }));
    return _(() => {
      let r = t.children;
      n &&
        n.length > 0 &&
        (r = q.createElement(
          q.Fragment,
          null,
          n.map((e) => q.createElement(Oe, { id: e, key: e }))
        ));
      const o = q.createElement(e, t, r);
      return 'string' == typeof e ? q.createElement(Ne, { render: o }) : o;
    }, [e, t, r, n]);
  },
  be = ({ render: e }) => {
    const { hidden: t } = ye((e) => ({ hidden: e.data.hidden })),
      { onRender: n } = ve((e) => ({ onRender: e.options.onRender }));
    return t
      ? null
      : q.createElement(n, { render: e || q.createElement(Ee, null) });
  },
  Oe = ({ id: e, render: t }) =>
    q.createElement(V, { id: e }, q.createElement(be, { render: t })),
  Te = { is: 'div', canvas: !1, custom: {}, hidden: !1 },
  we = { is: 'type', canvas: 'isCanvas' };
function ke({ id: e, children: t, ...n }) {
  const { is: r } = { ...Te, ...n },
    { query: o, actions: d } = ve(),
    { node: s, inNodeContext: c } = ye((e) => ({
      node: { id: e.id, data: e.data },
    })),
    [u, l] = z(null);
  return (
    a(() => {
      $(!!e, i);
      const { id: a, data: u } = s;
      if (c) {
        let i;
        const s =
          u.linkedNodes && u.linkedNodes[e] && o.node(u.linkedNodes[e]).get();
        if (s && s.data.type === r) i = s.id;
        else {
          const r = q.createElement(ke, n, t),
            s = o.parseReactElement(r).toNodeTree();
          (i = s.rootNodeId), d.history.ignore().addLinkedNodeFromTree(s, a, e);
        }
        l(i);
      }
    }),
    u ? q.createElement(Oe, { id: u }) : null
  );
}
const Ce = () => o('<Canvas />', { suggest: '<Element canvas={true} />' });
function Canvas({ ...e }) {
  return F(() => Ce(), []), q.createElement(ke, { ...e, canvas: !0 });
}
const Se = () => {
    const { timestamp: e } = ve((e) => ({
      timestamp: e.nodes[d] && e.nodes[d]._hydrationTimestamp,
    }));
    return e ? q.createElement(Oe, { id: d, key: e }) : null;
  },
  je = ({ children: e, json: t, data: n }) => {
    const { actions: r, query: a } = ve();
    t && o('<Frame json={...} />', { suggest: '<Frame data={...} />' });
    const i = M({ initialChildren: e, initialData: n || t });
    return (
      F(() => {
        const { initialChildren: e, initialData: t } = i.current;
        if (t) r.history.ignore().deserialize(t);
        else if (e) {
          const t = q.Children.only(e),
            n = a
              .parseReactElement(t)
              .toNodeTree((e, n) => (n === t && (e.id = d), e));
          r.history.ignore().addNodeTree(n);
        }
      }, [r, a]),
      q.createElement(Se, null)
    );
  };
var De;
!(function (e) {
  (e[(e.Any = 0)] = 'Any'), (e[(e.Id = 1)] = 'Id'), (e[(e.Obj = 2)] = 'Obj');
})(De || (De = {}));
const Ie = (e) => {
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
function xe(e) {
  const { connectors: t, actions: n, query: r, store: o, ...a } = ve(e),
    i = Ie(n);
  return {
    connectors: t,
    actions: _(
      () => ({
        ...i,
        history: {
          ...i.history,
          ignore: (...e) => Ie(i.history.ignore(...e)),
          throttle: (...e) => Ie(i.history.throttle(...e)),
        },
      }),
      [i]
    ),
    query: r,
    store: o,
    ...a,
  };
}
function Pe(e) {
  return (t) => (n) => {
    const r = e ? xe(e) : xe();
    return q.createElement(t, { ...r, ...n });
  };
}
function Ae(e) {
  return function (t) {
    return (n) => {
      const r = me(e);
      return q.createElement(t, { ...r, ...n });
    };
  };
}
var qe = function (e) {
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
              se(n, 2) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
              })(),
            o = r[0],
            a = r[1];
          return Y(Y({}, e), {}, ee({}, o, a));
        }, {});
  },
  Re = function (e, t, n) {
    var r = Array.isArray(t) ? t : [t],
      o = Y({ existOnly: !1, idOnly: !1 }, n || {}),
      a = r
        .filter(function (e) {
          return !!e;
        })
        .map(function (t) {
          return 'string' == typeof t
            ? { node: e[t], exists: !!e[t] }
            : 'object' !== G(t) || o.idOnly
            ? { node: null, exists: !1 }
            : { node: t, exists: !!e[t.id] };
        });
    return (
      o.existOnly &&
        $(
          0 ===
            a.filter(function (e) {
              return !e.exists;
            }).length,
          s
        ),
      a
    );
  },
  Le = ['history'],
  _e = function (e, t) {
    var n = t.name || t.displayName,
      r = (function () {
        if (e[n]) return n;
        for (var r = 0; r < Object.keys(e).length; r++) {
          var o = Object.keys(e)[r];
          if (e[o] === t) return o;
        }
        return 'string' == typeof t ? t : void 0;
      })();
    return $(r, f.replace('%node_type%', n)), r;
  };
const Fe = (e, t) => ('string' == typeof e ? e : { resolvedName: _e(t, e) }),
  ze = (e, t) => {
    let { type: n, isCanvas: r, props: o } = e;
    return (
      (o = Object.keys(o).reduce((e, n) => {
        const r = o[n];
        return (
          null == r ||
            'function' == typeof r ||
            (e[n] =
              'children' === n && 'string' != typeof r
                ? B.map(r, (e) => ('string' == typeof e ? e : ze(e, t)))
                : 'function' == typeof r.type
                ? ze(r, t)
                : r),
          e
        );
      }, {})),
      { type: Fe(n, t), isCanvas: !!r, props: o }
    );
  },
  Me = (e, t) => {
    const { type: n, props: r, isCanvas: o, name: a, ...i } = e;
    return { ...ze({ type: n, isCanvas: o, props: r }, t), ...i };
  };
function Be(e, t) {
  $('string' == typeof t, p);
  var n = e.nodes[t],
    r = function (t) {
      return Be(e, t);
    };
  return {
    isCanvas: function () {
      return !!n.data.isCanvas;
    },
    isRoot: function () {
      return n.id === d;
    },
    isLinkedNode: function () {
      return n.data.parent && r(n.data.parent).linkedNodes().includes(n.id);
    },
    isTopLevelNode: function () {
      return this.isRoot() || this.isLinkedNode();
    },
    isDeletable: function () {
      return !this.isTopLevelNode();
    },
    isParentOfTopLevelNodes: function () {
      return n.data.linkedNodes && Object.keys(n.data.linkedNodes).length > 0;
    },
    isParentOfTopLevelCanvas: function () {
      return (
        o('query.node(id).isParentOfTopLevelCanvas', {
          suggest: 'query.node(id).isParentOfTopLevelNodes',
        }),
        this.isParentOfTopLevelNodes()
      );
    },
    isSelected: function () {
      return e.events.selected.has(t);
    },
    isHovered: function () {
      return e.events.hovered.has(t);
    },
    isDragged: function () {
      return e.events.dragged.has(t);
    },
    get: function () {
      return n;
    },
    ancestors: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return (function n(r) {
        var o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          a =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          i = e.nodes[r];
        return i
          ? (o.push(r),
            i.data.parent
              ? ((t || (!t && 0 === a)) && (o = n(i.data.parent, o, a + 1)), o)
              : o)
          : o;
      })(n.data.parent);
    },
    descendants: function () {
      var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        o = arguments.length > 1 ? arguments[1] : void 0;
      return (function t(a) {
        var i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          d =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        return (n || (!n && 0 === d)) && e.nodes[a]
          ? ('childNodes' !== o &&
              r(a)
                .linkedNodes()
                .forEach(function (e) {
                  i.push(e), (i = t(e, i, d + 1));
                }),
            'linkedNodes' !== o &&
              r(a)
                .childNodes()
                .forEach(function (e) {
                  i.push(e), (i = t(e, i, d + 1));
                }),
            i)
          : i;
      })(t);
    },
    linkedNodes: function () {
      return Object.values(n.data.linkedNodes || {});
    },
    childNodes: function () {
      return n.data.nodes || [];
    },
    isDraggable: function (t) {
      try {
        var o = n;
        return (
          $(!this.isTopLevelNode(), v),
          $(Be(e, o.data.parent).isCanvas(), h),
          $(o.rules.canDrag(o, r), y),
          !0
        );
      } catch (e) {
        return t && t(e), !1;
      }
    },
    isDroppable: function (t, o) {
      var a = Re(e.nodes, t),
        i = n;
      try {
        $(this.isCanvas(), g),
          $(
            i.rules.canMoveIn(
              a.map(function (e) {
                return e.node;
              }),
              i,
              r
            ),
            m
          );
        var d = {};
        return (
          a.forEach(function (t) {
            var n = t.node,
              o = t.exists;
            if (($(n.rules.canDrop(i, n, r), N), o)) {
              $(!r(n.id).isTopLevelNode(), v);
              var a = r(n.id).descendants(!0);
              $(!a.includes(i.id) && i.id !== n.id, E);
              var s = n.data.parent && e.nodes[n.data.parent];
              $(s.data.isCanvas, h),
                $(s || (!s && !e.nodes[n.id]), b),
                s.id !== i.id && (d[s.id] || (d[s.id] = []), d[s.id].push(n));
            }
          }),
          Object.keys(d).forEach(function (t) {
            var n = e.nodes[t];
            $(n.rules.canMoveOut(d[t], n, r), O);
          }),
          !0
        );
      } catch (e) {
        return o && o(e), !1;
      }
    },
    toSerializedNode: function () {
      return Me(n.data, e.options.resolver);
    },
    toNodeTree: function (e) {
      var n = [t].concat(de(this.descendants(!0, e))).reduce(function (e, t) {
        return (e[t] = r(t).get()), e;
      }, {});
      return { rootNodeId: t, nodes: n };
    },
    decendants: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return (
        o('query.node(id).decendants', {
          suggest: 'query.node(id).descendants',
        }),
        this.descendants(e)
      );
    },
    isTopLevelCanvas: function () {
      return !this.isRoot() && !n.data.parent;
    },
  };
}
function He(e, t, n, r) {
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
var $e = function (e) {
  return 'string' == typeof e ? e : e.name;
};
function We(e, t) {
  var n = e.data.type,
    r = {
      id: e.id || T(),
      _hydrationTimestamp: Date.now(),
      data: Y(
        {
          type: n,
          name: $e(n),
          displayName: $e(n),
          props: {},
          custom: {},
          parent: null,
          isCanvas: !1,
          hidden: !1,
          nodes: [],
          linkedNodes: {},
        },
        e.data
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
  if (r.data.type === ke || r.data.type === Canvas) {
    var o = Y(Y({}, Te), r.data.props);
    (r.data.props = Object.keys(r.data.props).reduce(function (e, t) {
      return (
        Object.keys(Te).includes(t)
          ? (r.data[we[t] || t] = o[t])
          : (e[t] = r.data.props[t]),
        e
      );
    }, {})),
      (r.data.name = $e((n = r.data.type))),
      (r.data.displayName = $e(n)),
      r.data.type === Canvas && ((r.data.isCanvas = !0), Ce());
  }
  t && t(r);
  var a = n.craft;
  if (
    a &&
    ((r.data.displayName = a.displayName || a.name || r.data.displayName),
    (r.data.props = Y(Y({}, a.props || a.defaultProps || {}), r.data.props)),
    (r.data.custom = Y(Y({}, a.custom || {}), r.data.custom)),
    null != a.isCanvas && (r.data.isCanvas = a.isCanvas),
    a.rules &&
      Object.keys(a.rules).forEach(function (e) {
        ['canDrag', 'canDrop', 'canMoveIn', 'canMoveOut'].includes(e) &&
          (r.rules[e] = a.rules[e]);
      }),
    a.related)
  ) {
    var i = { id: r.id, related: !0 };
    Object.keys(a.related).forEach(function (e) {
      r.related[e] = function (t) {
        return q.createElement(V, i, q.createElement(a.related[e], t));
      };
    });
  }
  return r;
}
const Je = (e, t, n) => {
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
            ? Je(r, t)
            : 'children' === n && Array.isArray(r)
            ? r.map((e) => ('string' == typeof e ? e : Je(e, t)))
            : r),
        e
      );
    }, {})),
      n && (o.key = n);
    const i = { ...q.createElement(a, { ...o }) };
    return { ...i, name: _e(t, i.type) };
  },
  Ue = (e, t) => {
    const { type: n, props: r, ...o } = e;
    $(
      (void 0 !== n && 'string' == typeof n) ||
        (void 0 !== n && void 0 !== n.resolvedName),
      w
        .replace('%displayName%', e.displayName)
        .replace('%availableComponents%', Object.keys(t).join(', '))
    );
    const { type: a, name: i, props: d } = Je(e, t),
      {
        parent: s,
        custom: c,
        displayName: u,
        isCanvas: l,
        nodes: f,
        hidden: p,
      } = o;
    return {
      type: a,
      name: i,
      displayName: u || i,
      props: d,
      custom: c || {},
      isCanvas: !!l,
      hidden: !!p,
      parent: s,
      linkedNodes: o.linkedNodes || o._childCanvas || {},
      nodes: f || [],
    };
  },
  Ve = (e, t) => {
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
  Xe = (e, t) => ({ rootNodeId: e.id, nodes: Ve(e, t) });
function Ye(e) {
  const t = e && e.options,
    n = () => Ye(e);
  return {
    getDropPlaceholder: (t, r, o, a = (t) => e.nodes[t.id].dom) => {
      const i = e.nodes[r],
        d = n().node(i.id).isCanvas() ? i : e.nodes[i.data.parent];
      if (!d) return;
      const s = d.data.nodes || [],
        c = He(
          d,
          s
            ? s.reduce((t, n) => {
                const r = a(e.nodes[n]);
                if (r) {
                  const e = { id: n, ...k(r) };
                  t.push(e);
                }
                return t;
              }, [])
            : [],
          o.x,
          o.y
        ),
        u = s.length && e.nodes[s[c.index]],
        l = { placement: { ...c, currentNode: u }, error: null };
      return (
        Re(e.nodes, t).forEach(({ node: e, exists: t }) => {
          t &&
            n()
              .node(e.id)
              .isDraggable((e) => (l.error = e));
        }),
        n()
          .node(d.id)
          .isDroppable(t, (e) => (l.error = e)),
        l
      );
    },
    getOptions: () => t,
    getNodes: () => e.nodes,
    node: (t) => Be(e, t),
    getSerializedNodes() {
      const t = Object.keys(e.nodes).map((e) => [
        e,
        this.node(e).toSerializedNode(),
      ]);
      return qe(t);
    },
    getEvent: (t) =>
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
      })(e, t),
    serialize() {
      return JSON.stringify(this.getSerializedNodes());
    },
    parseReactElement: (t) => ({
      toNodeTree(r) {
        let o = (function (e, t) {
            let n = e;
            return (
              'string' == typeof n && (n = q.createElement(H, {}, n)),
              We({ data: { type: n.type, props: { ...n.props } } }, (e) => {
                t && t(e, n);
              })
            );
          })(t, (t, n) => {
            const o = _e(e.options.resolver, t.data.type);
            (t.data.displayName = t.data.displayName || o),
              (t.data.name = o),
              r && r(t, n);
          }),
          a = [];
        return (
          t.props &&
            t.props.children &&
            (a = q.Children.toArray(t.props.children).reduce(
              (e, t) => (
                q.isValidElement(t) &&
                  e.push(n().parseReactElement(t).toNodeTree(r)),
                e
              ),
              []
            )),
          Xe(o, a)
        );
      },
    }),
    parseSerializedNode: (t) => ({
      toNode(r) {
        const a = Ue(t, e.options.resolver);
        $(a.type, f);
        const i = 'string' == typeof r && r;
        return (
          i &&
            o('query.parseSerializedNode(...).toNode(id)', {
              suggest:
                'query.parseSerializedNode(...).toNode(node => node.id = id)',
            }),
          n()
            .parseFreshNode({ ...(i ? { id: i } : {}), data: a })
            .toNode(!i && r)
        );
      },
    }),
    parseFreshNode: (t) => ({
      toNode: (n) =>
        We(t, (t) => {
          t.data.parent === l && (t.data.parent = d);
          const r = _e(e.options.resolver, t.data.type);
          $(null !== r, f),
            (t.data.displayName = t.data.displayName || r),
            (t.data.name = r),
            n && n(t);
        }),
    }),
    createNode(e, t) {
      o(`query.createNode(${e})`, {
        suggest: `query.parseReactElement(${e}).toNodeTree()`,
      });
      const n = this.parseReactElement(e).toNodeTree(),
        r = n.nodes[n.rootNodeId];
      return t
        ? (t.id && (r.id = t.id),
          t.data && (r.data = { ...r.data, ...t.data }),
          r)
        : r;
    },
    getDraggedOverNodes() {
      const t = Array.from(e.events.draggedOver)[0];
      return t ? new Set([t, ...n().node(t).ancestors()]) : new Set();
    },
    getState: () => e,
  };
}
var Ge = (function (e) {
    te(n, C);
    var t = ie(n);
    function n() {
      return K(this, n), t.apply(this, arguments);
    }
    return (
      Z(n, [
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
      n
    );
  })(),
  Ke = (function (e) {
    te(n, S);
    var t = ie(n);
    function n() {
      return K(this, n), t.apply(this, arguments);
    }
    return Z(n);
  })(),
  Qe = (function () {
    function e(t, n) {
      K(this, e),
        ee(this, 'store', void 0),
        ee(this, 'dragTarget', void 0),
        ee(this, 'currentDropTargetId', void 0),
        ee(this, 'currentDropTargetCanvasAncestorId', void 0),
        ee(this, 'currentIndicator', null),
        ee(this, 'currentTargetId', void 0),
        ee(this, 'currentTargetChildDimensions', void 0),
        ee(this, 'dragError', void 0),
        ee(this, 'draggedNodes', void 0),
        ee(this, 'onScrollListener', void 0),
        (this.store = t),
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
      Z(e, [
        {
          key: 'cleanup',
          value: function () {
            window.removeEventListener('scroll', this.onScrollListener, !0);
          },
        },
        {
          key: 'onScroll',
          value: function (e) {
            var t = e.target,
              n = this.store.query.node(d).get();
            t instanceof Element &&
              n &&
              n.dom &&
              t.contains(n.dom) &&
              (this.currentTargetChildDimensions = null);
          },
        },
        {
          key: 'getDraggedNodes',
          value: function () {
            return Re(
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
          value: function (t, n, r) {
            return (
              t.top + e.BORDER_OFFSET > r ||
              t.bottom - e.BORDER_OFFSET < r ||
              t.left + e.BORDER_OFFSET > n ||
              t.right - e.BORDER_OFFSET < n
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
          value: function (e) {
            var t = this,
              n = this.currentTargetChildDimensions;
            return this.currentTargetId === e.id && n
              ? n
              : e.data.nodes.reduce(function (e, n) {
                  var r = t.store.query.node(n).get().dom;
                  return r && e.push(Y({ id: n }, k(r))), e;
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
          value: function (e, t, n) {
            var r = this.getCanvasAncestor(e);
            if (
              r &&
              ((this.currentDropTargetId = e),
              (this.currentDropTargetCanvasAncestorId = r.id),
              r.data.parent &&
                this.isNearBorders(k(r.dom), t, n) &&
                !this.store.query.node(r.id).isLinkedNode() &&
                (r = this.store.query.node(r.data.parent).get()),
              r)
            ) {
              (this.currentTargetChildDimensions = this.getChildDimensions(r)),
                (this.currentTargetId = r.id);
              var o = He(r, this.currentTargetChildDimensions, t, n);
              if (this.isDiff(o)) {
                var a = this.dragError;
                a ||
                  this.store.query.node(r.id).isDroppable(
                    this.draggedNodes.map(function (e) {
                      return e.node;
                    }),
                    function (e) {
                      a = e;
                    }
                  );
                var i = r.data.nodes[o.index],
                  d = i && this.store.query.node(i).get();
                return (
                  (this.currentIndicator = {
                    placement: Y(Y({}, o), {}, { currentNode: d }),
                    error: a,
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
      e
    );
  })();
ee(Qe, 'BORDER_OFFSET', 10);
var Ze = function (e, t) {
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
  et = (function (e) {
    te(n, Ge);
    var t = ie(n);
    function n() {
      var e;
      K(this, n);
      for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
        o[a] = arguments[a];
      return (
        ee(
          ae((e = t.call.apply(t, [this].concat(o)))),
          'draggedElementShadow',
          void 0
        ),
        ee(ae(e), 'dragTarget', void 0),
        ee(ae(e), 'positioner', null),
        ee(ae(e), 'currentSelectedElementIds', []),
        e
      );
    }
    return (
      Z(n, [
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
                      d = de(o);
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
                      ((d = s ? [].concat(de(d), [o]) : [o]),
                      t.actions.setNodeEvent('selected', d)),
                      i.setNodeEvent('dragged', d);
                    var c = d.map(function (e) {
                      return a.node(e).get().dom;
                    });
                    (e.draggedElementShadow = Ze(
                      r,
                      c,
                      n.forceSingleDragShadow
                    )),
                      (e.dragTarget = { type: 'existing', nodes: d }),
                      (e.positioner = new Qe(e.options.store, e.dragTarget));
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
              create: function (r, o, a) {
                r.setAttribute('draggable', 'true');
                var i = e.addCraftEventListener(r, 'dragstart', function (r) {
                    var a;
                    if ((r.craft.stopPropagation(), 'function' == typeof o)) {
                      var i = o();
                      a = q.isValidElement(i)
                        ? t.query.parseReactElement(i).toNodeTree()
                        : i;
                    } else a = t.query.parseReactElement(o).toNodeTree();
                    (e.draggedElementShadow = Ze(
                      r,
                      [r.currentTarget],
                      n.forceSingleDragShadow
                    )),
                      (e.dragTarget = { type: 'new', tree: a }),
                      (e.positioner = new Qe(e.options.store, e.dragTarget));
                  }),
                  d = e.addCraftEventListener(r, 'dragend', function (n) {
                    n.craft.stopPropagation(),
                      e.dropElement(function (e, n) {
                        'existing' !== e.type &&
                          (t.actions.addNodeTree(
                            e.tree,
                            n.placement.parent.id,
                            n.placement.index +
                              ('after' === n.placement.where ? 1 : 0)
                          ),
                          a && W(a.onCreate) && a.onCreate(e.tree));
                      });
                  });
                return function () {
                  r.removeAttribute('draggable'), i(), d();
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
function tt(e, t, n) {
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
ee(et, 'forceSingleDragShadow', j() && D());
const nt = () => {
    const { indicator: e, indicatorOptions: t, enabled: n } = ve((e) => ({
        indicator: e.indicator,
        indicatorOptions: e.options.indicator,
        enabled: e.options.enabled,
      })),
      r = pe();
    return (
      F(() => {
        r && (n ? r.enable() : r.disable());
      }, [n, r]),
      e
        ? q.createElement(I, {
            style: {
              ...tt(
                e.placement,
                k(e.placement.parent.dom),
                e.placement.currentNode && k(e.placement.currentNode.dom),
                t.thickness
              ),
              backgroundColor: e.error ? t.error : t.success,
              transition: t.transition || '0.2s ease-in',
            },
            parentDom: e.placement.parent.dom,
          })
        : null
    );
  },
  rt = ({ children: e }) => {
    const t = L(le),
      n = _(() => t.query.getOptions().handlers(t), [t]);
    return n
      ? q.createElement(fe.Provider, { value: n }, q.createElement(nt, null), e)
      : null;
  },
  ot = {
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
        new et({ store: e, isMultiSelectEnabled: (e) => !!e.metaKey }),
      normalizeNodes: () => {},
    },
  },
  at = {
    methods: function (e, t) {
      return Y(
        Y(
          {},
          (function (e, t) {
            var n = function (t, n, o) {
                if (
                  ((function n(r, o) {
                    var a = t.nodes[r];
                    'string' != typeof a.data.type &&
                      $(
                        e.options.resolver[a.data.name],
                        f.replace('%node_type%', ''.concat(a.data.type.name))
                      ),
                      (e.nodes[r] = Y(
                        Y({}, a),
                        {},
                        { data: Y(Y({}, a.data), {}, { parent: o }) }
                      )),
                      a.data.nodes.length > 0 &&
                        (delete e.nodes[r].data.props.children,
                        a.data.nodes.forEach(function (e) {
                          return n(e, a.id);
                        })),
                      Object.values(a.data.linkedNodes).forEach(function (e) {
                        return n(e, a.id);
                      });
                  })(t.rootNodeId, n),
                  n)
                ) {
                  var a = r(n);
                  if ('child' !== o.type)
                    a.data.linkedNodes[o.id] = t.rootNodeId;
                  else {
                    var i = o.index;
                    null != i
                      ? a.data.nodes.splice(i, 0, t.rootNodeId)
                      : a.data.nodes.push(t.rootNodeId);
                  }
                } else
                  $(
                    t.rootNodeId === d,
                    'Cannot add non-root Node without a parent'
                  );
              },
              r = function (t) {
                $(t, u);
                var n = e.nodes[t];
                return $(n, s), n;
              },
              a = function t(n) {
                var r = e.nodes[n],
                  o = e.nodes[r.data.parent];
                if (
                  (r.data.nodes &&
                    de(r.data.nodes).forEach(function (e) {
                      return t(e);
                    }),
                  r.data.linkedNodes &&
                    Object.values(r.data.linkedNodes).map(function (e) {
                      return t(e);
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
                })(e, n),
                  delete e.nodes[n];
              };
            return {
              addLinkedNodeFromTree: function (e, t, o) {
                var i = r(t).data.linkedNodes[o];
                i && a(i), n(e, t, { type: 'linked', id: o });
              },
              add: function (e, t, r) {
                var a = [e];
                Array.isArray(e) &&
                  (o('actions.add(node: Node[])', {
                    suggest: 'actions.add(node: Node)',
                  }),
                  (a = e)),
                  a.forEach(function (e) {
                    n({ nodes: ee({}, e.id, e), rootNodeId: e.id }, t, {
                      type: 'child',
                      index: r,
                    });
                  });
              },
              addNodeTree: function (e, t, r) {
                n(e, t, { type: 'child', index: r });
              },
              delete: function (n) {
                var r =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
                Re(e.nodes, n, { existOnly: !0, idOnly: !0 }).forEach(function (
                  e
                ) {
                  var n = e.node;
                  $(!!r || !t.node(n.id).isTopLevelNode(), c), a(n.id);
                });
              },
              deserialize: function (e) {
                var n = 'string' == typeof e ? JSON.parse(e) : e,
                  r = Object.keys(n).map(function (e) {
                    var r = e;
                    return (
                      e === l && (r = d),
                      [
                        r,
                        t.parseSerializedNode(n[e]).toNode(function (e) {
                          return (e.id = r);
                        }),
                      ]
                    );
                  });
                this.replaceNodes(qe(r));
              },
              move: function (n, r, o) {
                var a = Re(e.nodes, n, { existOnly: !0 }),
                  i = e.nodes[r],
                  d = new Set();
                a.forEach(function (n, a) {
                  var s = n.node,
                    c = s.id,
                    u = s.data.parent;
                  t.node(r).isDroppable([c], function (e) {
                    throw new Error(e);
                  }),
                    e.options.onBeforeMoveEnd(s, i, e.nodes[u]);
                  var l = e.nodes[u].data.nodes;
                  d.add(l);
                  var f = l.indexOf(c);
                  (l[f] = '$$'),
                    i.data.nodes.splice(o + a, 0, c),
                    (e.nodes[c].data.parent = r);
                }),
                  d.forEach(function (e) {
                    var t = e.length;
                    de(e)
                      .reverse()
                      .forEach(function (n, r) {
                        '$$' === n && e.splice(t - 1 - r, 1);
                      });
                  });
              },
              replaceNodes: function (t) {
                this.clearEvents(), (e.nodes = t);
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
              setOptions: function (t) {
                t(e.options);
              },
              setNodeEvent: function (t, n) {
                if (
                  (e.events[t].forEach(function (n) {
                    e.nodes[n] && (e.nodes[n].events[t] = !1);
                  }),
                  (e.events[t] = new Set()),
                  n)
                ) {
                  var r = Re(e.nodes, n, { idOnly: !0, existOnly: !0 }),
                    o = new Set(
                      r.map(function (e) {
                        return e.node.id;
                      })
                    );
                  o.forEach(function (n) {
                    e.nodes[n].events[t] = !0;
                  }),
                    (e.events[t] = o);
                }
              },
              setCustom: function (t, n) {
                Re(e.nodes, t, { idOnly: !0, existOnly: !0 }).forEach(function (
                  t
                ) {
                  return n(e.nodes[t.node.id].data.custom);
                });
              },
              setDOM: function (t, n) {
                e.nodes[t] && (e.nodes[t].dom = n);
              },
              setIndicator: function (t) {
                (t &&
                  (!t.placement.parent.dom ||
                    (t.placement.currentNode &&
                      !t.placement.currentNode.dom))) ||
                  (e.indicator = t);
              },
              setHidden: function (t, n) {
                e.nodes[t].data.hidden = n;
              },
              setProp: function (t, n) {
                Re(e.nodes, t, { idOnly: !0, existOnly: !0 }).forEach(function (
                  t
                ) {
                  return n(e.nodes[t.node.id].data.props);
                });
              },
              selectNode: function (t) {
                if (t) {
                  var n = Re(e.nodes, t, { idOnly: !0, existOnly: !0 });
                  this.setNodeEvent(
                    'selected',
                    n.map(function (e) {
                      return e.node.id;
                    })
                  );
                } else this.setNodeEvent('selected', null);
                this.setNodeEvent('hovered', null);
              },
              hoverNode: function (t) {
                if (t) {
                  var n = Re(e.nodes, t, { idOnly: !0, existOnly: !0 });
                  this.setNodeEvent(
                    'hovered',
                    n.map(function (e) {
                      return e.node.id;
                    })
                  );
                } else this.setNodeEvent('hovered', null);
              },
            };
          })(e, t)
        ),
        {},
        {
          setState: function (t) {
            var n = oe(this, Le);
            t(e, n);
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
  it = (e, t) => x(at, { ...ot, options: { ...ot.options, ...e } }, Ye, t),
  dt = ({ children: e, ...t }) => {
    void 0 !== t.resolver &&
      $('object' == typeof t.resolver && !Array.isArray(t.resolver), P);
    const n = M(t),
      r = it(n.current, (e, t, n, r, o) => {
        if (!n) return;
        const { patches: a, ...i } = n;
        for (let n = 0; n < a.length; n++) {
          const { path: d } = a[n],
            s = d.length > 2 && 'nodes' === d[0] && 'data' === d[2];
          if (
            ([A.IGNORE, A.THROTTLE].includes(i.type) &&
              i.params &&
              (i.type = i.params[0]),
            ['setState', 'deserialize'].includes(i.type) || s)
          ) {
            o((n) => {
              e.options.normalizeNodes && e.options.normalizeNodes(n, t, i, r);
            });
            break;
          }
        }
      });
    return (
      F(() => {
        r &&
          t &&
          void 0 !== t.enabled &&
          r.query.getOptions().enabled !== t.enabled &&
          r.actions.setOptions((e) => {
            e.enabled = t.enabled;
          });
      }, [r, t.enabled]),
      F(() => {
        r.subscribe(
          (e) => ({ json: r.query.serialize() }),
          () => {
            r.query.getOptions().onNodesChange(r.query);
          }
        );
      }, [r]),
      r
        ? q.createElement(
            le.Provider,
            { value: r },
            q.createElement(rt, null, e)
          )
        : null
    );
  };
var st = ['events', 'data'],
  ct = ['nodes'],
  ut = ['nodes'],
  lt = ['_hydrationTimestamp', 'rules'],
  ft = ['_hydrationTimestamp', 'rules'],
  pt = function (e) {
    var t = e.events,
      n = e.data,
      r = n.nodes,
      o = n.linkedNodes,
      a = oe(e, st),
      i = We(J(e));
    return {
      node: (e = Y(
        Y(Y({}, i), a),
        {},
        { events: Y(Y({}, i.events), t), dom: e.dom || i.dom }
      )),
      childNodes: r,
      linkedNodes: o,
    };
  },
  vt = function (e, t) {
    var n = t.nodes,
      r = oe(t, ct),
      o = e.nodes,
      a = oe(e, ut);
    expect(a).toEqual(r);
    var i = Object.keys(n).reduce(function (e, t) {
        var r = oe(n[t], lt);
        return (e[t] = r), e;
      }, {}),
      d = Object.keys(o).reduce(function (e, t) {
        var n = oe(o[t], ft);
        return (e[t] = n), e;
      }, {});
    expect(d).toEqual(i);
  },
  ht = function (e) {
    var t = {};
    return (
      (function e(n) {
        var r = pt(n),
          o = r.node,
          a = r.childNodes,
          i = r.linkedNodes;
        (t[o.id] = o),
          a &&
            a.forEach(function (n, r) {
              var a = pt(n),
                i = a.node,
                d = a.childNodes,
                s = a.linkedNodes;
              (i.data.parent = o.id),
                (t[i.id] = i),
                (o.data.nodes[r] = i.id),
                e(
                  Y(
                    Y({}, i),
                    {},
                    {
                      data: Y(
                        Y({}, i.data),
                        {},
                        { nodes: d || [], linkedNodes: s || {} }
                      ),
                    }
                  )
                );
            }),
          i &&
            Object.keys(i).forEach(function (n) {
              var r = pt(i[n]),
                a = r.node,
                d = r.childNodes,
                s = r.linkedNodes;
              (o.data.linkedNodes[n] = a.id),
                (a.data.parent = o.id),
                (t[a.id] = a),
                e(
                  Y(
                    Y({}, a),
                    {},
                    {
                      data: Y(
                        Y({}, a.data),
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
  },
  yt = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.nodes,
      n = e.events;
    return Y(
      Y(Y({}, ot), e),
      {},
      { nodes: t ? ht(t) : {}, events: Y(Y({}, ot.events), n || {}) }
    );
  };
export {
  at as ActionMethodsWithConfig,
  Canvas,
  Ge as CoreEventHandlers,
  et as DefaultEventHandlers,
  Ke as DerivedCoreEventHandlers,
  dt as Editor,
  ke as Element,
  rt as Events,
  je as Frame,
  Oe as NodeElement,
  Be as NodeHelpers,
  V as NodeProvider,
  De as NodeSelectorType,
  Ye as QueryMethods,
  Pe as connectEditor,
  Ae as connectNode,
  ht as createTestNodes,
  yt as createTestState,
  Te as defaultElementProps,
  Ce as deprecateCanvasComponent,
  ot as editorInitialState,
  we as elementPropToNodeData,
  vt as expectEditorState,
  Me as serializeNode,
  xe as useEditor,
  it as useEditorStore,
  pe as useEventHandler,
  me as useNode,
};
