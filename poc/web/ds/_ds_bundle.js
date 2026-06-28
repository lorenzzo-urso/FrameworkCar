/* @ds-bundle: {"format":3,"namespace":"TerraComumDesignSystem_e77cb3","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TraceSeal","sourcePath":"components/semantic/TraceSeal.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Metric","sourcePath":"components/surfaces/Metric.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"29e325232f83","components/core/Badge.jsx":"088b627ea3b3","components/core/Button.jsx":"379433af6578","components/core/Tag.jsx":"24e81eb81877","components/semantic/TraceSeal.jsx":"858910cf35a5","components/surfaces/Card.jsx":"85393f79801d","components/surfaces/Metric.jsx":"60ec3e5ee6b4","ui_kits/agent-hub/AgentCard.jsx":"3902b0a733c3","ui_kits/agent-hub/AgentDetail.jsx":"776a52d35a44","ui_kits/agent-hub/HubShell.jsx":"dd6aaab3c342","ui_kits/agent-hub/ValidationPanel.jsx":"f21dce6242f3","ui_kits/agent-hub/hub-data.js":"27d878ce8208"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TerraComumDesignSystem_e77cb3 = window.TerraComumDesignSystem_e77cb3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — square, rounded icon tile used for agents and identities.
 * Accepts an icon node, an image `src`, or initials via `children`.
 */
function Avatar({
  icon = null,
  src = null,
  children = null,
  tone = "pine",
  size = 44,
  style = {},
  ...rest
}) {
  const tones = {
    pine: {
      bg: "var(--pine-500)",
      fg: "#fff"
    },
    emerald: {
      bg: "rgba(47,211,154,.16)",
      fg: "var(--emerald-400)"
    },
    leaf: {
      bg: "rgba(79,183,72,.18)",
      fg: "var(--leaf-400)"
    },
    surface: {
      bg: "var(--surface-raised)",
      fg: "var(--text-strong)"
    },
    amber: {
      bg: "rgba(255,138,91,.16)",
      fg: "var(--amber-500)"
    }
  };
  const t = tones[tone] || tones.pine;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.28),
      background: t.bg,
      color: t.fg,
      flex: "none",
      overflow: "hidden",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: Math.round(size * 0.4),
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : icon || children);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. Used for agent state (ativo / demonstrativo),
 * conformity, and other short status signals.
 */
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "rgba(121,201,173,.12)",
      fg: "var(--text-muted)",
      dotc: "var(--text-muted)"
    },
    active: {
      bg: "rgba(47,211,154,.16)",
      fg: "var(--emerald-400)",
      dotc: "var(--emerald-500)"
    },
    leaf: {
      bg: "rgba(79,183,72,.16)",
      fg: "var(--leaf-400)",
      dotc: "var(--leaf-500)"
    },
    alert: {
      bg: "rgba(255,138,91,.16)",
      fg: "var(--amber-500)",
      dotc: "var(--amber-500)"
    },
    muted: {
      bg: "rgba(255,255,255,.06)",
      fg: "var(--text-faint)",
      dotc: "var(--text-faint)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: dot ? "3px 10px 3px 8px" : "3px 10px",
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: ".01em",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: t.dotc,
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Terra Comum's primary action control.
 * Renders as <button> or, when `href` is set, as an <a>.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconRight = null,
  disabled = false,
  href,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "7px 13px",
      fontSize: "var(--text-sm)",
      gap: "6px",
      radius: "var(--radius-sm)"
    },
    md: {
      padding: "10px 18px",
      fontSize: "var(--text-base)",
      gap: "8px",
      radius: "var(--radius-sm)"
    },
    lg: {
      padding: "13px 24px",
      fontSize: "var(--text-md)",
      gap: "10px",
      radius: "var(--radius-md)"
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-ink)",
      border: "1px solid transparent",
      fontWeight: "var(--fw-bold)"
    },
    secondary: {
      background: "var(--surface-raised)",
      color: "var(--text-strong)",
      border: "1px solid var(--border-subtle)",
      fontWeight: "var(--fw-semibold)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent",
      fontWeight: "var(--fw-semibold)"
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      fontWeight: "var(--fw-bold)"
    }
  };
  const v = variants[variant] || variants.primary;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-sans)",
    lineHeight: 1,
    borderRadius: s.radius,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)",
    ...v,
    ...style
  };
  const hover = e => {
    if (disabled) return;
    e.currentTarget.style.filter = "brightness(1.08)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const leave = e => {
    e.currentTarget.style.filter = "";
    e.currentTarget.style.transform = "";
  };
  const down = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(0) scale(.98)";
  };
  const up = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none"
    }
  }, icon), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flex: "none"
    }
  }, iconRight));
  const handlers = {
    onMouseEnter: hover,
    onMouseLeave: leave,
    onMouseDown: down,
    onMouseUp: up
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: base,
      onClick: onClick
    }, handlers, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: base,
    disabled: disabled,
    onClick: onClick
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — monospace chip for tools, ontology refs and other code-like tokens
 * (e.g. consultar_sicar, car:Pendencia_CIB).
 */
function Tag({
  children,
  tone = "tool",
  style = {},
  ...rest
}) {
  const tones = {
    tool: {
      fg: "var(--mint-400)",
      border: "var(--border-subtle)",
      bg: "var(--surface-inset)"
    },
    trace: {
      fg: "var(--code-trace)",
      border: "rgba(200,168,239,.3)",
      bg: "rgba(200,168,239,.08)"
    },
    rule: {
      fg: "var(--code-rule)",
      border: "rgba(255,138,91,.3)",
      bg: "rgba(255,138,91,.08)"
    }
  };
  const t = tones[tone] || tones.tool;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      padding: "2px 9px",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.border}`,
      borderRadius: "var(--radius-xs)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/semantic/TraceSeal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TraceSeal — Terra Comum's signature traceability seal. Every reasoned
 * answer cites the legal source (`source`) and its ontology reference
 * (`trace`), proving it came from the open CAR model — not a generic LLM.
 *
 *   tone="rule"  → green, "baseado na regra" (a rule was applied)
 *   tone="alert" → amber, "ponto de atenção" (a déficit was found)
 */
function TraceSeal({
  title,
  source,
  trace,
  children,
  tone = "rule",
  icon = null,
  style = {},
  ...rest
}) {
  const tones = {
    rule: {
      bar: "var(--emerald-500)",
      bg: "rgba(47,211,154,.08)",
      heading: "var(--emerald-400)",
      defaultTitle: "Baseado na regra"
    },
    alert: {
      bar: "var(--amber-600)",
      bg: "rgba(255,138,91,.09)",
      heading: "var(--amber-500)",
      defaultTitle: "Ponto de atenção"
    }
  };
  const t = tones[tone] || tones.rule;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: t.bg,
      borderLeft: `3px solid ${t.bar}`,
      borderRadius: "var(--radius-xs)",
      padding: "11px 13px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      color: t.heading,
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, icon), title || t.defaultTitle), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-body)",
      marginTop: "6px",
      lineHeight: 1.5
    }
  }, children), source && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-strong)",
      marginTop: "6px",
      fontWeight: "var(--fw-semibold)"
    }
  }, source), trace && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "var(--code-trace)",
      marginTop: "3px"
    }
  }, trace));
}
Object.assign(__ds_scope, { TraceSeal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/semantic/TraceSeal.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface for Terra Comum. A bordered panel on the dark
 * canvas; set `active` for the emerald-highlighted state and `interactive`
 * for the hover-lift used by clickable cards (e.g. agents).
 */
function Card({
  children,
  active = false,
  interactive = false,
  padding = "var(--space-5)",
  style = {},
  ...rest
}) {
  const base = {
    background: "var(--surface-card)",
    border: `1px solid ${active ? "var(--accent)" : "var(--border-subtle)"}`,
    borderRadius: "var(--radius-md)",
    padding,
    boxShadow: active ? "var(--glow-accent)" : "var(--shadow-sm)",
    transition: "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    ...style
  };
  const handlers = interactive ? {
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-3px)";
      if (!active) e.currentTarget.style.borderColor = "var(--forest-500)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "";
      if (!active) e.currentTarget.style.borderColor = "var(--border-subtle)";
    }
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Metric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Metric — a single stat block: big value + label, used in analysis panels.
 * `tone` colors the value (e.g. déficit in amber, conforme in emerald).
 */
function Metric({
  value,
  label,
  unit = null,
  tone = "default",
  style = {},
  ...rest
}) {
  const tones = {
    default: "var(--text-strong)",
    ok: "var(--ok)",
    alert: "var(--alert)",
    leaf: "var(--leaf-500)"
  };
  const c = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "14px 16px",
      minWidth: "130px",
      flex: 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--text-2xl)",
      color: c,
      lineHeight: 1.05,
      letterSpacing: "var(--tracking-tight)"
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-md)",
      marginLeft: "3px",
      opacity: 0.8
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)",
      marginTop: "5px",
      lineHeight: 1.4
    }
  }, label));
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Metric.jsx", error: String((e && e.message) || e) }); }

// ui_kits/agent-hub/AgentCard.jsx
try { (() => {
/* AgentCard — one agent in the hub grid. */
const {
  Card: ACard,
  Avatar: AAvatar,
  Badge: ABadge,
  Tag: ATag,
  Button: AButton
} = window.TerraComumDesignSystem_e77cb3;
function AgentCard({
  agent,
  selected,
  onOpen,
  onSelect
}) {
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement(ACard, {
    active: selected,
    interactive: true,
    onClick: () => onSelect && onSelect(agent.name),
    style: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(AAvatar, {
    tone: agent.tone,
    size: 46,
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": agent.icon
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 17px var(--font-display)",
      color: "var(--text-strong)",
      letterSpacing: "-.01em"
    }
  }, agent.title), agent.operacional ? /*#__PURE__*/React.createElement(ABadge, {
    tone: "active",
    dot: true
  }, "ativo") : /*#__PURE__*/React.createElement(ABadge, {
    tone: "muted"
  }, "demonstrativo")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "12px var(--font-sans)",
      color: "var(--text-faint)",
      marginTop: 3
    }
  }, "para: ", agent.persona))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "13.5px/1.5 var(--font-sans)",
      color: "var(--text-body)",
      margin: "13px 0 0"
    }
  }, agent.description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      margin: "13px 0 0"
    }
  }, agent.tools.map(t => /*#__PURE__*/React.createElement(ATag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 15,
      paddingTop: 14,
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-sans)",
      color: "var(--text-faint)",
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user-round",
    style: {
      width: 13,
      height: 13
    }
  }), agent.author), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), agent.operacional ? /*#__PURE__*/React.createElement(AButton, {
    variant: "primary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    }),
    onClick: e => {
      e.stopPropagation();
      onOpen && onOpen(agent);
    }
  }, "Abrir") : /*#__PURE__*/React.createElement(AButton, {
    variant: "ghost",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      onSelect && onSelect(agent.name);
    }
  }, "Detalhes")));
}
window.AgentCard = AgentCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/agent-hub/AgentCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/agent-hub/AgentDetail.jsx
try { (() => {
/* AgentDetail — slide-in drawer with the selected agent's detail + sample trace. */
const {
  Avatar: DAvatar,
  Badge: DBadge,
  Tag: DTag,
  Button: DButton,
  TraceSeal: DSeal
} = window.TerraComumDesignSystem_e77cb3;
function AgentDetail({
  agent,
  onClose,
  onOpen
}) {
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const open = !!agent;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(6,16,12,.55)",
      backdropFilter: "blur(2px)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity .25s",
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      height: "100vh",
      width: 420,
      maxWidth: "92vw",
      background: "var(--bg-canvas)",
      borderLeft: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-lg)",
      zIndex: 41,
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .3s var(--ease-out)",
      display: "flex",
      flexDirection: "column"
    }
  }, agent && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "20px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(DAvatar, {
    tone: agent.tone,
    size: 48,
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": agent.icon
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 20px var(--font-display)",
      color: "var(--text-strong)"
    }
  }, agent.title), agent.operacional ? /*#__PURE__*/React.createElement(DBadge, {
    tone: "active",
    dot: true
  }, "ativo") : /*#__PURE__*/React.createElement(DBadge, {
    tone: "muted"
  }, "demonstrativo")), /*#__PURE__*/React.createElement("code", {
    style: {
      font: "11px var(--font-mono)",
      color: "var(--text-faint)"
    }
  }, agent.name, ".yaml")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      padding: 4,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 20,
      height: 20
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px",
      overflowY: "auto",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Para quem",
    icon: "user-round"
  }, agent.persona), /*#__PURE__*/React.createElement(Field, {
    label: "O que faz",
    icon: "sparkles"
  }, agent.detalhe), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    icon: "wrench",
    label: "Ferramentas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 9
    }
  }, agent.tools.map(t => /*#__PURE__*/React.createElement(DTag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    icon: "shield-check",
    label: "Exemplo de rastreabilidade"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement(DSeal, {
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "book-open"
    }),
    source: agent.rastro.source,
    trace: agent.rastro.trace
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "13px 15px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      font: "12px var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "git-fork",
    style: {
      width: 15,
      height: 15,
      color: "var(--accent)"
    }
  }), "Raciocina sobre ", /*#__PURE__*/React.createElement("code", {
    style: {
      font: "11.5px var(--font-mono)",
      color: "var(--mint-400)"
    }
  }, "car.ttl"), " \u2014 a mesma ontologia de todos os agentes."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 22px",
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      gap: 10
    }
  }, agent.operacional ? /*#__PURE__*/React.createElement(DButton, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    }),
    onClick: () => onOpen && onOpen(agent),
    style: {
      flex: 1
    }
  }, "Abrir o ", agent.title) : /*#__PURE__*/React.createElement(DButton, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "rocket"
    }),
    style: {
      flex: 1
    }
  }, "Solicitar piloto")))));
}
function FieldLabel({
  icon,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      font: "var(--fw-semibold) 10.5px var(--font-sans)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 13,
      height: 13
    }
  }), label);
}
function Field({
  label,
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FieldLabel, {
    icon: icon,
    label: label
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "14px/1.55 var(--font-sans)",
      color: "var(--text-body)",
      margin: "8px 0 0"
    }
  }, children));
}
window.AgentDetail = AgentDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/agent-hub/AgentDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/agent-hub/HubShell.jsx
try { (() => {
/* HubShell — the platform app shell: brand sidebar + topbar + content slot. */
const {
  Button: ShellButton,
  Badge: ShellBadge,
  Avatar: ShellAvatar
} = window.TerraComumDesignSystem_e77cb3;
function NavItem({
  icon,
  label,
  active,
  badge,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      width: "100%",
      padding: "9px 12px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid " + (active ? "var(--border-subtle)" : "transparent"),
      background: active ? "var(--surface-card)" : hover ? "rgba(255,255,255,.04)" : "transparent",
      color: active ? "var(--text-strong)" : "var(--text-muted)",
      font: "var(--fw-semibold) var(--text-sm)/1 var(--font-sans)",
      cursor: "pointer",
      textAlign: "left",
      transition: "background .15s, color .15s"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 17,
      height: 17,
      color: active ? "var(--accent)" : "currentColor",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 11px var(--font-mono)",
      color: active ? "var(--accent)" : "var(--text-faint)"
    }
  }, badge));
}
function HubShell({
  children,
  nav,
  onNav,
  env,
  onNewAgent
}) {
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "248px 1fr",
      minHeight: "100vh",
      background: "var(--bg-base)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: "var(--surface-inset)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      padding: "20px 16px",
      position: "sticky",
      top: 0,
      height: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "2px 6px 20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      background: "var(--pine-500)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/leaf-mark-cut.png",
    alt: "",
    style: {
      width: "82%",
      height: "82%",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1 var(--font-display)",
      color: "var(--text-strong)",
      letterSpacing: "-.02em"
    }
  }, "Terra ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "Comum")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 9.5px var(--font-sans)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      marginTop: 3
    }
  }, "Agent Hub"))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 10px var(--font-sans)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      padding: "0 6px 8px"
    }
  }, "Plataforma"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "layout-grid",
    label: "Agentes",
    badge: 4,
    active: nav === "agentes",
    onClick: () => onNav && onNav("agentes")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "git-fork",
    label: "Ontologia",
    active: nav === "ontologia",
    onClick: () => onNav && onNav("ontologia")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "satellite",
    label: "Valida\xE7\xE3o",
    active: nav === "validacao",
    onClick: () => onNav && onNav("validacao")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "map",
    label: "Territ\xF3rio",
    active: nav === "territorio",
    onClick: () => onNav && onNav("territorio")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      font: "var(--fw-semibold) 10px var(--font-sans)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      padding: "0 6px 8px"
    }
  }, "Aberto"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "book-open",
    label: "Documenta\xE7\xE3o",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "globe",
    label: "Bem p\xFAblico (DPG)",
    onClick: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "11px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      boxShadow: "0 0 8px var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 11px var(--font-sans)",
      color: "var(--text-body)"
    }
  }, "ontologia carregada")), /*#__PURE__*/React.createElement("code", {
    style: {
      display: "block",
      font: "10.5px var(--font-mono)",
      color: "var(--text-faint)",
      marginTop: 6
    }
  }, "backend/ontologia/car.ttl")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 28px",
      height: 64,
      borderBottom: "1px solid var(--border-subtle)",
      background: "rgba(12,28,22,.72)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Agentes"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--surface-inset)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      padding: "7px 14px",
      width: 260,
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 15,
      height: 15
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar agente ou regra\u2026",
    style: {
      border: "none",
      background: "transparent",
      outline: "none",
      color: "var(--text-body)",
      font: "13px var(--font-sans)",
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(ShellBadge, {
    tone: env === "ao vivo" ? "active" : "muted",
    dot: true
  }, env || "demo"), /*#__PURE__*/React.createElement(ShellButton, {
    variant: "primary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "plus"
    }),
    onClick: onNewAgent
  }, "Publicar agente")), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "28px",
      flex: 1,
      maxWidth: 1180,
      width: "100%"
    }
  }, children)));
}
window.HubShell = HubShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/agent-hub/HubShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/agent-hub/ValidationPanel.jsx
try { (() => {
/* ValidationPanel — "Validação antecipada: déficit de APP". */
const {
  Card: VCard,
  Metric: VMetric,
  TraceSeal: VSeal,
  Badge: VBadge
} = window.TerraComumDesignSystem_e77cb3;
function ValidationPanel({
  analise
}) {
  React.useEffect(() => {
    window.lucide && lucide.createIcons();
  });
  const a = analise;
  const tone = a.conforme ? "ok" : "alert";
  const status = a.conforme ? "conforme" : "déficit";
  return /*#__PURE__*/React.createElement(VCard, {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      background: "rgba(47,211,154,.14)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "satellite",
    style: {
      width: 19,
      height: 19,
      color: "var(--accent)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--fw-bold) 18px var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Valida\xE7\xE3o antecipada"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "12.5px var(--font-sans)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "A plataforma ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, "descobre"), " o problema \u2014 geometria \xD7 ontologia \u2014 antes do produtor enviar.")), /*#__PURE__*/React.createElement(VBadge, {
    tone: "alert",
    dot: true
  }, status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(VMetric, {
    value: a.faixa_exigida_m,
    unit: "m",
    label: "faixa de APP exigida (da ontologia)"
  }), /*#__PURE__*/React.createElement(VMetric, {
    value: a.deficit_m2.toLocaleString("pt-BR"),
    unit: "m\xB2",
    tone: tone,
    label: "déficit de mata ciliar (" + status + ")"
  }), /*#__PURE__*/React.createElement(VMetric, {
    value: a.deficit_ha,
    unit: "ha",
    tone: tone,
    label: "em hectares"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(VSeal, {
    tone: "alert",
    icon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "book-open"
    }),
    title: "Regra aplicada",
    source: a.fonte,
    trace: a.rastro_ontologia
  })));
}
window.ValidationPanel = ValidationPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/agent-hub/ValidationPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/agent-hub/hub-data.js
try { (() => {
/* Terra Comum — Agent Hub demo data (mirrors web/hub.html fallbacks). */
window.HUB_AGENTS = [{
  name: "compadre",
  title: "Compadre",
  description: "Ajuda o produtor rural a entender e corrigir o CAR pelo WhatsApp.",
  persona: "Seu Raimundo (produtor)",
  tools: ["consultar_sicar", "consultar_ontologia", "traduzir_llm"],
  operacional: true,
  icon: "message-circle",
  tone: "pine",
  author: "Terra Comum",
  detalhe: "Primeiro agente da plataforma. Conversa em linguagem simples, lê a situação do imóvel no SICAR e traduz cada pendência com a regra do Código Florestal por trás.",
  rastro: {
    source: "Lei 12.651/2012, Art. 29, §1º",
    trace: "car:Pendencia_CIB"
  }
}, {
  name: "auditor",
  title: "Auditor",
  description: "Ajuda o analista do OEMA a checar pendências e gerar parecer.",
  persona: "Luana (analista ambiental)",
  tools: ["consultar_sicar", "consultar_ontologia", "analise_espacial"],
  operacional: false,
  icon: "search-check",
  tone: "emerald",
  author: "OEMA / parceria",
  detalhe: "Cruza a geometria do imóvel com a ontologia e monta um rascunho de parecer técnico, já com as fontes legais citadas.",
  rastro: {
    source: "Lei 12.651/2012, Art. 12",
    trace: "car:ReservaLegal"
  }
}, {
  name: "territorial",
  title: "Territorial",
  description: "Déficit de Reserva Legal por município, para o governo.",
  persona: "Gestor público",
  tools: ["consultar_ontologia", "analise_espacial"],
  operacional: false,
  icon: "map",
  tone: "leaf",
  author: "Governo (piloto)",
  detalhe: "Agrega a mesma camada semântica em escala municipal: onde está o passivo ambiental e quanto falta regularizar.",
  rastro: {
    source: "Lei 12.651/2012, Art. 12, §4º",
    trace: "car:DeficitRL_municipio"
  }
}, {
  name: "credito",
  title: "Crédito",
  description: "Carteira elegível a crédito verde, para cooperativas.",
  persona: "Cooperativa de crédito",
  tools: ["consultar_ontologia", "scoring"],
  operacional: false,
  icon: "coins",
  tone: "amber",
  author: "Cooperativa (piloto)",
  detalhe: "Lê o CAR regularizado e identifica quais produtores destravam linhas de crédito verde (Pronaf Eco, PSA).",
  rastro: {
    source: "Resolução BCB nº 140/2021",
    trace: "car:ElegibilidadeCredito"
  }
}];
window.HUB_ANALISE = {
  faixa_exigida_m: 30,
  deficit_m2: 1800,
  deficit_ha: 0.18,
  conforme: false,
  fonte: "Lei 12.651/2012, Art. 4º, I, alínea a",
  rastro_ontologia: "car:FaixaAPP_ate10"
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/agent-hub/hub-data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TraceSeal = __ds_scope.TraceSeal;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Metric = __ds_scope.Metric;

})();
