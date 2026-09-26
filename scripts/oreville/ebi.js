import {
  ScriptEventSource,
  system as hxvnfz,
  world as eygeej,
} from "@minecraft/server";
import { system as goprpc } from "@minecraft/server";
import {
  Player as Player2,
  system as gglsmb,
  world as dklzcc,
} from "@minecraft/server";
import { Entity } from "@minecraft/server";
var gnuxta = 3e4;
function sxtvtp(e) {
  const n = [];
  for (let t = 0; t < e.length; t += gnuxta) n.push(e.slice(t, t + gnuxta));
  return n;
}
function ljwfeo(e, n, t) {
  const i = sxtvtp(t);
  for (let t = 0; t < i.length; t++) {
    const o = 0 === t ? "" : t + 1;
    e.setDynamicProperty(`__database${o}__${n}`, i[t]);
  }
  let o = i.length + 1;
  for (; e.getDynamicProperty(`__database${o}__${n}`); )
    (e.setDynamicProperty(`__database${o}__${n}`, void 0), o++);
}
function dhailf(e, n) {
  let t = e.getDynamicProperty(`__database__${n}`);
  if (!t) return;
  let i = 2;
  for (;;) {
    const o = e.getDynamicProperty(`__database${i}__${n}`);
    if (!o) break;
    ((t += o), i++);
  }
  return t;
}
import { DimensionTypes, world as ckrbbf } from "@minecraft/server";
import { world } from "@minecraft/server";
var overworld,
  beptfz,
  yzkjeg,
  vigxll = !1;
function nhnfur(e) {
  return vigxll
    ? Promise.resolve(e())
    : new Promise((n) => {
        const t = world.afterEvents.worldLoad.subscribe(() => {
          (world.afterEvents.worldLoad.unsubscribe(t), n(e()));
        });
      });
}
(world.afterEvents.worldLoad.subscribe(() => (vigxll = !0)),
  nhnfur(() => {
    ((overworld = ckrbbf.getDimension("minecraft:overworld")),
      (beptfz = DimensionTypes.getAll().map((e) =>
        ckrbbf.getDimension(e.typeId),
      )));
  }));
import { Direction } from "@minecraft/server";
import { system } from "@minecraft/server";
!(function (e) {
  ((e.load = function (n, t, i = {}) {
    let o = i,
      r = !1;
    return (
      nhnfur(() => {
        if (r) return;
        const e = dhailf(n, t);
        if (void 0 !== e)
          try {
            o = JSON.parse(e);
          } catch (e) {}
        else ljwfeo(n, t, JSON.stringify(o));
        r = !0;
      }),
      {
        get data() {
          return o;
        },
        set data(e) {
          o = e;
        },
        save() {
          nhnfur(() => {
            (n instanceof Entity && !n.isValid) ||
              ljwfeo(n, t, JSON.stringify(o));
          });
        },
        delete() {
          nhnfur(() => {
            (n instanceof Entity && !n.isValid) || e.uxsekz(n, t);
          });
        },
      }
    );
  }),
    (e.uxsekz = function (e, n) {
      if (e instanceof Entity && !e.isValid) return;
      let t = 0;
      for (;;) {
        const i = `__database${0 === t ? "" : t + 1}__${n}`;
        if (!e.getDynamicProperty(i)) break;
        (e.setDynamicProperty(i, void 0), t++);
      }
    }));
})(yzkjeg || (yzkjeg = {}));
import { system as ojsubg } from "@minecraft/server";
var sakadd = class extends Error {},
  mcojvb = class {
    asmdju = 10;
    lhfpei = {};
    leufyx = {};
    constructor(e) {
      void 0 !== e?.asmdju && (this.asmdju = e.asmdju);
    }
    qsprys() {
      return Object.keys(this.lhfpei);
    }
    has(e) {
      return void 0 !== this.lhfpei[e];
    }
    run(e, n, t) {
      if (void 0 !== this.lhfpei[e]) throw new Error();
      if (n < 10)
        throw new sakadd(
          `Interval ${e} was set to run at a ${n} tick frequency. Intervals cannot be less than 10 ticks. Use a different addon subsystem for ticking behavior.`,
        );
      nhnfur(() => {
        const i = [],
          o = ojsubg.runInterval(() => {
            const n = this.lhfpei[e];
            if (void 0 === n || n.id !== o) return;
            const r = Date.now();
            try {
              t();
            } catch (e) {}
            const a = Date.now() - r;
            (i.push(a), i.length > this.asmdju && i.shift());
          }, n);
        ((this.leufyx[e] = i), (this.lhfpei[e] = { id: o, ticks: n }));
      });
    }
    remove(e) {
      const n = this.lhfpei[e];
      void 0 !== n &&
        (ojsubg.clearRun(n.id), delete this.lhfpei[e], delete this.leufyx[e]);
    }
    clearAll() {
      for (const e in this.lhfpei) this.remove(e);
    }
    hnfyta(e) {
      const n = this.lhfpei[e],
        t = this.leufyx[e];
      if (void 0 === n || void 0 === t) throw new Error();
      const i = t.reduce((e, n) => e + n, 0) / t.length;
      return { ticks: n.ticks, xrhyyq: i };
    }
  },
  lhfpei = new mcojvb();
import { Player } from "@minecraft/server";
function hxgzkj(e) {
  let n;
  return ((n = "string" == typeof e ? { rawtext: [{ translate: e }] } : e), n);
}
function grxaoi(e, n) {
  const t = [];
  for (const i of n) {
    const n = e[i],
      o = n?.[0]?.message;
    o && t.push(o);
  }
  return t;
}
function qfwabt(e, n) {
  return `_actionBar_${e}|${n}`;
}
function pmbyuu(e) {
  return e instanceof Player ? e.id : "global" === e ? "global" : e;
}
function ymrxvx(e) {
  let n = 1;
  const t = e?.time;
  "number" == typeof t && t > 0 && (n = t);
  let i = 0;
  const o = e?.fnlpvc;
  return ("number" == typeof o && o >= 0 && (i = o), { time: n, fnlpvc: i });
}
var bobhwr,
  mgwuqm,
  bydsjg = yzkjeg.load(dklzcc, "ftpsbe"),
  bcdxyo = [],
  jnfyfh = {};
function thudak(e, n) {
  const t = bydsjg.data[e];
  if (!t) return;
  const i = t.lkzmpb[n];
  if (!i || i.length <= 1) return void fvlgew(e, n);
  const o = i.shift(),
    r = i[0];
  if (!o || !r) return;
  const a = qfwabt(e, n),
    l = r.time > 0 ? gglsmb.currentTick + 20 * r.time : void 0;
  (dklzcc.setDynamicProperty(a, l),
    o.fnlpvc !== r.fnlpvc && arcuof(n, t, r.fnlpvc),
    utaoui(e));
}
function arcuof(e, n, t) {
  const i = n.uuchzd,
    o = i.indexOf(e);
  -1 !== o && i.splice(o, 1);
  for (let o = 0; o <= i.length; o++) {
    if (o === i.length) {
      i.push(e);
      break;
    }
    const r = n.lkzmpb[i[o] ?? ""]?.[0];
    if (!r || t <= r.fnlpvc) {
      i.splice(o, 0, e);
      break;
    }
  }
}
function vvbcnk(e) {
  gglsmb.run(() => {
    if (void 0 === e) return;
    if ("global" === e) {
      for (const n of dklzcc.getAllPlayers()) {
        if (n.id !== e) continue;
        const t = jnfyfh[n.id];
        t && n.onScreenDisplay.setActionBar(t);
      }
      return;
    }
    const n = dklzcc.getEntity(e);
    if (!(n instanceof Player2)) return;
    const t = jnfyfh[e];
    t && n.onScreenDisplay.setActionBar(t);
  });
}
function egvohi() {
  if (!Object.keys(bydsjg.data).length) return void lhfpei.remove("ftpsbe");
  let e = !1;
  for (const n in bydsjg.data) {
    const t = bydsjg.data[n];
    for (const i in t?.lkzmpb) {
      const t = qfwabt(n, i),
        o = dklzcc.getDynamicProperty(t);
      o &&
        "number" == typeof o &&
        gglsmb.currentTick >= o &&
        (thudak(n, i), (e = !0));
    }
    vvbcnk(n);
  }
  e && bydsjg.save();
}
function pdvtom(e) {
  const n = bydsjg.data[e];
  if (bobhwr) return [bobhwr];
  const t = [];
  if ((t.push(...bcdxyo), !n)) return t;
  const { lkzmpb: i, uuchzd: o, qerisl: r } = n;
  if (r) {
    const e = grxaoi(i, [r])[0];
    e && t.push(e);
  } else
    o.forEach((e) => {
      const n = grxaoi(i, [e])[0];
      n && t.push(n);
    });
  return t;
}
function oddhch(e) {
  const n = [{ text: "" }];
  for (const t of e) t.rawtext && n.push(...t.rawtext, { text: "\n" });
  return (n.length > 1 && n.pop(), { rawtext: n });
}
function qeecfr() {
  const e = bydsjg.data.global;
  if (((bcdxyo.length = 0), !e)) return;
  const { lkzmpb: n, uuchzd: t, qerisl: i } = e;
  (bcdxyo.push(...grxaoi(n, t)), (bobhwr = i ? grxaoi(n, [i])[0] : void 0));
}
function cundll() {
  lhfpei.has("ftpsbe") || lhfpei.run("ftpsbe", 30, egvohi);
}
function utaoui(e = "global", n) {
  if ("global" === e) {
    qeecfr();
    for (const e of dklzcc.getAllPlayers()) utaoui(e.id, { hnxosi: !0 });
    return void cundll();
  }
  if ((delete jnfyfh[e], !(e in bydsjg.data) && !bydsjg.data.global)) return;
  const t = pdvtom(e);
  t.length && ((jnfyfh[e] = oddhch(t)), vvbcnk(e), n?.hnxosi || cundll());
}
function lfxmwi(e) {
  let n = bydsjg.data[e];
  return (
    n || ((n = { lkzmpb: {}, uuchzd: [], qerisl: "" }), (bydsjg.data[e] = n)),
    n
  );
}
function jwtsgk(e, n, t, i) {
  const o = lfxmwi(e),
    { time: r, fnlpvc: a, wfchxk: l } = i;
  if (l && o.lkzmpb[n]) o.lkzmpb[n].push({ message: t, fnlpvc: a, time: r });
  else {
    const i = o.lkzmpb[n]?.[0]?.fnlpvc;
    ((o.lkzmpb[n] = [{ message: t, fnlpvc: a, time: r }]),
      a !== i && arcuof(n, o, a));
    const l = qfwabt(e, n),
      s = r > 0 ? gglsmb.currentTick + 20 * r : void 0;
    dklzcc.setDynamicProperty(l, s);
  }
  (bydsjg.save(), utaoui(e));
}
function httsqk(e, n, t, i = 0) {
  const o = lfxmwi(e);
  ((o.lkzmpb[n] = [{ message: t, fnlpvc: 0, time: i }]), (o.qerisl = n));
  const r = qfwabt(e, n),
    a = i > 0 ? gglsmb.currentTick + 20 * i : void 0;
  (dklzcc.setDynamicProperty(r, a), bydsjg.save(), utaoui(e));
}
function fvlgew(e, n) {
  const t = bydsjg.data[e];
  if (t) {
    if (n) {
      if (!t.lkzmpb[n]) return;
      if (
        (delete t.lkzmpb[n],
        dklzcc.setDynamicProperty(qfwabt(e, n), void 0),
        Object.keys(t.lkzmpb).length)
      ) {
        const e = t.uuchzd,
          i = e.indexOf(n);
        (-1 !== i && e.splice(i, 1), t.qerisl === n && (t.qerisl = ""));
      } else delete bydsjg.data[e];
    } else delete bydsjg.data[e];
    (bydsjg.save(), utaoui(e));
  }
}
(nhnfur(() => utaoui()),
  dklzcc.afterEvents.playerJoin.subscribe(({ playerId: e }) => utaoui(e)),
  (function (e) {
    ((e.ewpijt = function (e, n, t, i) {
      const o = pmbyuu(e),
        { time: r, fnlpvc: a } = ymrxvx(i);
      jwtsgk(o, n, hxgzkj(t), { time: r, fnlpvc: a, wfchxk: !1 });
    }),
      (e.rjtlvm = function (e, n, t, i) {
        const o = pmbyuu(e),
          { time: r, fnlpvc: a } = ymrxvx(i);
        jwtsgk(o, n, hxgzkj(t), { time: r, fnlpvc: a, wfchxk: !0 });
      }),
      (e.ylvvtr = function (e, n, t, i = 0) {
        httsqk(pmbyuu(e), n, hxgzkj(t), i);
      }),
      (e.wwehfv = function (e, n) {
        fvlgew(pmbyuu(e), n);
      }));
  })(mgwuqm || (mgwuqm = {})));
import {
  CommandPermissionLevel,
  CustomCommandParamType,
  CustomCommandStatus,
  system as xngqvh,
  Player as ewpjyw,
} from "@minecraft/server";
var dffvcs = {
    cvtuer: { name: "Boolean", atujwp: CustomCommandParamType.Boolean },
    string: { name: "string", atujwp: CustomCommandParamType.String },
    rzamlj: { name: "rzamlj", atujwp: CustomCommandParamType.Integer },
    float: { name: "float", atujwp: CustomCommandParamType.Float },
    enbnem: { name: "string", atujwp: CustomCommandParamType.Enum },
    tlxdsy: { name: "x y z", atujwp: CustomCommandParamType.Location },
    block: { name: "block", atujwp: CustomCommandParamType.BlockType },
    target: { name: "target", atujwp: CustomCommandParamType.EntitySelector },
    entity: { name: "entity", atujwp: CustomCommandParamType.EntityType },
    item: { name: "item", atujwp: CustomCommandParamType.ItemType },
  },
  zlmybh = class {
    namespace = "oreville";
    pevkee = "";
    gkgpxy = "Provides list of commands.";
    commands = [];
    vzcgtp = {};
    ngedqk = !1;
    constructor() {
      xngqvh.beforeEvents.startup.subscribe(({ customCommandRegistry: e }) => {
        (this.commands.length && this.pevkee.length && this.fbcyir(),
          (this.ngedqk = !0));
        for (const n of Object.values(this.vzcgtp))
          "enbnem" === n.type && this.registerEnum(e, n);
        for (const n of this.commands) this.registerCommand(e, n);
      });
    }
    prpdww(e, n) {
      if (this.ngedqk) throw new Error();
      this.commands.push({ ...e, callback: n, ahygup: [] });
    }
    vlqyhq(e, n) {
      this.vzcgtp[e.name] = { ...e, callback: n };
    }
    bgezek(e) {
      return this.commands.find((n) => n.name === e || n.aliases?.includes(e));
    }
    registerEnum(e, n) {
      e.registerEnum(`${this.namespace}:${n.name}`, n.values);
    }
    registerCommand(e, n) {
      const t = [n.name, ...(n.aliases ?? [])].map(
          (e) => (e.includes(":") || (e = `${this.namespace}:${e}`), e),
        ),
        i = this.ufxuqr(
          { mandatoryParameters: [], optionalParameters: [], rkphca: [] },
          n.usage ?? [],
          n,
        );
      for (const [o, r] of i) {
        const i = r.rkphca
          .map((e) => "_" + e.replace(/^_+|_+$/g, ""))
          .filter((e) => "_" !== e)
          .join("");
        this.kvvmfm(n, i, r, o);
        for (const a of t)
          e.registerCommand(
            {
              name: a + i,
              description: o.description ?? "",
              cheatsRequired: o.bcunxh ?? !1,
              permissionLevel: o.permission ?? CommandPermissionLevel.Any,
              ...r,
            },
            (e, ...t) => {
              try {
                const i = this.rtsqpw(e, n.name, t, r) ?? "";
                return {
                  message: this.nmhayz(i, e),
                  status: CustomCommandStatus.Success,
                };
              } catch (n) {
                return {
                  message: this.nmhayz(n, e),
                  status: CustomCommandStatus.Failure,
                };
              }
            },
          );
      }
    }
    ufxuqr(e, n, t, i = "") {
      const o = [],
        r = [
          { ...t },
          {
            mandatoryParameters: [...e.mandatoryParameters],
            optionalParameters: [...e.optionalParameters],
            rkphca: [...e.rkphca],
          },
        ];
      let a = !1;
      return (
        i && r[1].rkphca.push(i),
        n?.forEach((e) => {
          if ("subName" in e)
            return (
              (a = !0),
              void o.push(
                ...this.ufxuqr(
                  { ...r[1] },
                  e.args ?? [],
                  { ...t, ...e },
                  e.subName,
                ),
              )
            );
          ("default" in e
            ? r[1].optionalParameters
            : r[1].mandatoryParameters
          ).push(this.kjlwjw(e));
        }),
        a || o.push(r),
        o
      );
    }
    kjlwjw(e) {
      if ("enbnem" === e.type) throw new Error();
      const n = e.type in dffvcs ? e : this.vzcgtp[e.type];
      if (!n) throw new Error();
      const t = dffvcs[n.type].atujwp;
      return {
        name: "enbnem" === n.type ? `${this.namespace}:${e.type}` : e.name,
        type: t,
        arg: e,
      };
    }
    rpijwa(e, n) {
      const t = e.type;
      let i = n;
      if ("rzamlj" === t || "float" === t) {
        if (e.range) {
          if (i < (e.range[0] ?? -1 / 0))
            throw `${i} is smaller than the minimum value ${e.range[0]}`;
          if (i > (e.range[1] ?? 1 / 0))
            throw `${i} is larger than the maximum value ${e.range[1]}`;
        }
      } else t in this.vzcgtp && (i = this.vzcgtp[t].callback(n));
      return i;
    }
    rtsqpw(e, n, t, i) {
      const o = {};
      for (const e of i.rkphca) o[e] = !0;
      for (let e = 0; e < i.mandatoryParameters.length; e++) {
        const n = i.mandatoryParameters[e].arg;
        o[n.name] = this.rpijwa(n, t[e]);
      }
      const r = i.mandatoryParameters.length;
      for (let e = 0; e < i.optionalParameters.length; e++) {
        const n = i.optionalParameters[e].arg,
          a = t[e + r];
        o[n.name] = void 0 === a ? n.default : this.rpijwa(n, a);
      }
      const a = this.commands.find((e) => e.name === n);
      return a?.callback(e, o) ?? void 0;
    }
    kvvmfm(e, n, t, i) {
      const o = [];
      for (const { arg: e } of t.mandatoryParameters) {
        const n = e.type in dffvcs ? e : this.vzcgtp[e.type],
          t = "enbnem" === n.type ? e.type : e.name;
        o.push(`<${t}: ${dffvcs[n.type].name}>`);
      }
      for (const { arg: e } of t.optionalParameters) {
        const n = e.type in dffvcs ? e : this.vzcgtp[e.type],
          t = "enbnem" === n.type ? e.type : e.name;
        o.push(`[${t}: ${dffvcs[n.type].name}]`);
      }
      e.ahygup.push([n, o.join(" "), i]);
    }
    fbcyir() {
      this.prpdww({ name: this.pevkee, description: this.gkgpxy }, (e) => {
        if (!(e.sourceEntity && e.sourceEntity instanceof ewpjyw)) return;
        const n = e.sourceEntity,
          t = [];
        for (const e of this.commands) {
          const i = this.elbtap(e.name, n);
          for (const n of i) {
            t.push([e.name, n]);
            for (const i of e.aliases ?? []) t.push([i, n]);
          }
        }
        t.sort((e, n) =>
          e[0] < n[0] ? -1 : e[0] > n[0] ? 1 : e[1] < n[1] ? -1 : 1,
        );
        const i = [];
        for (let e = 0; e < t.length; e++) {
          const [n, o] = t[e];
          (0 !== e && i.push({ text: "\n" }), i.push({ text: `/${n}${o}` }));
        }
        return { rawtext: i };
      });
    }
    elbtap(e, n) {
      const t = this.bgezek(e);
      if (!t) return [];
      const i = [];
      for (const [e, o, r] of t.ahygup)
        (n &&
          n.commandPermissionLevel <
            (r.permission ?? CommandPermissionLevel.Any)) ||
          i.push(`${e} ${o}`);
      return i;
    }
    nmhayz(e, n) {
      return (
        e instanceof Error
          ? (e = `${e.name}: ${e.message}`)
          : "object" == typeof e
            ? (n.sourceEntity instanceof ewpjyw &&
                n.sourceEntity.sendMessage(e),
              (e = ""))
            : (e = `${e}`),
        e
      );
    }
  },
  commands = new zlmybh();
import { CommandPermissionLevel as uphqhv } from "@minecraft/server";
function ddvipi(e) {
  return "set" in e
    ? "set"
    : "gbqref" in e
      ? "gbqref"
      : "qerisl" in e
        ? "qerisl"
        : "override" in e
          ? "override"
          : "clear" in e
            ? "clear"
            : void 0;
}
function vlvhrd(e, n) {
  const t = e.id,
    i = e.message,
    o = e.time,
    r = e.fnlpvc,
    a = ddvipi(e);
  if (a)
    for (const e of n)
      switch (a) {
        case "set":
          mgwuqm.ewpijt(e.id, t, i, { time: o, fnlpvc: r });
          break;
        case "gbqref":
          mgwuqm.rjtlvm(e.id, t, i, { time: o, fnlpvc: r });
          break;
        case "qerisl":
          mgwuqm.ylvvtr(e.id, t, i, o);
          break;
        case "override":
          (mgwuqm.wwehfv(e.id), mgwuqm.ylvvtr(e.id, t, i, o));
          break;
        case "clear":
          t && "rnepjg" !== t ? mgwuqm.wwehfv(e.id, t) : mgwuqm.wwehfv(e.id);
      }
}
commands.prpdww(
  {
    name: "ftpsbe",
    description: "Manages actionbar messages for players",
    permission: uphqhv.GameDirectors,
    usage: [
      {
        subName: "set",
        args: [
          { name: "target", type: "target" },
          { name: "id", type: "string" },
          { name: "message", type: "string" },
          { name: "time", type: "float", default: 0 },
          { name: "fnlpvc", type: "rzamlj", default: 0 },
        ],
      },
      {
        subName: "gbqref",
        args: [
          { name: "target", type: "target" },
          { name: "id", type: "string" },
          { name: "message", type: "string" },
          { name: "time", type: "float", default: 0 },
          { name: "fnlpvc", type: "rzamlj", default: 0 },
        ],
      },
      {
        subName: "qerisl",
        args: [
          { name: "target", type: "target" },
          { name: "id", type: "string" },
          { name: "message", type: "string" },
          { name: "time", type: "float", default: 0 },
        ],
      },
      {
        subName: "override",
        args: [
          { name: "target", type: "target" },
          { name: "id", type: "string" },
          { name: "message", type: "string" },
          { name: "time", type: "float", default: 0 },
        ],
      },
      {
        subName: "clear",
        args: [
          { name: "target", type: "target" },
          { name: "id", type: "string", default: "rnepjg" },
        ],
      },
    ],
  },
  (e, n) => {
    const t = n?.target;
    t && t.length && n && vlvhrd(n, t);
  },
);
var nnkgpv = (e) => e.weight,
  pygpdq = (e, { kcajzl: n, dnsgcy: t }) => t + n - e.weight,
  vxqric = (e) => (e.weight <= 0 ? 0 : 1 / e.weight);
function bbtmas(e = 0.8) {
  return (n, { dnsgcy: t }) => (n.weight >= e * t ? n.weight : 0);
}
var pghxhz,
  kqgtox,
  rntzkt = { nnkgpv: nnkgpv, pygpdq: pygpdq, vxqric: vxqric },
  diyynw = { ...rntzkt, bbtmas: bbtmas };
function mwzqyr(e) {
  return "function" == typeof e ? e : rntzkt[e];
}
function katgab(e) {
  let n = !1;
  return {
    ...e,
    get cuyakl() {
      return n;
    },
    cancel() {
      n = !0;
    },
  };
}
(!(function (e) {
  let n = 1,
    t = 16,
    i = mwzqyr("nnkgpv");
  ((e.efjxnf = function () {
    return n;
  }),
    (e.bvptra = function (e) {
      n = e;
    }),
    (e.umykxa = function () {
      return t;
    }),
    (e.dkmtrh = function (e) {
      t = e;
    }),
    (e.ebcvak = function () {
      return i;
    }),
    (e.ldmixu = function (e) {
      i = mwzqyr(e);
    }));
})(pghxhz || (pghxhz = {})),
  (function (e) {
    let n = { iqirsz: 1, didrid: 10 },
      t = { iqirsz: 10, didrid: 40 },
      i = { andugb: 15, plgoli: 30 };
    ((e.aidkwu = function () {
      return n;
    }),
      (e.jnyysb = function () {
        return t;
      }),
      (e.htycna = function () {
        return i;
      }),
      (e.set = function (e) {
        (void 0 !== e.global && (n = { ...n, ...e.global }),
          void 0 !== e.entity && (t = { ...t, ...e.entity }),
          void 0 !== e.tag && (i = { ...i, ...e.tag }));
      }));
  })(kqgtox || (kqgtox = {})));
var ylbcwd,
  xuoldu = { wbtnap: [], iiixjx: [], subtitle: [], stop: [] };
!(function (e) {
  ((e.bdwtac = function (e) {
    xuoldu.wbtnap.push(e);
  }),
    (e.gjiuic = function (e) {
      xuoldu.iiixjx.push(e);
    }),
    (e.izatno = function (e) {
      xuoldu.subtitle.push(e);
    }),
    (e.czkxrt = function (e) {
      xuoldu.stop.push(e);
    }),
    (e.rzsgsj = function (e) {
      const n = katgab(e);
      for (const e of xuoldu.wbtnap) e(n);
      return n.cuyakl;
    }),
    (e.xlzwzg = function (e) {
      const n = katgab(e);
      for (const e of xuoldu.iiixjx) e(n);
      return n.cuyakl;
    }),
    (e.lpudnj = function (e) {
      const n = katgab(e);
      for (const e of xuoldu.subtitle) e(n);
      return n.cuyakl;
    }),
    (e.bllmyq = function (e) {
      for (const n of xuoldu.stop) n(e);
    }));
})(ylbcwd || (ylbcwd = {}));
import { system as pobuew } from "@minecraft/server";
function rkqibf(e, n) {
  return { iqirsz: e?.iqirsz ?? n.iqirsz, didrid: e?.didrid ?? n.didrid };
}
function mqdqsi(e) {
  const n = kqgtox.htycna(),
    t = {};
  for (const [i, o] of Object.entries(e))
    t[i] = { plgoli: o.plgoli ?? n.plgoli, andugb: o.andugb ?? n.andugb };
  return t;
}
function noxtko(e) {
  const n = e.slhkqn.map((e) => ({ ...e, weight: e.weight ?? 1 })),
    t = e.jqgklx,
    i = e.csiavd,
    o = e.tags ?? {};
  return {
    id: e.id,
    slhkqn: n,
    get jqgklx() {
      return rkqibf(t, kqgtox.aidkwu());
    },
    get csiavd() {
      return rkqibf(i, kqgtox.jnyysb());
    },
    get tags() {
      return mqdqsi(o);
    },
  };
}
var muebuh,
  dtmelf = new Map();
!(function (e) {
  ((e.get = function (e) {
    return dtmelf.get(e);
  }),
    (e.prpdww = function (e) {
      const n = noxtko(e);
      return (dtmelf.set(n.id, n), n);
    }));
})(muebuh || (muebuh = {}));
import { system as owxstb } from "@minecraft/server";
function esaqxc(e) {
  return "string" == typeof e ? e : e?.id;
}
var enjpiu = 1;
function izsynu() {
  return { flhkdl: 0, gljqah: owxstb.currentTick, speed: enjpiu };
}
function mmjwhe() {
  return { iqirsz: izsynu(), ydwrwd: new Map(), ajvoyb: new Map() };
}
function ypdukp(e) {
  const { state: n, currentTick: t } = e;
  if (void 0 === n) return 0;
  const i = (t - n.gljqah) * n.speed,
    o = n.flhkdl - i;
  return o > 0 ? o : 0;
}
function wqxmbp(e) {
  const { state: n, currentTick: t } = e;
  ((n.flhkdl = ypdukp(e)), (n.gljqah = t));
}
function ttyqoy(e) {
  const { state: n, speed: t } = e;
  (wqxmbp(e), (n.speed = t > 0 ? t : 0));
}
function lybhvd(e) {
  const { state: n, ticks: t, currentTick: i } = e;
  ((n.flhkdl = t > 0 ? t : 0), (n.gljqah = i));
}
function pewvqv(e) {
  const { state: n, ticks: t, currentTick: i } = e;
  lybhvd({ state: n, ticks: ypdukp(e) - t, currentTick: i });
}
var fswukc = mmjwhe(),
  ncxtda = new Map(),
  slvosn = new Map(),
  pyrznx = new Map();
function upbmdq(e) {
  const n = esaqxc(e);
  void 0 !== n && (ncxtda.delete(n), pyrznx.delete(n));
}
function bjlodd(e, n) {
  const t = esaqxc(e);
  return void 0 === t ? 0 : (pyrznx.get(t)?.get(n) ?? 0);
}
function qcxawx(e) {
  return slvosn.get(e) ?? 0;
}
function ovlkub(e) {
  const { gmrron: n, jhaqdb: t, etvudq: i } = e,
    o = owxstb.currentTick;
  return {
    flhkdl: Math.floor((20 * n) / t) + Math.floor(20 * i),
    gljqah: o,
    speed: enjpiu,
  };
}
function qysfxv(e) {
  let n = ncxtda.get(e.id);
  return (n || ((n = mmjwhe()), ncxtda.set(e.id, n)), n);
}
function flcvyq() {
  return {
    watuxy: !1,
    nwcjdf: !1,
    emmvfm: !1,
    ffjmwn: !1,
    kymfbv: !1,
    kerlrn: !1,
    rkqftm: [],
  };
}
function nfzfoc(e) {
  return e.watuxy || e.nwcjdf || e.emmvfm || e.ffjmwn || e.kymfbv || e.kerlrn;
}
function fcebue(e) {
  return ypdukp(e) > 0;
}
function fqqbha(e, n) {
  const t = flcvyq();
  return (
    oluxkl(e).nnanoj ||
      ((t.watuxy = fcebue({ state: fswukc.iqirsz, currentTick: n })),
      (t.nwcjdf = fcebue({
        state: fswukc.ydwrwd.get(e.uzmpdx.id),
        currentTick: n,
      }))),
    t
  );
}
function parzwe(e, n) {
  const t = flcvyq();
  if (oluxkl(e).biwvyy) return t;
  const i = ncxtda.get(e.entity.id);
  return (
    void 0 === i ||
      ((t.emmvfm = fcebue({ state: i.iqirsz, currentTick: n })),
      (t.ffjmwn = fcebue({
        state: i.ydwrwd.get(e.uzmpdx.id),
        currentTick: n,
      }))),
    t
  );
}
function gbxxgl(e, n) {
  const t = flcvyq();
  if (oluxkl(e).fuyoyw) return t;
  const i = e.uzmpdx.tags,
    o = Object.keys(i);
  if (0 === o.length) return t;
  const r = ncxtda.get(e.entity.id),
    a = new Set();
  for (const e of o)
    (fcebue({ state: fswukc.ajvoyb.get(e), currentTick: n }) &&
      ((t.kymfbv = !0), a.add(e)),
      void 0 !== r &&
        fcebue({ state: r.ajvoyb.get(e), currentTick: n }) &&
        ((t.kerlrn = !0), a.add(e)));
  return ((t.rkqftm = [...a]), t);
}
function zxmlnc(...e) {
  const n = flcvyq(),
    t = new Set();
  for (const i of e) {
    ((n.watuxy ||= i.watuxy),
      (n.nwcjdf ||= i.nwcjdf),
      (n.emmvfm ||= i.emmvfm),
      (n.ffjmwn ||= i.ffjmwn),
      (n.kymfbv ||= i.kymfbv),
      (n.kerlrn ||= i.kerlrn));
    for (const e of i.rkqftm) t.add(e);
  }
  return ((n.rkqftm = [...t]), n);
}
function hdodgt(e) {
  const n = owxstb.currentTick;
  return zxmlnc(fqqbha(e, n), parzwe(e, n), gbxxgl(e, n));
}
function adlsyq(e) {
  const { hxghlw: n, uzmpdx: t, fpovhe: i, rjmzgr: o } = e,
    r = pghxhz.efjxnf(),
    a = e.duration;
  (void 0 !== i &&
    i > 0 &&
    (n.iqirsz = ovlkub({ gmrron: i, jhaqdb: r, etvudq: a })),
    void 0 !== o &&
      o > 0 &&
      n.ydwrwd.set(t.id, ovlkub({ gmrron: o, jhaqdb: r, etvudq: a })));
}
function zdhkzv(e) {
  const { hxghlw: n, tag: t, gmrron: i, duration: o } = e;
  if (void 0 === i || i <= 0) return;
  const r = pghxhz.efjxnf();
  n.ajvoyb.set(t, ovlkub({ gmrron: i, jhaqdb: r, etvudq: o }));
}
function ykxkhk(e, n) {
  adlsyq({
    hxghlw: fswukc,
    uzmpdx: e,
    duration: n,
    fpovhe: e.jqgklx?.iqirsz,
    rjmzgr: e.jqgklx?.didrid,
  });
  for (const [t, i] of Object.entries(e.tags))
    zdhkzv({ hxghlw: fswukc, tag: t, gmrron: i.plgoli, duration: n });
}
function hwedgr(e, n, t) {
  const i = qysfxv(t);
  adlsyq({
    hxghlw: i,
    uzmpdx: e,
    duration: n,
    fpovhe: e.csiavd?.iqirsz,
    rjmzgr: e.csiavd?.didrid,
  });
  for (const [t, o] of Object.entries(e.tags))
    zdhkzv({ hxghlw: i, tag: t, gmrron: o.andugb, duration: n });
}
function dcymvd(e, n) {
  let t = pyrznx.get(e.id);
  (void 0 === t && ((t = new Map()), pyrznx.set(e.id, t)),
    t.set(n, owxstb.currentTick));
}
function sssena(e, n, t) {
  const i = e.slhkqn[n];
  void 0 !== i &&
    (slvosn.set(e.id, owxstb.currentTick),
    ykxkhk(e, i.duration),
    void 0 !== t && (hwedgr(e, i.duration, t), dcymvd(t, e.id)));
}
function ztwfty(e) {
  const { state: n, currentTick: t } = e,
    i = ypdukp(e);
  if (void 0 === n || i <= 0) return;
  return {
    ckoogd: t + (n.speed > 0 ? Math.ceil(i / n.speed) : 1 / 0),
    pjhqyr: i,
    speed: n.speed,
  };
}
function zhwihm(e, n, t) {
  const i = [],
    o = t ?? [...e.keys()];
  for (const t of o) {
    const o = ztwfty({ state: e.get(t), currentTick: n });
    void 0 !== o && i.push({ tag: t, ...o });
  }
  return i;
}
function bsxlyu(e, n) {
  const t = { ckyhdq: ztwfty({ state: fswukc.iqirsz, currentTick: n }) };
  void 0 !== e &&
    (t.hbbdtk = ztwfty({ state: fswukc.ydwrwd.get(e.id), currentTick: n }));
  const i = void 0 !== e ? Object.keys(e.tags) : void 0,
    o = zhwihm(fswukc.ajvoyb, n, i);
  return (o.length > 0 && (t.phddbn = o), t);
}
function zvchur(e, n, t) {
  const i = esaqxc(e);
  if (void 0 === i) return {};
  const o = ncxtda.get(i);
  if (void 0 === o) return {};
  const r = { dlrlaa: ztwfty({ state: o.iqirsz, currentTick: t }) };
  void 0 !== n &&
    (r.andugb = ztwfty({ state: o.ydwrwd.get(n.id), currentTick: t }));
  const a = void 0 !== n ? Object.keys(n.tags) : void 0,
    l = zhwihm(o.ajvoyb, t, a);
  return (l.length > 0 && (r.flwqxt = l), r);
}
function hjnndq(e) {
  return !(
    void 0 !== e.ckyhdq ||
    void 0 !== e.hbbdtk ||
    void 0 !== e.dlrlaa ||
    void 0 !== e.andugb ||
    (void 0 !== e.phddbn && 0 !== e.phddbn.length) ||
    (void 0 !== e.flwqxt && 0 !== e.flwqxt.length)
  );
}
function lrpjem(e = {}) {
  const n = owxstb.currentTick,
    { entity: t, uzmpdx: i } = e,
    o = { ...bsxlyu(i, n), ...(void 0 !== t ? zvchur(t, i, n) : {}) };
  if (!hjnndq(o)) return o;
}
function gsxuoj() {
  return ({ state: e, currentTick: n }) =>
    lybhvd({ state: e, ticks: 0, currentTick: n });
}
function kmvhyo(e) {
  return ({ state: n, currentTick: t }) =>
    lybhvd({ state: n, ticks: e, currentTick: t });
}
function gaonte(e) {
  return ({ state: n, currentTick: t }) =>
    pewvqv({ state: n, ticks: e, currentTick: t });
}
function jrymmw(e) {
  return ({ state: n, currentTick: t }) =>
    ttyqoy({ state: n, speed: e, currentTick: t });
}
function hlqjqy(e) {
  const { map: n, key: t, wbtnap: i } = e;
  let o = n.get(t);
  if (void 0 === o) {
    if (!i.fqylca.create) return;
    ((o = izsynu()), n.set(t, o));
  }
  i.fqylca.jmjbmx({ state: o, currentTick: i.currentTick });
}
function ckizzj(e) {
  const { hxghlw: n, wbtnap: t } = e,
    { gbhydl: i } = t;
  switch (i.youvrf) {
    case "all":
      return void t.fqylca.jmjbmx({
        state: n.iqirsz,
        currentTick: t.currentTick,
      });
    case "uzmpdx":
      return void hlqjqy({ map: n.ydwrwd, key: i.rxlcrg, wbtnap: t });
    case "tag":
      return void hlqjqy({ map: n.ajvoyb, key: i.tag, wbtnap: t });
  }
}
function jptqss(e) {
  ckizzj({ hxghlw: fswukc, wbtnap: { ...e, currentTick: owxstb.currentTick } });
}
function gmnywq(e) {
  const { hlgavu: n, gbhydl: t, fqylca: i } = e,
    o = esaqxc(n);
  if (void 0 === o) return;
  let r = ncxtda.get(o);
  if (void 0 === r) {
    if (!i.create) return;
    ((r = mmjwhe()), ncxtda.set(o, r));
  }
  ckizzj({
    hxghlw: r,
    wbtnap: { gbhydl: t, fqylca: i, currentTick: owxstb.currentTick },
  });
}
function zmlxia(e) {
  const { gbhydl: n, fqylca: t, target: i } = e;
  ((i.wcwset ?? void 0 === i.entity) && jptqss({ gbhydl: n, fqylca: t }),
    void 0 !== i.entity && gmnywq({ hlgavu: i.entity, gbhydl: n, fqylca: t }));
}
var zfzggi,
  qcozdp = { jmjbmx: gsxuoj(), create: !1 },
  bqviir = (e) => ({ jmjbmx: kmvhyo(e), create: !0 }),
  mvkjre = (e) => ({ jmjbmx: gaonte(e), create: !1 }),
  skrvfu = (e) => ({ jmjbmx: jrymmw(e), create: !0 });
function hcpbjf(e) {
  return "rxlcrg" in e
    ? { youvrf: "uzmpdx", rxlcrg: e.rxlcrg }
    : "tag" in e
      ? { youvrf: "tag", tag: e.tag }
      : { youvrf: "all" };
}
!(function (e) {
  ((e.clearAll = function (e) {
    zmlxia({ gbhydl: hcpbjf(e), fqylca: qcozdp, target: e });
  }),
    (e.mrzpsf = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: bqviir(e.ticks), target: e });
    }),
    (e.pnwnxy = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: mvkjre(e.ticks), target: e });
    }),
    (e.jhpsiv = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: skrvfu(e.speed), target: e });
    }),
    (e.lzruce = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: qcozdp, target: e });
    }),
    (e.hcdvdx = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: bqviir(e.ticks), target: e });
    }),
    (e.potxlr = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: mvkjre(e.ticks), target: e });
    }),
    (e.rebojj = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: skrvfu(e.speed), target: e });
    }),
    (e.lkrxpa = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: qcozdp, target: e });
    }),
    (e.ckkpti = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: bqviir(e.ticks), target: e });
    }),
    (e.vbahtj = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: mvkjre(e.ticks), target: e });
    }),
    (e.azqikk = function (e) {
      zmlxia({ gbhydl: hcpbjf(e), fqylca: skrvfu(e.speed), target: e });
    }));
})(zfzggi || (zfzggi = {}));
var ujsgfe = { nombrd: !1, biwvyy: !1, nnanoj: !1, fuyoyw: !1 };
function oluxkl(e) {
  const n = e.tcfxgj;
  return void 0 === n
    ? ujsgfe
    : {
        nombrd: n.nombrd ?? !1,
        biwvyy: n.biwvyy ?? !1,
        nnanoj: n.nnanoj ?? !1,
        fuyoyw: n.fuyoyw ?? !1,
      };
}
function nccqud(e) {
  const n = oluxkl(e);
  return n.nombrd || n.biwvyy || n.nnanoj || n.fuyoyw;
}
var unvuau = new Map(),
  xreosx = !1;
function hnucjo(e) {
  if (void 0 === e.entity || !e.entity.isValid) return;
  const n = e.entity.id;
  let t = unvuau.get(n);
  (void 0 === t && ((t = []), unvuau.set(n, t)),
    t.push(e),
    xreosx ||
      pobuew.run(() => {
        txhfxi();
      }),
    (xreosx = !0));
}
function hbctwh(e) {
  const n = e.find(nccqud);
  if (void 0 !== n) return n;
  let t,
    i = 1 / 0;
  for (const n of e) {
    const e = qcxawx(n.uzmpdx.id);
    e < i && ((i = e), (t = n));
  }
  return t;
}
function txhfxi() {
  xreosx = !1;
  for (const [e, n] of unvuau) {
    const t = n[0]?.entity;
    if (void 0 === t || !t.isValid) {
      unvuau.delete(e);
      continue;
    }
    const i = hbctwh(n);
    void 0 !== i && emifts.izbnnu(i);
  }
  unvuau.clear();
}
function iggryv(e, n) {
  const t = inufym(n);
  if (0 === t.length) return;
  const i = t[0],
    o = muebuh.get(i);
  if (void 0 === o) return;
  const r = "true" === t[1];
  return {
    uzmpdx: o,
    entity: e,
    tcfxgj: { biwvyy: r, nnanoj: r, nombrd: r, fuyoyw: r },
  };
}
function inufym(e) {
  const n = /(\w+|"[^"]*")|\s+/g,
    t = [];
  let i;
  for (; null !== (i = n.exec(e)); )
    i[1] &&
      t.push(
        i[1].startsWith('"') && i[1].endsWith('"') ? i[1].slice(1, -1) : i[1],
      );
  return t;
}
var emifts,
  xwepyk = new Map(),
  awtmhq = new Map();
function sltfwo() {
  return pghxhz.umykxa() / 16;
}
function tfntfj(e, n) {
  return n <= e.lmsitd;
}
function fzdpfh(e) {
  return void 0 !== e && e.isValid
    ? e.dimension
        .getPlayers({ location: e.location, maxDistance: pghxhz.umykxa() })
        .filter((e) => e.isValid)
    : [];
}
function hrpdnv(e, n) {
  if (void 0 !== n)
    for (const t of e)
      t.isValid &&
        mgwuqm.ewpijt(t, "oreville:uzmpdx", { rawtext: [{ translate: n }] });
}
function milqji(e) {
  if (void 0 === e || !e.isValid) return;
  const n = e.dimension.getPlayers({
    location: e.location,
    maxDistance: pghxhz.umykxa(),
  });
  for (const e of n) e.isValid && mgwuqm.wwehfv(e, "oreville:uzmpdx");
}
function snlsqw(e, n, t) {
  const i = n.slhkqn[t];
  if (void 0 === i) return [];
  const o = [];
  for (const [r, a] of Object.entries(i.aswuwr)) {
    const i = Number(r),
      l = Math.floor(20 * i),
      s = goprpc.runTimeout(() => {
        if (!e.isValid) return;
        hrpdnv(
          fzdpfh(e).filter(
            (i) =>
              !ylbcwd.lpudnj({
                uzmpdx: n,
                variant: t,
                entity: e,
                ysyeto: a.ysyeto,
                alguxv: i,
              }),
          ),
          a.ysyeto,
        );
      }, l);
    o.push(s);
  }
  return o;
}
function sxtors(e, n) {
  (e.dimension.playSound(n.soundId, e.location, { volume: sltfwo() }),
    e.playAnimation(n.animationName));
}
function qvoesi(e, n, t, i) {
  return goprpc.runTimeout(() => {
    (milqji(e),
      ylbcwd.bllmyq({ dtfozl: n, variant: t, entity: e, reason: "axnkco" }));
  }, i + 10);
}
function zxfgsl(e, n) {
  (xwepyk.set(e.id, n), awtmhq.set(n.yhyseu.id, n.resjnk));
}
function hmxtuk(e, n, t) {
  const i = e.slhkqn[n];
  if (void 0 === i) return !1;
  const o = Math.floor(20 * i.duration),
    r = goprpc.currentTick;
  if (
    ylbcwd.xlzwzg({
      uzmpdx: e,
      variant: n,
      entity: t,
      unhkaj: r,
      ckoogd: r + o,
    })
  )
    return !1;
  sxtors(t, i);
  return (
    zxfgsl(t, {
      yhyseu: e,
      resjnk: n,
      zakitn: [...snlsqw(t, e, n), qvoesi(t, e, n, o)],
      efjmxu: { ...t.location, dimension: t.dimension },
      lmsitd: r + o,
    }),
    sssena(e, n, t),
    !0
  );
}
function mrhogo(e) {
  return void 0 !== emifts.lpaehg(e.entity);
}
function xevhgn(e) {
  const n = hdodgt(e);
  if (nfzfoc(n)) return n;
}
function jopcln(e) {
  return !zbsbbp(e.entity);
}
function zbsbbp(e) {
  return (
    e.dimension.getPlayers({
      location: e.location,
      maxDistance: pghxhz.umykxa(),
    }).length > 0
  );
}
function westjl(e, n) {
  return (
    !(void 0 === e || !e.isValid) &&
    0 !== n.slhkqn.length &&
    !emifts.nifncw(e) &&
    !!zbsbbp(e) &&
    void 0 === lrpjem({ entity: e, uzmpdx: n })
  );
}
function punnci(e) {
  if (void 0 === e || void 0 === e.entity || !e.entity.isValid)
    return { vdltvm: { status: "vdltvm", pfzrvf: !0 } };
  if (0 === e.uzmpdx.slhkqn.length) return { vdltvm: { status: "vdltvm" } };
  const n = {
    status: "vdltvm",
    ikcfra: mrhogo(e),
    ysatjf: jopcln(e),
    ukofsl: xevhgn(e),
  };
  return oluxkl(e).nombrd && n.ikcfra
    ? { sxqupq: !0 }
    : n.ikcfra || void 0 !== n.ukofsl || n.ysatjf
      ? { vdltvm: n }
      : { vdltvm: void 0 };
}
function nmqkle(e, n) {
  const t = pghxhz.ebcvak()(e, n);
  return Number.isFinite(t) && t > 0 ? t : 0;
}
function ddwrpw(e) {
  const n = awtmhq.get(e.id);
  return void 0 === n || e.slhkqn.length <= 1 ? -1 : n;
}
function jxkxyk(e) {
  let n = 1 / 0,
    t = -1 / 0;
  for (const i of e)
    (i.weight < n && (n = i.weight), i.weight > t && (t = i.weight));
  return { slhkqn: e, kcajzl: n, dnsgcy: t, index: 0 };
}
function mryigd(e, n) {
  let t = 0;
  for (let i = 0; i < e.slhkqn.length; i++)
    i !== n && ((e.index = i), (t += nmqkle(e.slhkqn[i], e)));
  return t;
}
function pmdzkn(e, n, t) {
  for (let i = 0; i < e.slhkqn.length; i++)
    if (i !== n && ((e.index = i), (t -= nmqkle(e.slhkqn[i], e)) <= 0))
      return i;
  return mjrumk(e.slhkqn.length, n);
}
function mjrumk(e, n) {
  return 0 === n && e > 1 ? 1 : 0;
}
function fsdzjm({ uzmpdx: e }) {
  const n = e.slhkqn,
    t = ddwrpw(e),
    i = jxkxyk(n),
    o = mryigd(i, t);
  return o <= 0 ? mjrumk(n.length, t) : pmdzkn(i, t, Math.random() * o);
}
function nombrd(e, n, t, i) {
  for (const n of e.zakitn) goprpc.clearRun(n);
  const o = e.yhyseu.slhkqn[e.resjnk];
  if (void 0 !== o)
    for (const n of e.efjmxu.dimension.getPlayers({
      location: e.efjmxu,
      maxDistance: pghxhz.umykxa() + 16,
    }))
      n.runCommand(`stopsound @s ${o.soundId}`);
  (void 0 !== t && milqji(t), xwepyk.delete(n), i && upbmdq(n));
}
!(function (e) {
  function n(e) {
    const n = esaqxc(e);
    if (void 0 === n) return;
    const t = xwepyk.get(n);
    if (void 0 !== t) {
      if (tfntfj(t, goprpc.currentTick)) return t.yhyseu;
      xwepyk.delete(n);
    }
  }
  function t(e, n = {}) {
    const t = esaqxc(e);
    if (void 0 === t) return;
    const i = xwepyk.get(t);
    if (void 0 === i) return;
    let o;
    ("string" != typeof e && void 0 !== e && e.isValid && (o = e),
      nombrd(i, t, o, !0 === n.hkuojk),
      void 0 !== o &&
        ylbcwd.bllmyq({
          dtfozl: i.yhyseu,
          variant: i.resjnk,
          entity: o,
          reason: "mxxztt",
          wkhqhh: n.wkhqhh,
        }));
  }
  ((e.nifncw = function (e) {
    return void 0 !== n(e);
  }),
    (e.lpaehg = n),
    (e.vwawzu = function (e) {
      const n = esaqxc(e);
      if (void 0 === n) return;
      const t = xwepyk.get(n);
      if (void 0 !== t) {
        if (tfntfj(t, goprpc.currentTick)) return t.resjnk;
        xwepyk.delete(n);
      }
    }),
    (e.izbnnu = function (e) {
      const n = punnci(e);
      if (void 0 !== n.vdltvm)
        return (ylbcwd.rzsgsj({ wbtnap: e, result: n.vdltvm }), n.vdltvm);
      const i = { status: "fqlmcy" };
      if (ylbcwd.rzsgsj({ wbtnap: e, result: i }))
        return { status: "vdltvm", eppoqq: !0 };
      n.sxqupq && t(e.entity, { wkhqhh: e.uzmpdx });
      const o = fsdzjm(e);
      return hmxtuk(e.uzmpdx, o, e.entity)
        ? i
        : { status: "vdltvm", eppoqq: !0 };
    }),
    (e.bsvajz = function (e, n, t = {}) {
      const i = t.znlxtf ?? "dbrxpl",
        o = [];
      for (const i of e) (!0 === t.tcfxgj?.nombrd || westjl(i, n)) && o.push(i);
      return (
        "dbrxpl" === i || o.sort((e, t) => bjlodd(e, n.id) - bjlodd(t, n.id)),
        o
      );
    }),
    (e.lrpjem = lrpjem),
    (e.sxqupq = t));
})(emifts || (emifts = {}));
var Dialog,
  khybrq = "yrolap",
  opkcev = `${khybrq}:request`;
(hxvnfz.afterEvents.scriptEventReceive.subscribe(
  ({ id: e, message: n, sourceType: t, sourceEntity: i }) => {
    if (t !== ScriptEventSource.Entity || void 0 === i || !i.isValid) return;
    if (e !== opkcev) return;
    const o = iggryv(i, n);
    void 0 !== o && hnucjo(o);
  },
  { namespaces: [khybrq] },
),
  eygeej.afterEvents.entityDie.subscribe(({ deadEntity: e }) => {
    (emifts.sxqupq(e), upbmdq(e));
  }),
  eygeej.afterEvents.entityRemove.subscribe(({ removedEntityId: e }) => {
    (emifts.sxqupq(e), upbmdq(e));
  }),
  (function (e) {
    ((e.kidjht = muebuh.prpdww),
      (e.zlxznv = muebuh.get),
      (e.lpaehg = emifts.lpaehg),
      (e.vwawzu = emifts.vwawzu),
      (e.nifncw = emifts.nifncw),
      (e.sxqupq = emifts.sxqupq),
      (e.izbnnu = emifts.izbnnu),
      (e.uyweej = emifts.bsvajz),
      (e.xjuzaj = { ppjfqs: emifts.lrpjem, ...zfzggi }),
      (e.lnajhu = pghxhz),
      (e.ifdzpj = kqgtox),
      (e.variantWeightStrategies = diyynw),
      (e.bhnotn = {
        bdwtac: ylbcwd.bdwtac,
        gjiuic: ylbcwd.gjiuic,
        czkxrt: ylbcwd.czkxrt,
        izatno: ylbcwd.izatno,
      }));
  })(Dialog || (Dialog = {})));
import {
  Direction as sdxnky,
  StructureRotation as jkcltr,
} from "@minecraft/server";
import { Direction as oshzcn, StructureRotation } from "@minecraft/server";
import { system as iclbeu, world as wmozke } from "@minecraft/server";
import { Direction as fnhajn } from "@minecraft/server";
import { Direction as ymxypc } from "@minecraft/server";
import { BlockPermutation, world as jbrbzm } from "@minecraft/server";
import { world as glhcku } from "@minecraft/server";
import { Player as aomicf } from "@minecraft/server";
import { system as wccaba } from "@minecraft/server";
import { system as szonil } from "@minecraft/server";
import { system as tenqkc, world as itbglv } from "@minecraft/server";
import {
  Player as fgoaqz,
  system as mtgqji,
  world as lwlugh,
} from "@minecraft/server";
import { system as xdpjdv } from "@minecraft/server";
import { Direction as vlokkl } from "@minecraft/server";
import { StructureSaveMode, world as fhgbmm } from "@minecraft/server";
import {
  EntityEquippableComponent,
  EquipmentSlot,
  GameMode,
  ItemDurabilityComponent,
  ItemEnchantableComponent,
} from "@minecraft/server";
var tnjamw = class e {
    x;
    y;
    z;
    constructor(n, t, i) {
      if (n === oshzcn.Down) ((this.x = 0), (this.y = -1), (this.z = 0));
      else if (n === oshzcn.Up) ((this.x = 0), (this.y = 1), (this.z = 0));
      else if (n === oshzcn.North) ((this.x = 0), (this.y = 0), (this.z = -1));
      else if (n === oshzcn.South) ((this.x = 0), (this.y = 0), (this.z = 1));
      else if (n === oshzcn.East) ((this.x = 1), (this.y = 0), (this.z = 0));
      else if (n === oshzcn.West) ((this.x = -1), (this.y = 0), (this.z = 0));
      else if ("number" == typeof n) ((this.x = n), (this.y = t), (this.z = i));
      else if (Array.isArray(n))
        ((this.x = n[0]), (this.y = n[1]), (this.z = n[2]));
      else if (n instanceof e || n instanceof ziyvnp)
        ((this.x = n.x), (this.y = n.y), (this.z = n.z));
      else {
        if (
          !n ||
          (!n.x && 0 !== n.x) ||
          (!n.y && 0 !== n.y) ||
          (!n.z && 0 !== n.z)
        )
          throw new Error();
        ((this.x = n.x), (this.y = n.y), (this.z = n.z));
      }
    }
    static from(n, t, i) {
      if (n instanceof e) return new e(n);
      if ("number" == typeof n && void 0 !== t && void 0 !== i)
        return new e(n, t, i);
      if (Array.isArray(n)) return new e(n);
      if (n === oshzcn.Down) return new e(oshzcn.Down);
      if (n === oshzcn.Up) return new e(oshzcn.Up);
      if (n === oshzcn.North) return new e(oshzcn.North);
      if (n === oshzcn.South) return new e(oshzcn.South);
      if (n === oshzcn.East) return new e(oshzcn.East);
      if (n === oshzcn.West) return new e(oshzcn.West);
      if (
        !n ||
        (!n.x && 0 !== n.x) ||
        (!n.y && 0 !== n.y) ||
        (!n.z && 0 !== n.z)
      )
        throw new Error();
      return new e(n.x, n.y, n.z);
    }
    static mvdmsu(n, t, i) {
      if ("number" == typeof n && void 0 === t && void 0 === i)
        return new e(n, n, n);
      if (n instanceof e) return n;
      if ("number" == typeof n && void 0 !== t && void 0 !== i)
        return new e(n, t, i);
      if (Array.isArray(n)) return new e(n);
      if (n === oshzcn.Down) return new e(oshzcn.Down);
      if (n === oshzcn.Up) return new e(oshzcn.Up);
      if (n === oshzcn.North) return new e(oshzcn.North);
      if (n === oshzcn.South) return new e(oshzcn.South);
      if (n === oshzcn.East) return new e(oshzcn.East);
      if (n === oshzcn.West) return new e(oshzcn.West);
      if (
        !n ||
        (!n.x && 0 !== n.x) ||
        (!n.y && 0 !== n.y) ||
        (!n.z && 0 !== n.z)
      )
        throw new Error();
      return new e(n.x, n.y, n.z);
    }
    nadaln() {
      return new e(this.x, this.y, this.z);
    }
    ewjsgi() {
      return new ziyvnp(this.x, this.y, this.z);
    }
    static cdrzrc(n, t) {
      let i;
      "number" == typeof n ? (i = n) : ((i = n.y), (t = n.x));
      const o = i * (Math.PI / 180),
        r = t * (Math.PI / 180),
        a = -Math.cos(r) * Math.sin(o),
        l = -Math.sin(r),
        s = Math.cos(r) * Math.cos(o);
      return new e(a, l, s);
    }
    hxphua() {
      if (this.eiryzc()) throw new Error();
      const e = this.nadaln().normalize(),
        n = -Math.atan2(e.x, e.z) * (180 / Math.PI);
      return { x: Math.asin(-e.y) * (180 / Math.PI), y: n };
    }
    add(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return ((this.x += o.x), (this.y += o.y), (this.z += o.z), this);
    }
    vbjjib(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return (this.yyqyut(o).yufawq(-1).normalize(), this);
    }
    yyqyut(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return ((this.x -= o.x), (this.y -= o.y), (this.z -= o.z), this);
    }
    yufawq(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return ((this.x *= o.x), (this.y *= o.y), (this.z *= o.z), this);
    }
    scale(e) {
      return ((this.x *= e), (this.y *= e), (this.z *= e), this);
    }
    effwty(n, t, i) {
      if ("number" == typeof n && void 0 === t && void 0 === i) {
        if (0 === n) throw new Error();
        return ((this.x /= n), (this.y /= n), (this.z /= n), this);
      }
      const o = e.mvdmsu(n, t, i);
      if (0 === o.x || 0 === o.y || 0 === o.z) throw new Error();
      return ((this.x /= o.x), (this.y /= o.y), (this.z /= o.z), this);
    }
    normalize() {
      if (this.eiryzc()) throw new Error();
      const e = this.length();
      return ((this.x /= e), (this.y /= e), (this.z /= e), this);
    }
    length() {
      return Math.hypot(this.x, this.y, this.z);
    }
    qofjff() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    njrebt(n, t, i) {
      const o = e.mvdmsu(n, t, i),
        r = this.y * o.z - this.z * o.y,
        a = this.z * o.x - this.x * o.z,
        l = this.x * o.y - this.y * o.x;
      return ((this.x = r), (this.y = a), (this.z = l), this);
    }
    distance(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.nadaln().yyqyut(o).length();
    }
    axkfps(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.nadaln().yyqyut(o).qofjff();
    }
    prqozq(e, n) {
      return e && void 0 !== n
        ? 1 === n
          ? ((this.x = e.x), (this.y = e.y), (this.z = e.z), this)
          : (0 === n ||
              ((this.x = this.x + (e.x - this.x) * n),
              (this.y = this.y + (e.y - this.y) * n),
              (this.z = this.z + (e.z - this.z) * n)),
            this)
        : this;
    }
    xqtbbb(n, t) {
      if (!n || void 0 === t) return this;
      if (1 === t)
        return ((this.x = n.x), (this.y = n.y), (this.z = n.z), this);
      if (0 === t) return this;
      const i = this.wzaaqx(n),
        o = Math.acos(i) * t,
        r = e.from(n).yyqyut(this.nadaln().yufawq(i)).normalize(),
        a = Math.cos(o),
        l = Math.sin(o);
      return (
        this.yufawq(a),
        (this.x += r.x * l),
        (this.y += r.y * l),
        (this.z += r.z * l),
        this
      );
    }
    wzaaqx(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.x * o.x + this.y * o.y + this.z * o.z;
    }
    zkuamq(n, t, i) {
      const o = e.mvdmsu(n, t, i),
        r = this.wzaaqx(o),
        a = this.qofjff();
      if (0 === a) return 0;
      const l = o.qofjff();
      if (0 === l) return 0;
      const s = Math.sqrt(a * l),
        v = Math.min(1, Math.max(-1, r / s));
      return Math.acos(v);
    }
    hjwjog(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      if (o.eiryzc()) return ((this.x = 0), (this.y = 0), (this.z = 0), this);
      const r = o.wzaaqx(o);
      if (0 === r) return ((this.x = 0), (this.y = 0), (this.z = 0), this);
      const a = this.wzaaqx(o) / r;
      return ((this.x = o.x * a), (this.y = o.y * a), (this.z = o.z * a), this);
    }
    naxgly(n, t, i) {
      const o = e.mvdmsu(n, t, i),
        r = this.nadaln().hjwjog(o);
      return this.yyqyut(r.yufawq(2));
    }
    yffbmb(e, n) {
      const t = (n * Math.PI) / 180 / 2,
        i = Math.cos(t),
        o = e.x * Math.sin(t),
        r = e.y * Math.sin(t),
        a = e.z * Math.sin(t),
        l = this.x,
        s = this.y,
        v = this.z,
        u =
          i * i * l +
          2 * r * i * v -
          2 * a * i * s +
          o * o * l +
          2 * r * o * s +
          2 * a * o * v -
          a * a * l -
          r * r * l,
        y =
          2 * o * r * l +
          r * r * s +
          2 * a * r * v +
          2 * i * a * l -
          a * a * s +
          i * i * s -
          2 * o * i * v -
          o * o * s,
        d =
          2 * o * a * l +
          2 * r * a * s +
          a * a * v -
          2 * i * r * l -
          r * r * v +
          2 * i * o * s -
          o * o * v +
          i * i * v;
      return ((this.x = u), (this.y = y), (this.z = d), this);
    }
    wwench(e, n, t) {
      return (
        e || (e = (e) => e),
        n || (n = (e) => e),
        t || (t = (e) => e),
        (this.x = e(this.x)),
        (this.y = n(this.y)),
        (this.z = t(this.z)),
        this
      );
    }
    qbctcg(e) {
      return ((this.x = "number" == typeof e ? e : e(this.x)), this);
    }
    myaqrr(e) {
      return ((this.y = "number" == typeof e ? e : e(this.y)), this);
    }
    wtbvqd(e) {
      return ((this.z = "number" == typeof e ? e : e(this.z)), this);
    }
    floor() {
      return this.wwench(Math.floor, Math.floor, Math.floor);
    }
    cnyctv() {
      return this.qbctcg(Math.floor);
    }
    vcycgc() {
      return this.myaqrr(Math.floor);
    }
    qvhslh() {
      return this.wtbvqd(Math.floor);
    }
    ceil() {
      return this.wwench(Math.ceil, Math.ceil, Math.ceil);
    }
    nmylmk() {
      return this.qbctcg(Math.ceil);
    }
    tkdwcs() {
      return this.myaqrr(Math.ceil);
    }
    luqetw() {
      return this.wtbvqd(Math.ceil);
    }
    round() {
      return this.wwench(Math.round, Math.round, Math.round);
    }
    kwzeut() {
      return this.qbctcg(Math.round);
    }
    zuwhec() {
      return this.myaqrr(Math.round);
    }
    beefeo() {
      return this.wtbvqd(Math.round);
    }
    up() {
      return this.add(oshzcn.Up);
    }
    down() {
      return this.add(oshzcn.Down);
    }
    north() {
      return this.add(oshzcn.North);
    }
    south() {
      return this.add(oshzcn.South);
    }
    east() {
      return this.add(oshzcn.East);
    }
    west() {
      return this.add(oshzcn.West);
    }
    eiryzc() {
      return 0 === this.x && 0 === this.y && 0 === this.z;
    }
    bnkrjd() {
      return [this.x, this.y, this.z];
    }
    pavfev() {
      if (this.eiryzc()) throw new Error();
      const e = this.nadaln().normalize(),
        n = Math.max(Math.abs(e.x), Math.abs(e.y), Math.abs(e.z));
      if (n === e.x) return oshzcn.East;
      if (n === -e.x) return oshzcn.West;
      if (n === e.y) return oshzcn.Up;
      if (n === -e.y) return oshzcn.Down;
      if (n === e.z) return oshzcn.South;
      if (n === -e.z) return oshzcn.North;
      throw new Error();
    }
    kpmknx() {
      const e = this.hxphua();
      let n = 90 * Math.round(e.y / 90);
      if ((n < 0 && (n += 360), n >= 360 && (n -= 360), 0 === n))
        return StructureRotation.None;
      if (90 === n) return StructureRotation.Rotate90;
      if (180 === n) return StructureRotation.Rotate180;
      if (270 === n) return StructureRotation.Rotate270;
      throw new Error();
    }
    ujoyea() {
      return (
        (this.x =
          (this.x | 0) - (this.x < 0 && this.x !== (this.x | 0) ? 1 : 0)),
        (this.y =
          (this.y | 0) - (this.y < 0 && this.y !== (this.y | 0) ? 1 : 0)),
        (this.z =
          (this.z | 0) - (this.z < 0 && this.z !== (this.z | 0) ? 1 : 0)),
        this
      );
    }
    thalhd(n, t, i, o) {
      try {
        let r;
        return (
          "number" != typeof n && void 0 === i
            ? ((r = e.mvdmsu(n, void 0, void 0)), (o = t))
            : (r = e.mvdmsu(n, t, i)),
          Math.abs(this.x - r.x) <= o &&
            Math.abs(this.y - r.y) <= o &&
            Math.abs(this.z - r.z) <= o
        );
      } catch (e) {
        return !1;
      }
    }
    equals(n, t, i) {
      try {
        const o = e.mvdmsu(n, t, i);
        return this.x === o.x && this.y === o.y && this.z === o.z;
      } catch (e) {
        return !1;
      }
    }
    toString(e = "ijekld", n = ", ") {
      const t = `${this.x + n + this.y + n + this.z}`;
      return "ijekld" === e ? `MutVec3(${t})` : t;
    }
    static kvvmpe(n, t = "ijekld", i = ", ") {
      if ("ijekld" === t) {
        const t = n.match(/^MutVec3\((.*)\)$/);
        if (!t) throw new Error();
        const o = t[1].split(i);
        if (3 !== o.length) throw new Error();
        return new e(Number(o[0]), Number(o[1]), Number(o[2]));
      }
      {
        const t = n.split(i);
        if (3 !== t.length) throw new Error();
        return new e(Number(t[0]), Number(t[1]), Number(t[2]));
      }
    }
  },
  fermgf = class e {
    constructor(e, n) {
      ((this.code = e),
        (this.color = n),
        n &&
          ((this.r = (n >> 16) & 255),
          (this.g = (n >> 8) & 255),
          (this.b = 255 & n)));
    }
    static BLACK = new e("0", 0);
    static cqxxeh = new e("1", 170);
    static zoehnd = new e("2", 43520);
    static hjllkc = new e("3", 43690);
    static rlvefg = new e("4", 11141120);
    static ygptvl = new e("5", 11141290);
    static GOLD = new e("6", 16755200);
    static GRAY = new e("7", 11184810);
    static qjszht = new e("8", 5592405);
    static BLUE = new e("9", 5592575);
    static GREEN = new e("a", 5635925);
    static AQUA = new e("b", 5636095);
    static RED = new e("c", 16733525);
    static bubfrg = new e("d", 16733695);
    static YELLOW = new e("e", 16777045);
    static WHITE = new e("f", 16777215);
    static qxsfjg = new e("g", 14603781);
    static erjmjl = new e("h", 14931153);
    static dngreq = new e("i", 13552330);
    static rhvjxm = new e("j", 4471355);
    static uclvii = new e("m", 9901575);
    static vlbjei = new e("n", 11823181);
    static dwxxla = new e("p", 14594349);
    static ssqdel = new e("q", 1155126);
    static ivuwlr = new e("s", 2931368);
    static qoqsgx = new e("t", 2181499);
    static xaeysm = new e("u", 10116294);
    static xntjsh = new e("k");
    static ontqwj = new e("l");
    static nkafdf = new e("o");
    static wfzfiy = new e("r");
    static VALUES = [
      e.BLACK,
      e.cqxxeh,
      e.zoehnd,
      e.hjllkc,
      e.rlvefg,
      e.ygptvl,
      e.GOLD,
      e.GRAY,
      e.qjszht,
      e.BLUE,
      e.GREEN,
      e.AQUA,
      e.RED,
      e.bubfrg,
      e.YELLOW,
      e.WHITE,
      e.qxsfjg,
      e.erjmjl,
      e.dngreq,
      e.rhvjxm,
      e.uclvii,
      e.vlbjei,
      e.dwxxla,
      e.ssqdel,
      e.ivuwlr,
      e.qoqsgx,
      e.xaeysm,
      e.xntjsh,
      e.ontqwj,
      e.nkafdf,
      e.wfzfiy,
    ];
    static rraaat = [
      e.BLACK,
      e.cqxxeh,
      e.zoehnd,
      e.hjllkc,
      e.rlvefg,
      e.ygptvl,
      e.GOLD,
      e.GRAY,
      e.qjszht,
      e.BLUE,
      e.GREEN,
      e.AQUA,
      e.RED,
      e.bubfrg,
      e.YELLOW,
      e.WHITE,
      e.qxsfjg,
      e.erjmjl,
      e.dngreq,
      e.rhvjxm,
      e.uclvii,
      e.vlbjei,
      e.dwxxla,
      e.ssqdel,
      e.ivuwlr,
      e.qoqsgx,
      e.xaeysm,
    ];
    r;
    g;
    b;
    static PREFIX = "§";
    toString() {
      return e.PREFIX + this.code;
    }
    idlydr() {
      return this.color;
    }
    wtphor() {
      return this.color?.toString(16);
    }
    dqhxri() {
      return this.r;
    }
    dpftvx() {
      return this.g;
    }
    uhrril() {
      return this.b;
    }
    wlyxmg() {
      return this.code;
    }
    static sevffx(e) {
      return e.replace(/§[0-9a-u]/g, "");
    }
    static ivzytk(n, t, i) {
      let o = Number.MAX_VALUE,
        r = e.WHITE;
      for (const a of e.rraaat)
        if (a.r && a.g && a.b) {
          const e = Math.sqrt(
            Math.pow(a.r - n, 2) + Math.pow(a.g - t, 2) + Math.pow(a.b - i, 2),
          );
          e < o && ((o = e), (r = a));
        }
      return r;
    }
  },
  qmnjmk = class e {
    hcsnls = "{";
    jknxit = "}";
    duadqf = "[";
    fpngtm = "]";
    covozb = ",";
    mlbtey = ":";
    jtlxkt = '"';
    rjvpop = "";
    Indent = "  ";
    cztwuq = "\n";
    hhroca = " ";
    jozliy = 60;
    rewrwq = 1;
    zxrjks = !0;
    oqozlw = "ƒ";
    wglzxh = "null";
    cbtair = "undefined";
    frtljq = "true";
    hzsnwd = "false";
    yygknk = "[...dgzgtg...]";
    mkrlsh = "{...}";
    jligyv = fermgf.YELLOW;
    ypgdbs = fermgf.AQUA;
    rchpsy = fermgf.hjllkc;
    cikwjz = fermgf.zoehnd;
    izuccl = fermgf.GOLD;
    tdhgvh = fermgf.GOLD;
    noahou = fermgf.GRAY;
    pxlxcx = fermgf.GOLD;
    cpwmgz = fermgf.GRAY;
    tswffz = fermgf.GRAY;
    slumfr = fermgf.ontqwj;
    jwnrxe = fermgf.rlvefg;
    static DEFAULT = new e();
    static ptsfmv() {
      const n = new e();
      return (
        (n.jligyv = ""),
        (n.ypgdbs = ""),
        (n.rchpsy = ""),
        (n.cikwjz = ""),
        (n.izuccl = ""),
        (n.tdhgvh = ""),
        (n.noahou = ""),
        (n.pxlxcx = ""),
        (n.cpwmgz = ""),
        (n.tswffz = ""),
        (n.slumfr = ""),
        (n.jwnrxe = ""),
        n
      );
    }
    static PLAIN = this.ptsfmv();
    stringify(e) {
      return this.kocgof(e, { whlsiz: 0, uhtbml: new WeakSet() });
    }
    nslleh(e) {
      return (
        this.cikwjz + this.jtlxkt + this.jmpuyj(e) + this.jtlxkt + fermgf.wfzfiy
      );
    }
    fruadw(e) {
      return this.rchpsy + e.toString() + fermgf.wfzfiy;
    }
    zzmqos(e) {
      return this.izuccl + (e ? this.frtljq : this.hzsnwd) + fermgf.wfzfiy;
    }
    hizlak(e) {
      return this.cpwmgz + this.oqozlw + fermgf.wfzfiy;
    }
    wgsykq() {
      return this.tdhgvh + this.wglzxh + fermgf.wfzfiy;
    }
    bmhkyh() {
      return this.tdhgvh + this.cbtair + fermgf.wfzfiy;
    }
    eqihfx() {
      return this.jwnrxe + this.yygknk + fermgf.wfzfiy;
    }
    zrygxr(e, n) {
      const t = this.Indent.repeat(n.whlsiz);
      if (0 === e.length)
        return this.ypgdbs + this.duadqf + this.fpngtm + fermgf.wfzfiy;
      let i = this.ypgdbs + this.duadqf + fermgf.wfzfiy + this.cztwuq,
        o = this.ypgdbs + this.duadqf + fermgf.wfzfiy;
      return (
        e.forEach((r, a) => {
          ((i += t + this.Indent + this.kocgof(r, this.indent(n))),
            (i += a < e.length - 1 ? this.covozb + this.cztwuq : this.cztwuq),
            (o += this.kocgof(r, this.indent(n))),
            (o += a < e.length - 1 ? this.covozb + this.hhroca : ""));
        }),
        (i += t + this.ypgdbs + this.fpngtm + fermgf.wfzfiy),
        (o += this.ypgdbs + this.fpngtm + fermgf.wfzfiy),
        o.length < this.jozliy ? o : i
      );
    }
    xpqquc(e, n, t) {
      return (
        (this.zxrjks
          ? this.tswffz + "" + this.slumfr + n + fermgf.wfzfiy + this.hhroca
          : "") + this.mkrlsh
      );
    }
    wfthmf(e, n, t, i) {
      const o = this.Indent.repeat(i.whlsiz),
        r =
          this.zxrjks && "Object" !== n
            ? this.tswffz + "" + this.slumfr + n + fermgf.wfzfiy + this.hhroca
            : "";
      if (0 === t.length)
        return r + this.jligyv + this.hcsnls + this.jknxit + fermgf.wfzfiy;
      let a = r + this.jligyv + this.hcsnls + fermgf.wfzfiy + this.cztwuq,
        l = r + this.jligyv + this.hcsnls + fermgf.wfzfiy;
      return (
        t.forEach(([e, n], r) => {
          const s = this.kocgof(n, this.indent(i));
          ((a +=
            o +
            this.Indent +
            this.noahou +
            this.rjvpop +
            e +
            this.rjvpop +
            fermgf.wfzfiy +
            this.mlbtey +
            this.hhroca +
            s),
            (a += r < t.length - 1 ? this.covozb + this.cztwuq : this.cztwuq),
            (l +=
              this.noahou + e + fermgf.wfzfiy + this.mlbtey + this.hhroca + s),
            (l += r < t.length - 1 ? this.covozb + this.hhroca : ""));
        }),
        (a += o + this.jligyv + this.jknxit + fermgf.wfzfiy),
        (l += this.jligyv + this.jknxit + fermgf.wfzfiy),
        l.length < this.jozliy ? l : a
      );
    }
    buzndp(e, n, t) {
      return !("Object" === n || t.whlsiz <= this.rewrwq || this.rewrwq <= 0);
    }
    kocgof(e, n) {
      if (null === e) return this.wgsykq();
      if (void 0 === e) return this.bmhkyh();
      if ("number" == typeof e) return this.fruadw(e);
      if ("string" == typeof e) return this.nslleh(e);
      if ("boolean" == typeof e) return this.zzmqos(e);
      if ("function" == typeof e) return this.hizlak(e);
      if (this.baxixe(e, n)) return this.eqihfx();
      if ((this.yroncm(e, n), Array.isArray(e))) {
        const t = this.zrygxr(e, n.whlsiz ? this.indent(n) : n);
        return (this.sxpeou(e, n), t);
      }
      if ("object" == typeof e) {
        const t = e.constructor.name;
        if (this.buzndp(e, t, n)) {
          const i = this.xpqquc(e, t, n);
          return (this.sxpeou(e, n), i);
        }
        {
          const i = new Set();
          let o = Object.getPrototypeOf(e),
            r = Object.keys(o);
          for (; r.length > 0; )
            (r.forEach((e) => i.add(e)),
              (o = Object.getPrototypeOf(o)),
              (r = Object.keys(o)));
          (Object.keys(e).forEach((e) => i.add(e)),
            i.delete("__cycleDetection__"));
          const a = [...i]
              .sort()
              .map((n) => {
                try {
                  return [n, e[n] ?? void 0];
                } catch (e) {
                  return [n, void 0];
                }
              })
              .filter(([, e]) => "function" != typeof e && void 0 !== e),
            l = this.wfthmf(e, t, a, n);
          return (this.sxpeou(e, n), l);
        }
      }
      return (this.sxpeou(e, n), fermgf.wfzfiy + e.toString());
    }
    jmpuyj(e) {
      return e
        .replace(/\\/g, this.pxlxcx + "\\\\" + this.cikwjz)
        .replace(/"/g, this.pxlxcx + '\\"' + this.cikwjz)
        .replace(/\n/g, this.pxlxcx + "\\n" + this.cikwjz)
        .replace(/\r/g, this.pxlxcx + "njyzcl" + this.cikwjz)
        .replace(/\t/g, this.pxlxcx + "rbihbz" + this.cikwjz);
    }
    yroncm(e, n) {
      n.uhtbml.add(e);
    }
    baxixe(e, n) {
      return n.uhtbml.has(e);
    }
    sxpeou(e, n) {
      n.uhtbml.delete(e);
    }
    indent(e) {
      return { ...e, whlsiz: e.whlsiz + 1 };
    }
  },
  bltshy = void 0;
try {
  bltshy = vchovu;
} catch (e) {}
var jjdqwe = ((e) => (
    (e[(e.nlhwus = 0)] = "Chat"),
    (e[(e.rpgake = 1)] = "rpgake"),
    (e[(e.uzibmi = 2)] = "uzibmi"),
    (e[(e.hagcwq = 3)] = "hagcwq"),
    e
  ))(jjdqwe || {}),
  lufeyy = class e {
    constructor(e, n, t = fermgf.wfzfiy) {
      ((this.level = e), (this.name = n), (this.color = t));
    }
    static xrbwmw = new e(-2, "all");
    static Trace = new e(-2, "trace", fermgf.hjllkc);
    static Debug = new e(-1, "debug", fermgf.AQUA);
    static Info = new e(0, "xbbzql", fermgf.GREEN);
    static vihpwg = new e(1, "warn", fermgf.GOLD);
    static Error = new e(2, "error", fermgf.RED);
    static Fatal = new e(3, "fatal", fermgf.rlvefg);
    static cotozh = new e(100, "cotozh");
    static values = [
      e.xrbwmw,
      e.Trace,
      e.Debug,
      e.Info,
      e.vihpwg,
      e.Error,
      e.Fatal,
      e.cotozh,
    ];
    toString() {
      return this.color + this.name.toUpperCase() + fermgf.wfzfiy;
    }
    static parse(n) {
      n = n.toLowerCase();
      for (const t of e.values) if (t.name === n) return t;
      const t = parseInt(n);
      if (!isNaN(t)) for (const n of e.values) if (n.level === t) return n;
    }
  };
function escyft(e, n) {
  if ("*" === e) return !0;
  if (e.includes("*")) {
    if (e.startsWith("*")) return n.endsWith(e.substring(1));
    if (e.endsWith("*")) return n.startsWith(e.substring(0, e.length - 1));
    return new RegExp(e.replace(/\*/g, ".*")).test(n);
  }
  return e === n;
}
var mtzovj = {
    level: lufeyy.Info,
    filter: ["*"],
    kfnowy: !1,
    jqyaiv: (e) => "",
    ezoxcz: (e, n, t, i, o = void 0) => {
      const r = void 0 !== o ? `§7${o.map((e) => `[${e}]`).join("")}§r` : "";
      return `${i ? `[${i}]` : ""}[${e}][${fermgf.ssqdel}${n.name}${fermgf.wfzfiy}]${r} ${t}`;
    },
    qqaebd: (e) => e.join(" "),
    vyanra: qmnjmk.DEFAULT,
    zmszle: {
      [lufeyy.Trace.level]: [0, 1],
      [lufeyy.Debug.level]: [0, 1],
      [lufeyy.Info.level]: [0, 1],
      [lufeyy.vihpwg.level]: [0, 1, 2],
      [lufeyy.Error.level]: [0, 1, 3],
      [lufeyy.Fatal.level]: [0, 1, 3],
    },
  },
  Logger = class e {
    constructor(e, n = []) {
      ((this.name = e), (this.tags = n));
    }
    static jwqckf = !1;
    static ruzwht() {
      e.jwqckf ||
        ((e.jwqckf = !0),
        iclbeu.beforeEvents.startup.subscribe(() => {
          iclbeu.afterEvents.scriptEventReceive.subscribe((e) => {
            if ("logging:level" === e.id || "log:level" === e.id)
              if (e.message) {
                const n = lufeyy.parse(e.message);
                n
                  ? ((mtzovj.level = n),
                    wmozke.sendMessage(
                      `${fermgf.AQUA}Logging level set to ${fermgf.ontqwj}${mtzovj.level}`,
                    ))
                  : wmozke.sendMessage(
                      `${fermgf.rlvefg}Invalid logging level: ${e.message}`,
                    );
              } else
                ((mtzovj.level = lufeyy.Info),
                  wmozke.sendMessage(
                    `${fermgf.AQUA}Logging level set to ${fermgf.ontqwj}${mtzovj.level}`,
                  ));
            else
              ("logging:filter" !== e.id && "log:filter" !== e.id) ||
                (e.message
                  ? (mtzovj.filter = e.message.split(","))
                  : (mtzovj.filter = ["*"]),
                wmozke.sendMessage(
                  `${fermgf.AQUA}Logging filter set to ${fermgf.ontqwj}${mtzovj.filter.join(", ")}`,
                ));
          });
        }));
    }
    static sqrrix(e) {
      mtzovj.level = e;
    }
    static vvhvia(e) {
      mtzovj.filter = e;
    }
    static zgeepc(e) {
      mtzovj.ezoxcz = e;
    }
    static lpivfl(e) {
      mtzovj.qqaebd = e;
    }
    static ghxhpp(e) {
      mtzovj.kfnowy = e;
    }
    static kkufcl(e) {
      mtzovj.jqyaiv = e;
    }
    static bhmkxz() {
      mtzovj.jqyaiv = (e) =>
        `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}:${e.getSeconds().toString().padStart(2, "0")}.${Math.floor(
          e.getMilliseconds() / 10,
        )
          .toString()
          .padStart(2, "0")}`;
    }
    static oztcww(e) {
      mtzovj.vyanra = e;
    }
    static dkaezm() {
      return mtzovj.zmszle;
    }
    static fbbvup(n, ...t) {
      return (e.jwqckf || e.ruzwht(), new e(n, t));
    }
    log(e, ...n) {
      if (!(e.level < mtzovj.level.level))
        if (0 !== mtzovj.filter.length && 0 !== this.tags.length)
          for (const t of mtzovj.filter) {
            if (
              t.startsWith("!") &&
              (escyft(t.substring(1), this.name) ||
                this.tags.some((e) => escyft(t.substring(1), e)))
            )
              return;
            if (escyft(t, this.name) || this.tags.some((e) => escyft(t, e)))
              return void this.iebuxp(e, ...n);
          }
        else this.iebuxp(e, ...n);
    }
    gmxayj(e) {
      let n = e.stack ?? "";
      if (bltshy) {
        const e = /\(([^)]+\.js):(\d+)(?::(\d+))?\)/;
        n = n
          .split("\n")
          .map((n) => {
            const t = e.exec(n);
            if (t) {
              const i = t[1],
                o = parseInt(t[2], 10) - bltshy.wupvye.offset;
              if (i.includes(bltshy.wupvye.llpaix)) {
                const t = vchovu[o];
                if (t) {
                  const i = `(${t.source}:${t.bxajvh})`;
                  return n.replace(e, i);
                }
              }
            }
            return n;
          })
          .join("\n");
      }
      return `${fermgf.rlvefg}${fermgf.ontqwj}${e.message}\n${fermgf.wfzfiy}${fermgf.GRAY}${fermgf.nkafdf}${n}${fermgf.wfzfiy}`;
    }
    iebuxp(e, ...n) {
      {
        const t = n.map((e) =>
            void 0 === e
              ? fermgf.GOLD + "undefined" + fermgf.wfzfiy
              : null === e
                ? fermgf.GOLD + "null" + fermgf.wfzfiy
                : e && e instanceof Error
                  ? this.gmxayj(e)
                  : "object" == typeof e || Array.isArray(e)
                    ? mtzovj.vyanra.stringify(e) + fermgf.wfzfiy
                    : e.toString() + fermgf.wfzfiy,
          ),
          i = new Date(),
          o = mtzovj.jqyaiv(i),
          r = mtzovj.ezoxcz(
            e,
            this,
            mtzovj.qqaebd(t),
            o,
            mtzovj.kfnowy ? this.tags : void 0,
          ),
          a = mtzovj.zmszle[e.level] || [0, 1];
        if (a.includes(0))
          try {
            wmozke.sendMessage(r);
          } catch (e) {
            iclbeu.run(() => {
              wmozke.sendMessage(r);
            });
          }
        (a.includes(1) && console.qewnyu, a.includes(2), a.includes(3));
      }
    }
    trace(...e) {
      this.log(lufeyy.Trace, ...e);
    }
    debug(...e) {
      this.log(lufeyy.Debug, ...e);
    }
    xbbzql(...e) {
      this.log(lufeyy.Info, ...e);
    }
    warn(...e) {
      this.log(lufeyy.vihpwg, ...e);
    }
    error(...e) {
      this.log(lufeyy.Error, ...e);
    }
    fatal(...e) {
      this.log(lufeyy.Fatal, ...e);
    }
  },
  ziyvnp = class e {
    static log = Logger.fbbvup("ziyvnp", "ziyvnp", "zsnwfy");
    static pultuh = new e(0, 0, 0);
    static Down = new e(sdxnky.Down);
    static Up = new e(sdxnky.Up);
    static North = new e(sdxnky.North);
    static South = new e(sdxnky.South);
    static East = new e(sdxnky.East);
    static West = new e(sdxnky.West);
    x;
    y;
    z;
    constructor(n, t, i) {
      if (n === sdxnky.Down) ((this.x = 0), (this.y = -1), (this.z = 0));
      else if (n === sdxnky.Up) ((this.x = 0), (this.y = 1), (this.z = 0));
      else if (n === sdxnky.North) ((this.x = 0), (this.y = 0), (this.z = -1));
      else if (n === sdxnky.South) ((this.x = 0), (this.y = 0), (this.z = 1));
      else if (n === sdxnky.East) ((this.x = 1), (this.y = 0), (this.z = 0));
      else if (n === sdxnky.West) ((this.x = -1), (this.y = 0), (this.z = 0));
      else if ("number" == typeof n) ((this.x = n), (this.y = t), (this.z = i));
      else if (Array.isArray(n))
        ((this.x = n[0]), (this.y = n[1]), (this.z = n[2]));
      else if (n instanceof e) ((this.x = n.x), (this.y = n.y), (this.z = n.z));
      else {
        if (
          !n ||
          (!n.x && 0 !== n.x) ||
          (!n.y && 0 !== n.y) ||
          (!n.z && 0 !== n.z)
        )
          throw (e.log.error(new Error(), n), new Error());
        ((this.x = n.x), (this.y = n.y), (this.z = n.z));
      }
    }
    static from(n, t, i) {
      if (n instanceof e) return n;
      if ("number" == typeof n && void 0 !== t && void 0 !== i)
        return new e(n, t, i);
      if (Array.isArray(n)) return new e(n);
      if (n === sdxnky.Down) return e.Down;
      if (n === sdxnky.Up) return e.Up;
      if (n === sdxnky.North) return e.North;
      if (n === sdxnky.South) return e.South;
      if (n === sdxnky.East) return e.East;
      if (n === sdxnky.West) return e.West;
      if (
        !n ||
        (!n.x && 0 !== n.x) ||
        (!n.y && 0 !== n.y) ||
        (!n.z && 0 !== n.z)
      )
        throw (e.log.error(new Error(), n, t, i), new Error());
      return new e(n.x, n.y, n.z);
    }
    static mvdmsu(n, t, i) {
      if ("number" == typeof n && void 0 === t && void 0 === i)
        return new e(n, n, n);
      if (n instanceof e) return n;
      if ("number" == typeof n && void 0 !== t && void 0 !== i)
        return new e(n, t, i);
      if (Array.isArray(n)) return new e(n);
      if (n === sdxnky.Down) return e.Down;
      if (n === sdxnky.Up) return e.Up;
      if (n === sdxnky.North) return e.North;
      if (n === sdxnky.South) return e.South;
      if (n === sdxnky.East) return e.East;
      if (n === sdxnky.West) return e.West;
      if (
        !n ||
        (!n.x && 0 !== n.x) ||
        (!n.y && 0 !== n.y) ||
        (!n.z && 0 !== n.z)
      )
        throw (e.log.error(new Error(), n, t, i), new Error());
      return new e(n.x, n.y, n.z);
    }
    nadaln() {
      return new e(this.x, this.y, this.z);
    }
    tijmnr() {
      return new tnjamw(this.x, this.y, this.z);
    }
    static cdrzrc(n, t) {
      let i;
      "number" == typeof n ? (i = n) : ((i = n.y), (t = n.x));
      const o = i * (Math.PI / 180),
        r = t * (Math.PI / 180),
        a = -Math.cos(r) * Math.sin(o),
        l = -Math.sin(r),
        s = Math.cos(r) * Math.cos(o);
      return new e(a, l, s);
    }
    hxphua() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.normalize(),
        t = -Math.atan2(n.x, n.z) * (180 / Math.PI);
      return { x: Math.asin(-n.y) * (180 / Math.PI), y: t };
    }
    add(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return e.from(o.x + this.x, o.y + this.y, o.z + this.z);
    }
    vbjjib(n, t, i) {
      return e.mvdmsu(n, t, i).yyqyut(this).normalize();
    }
    yyqyut(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return e.from(this.x - o.x, this.y - o.y, this.z - o.z);
    }
    yufawq(n, t, i) {
      if ("number" == typeof n && void 0 === t && void 0 === i)
        return e.from(this.x * n, this.y * n, this.z * n);
      const o = e.mvdmsu(n, t, i);
      return e.from(o.x * this.x, o.y * this.y, o.z * this.z);
    }
    scale(n) {
      return e.from(this.x * n, this.y * n, this.z * n);
    }
    effwty(n, t, i) {
      if ("number" == typeof n && void 0 === t && void 0 === i) {
        if (0 === n) throw new Error();
        return e.from(this.x / n, this.y / n, this.z / n);
      }
      const o = e.mvdmsu(n, t, i);
      if (0 === o.x || 0 === o.y || 0 === o.z) throw new Error();
      return e.from(this.x / o.x, this.y / o.y, this.z / o.z);
    }
    normalize() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.length();
      return e.from(this.x / n, this.y / n, this.z / n);
    }
    length() {
      return Math.hypot(this.x, this.y, this.z);
    }
    qofjff() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    njrebt(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return e.from(
        this.y * o.z - this.z * o.y,
        this.z * o.x - this.x * o.z,
        this.x * o.y - this.y * o.x,
      );
    }
    distance(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.yyqyut(o).length();
    }
    axkfps(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.yyqyut(o).qofjff();
    }
    prqozq(n, t) {
      return n && t
        ? 1 === t
          ? e.from(n)
          : 0 === t
            ? e.from(this)
            : e.from(
                this.x + (n.x - this.x) * t,
                this.y + (n.y - this.y) * t,
                this.z + (n.z - this.z) * t,
              )
        : e.from(this);
    }
    xqtbbb(n, t) {
      if (!n || !t) return e.from(this);
      if (1 === t) return e.from(n);
      if (0 === t) return e.from(this);
      const i = this.wzaaqx(n),
        o = Math.acos(i) * t,
        r = e.from(n).yyqyut(this.yufawq(i)).normalize();
      return this.yufawq(Math.cos(o)).add(r.yufawq(Math.sin(o)));
    }
    wzaaqx(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      return this.x * o.x + this.y * o.y + this.z * o.z;
    }
    zkuamq(n, t, i) {
      const o = e.mvdmsu(n, t, i),
        r = this.wzaaqx(o),
        a = this.qofjff();
      if (0 === a) return 0;
      const l = o.qofjff();
      if (0 === l) return 0;
      const s = Math.sqrt(a * l),
        v = Math.min(1, Math.max(-1, r / s));
      return Math.acos(v);
    }
    hjwjog(n, t, i) {
      const o = e.mvdmsu(n, t, i);
      if (o.eiryzc()) return e.pultuh;
      const r = o.wzaaqx(o);
      if (0 === r) return e.pultuh;
      const a = this.wzaaqx(o) / r;
      return e.from(o.x * a, o.y * a, o.z * a);
    }
    naxgly(n, t, i) {
      const o = e.mvdmsu(n, t, i),
        r = this.hjwjog(o);
      return this.yyqyut(r.yufawq(2));
    }
    yffbmb(n, t) {
      const i = (t * Math.PI) / 180 / 2,
        o = Math.cos(i),
        r = n.x * Math.sin(i),
        a = n.y * Math.sin(i),
        l = n.z * Math.sin(i),
        s = this,
        v =
          o * o * s.x +
          2 * a * o * s.z -
          2 * l * o * s.y +
          r * r * s.x +
          2 * a * r * s.y +
          2 * l * r * s.z -
          l * l * s.x -
          a * a * s.x,
        u =
          2 * r * a * s.x +
          a * a * s.y +
          2 * l * a * s.z +
          2 * o * l * s.x -
          l * l * s.y +
          o * o * s.y -
          2 * r * o * s.z -
          r * r * s.y,
        y =
          2 * r * l * s.x +
          2 * a * l * s.y +
          l * l * s.z -
          2 * o * a * s.x -
          a * a * s.z +
          2 * o * r * s.y -
          r * r * s.z +
          o * o * s.z;
      return new e(v, u, y);
    }
    wwench(n, t, i) {
      return (
        n || (n = (e) => e),
        t || (t = (e) => e),
        i || (i = (e) => e),
        new e(n(this.x), t(this.y), i(this.z))
      );
    }
    qbctcg(n) {
      return new e("number" == typeof n ? n : n(this.x), this.y, this.z);
    }
    myaqrr(n) {
      return new e(this.x, "number" == typeof n ? n : n(this.y), this.z);
    }
    wtbvqd(n) {
      return new e(this.x, this.y, "number" == typeof n ? n : n(this.z));
    }
    ypuqzx(n, t) {
      const i = e.from(t).yyqyut(n);
      if (0 === i.qofjff()) return this.yyqyut(n).length();
      const o = Math.max(
          0,
          Math.min(1, this.yyqyut(n).wzaaqx(i) / i.wzaaqx(i)),
        ),
        r = e.from(n).add(i.yufawq(o));
      return this.yyqyut(r).length();
    }
    floor() {
      return this.wwench(Math.floor, Math.floor, Math.floor);
    }
    cnyctv() {
      return this.qbctcg(Math.floor);
    }
    vcycgc() {
      return this.myaqrr(Math.floor);
    }
    qvhslh() {
      return this.wtbvqd(Math.floor);
    }
    ceil() {
      return new e(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
    }
    nmylmk() {
      return this.qbctcg(Math.ceil);
    }
    tkdwcs() {
      return this.myaqrr(Math.ceil);
    }
    luqetw() {
      return this.wtbvqd(Math.ceil);
    }
    round() {
      return this.wwench(Math.round, Math.round, Math.round);
    }
    kwzeut() {
      return this.qbctcg(Math.round);
    }
    zuwhec() {
      return this.myaqrr(Math.round);
    }
    beefeo() {
      return this.wtbvqd(Math.round);
    }
    up() {
      return this.add(e.Up);
    }
    down() {
      return this.add(e.Down);
    }
    north() {
      return this.add(e.North);
    }
    south() {
      return this.add(e.South);
    }
    east() {
      return this.add(e.East);
    }
    west() {
      return this.add(e.West);
    }
    eiryzc() {
      return 0 === this.x && 0 === this.y && 0 === this.z;
    }
    bnkrjd() {
      return [this.x, this.y, this.z];
    }
    pavfev() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.normalize(),
        t = Math.max(Math.abs(n.x), Math.abs(n.y), Math.abs(n.z));
      if (t === n.x) return sdxnky.East;
      if (t === -n.x) return sdxnky.West;
      if (t === n.y) return sdxnky.Up;
      if (t === -n.y) return sdxnky.Down;
      if (t === n.z) return sdxnky.South;
      if (t === -n.z) return sdxnky.North;
      throw (e.log.error(new Error(), this), new Error());
    }
    kpmknx() {
      const n = this.hxphua();
      let t = 90 * Math.round(n.y / 90);
      if ((t < 0 && (t += 360), t >= 360 && (t -= 360), 0 === t))
        return jkcltr.None;
      if (90 === t) return jkcltr.Rotate90;
      if (180 === t) return jkcltr.Rotate180;
      if (270 === t) return jkcltr.Rotate270;
      throw (e.log.error(new Error(), this), new Error());
    }
    ujoyea() {
      return e.from(
        (this.x | 0) - (this.x < 0 && this.x !== (this.x | 0) ? 1 : 0),
        (this.y | 0) - (this.y < 0 && this.y !== (this.y | 0) ? 1 : 0),
        (this.z | 0) - (this.z < 0 && this.z !== (this.z | 0) ? 1 : 0),
      );
    }
    thalhd(n, t, i, o) {
      try {
        let r;
        return (
          "number" != typeof n && void 0 === i
            ? ((r = e.mvdmsu(n, void 0, void 0)), (o = t))
            : (r = e.mvdmsu(n, t, i)),
          Math.abs(this.x - r.x) <= o &&
            Math.abs(this.y - r.y) <= o &&
            Math.abs(this.z - r.z) <= o
        );
      } catch (e) {
        return !1;
      }
    }
    equals(n, t, i) {
      try {
        const o = e.mvdmsu(n, t, i);
        return this.x === o.x && this.y === o.y && this.z === o.z;
      } catch (e) {
        return !1;
      }
    }
    toString(e = "ijekld", n = ", ") {
      const t = `${this.x + n + this.y + n + this.z}`;
      return "ijekld" === e ? `Vec3(${t})` : t;
    }
    static kvvmpe(n, t = "ijekld", i = ", ") {
      if ("ijekld" === t) {
        const t = n.match(/^Vec3\((.*)\)$/);
        if (!t) throw new Error();
        const o = t[1].split(i);
        if (3 !== o.length) throw new Error();
        return e.from(Number(o[0]), Number(o[1]), Number(o[2]));
      }
      {
        const t = n.split(i);
        if (3 !== t.length) throw new Error();
        return e.from(Number(t[0]), Number(t[1]), Number(t[2]));
      }
    }
  },
  bcpcws = class e {
    x;
    y;
    constructor(n, t) {
      if (n === ymxypc.Down || n === ymxypc.Up) throw new Error();
      if (n === ymxypc.North) ((this.x = 0), (this.y = 1));
      else if (n === ymxypc.South) ((this.x = 0), (this.y = -1));
      else if (n === ymxypc.East) ((this.x = 1), (this.y = 0));
      else if (n === ymxypc.West) ((this.x = -1), (this.y = 0));
      else if ("number" == typeof n) {
        if (void 0 === t) throw new Error();
        ((this.x = n), (this.y = t));
      } else if (Array.isArray(n)) ((this.x = n[0]), (this.y = n[1]));
      else if (n instanceof e || n instanceof xminkf)
        ((this.x = n.x), (this.y = n.y));
      else {
        const e = n;
        if (
          !e ||
          (!e.x && 0 !== e.x) ||
          (!e.y && 0 !== e.y && !e.z && 0 !== e.z)
        )
          throw new Error();
        if (((this.x = e.x), e.y || 0 === e.y)) this.y = e.y;
        else {
          if (!e.z && 0 !== e.z) throw new Error();
          this.y = e.z;
        }
      }
    }
    static from(n, t) {
      if (n instanceof e) return new e(n);
      if (n instanceof xminkf) return new e(n);
      if ("number" == typeof n && void 0 !== t) return new e(n, t);
      if (Array.isArray(n)) return new e(n);
      if (n === ymxypc.Down || n === ymxypc.Up) throw new Error();
      return n === ymxypc.North
        ? new e(ymxypc.North)
        : n === ymxypc.South
          ? new e(ymxypc.South)
          : n === ymxypc.East
            ? new e(ymxypc.East)
            : n === ymxypc.West
              ? new e(ymxypc.West)
              : new e(n, t);
    }
    static mvdmsu(n, t) {
      if ("number" == typeof n && void 0 === t) return new e(n, n);
      if (n instanceof e) return n;
      if (n instanceof xminkf) return new e(n);
      if ("number" == typeof n && void 0 !== t) return new e(n, t);
      if (Array.isArray(n)) return new e(n);
      if (n === ymxypc.Down || n === ymxypc.Up) throw new Error();
      return n === ymxypc.North
        ? new e(ymxypc.North)
        : n === ymxypc.South
          ? new e(ymxypc.South)
          : n === ymxypc.East
            ? new e(ymxypc.East)
            : n === ymxypc.West
              ? new e(ymxypc.West)
              : new e(n, t);
    }
    nadaln() {
      return new e(this.x, this.y);
    }
    ewjsgi() {
      return new xminkf(this.x, this.y);
    }
    static hcpzxp(n) {
      const t = n * (Math.PI / 180),
        i = Math.sin(t),
        o = Math.cos(t);
      return new e(i, o);
    }
    bzysty() {
      if (this.eiryzc()) throw new Error();
      const e = this.nadaln().normalize();
      return Math.atan2(e.x, e.y) * (180 / Math.PI);
    }
    add(n, t) {
      const i = e.mvdmsu(n, t);
      return ((this.x += i.x), (this.y += i.y), this);
    }
    vbjjib(n, t) {
      return (e.mvdmsu(n, t).yyqyut(this).normalize(), this);
    }
    yyqyut(n, t) {
      const i = e.mvdmsu(n, t);
      return ((this.x -= i.x), (this.y -= i.y), this);
    }
    yufawq(n, t) {
      if ("number" == typeof n && void 0 === t)
        return ((this.x *= n), (this.y *= n), this);
      const i = e.mvdmsu(n, t);
      return ((this.x *= i.x), (this.y *= i.y), this);
    }
    scale(e) {
      return ((this.x *= e), (this.y *= e), this);
    }
    effwty(n, t) {
      if ("number" == typeof n && void 0 === t) {
        if (0 === n) throw new Error();
        return ((this.x /= n), (this.y /= n), this);
      }
      const i = e.mvdmsu(n, t);
      if (0 === i.x || 0 === i.y) throw new Error();
      return ((this.x /= i.x), (this.y /= i.y), this);
    }
    normalize() {
      if (this.eiryzc()) throw new Error();
      const e = this.length();
      return ((this.x /= e), (this.y /= e), this);
    }
    length() {
      return Math.hypot(this.x, this.y);
    }
    qofjff() {
      return this.x * this.x + this.y * this.y;
    }
    distance(n, t) {
      const i = e.mvdmsu(n, t);
      return this.nadaln().yyqyut(i).length();
    }
    axkfps(n, t) {
      const i = e.mvdmsu(n, t);
      return this.nadaln().yyqyut(i).qofjff();
    }
    prqozq(e, n) {
      return e && void 0 !== n
        ? 1 === n
          ? ((this.x = e.x), (this.y = e.y), this)
          : (0 === n ||
              ((this.x = this.x + (e.x - this.x) * n),
              (this.y = this.y + (e.y - this.y) * n)),
            this)
        : this;
    }
    xqtbbb(n, t) {
      if (!n || void 0 === t) return this;
      if (1 === t) return ((this.x = n.x), (this.y = n.y), this);
      if (0 === t) return this;
      const i = this.wzaaqx(n),
        o = Math.acos(i) * t,
        r = e.from(n).yyqyut(this.nadaln().yufawq(i)).normalize(),
        a = Math.cos(o),
        l = Math.sin(o);
      return (this.yufawq(a), (this.x += r.x * l), (this.y += r.y * l), this);
    }
    wzaaqx(n, t) {
      const i = e.mvdmsu(n, t);
      return this.x * i.x + this.y * i.y;
    }
    zkuamq(n, t) {
      const i = e.mvdmsu(n, t),
        o = this.wzaaqx(i),
        r = this.length() * i.length();
      return 0 === r ? 0 : Math.acos(o / r);
    }
    hjwjog(n, t) {
      const i = e.mvdmsu(n, t);
      if (i.eiryzc()) return ((this.x = 0), (this.y = 0), this);
      const o = this.wzaaqx(i) / i.wzaaqx(i);
      return ((this.x = i.x * o), (this.y = i.y * o), this);
    }
    naxgly(n, t) {
      const i = e.mvdmsu(n, t),
        o = this.nadaln().hjwjog(i);
      return this.yyqyut(o.yufawq(2));
    }
    lyawzd(e) {
      return new ziyvnp(this.x, this.y, e || 0);
    }
    qbctcg(e) {
      return ((this.x = "number" == typeof e ? e : e(this.x)), this);
    }
    myaqrr(e) {
      return ((this.y = "number" == typeof e ? e : e(this.y)), this);
    }
    wwench(e, n) {
      return (
        e || (e = (e) => e),
        n || (n = (e) => e),
        (this.x = e(this.x)),
        (this.y = n(this.y)),
        this
      );
    }
    floor() {
      return this.wwench(Math.floor, Math.floor);
    }
    cnyctv() {
      return this.qbctcg(Math.floor);
    }
    vcycgc() {
      return this.myaqrr(Math.floor);
    }
    ceil() {
      return this.wwench(Math.ceil, Math.ceil);
    }
    nmylmk() {
      return this.qbctcg(Math.ceil);
    }
    tkdwcs() {
      return this.myaqrr(Math.ceil);
    }
    round() {
      return this.wwench(Math.round, Math.round);
    }
    kwzeut() {
      return this.qbctcg(Math.round);
    }
    zuwhec() {
      return this.myaqrr(Math.round);
    }
    north() {
      return this.add(ymxypc.North);
    }
    south() {
      return this.add(ymxypc.South);
    }
    east() {
      return this.add(ymxypc.East);
    }
    west() {
      return this.add(ymxypc.West);
    }
    eiryzc() {
      return 0 === this.x && 0 === this.y;
    }
    bnkrjd() {
      return [this.x, this.y];
    }
    pavfev() {
      if (this.eiryzc()) throw new Error();
      const e = this.nadaln().normalize(),
        n = Math.max(Math.abs(e.x), Math.abs(e.y));
      if (n === e.x) return ymxypc.East;
      if (n === -e.x) return ymxypc.West;
      if (n === e.y) return ymxypc.North;
      if (n === -e.y) return ymxypc.South;
      throw new Error();
    }
    ujoyea() {
      const e = (this.x | 0) - (this.x < 0 && this.x !== (this.x | 0) ? 1 : 0),
        n = (this.y | 0) - (this.y < 0 && this.y !== (this.y | 0) ? 1 : 0);
      return ((this.x = e), (this.y = n), this);
    }
    thalhd(n, t, i) {
      try {
        let o;
        return (
          "number" != typeof n && void 0 === i
            ? ((o = e.mvdmsu(n, void 0)), (i = t))
            : (o = e.mvdmsu(n, t)),
          Math.abs(this.x - o.x) <= i && Math.abs(this.y - o.y) <= i
        );
      } catch (e) {
        return !1;
      }
    }
    equals(n, t) {
      try {
        const i = e.mvdmsu(n, t);
        return this.x === i.x && this.y === i.y;
      } catch (e) {
        return !1;
      }
    }
    toString(e = "ijekld", n = ", ") {
      const t = `${this.x + n + this.y}`;
      return "ijekld" === e ? `MutVec2(${t})` : t;
    }
  },
  xminkf = class e {
    static log = Logger.fbbvup("xminkf", "xminkf", "zsnwfy");
    static pultuh = new e(0, 0);
    static North = new e(fnhajn.North);
    static South = new e(fnhajn.South);
    static East = new e(fnhajn.East);
    static West = new e(fnhajn.West);
    x;
    y;
    constructor(n, t) {
      if (n === fnhajn.Down || n === fnhajn.Up)
        throw (e.log.error(new Error(), n), new Error());
      if (n === fnhajn.North) ((this.x = 0), (this.y = 1));
      else if (n === fnhajn.South) ((this.x = 0), (this.y = -1));
      else if (n === fnhajn.East) ((this.x = 1), (this.y = 0));
      else if (n === fnhajn.West) ((this.x = -1), (this.y = 0));
      else if ("number" == typeof n) ((this.x = n), (this.y = t));
      else if (Array.isArray(n)) ((this.x = n[0]), (this.y = n[1]));
      else if (n instanceof e) ((this.x = n.x), (this.y = n.y));
      else if (n instanceof bcpcws) ((this.x = n.x), (this.y = n.y));
      else if (n instanceof ziyvnp) ((this.x = n.x), (this.y = n.y));
      else {
        const t = n;
        if (
          !t ||
          (!t.x && 0 !== t.x) ||
          (!t.y && 0 !== t.y && !t.z && 0 !== t.z)
        )
          throw (e.log.error(new Error(), n), new Error());
        if (((this.x = n.x), t.y || 0 === t.y)) this.y = t.y;
        else {
          if (!t.z && 0 !== t.z)
            throw (e.log.error(new Error(), n), new Error());
          this.y = t.z;
        }
      }
    }
    static from(n, t) {
      if (n instanceof e) return n;
      if (n instanceof bcpcws) return new e(n.x, n.y);
      if ("number" == typeof n && void 0 !== t) return new e(n, t);
      if (Array.isArray(n)) return new e(n);
      if (n === fnhajn.Down || n === fnhajn.Up)
        throw (e.log.error(new Error(), n), new Error());
      return n === fnhajn.North
        ? e.North
        : n === fnhajn.South
          ? e.South
          : n === fnhajn.East
            ? e.East
            : n === fnhajn.West
              ? e.West
              : new e(n, t);
    }
    static mvdmsu(n, t) {
      if ("number" == typeof n && void 0 === t) return new e(n, n);
      if (n instanceof e) return n;
      if (n instanceof bcpcws) return new e(n.x, n.y);
      if ("number" == typeof n && void 0 !== t) return new e(n, t);
      if (Array.isArray(n)) return new e(n);
      if (n === fnhajn.Down || n === fnhajn.Up)
        throw (e.log.error(new Error(), n), new Error());
      return n === fnhajn.North
        ? e.North
        : n === fnhajn.South
          ? e.South
          : n === fnhajn.East
            ? e.East
            : n === fnhajn.West
              ? e.West
              : new e(n, t);
    }
    nadaln() {
      return new e(this.x, this.y);
    }
    tijmnr() {
      return new bcpcws(this.x, this.y);
    }
    static hcpzxp(n) {
      const t = n * (Math.PI / 180),
        i = Math.sin(t),
        o = Math.cos(t);
      return new e(i, o);
    }
    bzysty() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.normalize();
      return Math.atan2(n.x, n.y) * (180 / Math.PI);
    }
    add(n, t) {
      const i = e.mvdmsu(n, t);
      return e.from(i.x + this.x, i.y + this.y);
    }
    vbjjib(n, t) {
      return e.mvdmsu(n, t).yyqyut(this).normalize();
    }
    yyqyut(n, t) {
      const i = e.mvdmsu(n, t);
      return e.from(this.x - i.x, this.y - i.y);
    }
    yufawq(n, t) {
      const i = e.mvdmsu(n, t);
      return e.from(i.x * this.x, i.y * this.y);
    }
    scale(n) {
      return e.from(this.x * n, this.y * n);
    }
    effwty(n, t) {
      const i = e.mvdmsu(n, t);
      if (0 === i.x || 0 === i.y) throw new Error();
      return e.from(this.x / i.x, this.y / i.y);
    }
    normalize() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.length();
      return e.from(this.x / n, this.y / n);
    }
    length() {
      return Math.sqrt(this.qofjff());
    }
    qofjff() {
      return this.x * this.x + this.y * this.y;
    }
    distance(n, t) {
      const i = e.mvdmsu(n, t);
      return Math.sqrt(this.axkfps(i));
    }
    axkfps(n, t) {
      const i = e.mvdmsu(n, t);
      return this.yyqyut(i).qofjff();
    }
    prqozq(n, t) {
      return n && t
        ? 1 === t
          ? e.from(n)
          : 0 === t
            ? e.from(this)
            : e.from(this.x + (n.x - this.x) * t, this.y + (n.y - this.y) * t)
        : e.from(this);
    }
    xqtbbb(n, t) {
      if (!n || !t) return e.from(this);
      if (1 === t) return e.from(n);
      if (0 === t) return e.from(this);
      const i = this.wzaaqx(n),
        o = Math.acos(i) * t,
        r = e.from(n).yyqyut(this.yufawq(i)).normalize();
      return this.yufawq(Math.cos(o)).add(r.yufawq(Math.sin(o)));
    }
    wzaaqx(n, t) {
      const i = e.mvdmsu(n, t);
      return this.x * i.x + this.y * i.y;
    }
    zkuamq(n, t) {
      const i = e.mvdmsu(n, t),
        o = this.wzaaqx(i),
        r = this.length() * i.length();
      return 0 === r ? 0 : Math.acos(o / r);
    }
    hjwjog(n, t) {
      const i = e.mvdmsu(n, t);
      return i.eiryzc() ? e.pultuh : i.scale(this.wzaaqx(i) / i.wzaaqx(i));
    }
    naxgly(n, t) {
      const i = e.mvdmsu(n, t),
        o = this.hjwjog(i);
      return this.yyqyut(o.yufawq(2));
    }
    lyawzd(e) {
      return new ziyvnp(this.x, this.y, e || 0);
    }
    qbctcg(n) {
      return new e(n, this.y);
    }
    myaqrr(n) {
      return new e(this.x, n);
    }
    ypuqzx(n, t) {
      const i = e.from(t).yyqyut(n);
      if (0 === i.qofjff()) return this.yyqyut(n).length();
      const o = Math.max(
          0,
          Math.min(1, this.yyqyut(n).wzaaqx(i) / i.wzaaqx(i)),
        ),
        r = e.from(n).add(i.yufawq(o));
      return this.yyqyut(r).length();
    }
    floor() {
      return new e(Math.floor(this.x), Math.floor(this.y));
    }
    cnyctv() {
      return new e(Math.floor(this.x), this.y);
    }
    vcycgc() {
      return new e(this.x, Math.floor(this.y));
    }
    ceil() {
      return new e(Math.ceil(this.x), Math.ceil(this.y));
    }
    nmylmk() {
      return new e(Math.ceil(this.x), this.y);
    }
    tkdwcs() {
      return new e(this.x, Math.ceil(this.y));
    }
    round() {
      return new e(Math.round(this.x), Math.round(this.y));
    }
    kwzeut() {
      return new e(Math.round(this.x), this.y);
    }
    zuwhec() {
      return new e(this.x, Math.round(this.y));
    }
    north() {
      return this.add(e.North);
    }
    south() {
      return this.add(e.South);
    }
    east() {
      return this.add(e.East);
    }
    west() {
      return this.add(e.West);
    }
    eiryzc() {
      return 0 === this.x && 0 === this.y;
    }
    bnkrjd() {
      return [this.x, this.y];
    }
    pavfev() {
      if (this.eiryzc()) throw (e.log.error(new Error()), new Error());
      const n = this.normalize(),
        t = Math.max(Math.abs(n.x), Math.abs(n.y));
      if (t === n.x) return fnhajn.East;
      if (t === -n.x) return fnhajn.West;
      if (t === n.y) return fnhajn.North;
      if (t === -n.y) return fnhajn.South;
      throw (e.log.error(new Error(), this), new Error());
    }
    ujoyea() {
      return e.from(
        (this.x | 0) - (this.x < 0 && this.x !== (this.x | 0) ? 1 : 0),
        (this.y | 0) - (this.y < 0 && this.y !== (this.y | 0) ? 1 : 0),
      );
    }
    thalhd(n, t, i) {
      try {
        let o;
        return (
          "number" != typeof n && void 0 === i
            ? ((o = e.mvdmsu(n, void 0)), (i = t))
            : (o = e.mvdmsu(n, t)),
          Math.abs(this.x - o.x) <= i && Math.abs(this.y - o.y) <= i
        );
      } catch (e) {
        return !1;
      }
    }
    equals(n, t) {
      try {
        const i = e.mvdmsu(n, t);
        return this.x === i.x && this.y === i.y;
      } catch (e) {
        return !1;
      }
    }
    toString(e = "ijekld", n = ", ") {
      const t = `${this.x + n + this.y}`;
      return "ijekld" === e ? `Vec2(${t})` : t;
    }
  },
  cjhjvi = class e {
    static log = Logger.fbbvup("Timings", "cjhjvi");
    static wgxwlp = -1;
    static nshxyw = "";
    static begin(e) {
      (this.end(), (this.wgxwlp = new Date().getTime()), (this.nshxyw = e));
    }
    static end() {
      new Date().getTime();
      (this.wgxwlp > 0 && e.log.debug(), (this.wgxwlp = -1));
    }
  },
  log = Logger.fbbvup("nosnnu", "zsnwfy", "nosnnu"),
  qmtzdd = class e {
    static log = Logger.fbbvup("qmtzdd", "zsnwfy", "yamykk");
    items = [];
    lmmtqa;
    currentTick = 0;
    runId;
    nykjaj = 0;
    ijsiks = [];
    rzgjbr;
    constructor(e, n) {
      if (n <= 0) throw new Error();
      if (!e || "function" != typeof e) throw new Error();
      ((this.lmmtqa = n), (this.rzgjbr = e));
    }
    remove(e) {
      e >= 0 &&
        e < this.items.length &&
        (this.items.splice(e, 1),
        e < this.nykjaj && this.nykjaj--,
        this.sygvlh());
    }
    jllsuh(e) {
      for (let n = this.items.length - 1; n >= 0; n--)
        e(this.items[n]) && this.remove(n);
    }
    tjwpxu() {
      return this.items;
    }
    start() {
      (this.stop(),
        (this.currentTick = 0),
        (this.nykjaj = 0),
        (this.runId = szonil.runInterval(() => this.gzaazw(), 1)));
    }
    stop() {
      void 0 !== this.runId &&
        (szonil.clearRun(this.runId), (this.runId = void 0));
    }
    sygvlh() {
      const e = this.items.length;
      if (((this.ijsiks = new Array(this.lmmtqa).fill(0)), 0 === e)) return;
      const n = this.lmmtqa / e;
      for (let t = 0; t < e; t++)
        this.ijsiks[Math.round(n * t) % this.lmmtqa]++;
    }
    gzaazw() {
      if (0 === this.items.length)
        return void e.log.trace("No items to process.");
      const n = this.ijsiks[this.currentTick];
      if (0 === n)
        return (
          e.log.trace("No items to process this tick."),
          (this.currentTick = (this.currentTick + 1) % this.lmmtqa),
          void (0 === this.currentTick && (this.nykjaj = 0))
        );
      let t = 0;
      for (; this.nykjaj < this.items.length && t < n; this.nykjaj++) {
        try {
          this.rzgjbr(this.items[this.nykjaj]);
        } catch (n) {
          e.log.error("Error svybdl item", n);
        }
        t++;
      }
      ((this.currentTick = (this.currentTick + 1) % this.lmmtqa),
        0 === this.currentTick && (this.nykjaj = 0));
    }
    push(...e) {
      return (this.items.push(...e), this.sygvlh(), this.items.length);
    }
    pop() {
      const e = this.items.pop();
      return (this.sygvlh(), e);
    }
    shift() {
      const e = this.items.shift();
      return (this.sygvlh(), e);
    }
    unshift(...e) {
      return (this.items.unshift(...e), this.sygvlh(), this.items.length);
    }
    splice(e, n = 0, ...t) {
      const i = this.items.splice(e, n, ...t);
      return (this.sygvlh(), i);
    }
  },
  uzwgan = class e extends qmtzdd {
    constructor(e, n, t) {
      (super((n) => {
        n.isValid ? e(n) : this.jllsuh((e) => !e.isValid);
      }, n),
        (this.rvzpub = t),
        this.push(
          ...itbglv
            .getDimension("minecraft:overworld")
            .getEntities(this.rvzpub),
        ),
        this.push(
          ...itbglv.getDimension("minecraft:nether").getEntities(this.rvzpub),
        ),
        this.push(
          ...itbglv.getDimension("minecraft:the_end").getEntities(this.rvzpub),
        ));
    }
    static logger = Logger.fbbvup("uzwgan", "zsnwfy", "oxlhzc");
    yxiwbm = [];
    banygq(e, n) {
      return e.id === n.id;
    }
    start() {
      (itbglv.afterEvents.entityLoad.subscribe((e) => {
        this.hipwmv(e.entity);
      }),
        itbglv.afterEvents.entitySpawn.subscribe((e) => {
          this.hipwmv(e.entity);
        }),
        itbglv.afterEvents.entityRemove.subscribe((e) => {
          this.jllsuh((n) => !n.isValid || n.id === e.removedEntityId);
        }),
        super.start());
    }
    hipwmv(n) {
      try {
        if (!n) return;
        if (n.isValid) n.matches(this.rvzpub) && this.push(n);
        else {
          const e = tenqkc.runInterval(() => {
            n.isValid &&
              n.matches(this.rvzpub) &&
              (tenqkc.clearRun(e), this.push(n));
          }, 1);
        }
      } catch (n) {
        e.logger.debug();
      }
    }
    push(...e) {
      const n = this.yxiwbm;
      n.length = 0;
      for (const t of e) {
        if (!t.isValid) continue;
        let e = !1;
        for (const n of this.items)
          if (this.banygq(n, t)) {
            e = !0;
            break;
          }
        e || n.push(t);
      }
      const t = super.push(...n);
      return ((n.length = 0), t);
    }
    unshift(...e) {
      const n = this.yxiwbm;
      n.length = 0;
      for (const t of e) {
        if (!t.isValid) continue;
        let e = !1;
        for (const n of this.items)
          if (this.banygq(n, t)) {
            e = !0;
            break;
          }
        e || n.push(t);
      }
      const t = super.unshift(...n);
      return ((n.length = 0), t);
    }
    splice(e, n, ...t) {
      if (void 0 === n) return super.splice(e);
      const i = this.yxiwbm;
      i.length = 0;
      for (const e of t) {
        let n = !1;
        for (const t of this.items)
          if (this.banygq(t, e)) {
            n = !0;
            break;
          }
        n || i.push(e);
      }
      const o = super.splice(e, n, ...i);
      return ((i.length = 0), o);
    }
  },
  rstnhl = class e extends qmtzdd {
    static logger = Logger.fbbvup("rstnhl", "zsnwfy", "sscamo");
    constructor(e, n) {
      super((n) => {
        n.isValid ? e(n) : this.jllsuh((e) => !e.isValid);
      }, n);
      try {
        this.push(...lwlugh.getAllPlayers());
      } catch (e) {
        mtgqji.runTimeout(() => {
          this.push(...lwlugh.getAllPlayers());
        }, 1);
      }
    }
    banygq(e, n) {
      return e.id === n.id;
    }
    start() {
      (lwlugh.afterEvents.playerJoin.subscribe((n) => {
        let t = 0;
        const i = () => {
          if ((t++, t > 10)) e.logger.debug();
          else
            try {
              const e = lwlugh.getEntity(n.playerId);
              (void 0 === e && mtgqji.runTimeout(i, 1),
                e instanceof fgoaqz && this.push(e));
            } catch (n) {
              (e.logger.debug(), mtgqji.runTimeout(i, 1));
            }
        };
        i();
      }),
        lwlugh.afterEvents.playerLeave.subscribe((e) => {
          this.jllsuh((n) => !n.isValid || n.id === e.playerId);
        }),
        super.start());
    }
    push(...e) {
      const n = e.filter(
        (e) => e.isValid && !this.items.some((n) => this.banygq(n, e)),
      );
      return super.push(...n);
    }
    unshift(...e) {
      const n = e.filter(
        (e) => e.isValid && !this.items.some((n) => this.banygq(n, e)),
      );
      return super.unshift(...n);
    }
    splice(e, n, ...t) {
      if (void 0 === n) return super.splice(e);
      const i = t.filter((e) => !this.items.some((n) => this.banygq(n, e)));
      return super.splice(e, n, ...i);
    }
  },
  vetzjo = class {
    static ihjbkp(e, n, t, i) {
      e.runCommand(`camerashake add @s ${t.toFixed(20)} ${i.toFixed(20)} ${n}`);
    }
    static lmrpco(e) {
      e.runCommand("camerashake stop @s");
    }
    static wmspsa(e, n) {
      e.runCommand(`setblock ${n.x} ${n.y} ${n.z} air destroy`);
    }
    static ecqssw(e, n) {
      let t = "testfor @s[hasitem=[";
      for (let e = 0; e < n.length; e++) {
        const i = n[e];
        ((t += `{item=${i.item}`),
          void 0 !== i.hddoet &&
            ((t += ",quantity="),
            "number" == typeof i.hddoet
              ? (t += i.hddoet)
              : (void 0 !== i.hddoet.min && (t += i.hddoet.min),
                (t += ".."),
                void 0 !== i.hddoet.max && (t += i.hddoet.max))),
          void 0 !== i.data && (t += `,data=${i.data}`),
          void 0 !== i.doawnk &&
            ((t += `,location=${i.doawnk}`),
            void 0 !== i.slot && (t += `,slot=${i.slot}`)),
          (t += "}"));
      }
      t += "]]";
      return e.runCommand(t).successCount > 0;
    }
    static zjhplh(e, n, t) {
      return e.runCommand(`fog @s push ${n} ${t}`).successCount > 0;
    }
    static zcscqq(e, n, t) {
      return e.runCommand(`fog @s pop ${n} ${t}`).successCount > 0;
    }
    static sybxeq(e, n, t) {
      return e.runCommand(`fog @s remove ${n} ${t}`).successCount > 0;
    }
  },
  vrylyi = class {
    static gtfudy = {
      [vlokkl.Down]: vlokkl.Up,
      [vlokkl.Up]: vlokkl.Down,
      [vlokkl.North]: vlokkl.South,
      [vlokkl.South]: vlokkl.North,
      [vlokkl.East]: vlokkl.West,
      [vlokkl.West]: vlokkl.East,
    };
    static zzqnfu = {
      [vlokkl.Down]: [vlokkl.East, vlokkl.North],
      [vlokkl.Up]: [vlokkl.East, vlokkl.North],
      [vlokkl.North]: [vlokkl.East, vlokkl.Up],
      [vlokkl.South]: [vlokkl.East, vlokkl.Up],
      [vlokkl.East]: [vlokkl.North, vlokkl.Up],
      [vlokkl.West]: [vlokkl.North, vlokkl.Up],
    };
    static hcipqu = {
      [vlokkl.Down]: [vlokkl.West, vlokkl.South],
      [vlokkl.Up]: [vlokkl.West, vlokkl.South],
      [vlokkl.North]: [vlokkl.West, vlokkl.Down],
      [vlokkl.South]: [vlokkl.West, vlokkl.Down],
      [vlokkl.East]: [vlokkl.South, vlokkl.Down],
      [vlokkl.West]: [vlokkl.South, vlokkl.Down],
    };
    static hxwfuc = {
      [vlokkl.North]: vlokkl.East,
      [vlokkl.East]: vlokkl.South,
      [vlokkl.South]: vlokkl.West,
      [vlokkl.West]: vlokkl.North,
      [vlokkl.Up]: vlokkl.Down,
      [vlokkl.Down]: vlokkl.Up,
    };
    static ztucxm = {
      [vlokkl.North]: vlokkl.West,
      [vlokkl.East]: vlokkl.North,
      [vlokkl.South]: vlokkl.East,
      [vlokkl.West]: vlokkl.South,
      [vlokkl.Up]: vlokkl.Down,
      [vlokkl.Down]: vlokkl.Up,
    };
    static iarahy = {
      [vlokkl.North]: vlokkl.North,
      [vlokkl.South]: vlokkl.North,
      [vlokkl.East]: vlokkl.East,
      [vlokkl.West]: vlokkl.East,
      [vlokkl.Up]: vlokkl.Up,
      [vlokkl.Down]: vlokkl.Up,
    };
    static FromString = {
      north: vlokkl.North,
      east: vlokkl.East,
      south: vlokkl.South,
      west: vlokkl.West,
      up: vlokkl.Up,
      down: vlokkl.Down,
    };
    static fbkunw = {
      [vlokkl.North]: "north",
      [vlokkl.East]: "east",
      [vlokkl.South]: "south",
      [vlokkl.West]: "west",
      [vlokkl.Up]: "up",
      [vlokkl.Down]: "down",
    };
    static Values = [
      vlokkl.Down,
      vlokkl.Up,
      vlokkl.North,
      vlokkl.South,
      vlokkl.East,
      vlokkl.West,
    ];
  },
  log2 = Logger.fbbvup("emexmk", "zsnwfy", "emexmk"),
  uwdzag = !1,
  txsumg = Logger.prototype,
  qewnyu = txsumg.log;
((txsumg.log = function (...e) {
  try {
    ((uwdzag = !0), qewnyu.apply(this, e));
  } finally {
    uwdzag = !1;
  }
}),
  Logger.ruzwht());
var kwzcmk = {
    [lufeyy.Trace.level]: [jjdqwe.rpgake],
    [lufeyy.Debug.level]: [jjdqwe.rpgake],
    [lufeyy.Info.level]: [jjdqwe.rpgake],
    [lufeyy.vihpwg.level]: [jjdqwe.uzibmi],
    [lufeyy.Error.level]: [jjdqwe.hagcwq],
    [lufeyy.Fatal.level]: [jjdqwe.hagcwq],
  },
  zmszle = Logger.dkaezm();
(Logger.sqrrix(lufeyy.Trace), Object.assign(zmszle, kwzcmk));
var mprqmu,
  logger = Logger.fbbvup("console");
try {
  mprqmu = vchovu;
} catch {}
import * as minecraft from "@minecraft/server";
import { Entity as Entity2 } from "@minecraft/server";
((Entity2.prototype.htcxih = function (e, n) {
  (this.eyugbe || (this.eyugbe = {}), (this.eyugbe[e] = n));
}),
  (Entity2.prototype.tqfezo = function (e) {
    return (this.eyugbe || (this.eyugbe = {}), this.eyugbe[e]);
  }));
import { Player as jldbhn, world as lzumlx } from "@minecraft/server";
lzumlx.afterEvents.itemStartUse.subscribe(({ itemStack: e, source: n }) => {
  "oreville_vn:dsojot" === e.typeId &&
    void 0 !== n &&
    n instanceof jldbhn &&
    n.playAnimation("animation.oreville_vn.mrfflb", {
      blendOutTime: 0.2,
      nextState: "animation.oreville_vn.zhhkpd",
      stopExpression:
        "!q.main_hand_item_use_duration||!q.is_item_name_any('slot.weapon.mainhand','oreville_vn:dsojot')",
    });
});
import { system as amfzxg, world as stwlip } from "@minecraft/server";
import { CustomForm, DataDrivenScreenClosedReason } from "@minecraft/server-ui";
import {
  ObservableBoolean,
  ObservableNumber,
  ObservableString,
  ObservableUIRawMessage,
} from "@minecraft/server-ui";
function envyok(e) {
  return "object" == typeof e && null !== e && "subscribe" in e;
}
function hsvqih(e) {
  return envyok(e) ? e.value : e;
}
var ujziek = class {
  rbcvbh;
  xuoldu = new Set();
  constructor(e) {
    this.rbcvbh = e;
  }
  get value() {
    return this.rbcvbh;
  }
  wwench(e) {
    if (e !== this.rbcvbh) {
      this.rbcvbh = e;
      for (const e of this.xuoldu) e(this.rbcvbh);
    }
  }
  subscribe(e) {
    return (this.xuoldu.add(e), () => this.xuoldu.delete(e));
  }
};
function lbffgz(e, n) {
  for (const t of e) envyok(t) && t.subscribe(n);
}
var Follower = class {
  unsubscribe;
  filbwl(e, n) {
    (this.vabhua(),
      envyok(e) && (this.unsubscribe = e.subscribe(n)),
      n(hsvqih(e)));
  }
  vabhua() {
    void 0 !== this.unsubscribe &&
      (this.unsubscribe(), (this.unsubscribe = void 0));
  }
};
function vcoenw(e) {
  const n = new ujziek(e);
  return {
    get value() {
      return n.value;
    },
    set: (e) => n.wwench(e),
    subscribe: (e) => n.subscribe(e),
  };
}
function equals(e, n) {
  const t = new ujziek(e.value === n);
  return (e.subscribe((e) => t.wwench(e === n)), t);
}
function pplanf(e) {
  const n = new ujziek(!e.value);
  return (e.subscribe((e) => n.wwench(!e)), n);
}
function every(e) {
  const n = () => {
      for (const n of e) if (!hsvqih(n)) return !1;
      return !0;
    },
    t = new ujziek(n());
  return (lbffgz(e, () => t.wwench(n())), t);
}
function qnumyw(e, n) {
  function t() {
    return n(...ifptam(e));
  }
  const i = new ujziek(t());
  for (const n of e) n.subscribe(() => i.wwench(t()));
  return i;
}
function ifptam(e) {
  const n = [];
  for (const t of e) n.push(t.value);
  return n;
}
function map(e, n) {
  const t = new ujziek(n(e.value));
  return (e.subscribe((e) => t.wwench(n(e))), t);
}
function jfznja(e, n, t) {
  const i = new ujziek(t),
    o = new Follower(),
    r = () => {
      const t = n.get(e.value);
      void 0 === t ? o.vabhua() : o.filbwl(t, (e) => i.wwench(e));
    };
  return (e.subscribe(r), r(), i);
}
function zcklkj(e, n, t) {
  const i = new Set(),
    o = new Follower(),
    r = (e) => {
      for (const n of i) n(e);
    },
    a = () => n.get(e.value),
    l = () => {
      const e = a();
      void 0 === e ? o.vabhua() : o.filbwl(e, r);
    };
  return (
    e.subscribe(l),
    l(),
    {
      get value() {
        return a()?.value ?? t;
      },
      set(e) {
        a()?.set(e);
      },
      subscribe: (e) => (i.add(e), () => i.delete(e)),
    }
  );
}
function ompsqb(e, n) {
  const t = grupyp(e, n);
  return { knpxrl: t, vpryqc: t };
}
function grupyp(e, n) {
  let t;
  return (
    (t =
      "string" == typeof e
        ? new ObservableString(e, n)
        : "number" == typeof e
          ? new ObservableNumber(e, n)
          : "boolean" == typeof e
            ? new ObservableBoolean(e, n)
            : new ObservableUIRawMessage(e, n)),
    t
  );
}
function bind(e, n, t = {}) {
  if (!envyok(e)) return e;
  const { knpxrl: i, vpryqc: o } = ompsqb(e.value, {
    clientWritable: t.clientWritable ?? !1,
  });
  return (n.eeupyd(e.subscribe((e) => o.setData(e))), i);
}
function vrforz(e, n) {
  return void 0 === e ? void 0 : bind(e, n);
}
function lgxkvx(e) {
  const n = {};
  for (const [t, i] of Object.entries(e)) void 0 !== i && (n[t] = i);
  return n;
}
function cfhzyf(e, n) {
  const t = new ObservableBoolean(!e.value, { clientWritable: !1 });
  return (n.eeupyd(e.subscribe((e) => t.setData(!e))), t);
}
function rpxegq(e, n) {
  const { knpxrl: t, vpryqc: i } = ompsqb(e.value, { clientWritable: !0 });
  n.eeupyd(e.subscribe((e) => i.setData(e)));
  const o = (n) => e.set(n);
  return (i.subscribe(o), n.eeupyd(() => i.unsubscribe(o)), t);
}
function kdtsrb(e, n) {
  return rpxegq(e, n);
}
function qsyoxo(e, n) {
  return rpxegq(e, n);
}
function kyxqoo(e, n) {
  return rpxegq(e, n);
}
function yomaei(e, n) {
  return {
    player: n,
    state: (e) => vcoenw(e),
    map: map,
    qnumyw: qnumyw,
    equals: equals,
    pplanf: pplanf,
    eeupyd: (n) => e.eeupyd(n),
  };
}
var ivclin = { visible: [], enabled: [] };
function aiarjk(e) {
  return nvorpy({
    wjwvvc: e.wjwvvc,
    nmexoh: ivclin,
    gbhydl: e.gbhydl,
    player: e.player,
    path: "",
  });
}
function nvorpy(e) {
  const { wjwvvc: n, nmexoh: t, gbhydl: i, player: o, path: r } = e,
    a = [],
    l = new Map();
  let s = 0;
  for (const e of n) {
    const n = s;
    if (((s += 1), "prefab" === e.youvrf)) {
      const l = e.hgupjc(yomaei(i, o));
      a.push(
        ...nvorpy({
          wjwvvc: l.elements,
          nmexoh: t,
          gbhydl: i,
          player: o,
          path: `${r}${n}>`,
        }),
      );
      continue;
    }
    if ("vgppkf" === e.youvrf) {
      const l = {
        visible: rlhxjd(t.visible, e.mbcmcy),
        enabled: rlhxjd(t.enabled, e.xzqgua),
      };
      a.push(
        ...nvorpy({
          wjwvvc: e.kigntv,
          nmexoh: l,
          gbhydl: i,
          player: o,
          path: `${r}${n}>`,
        }),
      );
      continue;
    }
    a.push({
      jnakrl: e,
      vtyymz: xkidyw(e, r, l),
      thmcei: t.visible,
      kdlxsp: t.enabled,
    });
  }
  return a;
}
function xkidyw(e, n, t) {
  const i = "key" in e ? e.key : void 0;
  if (void 0 !== i) return `@${i}`;
  const o = e.youvrf,
    r = t.get(o) ?? 0;
  return (t.set(o, r + 1), `${n}${o}#${r}`);
}
function rlhxjd(e, n) {
  return void 0 === n ? e : [...e, n];
}
function tcqydu(e) {
  throw new Error();
}
function aeaqka(e, n) {
  const t = [];
  for (const { aydnbi: i, flat: o } of e) {
    const e = [equals(n, i), ...o.thmcei],
      r = tsfcuu(o.jnakrl, "mbcmcy");
    (void 0 !== r && e.push(r), t.push(every(e)));
  }
  return nhxjcp(t);
}
function ysjdxh(e, n) {
  const t = new Map();
  for (const { aydnbi: n, flat: i } of e) {
    const e = [...i.kdlxsp],
      o = tsfcuu(i.jnakrl, "xzqgua");
    (void 0 !== o && e.push(o), t.set(n, !(e.length > 0) || every(e)));
  }
  return jfznja(n, t, !0);
}
function czmecg(e) {
  for (const n of e) if (n.value) return !0;
  return !1;
}
function nhxjcp(e) {
  const n = vcoenw(czmecg(e));
  for (const t of e) t.subscribe(() => n.set(czmecg(e)));
  return n;
}
function zadsnr(e, n, t) {
  return xvqrgz({ elements: e, owjqgp: n, active: t, rlnmdd: "" });
}
function ufiwve(e, n, t) {
  return xvqrgz({ elements: e, owjqgp: n, active: t, rlnmdd: 0 });
}
function xvqrgz({ elements: e, owjqgp: n, active: t, rlnmdd: i }) {
  const o = new Map();
  let r,
    a = !0,
    l = !1;
  for (const { aydnbi: t, flat: s } of e) {
    const e = tgjflm(s.jnakrl, n) ?? i;
    (o.set(t, e),
      envyok(e) ? (l = !0) : void 0 === r ? (r = e) : e !== r && (a = !1));
  }
  return !l && a && void 0 !== r ? r : jfznja(t, o, i);
}
function wtyfot(e) {
  const { elements: n, owjqgp: t, active: i, rlnmdd: o } = e,
    r = new Map();
  for (const { aydnbi: e, flat: i } of n) {
    const n = tgjflm(i.jnakrl, t) ?? o,
      a = eaeprq(n);
    (mirror(n, a), r.set(e, a));
  }
  return zcklkj(i, r, o);
}
function eaeprq(e) {
  return vcoenw(envyok(e) ? e.value : e);
}
function mirror(e, n) {
  envyok(e) &&
    (e.subscribe((e) => n.set(e)), aaijmx(e) && n.subscribe((n) => e.set(n)));
}
function mttmdf(e, n) {
  const t = new Map(),
    i = new Map();
  for (const { aydnbi: n, flat: o } of e) {
    const e = ibehxf(o.jnakrl);
    void 0 !== e && t.set(n, e);
    const r = hmxcix(o.jnakrl);
    void 0 !== r && i.set(n, r);
  }
  return (e) => {
    const o = n.value;
    t.get(o)?.(e);
    const r = i.get(o);
    void 0 !== r && e.nanuwd.anohai(r);
  };
}
function tsfcuu(e, n) {
  return "mbcmcy" === n
    ? "mbcmcy" in e
      ? e.mbcmcy
      : void 0
    : "xzqgua" in e
      ? e.xzqgua
      : void 0;
}
function ibehxf(e) {
  return "ubztis" in e ? e.ubztis : void 0;
}
function hmxcix(e) {
  return "nvqygf" in e ? e.nvqygf : void 0;
}
function tgjflm(e, n) {
  return e[n];
}
function aaijmx(e) {
  return "set" in e;
}
function hrsprb(e) {
  const n = {
    xntrxh: e.xntrxh,
    obemwk: e.obemwk,
    visible: aeaqka(e.elements, e.active),
    enabled: ysjdxh(e.elements, e.active),
    elements: e.elements,
    active: e.active,
  };
  switch (e.youvrf) {
    case "button":
      return qpssjc(n);
    case "toggle":
      return awdetb(n);
    case "slider":
      return vriblr(n);
    case "bqcejg":
      return isbpmr(n);
    case "dropdown":
      return srqefx(n);
    case "label":
      return svvksr(n);
    case "header":
      return nojvsf(n);
    case "divider":
      return oohwba(n);
    case "spacer":
      return emllur(n);
    case "vgppkf":
      throw new Error();
    default:
      return tcqydu(e.youvrf);
  }
}
function qpssjc(e) {
  return {
    ...stgvhc(e),
    youvrf: "button",
    text: text(e, "text"),
    ubztis: mttmdf(e.elements, e.active),
  };
}
function awdetb(e) {
  return {
    ...stgvhc(e),
    youvrf: "toggle",
    label: text(e, "label"),
    description: text(e, "description"),
    state: wtyfot({
      elements: e.elements,
      owjqgp: "state",
      active: e.active,
      rlnmdd: !1,
    }),
  };
}
function isbpmr(e) {
  return {
    ...stgvhc(e),
    youvrf: "bqcejg",
    label: text(e, "label"),
    state: wtyfot({
      elements: e.elements,
      owjqgp: "state",
      active: e.active,
      rlnmdd: "",
    }),
  };
}
function vriblr(e) {
  return {
    ...stgvhc(e),
    youvrf: "slider",
    label: text(e, "label"),
    description: text(e, "description"),
    state: wtyfot({
      elements: e.elements,
      owjqgp: "state",
      active: e.active,
      rlnmdd: 0,
    }),
    fvigql: ufiwve(e.elements, "fvigql", e.active),
    uzmrlq: ufiwve(e.elements, "uzmrlq", e.active),
  };
}
function srqefx(e) {
  return {
    ...stgvhc(e),
    youvrf: "dropdown",
    label: text(e, "label"),
    description: text(e, "description"),
    state: wtyfot({
      elements: e.elements,
      owjqgp: "state",
      active: e.active,
      rlnmdd: 0,
    }),
    items: ogvupm(e.elements),
  };
}
function svvksr(e) {
  return { ...nukals(e), youvrf: "label", text: text(e, "text") };
}
function nojvsf(e) {
  return { ...nukals(e), youvrf: "header", text: text(e, "text") };
}
function oohwba(e) {
  return { ...nukals(e), youvrf: "divider" };
}
function emllur(e) {
  return { ...nukals(e), youvrf: "spacer" };
}
function nukals(e) {
  return { xntrxh: e.xntrxh, obemwk: e.obemwk, visible: e.visible };
}
function stgvhc(e) {
  return { ...nukals(e), enabled: e.enabled };
}
function text(e, n) {
  return zadsnr(e.elements, n, e.active);
}
function ogvupm(e) {
  const n = e[0];
  return void 0 !== n && "dropdown" === n.flat.jnakrl.youvrf
    ? n.flat.jnakrl.items
    : [];
}
function nxywzc(e, n, t, i) {
  const o = new Map(),
    r = uzfoey(e, o, t, i),
    a = [],
    l = eulwli();
  for (const e of r) pmukvg(e, n, l, a);
  return { form: { kseoqx: a }, fsvjua: o };
}
function uzfoey(e, n, t, i) {
  const o = new Map(),
    r = [],
    a = eulwli();
  for (const [l, s] of e) {
    const e = a();
    n.set(l, e);
    const v = t.qdtzln(),
      u = {
        aydnbi: e,
        flat: aiarjk({
          wjwvvc: s.hgupjc(yomaei(v, i)).elements,
          gbhydl: v,
          player: i,
        }),
      };
    let y = o.get(s.obemwk);
    (void 0 === y && ((y = []), o.set(s.obemwk, y), r.push(s.obemwk)),
      y.push(u));
  }
  const l = [];
  for (const e of r) l.push({ obemwk: e, rusdye: o.get(e) ?? [] });
  return l;
}
function pmukvg(e, n, t, i) {
  for (const o of nadast(e.rusdye)) {
    const r = o[0];
    void 0 !== r &&
      i.push(
        hrsprb({
          xntrxh: t(),
          obemwk: e.obemwk,
          youvrf: r.flat.jnakrl.youvrf,
          elements: o,
          active: n,
        }),
      );
  }
}
function apxzwk(e, n) {
  return e.jnakrl.youvrf === n.jnakrl.youvrf && e.vtyymz === n.vtyymz;
}
function nadast(e) {
  let n = [];
  for (const t of e) n = atygvm(n, t);
  const t = [];
  for (const e of n) t.push(e.elements);
  return t;
}
function atygvm(e, n) {
  const t = n.flat,
    i = thxxni(e, t),
    o = [];
  let r = 0,
    a = 0;
  for (const [l, s] of i) {
    for (; r < l; ) (o.push(gqhrdn(e[r])), (r += 1));
    for (; a < s; ) (o.push(kzoktt(n.aydnbi, t[a])), (a += 1));
    (o.push(qdpqnp(e[l], n.aydnbi, t[s])), (r = l + 1), (a = s + 1));
  }
  for (; r < e.length; ) (o.push(gqhrdn(e[r])), (r += 1));
  for (; a < t.length; ) (o.push(kzoktt(n.aydnbi, t[a])), (a += 1));
  return o;
}
function gqhrdn(e) {
  if (void 0 === e) throw new Error();
  return e;
}
function kzoktt(e, n) {
  if (void 0 === n) throw new Error();
  return { elements: [{ aydnbi: e, flat: n }], pqiome: n };
}
function qdpqnp(e, n, t) {
  if (void 0 === e || void 0 === t) throw new Error();
  return {
    elements: [...e.elements, { aydnbi: n, flat: t }],
    pqiome: e.pqiome,
  };
}
function thxxni(e, n) {
  return bmdojl(e, n, vrgyfa(e, n));
}
function yvhgzb(e, n, t, i) {
  const o = e[t],
    r = n[i];
  return void 0 !== o && void 0 !== r && apxzwk(o.pqiome, r);
}
function crizgk(e, n) {
  const t = [];
  for (let i = 0; i <= e; i++) {
    const e = [];
    for (let t = 0; t <= n; t++) e.push(0);
    t.push(e);
  }
  return t;
}
function vrgyfa(e, n) {
  const t = e.length,
    i = n.length,
    o = crizgk(t, i);
  for (let r = t - 1; r >= 0; r--)
    for (let t = i - 1; t >= 0; t--)
      yvhgzb(e, n, r, t)
        ? (o[r][t] = o[r + 1][t + 1] + 1)
        : (o[r][t] = Math.max(o[r + 1][t], o[r][t + 1]));
  return o;
}
function bmdojl(e, n, t) {
  const i = [];
  let o = 0,
    r = 0;
  for (; o < e.length && r < n.length; )
    yvhgzb(e, n, o, r)
      ? (i.push([o, r]), (o += 1), (r += 1))
      : t[o + 1][r] >= t[o][r + 1]
        ? (o += 1)
        : (r += 1);
  return i;
}
function eulwli() {
  let e = 0;
  return () => {
    const n = e;
    return ((e += 1), n);
  };
}
function Button(e) {
  return { youvrf: "button", ...e };
}
function Toggle(e) {
  return { youvrf: "toggle", ...e };
}
function Slider(e) {
  return { youvrf: "slider", ...e };
}
function bqcejg(e) {
  return { youvrf: "bqcejg", ...e };
}
function Dropdown(e) {
  return { youvrf: "dropdown", ...e };
}
function Label(e) {
  return { youvrf: "label", ...e };
}
function Header(e) {
  return { youvrf: "header", ...e };
}
function Divider(e = {}) {
  return { youvrf: "divider", ...e };
}
function Spacer(e = {}) {
  return { youvrf: "spacer", ...e };
}
function Group(e) {
  return { youvrf: "vgppkf", ...e };
}
function Prefab(e, ...n) {
  return e(n[0]);
}
var Elements = {
  Button: Button,
  Toggle: Toggle,
  Slider: Slider,
  bqcejg: bqcejg,
  Dropdown: Dropdown,
  Label: Label,
  Header: Header,
  Divider: Divider,
  Spacer: Spacer,
  Group: Group,
  Prefab: Prefab,
};
function gwcgmu(e) {
  return e;
}
function amwmrz(e) {
  return e;
}
function tvazjl() {
  return (e) =>
    amwmrz(
      "ihmiio" === e
        ? { youvrf: "ihmiio" }
        : "close" === e
          ? { youvrf: "close" }
          : { youvrf: "sooehg", ilntmu: e },
    );
}
var qstrod = 0;
function xjarmq() {
  const e = qstrod;
  return ((qstrod += 1), e);
}
function uktlch(e) {
  const n = xjarmq();
  return Object.assign(
    (t) => ({
      youvrf: "ilntmu",
      obemwk: n,
      hgupjc: (n) => ({
        elements: e({ erfwzq: t, fbuvpe: n, elements: Elements }),
      }),
    }),
    { id: n },
  );
}
function Page(e) {
  return {
    youvrf: "ilntmu",
    obemwk: xjarmq(),
    hgupjc: (n) => ({ elements: e({ fbuvpe: n, elements: Elements }) }),
  };
}
function eeqdto(e, n) {
  for (const t of n) kdxaow(e, t);
}
function kdxaow(e, n) {
  switch (n.youvrf) {
    case "button":
      return mcwvae(e, n);
    case "toggle":
      return aymupa(e, n);
    case "slider":
      return ztxwkv(e, n);
    case "bqcejg":
      return cpwavd(e, n);
    case "dropdown":
      return vukxbh(e, n);
    case "label":
      return void e.form.label(bind(n.text, e.gbhydl), {
        visible: otqwqu(e, n.visible),
      });
    case "header":
      return void e.form.header(bind(n.text, e.gbhydl), {
        visible: otqwqu(e, n.visible),
      });
    case "divider":
      return void e.form.divider({ visible: otqwqu(e, n.visible) });
    case "spacer":
      return void e.form.spacer({ visible: otqwqu(e, n.visible) });
    default:
      return tcqydu(n);
  }
}
function otqwqu(e, n) {
  return bind(n, e.gbhydl);
}
function mcwvae({ form: e, gbhydl: n, bhnotn: t }, i) {
  e.button(
    bind(i.text, n),
    () => i.ubztis(t.bmxzqs()),
    lgxkvx({
      visible: bind(i.visible, n),
      disabled: cfhzyf(i.enabled, n),
      tooltip: vrforz(i.tooltip, n),
    }),
  );
}
function aymupa({ form: e, gbhydl: n }, t) {
  e.toggle(bind(t.label, n), kdtsrb(t.state, n), {
    visible: bind(t.visible, n),
    disabled: cfhzyf(t.enabled, n),
    description: bind(t.description, n),
  });
}
function ztxwkv({ form: e, gbhydl: n }, t) {
  e.slider(
    bind(t.label, n),
    qsyoxo(t.state, n),
    bind(t.fvigql, n),
    bind(t.uzmrlq, n),
    lgxkvx({
      visible: bind(t.visible, n),
      disabled: cfhzyf(t.enabled, n),
      description: bind(t.description, n),
      valueStep: t.step,
    }),
  );
}
function cpwavd({ form: e, gbhydl: n }, t) {
  e.textField(
    bind(t.label, n),
    kyxqoo(t.state, n),
    lgxkvx({
      visible: bind(t.visible, n),
      disabled: cfhzyf(t.enabled, n),
      defaultValue: vrforz(t.welnqg, n),
      description: vrforz(t.description, n),
    }),
  );
}
function vukxbh({ form: e, gbhydl: n }, t) {
  e.dropdown(
    bind(t.label, n),
    qsyoxo(t.state, n),
    t.items.map((e) => {
      const t = vrforz(e.description, n);
      return {
        label: bind(e.label, n),
        value: e.value,
        ...(void 0 === t ? {} : { description: t }),
      };
    }),
    lgxkvx({
      visible: bind(t.visible, n),
      disabled: cfhzyf(t.enabled, n),
      description: vrforz(t.description, n),
    }),
  );
}
var Scope = class e {
  acwgba;
  tgpozg = [];
  kigntv = [];
  xgrdbg = !1;
  constructor(e) {
    ((this.acwgba = e), e?.kigntv.push(this));
  }
  qdtzln() {
    return new e(this);
  }
  eeupyd(e) {
    this.xgrdbg ? e() : this.tgpozg.push(e);
  }
  get lkpjqk() {
    return this.xgrdbg;
  }
  close() {
    if (!this.xgrdbg) {
      this.xgrdbg = !0;
      for (const e of [...this.kigntv]) e.close();
      this.kigntv.length = 0;
      for (const e of [...this.tgpozg].reverse()) whqyqp(e);
      ((this.tgpozg.length = 0), this.acwgba?.remove(this));
    }
  }
  remove(e) {
    const n = this.kigntv.indexOf(e);
    n >= 0 && this.kigntv.splice(n, 1);
  }
};
function whqyqp(e) {
  try {
    e();
  } catch {}
}
function bmnrxz(e) {
  const n = new Map();
  for (const [t, i] of Object.entries(e)) n.set(t, i.obemwk);
  return n;
}
var xrohzc = class {
    owner;
    knpxrl;
    bnypnz;
    xaalmq = !0;
    dnodtl = !1;
    reason;
    mhyhuc = new Set();
    yloaiw;
    woxqji;
    xgrdbg = new Promise((e) => {
      this.yloaiw = e;
    });
    wkaoep = new Promise((e) => {
      this.woxqji = e;
    });
    constructor(e, n, t) {
      ((this.owner = e), (this.knpxrl = n), (this.bnypnz = t));
    }
    start() {
      this.knpxrl
        .show()
        .then((e) => this.bhdnho(e))
        .catch(() => this.bhdnho(DataDrivenScreenClosedReason.ServerClosed));
    }
    get urhsqk() {
      return this.xaalmq;
    }
    get closeReason() {
      return this.reason;
    }
    jzmhha(e) {
      this.xaalmq || void 0 === this.reason
        ? this.mhyhuc.add(e)
        : e(this.reason);
    }
    close() {
      if (this.xaalmq && !this.dnodtl) {
        this.dnodtl = !0;
        try {
          this.knpxrl.close();
        } catch {}
      }
    }
    yanyjr(e) {
      return (this.close(), this.owner.xixzgk(e));
    }
    bhdnho(e) {
      if (this.xaalmq) {
        ((this.xaalmq = !1),
          (this.reason = e),
          this.woxqji(e !== DataDrivenScreenClosedReason.UserBusy),
          this.bnypnz.close(),
          this.owner.gfwsww(this),
          this.yloaiw(e));
        for (const n of this.mhyhuc) n(e);
        this.mhyhuc.clear();
      }
    }
  },
  keabnn = class {
    player;
    uixafw;
    active;
    bhsmyu;
    awwsul = vcoenw(-1);
    bxsdgm;
    gbhydl = new Scope();
    dvxrpb = [];
    rgjjql = !1;
    constructor(e, n) {
      ((this.player = e),
        (this.uixafw = n),
        (this.bxsdgm = nxywzc(
          new Map(Object.entries(n.pages)),
          this.awwsul,
          this.gbhydl,
          e,
        )));
    }
    get urhsqk() {
      return this.active?.urhsqk ?? !1;
    }
    show(...e) {
      if (this.rgjjql) throw new Error();
      const n = this.obipzp(e[0]);
      return (
        this.active?.close(),
        (this.bhsmyu = n),
        (this.dvxrpb.length = 0),
        this.awwsul.set(this.chwqhr(n.zyewvy)),
        (this.active = this.lwwios(n)),
        this.active
      );
    }
    obipzp(e) {
      if (void 0 !== e) return e;
      const n = this.uixafw.lrxfyp;
      if (void 0 === n) throw new Error();
      return { zyewvy: n };
    }
    xixzgk(e) {
      const n = e ?? this.bhsmyu;
      if (void 0 === n) throw new Error();
      return this.show(n);
    }
    lwwios(e) {
      const n = new Scope();
      let t;
      const i = {
          bmxzqs: () => {
            const e = this.qeekla(t);
            return { player: this.player, nanuwd: e };
          },
        },
        o = this.wpkupj(e, n, i);
      return ((t = new xrohzc(this, o, n)), t.start(), t);
    }
    gyxzja() {
      this.rgjjql ||
        ((this.rgjjql = !0),
        this.active?.close(),
        (this.active = void 0),
        this.gbhydl.close());
    }
    kjsebg(e) {
      (this.dvxrpb.push(this.awwsul.value), this.awwsul.set(this.yqtzyd(e)));
    }
    hlllkt() {
      const e = this.dvxrpb.pop();
      void 0 === e ? this.active?.close() : this.awwsul.set(e);
    }
    yqtzyd(e) {
      const n = this.bxsdgm.fsvjua.get(e);
      if (void 0 === n) throw new Error();
      return n;
    }
    wpkupj(e, n, t) {
      const i = this.uixafw.title ?? "",
        o = new CustomForm(this.player, bind(i, n));
      return (
        this.uixafw.closeButton && o.closeButton(),
        eeqdto({ form: o, gbhydl: n, bhnotn: t }, this.bxsdgm.form.kseoqx),
        o
      );
    }
    chwqhr(e) {
      return this.yqtzyd(e);
    }
    qeekla(e) {
      return {
        anohai: (n) => this.hwltis(gwcgmu(n), e),
        ihmiio: () => this.hlllkt(),
        close: () => e.close(),
      };
    }
    hwltis(e, n) {
      switch (e.youvrf) {
        case "sooehg":
          return void this.kjsebg(e.ilntmu);
        case "ihmiio":
          return void this.hlllkt();
        case "close":
          return void n.close();
      }
    }
    gfwsww(e) {
      this.active === e && (this.active = void 0);
    }
  };
function dzcckw(e) {
  const n = tvazjl(),
    t = e.pages,
    i = {};
  for (const e of Object.keys(t)) i[e] = okgyji(t[e], n);
  const o = {
    pages: i,
    title: e.title,
    closeButton: e.closeButton,
    lrxfyp: e.lrxfyp,
  };
  return {
    uixafw: o,
    lmkqhf: bmnrxz(o.pages),
    lrxfyp: e.lrxfyp,
    xmbbkf: (e) => new keabnn(e, o),
  };
}
function okgyji(e, n) {
  const t = (e) => ({ link: n, elements: Elements, fbuvpe: e }),
    i = e(t(riikza()));
  return fgspgz(i)
    ? {
        youvrf: "ilntmu",
        obemwk: i.obemwk,
        hgupjc(n) {
          const i = e(t(n));
          return fgspgz(i) ? i.hgupjc(n) : { elements: i };
        },
      }
    : {
        youvrf: "ilntmu",
        obemwk: xjarmq(),
        hgupjc(n) {
          const i = e(t(n));
          return fgspgz(i) ? i.hgupjc(n) : { elements: i };
        },
      };
}
function fgspgz(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    !Array.isArray(e) &&
    "ilntmu" === e.youvrf
  );
}
function riikza() {
  return {
    ...yomaei(new Scope(), void 0),
    get player() {
      throw new Error();
    },
  };
}
function xsyvpf(e) {
  return (n) => ({
    youvrf: "prefab",
    hgupjc: (t) => ({
      elements: e({ erfwzq: n, fbuvpe: t, elements: Elements }),
    }),
  });
}
var Matches = class {
  results;
  constructor(e) {
    this.results = e;
  }
  at(e) {
    return this.results[e];
  }
  has(e) {
    return void 0 !== this.at(e);
  }
};
function ywvbtk(e) {
  const n = e.qhenit.toLowerCase();
  if ("" === n) return new Matches([]);
  for (const t of e.hxfxiz) if (t.toLowerCase() === n) return new Matches([]);
  const t = [];
  for (const i of e.hxfxiz) {
    if (t.length >= e.limit) break;
    i.toLowerCase().includes(n) && t.push(i);
  }
  return new Matches(t);
}
var qjdgqt = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
  const t = e.sqwbmx ?? 5,
    i = n.state(""),
    o = [bqcejg({ label: e.label ?? "", state: i, welnqg: e.welnqg })];
  for (let r = 0; r < t; r++)
    o.push(cavafy({ erfwzq: e, fbuvpe: n, text: i, slot: r, sqwbmx: t }));
  return o;
});
function cavafy(e) {
  const { erfwzq: n, fbuvpe: t, text: i, slot: o, sqwbmx: r } = e,
    a = (e) => ywvbtk({ hxfxiz: n.hxfxiz, qhenit: e, limit: r });
  return Button({
    text: t.map(i, (e) => a(e).at(o) ?? ""),
    mbcmcy: t.map(i, (e) => a(e).has(o)),
    ubztis: () => {
      const e = a(i.value).at(o);
      void 0 !== e && i.set(e);
    },
  });
}
var pompog = xsyvpf(({ erfwzq: e, elements: n }) => {
  const t = [];
  return (
    !0 === e.dcvebb && t.push(n.Spacer()),
    t.push(
      n.Button({
        text: e.wolwnh ?? "< Voltar",
        ubztis: ({ nanuwd: e }) => {
          e.ihmiio();
        },
      }),
    ),
    t
  );
});
import { system as hideka } from "@minecraft/server";
var xzgtku = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
    const t = n.state(""),
      i = n.map(t, (e) => "" !== e),
      o = e.kzfokn ?? 40;
    let r;
    const a = (e) => {
      (void 0 !== r && hideka.clearRun(r),
        t.set(e),
        (r = hideka.runTimeout(() => {
          (t.set(""), (r = void 0));
        }, o)));
    };
    return (
      n.eeupyd(() => {
        void 0 !== r && hideka.clearRun(r);
      }),
      [
        Button({ text: e.label, ubztis: (n) => e.ubztis(n, a) }),
        Label({ text: t, mbcmcy: i }),
      ]
    );
  }),
  Section = xsyvpf(({ erfwzq: e }) => [
    Group({
      kigntv: [
        ...(void 0 !== e.title ? [Header({ text: e.title })] : []),
        ...e.kigntv,
      ],
      mbcmcy: e.mbcmcy,
      xzqgua: e.xzqgua,
    }),
  ]),
  qomsip = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
    const t = n.state(e.kimggv ?? !1);
    return [
      Button({ text: e.label, ubztis: () => t.set(!t.value) }),
      Section({ kigntv: e.content, mbcmcy: t }),
    ];
  }),
  miwwib = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
    if (void 0 !== e.vcoenw && void 0 === e.options[e.vcoenw.value])
      throw new Error();
    const t = e.vcoenw ?? n.state(e.asemkl ?? 0),
      i = e.format ?? cdbovv;
    return [
      Button({
        text: kkiftm(e, t, i, n),
        ubztis: () => t.set((t.value + 1) % e.options.length),
      }),
    ];
  });
function cdbovv(e, n) {
  return "string" == typeof e && "string" == typeof n
    ? `${e}: ${n}`
    : { rawtext: [avsxct(e), { text: ": " }, avsxct(n)] };
}
function avsxct(e) {
  return "string" == typeof e ? { text: e } : e;
}
function kkiftm(e, n, t, i) {
  const o = (n, i) => t(n, e.options[i] ?? "?", i);
  if (envyok(e.label)) {
    const t = e.label;
    return i.qnumyw([n, t], (e, n) => o(n, e));
  }
  const r = e.label;
  return i.map(n, (e) => o(r, e));
}
var bioebj = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
  const t = Object.keys(e.entries),
    i = [];
  for (let e = 0; e < t.length; e++) i.push({ label: t[e] ?? "", value: e });
  const o = n.state(0),
    r = n.map(o, (n) => {
      const i = t[n] ?? "";
      return e.entries[i] ?? "";
    });
  return [
    Dropdown({ label: e.label, state: o, items: i }),
    Spacer(),
    Label({ text: r }),
  ];
});
function tpjhjj(e, n, t) {
  if ("" === n || void 0 === t) return e;
  const i = n.toLowerCase(),
    o = [];
  for (const n of e) mkknjq(t(n), i) && o.push(n);
  return o;
}
function mkknjq(e, n) {
  for (const t of e) if (t.toLowerCase().includes(n)) return !0;
  return !1;
}
var List = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
  if (e.ixobse <= 0) throw new Error();
  const t = n.state(0),
    i = n.state(0),
    o = { erfwzq: e, fbuvpe: n, kgkrqg: t, mmgkca: i };
  ypkoqg(o);
  const r = [];
  for (let n = 0; n < e.ixobse; n++) r.push(tzpihy(o, n));
  const a = cggdny({
    epfxmf: e.epfxmf ?? "buttons",
    kgkrqg: t,
    ixobse: e.ixobse,
    thmvge: () => gmiusf(o).length,
    fbuvpe: n,
  });
  return [...r, ...a];
});
function gmiusf(e) {
  const n = e.erfwzq.gkrjzu?.value ?? "";
  return tpjhjj(e.erfwzq.items, n, e.erfwzq.hcbkxw);
}
function ypkoqg(e) {
  const n = () => e.mmgkca.set(e.mmgkca.value + 1);
  (void 0 !== e.erfwzq.gkrjzu && e.fbuvpe.eeupyd(e.erfwzq.gkrjzu.subscribe(n)),
    e.fbuvpe.eeupyd(e.kgkrqg.subscribe(n)));
}
function tzpihy(e, n) {
  const t = () => gmiusf(e)[e.kgkrqg.value + n],
    i = (n, i) =>
      e.fbuvpe.qnumyw([e.mmgkca], () => {
        const e = t();
        return void 0 !== e ? n(e) : i;
      }),
    o = {
      hasItem: e.fbuvpe.qnumyw([e.mmgkca], () => void 0 !== t()),
      text: (e) => i(e, ""),
      number: (e) => i(e, 0),
      boolean: (e) => i(e, !1),
      toggle: (n = !1) => e.fbuvpe.state(n),
    };
  return Group({ kigntv: e.erfwzq.oouocn(o), mbcmcy: o.hasItem });
}
function cggdny(e) {
  const { epfxmf: n, kgkrqg: t, ixobse: i, thmvge: o, fbuvpe: r } = e;
  if ("none" === n) return [];
  const a = Button({
      text: "<",
      ubztis: () => t.set(Math.max(0, t.value - i)),
    }),
    l = Button({
      text: ">",
      ubztis: () => {
        t.value + i < o() && t.set(t.value + i);
      },
    });
  if ("bwakke" === n) return [a, l];
  return [
    a,
    Label({
      text: r.qnumyw(
        [t],
        (e) => `${Math.floor(e / i) + 1} / ${Math.max(1, Math.ceil(o() / i))}`,
      ),
    }),
    l,
  ];
}
var ljicrj = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
  const t = [],
    i = e.vcoenw ?? n.state(e.asemkl ?? 0);
  void 0 !== e.label && t.push(Label({ text: e.label }), Spacer());
  const o = e.format ?? lsvjro;
  for (const [r, a] of e.options.entries()) {
    const e = n.map(i, (e) => o(a, e === r));
    t.push(
      Button({
        text: e,
        xzqgua: n.map(i, (e) => e !== r),
        ubztis: () => i.set(r),
      }),
    );
  }
  return t;
});
function lsvjro(e, n) {
  return "string" == typeof e
    ? `${e} (${n ? "x" : " "})`
    : { rawtext: [ljrawg(e), { text: ` (${n ? "x" : " "})` }] };
}
function ljrawg(e) {
  return "string" == typeof e ? { text: e } : e;
}
var irplri = xsyvpf(({ erfwzq: e, fbuvpe: n }) => {
    const t = n.state(e.asemkl ?? -1),
      i = [];
    for (let o = 0; o < e.options.length; o++) {
      const r = e.options[o];
      void 0 !== r &&
        (i.push(Button({ text: r.label, ubztis: () => t.set(o) })),
        i.push(Section({ kigntv: r.content, mbcmcy: n.equals(t, o) })));
    }
    return i;
  }),
  ktxaaf = xsyvpf(({ erfwzq: e }) => [
    bqcejg({ label: e.label ?? "Search", state: e.state, welnqg: e.welnqg }),
  ]),
  paqpqd = {
    Section: Section,
    qomsip: qomsip,
    irplri: irplri,
    ktxaaf: ktxaaf,
    miwwib: miwwib,
    bioebj: bioebj,
    qjdgqt: qjdgqt,
    xzgtku: xzgtku,
    pompog: pompog,
    ljicrj: ljicrj,
    List: List,
  },
  ujeqwi = {
    dzcckw: dzcckw,
    uktlch: uktlch,
    xsyvpf: xsyvpf,
    Page: Page,
    vcoenw: vcoenw,
    paqpqd: paqpqd,
  },
  zmbtbz = ujeqwi,
  whbmbl = zmbtbz.xsyvpf(({ erfwzq: e, elements: n }) => {
    const t = [];
    return (
      !0 === e.dcvebb && t.push(n.Spacer()),
      t.push(
        n.Button({
          text: e.wolwnh ?? "< Voltar",
          key: "ihmiio",
          ubztis: ({ nanuwd: n }) => {
            (e.lhaetn?.(), e.dhclhg.set(e.hinisi ?? ""), n.ihmiio());
          },
        }),
      ),
      t
    );
  }),
  hekmzk = zmbtbz.uktlch(({ erfwzq: e, elements: n }) => {
    const t = [n.Spacer(), n.Label({ text: e.ulqert })];
    if (void 0 !== e.buttons) {
      const i = Object.entries(e.buttons);
      i.length > 0 && t.push(n.Spacer());
      for (const [o, r] of i)
        t.push(
          n.Button({
            text: o,
            ubztis(n) {
              (e.dhclhg.set(r.hinisi), n.nanuwd.anohai(r.link));
            },
            key: "yumfep",
          }),
        );
    }
    return (
      !0 === e.backButton &&
        t.push(whbmbl({ dcvebb: !0, dhclhg: e.dhclhg, hinisi: e.iqsqhl })),
      t
    );
  });
import { world as huhksr } from "@minecraft/server";
var qewlgv = "odwtex",
  rcsibj = "minecraft:ageable_grow_up",
  jwknpt = "minecraft:become_",
  wjbbri = "zudroo",
  ywxlbd = "minecraft:villager_v2",
  ekzjlc = "oreville_vn:villager",
  tjhgtr = "oreville_vn:nxdfme",
  ewbfec = "oreville_vn:ilvfra",
  oaoiua = "oreville_vn:poztxf",
  pcatwt = "oreville_vn:txczvv",
  vsyhqs = "oreville_vn:vwpagn",
  eyrstu = "oreville_vn:xcrjxf",
  guofpb = "oreville_vn:ghibss",
  dzunsh = "oreville_vn:mlkxjo",
  zlmxaz = "oreville_vn:qzhdgf",
  phcqdp = "oreville_vn:cryhjc",
  gltvpj = "oreville_vn:ufernq",
  lewaxd = "oreville_vn:dsojot",
  jqdgik = "oreville_vn:odplew",
  zohdqe = "p:gcfsvg",
  idapay = "p:mlxeez",
  pwcnkd = "p:mreyue",
  skxkqh = "p:fsjsbp",
  jzukba = "p:enczhb",
  llkgvb = "p:nhncnz",
  fuephb = "p:zsuvyv",
  ghwspn = new Set([ewbfec, oaoiua, vsyhqs, eyrstu, pcatwt, guofpb, dzunsh]),
  jtxdec = new Set([ywxlbd, oaoiua, vsyhqs, eyrstu, pcatwt, guofpb]),
  avfldr = new Set([ekzjlc, ...ghwspn.values()]),
  ymddqn = new Set([ywxlbd, ...ghwspn.values()]),
  tmybxp = new Set([ywxlbd, ekzjlc, ...ghwspn.values()]),
  wqqonq = new Map(),
  cvicsx = new Map(),
  enudti = new Map(),
  zsfryw = new Map(),
  ubjbjh = "minecraft:rideable",
  gbklqe = "oreville_vn:fnrpgk",
  rmgxyn = "oreville_vn:xatmpi",
  kyswjj = "oreville_vn:iwycsm",
  iqntbn = "oreville_vn:lxrfvu",
  efzlol = "oreville_vn:xmjcpe",
  gptljh = "oreville_vn:rseydz",
  CHATTINESS = ["vdaxfl", "hmnopd", "default", "xjijcd"],
  RARELINES = ["never", "default", "qtqzue"],
  ttefyy = zmbtbz.vcoenw(0),
  lfwxay = zmbtbz.vcoenw(0),
  jilsfi = zmbtbz.vcoenw(!0),
  uwruge = { vdaxfl: 0, hmnopd: 0.5, default: 1, xjijcd: 5 },
  dwagdn = {
    never: Dialog.variantWeightStrategies.bbtmas(0.8),
    default: Dialog.variantWeightStrategies.nnkgpv,
    qtqzue: Dialog.variantWeightStrategies.pygpdq,
  };
function mswdcd(e) {
  return CHATTINESS[e ?? ttefyy.value] ?? "default";
}
function yebgjg(e) {
  const n = CHATTINESS.indexOf(e);
  (ttefyy.set(n), huhksr.setDynamicProperty(gbklqe, n));
}
function ldspfr(e) {
  return RARELINES[e ?? lfwxay.value] ?? "default";
}
function jpjqbg(e) {
  const n = RARELINES.indexOf(e);
  (lfwxay.set(n), huhksr.setDynamicProperty(rmgxyn, n));
}
function qwbdxy(e) {
  (jilsfi.set(e), huhksr.setDynamicProperty(kyswjj, e));
}
(ttefyy.subscribe((e) => {
  const n = mswdcd(e),
    t = uwruge[n] ?? 1;
  (Dialog.lnajhu.bvptra(t),
    "hmnopd" === n
      ? Dialog.ifdzpj.set({ global: { iqirsz: 3 } })
      : Dialog.ifdzpj.set({ global: { iqirsz: 0 } }),
    huhksr.setDynamicProperty(gbklqe, e));
}),
  lfwxay.subscribe((e) => {
    const n = ldspfr(e),
      t = dwagdn[n] ?? Dialog.variantWeightStrategies.nnkgpv;
    (Dialog.lnajhu.ldmixu(t), huhksr.setDynamicProperty(rmgxyn, e));
  }),
  jilsfi.subscribe((e) => {
    huhksr.setDynamicProperty(kyswjj, e);
  }),
  nhnfur(() => {
    let e = "default";
    const n = huhksr.getDynamicProperty(gbklqe);
    (void 0 !== n && "number" == typeof n && (e = CHATTINESS[n] ?? "default"),
      yebgjg(e));
    let t = "default";
    const i = huhksr.getDynamicProperty(rmgxyn);
    (void 0 !== i && "number" == typeof i && (t = RARELINES[i] ?? "default"),
      jpjqbg(t));
    let o = !0,
      r = huhksr.getDynamicProperty(kyswjj);
    (void 0 !== r && "boolean" == typeof r && (o = r), qwbdxy(o));
  }));
var hphofr = ["invung", "ewtqqj", "flat"],
  lzdtop = new Map();
function ncyovl(e) {
  return lzdtop.get(e) ?? mawvoc(e);
}
function mawvoc(e) {
  let n = !1;
  const t = e.getDynamicProperty(iqntbn);
  void 0 !== t && "boolean" == typeof t && (n = t);
  const i = zmbtbz.vcoenw(n);
  i.subscribe((n) => {
    void 0 !== e && e.isValid && e.setDynamicProperty(iqntbn, n);
  });
  let o = "invung";
  const r = e.getDynamicProperty(efzlol);
  void 0 !== r && "number" == typeof r && (o = hphofr[r] ?? "invung");
  const a = zmbtbz.vcoenw(hphofr.indexOf(o));
  a.subscribe((n) => {
    void 0 !== e &&
      e.isValid &&
      (e.setDynamicProperty(efzlol, n), cyikfe(e, hphofr[n] ?? "invung"));
  });
  let l = !1;
  const s = e.getDynamicProperty(gptljh);
  void 0 !== s && "boolean" == typeof s && (l = s);
  const v = zmbtbz.vcoenw(l);
  v.subscribe((n) => {
    void 0 !== e &&
      e.isValid &&
      (e.setDynamicProperty(gptljh, n), kdvbzf(e, n));
  });
  const u = { qmmonl: i, fdvnpj: a, xnywpw: v };
  return (lzdtop.set(e, u), u);
}
huhksr.beforeEvents.playerLeave.subscribe(({ player: e }) => {
  lzdtop.delete(e);
});
var qjoptp = new Set([
    ekzjlc,
    pcatwt,
    ewbfec,
    oaoiua,
    vsyhqs,
    eyrstu,
    guofpb,
    dzunsh,
  ]),
  BABY_VILLAGERS = new Set([ekzjlc, ewbfec]);
function ihrhtm(e, n, t) {
  if (!qjoptp.has(n.typeId)) return;
  const i = hphofr.indexOf(t) ?? 0;
  if (void 0 !== n && n.isValid && void 0 !== e && e.isValid)
    try {
      e.setPropertyOverrideForEntity(n, "p:pmpece", i);
    } catch {}
}
function cyikfe(e, n) {
  const t = e.dimension.getEntities({
      families: ["brlgoc"],
      excludeTypes: [ekzjlc],
    }),
    i = cvicsx.keys();
  for (const o of [...i, ...t]) ihrhtm(e, o, n);
}
function vyzzln(e, n, t) {}
function kdvbzf(e, n) {
  const t = e.dimension.getEntities({
      families: ["brlgoc"],
      excludeTypes: [ekzjlc],
    }),
    i = cvicsx.keys();
  for (const o of [...i, ...t]) vyzzln(e, o, n);
}
var sqyxux = zmbtbz.uktlch(({ elements: e, fbuvpe: n, erfwzq: t }) => {
    const i = ncyovl(n.player);
    return [
      e.Spacer(),
      e.Toggle({
        label: "Mostrar Legendas",
        description: "Se as legendas devem aparecer quando os Aldeões falam.",
        state: i.qmmonl,
      }),
      e.Dropdown({
        label: "Tagarelice dos Aldeões",
        description: "Com que frequência os Aldeões falam.",
        state: ttefyy,
        items: [
          { value: 0, label: "Silenciado" },
          { value: 1, label: "Tímido" },
          { value: 2, label: "Falante (Padrão)" },
          { value: 3, label: "Super Falante" },
        ],
      }),
      e.Dropdown({
        label: "Voz Rara dos Aldeões",
        description:
          "Com que frequência os aldeões dizem linhas mais longas e incomuns.",
        state: lfwxay,
        items: [
          { value: 0, label: "Nunca" },
          { value: 1, label: "Padrão" },
          { value: 2, label: "Frequentemente" },
        ],
      }),
      e.Toggle({
        label: "Invocar Aldeões Especiais",
        description:
          "Se os personagens do Jornal Aldeão podem nascer naturalmente.",
        state: jilsfi,
      }),
      e.Dropdown({
        label: "Estilo dos Aldeões",
        description: "Altera a aparência dos Aldeões.",
        state: i.fdvnpj,
        items: [
          { value: 0, label: "Vanilla" },
          { value: 1, label: "Actions & Stuff" },
          { value: 2, label: "Actions & Stuff: Flat" },
        ],
      }),
      whbmbl({ dcvebb: !0, dhclhg: t.dhclhg, hinisi: t.iqsqhl }),
    ];
  }),
  zskpep = zmbtbz.uktlch(({ erfwzq: e, elements: n }) => {
    e.backButton ??= !0;
    const t = [n.Spacer()];
    void 0 !== e.kvksvp && t.push(n.Label({ text: e.kvksvp }), n.Divider());
    for (const i of e.entries) {
      const e = `${i.yokknz ?? "§i"}${i.body}`;
      t.push(
        n.Header({ text: i.header }),
        n.Spacer(),
        n.Label({ text: e }),
        n.Divider(),
      );
    }
    return (
      !0 === e.backButton &&
        t.push(whbmbl({ dcvebb: !0, dhclhg: e.dhclhg, hinisi: e.iqsqhl })),
      t
    );
  }),
  vrxiom = 8;
function twbwaq(e) {
  return "" !== e.trim();
}
function bxsqir(e, n) {
  for (const t of e.split(/\s+/)) if (t.startsWith(n)) return !0;
  return !1;
}
function yqxyhb(e, n) {
  const t = e.label.toLowerCase();
  if (t.includes(n)) return bxsqir(t, n) ? 1 : 2;
  const i = e.section.toLowerCase();
  return i.includes(n) ? (bxsqir(i, n) ? 3 : 4) : 0;
}
function lgmumo(e, n, t) {
  const i = n.trim().toLowerCase();
  if ("" === i) return [];
  const o = [];
  return (
    e.forEach((e, n) => {
      const t = yqxyhb(e, i);
      t > 0 && o.push({ tjnmxk: e, fnlpvc: t, order: n });
    }),
    o.sort((e, n) => e.fnlpvc - n.fnlpvc || e.order - n.order),
    o.slice(0, t).map((e) => e.tjnmxk)
  );
}
var cxhmyl = zmbtbz.xsyvpf(({ erfwzq: e, fbuvpe: n, elements: t }) => {
    const i = e.sqwbmx ?? vrxiom,
      o = e.qhenit,
      r = e.nacwmj ?? "§cGatilho não encontrado.",
      a = (n) => lgmumo(e.hxfxiz, n, i),
      l = n.map(o, twbwaq),
      s = n.map(o, (e) => twbwaq(e) && 0 === a(e).length),
      v = [
        t.bqcejg({ label: e.label ?? "Pesquisar Gatilhos", state: o }),
        t.Spacer({ mbcmcy: s }),
        t.Label({ text: r, mbcmcy: s }),
      ];
    for (let r = 0; r < i; r++) {
      const i = n.map(o, (e) => a(e)[r]?.label ?? ""),
        l = n.map(o, (e) => void 0 !== a(e)[r]);
      v.push(
        t.Button({
          text: i,
          mbcmcy: l,
          key: `vwkmel${r}`,
          ubztis(n) {
            const t = a(o.value)[r];
            void 0 !== t &&
              (o.set(""), e.dhclhg.set(t.hinisi), n.nanuwd.anohai(t.link));
          },
        }),
      );
    }
    return (
      v.push(
        t.Divider({ mbcmcy: l }),
        t.Button({
          text: "Limpar Pesquisa",
          mbcmcy: l,
          key: "ylrjud",
          ubztis() {
            o.set("");
          },
        }),
      ),
      v
    );
  }),
  wmxlyp = "orevillestudios.com/villager-news",
  uhmfzy = "Jornal Aldeão",
  fsfrpf = "xrcvxx",
  glrecb = "qzbxij",
  xofwvt = "birpba",
  ddjhwh = "ynokwd",
  qaewxq = "nlheqm",
  srriea =
    "§eÚltimas Notícias!\n\n§7Os Aldeões agora estão julgando cada movimento seu com mais de 2.000 reações com voz.",
  xhyuay = `Explore O Jornal Aldeão, conheça personagens especiais e descubra reações ocultas.`,
  lloshc = `Navegue pelos gatilhos e reações por categoria.\n\n§eGuia Online\n§7${wmxlyp}`,
  abrlxg = "Escolha uma seção abaixo para navegar por seus gatilhos.",
  ulshpd =
    "Escolha um gatilho abaixo para ver como ativá-lo e qual reação ele causa.",
  vhbeyx = [
    {
      header: "Gatilhos e Reações",
      body: "§7Gatilhos são ações, eventos ou situações que os Aldeões podem perceber. Reações são os diálogos e animações aos quais eles podem responder.",
    },
    {
      header: "Próximo e Visível",
      body: "§7A maioria das reações exige que um Aldeão esteja próximo ou consiga ver o que está acontecendo. Diferentes gatilhos podem ter diferentes requisitos de detecção.",
    },
    {
      header: "Tempo de Recarga",
      body: "§7As reações usam tempos de recarga para manter os diálogos naturais. Repetir as mesmas ações ou ações semelhantes pode não ativar outra reação imediatamente.",
    },
    {
      header: "Sem Reação?",
      body: "§7Nem todo gatilho fará um Aldeão reagir todas as vezes. O tempo de recarga, distância, visibilidade, contexto e Tagarelice podem afetar se uma reação será reproduzida.",
    },
    {
      header: "O Contexto Importa",
      body: "§7Algumas reações dependem de condições adicionais, como a profissão e idade do Aldeão, o ambiente, sua reputação ou o que está acontecendo nas proximidades.",
    },
    {
      header: "Variações de Reação",
      body: "§7Muitos gatilhos possuem várias reações possíveis, então os Aldeões nem sempre responderão à mesma situação exatamente da mesma maneira.",
    },
    {
      header: "Tagarelice",
      body: "§7A Tagarelice dos Aldeões controla a frequência com que eles falam. Configurações mais baixas tornam as reações menos frequentes, enquanto configurações mais altas fazem os Aldeões falarem mais.",
    },
    {
      header: "Falas Raras",
      body: "§7Algumas reações incluem Falas Raras mais longas e incomuns. A frequência delas pode ser ajustada separadamente usando Falas Raras de Aldeões nas Configurações.",
    },
  ],
  mqptgt = [
    {
      header: "Dia de Semana",
      body: "§eGatilho\n\n§7Jogue de segunda a sexta-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de segunda a sexta-feira baseados no calendário do mundo real.",
    },
    {
      header: "Vagando em um Dia de Semana",
      body: "§eGatilho\n\n§7Deixe um Aldeão vagar durante segunda a sexta-feira no mundo real.\n\n§eReação\n\n§7Conversas extras durante as andanças nas segundas a sextas-feiras do mundo real.",
    },
    {
      header: "Fim de Semana",
      body: "§eGatilho\n\n§7Jogue no sábado ou domingo no mundo real.\n\n§eReação\n\n§7Comentários específicos de fim de semana baseados no calendário do mundo real.",
    },
  ],
  cphxgl = [
    {
      header: "Diálogo Reativo",
      body: "§7Os Aldeões reagem a criaturas próximas, blocos, ações dos jogadores, trocas, danos e muito mais. Tente fazer coisas perto deles e escute uma resposta.",
    },
    {
      header: "Animações",
      body: "§7Os Aldeões são totalmente animados com movimentos personalizados, animações expressivas para as falas e sincronização labial que dá vida aos diálogos.",
    },
    {
      header: "Estilos de Aldeão",
      body: "§7Escolha entre Vanilla, Actions&Stuff e Actions&Stuff:Flat  nas Configurações para combinar com a aparência do seu mundo.",
    },
    {
      header: "Conversas",
      body: "§7Os Aldeões não apenas reagem a você. Eles também podem interagir uns com os outros, com conversas e trocas únicas entre Aldeões.",
    },
    {
      header: "Categorias de Reação",
      body: "§7As reações abrangem ações dos jogadores, criaturas, construção, trocas, vida dos Aldeões, danos, eventos do mundo, conversas e muito mais. Navegue pelo Guia para descobrir todos eles.",
    },
    {
      header: "Reputação do Jogador",
      body: "§7Os Aldeões se lembram de como você os trata. Negociar e curar Aldeões melhora sua reputação, enquanto machucá-los ou matá-los a reduz. Os Aldeões até fofocam sobre você entre si, mudando a forma como reagem a você.",
    },
    {
      header: "Aldeões Especiais",
      body: "§7Um de cada personagem especial do Jornal Aldeão surge no seu mundo. Explore diferentes Vilas para encontrá-los e negocie para obter seus itens exclusivos.",
    },
    {
      header: "Comerciantes Ambulantes",
      body: "§7Os Comerciantes Ambulantes têm seus próprios diálogos para trocas, estoque esgotado, negociações bem-sucedidas e muito mais.",
    },
    {
      header: "Aldeões Bebês",
      body: "§7Os Aldeões Bebês possuem suas próprias reações e animações.",
    },
    {
      header: "Falas Raras",
      body: "§7As Falas Raras são reações mais longas, incomuns e exageradas. Use a configuração Falas Raras de Aldeões para desativá-las ou torná-las mais comuns.",
    },
    {
      header: "Tagarelice",
      body: "§7Use a Tagarelice dos Aldeões nas Configurações para controlar com que frequência os Aldeões falam, desde completamente silenciosos até extremamente tagarelas.",
    },
    {
      header: "Legendas",
      body: "§7Ative Mostrar Legendas nas Configurações se quiser que as falas sejam exibidas na tela.",
    },
  ],
  gucqpi = [
    {
      header: "Aldeão #5",
      body: "§7O apresentador inconfundivelmente bigodudo do Jornal Aldeão, trazendo as histórias mais importantes do dia com total confiança.\n\n§eTroca: §fBigode",
    },
    {
      header: "Aldeão #9",
      body: "§7O repórter de campo do Jornal Aldeão, corajosamente fazendo reportagens ao vivo de onde quer que a história o leve.\n\n§eTroca: §fMicrofone",
    },
    {
      header: "O Prefeito",
      body: "§7Um membro respeitável da comunidade, desde que você não olhe muito de perto para sua administração.\n\n§eTroca: §fChapéu de Prefeito",
    },
    {
      header: "Homem Testificate",
      body: "§7Na na na na... (parando antes para evitar violação de direitos autorais) ...Homem Testificate!\n\n§eTroca: §fCapacete Testificate",
    },
    {
      header: "Aldeão Intocável",
      body: "§7Você pode vê-lo. Você pode segui-lo. Mas não pode tocá-lo.",
    },
    {
      header: "Wooly",
      body: '§7Uma Ovelha de poucas palavras. Principalmente "Baaah."',
    },
  ],
  vxivvu = [
    {
      header: "Narizes de Aldeão",
      body: "§eObter: §7Use uma tesoura em qualquer Aldeão\n\n§eUsar: §7Vista-o ou interaja com o Aldeão para colocá-lo de volta",
    },
    {
      header: "Chapéu de Prefeito",
      body: "§eObter: §7Negocie com O Prefeito\n\n§eUsar: §7Use você mesmo ou dê a um Aldeão um pouco de autoridade instantânea",
    },
    {
      header: "Capacete Testificate",
      body: "§eObter: §7Negocie com o Homem Testificate\n\n§eUsar: §7Use você mesmo ou transforme outro Aldeão em um herói",
    },
    {
      header: "Bigode",
      body: "§eObter: §7Negocie com o Aldeão #5\n\n§eUsar: §7Use você mesmo ou dê a outro Aldeão a aparência adequada de apresentador de notícias",
    },
    {
      header: "Microfone",
      body: "§eObter: §7Negocie com o Aldeão #9\n\n§eUsar: §7Segure você mesmo ou dê a um Aldeão as ferramentas para fazer uma reportagem ao vivo",
    },
    {
      header: "Placas",
      body: "§eDar: §7Interaja com um Aldeão enquanto segura uma Placa\n\n§eAlterar: §7Use um machado para alternar entre as mensagens",
    },
  ],
  oshzpy = [
{
      header: "T3CL4D0",
      body: "§eWhatsapp\n§7SobrevivenT3s\n\n§eX\n§7x.com/T3teclado\n\n§eYouTube\n§7youtube.com/@t3cl4d0",
    },
    {
      header: "Oreville Studios",
      body: "§eWebsite\n§7orevillestudios.com\n\n§eDiscord\n§7orevillestudios.com/discord\n\n§eX\n§7x.com/OrevilleStudios\n\n§eYouTube\n§7youtube.com/OrevilleStudios",
    },
    {
      header: "Element Animation",
      body: "§eWebsite\n§7elementanimation.com\n\n§eDiscord\n§7elementanimation.com/discord\n\n§eX\n§7x.com/Element\n\n§eYouTube\n§7youtube.com/ElementAnimation",
    },
  ],
  juuyxy = {
    guahxn: "jwkmmk",
    cqapzu: "mysyyb",
    xwplil: "gncape",
    qlcnxv: "ztqyzw",
    baby_villagers: "zywahr",
    qafldp: "iqqsdi",
    iuhcfa: "kxzcru",
    caxgqd: "uffgvt",
    fruxap: "gsyder",
    tvzvms: "mzubfd",
    uiemjr: "hnjglc",
    tdyddq: "ctbedw",
  },
  hbkffr = {
    uqowsu: "syddfj",
    akcirp: "fmmwfh",
    qfqrxu: "rvwcgc",
    ykbnjz: "cncpfq",
    eijwgk: "ebputm",
    mjstvm: "dyzrue",
    lfyjnk: "sxcjlw",
    rkhktm: "snekoy",
    ksfwad: "wdfshv",
    calzfj: "wixwgh",
    nurtuf: "ruorol",
    ysaann: "mlrdle",
    fdzeay: "picfsx",
    kofiuc: "fdurvf",
    nzcigz: "mwmobw",
    ulpsru: "mntsar",
    rginym: "pshrzg",
    llrygn: "tutviv",
    ejpqed: "hxgflj",
    nttjzb: "wbqtnp",
    vinmma: "jobsep",
    cclcew: "tjrcsi",
    tucpej: "kibxgf",
    cdgeyw: "exyyah",
    cnqpja: "cagcyt",
    bmctvi: "litbop",
    euaovt: "hknwez",
    ubuint: "dvbbyn",
    taykmn: "utjeiz",
    buzjmt: "akvybj",
    gqkbmm: "yrtbti",
    qyrdkp: "jbside",
    tpjqab: "beglxx",
    vpjubi: "ubsicq",
    gjxuxo: "xjielm",
    ldpjjt: "bxfxht",
    nejtzv: "mbiwhn",
    yenahn: "usqfbv",
    zqvgyv: "yzufuy",
    hyqmhi: "qnngyt",
    wvavrh: "yltnpm",
    pdqcgq: "kkiswe",
    ysxshu: "eeicbd",
    tdrrse: "bvdruy",
    pppugx: "yxypfw",
    zgronf: "mkzchy",
    zyfqgm: "yasqas",
    lgyjgs: "fldbnl",
    ckecgt: "fexqvd",
    cubhuo: "lymlaz",
    qllzox: "whrsem",
    mkeewg: "ibxcwo",
    hpmjjv: "xxikmp",
    qiqjcm: "whnimq",
    yoerqx: "nfndkx",
    glftid: "cidopc",
    bksfzp: "rdvfey",
    kvrkge: "tmluqf",
    yqqvyb: "sglsun",
    sdujnf: "tnsnxq",
    ipnprs: "odewxa",
    mjmrtm: "cplyrv",
  },
  uxyuyr = {
    xfpjxq: "eywgoa",
    cavwps: "ahlqxa",
    zsmvzb: "pxwoyu",
    cstyvg: "dehrdn",
    edrtbe: "lpxwgs",
    dfdkli: "kjuaul",
    qxgbwi: "aizkko",
    ajexrq: "xqixbl",
    pizztd: "uoxaxj",
    akerwb: "pgyqst",
    tdomqw: "sdcrhu",
    gytgzn: "tlhrwc",
    vgysma: "xojify",
    qfhrlh: "fxiddm",
    elexev: "nguqzg",
    pfelrr: "zlncsk",
    ijeqws: "xvzuth",
    lqxmlx: "aikkwp",
    hiuxvo: "iypzbt",
    mewsnd: "locwts",
    nwkgqg: "xmrxxe",
    xgfebs: "mqtbuq",
    smcrvj: "jgketq",
    psgzod: "ypollb",
    pdiwlk: "vniafw",
    khepip: "ocrrvy",
    ezoztr: "gjutfx",
    agbxhr: "vfvcuo",
    puhgbq: "ourflf",
    iifcei: "hxgcsh",
    nxxita: "miadip",
    gigkln: "hcnzjg",
    raozeh: "yokrio",
    pswvuu: "ohogjx",
    qfygop: "pzlmly",
    ekdktf: "qbwccl",
    xxkdpo: "morlwl",
    iqtydx: "fmbldk",
    fqbjfv: "tlxsoe",
    tfzlsw: "zgbvge",
    zstdjn: "lxdwru",
    stuirs: "kbgdjw",
    omgcte: "gaotht",
    kcbenk: "rscbfv",
    jlendb: "ogqxux",
    gnetsk: "bpwnto",
    fhhqxg: "kxtnlw",
    ohtblt: "ocwzji",
    ibcrvx: "ypqjje",
    xuyypm: "mnrggz",
    arzojk: "udpfrw",
    hzjycq: "fvbveg",
    dxcjqn: "izougp",
    elcjbb: "ajpbps",
    bipqej: "qlzhbl",
    hevyeb: "htvlcc",
    zejman: "uobjwp",
    awappv: "htpznb",
    ejvpis: "fjhhqp",
    clzrea: "wbbehv",
    qimink: "yeiyao",
    osbwpz: "ngsdoi",
    mabmbl: "ibeels",
    rptjbd: "pgtttn",
    pclmft: "pmgkxf",
    knywuy: "acrmly",
    ujkoue: "cccwtv",
    kdfaao: "aasuts",
    ktkmhn: "rphfuu",
    jtsycy: "sjodzj",
    nxveql: "evnryo",
    fpcepp: "debrib",
    nziize: "dbvgfr",
    dgrgul: "xvvfqm",
    ckniqq: "crxrtm",
    fazcvg: "shsyqc",
    mxmrpn: "uvhvdf",
    xezbvo: "ghxvhc",
    vubtsn: "njncif",
    fvdzot: "ncxsjl",
    sbolpm: "vtjvaq",
    fwiopr: "qblddu",
    zqzrsm: "xghpvh",
    gxepwi: "eplcec",
    cudgjr: "dnvqbq",
    oimgrg: "ltgdxr",
    gnbpco: "ccdkmm",
    vgufsp: "fzovhb",
    vxhugl: "aklnyx",
    clpxov: "vsrern",
    afdrdd: "psttvx",
    lnhdzn: "aojiol",
    gjsote: "gbmypu",
    ydfscf: "zsnrth",
    ahabbf: "poruvv",
    veaotb: "ntcrou",
    gzzzpj: "srrcaz",
    whbvvh: "avpopy",
    ehtaer: "sxztpe",
    tqnwzp: "iallxh",
    negvfb: "akmaic",
    rseoxb: "gxvvcx",
    kodgox: "znhnrj",
    qyvelv: "gzzrru",
    nocwsk: "mommql",
    ejbqqc: "wvkifl",
    rtmqmc: "semzce",
    piupkf: "tomzhj",
    fdqdok: "mtcrvt",
    yckvyp: "onklfs",
    pgwqkg: "vlpetg",
    gzhbtb: "zjcgcv",
    xwcoip: "hadzei",
    crvciv: "zwzxmf",
    myylcq: "ufwcyb",
    tgggsl: "btpdcq",
    ididel: "mviepv",
    knjvae: "sptjpu",
    bpgyfa: "rkorgz",
    rykqwl: "lvkuro",
    mfsmim: "kgrhki",
    xzpfwa: "rmiphb",
    gtqcjn: "jikwve",
    dyvwqv: "iwqjes",
    iqvgzk: "davdrk",
    hojlbk: "yuhode",
    ykycil: "wlsevb",
    lifrrj: "pubdqg",
    mjmgwj: "szqrfs",
    lnlwnl: "ruiciv",
    thmfsh: "ouodrw",
    jexbze: "vhsixb",
    wykqdb: "ugskle",
    pvwkxp: "wdphnq",
    ktzfvk: "qzidzv",
    yiwncn: "kxcwjt",
    kljgyu: "kyagvq",
    xemdbt: "calusv",
    hqmkpb: "empobh",
    qbuuop: "ojrfsf",
    bimuve: "abisxc",
    cdltxm: "zlicva",
    hlxzen: "lfvwfp",
    nwiopk: "zywqpb",
    jggged: "hfwljv",
    adtdit: "ovtfxr",
    wsjvjd: "erehvv",
    wwmhos: "yeckfv",
    edjqet: "syefrr",
    ntnicx: "hvesoo",
    oqjzko: "thbvvu",
    tavxec: "adbyme",
    xbttae: "gaxwor",
    nrzcxn: "zpyfem",
    uvgkny: "gmaszd",
    lfwbvu: "txuikb",
    repalq: "icizyu",
    oziqss: "cdkbjz",
    dortcb: "ywysck",
    xtooxu: "zwifoa",
    wboncy: "gjpkeg",
    gcoysc: "nbsaxv",
    atwycp: "dicjeb",
    lqzdqk: "ddxnia",
    bxbibd: "gvhqxe",
    nsosix: "bzearw",
    gtmfpl: "izijvw",
    rzvitn: "monaof",
    odwhzm: "jehkar",
    lwcrnt: "kvknbc",
    yeqxvm: "ogoseo",
    nwzvkb: "ckvjwz",
    dxeaal: "soxhmp",
    nwlcij: "acdgcf",
    jicosq: "hvxott",
    satsrf: "gzvykb",
    xxjkmo: "nvjkdf",
    lvzfcv: "dsowvm",
    jqdeef: "zujnaz",
    vxycol: "pvpvor",
    afxbav: "ofyvbj",
    hggexx: "qdwjqw",
    ynxhfb: "eecrik",
    vvntcf: "btutkc",
    aqxgxh: "cadqmt",
    rbkjsr: "ofqlxi",
    bmimxe: "ghtwuh",
    yazvzs: "rudkjk",
    ysbfqu: "wnlwtv",
    spfefr: "cnyuyy",
    pguaqp: "dnnskx",
    trkugw: "qgiwjy",
    aqtshb: "wbrwxf",
    neoxpu: "ilpdpi",
    swewsr: "wtvhjo",
    toolzx: "gjmdax",
    vapupl: "ntxojc",
    turlrl: "ksbueu",
    ozmthf: "htzyid",
    tqishj: "styyxu",
    hzahog: "rydlhe",
    htibul: "aiickj",
    eccdga: "vxrqgc",
    pjcwec: "zgximm",
    knjdbi: "jjwooe",
    hyzwpr: "fvxbnw",
    sxikgq: "acmtgu",
    ualabt: "ovdzdr",
    gggzar: "klstjc",
    qqtnlm: "iyqkjx",
    zvwapr: "fwzfhm",
    nstwos: "ccyihx",
    qltnkz: "zmnnuw",
    hwltxk: "jksdxg",
    vakwgb: "byndof",
    cuchwi: "khrmtr",
    qffeco: "xvzalq",
    kxjegd: "sahinp",
    ktdshy: "itilin",
    rnlher: "pspbfa",
    lxvofx: "dylzjm",
    dmcjmd: "znojer",
    gjtuqd: "sgemeg",
    lvigit: "pvjeni",
    gbxzxv: "xceixu",
    uookqp: "vleydn",
    zndzjx: "hbgdpp",
    qawras: "etnojf",
    sdhkke: "bnpthv",
    umdvtb: "gqnmwh",
    tgggoh: "iqlueh",
    fezzjw: "vuvouk",
    opxfuo: "somybl",
    fzjope: "hghxmj",
    djpksc: "iomgvm",
    ueczyh: "qzpwgs",
    wuoloh: "ygclue",
    hkowex: "wadgaj",
    ljewqf: "jskrly",
    yldlzt: "esvtol",
    ivktls: "kmacqo",
    ccpvqj: "ruohgd",
    aobqjt: "seglna",
    tdvtmn: "axqdtm",
    ywzhwz: "atmyvb",
    fltegg: "mqepri",
    pnvkfy: "dpmncr",
    wkfbuv: "mvaavr",
    uqguqj: "lapzgg",
    ioxtmt: "qdjnbr",
    asqzby: "kaencq",
    ctptjt: "ayalkr",
    viwaal: "hpeckh",
    dxmmiu: "tmsotn",
    vkhrme: "ksjqyn",
    ujyxfg: "tkwpio",
    zywcju: "vynnwj",
    zjwpzi: "movrqd",
    habfnx: "aqgndw",
    ebyrtk: "sduvkx",
    rlfjux: "wdjjop",
    bbjsik: "naoasc",
    nqktml: "chtsdz",
    ytydjc: "guligp",
    locuih: "pvvjrq",
    cvltyw: "rupajb",
    fbuabj: "kesktm",
    pbmrxx: "peecpb",
    kzemrz: "ibmijn",
    spfsrr: "wjxfil",
    qmpcxi: "zhzalg",
    armupg: "fdddcd",
    vskjkl: "ikgwgv",
    ivumgm: "uqxhlf",
    lgjtnf: "xypywb",
    smvnbj: "powsfc",
    rfnirh: "iyxnip",
    vhwksn: "acvjwd",
    vbclem: "wpkovh",
    ecslqo: "glyayz",
    wsxfok: "msnhby",
    ggitzq: "crafpr",
    abfwiv: "kolbib",
    durjjd: "ktjlsr",
    wkwcrf: "pumwsk",
    msemoe: "pncilo",
    wtuguc: "qskulx",
    aezdiy: "wdbhrs",
    jfuftm: "jriskv",
    fzyrfm: "shmswh",
    ahcvzd: "jzeyfm",
    rlkdqd: "rhjmor",
    riezum: "mmiaiz",
    cxeziv: "ddcjqj",
    svdjdk: "qmpkik",
    hbalps: "ocymho",
    hcdvqm: "mwdzpi",
    gotjxf: "dguxwa",
    qrdzmt: "fepzud",
    saxuwk: "odwyxn",
    gzsztp: "jbsrwi",
    cmrqhw: "tyxxzr",
    zeykfp: "ddxykx",
    mqnapy: "fpacqw",
    nxalcz: "imuuqo",
    vevdkl: "dvgsko",
    lpuocy: "juxfzf",
    slbqfwswxeva: "twmcdn",
    rueszy: "kketrs",
    yjctyw: "hskdvl",
    huhcbd: "xzmjti",
    hmadgp: "vxiaoq",
    gesjov: "vufdua",
    qqyjjg: "edcjif",
    hpnsfu: "sswvue",
    mytmrk: "firzzf",
    qhpyaw: "aqszqp",
    swomdw: "jihjbr",
    nkcoqb: "wqlxlz",
    rtikom: "sruvje",
    uveohs: "kdmgux",
    caykki: "lqhqre",
    hfmwvf: "ykdmvn",
    cifbit: "tomnfj",
    etkxko: "rcnymw",
    elryje: "cpriwe",
    igebly: "ajfxct",
    rogpvp: "hsuxvw",
    nsxmkr: "xjwzgt",
    yzqpvi: "hmncqc",
    vnaodx: "vrnuvd",
    fcbygh: "hkgkqe",
    dlrxes: "bgebrk",
    gacgtq: "hofbtx",
    onindz: "djrmmx",
    xemyaj: "gypeig",
    yebifs: "efdxbu",
    ydigbg: "nyghdg",
    wancdi: "mqbvkj",
    pmaqgq: "rvvcio",
    bodvsv: "iwbeug",
    fxbysi: "qflzsh",
    wyvzhk: "uaeuco",
    uzdxum: "vtdxda",
    wbbxpo: "qpdxut",
    hivgme: "owqnai",
    pkvhpv: "lslgob",
    pmqrpb: "clauyk",
    xmkwxd: "sfnzaa",
    czvvwy: "levzhc",
    lilimm: "esdgln",
    laztau: "kloxtc",
    nlbhku: "wcclkh",
    nukxsf: "bxwjpx",
    lhdgsy: "vyxbxk",
    klabhl: "tnthcv",
    zalmof: "cgaatc",
    clbjww: "tbwbvb",
    qmdvft: "cdnmve",
    xduuwm: "ucvjtj",
    kuhvdv: "mgslvv",
    vlrsrn: "cydnuv",
    hxlyuc: "apctnl",
    stqafd: "ojifec",
    yubpbb: "fhhhtn",
    bvrbhy: "hfmzvq",
    uzdvsi: "yqyygc",
    erbcfn: "bqtwoz",
    kxoqky: "tsbyhr",
    vggdrt: "apaxqw",
    jkeahu: "gljfyh",
    myajyt: "lwgiux",
    dbzjqi: "lnwpks",
    jktrnd: "edsrur",
    dcvgnm: "iyjfgy",
    kxrhxt: "qsxdbn",
    akfekx: "lddret",
    kejscw: "hzfwoh",
    orogba: "zttbwz",
    wurmgu: "lxsikk",
    ozxzla: "yiddyx",
    inirxg: "cuqcto",
    ckjbyd: "qwebrc",
    anrhns: "weifaj",
    vqlrqf: "pmflxd",
    ocerok: "dlmcge",
    ybwgyt: "jlzjmj",
    tjkgmv: "usyegn",
    zvbnea: "hchqij",
    zqfvby: "dtjbxr",
    igyvcw: "ibxyjg",
    ifppja: "kqzhce",
    zkoewx: "kjtoru",
    kopthx: "hfwudx",
    qknpqr: "xjsgrt",
    sotbtt: "esfzaq",
    jqgkhy: "zdlnpv",
    mgmzeh: "odhpgc",
    ohdwnz: "ulzuwo",
    uqwdqn: "jfipmb",
    scbmka: "yecdox",
    ikrwzy: "qfmehi",
    felign: "cbvvip",
    tftmbe: "xbfobn",
    rweawq: "gasqmf",
    zpcnhu: "dnodqx",
    ehjhvi: "pdlrno",
    ycynep: "qoapot",
    zpjrtq: "iaeaxa",
    wwcbib: "yptjhi",
    uhbigm: "dmwram",
    bvtmmz: "yrzgqg",
    iubjul: "tzmxrx",
    mgiaiw: "dsgudq",
    qarzxp: "zrznap",
    jpucos: "jppbkg",
    gkvlqc: "mbljkh",
    lgeeem: "rbwjjn",
    dkpihl: "ddshai",
    qiqiez: "evhijz",
    gwakiz: "xupkxm",
    caiyte: "oyhlfi",
    zglkgp: "sllgiy",
    cxtvsx: "yiypfl",
    ypyumu: "pcqyxo",
    lfhnxz: "mgrayl",
    ildosa: "rtpbnf",
    zckxrc: "mlpwpg",
    uzvatl: "xcetix",
    ckngck: "lxoawz",
    bkyidl: "jalvqj",
    uyqiwv: "rshlel",
    xljknt: "tlaloc",
    fabiyx: "xugxsx",
    obitls: "jqnbjj",
    iriuqa: "tvenjr",
    qfcwvz: "bkalew",
    mltyge: "tjcmrb",
    adhxce: "ytyefv",
    tkkegl: "pkchhl",
    zoqxvy: "pfbycl",
    rclyrl: "pxaclw",
    ebfifz: "ilreqt",
    wrjbdd: "fljkip",
    trphsn: "swwywp",
    gmrypkswxeva: "gtydyh",
    bygaxwswxeva: "gmewwz",
    loicswswxeva: "fqtqvj",
    wrswgiswxeva: "bbfptm",
    dpwhhs: "vkmlky",
    xxehbq: "sqcpma",
    njyapy: "fgdvbt",
    bgzmea: "zfmfuc",
    shrrya: "iuuajz",
    cmkesu: "maokpy",
    ssbhiv: "vhlwkc",
    ltdnvy: "kjrldb",
    xccwah: "hhefye",
    legnsy: "rolnox",
    sclaoa: "kqzszs",
    nfdery: "hyxpsm",
    msofrj: "kveomo",
    mjyhgw: "ccbbcw",
    behifz: "ibntxl",
    kzogzi: "cwcnah",
    ezgbfw: "ghvshs",
    snnkrl: "eeickm",
    hvjfnk: "veajom",
    adhvqz: "xydsau",
    wrbvvp: "osadkt",
    asuufu: "piplnx",
    nmwmrz: "nxkyfu",
    luoibc: "boedaq",
    mpbnsm: "ttftvk",
    ctzfzj: "htndev",
    rdugrl: "kmyotp",
    xcjort: "qslauo",
    rooiup: "damntn",
    pbbywc: "pknzon",
    fzoqwd: "atkfwv",
    uvtocs: "mfnbct",
    vmohcm: "erizum",
    fskcce: "zxueya",
    jqaekk: "hwvfvy",
    eyiraw: "vwqome",
    ncyeaw: "cbgiyz",
    eltxge: "fibkja",
    lyatyf: "ijcfus",
    kmvqxe: "rxwhmd",
    sifqsj: "vcbqgf",
    zvamyb: "ixkyyq",
  },
  lkryzq = {
    rqqnxr: "Atacado pelo Jogador",
    ijfhbo: "Fechar Janela de Troca",
    ntnerb: "Fechar Trocas Após Comprar",
    hswdvp: "Sair Sem Trocar",
    btpxnr: "Abrir Janela de Troca",
    nkigij: "Vê o Jogador",
    nopqsh: "Recebe Dano",
    ppzfyu: "Andarilho",
  },
  pyveoi = {
    [juuyxy.guahxn]: "Ações do Jogador",
    [juuyxy.cqapzu]: "Blocos & Construção",
    [juuyxy.xwplil]: "Mobs & Criaturas",
    [juuyxy.qlcnxv]: "Vida do Aldeão",
    [juuyxy.baby_villagers]: "Aldeões Bebês",
    [juuyxy.qafldp]: "Dano & Perigo",
    [juuyxy.iuhcfa]: "Troca",
    [juuyxy.caxgqd]: "Cosméticos & Narizes",
    [juuyxy.fruxap]: "Viagem & Veículos",
    [juuyxy.tvzvms]: "Mundo & Tempo",
    [juuyxy.uiemjr]: "Conversas",
    [juuyxy.tdyddq]: "Personagens Especiais",
  },
  eawipt = {
    [hbkffr.uqowsu]: "Presença e Comportamento",
    [hbkffr.akcirp]: "Ações Cotidianas",
    [hbkffr.qfqrxu]: "Movimento",
    [hbkffr.ykbnjz]: "Equipamentos e Armaduras",
    [hbkffr.eijwgk]: "Efeitos de Status",
    [hbkffr.mjstvm]: "Reputação e Status da Vila",
    [hbkffr.lfyjnk]: "Alterações no Jogo",
    [hbkffr.rkhktm]: "Morte e Sono",
    [hbkffr.ksfwad]: "Quebrando Blocos",
    [hbkffr.calzfj]: "Colocando Blocos",
    [hbkffr.nurtuf]: "Usando Blocos",
    [hbkffr.ysaann]: "Redstone e Técnico",
    [hbkffr.fdzeay]: "Fogo e Explosivos",
    [hbkffr.kofiuc]: "Hostis e Perigosos",
    [hbkffr.nzcigz]: "Animais",
    [hbkffr.ulpsru]: "Mobs Bebês",
    [hbkffr.rginym]: "Pânico e Geral, Amigáveis e Úteis",
    [hbkffr.llrygn]: "Incomuns e Especiais",
    [hbkffr.ejpqed]: "Vagando e Ociosidade",
    [hbkffr.nttjzb]: "Trabalho e Profissões",
    [hbkffr.vinmma]: "Casa e Sono",
    [hbkffr.cclcew]: "Comida e Itens",
    [hbkffr.tucpej]: "Família e Comunidade",
    [hbkffr.cdgeyw]: "Nomes, Invocação e Cura",
    [hbkffr.cnqpja]: "Vida e Movimento",
    [hbkffr.bmctvi]: "Interações com o Jogador",
    [hbkffr.euaovt]: "Cosméticos",
    [hbkffr.ubuint]: "Comida",
    [hbkffr.taykmn]: "Nomes",
    [hbkffr.buzjmt]: "Reações ao Mundo",
    [hbkffr.gqkbmm]: "Atacado pelo Jogador",
    [hbkffr.qyrdkp]: "Ataques de Mobs",
    [hbkffr.tpjqab]: "Dano Ambiental",
    [hbkffr.vpjubi]: "Poções e Projéteis",
    [hbkffr.gjxuxo]: "Perigos Ambientais",
    [hbkffr.ldpjjt]: "Pânico e Dano Geral",
    [hbkffr.nejtzv]: "Testemunhando o Perigo",
    [hbkffr.yenahn]: "Trocando",
    [hbkffr.zqvgyv]: "Recusas de Trocas",
    [hbkffr.hyqmhi]: "Vendedor Ambulante",
    [hbkffr.pdqcgq]: "Narizes dos Aldeões",
    [hbkffr.ysxshu]: "Cosméticos",
    [hbkffr.tdrrse]: "Placas",
    [hbkffr.pppugx]: "Barcos",
    [hbkffr.zgronf]: "Minecarts",
    [hbkffr.zyfqgm]: "Hora do Dia",
    [hbkffr.lgyjgs]: "Clima e Meio Ambiente",
    [hbkffr.ckecgt]: "Dimensões",
    [hbkffr.cubhuo]: "Locais",
    [hbkffr.qllzox]: "Dias do Mundo Real",
    [hbkffr.mkeewg]: "Datas Especiais e Temporadas",
    [hbkffr.hpmjjv]: "Encontros e Fofocas",
    [hbkffr.qiqjcm]: "Vagando Juntos",
    [hbkffr.yoerqx]: "Conversa na Fogueira",
    [hbkffr.glftid]: "O Prefeito",
    [hbkffr.bksfzp]: "Aldeão #5",
    [hbkffr.kvrkge]: "Aldeão #9",
    [hbkffr.yqqvyb]: "Homem Testificate",
    [hbkffr.sdujnf]: "Wooly",
    [hbkffr.ipnprs]: "Aldeão Intocável",
    [hbkffr.mjmrtm]: "Outras Reações do Aldeão",
  },
  nrbfth = {
    [uxyuyr.xfpjxq]: {
      title: "Aproximar-se de um Aldeão",

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que um Aldeão perceba você.\n\n§eReação\n\n§7Saudações gerais, perguntas e comentários quando você é percebido pela primeira vez.",
    },

    [uxyuyr.cavwps]: {
      title: "Encarar um Aldeão",

      body: "§eGatilho\n\n§7Olhe diretamente para um Aldeão por algum tempo.\n\n§eReação\n\n§7Perguntas e comentários constrangedores sobre você ficar encarando por tempo demais.",
    },

    [uxyuyr.zsmvzb]: {
      title: "Ficar Completamente Parado",

      body: "§eGatilho\n\n§7Fique completamente parado por algum tempo.\n\n§eReação\n\n§7Perguntas sobre você ter se transformado em uma estátua.",
    },

    [uxyuyr.cstyvg]: {
      title: "Ficar com Outros Jogadores",

      body: "§eGatilho\n\n§7Fique próximo de pelo menos outro jogador.\n\n§eReação\n\n§7Comentários surpresos sobre vários jogadores se reunindo.",
    },

    [uxyuyr.edrtbe]: {
      title: "Tosquiar uma Ovelha",

      body: "§eGatilho\n\n§7Tosquie uma Ovelha.\n\n§eReação\n\n§7Reações surpresas e desaprovadoras ao ver a Ovelha sendo tosquiada.",
    },

    [uxyuyr.dfdkli]: {
      title: "Soltar um Fogo de Artifício",

      body: "§eGatilho\n\n§7Solte um Fogo de Artifício.\n\n§eReação\n\n§7Reações animadas e impressionadas ao Fogo de Artifício.",
    },

    [uxyuyr.qxgbwi]: {
      title: "Ficar sobre a Cama de um Aldeão",

      body: "§eGatilho\n\n§7Fique sobre uma Cama desocupada que pertença a um Aldeão.\n\n§eReação\n\n§7Reclamações sobre você estar em cima da Cama deles.",
    },

    [uxyuyr.ajexrq]: {
      title: "Esbarrar em um Aldeão",

      body: "§eGatilho\n\n§7Ande contra um Aldeão para empurrá-lo levemente.\n\n§eReação\n\n§7Reclamações sobre ser empurrado ou ter seu espaço pessoal invadido.",
    },

    [uxyuyr.pizztd]: {
      title: "Pisar nas Plantações",

      body: "§eGatilho\n\n§7Pule sobre uma Terra Arada e transforme-a novamente em Terra.\n\n§eReação\n\n§7Reações irritadas ao ver você pisoteando as Plantações.",
    },

    [uxyuyr.akerwb]: {
      title: "Comer Comida",

      body: "§eGatilho\n\n§7Coma Comida.\n\n§eReação\n\n§7Perguntas e comentários sobre a Comida que você está comendo.",
    },

    [uxyuyr.tdomqw]: {
      title: "Colher Plantações",

      body: "§eGatilho\n\n§7Colha uma Plantação.\n\n§eReação\n\n§7Acusações de roubar ou pegar Plantações que não são suas.",
    },

    [uxyuyr.gytgzn]: {
      title: "Colher Plantações Perto de um Fazendeiro",

      bkltkm: "Colher Perto de um Fazendeiro",

      body: "§eGatilho\n\n§7Colha uma Plantação perto de um Aldeão Fazendeiro.\n\n§eReação\n\n§7Reclamações mais fortes dos Fazendeiros sobre você colher as Plantações deles.",
    },

    [uxyuyr.vgysma]: {
      title: "Abrir um Baú",

      body: "§eGatilho\n\n§7Abra um Baú.\n\n§eReação\n\n§7Comentários curiosos sobre o que você está procurando no Baú.",
    },

    [uxyuyr.qfhrlh]: {
      title: "Abrir um Baú na Casa de um Aldeão",

      bkltkm: "Abrir Baú na Casa Dele",

      body: "§eGatilho\n\n§7Abra o Baú dentro da casa de um Aldeão.\n\n§eReação\n\n§7Reações irritadas ao ver você abrindo o Baú deles.",
    },

    [uxyuyr.elexev]: {
      title: "Usar uma Rédea",

      body: "§eGatilho\n\n§7Prenda uma Rédea a uma entidade.\n\n§eReação\n\n§7Perguntas e comentários sobre você prender uma Rédea a outra entidade.",
    },

    [uxyuyr.pfelrr]: {
      title: "Fechar uma Porta na Cara de um Aldeão",

      bkltkm: "Fechar a Porta na Cara Dele",

      body: "§eGatilho\n\n§7Feche uma Porta diretamente na frente de um Aldeão enquanto ele tenta passar por ela.\n\n§eReação\n\n§7Reclamações sobre ter a Porta fechada na cara.",
    },

    [uxyuyr.ijeqws]: {
      title: "Andar Agachado",

      body: "§eGatilho\n\n§7Agache-se e ande por aí.\n\n§eReação\n\n§7Perguntas e comentários sobre você estar se esgueirando.",
    },

    [uxyuyr.lqxmlx]: {
      title: "Voar no Modo Criativo",

      body: "§eGatilho\n\n§7Voe no Modo Criativo.\n\n§eReação\n\n§7Reações confusas ao ver você voando no Modo Criativo.",
    },

    [uxyuyr.hiuxvo]: {
      title: "Planar com Elytra",

      body: "§eGatilho\n\n§7Plane com uma Elytra.\n\n§eReação\n\n§7Reações surpresas e curiosas ao seu voo com Elytra.",
    },

    [uxyuyr.mewsnd]: {
      title: "Teletransportar-se com uma Pérola do Ender",

      bkltkm: "Teletransportar-se com Pérola do Ender",

      body: "§eGatilho\n\n§7Teletransporte-se usando uma Pérola do Ender.\n\n§eReação\n\n§7Perguntas surpresas sobre seu teletransporte repentino.",
    },

    [uxyuyr.nwkgqg]: {
      title: "Segurar um Item Quase Quebrado",

      body: "§eGatilho\n\n§7Segure um Item muito danificado e com pouca durabilidade.\n\n§eReação\n\n§7Avisos e comentários sobre seu Item estar prestes a quebrar.",
    },

    [uxyuyr.xgfebs]: {
      title: "Usar Armadura",

      body: "§eGatilho\n\n§7Use uma Armadura.\n\n§eReação\n\n§7Comentários gerais sobre a Armadura que você está usando.",
    },

    [uxyuyr.smcrvj]: {
      title: "Usar Armadura Completa de Ferro",

      body: "§eGatilho\n\n§7Use um conjunto completo de Armadura de Ferro.\n\n§eReação\n\n§7Sugestões de que talvez esteja na hora de melhorar sua Armadura de Ferro.",
    },

    [uxyuyr.psgzod]: {
      title: "Usar Armadura Mista",

      body: "§eGatilho\n\n§7Use um conjunto de Armadura incompatível.\n\n§eReação\n\n§7Comentários julgando sua Armadura incompatível.",
    },

    [uxyuyr.pdiwlk]: {
      title: "Usar Armadura de Alto Nível",

      body: "§eGatilho\n\n§7Use uma Armadura de alto nível.\n\n§eReação\n\n§7Comentários impressionados sobre sua Armadura de alto nível.",
    },

    [uxyuyr.khepip]: {
      title: "Velocidade",

      body: "§eGatilho\n\n§7Tenha o efeito de Velocidade ativo.\n\n§eReação\n\n§7Comentários sobre o quão incomumente rápido você está se movendo.",
    },

    [uxyuyr.ezoztr]: {
      title: "Agilidade",

      body: "§eGatilho\n\n§7Tenha o efeito de Agilidade ativo.\n\n§eReação\n\n§7Comentários sobre seu aumento repentino de velocidade.",
    },

    [uxyuyr.agbxhr]: {
      title: "Lentidão",

      body: "§eGatilho\n\n§7Tenha o efeito de Lentidão ativo.\n\n§eReação\n\n§7Comentários provocativos sobre o quão devagar você está se movendo.",
    },

    [uxyuyr.puhgbq]: {
      title: "Força",

      body: "§eGatilho\n\n§7Tenha o efeito de Força ativo.\n\n§eReação\n\n§7Perguntas e comentários sobre sua Força aumentada.",
    },

    [uxyuyr.iifcei]: {
      title: "Fraqueza",

      body: "§eGatilho\n\n§7Tenha o efeito de Fraqueza ativo.\n\n§eReação\n\n§7Comentários provocativos e preocupados sobre o quão fraco você parece.",
    },

    [uxyuyr.nxxita]: {
      title: "Invisibilidade",

      body: "§eGatilho\n\n§7Tenha o efeito de Invisibilidade ativo.\n\n§eReação\n\n§7Reações confusas ao ver você invisível.",
    },

    [uxyuyr.gigkln]: {
      title: "Visão Noturna",

      body: "§eGatilho\n\n§7Tenha o efeito de Visão Noturna ativo.\n\n§eReação\n\n§7Perguntas e comentários sobre sua capacidade de enxergar no escuro.",
    },

    [uxyuyr.raozeh]: {
      title: "Escuridão",

      body: "§eGatilho\n\n§7Tenha o efeito de Escuridão ativo.\n\n§eReação\n\n§7Comentários sobre o efeito de Escuridão e sua visão limitada.",
    },

    [uxyuyr.pswvuu]: {
      title: "Fome",

      body: "§eGatilho\n\n§7Tenha o efeito de Fome ativo.\n\n§eReação\n\n§7Comentários preocupados sobre o quão faminto você parece.",
    },

    [uxyuyr.qfygop]: {
      title: "Náusea",

      body: "§eGatilho\n\n§7Tenha o efeito de Náusea ativo.\n\n§eReação\n\n§7Comentários preocupados sobre você parecer indisposto.",
    },

    [uxyuyr.ekdktf]: {
      title: "Respiração Aquática",

      body: "§eGatilho\n\n§7Tenha o efeito de Respiração Aquática ativo.\n\n§eReação\n\n§7Perguntas sobre como você consegue respirar debaixo d'água.",
    },

    [uxyuyr.xxkdpo]: {
      title: "Infestação",

      body: "§eGatilho\n\n§7Tenha o efeito de Infestação ativo.\n\n§eReação\n\n§7Comentários preocupados sobre o efeito de Infestação.",
    },

    [uxyuyr.iqtydx]: {
      title: "Vida Baixa",

      body: "§eGatilho\n\n§7Deixe sua Vida ficar baixa.\n\n§eReação\n\n§7Avisos e comentários preocupados sobre sua Vida baixa.",
    },

    [uxyuyr.fqbjfv]: {
      title: "Vários Efeitos de Status",

      body: "§eGatilho\n\n§7Tenha vários Efeitos de Status ativos ao mesmo tempo.\n\n§eReação\n\n§7Comentários sobre ter muitos Efeitos de Status ativos ao mesmo tempo.",
    },

    [uxyuyr.tfzlsw]: {
      title: "Reputação Baixa",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto tiver uma Reputação baixa naquela vila.\n\n§eReação\n\n§7Reações desconfiadas e hostis à sua má Reputação.",
    },

    [uxyuyr.zstdjn]: {
      title: "Reputação Extremamente Baixa",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto tiver uma Reputação extremamente baixa naquela vila.\n\n§eReação\n\n§7Reações assustadas e hostis à sua Reputação extremamente ruim.",
    },

    [uxyuyr.stuirs]: {
      title: "Reputação Extremamente Baixa com uma Espada",

      bkltkm: "Reputação Baixa com Espada",

      body: "§eGatilho\n\n§7Tenha uma Reputação extremamente baixa na vila e segure uma espada.\n\n§eReação\n\n§7Reações alarmadas a um jogador muito malvisto carregando uma Espada.",
    },

    [uxyuyr.omgcte]: {
      title: "Reputação Alta",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto tiver uma Reputação alta naquela vila.\n\n§eReação\n\n§7Reações amigáveis e de gratidão pela sua boa Reputação.",
    },

    [uxyuyr.kcbenk]: {
      title: "Reputação Extremamente Alta",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto tiver uma Reputação extremamente alta naquela vila.\n\n§eReação\n\n§7Reações animadas à sua Reputação excepcionalmente boa.",
    },

    [uxyuyr.jlendb]: {
      title: "Mau Presságio",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto estiver sob o efeito de Mau Presságio.\n\n§eReação\n\n§7Reações alarmadas e desaprovadoras ao efeito de Mau Presságio.",
    },

    [uxyuyr.gnetsk]: {
      title: "Herói da Vila",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão enquanto estiver sob o efeito de Herói da Vila.\n\n§eReação\n\n§7Elogios e reações comemorativas ao efeito de Herói da Vila.",
    },

    [uxyuyr.fhhqxg]: {
      title: "Alterar Modo de Jogo",

      body: "§eGatilho\n\n§7Altere seu Modo de Jogo.\n\n§eReação\n\n§7Comentários confusos quando seu Modo de Jogo muda.",
    },

    [uxyuyr.ohtblt]: {
      title: "Mudar para o Criativo",

      body: "§eGatilho\n\n§7Mude para o Modo Criativo.\n\n§eReação\n\n§7Comentários sobre suas novas habilidades do Modo Criativo, frequentemente acusando você de trapacear.",
    },

    [uxyuyr.ibcrvx]: {
      title: "Alterar a Dificuldade do Mundo",

      body: "§eGatilho\n\n§7Altere a Dificuldade do mundo.\n\n§eReação\n\n§7Reações confusas quando a Dificuldade do mundo muda.",
    },

    [uxyuyr.xuyypm]: {
      title: "Definir Dificuldade como Pacífico",

      bkltkm: "Definir Dificuldade Pacífica",

      body: "§eGatilho\n\n§7Altere a Dificuldade do mundo para Pacífico.\n\n§eReação\n\n§7Reações de alívio ou provocação ao mudar o mundo para Pacífico.",
    },

    [uxyuyr.arzojk]: {
      title: "Definir Dificuldade como Difícil",

      body: "§eGatilho\n\n§7Altere a Dificuldade do mundo para Difícil.\n\n§eReação\n\n§7Reações alarmadas ao mudar o mundo para Difícil.",
    },

    [uxyuyr.hzjycq]: {
      title: "Jogador Morre",

      body: "§eGatilho\n\n§7Morra onde um Aldeão possa testemunhar isso.\n\n§eReação\n\n§7Comentários e piadas sobre testemunhar sua morte.",
    },

    [uxyuyr.dxcjqn]: {
      title: "Jogador Morre Novamente",

      body: "§eGatilho\n\n§7Morra novamente dentro de 5 minutos após sua morte anterior.\n\n§eReação\n\n§7Comentários extras sobre você morrer novamente em poucos minutos.",
    },

    [uxyuyr.elcjbb]: {
      title: "Jogador Morre no Hardcore",

      body: "§eGatilho\n\n§7Morra em um mundo Hardcore onde um Aldeão possa testemunhar isso.\n\n§eReação\n\n§7Reações especiais ao ver você morrer permanentemente no Hardcore.",
    },

    [uxyuyr.bipqej]: {
      title: "Jogador Acorda",

      body: "§eGatilho\n\n§7Durma em uma Cama e depois acorde.\n\n§eReação\n\n§7Comentários típicos da manhã quando você acorda.",
    },

    [uxyuyr.hevyeb]: {
      title: "Acordar com Armadura",

      body: "§eGatilho\n\n§7Acorde de uma Cama enquanto estiver usando Armadura.\n\n§eReação\n\n§7Piadas sobre dormir de Armadura.",
    },

    [uxyuyr.zejman]: {
      title: "Quebrar um Bloco",

      body: "§eGatilho\n\n§7Quebre um Bloco.\n\n§eReação\n\n§7Reações surpresas ao ver você quebrando um Bloco.",
    },

    [uxyuyr.awappv]: {
      title: "Quebrar Vários Blocos",

      body: "§eGatilho\n\n§7Quebre vários blocos rapidamente.\n\n§eReação\n\n§7Perguntas e comentários sobre você quebrar vários Blocos rapidamente.",
    },

    [uxyuyr.ejvpis]: {
      title: "Quebrar Madeira",

      body: "§eGatilho\n\n§7Quebre Madeira.\n\n§eReação\n\n§7Reclamações e piadas sobre você quebrar Madeira.",
    },

    [uxyuyr.clzrea]: {
      title: "Quebrar Pedra",

      body: "§eGatilho\n\n§7Quebre Pedra.\n\n§eReação\n\n§7Comentários sobre você quebrar Pedra.",
    },

    [uxyuyr.qimink]: {
      title: "Quebrar uma Porta",

      body: "§eGatilho\n\n§7Quebre uma Porta.\n\n§eReação\n\n§7Reclamações sobre você quebrar uma Porta.",
    },

    [uxyuyr.osbwpz]: {
      title: "Quebrar uma Cama",

      body: "§eGatilho\n\n§7Quebre uma Cama.\n\n§eReação\n\n§7Reações irritadas ao ver você quebrando a Cama de um Aldeão.",
    },

    [uxyuyr.mabmbl]: {
      title: "Quebrar uma Estação de Trabalho",

      body: "§eGatilho\n\n§7Quebre uma Estação de Trabalho.\n\n§eReação\n\n§7Reclamações fortes sobre você quebrar uma Estação de Trabalho.",
    },

    [uxyuyr.rptjbd]: {
      title: "Quebrar um Sino",

      body: "§eGatilho\n\n§7Quebre um Sino.\n\n§eReação\n\n§7Reações ao ver você remover o Sino da vila.",
    },

    [uxyuyr.pclmft]: {
      title: "Quebrar um Bloco Decorativo",

      body: "§eGatilho\n\n§7Quebre um Bloco Decorativo.\n\n§eReação\n\n§7Reclamações fortes sobre você quebrar Blocos Decorativos.",
    },

    [uxyuyr.knywuy]: {
      title: "Colocar um Bloco",

      body: "§eGatilho\n\n§7Coloque qualquer Bloco.\n\n§eReação\n\n§7Perguntas e comentários sobre um Bloco sendo colocado.",
    },

    [uxyuyr.ujkoue]: {
      title: "Colocar uma Estação de Trabalho",

      body: "§eGatilho\n\n§7Coloque uma Estação de Trabalho.\n\n§eReação\n\n§7Reações a uma Estação de Trabalho sendo colocada.",
    },

    [uxyuyr.kdfaao]: {
      title: "Colocar uma Cama",

      body: "§eGatilho\n\n§7Coloque uma Cama.\n\n§eReação\n\n§7Observações sobre uma Cama sendo colocada.",
    },

    [uxyuyr.ktkmhn]: {
      title: "Colocar um Baú",

      body: "§eGatilho\n\n§7Coloque um Baú.\n\n§eReação\n\n§7Comentários sobre um Baú sendo colocado.",
    },

    [uxyuyr.jtsycy]: {
      title: "Colocar um Baú com Armadilha",

      body: "§eGatilho\n\n§7Coloque um Baú com Armadilha.\n\n§eReação\n\n§7Perguntas e comentários sobre um Baú com Armadilha sendo colocado.",
    },

    [uxyuyr.nxveql]: {
      title: "Colocar uma Mesa de Trabalho",

      body: "§eGatilho\n\n§7Coloque uma Mesa de Trabalho.\n\n§eReação\n\n§7Perguntas e comentários sobre uma Mesa de Trabalho sendo colocada.",
    },

    [uxyuyr.fpcepp]: {
      title: "Colocar uma Fornalha",

      body: "§eGatilho\n\n§7Coloque uma Fornalha.\n\n§eReação\n\n§7Comentários sobre uma Fornalha sendo colocada.",
    },

    [uxyuyr.nziize]: {
      title: "Colocar uma Estante de Livros",

      body: "§eGatilho\n\n§7Coloque uma Estante de Livros.\n\n§eReação\n\n§7Perguntas e comentários sobre uma Estante de Livros sendo colocada.",
    },

    [uxyuyr.dgrgul]: {
      title: "Colocar uma Jukebox",

      body: "§eGatilho\n\n§7Coloque uma Jukebox.\n\n§eReação\n\n§7Observações sobre uma Jukebox sendo colocada.",
    },

    [uxyuyr.ckniqq]: {
      title: "Colocar um Suporte de Armadura",

      body: "§eGatilho\n\n§7Coloque um Suporte de Armadura.\n\n§eReação\n\n§7Comentários sobre um Suporte de Armadura sendo colocado.",
    },

    [uxyuyr.fazcvg]: {
      title: "Colocar um Sinalizador",

      body: "§eGatilho\n\n§7Coloque um Sinalizador.\n\n§eReação\n\n§7Reações a um Sinalizador sendo colocado.",
    },

    [uxyuyr.mxmrpn]: {
      title: "Colocar Madeira",
      body: "§eGatilho\n\n§7Coloque Madeira.\n\n§eReação\n\n§7Observações sobre Madeira sendo colocada.",
    },
    [uxyuyr.xezbvo]: {
      title: "Colocar Terra",
      body: "§eGatilho\n\n§7Coloque Terra.\n\n§eReação\n\n§7Comentários sobre Terra sendo colocada.",
    },
    [uxyuyr.vubtsn]: {
      title: "Colocar Folhas ou Plantas",
      body: "§eGatilho\n\n§7Coloque Folhas ou Plantas.\n\n§eReação\n\n§7Reações a Folhas ou Plantas sendo colocadas.",
    },
    [uxyuyr.fvdzot]: {
      title: "Colocar Lã",
      body: "§eGatilho\n\n§7Coloque Lã.\n\n§eReação\n\n§7Perguntas e comentários sobre Lã sendo colocada.",
    },
    [uxyuyr.sbolpm]: {
      title: "Colocar Vidro",
      body: "§eGatilho\n\n§7Coloque Vidro.\n\n§eReação\n\n§7Reações de surpresa ao Vidro sendo colocado.",
    },
    [uxyuyr.fwiopr]: {
      title: "Colocar Tijolos",
      body: "§eGatilho\n\n§7Coloque Tijolos.\n\n§eReação\n\n§7Reações a Tijolos sendo colocados.",
    },
    [uxyuyr.zqzrsm]: {
      title: "Colocar Concreto",
      body: "§eGatilho\n\n§7Coloque Concreto.\n\n§eReação\n\n§7Observações sobre Concreto sendo colocado.",
    },
    [uxyuyr.gxepwi]: {
      title: "Colocar Terracota",
      body: "§eGatilho\n\n§7Coloque Terracota.\n\n§eReação\n\n§7Comentários sobre Terracota sendo colocada.",
    },
    [uxyuyr.cudgjr]: {
      title: "Colocar Terracota Esmaltada",
      body: "§eGatilho\n\n§7Coloque Terracota Esmaltada.\n\n§eReação\n\n§7Reações à Terracota Esmaltada sendo colocada.",
    },
    [uxyuyr.oimgrg]: {
      title: "Colocar um Bloco Valioso",
      body: "§eGatilho\n\n§7Coloque um Bloco de minério valioso, como Ferro, Ouro, Diamante ou Esmeralda.\n\n§eReação\n\n§7Observações sobre um Bloco Valioso sendo colocado.",
    },
    [uxyuyr.gnbpco]: {
      title: "Colocar um Bloco de Cobre",
      body: "§eGatilho\n\n§7Coloque um Bloco de Cobre.\n\n§eReação\n\n§7Comentários sobre um Bloco de Cobre sendo colocado.",
    },
    [uxyuyr.vgufsp]: {
      title: "Colocar um Bloco de Ferro",
      body: "§eGatilho\n\n§7Coloque um Bloco de Ferro.\n\n§eReação\n\n§7Reações a um Bloco de Ferro sendo colocado.",
    },
    [uxyuyr.vxhugl]: {
      title: "Colocar um Bloco de Ouro",
      body: "§eGatilho\n\n§7Coloque um Bloco de Ouro.\n\n§eReação\n\n§7Reações de surpresa a um Bloco de Ouro sendo colocado.",
    },
    [uxyuyr.clpxov]: {
      title: "Colocar um Bloco de Diamante",
      body: "§eGatilho\n\n§7Coloque um Bloco de Diamante.\n\n§eReação\n\n§7Perguntas e comentários sobre um Bloco de Diamante sendo colocado.",
    },
    [uxyuyr.afdrdd]: {
      title: "Colocar um Bloco de Esmeralda",
      body: "§eGatilho\n\n§7Coloque um Bloco de Esmeralda.\n\n§eReação\n\n§7Perguntas e comentários sobre um Bloco de Esmeralda sendo colocado.",
    },
    [uxyuyr.lnhdzn]: {
      title: "Colocar um Bloco de Lápis-Lazúli",
      body: "§eGatilho\n\n§7Coloque um Bloco de Lápis-Lazúli.\n\n§eReação\n\n§7Observações sobre um Bloco de Lápis-Lazúli sendo colocado.",
    },
    [uxyuyr.gjsote]: {
      title: "Construir a Estrutura de um Golem de Ferro",
      body: "§eGatilho\n\n§7Coloque blocos de Ferro na estrutura em formato de T usada para construir um Golem de Ferro.\n\n§eReação\n\n§7Comentários sobre você construindo a estrutura de um Golem de Ferro.",
    },
    [uxyuyr.ydfscf]: {
      title: "Colocar uma Abóbora",
      body: "§eGatilho\n\n§7Coloque uma Abóbora.\n\n§eReação\n\n§7Reações a uma Abóbora sendo colocada.",
    },
    [uxyuyr.ahabbf]: {
      title: "Colocar uma Abóbora de Halloween",
      body: "§eGatilho\n\n§7Coloque uma Abóbora de Halloween.\n\n§eReação\n\n§7Reações de surpresa a uma Abóbora de Halloween sendo colocada.",
    },
    [uxyuyr.veaotb]: {
      title: "Colocar um Melão",
      body: "§eGatilho\n\n§7Coloque um Melão.\n\n§eReação\n\n§7Comentários sobre um Melão sendo colocado.",
    },
    [uxyuyr.gzzzpj]: {
      title: "Colocar Gelo",
      body: "§eGatilho\n\n§7Coloque Gelo.\n\n§eReação\n\n§7Reações a Gelo sendo colocado.",
    },
    [uxyuyr.whbvvh]: {
      title: "Colocar Neve",
      body: "§eGatilho\n\n§7Coloque Neve.\n\n§eReação\n\n§7Perguntas e comentários sobre Neve sendo colocada.",
    },
    [uxyuyr.ehtaer]: {
      title: "Colocar Neve em Pó",
      body: "§eGatilho\n\n§7Coloque Neve em Pó.\n\n§eReação\n\n§7Comentários sobre Neve em Pó sendo colocada.",
    },
    [uxyuyr.tqnwzp]: {
      title: "Colocar um Bloco Afetado pela Gravidade",
      bkltkm: "Colocar um Bloco que Cai",
      body: "§eGatilho\n\n§7Coloque um Bloco afetado pela gravidade, como Areia ou Cascalho.\n\n§eReação\n\n§7Reações a um Bloco Afetado pela Gravidade sendo colocado.",
    },
    [uxyuyr.negvfb]: {
      title: "Colocar Pó de Concreto",
      body: "§eGatilho\n\n§7Coloque Pó de Concreto.\n\n§eReação\n\n§7Perguntas e comentários sobre Pó de Concreto sendo colocado.",
    },
    [uxyuyr.rseoxb]: {
      title: "Colocar um Bloco do Oceano",
      bkltkm: "Colocar um Bloco do Oceano",
      body: "§eGatilho\n\n§7Coloque um Bloco com tema oceânico.\n\n§eReação\n\n§7Comentários sobre um Bloco do Oceano sendo colocado.",
    },
    [uxyuyr.kodgox]: {
      title: "Colocar um Bloco do Nether",
      bkltkm: "Colocar um Bloco do Nether",
      body: "§eGatilho\n\n§7Coloque um Bloco do Nether.\n\n§eReação\n\n§7Perguntas e comentários sobre um Bloco do Nether sendo colocado.",
    },
    [uxyuyr.qyvelv]: {
      title: "Colocar um Bloco do End",
      bkltkm: "Colocar um Bloco do End",
      body: "§eGatilho\n\n§7Coloque um Bloco do End.\n\n§eReação\n\n§7Observações sobre um Bloco do End sendo colocado.",
    },
    [uxyuyr.nocwsk]: {
      title: "Colocar Pedra do End",
      body: "§eGatilho\n\n§7Coloque Pedra do End.\n\n§eReação\n\n§7Perguntas e comentários sobre Pedra do End sendo colocada.",
    },
    [uxyuyr.ejbqqc]: {
      title: "Colocar Purpur",
      body: "§eGatilho\n\n§7Coloque Purpur.\n\n§eReação\n\n§7Reações a Purpur sendo colocado.",
    },
    [uxyuyr.rtmqmc]: {
      title: "Colocar um Botão",
      body: "§eGatilho\n\n§7Coloque um Botão.\n\n§eReação\n\n§7Observações sobre um Botão sendo colocado.",
    },
    [uxyuyr.piupkf]: {
      title: "Colocar uma Alavanca",
      body: "§eGatilho\n\n§7Coloque uma Alavanca.\n\n§eReação\n\n§7Reações de surpresa a uma Alavanca sendo colocada.",
    },
    [uxyuyr.fdqdok]: {
      title: "Colocar um Bloco Exclusivo do Criativo",
      bkltkm: "Colocar Bloco Exclusivo do Criativo",
      body: "§eGatilho\n\n§7Coloque um Bloco que normalmente só está disponível no Modo Criativo ou por meio de comandos.\n\n§eReação\n\n§7Perguntas e comentários sobre um Bloco Exclusivo do Criativo sendo colocado.",
    },
    [uxyuyr.yckvyp]: {
      title: "Colocar um Bloco de Luz",
      body: "§eGatilho\n\n§7Coloque um Bloco de Luz.\n\n§eReação\n\n§7Reações de surpresa a um Bloco de Luz sendo colocado.",
    },
    [uxyuyr.pgwqkg]: {
      title: "Usar uma Mesa de Trabalho",
      body: "§eGatilho\n\n§7Use uma Mesa de Trabalho.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando uma Mesa de Trabalho.",
    },
    [uxyuyr.gzhbtb]: {
      title: "Usar uma Fornalha",
      body: "§eGatilho\n\n§7Use uma Fornalha.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando uma Fornalha.",
    },
    [uxyuyr.xwcoip]: {
      title: "Usar uma Bigorna",
      body: "§eGatilho\n\n§7Use uma Bigorna.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando uma Bigorna.",
    },
    [uxyuyr.crvciv]: {
      title: "Usar uma Mesa de Encantamentos",
      body: "§eGatilho\n\n§7Use uma Mesa de Encantamentos.\n\n§eReação\n\n§7Reações de surpresa a você usando uma Mesa de Encantamentos.",
    },
    [uxyuyr.myylcq]: {
      title: "Usar um Suporte de Poções",
      body: "§eGatilho\n\n§7Use um Suporte de Poções.\n\n§eReação\n\n§7Reações a você usando um Suporte de Poções.",
    },
    [uxyuyr.tgggsl]: {
      title: "Usar uma Mó",
      body: "§eGatilho\n\n§7Use uma Mó.\n\n§eReação\n\n§7Observações e perguntas sobre você usando uma Mó.",
    },
    [uxyuyr.ididel]: {
      title: "Usar uma Mesa de Ferraria",
      body: "§eGatilho\n\n§7Use uma Mesa de Ferraria.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando uma Mesa de Ferraria.",
    },
    [uxyuyr.knjvae]: {
      title: "Usar um Cortador de Pedras",
      body: "§eGatilho\n\n§7Use um Cortador de Pedras.\n\n§eReação\n\n§7Reações a você usando um Cortador de Pedras.",
    },
    [uxyuyr.bpgyfa]: {
      title: "Usar um Tear",
      body: "§eGatilho\n\n§7Use um Tear.\n\n§eReação\n\n§7Observações e perguntas sobre você usando um Tear.",
    },
    [uxyuyr.rykqwl]: {
      title: "Usar uma Mesa de Cartografia",
      body: "§eGatilho\n\n§7Use uma Mesa de Cartografia.\n\n§eReação\n\n§7Comentários sobre você usando uma Mesa de Cartografia.",
    },
    [uxyuyr.mfsmim]: {
      title: "Usar uma Composteira",
      body: "§eGatilho\n\n§7Use uma Composteira.\n\n§eReação\n\n§7Reações a você usando uma Composteira.",
    },
    [uxyuyr.xzpfwa]: {
      title: "Usar um Sinalizador",
      body: "§eGatilho\n\n§7Use um Sinalizador.\n\n§eReação\n\n§7Observações e perguntas sobre você usando um Sinalizador.",
    },
    [uxyuyr.gtqcjn]: {
      title: "Usar um Caldeirão",

      body: "§eGatilho\n\n§7Use um Caldeirão.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando um Caldeirão.",
    },

    [uxyuyr.dyvwqv]: {
      title: "Usar uma Jukebox",

      body: "§eGatilho\n\n§7Use uma Jukebox.\n\n§eReação\n\n§7Reações a você usando uma Jukebox.",
    },

    [uxyuyr.iqvgzk]: {
      title: "Usar uma Estante Entalhada",

      body: "§eGatilho\n\n§7Use uma Estante Entalhada.\n\n§eReação\n\n§7Observações e perguntas sobre você usando uma Estante Entalhada.",
    },

    [uxyuyr.hojlbk]: {
      title: "Usar Estantes",

      body: "§eGatilho\n\n§7Use Estantes.\n\n§eReação\n\n§7Comentários sobre você usando Estantes.",
    },

    [uxyuyr.ykycil]: {
      title: "Usar um Baú do Ender",

      body: "§eGatilho\n\n§7Use um Baú do Ender.\n\n§eReação\n\n§7Reações a você usando um Baú do Ender.",
    },

    [uxyuyr.lifrrj]: {
      title: "Usar uma Caixa de Shulker",

      body: "§eGatilho\n\n§7Use uma Caixa de Shulker.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando uma Caixa de Shulker.",
    },

    [uxyuyr.mjmgwj]: {
      title: "Usar um Fabricador",

      body: "§eGatilho\n\n§7Use um Fabricador.\n\n§eReação\n\n§7Perguntas e comentários sobre você usando um Fabricador.",
    },

    [uxyuyr.lnlwnl]: {
      title: "Usar um Ejetor",

      body: "§eGatilho\n\n§7Use um Ejetor.\n\n§eReação\n\n§7Reações a você usando um Ejetor.",
    },

    [uxyuyr.thmfsh]: {
      title: "Usar um Liberador",

      body: "§eGatilho\n\n§7Use um Liberador.\n\n§eReação\n\n§7Observações e perguntas sobre você usando um Liberador.",
    },

    [uxyuyr.jexbze]: {
      title: "Usar uma Porta",

      body: "§eGatilho\n\n§7Use uma Porta.\n\n§eReação\n\n§7Comentários sobre você usando uma Porta.",
    },

    [uxyuyr.wykqdb]: {
      title: "Abrir um Portão de Cerca",

      body: "§eGatilho\n\n§7Abra um Portão de Cerca.\n\n§eReação\n\n§7Reações a você abrindo um Portão de Cerca.",
    },

    [uxyuyr.pvwkxp]: {
      title: "Fechar um Portão de Cerca",

      body: "§eGatilho\n\n§7Feche um Portão de Cerca.\n\n§eReação\n\n§7Observações e perguntas sobre você fechando um Portão de Cerca.",
    },

    [uxyuyr.ktzfvk]: {
      title: "Pressionar um Botão",

      body: "§eGatilho\n\n§7Pressione um Botão.\n\n§eReação\n\n§7Reações de surpresa a você pressionando um Botão.",
    },

    [uxyuyr.yiwncn]: {
      title: "Acionar uma Alavanca",

      body: "§eGatilho\n\n§7Acione uma Alavanca.\n\n§eReação\n\n§7Perguntas e comentários sobre você acionando uma Alavanca.",
    },

    [uxyuyr.kljgyu]: {
      title: "Ouvir um Sino Tocar",

      body: "§eGatilho\n\n§7Toque um Sino perto o suficiente para que um Aldeão possa ouvi-lo.\n\n§eReação\n\n§7Observações e perguntas sobre um sino tocando.",
    },

    [uxyuyr.xemdbt]: {
      title: "Entalhar uma Abóbora",

      body: "§eGatilho\n\n§7Entalhe uma Abóbora.\n\n§eReação\n\n§7Comentários sobre você entalhando uma Abóbora.",
    },

    [uxyuyr.hqmkpb]: {
      title: "Colocar um Componente de Redstone",

      bkltkm: "Colocar Componente de Redstone",

      body: "§eGatilho\n\n§7Coloque um Componente de Redstone.\n\n§eReação\n\n§7Reações a um Componente de Redstone sendo colocado.",
    },

    [uxyuyr.qbuuop]: {
      title: "Colocar Pó de Redstone",

      body: "§eGatilho\n\n§7Coloque Pó de Redstone.\n\n§eReação\n\n§7Perguntas e comentários sobre Pó de Redstone sendo colocado.",
    },

    [uxyuyr.bimuve]: {
      title: "Colocar uma Tocha de Redstone",

      body: "§eGatilho\n\n§7Coloque uma Tocha de Redstone.\n\n§eReação\n\n§7Comentários sobre uma Tocha de Redstone sendo colocada.",
    },

    [uxyuyr.cdltxm]: {
      title: "Colocar um Repetidor de Redstone",

      body: "§eGatilho\n\n§7Coloque um Repetidor de Redstone.\n\n§eReação\n\n§7Reações a um Repetidor de Redstone sendo colocado.",
    },

    [uxyuyr.hlxzen]: {
      title: "Colocar uma Lâmpada de Redstone",

      body: "§eGatilho\n\n§7Coloque uma Lâmpada de Redstone.\n\n§eReação\n\n§7Perguntas e comentários sobre uma Lâmpada de Redstone sendo colocada.",
    },

    [uxyuyr.nwiopk]: {
      title: "Colocar um Observador",

      body: "§eGatilho\n\n§7Coloque um Observador.\n\n§eReação\n\n§7Perguntas e comentários sobre um Observador sendo colocado.",
    },

    [uxyuyr.jggged]: {
      title: "Colocar uma Placa de Pressão",

      body: "§eGatilho\n\n§7Coloque uma Placa de Pressão.\n\n§eReação\n\n§7Reações a uma Placa de Pressão sendo colocada.",
    },

    [uxyuyr.adtdit]: {
      title: "Colocar um Sensor de Luz Solar",

      body: "§eGatilho\n\n§7Coloque um Sensor de Luz Solar.\n\n§eReação\n\n§7Observações sobre um Sensor de Luz Solar sendo colocado.",
    },

    [uxyuyr.wsjvjd]: {
      title: "Colocar um Sensor de Sculk",

      body: "§eGatilho\n\n§7Coloque um Sensor de Sculk.\n\n§eReação\n\n§7Comentários sobre um Sensor de Sculk sendo colocado.",
    },

    [uxyuyr.wwmhos]: {
      title: "Colocar um Gancho de Fio de Armadilha",

      body: "§eGatilho\n\n§7Coloque um Gancho de Fio de Armadilha.\n\n§eReação\n\n§7Reações a um Gancho de Fio de Armadilha sendo colocado.",
    },

    [uxyuyr.edjqet]: {
      title: "Colocar um Trilho Detector",

      body: "§eGatilho\n\n§7Coloque um Trilho Detector.\n\n§eReação\n\n§7Observações sobre um Trilho Detector sendo colocado.",
    },

    [uxyuyr.ntnicx]: {
      title: "Colocar um Para-raios",

      body: "§eGatilho\n\n§7Coloque um Para-raios.\n\n§eReação\n\n§7Comentários sobre um Para-raios sendo colocado.",
    },

    [uxyuyr.oqjzko]: {
      title: "Ver uma Fogueira",

      body: "§eGatilho\n\n§7Tenha uma Fogueira por perto.\n\n§eReação\n\n§7Comentários e observações sobre uma Fogueira próxima.",
    },

    [uxyuyr.tavxec]: {
      title: "Acender uma Fogueira",

      body: "§eGatilho\n\n§7Acenda uma Fogueira.\n\n§eReação\n\n§7Reações a você acendendo uma Fogueira.",
    },

    [uxyuyr.xbttae]: {
      title: "Usar uma Fogueira",

      body: "§eGatilho\n\n§7Interaja com uma Fogueira.\n\n§eReação\n\n§7Comentários sobre você interagindo com uma Fogueira.",
    },

    [uxyuyr.nrzcxn]: {
      title: "Cozinhar Comida em uma Fogueira",

      body: "§eGatilho\n\n§7Coloque Comida em uma Fogueira para cozinhar.\n\n§eReação\n\n§7Comentários sobre você cozinhando Comida em uma Fogueira.",
    },

    [uxyuyr.uvgkny]: {
      title: "Apagar uma Fogueira",

      body: "§eGatilho\n\n§7Apague uma Fogueira.\n\n§eReação\n\n§7Reações a você apagando uma Fogueira.",
    },

    [uxyuyr.lfwbvu]: {
      title: "Acender uma Vela",

      body: "§eGatilho\n\n§7Acenda uma Vela.\n\n§eReação\n\n§7Comentários sobre você acendendo uma Vela.",
    },

    [uxyuyr.repalq]: {
      title: "Apagar uma Vela",

      body: "§eGatilho\n\n§7Apague uma Vela.\n\n§eReação\n\n§7Comentários sobre você apagando uma Vela.",
    },

    [uxyuyr.oziqss]: {
      title: "Acender TNT",

      body: "§eGatilho\n\n§7Acenda TNT.\n\n§eReação\n\n§7Reações alarmadas a você acendendo TNT.",
    },

    [uxyuyr.dortcb]: {
      title: "Zumbi",

      body: "§eGatilho\n\n§7Traga um Zumbi para perto.\n\n§eReação\n\n§7Comentários alarmados e piadas sobre o Zumbi próximo.",
    },

    [uxyuyr.xtooxu]: {
      title: "Aldeão Zumbi",

      body: "§eGatilho\n\n§7Traga um Aldeão Zumbi para perto.\n\n§eReação\n\n§7Reações preocupadas ao ver um Aldeão Zumbi.",
    },

    [uxyuyr.wboncy]: {
      title: "Zumbificado",

      body: "§eGatilho\n\n§7Traga um Zumbificado para perto.\n\n§eReação\n\n§7Comentários cautelosos sobre o Zumbificado próximo.",
    },

    [uxyuyr.gcoysc]: {
      title: "Afogado do Deserto",

      body: "§eGatilho\n\n§7Traga um Afogado do Deserto para perto.\n\n§eReação\n\n§7Piadas e comentários confusos sobre o Zumbi do deserto.",
    },

    [uxyuyr.atwycp]: {
      title: "Afogado",

      body: "§eGatilho\n\n§7Traga um Afogado para perto.\n\n§eReação\n\n§7Reações alarmadas ao Afogado.",
    },

    [uxyuyr.lqzdqk]: {
      title: "Esqueleto",

      body: "§eGatilho\n\n§7Traga um Esqueleto para perto.\n\n§eReação\n\n§7Piadas nervosas e perguntas sobre o Esqueleto.",
    },

    [uxyuyr.bxbibd]: {
      title: "Esqueleto Glacial",

      body: "§eGatilho\n\n§7Traga um Esqueleto Glacial para perto.\n\n§eReação\n\n§7Reações cautelosas ao Esqueleto Glacial.",
    },

    [uxyuyr.nsosix]: {
      title: "Bogged",

      body: "§eGatilho\n\n§7Traga um Bogged para perto.\n\n§eReação\n\n§7Comentários confusos sobre o Bogged.",
    },

    [uxyuyr.gtmfpl]: {
      title: "Aranha",

      body: "§eGatilho\n\n§7Traga uma Aranha para perto.\n\n§eReação\n\n§7Perguntas nervosas sobre a Aranha.",
    },

    [uxyuyr.rzvitn]: {
      title: "Slime",

      body: "§eGatilho\n\n§7Traga um Slime para perto.\n\n§eReação\n\n§7Reações curiosas e cautelosas ao Slime.",
    },

    [uxyuyr.odwhzm]: {
      title: "Creeper",

      body: "§eGatilho\n\n§7Traga um Creeper para perto.\n\n§eReação\n\n§7Reações alarmadas ao Creeper.",
    },

    [uxyuyr.lwcrnt]: {
      title: "Bruxa",

      body: "§eGatilho\n\n§7Traga uma Bruxa para perto.\n\n§eReação\n\n§7Comentários suspeitos e alarmados sobre a Bruxa.",
    },

    [uxyuyr.yeqxvm]: {
      title: "Enderman",

      body: "§eGatilho\n\n§7Traga um Enderman para perto.\n\n§eReação\n\n§7Perguntas nervosas sobre o Enderman.",
    },

    [uxyuyr.nwzvkb]: {
      title: "Phantom",

      body: "§eGatilho\n\n§7Traga um Phantom para perto.\n\n§eReação\n\n§7Reações alarmadas ao Phantom.",
    },

    [uxyuyr.dxeaal]: {
      title: "Jóquei",

      body: "§eGatilho\n\n§7Traga um Jóquei para perto.\n\n§eReação\n\n§7Reações confusas ao Jóquei incomum.",
    },

    [uxyuyr.nwlcij]: {
      title: "Creaking",

      body: "§eGatilho\n\n§7Traga um Creaking para perto.\n\n§eReação\n\n§7Comentários e perguntas desconfortáveis sobre o Creaking.",
    },

    [uxyuyr.jicosq]: {
      title: "Warden",

      body: "§eGatilho\n\n§7Traga um Warden para perto.\n\n§eReação\n\n§7Reações de medo ao Warden.",
    },

    [uxyuyr.satsrf]: {
      title: "Wither",

      body: "§eGatilho\n\n§7Traga um Wither para perto.\n\n§eReação\n\n§7Reações alarmadas ao Wither.",
    },

    [uxyuyr.xxjkmo]: {
      title: "Dragão do End",

      body: "§eGatilho\n\n§7Traga um Dragão do End para perto.\n\n§eReação\n\n§7Reações de espanto e alarme ao Dragão do End.",
    },

    [uxyuyr.lvzfcv]: {
      title: "Vaca",

      body: "§eGatilho\n\n§7Traga uma Vaca para perto.\n\n§eReação\n\n§7Observações e piadas sobre a Vaca próxima.",
    },

    [uxyuyr.jqdeef]: {
      title: "Porco",

      body: "§eGatilho\n\n§7Traga um Porco para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Porco próximo.",
    },

    [uxyuyr.vxycol]: {
      title: "Ovelha",

      body: "§eGatilho\n\n§7Traga uma Ovelha para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre a Ovelha próxima.",
    },

    [uxyuyr.afxbav]: {
      title: "Ovelha Tosquiada",

      body: "§eGatilho\n\n§7Traga uma Ovelha Tosquiada para perto.\n\n§eReação\n\n§7Observações e piadas sobre a Ovelha Tosquiada próxima.",
    },

    [uxyuyr.hggexx]: {
      title: "Galinha",

      body: "§eGatilho\n\n§7Traga uma Galinha para perto.\n\n§eReação\n\n§7Observações e piadas sobre a Galinha próxima.",
    },

    [uxyuyr.ynxhfb]: {
      title: "Gato",

      body: "§eGatilho\n\n§7Traga um Gato para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Gato próximo.",
    },

    [uxyuyr.vvntcf]: {
      title: "Lobo",

      body: "§eGatilho\n\n§7Traga um Lobo para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Lobo próximo.",
    },

    [uxyuyr.aqxgxh]: {
      title: "Lobo Domado",

      body: "§eGatilho\n\n§7Traga um Lobo Domado para perto.\n\n§eReação\n\n§7Comentários amigáveis sobre o Lobo Domado próximo.",
    },

    [uxyuyr.rbkjsr]: {
      title: "Abelha",

      body: "§eGatilho\n\n§7Traga uma Abelha para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre a Abelha próxima.",
    },

    [uxyuyr.bmimxe]: {
      title: "Abelha Furiosa",

      body: "§eGatilho\n\n§7Traga uma Abelha Furiosa para perto.\n\n§eReação\n\n§7Reações cautelosas e alarmadas à Abelha Furiosa próxima.",
    },

    [uxyuyr.yazvzs]: {
      title: "Cavalo",

      body: "§eGatilho\n\n§7Traga um Cavalo para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Cavalo próximo.",
    },

    [uxyuyr.ysbfqu]: {
      title: "Lhama",

      body: "§eGatilho\n\n§7Traga uma Lhama para perto.\n\n§eReação\n\n§7Observações e piadas sobre a Lhama próxima.",
    },

    [uxyuyr.spfefr]: {
      title: "Coelho",

      body: "§eGatilho\n\n§7Traga um Coelho para perto.\n\n§eReação\n\n§7Reações curiosas e divertidas ao Coelho próximo.",
    },

    [uxyuyr.pguaqp]: {
      title: "Sapo",

      body: "§eGatilho\n\n§7Traga um Sapo para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Sapo próximo.",
    },

    [uxyuyr.trkugw]: {
      title: "Peixe",

      body: "§eGatilho\n\n§7Traga um Peixe para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Peixe próximo.",
    },

    [uxyuyr.aqtshb]: {
      title: "Golfinho",

      body: "§eGatilho\n\n§7Traga um Golfinho para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Golfinho próximo.",
    },

    [uxyuyr.neoxpu]: {
      title: "Tartaruga",

      body: "§eGatilho\n\n§7Traga uma Tartaruga para perto.\n\n§eReação\n\n§7Observações e piadas sobre a Tartaruga próxima.",
    },

    [uxyuyr.swewsr]: {
      title: "Panda",

      body: "§eGatilho\n\n§7Traga um Panda para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Panda próximo.",
    },

    [uxyuyr.toolzx]: {
      title: "Urso Polar",

      body: "§eGatilho\n\n§7Traga um Urso Polar para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Urso Polar próximo.",
    },

    [uxyuyr.vapupl]: {
      title: "Papagaio",

      body: "§eGatilho\n\n§7Traga um Papagaio para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Papagaio próximo.",
    },

    [uxyuyr.turlrl]: {
      title: "Camelo",

      body: "§eGatilho\n\n§7Traga um Camelo para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Camelo próximo.",
    },

    [uxyuyr.ozmthf]: {
      title: "Morcego",

      body: "§eGatilho\n\n§7Traga um Morcego para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Morcego próximo.",
    },
    [uxyuyr.tqishj]: {
      title: "Sniffer",

      body: "§eGatilho\n\n§7Traga um Sniffer para perto.\n\n§eReação\n\n§7Observações e piadas sobre o Sniffer próximo.",
    },

    [uxyuyr.hzahog]: {
      title: "Vaca Bebê",

      body: "§eGatilho\n\n§7Traga uma Vaca Bebê para perto.\n\n§eReação\n\n§7Reações curiosas e divertidas à Vaca Bebê próxima.",
    },

    [uxyuyr.htibul]: {
      title: "Porco Bebê",

      body: "§eGatilho\n\n§7Traga um Porco Bebê para perto.\n\n§eReação\n\n§7Reações curiosas e divertidas ao Porco Bebê próximo.",
    },

    [uxyuyr.eccdga]: {
      title: "Ovelha Bebê",

      body: "§eGatilho\n\n§7Traga uma Ovelha Bebê para perto.\n\n§eReação\n\n§7Comentários divertidos sobre a Ovelha Bebê próxima.",
    },

    [uxyuyr.pjcwec]: {
      title: "Galinha Bebê",

      body: "§eGatilho\n\n§7Traga uma Galinha Bebê para perto.\n\n§eReação\n\n§7Comentários divertidos sobre a Galinha Bebê próxima.",
    },

    [uxyuyr.knjdbi]: {
      title: "Gato Bebê",

      body: "§eGatilho\n\n§7Traga um Gato Bebê para perto.\n\n§eReação\n\n§7Comentários divertidos sobre o Gato Bebê próximo.",
    },

    [uxyuyr.hyzwpr]: {
      title: "Lobo Bebê",

      body: "§eGatilho\n\n§7Traga um Lobo Bebê para perto.\n\n§eReação\n\n§7Reações curiosas e divertidas ao Lobo Bebê próximo.",
    },

    [uxyuyr.sxikgq]: {
      title: "Lobo Bebê Domado",

      body: "§eGatilho\n\n§7Traga um Lobo Bebê Domado para perto.\n\n§eReação\n\n§7Comentários amigáveis sobre o Lobo Bebê Domado próximo.",
    },

    [uxyuyr.ualabt]: {
      title: "Cavalo Bebê",

      body: "§eGatilho\n\n§7Traga um Cavalo Bebê para perto.\n\n§eReação\n\n§7Perguntas e comentários curiosos sobre o Cavalo Bebê próximo.",
    },

    [uxyuyr.gggzar]: {
      title: "Panda Bebê",

      body: "§eGatilho\n\n§7Traga um Panda Bebê para perto.\n\n§eReação\n\n§7Reações curiosas e divertidas ao Panda Bebê próximo.",
    },

    [uxyuyr.qqtnlm]: {
      title: "Abelha Bebê",

      body: "§eGatilho\n\n§7Traga uma Abelha Bebê para perto.\n\n§eReação\n\n§7Comentários divertidos sobre a Abelha Bebê próxima.",
    },

    [uxyuyr.zvwapr]: {
      title: "Zumbi Bebê",

      body: "§eGatilho\n\n§7Traga um Zumbi Bebê para perto.\n\n§eReação\n\n§7Reações alarmadas e surpresas ao Zumbi Bebê próximo.",
    },

    [uxyuyr.nstwos]: {
      title: "Aldeão Zumbi Bebê",

      body: "§eGatilho\n\n§7Traga um Aldeão Zumbi Bebê para perto.\n\n§eReação\n\n§7Reações alarmadas e surpresas ao Aldeão Zumbi Bebê próximo.",
    },

    [uxyuyr.qltnkz]: {
      title: "Zumbificado Bebê",

      body: "§eGatilho\n\n§7Traga um Zumbificado Bebê para perto.\n\n§eReação\n\n§7Reações alarmadas e surpresas ao Zumbificado Bebê próximo.",
    },

    [uxyuyr.hwltxk]: {
      title: "Husk Bebê",

      body: "§eGatilho\n\n§7Traga um Husk Bebê para perto.\n\n§eReação\n\n§7Reações alarmadas e surpresas ao Husk Bebê próximo.",
    },

    [uxyuyr.vakwgb]: {
      title: "Afogado Bebê",

      body: "§eGatilho\n\n§7Traga um Afogado Bebê para perto.\n\n§eReação\n\n§7Reações alarmadas e surpresas ao Afogado Bebê próximo.",
    },

    [uxyuyr.cuchwi]: {
      title: "Golem de Ferro",

      body: "§eGatilho\n\n§7Traga um Golem de Ferro para perto.\n\n§eReação\n\n§7Comentários tranquilizadores e impressionados sobre o Golem de Ferro.",
    },

    [uxyuyr.qffeco]: {
      title: "Golem de Ferro Mira no Jogador",

      bkltkm: "Golem Mira no Jogador",

      body: "§eGatilho\n\n§7Faça com que um Golem de Ferro mire em você.\n\n§eReação\n\n§7Reações preocupadas quando o Golem de Ferro da vila mira em você.",
    },

    [uxyuyr.kxjegd]: {
      title: "Golem de Neve",

      body: "§eGatilho\n\n§7Traga um Golem de Neve para perto.\n\n§eReação\n\n§7Comentários e piadas sobre o Golem de Neve.",
    },

    [uxyuyr.ktdshy]: {
      title: "Golem de Cobre",

      body: "§eGatilho\n\n§7Traga um Golem de Cobre para perto.\n\n§eReação\n\n§7Reações curiosas ao Golem de Cobre.",
    },

    [uxyuyr.rnlher]: {
      title: "Allay",

      body: "§eGatilho\n\n§7Traga um Allay para perto.\n\n§eReação\n\n§7Comentários curiosos e amigáveis sobre o Allay.",
    },

    [uxyuyr.lxvofx]: {
      title: "Ghast Feliz",

      body: "§eGatilho\n\n§7Traga um Ghast Feliz para perto.\n\n§eReação\n\n§7Reações de surpresa ao Ghast Feliz.",
    },

    [uxyuyr.dmcjmd]: {
      title: "Cubo de Enxofre",

      body: "§eGatilho\n\n§7Traga um Cubo de Enxofre para perto.\n\n§eReação\n\n§7Reações confusas e curiosas ao Cubo de Enxofre.",
    },

    [uxyuyr.gjtuqd]: {
      title: "Ver uma Criatura Desconhecida",

      body: "§eGatilho\n\n§7Traga para perto uma entidade que se enquadre no sistema alternativo de criatura desconhecida do add-on.\n\n§eReação\n\n§7Reações genéricas de confusão a uma Criatura não reconhecida.",
    },

    [uxyuyr.lvigit]: {
      title: "Aldeão Vagando",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar durante sua rotina normal.\n\n§eReação\n\n§7Conversas gerais enquanto vagueia.",
    },

    [uxyuyr.gbxzxv]: {
      title: "Aldeão Desempregado Vagando",

      bkltkm: "Aldeão Desempregado",

      body: "§eGatilho\n\n§7Deixe um Aldeão adulto desempregado vagar sem uma profissão.\n\n§eReação\n\n§7Comentários sobre estar desempregado e não ter uma Estação de Trabalho.",
    },

    [uxyuyr.uookqp]: {
      title: "Aldeão Preguiçoso Vagando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Preguiçoso vagar por aí.\n\n§eReação\n\n§7Conversas específicas de Aldeão Preguiçoso enquanto vaga.",
    },

    [uxyuyr.zndzjx]: {
      title: "Conseguir um Emprego",

      body: "§eGatilho\n\n§7Coloque um Bloco de local de trabalho não reivindicado perto de um Aldeão adulto desempregado para que ele possa adquirir uma profissão.\n\n§eReação\n\n§7Reações ao conseguir uma nova profissão.",
    },

    [uxyuyr.qawras]: {
      title: "Começar a Trabalhar",

      body: "§eGatilho\n\n§7Deixe um Aldeão empregado chegar ao seu Bloco de local de trabalho quando o período de trabalho começar.\n\n§eReação\n\n§7Conversas durante o dia de trabalho sobre começar a trabalhar e reabastecer Trocas.",
    },

    [uxyuyr.sdhkke]: {
      title: "Ficar Perto de uma Estação de Trabalho",

      body: "§eGatilho\n\n§7Deixe um Aldeão empregado trabalhar ao lado de seu Bloco de local de trabalho reivindicado.\n\n§eReação\n\n§7Comentários gerais enquanto estiver perto de uma Estação de Trabalho.",
    },

    [uxyuyr.umdvtb]: {
      title: "Fazendeiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Fazendeiro trabalhar ao lado de sua Composteira.\n\n§eReação\n\n§7Conversas específicas de Fazendeiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.tgggoh]: {
      title: "Pescador Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Pescador trabalhar ao lado de seu Barril.\n\n§eReação\n\n§7Conversas específicas de Pescador enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.fezzjw]: {
      title: "Bibliotecário Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Bibliotecário trabalhar ao lado de seu Atril.\n\n§eReação\n\n§7Conversas específicas de Bibliotecário enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.opxfuo]: {
      title: "Pastor Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Pastor trabalhar ao lado de seu Tear.\n\n§eReação\n\n§7Conversas específicas de Pastor enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.fzjope]: {
      title: "Flecheiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Flecheiro trabalhar ao lado de sua Bancada de Arco e Flecha.\n\n§eReação\n\n§7Conversas específicas de Flecheiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.djpksc]: {
      title: "Armeiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Armeiro trabalhar ao lado de seu Alto-forno.\n\n§eReação\n\n§7Conversas específicas de Armeiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.ueczyh]: {
      title: "Açougueiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Açougueiro trabalhar ao lado de seu Defumador.\n\n§eReação\n\n§7Conversas específicas de Açougueiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.wuoloh]: {
      title: "Cartógrafo Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Cartógrafo trabalhar ao lado de sua Mesa de Cartografia.\n\n§eReação\n\n§7Conversas específicas de Cartógrafo enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.hkowex]: {
      title: "Clérigo Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Clérigo trabalhar ao lado de seu Suporte de Poções.\n\n§eReação\n\n§7Conversas específicas de Clérigo enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.ljewqf]: {
      title: "Curtidor Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Curtidor trabalhar ao lado de seu Caldeirão.\n\n§eReação\n\n§7Conversas específicas de Curtidor enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.yldlzt]: {
      title: "Pedreiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Pedreiro trabalhar ao lado de seu Cortador de Pedras.\n\n§eReação\n\n§7Conversas específicas de Pedreiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.ivktls]: {
      title: "Ferramenteiro Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Ferramenteiro trabalhar ao lado de sua Mesa de Ferraria.\n\n§eReação\n\n§7Conversas específicas de Ferramenteiro enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.ccpvqj]: {
      title: "Armeiro de Armas Trabalhando",

      body: "§eGatilho\n\n§7Deixe um Aldeão Armeiro de Armas trabalhar ao lado de sua Mó.\n\n§eReação\n\n§7Conversas específicas de Armeiro de Armas enquanto trabalha em sua Estação de Trabalho.",
    },

    [uxyuyr.aobqjt]: {
      title: "Agricultura",

      body: "§eGatilho\n\n§7Deixe um Aldeão Fazendeiro cuidar, colher ou Plantar Cultivos durante sua rotina normal de trabalho.\n\n§eReação\n\n§7Conversas específicas de Fazendeiro enquanto trabalha com Cultivos.",
    },

    [uxyuyr.tdvtmn]: {
      title: "Inspecionar Estantes de Livros",

      body: "§eGatilho\n\n§7Deixe um Aldeão Bibliotecário inspecionar Estantes de Livros próximas durante seu comportamento normal de trabalho.\n\n§eReação\n\n§7Comentários do Bibliotecário enquanto inspeciona Estantes de Livros.",
    },

    [uxyuyr.ywzhwz]: {
      title: "Não Consegue Alcançar a Estação de Trabalho",

      body: "§eGatilho\n\n§7Dê a um Aldeão empregado um Bloco de local de trabalho reivindicado que ele não consiga alcançar.\n\n§eReação\n\n§7Comentários frustrados quando um Aldeão não consegue alcançar sua Estação de Trabalho.",
    },

    [uxyuyr.fltegg]: {
      title: "Subir de Nível",

      body: "§eGatilho\n\n§7Faça Trocas suficientes com um Aldeão para que seu nível de Comércio aumente.\n\n§eReação\n\n§7Comentários comemorativos quando um Aldeão sobe de nível.",
    },

    [uxyuyr.pnvkfy]: {
      title: "Alcançar o Nível Mestre",

      body: "§eGatilho\n\n§7Continue fazendo Trocas com um Aldeão até que ele alcance o nível Mestre.\n\n§eReação\n\n§7Diálogo comemorativo por alcançar o nível Mestre de Comércio.",
    },

    [uxyuyr.wkfbuv]: {
      title: "Voltar para Casa",

      body: "§eGatilho\n\n§7Espere até que os Aldeões comecem a voltar para suas casas antes da noite.\n\n§eReação\n\n§7Comentários do fim do dia enquanto voltam para casa.",
    },

    [uxyuyr.uqguqj]: {
      title: "Voltar para Casa sem uma Cama",

      body: "§eGatilho\n\n§7Faça um Aldeão tentar voltar para casa sem uma Cama válida para onde retornar.\n\n§eReação\n\n§7Comentários sobre tentar voltar para casa sem ter uma Cama.",
    },

    [uxyuyr.ioxtmt]: {
      title: "Ir para a Cama",

      body: "§eGatilho\n\n§7Deixe um Aldeão chegar à sua Cama e começar a dormir.\n\n§eReação\n\n§7Comentários na hora de dormir enquanto se prepara para dormir.",
    },

    [uxyuyr.asqzby]: {
      title: "Dormindo",

      body: "§eGatilho\n\n§7Espere até que um Aldeão esteja dormindo.\n\n§eReação\n\n§7Comentários ocasionais enquanto dorme.",
    },

    [uxyuyr.ctptjt]: {
      title: "Acordar Naturalmente",

      body: "§eGatilho\n\n§7Deixe um Aldeão dormindo acordar naturalmente.\n\n§eReação\n\n§7Comentários após acordar naturalmente.",
    },

    [uxyuyr.viwaal]: {
      title: "Acordar um Aldeão Dormindo",

      body: "§eGatilho\n\n§7Acorde um Aldeão enquanto ele estiver dormindo.\n\n§eReação\n\n§7Reclamações e reações confusas por ter sido acordado.",
    },

    [uxyuyr.dxmmiu]: {
      title: "Pegar um Item",

      body: "§eGatilho\n\n§7Solte um Item que um Aldeão possa pegar.\n\n§eReação\n\n§7Comentários ao pegar um Item.",
    },

    [uxyuyr.vkhrme]: {
      title: "Pegar um Item Solto por um Jogador",

      bkltkm: "Pegar Item do Jogador",

      body: "§eGatilho\n\n§7Solte um Item você mesmo e deixe um Aldeão pegá-lo.\n\n§eReação\n\n§7Comentários diferentes quando o Item foi solto por um jogador.",
    },

    [uxyuyr.ujyxfg]: {
      title: "Pegar um Item Solto por um Aldeão",

      bkltkm: "Pegar Item do Aldeão",

      body: "§eGatilho\n\n§7Faça um Aldeão soltar um Item que outro Aldeão pegue.\n\n§eReação\n\n§7Comentários diferentes quando o Item foi solto por outro Aldeão.",
    },

    [uxyuyr.zywcju]: {
      title: "Ver uma Pilha de Itens Soltos",

      bkltkm: "Ver Pilha de Itens Soltos",

      body: "§eGatilho\n\n§7Deixe uma grande pilha de itens soltos no chão.\n\n§eReação\n\n§7Reações ao ver uma grande pilha de Itens soltos.",
    },

    [uxyuyr.zjwpzi]: {
      title: "Pegar uma Armadura",

      body: "§eGatilho\n\n§7Deixe um Aldeão pegar uma peça de Armadura.\n\n§eReação\n\n§7Comentários ao pegar uma Armadura.",
    },

    [uxyuyr.habfnx]: {
      title: "Pegar uma Armadura Encantada",

      body: "§eGatilho\n\n§7Deixe um Aldeão pegar uma peça de Armadura encantada.\n\n§eReação\n\n§7Reações extras ao pegar uma Armadura Encantada.",
    },

    [uxyuyr.ebyrtk]: {
      title: "Receber Comida",

      body: "§eGatilho\n\n§7Dê Comida a um Aldeão.\n\n§eReação\n\n§7Reações ao receber Comida.",
    },

    [uxyuyr.rlfjux]: {
      title: "Receber Beterraba",

      body: "§eGatilho\n\n§7Dê Beterraba a um Aldeão.\n\n§eReação\n\n§7Reações ao receber Beterraba.",
    },

    [uxyuyr.bbjsik]: {
      title: "Receber Pão",

      body: "§eGatilho\n\n§7Dê Pão a um Aldeão.\n\n§eReação\n\n§7Reações ao receber Pão.",
    },

    [uxyuyr.nqktml]: {
      title: "Receber Cenoura",

      body: "§eGatilho\n\n§7Dê uma Cenoura a um Aldeão.\n\n§eReação\n\n§7Reações ao receber uma Cenoura.",
    },

    [uxyuyr.ytydjc]: {
      title: "Receber Batatas",

      body: "§eGatilho\n\n§7Dê Batatas a um Aldeão.\n\n§eReação\n\n§7Reações ao receber Batatas.",
    },

    [uxyuyr.locuih]: {
      title: "Compartilhar Comida com Outro Aldeão",

      bkltkm: "Compartilhar Comida",

      body: "§eGatilho\n\n§7Deixe um Aldeão jogar Comida para outro Aldeão.\n\n§eReação\n\n§7Diálogo entre Aldeões enquanto compartilham Comida.",
    },

    [uxyuyr.cvltyw]: {
      title: "Ver Orbes de XP",

      body: "§eGatilho\n\n§7Tenha Orbes de XP flutuando por perto.\n\n§eReação\n\n§7Comentários curiosos sobre Orbes de XP próximos.",
    },

    [uxyuyr.fbuabj]: {
      title: "Ter um Bebê",

      body: "§eGatilho\n\n§7Reproduza dois Aldeões adultos. Dê Comida suficiente a eles e certifique-se de que a vila tenha uma Cama válida disponível, então espere até que tenham um bebê.\n\n§eReação\n\n§7Reações a ter um Aldeão Bebê, com comentários sobre Comida e a nova chegada.",
    },

    [uxyuyr.pbmrxx]: {
      title: "Ver um Aldeão Bebê",

      body: "§eGatilho\n\n§7Traga um Aldeão Bebê para perto de um Aldeão adulto.\n\n§eReação\n\n§7Comentários sobre ver um Aldeão Bebê próximo.",
    },

    [uxyuyr.kzemrz]: {
      title: "Juntar Aldeões Demais",

      bkltkm: "Superlotar Aldeões",

      body: "§eGatilho\n\n§7Coloque vários Aldeões apertados em um espaço pequeno.\n\n§eReação\n\n§7Reclamações sobre estar amontoado com Aldeões demais.",
    },

    [uxyuyr.spfsrr]: {
      title: "Dar um Nome a um Aldeão",

      body: "§eGatilho\n\n§7Use uma Etiqueta para dar um nome a um Aldeão.\n\n§eReação\n\n§7Reações ao receber um nome usando uma Etiqueta.",
    },

    [uxyuyr.qmpcxi]: {
      title: 'Dar o nome "Dinnerbone" a um Aldeão',

      bkltkm: "Dar o nome Dinnerbone",

      body: '§eGatilho\n\n§7Use uma Etiqueta para dar o nome "Dinnerbone" a um Aldeão.\n\n§eReação\n\n§7Uma reação especial ao receber o nome "Dinnerbone".',
    },

    [uxyuyr.armupg]: {
      title: 'Dar o nome "Jeb" a um Aldeão',

      body: '§eGatilho\n\n§7Use uma Etiqueta para dar o nome "Jeb" a um Aldeão.\n\n§eReação\n\n§7Uma reação especial ao receber o nome "Jeb".',
    },

    [uxyuyr.vskjkl]: {
      title: "Gerar um Aldeão com um Ovo de Invocação",

      bkltkm: "Gerar Aldeão com Ovo",

      body: "§eGatilho\n\n§7Gere um Aldeão usando um Ovo de Invocação de Aldeão.\n\n§eReação\n\n§7Comentários sobre ter sido gerado com um Ovo de Invocação.",
    },

    [uxyuyr.ivumgm]: {
      title: "Curar um Aldeão Zumbi",

      body: "§eGatilho\n\n§7Cure um Aldeão Zumbi aplicando Fraqueza e depois usando uma Maçã Dourada nele. Espere a conversão terminar.\n\n§eReação\n\n§7Reações de alívio e confusão após ser curado de Aldeão Zumbi.",
    },

    [uxyuyr.lgjtnf]: {
      title: "Nasce um Aldeão Bebê",

      body: "§eGatilho\n\n§7Reproduza dois Aldeões adultos e espere o Aldeão Bebê nascer.\n\n§eReação\n\n§7Reações animadas ao nascimento de um novo Aldeão Bebê.",
    },

    [uxyuyr.smvnbj]: {
      title: "Crescer",

      body: "§eGatilho\n\n§7Espere um Aldeão Bebê crescer e se tornar adulto.\n\n§eReação\n\n§7Comentários sobre crescer repentinamente e precisar de um emprego.",
    },

    [uxyuyr.rfnirh]: {
      title: "Brincar de Pega-Pega",

      body: "§eGatilho\n\n§7Deixe dois Aldeões Bebês brincarem e perseguirem um ao outro.\n\n§eReação\n\n§7Conversas divertidas enquanto persegue outro Aldeão Bebê.",
    },

    [uxyuyr.vhwksn]: {
      title: "Aldeão Bebê Corre",

      body: "§eGatilho\n\n§7Observe um Aldeão Bebê enquanto ele estiver correndo.\n\n§eReação\n\n§7Comentários animados enquanto corre por aí.",
    },

    [uxyuyr.vbclem]: {
      title: "Bebê Corre no Fim de Semana",

      bkltkm: "Corrida de Bebê no Fim de Semana",

      body: "§eGatilho\n\n§7Faça um Aldeão Bebê correr no sábado ou domingo.\n\n§eReação\n\n§7Comentários extras específicos do fim de semana enquanto corre.",
    },

    [uxyuyr.ecslqo]: {
      title: "Aldeão Bebê se Machuca",

      body: "§eGatilho\n\n§7Faça um Aldeão Bebê sofrer dano.\n\n§eReação\n\n§7Reações de dor do Aldeão Bebê.",
    },

    [uxyuyr.wsxfok]: {
      title: "Se Acalmar Depois de um Susto",

      body: "§eGatilho\n\n§7Fique perto de um Aldeão Bebê depois que ele tiver sido assustado ou ferido e permita que ele se acalme.\n\n§eReação\n\n§7Comentários de alívio depois de se acalmar de um susto.",
    },

    [uxyuyr.ggitzq]: {
      title: "Curar um Aldeão Zumbi Bebê",

      bkltkm: "Curar Aldeão Zumbi Bebê",

      body: "§eGatilho\n\n§7Cure um Aldeão Zumbi Bebê aplicando Fraqueza e depois usando uma Maçã Dourada nele. Espere a conversão terminar.\n\n§eReação\n\n§7Reações de alívio e surpresa após ser curado de um Aldeão Zumbi Bebê.",
    },

    [uxyuyr.abfwiv]: {
      title: "Gerar um Bebê com um Ovo de Invocação",

      bkltkm: "Gerar Bebê com Ovo",

      body: "§eGatilho\n\n§7Gere um Aldeão Bebê usando um Ovo de Invocação.\n\n§eReação\n\n§7Comentários confusos sobre aparecer repentinamente de um Ovo de Invocação.",
    },

    [uxyuyr.durjjd]: {
      title: "Avançar o Tempo",

      body: "§eGatilho\n\n§7Avance o tempo enquanto um Aldeão Bebê estiver ativo.\n\n§eReação\n\n§7Reações confusas ao tempo avançar repentinamente.",
    },

    [uxyuyr.wkwcrf]: {
      title: "De Repente Virar Dia",

      body: "§eGatilho\n\n§7Mude repentinamente o mundo da noite para o dia enquanto um Aldeão Bebê estiver ativo.\n\n§eReação\n\n§7Comentários sobre o mundo repentinamente ficar de dia.",
    },

    [uxyuyr.msemoe]: {
      title: "De Repente Virar Noite",

      body: "§eGatilho\n\n§7Mude repentinamente o mundo do dia para a noite enquanto um Aldeão Bebê estiver ativo.\n\n§eReação\n\n§7Comentários sobre o mundo repentinamente ficar de noite.",
    },

    [uxyuyr.wtuguc]: {
      title: "Conhecer um Jogador",

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que um Aldeão Bebê perceba você.\n\n§eReação\n\n§7Saudações e comentários do Aldeão Bebê ao conhecer um jogador.",
    },

    [uxyuyr.aezdiy]: {
      title: "Tentar Fazer uma Troca com um Aldeão Bebê",

      bkltkm: "Tentar Fazer Troca com um Bebê",

      body: "§eGatilho\n\n§7Tente interagir com um Aldeão Bebê como se estivesse abrindo uma Troca.\n\n§eReação\n\n§7Respostas explicando por que Aldeões Bebês não podem fazer Trocas.",
    },

    [uxyuyr.jfuftm]: {
      title: "Ver um Jogador com Má Reputação",

      bkltkm: "Jogador com Má Reputação",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão Bebê enquanto você tiver uma Reputação ruim na vila.\n\n§eReação\n\n§7Reações cautelosas a um jogador com Má Reputação.",
    },

    [uxyuyr.fzyrfm]: {
      title: "Ver o Herói da Vila",

      bkltkm: "Ver Herói da Vila",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão Bebê enquanto você tiver o efeito Herói da Vila.\n\n§eReação\n\n§7Reações animadas ao ver o Herói da Vila.",
    },

    [uxyuyr.ahcvzd]: {
      title: "Jogador Machuca um Aldeão Bebê",

      bkltkm: "Jogador Machuca Bebê",

      body: "§eGatilho\n\n§7Ataque diretamente um Aldeão Bebê.\n\n§eReação\n\n§7Reações de dor mais intensas quando o jogador é responsável.",
    },

    [uxyuyr.rlkdqd]: {
      title: "Dar o Bigode do Aldeão #5 a um Aldeão Bebê",

      bkltkm: "Bigode do #5",

      body: "§eGatilho\n\n§7Interaja com um Aldeão Bebê enquanto segura o Bigode do Aldeão #5 para dar a ele o cosmético.\n\n§eReação\n\n§7Falas no estilo do Aldeão #5 após receber o Bigode.",
    },
    [uxyuyr.riezum]: {
      title: "Dar o Microfone do Aldeão #9 a um Aldeão Bebê",

      bkltkm: "Microfone do #9",

      body: "§eGatilho\n\n§7Interaja com um Aldeão Bebê enquanto segura o Microfone do Aldeão #9 para dar a ele o cosmético.\n\n§eReação\n\n§7Falas no estilo de repórter depois de receber o Microfone do Aldeão #9.",
    },

    [uxyuyr.cxeziv]: {
      title: "Dar o Capacete do Homem Testificate a um Aldeão Bebê",

      bkltkm: "Capacete Testificate",

      body: "§eGatilho\n\n§7Interaja com um Aldeão Bebê enquanto segura o Capacete do Homem Testificate para dar a ele o cosmético.\n\n§eReação\n\n§7Falas no estilo de super-herói depois de receber o Capacete do Homem Testificate.",
    },

    [uxyuyr.svdjdk]: {
      title: "Dar o Chapéu do Prefeito a um Bebê",

      body: "§eGatilho\n\n§7Dê o Chapéu do Prefeito a um Aldeão Bebê.\n\n§eReação\n\n§7Falas no estilo de prefeito depois de receber o Chapéu do Prefeito.",
    },

    [uxyuyr.hbalps]: {
      title: "Dar Pão a um Bebê",

      body: "§eGatilho\n\n§7Dê Pão a um Aldeão Bebê.\n\n§eReação\n\n§7Comentários felizes sobre receber Pão.",
    },

    [uxyuyr.hcdvqm]: {
      title: "Dar Cenouras a um Bebê",

      body: "§eGatilho\n\n§7Dê Cenouras a um Aldeão Bebê.\n\n§eReação\n\n§7Comentários felizes sobre receber Cenouras.",
    },

    [uxyuyr.gotjxf]: {
      title: "Dar Batatas a um Bebê",

      body: "§eGatilho\n\n§7Dê Batatas a um Aldeão Bebê.\n\n§eReação\n\n§7Comentários sobre receber Batatas.",
    },

    [uxyuyr.qrdzmt]: {
      title: "Dar Beterraba a um Bebê",

      body: "§eGatilho\n\n§7Dê Beterraba a um Aldeão Bebê.\n\n§eReação\n\n§7Comentários sobre receber Beterraba.",
    },

    [uxyuyr.saxuwk]: {
      title: "Receber Comida de Outro Aldeão",

      bkltkm: "Receber Comida Compartilhada",

      body: "§eGatilho\n\n§7Deixe um Aldeão adulto jogar Comida para um Aldeão Bebê.\n\n§eReação\n\n§7Comentários sobre receber Comida de outro Aldeão.",
    },

    [uxyuyr.gzsztp]: {
      title: "Dar Nome a um Aldeão Bebê",

      body: "§eGatilho\n\n§7Use uma Etiqueta de Nome para dar um nome a um Aldeão Bebê.\n\n§eReação\n\n§7Perguntas e comentários sobre receber um novo nome.",
    },

    [uxyuyr.cmrqhw]: {
      title: 'Dar o Nome "Dragon" a um Bebê',

      body: '§eGatilho\n\n§7Use uma Etiqueta de Nome para dar o nome "Dragon" a um Aldeão Bebê.\n\n§eReação\n\n§7Reações animadas ao receber o nome "Dragon".',
    },

    [uxyuyr.zeykfp]: {
      title: "Ver um Fogo de Artifício",

      body: "§eGatilho\n\n§7Acenda um Fogo de Artifício perto de um Aldeão Bebê.\n\n§eReação\n\n§7Reações animadas ao ver um Fogo de Artifício.",
    },

    [uxyuyr.mqnapy]: {
      title: "Ver um Golem de Ferro",

      body: "§eGatilho\n\n§7Aproxime um Golem de Ferro de um Aldeão Bebê.\n\n§eReação\n\n§7Reações curiosas e animadas ao ver um Golem de Ferro.",
    },

    [uxyuyr.nxalcz]: {
      title: "Tocar um Sino Perto de um Bebê",

      body: "§eGatilho\n\n§7Toque um Sino perto o suficiente para que um Aldeão Bebê possa ouvi-lo.\n\n§eReação\n\n§7Reações ao ouvir o Sino da vila tocar por perto.",
    },

    [uxyuyr.vevdkl]: {
      title: lkryzq.rqqnxr,

      body: "§eGatilho\n\n§7Ataque diretamente um Aldeão.\n\n§eReação\n\n§7Reações irritadas e alarmadas ao ser atacado pelo jogador.",
    },

    [uxyuyr.lpuocy]: {
      title: "Atacado Dentro de Sua Casa",

      bkltkm: "Atacado em Casa",

      body: "§eGatilho\n\n§7Ataque diretamente um Aldeão enquanto ele estiver dentro de sua casa.\n\n§eReação\n\n§7Reações mais fortes ao ser atacado dentro da própria casa.",
    },

    [uxyuyr.slbqfwswxeva]: {
      title: "Atacar um Aldeão em Casa com Testemunhas",

      bkltkm: "Ataque em Casa, Presenciado",

      body: "§eGatilho\n\n§7Ataque um Aldeão dentro de sua casa enquanto outros Aldeões estiverem dentro para testemunhar o ataque.\n\n§eReação\n\n§7Uma troca de falas entre vários Aldeões quando alguém é atacado em casa na frente de testemunhas.",
    },

    [uxyuyr.rueszy]: {
      title: "Atacado com uma Espada",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando uma espada.\n\n§eReação\n\n§7Reações de dor ao ser atingido por uma Espada.",
    },

    [uxyuyr.yjctyw]: {
      title: "Atacado com um Machado",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando um machado.\n\n§eReação\n\n§7Reações alarmadas a um ataque com Machado.",
    },

    [uxyuyr.huhcbd]: {
      title: "Atacado com uma Flecha",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando uma flecha.\n\n§eReação\n\n§7Comentários de dor depois de ser atingido por uma Flecha.",
    },

    [uxyuyr.hmadgp]: {
      title: "Atacado com uma Poção Arremessável",

      bkltkm: "Ataque com Poção Arremessável",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando uma poção arremessável.\n\n§eReação\n\n§7Reações confusas e dolorosas ao ser atingido por uma Poção Arremessável.",
    },

    [uxyuyr.gesjov]: {
      title: "Atacado com um Fogo de Artifício",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando um Fogo de Artifício.\n\n§eReação\n\n§7Reações de dor ao sofrer dano de um Fogo de Artifício.",
    },

    [uxyuyr.qqyjjg]: {
      title: "Atacado com uma Enxada",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando uma enxada.\n\n§eReação\n\n§7Comentários e reações de dor depois de ser atingido por uma Enxada.",
    },

    [uxyuyr.hpnsfu]: {
      title: "Atacado com uma Pá",

      body: "§eGatilho\n\n§7Cause dano diretamente a um Aldeão usando uma pá.\n\n§eReação\n\n§7Reclamações e reações de dor depois de ser atingido por uma Pá.",
    },

    [uxyuyr.mytmrk]: {
      title: "Zumbi",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Zumbi.\n\n§eReação\n\n§7Reações de medo a um ataque de Zumbi, incluindo preocupação em se tornar um.",
    },

    [uxyuyr.qhpyaw]: {
      title: "Saqueador",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Saqueador.\n\n§eReação\n\n§7Reclamações de dor por ter sido atingido por um Saqueador.",
    },

    [uxyuyr.swomdw]: {
      title: "Vingador",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Vingador.\n\n§eReação\n\n§7Reações alarmadas aos ataques com Machado do Vingador.",
    },

    [uxyuyr.nkcoqb]: {
      title: "Evocador",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Evocador.\n\n§eReação\n\n§7Comentários em pânico sobre a magia do Evocador e suas presas invocadas.",
    },

    [uxyuyr.rtikom]: {
      title: "Bruxa",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por uma Bruxa.\n\n§eReação\n\n§7Reclamações sobre ser atingido por poções e atacado por uma Bruxa.",
    },

    [uxyuyr.uveohs]: {
      title: "Devastador",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Devastador.\n\n§eReação\n\n§7Reações em pânico e confusas a um ataque de Devastador.",
    },

    [uxyuyr.caykki]: {
      title: "Vex",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Vex.\n\n§eReação\n\n§7Reações de medo ao ser atacado por um Vex voador.",
    },

    [uxyuyr.hfmwvf]: {
      title: "Zoglin",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um Zoglin.\n\n§eReação\n\n§7Piadas em pânico sobre ser atacado por um Zoglin.",
    },

    [uxyuyr.cifbit]: {
      title: "Queda",

      body: "§eGatilho\n\n§7Faça um Aldeão cair de uma altura suficiente para sofrer dano de queda.\n\n§eReação\n\n§7Comentários e reações de dor depois de sofrer dano de queda.",
    },

    [uxyuyr.etkxko]: {
      title: "Queimando",

      body: "§eGatilho\n\n§7Coloque um Aldeão em chamas e deixe-o sofrer dano de fogo.\n\n§eReação\n\n§7Reações em pânico ao estar em chamas.",
    },

    [uxyuyr.elryje]: {
      title: "Lava",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por lava.\n\n§eReação\n\n§7Reações em pânico ao sofrer dano de Lava.",
    },

    [uxyuyr.igebly]: {
      title: "Congelando",

      body: "§eGatilho\n\n§7Mantenha um Aldeão na Neve Fofa por tempo suficiente para que ele sofra dano de congelamento.\n\n§eReação\n\n§7Comentários e reações de dor enquanto congela.",
    },

    [uxyuyr.rogpvp]: {
      title: "Cacto",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por um cacto.\n\n§eReação\n\n§7Reações de dor ao sofrer dano de Cacto.",
    },

    [uxyuyr.nsxmkr]: {
      title: "Estalagmite Pontiaguda",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por uma Estalagmite Pontiaguda.\n\n§eReação\n\n§7Reações de dor causadas por uma Estalagmite Pontiaguda.",
    },

    [uxyuyr.yzqpvi]: {
      title: "Bigorna em Queda",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por uma bigorna.\n\n§eReação\n\n§7Reações ao ser atingido por uma Bigorna em Queda.",
    },

    [uxyuyr.vnaodx]: {
      title: "Sufocamento",

      body: "§eGatilho\n\n§7Prenda um Aldeão dentro de blocos sólidos por tempo suficiente para que ele sofra dano de sufocamento.\n\n§eReação\n\n§7Reações em pânico ao sufocar.",
    },

    [uxyuyr.fcbygh]: {
      title: "TNT",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano causado por uma explosão de TNT.\n\n§eReação\n\n§7Reações ao sofrer dano de uma explosão de TNT.",
    },

    [uxyuyr.dlrxes]: {
      title: "Bola de Neve",

      body: "§eGatilho\n\n§7Acerte um Aldeão com uma bola de neve.\n\n§eReação\n\n§7Reações de frio e irritação ao ser atingido por uma Bola de Neve.",
    },

    [uxyuyr.gacgtq]: {
      title: "Poção de Dano",

      body: "§eGatilho\n\n§7Acerte um Aldeão com uma poção arremessável que aplique Dano.\n\n§eReação\n\n§7Reações de dor a uma Poção de Dano.",
    },

    [uxyuyr.onindz]: {
      title: "Poção de Veneno",

      body: "§eGatilho\n\n§7Acerte um Aldeão com uma poção arremessável que aplique Veneno.\n\n§eReação\n\n§7Comentários e reclamações depois de ser envenenado.",
    },

    [uxyuyr.xemyaj]: {
      title: "Poção de Lentidão",

      body: "§eGatilho\n\n§7Acerte um Aldeão com uma poção arremessável que aplique Lentidão.\n\n§eReação\n\n§7Comentários sobre ficar lento por causa de uma Poção de Lentidão.",
    },

    [uxyuyr.yebifs]: {
      title: "Poção de Fraqueza",

      body: "§eGatilho\n\n§7Acerte um Aldeão com uma poção arremessável que aplique Fraqueza.\n\n§eReação\n\n§7Comentários sobre ficar enfraquecido por uma Poção de Fraqueza.",
    },

    [uxyuyr.ydigbg]: {
      title: "Ficar Perto do Fogo",

      body: "§eGatilho\n\n§7Faça um Aldeão ficar perto do fogo.\n\n§eReação\n\n§7Comentários preocupados sobre ficar perigosamente perto do Fogo.",
    },

    [uxyuyr.wancdi]: {
      title: "Ficar sobre Magma",

      body: "§eGatilho\n\n§7Faça um Aldeão ficar sobre um Bloco de Magma.\n\n§eReação\n\n§7Reações de dor e confusão ao ficar sobre Magma.",
    },

    [uxyuyr.pmaqgq]: {
      title: "Ver TNT",

      body: "§eGatilho\n\n§7Coloque TNT por perto.\n\n§eReação\n\n§7Reações alarmadas à TNT próxima.",
    },

    [uxyuyr.bodvsv]: {
      title: "Ver um Bloco em Queda",

      body: "§eGatilho\n\n§7Faça um Bloco Afetado pela Gravidade cair.\n\n§eReação\n\n§7Reações surpresas ao ver um Bloco em queda.",
    },

    [uxyuyr.fxbysi]: {
      title: "Libertar um Aldeão Sufocando",

      bkltkm: "Libertar Aldeão Sufocando",

      body: "§eGatilho\n\n§7Libere um Aldeão depois que ele ficar preso e começar a sufocar dentro de blocos.\n\n§eReação\n\n§7Comentários aliviados depois de escapar do sufocamento.",
    },

    [uxyuyr.wyvzhk]: {
      title: "Aldeão se Machuca",

      body: "§eGatilho\n\n§7Faça um Aldeão sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Sons gerais de dor e reações curtas de qualquer fonte de dano.",
    },

    [uxyuyr.uzdxum]: {
      title: "Aldeão Entra em Pânico",

      body: "§eGatilho\n\n§7Espere um Aldeão começar a entrar em pânico por causa de um perigo próximo.\n\n§eReação\n\n§7Diálogo em pânico enquanto foge de um perigo próximo.",
    },

    [uxyuyr.wbbxpo]: {
      title: "Se Acalmar Depois do Perigo",

      body: "§eGatilho\n\n§7Espere um Aldeão se acalmar depois que o perigo próximo passar.\n\n§eReação\n\n§7Comentários aliviados depois que o perigo passa.",
    },

    [uxyuyr.hivgme]: {
      title: "Aldeão Morre",

      body: "§eGatilho\n\n§7Faça um Aldeão morrer por perto.\n\n§eReação\n\n§7Reações finais quando um Aldeão morre.",
    },

    [uxyuyr.pkvhpv]: {
      title: "Ver Outra Entidade se Machucar",

      bkltkm: "Ver Outra Entidade se Machucar",

      body: "§eGatilho\n\n§7Faça outra entidade sofrer dano.\n\n§eReação\n\n§7Comentários quando outra entidade próxima se machuca.",
    },

    [uxyuyr.pmqrpb]: {
      title: "Ver Outro Aldeão Morrer",

      body: "§eGatilho\n\n§7Faça outro Aldeão morrer.\n\n§eReação\n\n§7Reações mais fortes ao testemunhar outro Aldeão morrer.",
    },

    [uxyuyr.xmkwxd]: {
      title: "Concluir uma Troca",

      body: "§eGatilho\n\n§7Conclua uma Troca com um Aldeão enquanto a janela de negociação ainda estiver aberta.\n\n§eReação\n\n§7Comentários imediatos sobre o acordo enquanto a janela de negociação ainda estiver aberta.",
    },

    [uxyuyr.czvvwy]: {
      title: "Fechar a Negociação Depois de Comprar",

      bkltkm: "Fechar Depois de Comprar",

      body: "§eGatilho\n\n§7Conclua pelo menos uma Troca e depois feche a janela de negociação do Aldeão.\n\n§eReação\n\n§7Despedidas após uma Troca bem-sucedida ao fechar a janela de negociação.",
    },

    [uxyuyr.lilimm]: {
      title: "Fechar a Negociação sem Comprar",

      bkltkm: "Sair sem Negociar",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão, não compre nada e depois feche-a.\n\n§eReação\n\n§7Comentários decepcionados ou sarcásticos depois de sair sem comprar nada.",
    },

    [uxyuyr.laztau]: {
      title: "Fechar a Janela de Negociação",

      body: "§eGatilho\n\n§7Feche a janela de negociação de um Aldeão.\n\n§eReação\n\n§7Despedidas gerais quando a janela de negociação fecha.",
    },

    [uxyuyr.nlbhku]: {
      title: "Tentar Negociar com um Aldeão Desempregado",

      bkltkm: "Negociar com Desempregado",

      body: "§eGatilho\n\n§7Tente negociar com um Aldeão desempregado que não tenha uma profissão.\n\n§eReação\n\n§7Explicações e desculpas sobre não ter Trocas para oferecer.",
    },

    [uxyuyr.nukxsf]: {
      title: "Tentar Negociar com um Aldeão Simplório",

      bkltkm: "Negociar com um Aldeão Simplório",

      body: "§eGatilho\n\n§7Tente negociar com um Aldeão Simplório.\n\n§eReação\n\n§7Respostas específicas de Aldeão Simplório quando você tenta negociar.",
    },

    [uxyuyr.lhdgsy]: {
      title: "Recusar um Jogador com Baixa Reputação",

      bkltkm: "Recusa por Baixa Reputação",

      body: "§eGatilho\n\n§7Tente negociar quando sua Reputação com o Aldeão estiver baixa demais para ele aceitar.\n\n§eReação\n\n§7Recusas hostis causadas pela sua baixa Reputação.",
    },

    [uxyuyr.klabhl]: {
      title: "Recusar Negociação Durante uma Incursão",

      bkltkm: "Recusar Durante uma Incursão",

      body: "§eGatilho\n\n§7Tente negociar enquanto o Aldeão estiver reagindo a uma incursão ativa ou a invasores próximos.\n\n§eReação\n\n§7Recusas de negociação enquanto o Aldeão reage a uma Incursão.",
    },

    [uxyuyr.zalmof]: {
      title: "Não Pode Negociar",

      body: "§eGatilho\n\n§7Tente negociar em uma situação em que o Aldeão não possa oferecer uma Troca compatível.\n\n§eReação\n\n§7Respostas gerais quando uma Troca não pode ser concluída.",
    },

    [uxyuyr.clbjww]: {
      title: "Começar a Negociar com Reputação Neutra",

      bkltkm: "Reputação Neutra",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão enquanto sua Reputação na vila estiver neutra.\n\n§eReação\n\n§7Diálogo neutro de abertura da negociação.",
    },

    [uxyuyr.qmdvft]: {
      title: "Começar a Negociar com Baixa Reputação",

      bkltkm: "Baixa Reputação",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão enquanto sua Reputação na vila estiver baixa.\n\n§eReação\n\n§7Diálogo de abertura da negociação pouco amigável por causa da baixa Reputação.",
    },

    [uxyuyr.xduuwm]: {
      title: "Começar a Negociar com Reputação Extremamente Baixa",

      bkltkm: "Reputação Muito Baixa",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão enquanto sua Reputação na vila estiver extremamente baixa.\n\n§eReação\n\n§7Diálogo de abertura da negociação fortemente hostil por causa da Reputação extremamente baixa.",
    },

    [uxyuyr.kuhvdv]: {
      title: "Começar a Negociar com Alta Reputação",

      bkltkm: "Alta Reputação",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão enquanto sua Reputação na vila estiver alta.\n\n§eReação\n\n§7Diálogo amigável de abertura da negociação por causa da alta Reputação.",
    },

    [uxyuyr.vlrsrn]: {
      title: "Começar a Negociar com Reputação Extremamente Alta",

      bkltkm: "Reputação Muito Alta",

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Aldeão enquanto sua Reputação na vila estiver extremamente alta.\n\n§eReação\n\n§7Diálogo de abertura da negociação extremamente entusiasmado por causa da Reputação muito alta.",
    },

    [uxyuyr.hxlyuc]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que um Mercador Ambulante perceba você.\n\n§eReação\n\n§7Saudações e discursos de vendas do Mercador Ambulante.",
    },

    [uxyuyr.stqafd]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto de um Mercador Ambulante enquanto ele estiver vagando por aí.\n\n§eReação\n\n§7Tagarelice ociosa sobre viagens, Negociações e Lhamas.",
    },

    [uxyuyr.yubpbb]: {
      title: lkryzq.btpxnr,

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Mercador Ambulante.\n\n§eReação\n\n§7Discursos de vendas quando a janela de negociação do Mercador Ambulante é aberta.",
    },

    [uxyuyr.bvrbhy]: {
      title: "Concluir uma Troca",

      body: "§eGatilho\n\n§7Conclua uma Troca com um Mercador Ambulante.\n\n§eReação\n\n§7Comentários satisfeitos imediatamente após uma Troca bem-sucedida.",
    },

    [uxyuyr.uzdvsi]: {
      title: lkryzq.ntnerb,

      body: "§eGatilho\n\n§7Conclua pelo menos uma Troca com um Mercador Ambulante e depois feche a janela de negociação.\n\n§eReação\n\n§7Despedidas amigáveis depois de fechar a janela após uma Troca.",
    },

    [uxyuyr.erbcfn]: {
      title: lkryzq.hswdvp,

      body: "§eGatilho\n\n§7Abra a janela de negociação de um Mercador Ambulante, não compre nada e depois feche-a.\n\n§eReação\n\n§7Comentários decepcionados ou sarcásticos depois de sair sem negociar.",
    },

    [uxyuyr.kxoqky]: {
      title: "Pego pela Chuva",

      body: "§eGatilho\n\n§7Mantenha um Mercador Ambulante do lado de fora enquanto estiver chovendo.\n\n§eReação\n\n§7Reclamações e piadas relacionadas à chuva.",
    },

    [uxyuyr.vggdrt]: {
      title: "Usa uma Poção de Invisibilidade",

      bkltkm: "Usar Poção de Invisibilidade",

      body: "§eGatilho\n\n§7Espere um Mercador Ambulante usar sua poção de Invisibilidade.\n\n§eReação\n\n§7Comentários quando o Mercador Ambulante usa uma Poção de Invisibilidade.",
    },

    [uxyuyr.jkeahu]: {
      title: "Usa uma Poção com uma Lhama",

      bkltkm: "Poção com uma Lhama",

      body: "§eGatilho\n\n§7Espere um Mercador Ambulante com uma Lhama usar sua poção de Invisibilidade.\n\n§eReação\n\n§7Comentários extras ao usar uma Poção com uma Lhama.",
    },

    [uxyuyr.myajyt]: {
      title: "Usa uma Poção com Duas Lhamas",

      bkltkm: "Poção com Duas Lhamas",

      body: "§eGatilho\n\n§7Espere um Mercador Ambulante com duas Lhamas usar sua poção de Invisibilidade.\n\n§eReação\n\n§7Comentários extras ao usar uma Poção com duas Lhamas.",
    },

    [uxyuyr.dbzjqi]: {
      title: "Mercador Ambulante Invisível",

      bkltkm: "Mercador Invisível",

      body: "§eGatilho\n\n§7Fique perto de um Mercador Ambulante enquanto ele estiver invisível.\n\n§eReação\n\n§7Piadas e comentários enquanto o Mercador Ambulante estiver invisível.",
    },

    [uxyuyr.jktrnd]: {
      title: "Cortar o Nariz de um Aldeão",

      bkltkm: "Cortar o Nariz",

      body: "§eGatilho\n\n§7Use uma tesoura em um Aldeão para remover seu Nariz.\n\n§eReação\n\n§7Reações irritadas e surpresas ao ter o Nariz cortado.",
    },

    [uxyuyr.dcvgnm]: {
      title: "Aldeão sem Nariz Vagando",

      bkltkm: "Aldeão sem Nariz",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí depois que seu Nariz for removido.\n\n§eReação\n\n§7Comentários e reclamações de um Aldeão sem Nariz enquanto vaga.",
    },

    [uxyuyr.kxrhxt]: {
      title: "Dar um Nariz a um Aldeão",

      body: "§eGatilho\n\n§7Interaja com um Aldeão enquanto segura um Nariz de Aldeão para colocar o nariz de volta.\n\n§eReação\n\n§7Reações ao ter o Nariz devolvido.",
    },

    [uxyuyr.akfekx]: {
      title: "Tentar Dar um Segundo Nariz",

      body: "§eGatilho\n\n§7Tente dar um Nariz de Aldeão a um Aldeão que já tenha um.\n\n§eReação\n\n§7Comentários quando você tenta dar um Nariz a um Aldeão que já tem um.",
    },

    [uxyuyr.kejscw]: {
      title: "Usar um Nariz de Aldeão",

      body: "§eGatilho\n\n§7Use um Nariz de Aldeão.\n\n§eReação\n\n§7Comentários sobre ver o jogador usando um Nariz de Aldeão.",
    },

    [uxyuyr.orogba]: {
      title: "Dar um Cosmético a um Aldeão",

      bkltkm: "Dar um Cosmético",

      body: "§eGatilho\n\n§7Dê a um Aldeão um dos cosméticos do Villager News compatíveis.\n\n§eReação\n\n§7Reações ao receber um dos Cosméticos do Villager News compatíveis.",
    },

    [uxyuyr.wurmgu]: {
      title: "Dar o Capacete do Homem Testificate a um Aldeão",

      bkltkm: "Dar Capacete Testificate",

      body: "§eGatilho\n\n§7Dê a um Aldeão o Capacete do Homem Testificate.\n\n§eReação\n\n§7Comentários sobre receber o Capacete do Homem Testificate.",
    },

    [uxyuyr.ozxzla]: {
      title: "Dar um Bigode a um Aldeão",

      bkltkm: "Dar um Bigode",

      body: "§eGatilho\n\n§7Dê a um Aldeão o Bigode do Aldeão #5.\n\n§eReação\n\n§7Comentários sobre receber o Bigode do Aldeão #5.",
    },

    [uxyuyr.inirxg]: {
      title: "Dar um Microfone a um Aldeão",

      bkltkm: "Dar um Microfone",

      body: "§eGatilho\n\n§7Dê a um Aldeão o Microfone do Aldeão #9.\n\n§eReação\n\n§7Comentários sobre receber o Microfone do Aldeão #9.",
    },

    [uxyuyr.ckjbyd]: {
      title: "Remover um Cosmético",

      body: "§eGatilho\n\n§7Remova um cosmético do Villager News de um Aldeão.\n\n§eReação\n\n§7Reações ao ter um Cosmético removido.",
    },

    [uxyuyr.anrhns]: {
      title: "Ver um Aldeão Usando um Cosmético",

      bkltkm: "Aldeão Usa Cosmético",

      body: "§eGatilho\n\n§7Faça um Aldeão usar um Cosmético do Villager News perto de outro Aldeão.\n\n§eReação\n\n§7Comentários sobre outro Aldeão usando um Cosmético.",
    },

    [uxyuyr.vqlrqf]: {
      title: "Dar uma Placa a um Aldeão",

      body: "§eGatilho\n\n§7Interaja com um Aldeão enquanto segura uma Placa para dar uma a ele.\n\n§eReação\n\n§7Comentários sobre receber e segurar uma Placa.",
    },

    [uxyuyr.ocerok]: {
      title: "Sentar em um Barco",

      body: "§eGatilho\n\n§7Coloque um Aldeão em um barco.\n\n§eReação\n\n§7Tagarelice geral sobre Barcos, desde piadas sobre remar até perguntas sobre para onde estão indo.",
    },

    [uxyuyr.ybwgyt]: {
      title: "Barco em Terra",

      body: "§eGatilho\n\n§7Coloque um Aldeão em um barco que esteja sobre a terra.\n\n§eReação\n\n§7Comentários sobre ficar preso em um Barco em terra.",
    },

    [uxyuyr.tjkgmv]: {
      title: "Barco na Água",

      body: "§eGatilho\n\n§7Coloque um Aldeão em um barco flutuando na água.\n\n§eReação\n\n§7Comentários sobre andar de Barco na Água.",
    },

    [uxyuyr.zvbnea]: {
      title: "Empurrar um Aldeão em um Barco",

      bkltkm: "Empurrar Aldeão no Barco",

      body: "§eGatilho\n\n§7Empurre ou esbarre em um barco enquanto um Aldeão estiver sentado nele.\n\n§eReação\n\n§7Reclamações quando o jogador empurra seu Barco.",
    },

    [uxyuyr.zqfvby]: {
      title: "Dois Aldeões em um Barco",

      body: "§eGatilho\n\n§7Coloque dois Aldeões no mesmo barco.\n\n§eReação\n\n§7Comentários e conversas quando dois Aldeões compartilham um Barco.",
    },

    [uxyuyr.igyvcw]: {
      title: "Sentar em um Minecart",

      body: "§eGatilho\n\n§7Coloque um Aldeão em um Minecart.\n\n§eReação\n\n§7Tagarelice geral sobre Minecarts e perguntas sobre para onde estão indo.",
    },

    [uxyuyr.ifppja]: {
      title: "Minecart em movimento",

      body: "§eGatilho\n\n§7Mova um Minecart enquanto um Aldeão estiver dentro dele.\n\n§eReação\n\n§7Reações extras enquanto o Minecart estiver em movimento.",
    },

    [uxyuyr.zkoewx]: {
      title: "Manhã",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão durante a manhã no jogo.\n\n§eReação\n\n§7Saudações e comentários matinais.",
    },

    [uxyuyr.kopthx]: {
      title: "Tarde",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão durante a tarde no jogo.\n\n§eReação\n\n§7Saudações e comentários da tarde.",
    },

    [uxyuyr.qknpqr]: {
      title: "Noite",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão durante o início da noite no jogo.\n\n§eReação\n\n§7Saudações e comentários do início da noite.",
    },

    [uxyuyr.sotbtt]: {
      title: "Madrugada",

      body: "§eGatilho\n\n§7Aproxime-se de um Aldeão durante a noite no jogo.\n\n§eReação\n\n§7Saudações e comentários noturnos.",
    },

    [uxyuyr.jqgkhy]: {
      title: "Início da Hora",

      body: "§eGatilho\n\n§7Espere até que o relógio do mundo real chegue ao início de uma hora.\n\n§eReação\n\n§7Comentários sobre o relógio do mundo real chegar a uma nova hora.",
    },

    [uxyuyr.mgmzeh]: {
      title: "De Repente Vira Dia",

      body: "§eGatilho\n\n§7Mude o mundo da noite para o dia de repente enquanto um Aldeão estiver ativo.\n\n§eReação\n\n§7Reações confusas ao mundo de repente se tornar dia.",
    },

    [uxyuyr.ohdwnz]: {
      title: "De Repente Vira Noite",

      body: "§eGatilho\n\n§7Mude o mundo do dia para a noite de repente enquanto um Aldeão estiver ativo.\n\n§eReação\n\n§7Reações confusas ao mundo de repente se tornar noite.",
    },

    [uxyuyr.uqwdqn]: {
      title: "O Tempo Avança",

      body: "§eGatilho\n\n§7Avance o tempo enquanto um Aldeão estiver ativo.\n\n§eReação\n\n§7Comentários sobre o salto repentino no ciclo de dia e noite.",
    },

    [uxyuyr.scbmka]: {
      title: "Pego pela Chuva",

      body: "§eGatilho\n\n§7Mantenha um Aldeão do lado de fora enquanto estiver chovendo.\n\n§eReação\n\n§7Reclamações relacionadas à chuva, especialmente sobre molhar o Nariz.",
    },

    [uxyuyr.ikrwzy]: {
      title: "Ver um Relâmpago",

      body: "§eGatilho\n\n§7Faça um relâmpago atingir um local próximo.\n\n§eReação\n\n§7Reações assustadas a um Relâmpago próximo.",
    },

    [uxyuyr.felign]: {
      title: "Vagar por um Lugar Quente",

      body: "§eGatilho\n\n§7Leve um Aldeão para um ambiente quente e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários sobre vagar por ambientes excepcionalmente quentes.",
    },

    [uxyuyr.tftmbe]: {
      title: "Vagar por um Lugar Frio",

      body: "§eGatilho\n\n§7Leve um Aldeão para um ambiente frio e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários sobre vagar por ambientes excepcionalmente frios.",
    },

    [uxyuyr.rweawq]: {
      title: "Ficar em Água Rasa",

      body: "§eGatilho\n\n§7Faça um Aldeão ficar ou andar em água rasa.\n\n§eReação\n\n§7Comentários sobre ficar em Água rasa.",
    },

    [uxyuyr.zpcnhu]: {
      title: "Ficar sobre Gelo",

      body: "§eGatilho\n\n§7Faça um Aldeão ficar sobre Gelo.\n\n§eReação\n\n§7Comentários sobre ficar sobre Gelo.",
    },

    [uxyuyr.ehjhvi]: {
      title: "Ficar sobre Neve",

      body: "§eGatilho\n\n§7Faça um Aldeão ficar sobre Neve.\n\n§eReação\n\n§7Comentários sobre ficar sobre Neve.",
    },

    [uxyuyr.ycynep]: {
      title: "Vagar em Outra Dimensão",

      bkltkm: "Vagar: Outra Dimensão",

      body: "§eGatilho\n\n§7Leve um Aldeão para outra dimensão e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários sobre vagar por algum lugar fora do Mundo Superior.",
    },

    [uxyuyr.zpjrtq]: {
      title: "Vagar no Nether",

      body: "§eGatilho\n\n§7Leve um Aldeão para o Nether e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários específicos sobre vagar pelo Nether.",
    },

    [uxyuyr.wwcbib]: {
      title: "Vagar no End",

      body: "§eGatilho\n\n§7Leve um Aldeão para o End e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários específicos sobre vagar pelo End.",
    },

    [uxyuyr.uhbigm]: {
      title: "Voltar para Casa em Outra Dimensão",

      bkltkm: "Casa em Outra Dimensão",

      body: "§eGatilho\n\n§7Mantenha um Aldeão em outra dimensão até que ele chegue ao momento de sua rotina em que normalmente voltaria para casa.\n\n§eReação\n\n§7Comentários sobre tentar voltar para casa a partir de outra dimensão.",
    },

    [uxyuyr.bvtmmz]: {
      title: "Tentar Voltar para Casa no Nether",

      bkltkm: "Voltar para Casa: Nether",

      body: "§eGatilho\n\n§7Mantenha um Aldeão no Nether até que ele chegue ao momento de sua rotina em que normalmente voltaria para casa.\n\n§eReação\n\n§7Comentários específicos do Nether quando sua rotina manda que ele volte para casa.",
    },

    [uxyuyr.iubjul]: {
      title: "Tentar Voltar para Casa no End",

      bkltkm: "Voltar para Casa: End",

      body: "§eGatilho\n\n§7Mantenha um Aldeão no End até que ele chegue ao momento de sua rotina em que normalmente voltaria para casa.\n\n§eReação\n\n§7Comentários específicos do End quando sua rotina manda que ele volte para casa.",
    },

    [uxyuyr.mgiaiw]: {
      title: "Vagar nas Profundezas Subterrâneas",

      body: "§eGatilho\n\n§7Leve um Aldeão para as profundezas subterrâneas e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários sobre estar nas profundezas subterrâneas.",
    },

    [uxyuyr.qarzxp]: {
      title: "Vagar Bem Acima do Solo",

      bkltkm: "Vagar Bem Acima do Solo",

      body: "§eGatilho\n\n§7Leve um Aldeão para bem acima do solo e deixe-o vagar por aí.\n\n§eReação\n\n§7Comentários e perguntas sobre estar extremamente acima do solo.",
    },

    [uxyuyr.jpucos]: {
      title: "Segunda-feira",

      body: "§eGatilho\n\n§7Jogue na segunda-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de segunda-feira com base no calendário do mundo real.",
    },

    [uxyuyr.gkvlqc]: {
      title: "Vagar em uma Segunda-feira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí na segunda-feira no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nas segundas-feiras do mundo real.",
    },

    [uxyuyr.lgeeem]: {
      title: "Terça-feira",

      body: "§eGatilho\n\n§7Jogue na terça-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de terça-feira com base no calendário do mundo real.",
    },

    [uxyuyr.dkpihl]: {
      title: "Vagar em uma Terça-feira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí na terça-feira no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nas terças-feiras do mundo real.",
    },

    [uxyuyr.qiqiez]: {
      title: "Quarta-feira",

      body: "§eGatilho\n\n§7Jogue na quarta-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de quarta-feira com base no calendário do mundo real.",
    },

    [uxyuyr.gwakiz]: {
      title: "Vagar em uma Quarta-feira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí na quarta-feira no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nas quartas-feiras do mundo real.",
    },

    [uxyuyr.caiyte]: {
      title: "Quinta-feira",

      body: "§eGatilho\n\n§7Jogue na quinta-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de quinta-feira com base no calendário do mundo real.",
    },

    [uxyuyr.zglkgp]: {
      title: "Vagar em uma Quinta-feira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí na quinta-feira no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nas quintas-feiras do mundo real.",
    },

    [uxyuyr.cxtvsx]: {
      title: "Sexta-feira",

      body: "§eGatilho\n\n§7Jogue na sexta-feira no mundo real.\n\n§eReação\n\n§7Comentários específicos de sexta-feira com base no calendário do mundo real.",
    },

    [uxyuyr.ypyumu]: {
      title: "Vagar em uma Sexta-feira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí na sexta-feira no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nas sextas-feiras do mundo real.",
    },

    [uxyuyr.lfhnxz]: {
      title: "Sábado",

      body: "§eGatilho\n\n§7Jogue no sábado no mundo real.\n\n§eReação\n\n§7Comentários específicos de sábado com base no calendário do mundo real.",
    },

    [uxyuyr.ildosa]: {
      title: "Vagar em um Sábado",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí no sábado no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nos sábados do mundo real.",
    },

    [uxyuyr.zckxrc]: {
      title: "Domingo",

      body: "§eGatilho\n\n§7Jogue no domingo no mundo real.\n\n§eReação\n\n§7Comentários específicos de domingo com base no calendário do mundo real.",
    },

    [uxyuyr.uzvatl]: {
      title: "Vagar em um Domingo",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí no domingo no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga nos domingos do mundo real.",
    },

    [uxyuyr.ckngck]: {
      title: "Fim de Semana",

      body: "§eGatilho\n\n§7Jogue no sábado ou domingo no mundo real.\n\n§eReação\n\n§7Comentários específicos do fim de semana com base no calendário do mundo real.",
    },

    [uxyuyr.bkyidl]: {
      title: "Vagar no Fim de Semana",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí no sábado ou domingo no mundo real.\n\n§eReação\n\n§7Tagarelice extra enquanto vaga durante o fim de semana do mundo real.",
    },

    [uxyuyr.uyqiwv]: {
      title: "Ano-Novo",

      body: "§eGatilho\n\n§7Jogue em 1º de janeiro no mundo real.\n\n§eReação\n\n§7Saudações e comentários de Ano-Novo.",
    },

    [uxyuyr.xljknt]: {
      title: "Vagar na Véspera de Ano-Novo",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí em 31 de dezembro no mundo real.\n\n§eReação\n\n§7Comentários sobre vagar na Véspera de Ano-Novo e expectativa pelo novo ano.",
    },

    [uxyuyr.fabiyx]: {
      title: "Dia dos Namorados",

      body: "§eGatilho\n\n§7Jogue em 14 de fevereiro no mundo real.\n\n§eReação\n\n§7Comentários do Dia dos Namorados com base na data do mundo real.",
    },

    [uxyuyr.obitls]: {
      title: "Vagar no Dia da Mentira",

      bkltkm: "Vagar no Dia da Mentira",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí em 1º de abril no mundo real.\n\n§eReação\n\n§7Piadas e comentários sobre o Dia da Mentira enquanto vaga.",
    },

    [uxyuyr.iriuqa]: {
      title: "Aniversário do Minecraft",

      body: "§eGatilho\n\n§7Jogue em 17 de maio, aniversário do Minecraft.\n\n§eReação\n\n§7Comentários comemorativos pelo aniversário do Minecraft.",
    },

    [uxyuyr.qfcwvz]: {
      title: "Sexta-feira 13",

      body: "§eGatilho\n\n§7Jogue em uma sexta-feira 13 do mundo real.\n\n§eReação\n\n§7Piadas sobre sexta-feira 13 e comentários apreensivos.",
    },

    [uxyuyr.mltyge]: {
      title: "Vagar em Outubro",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí durante o mês de outubro.\n\n§eReação\n\n§7Comentários sazonais enquanto vaga durante outubro.",
    },

    [uxyuyr.adhxce]: {
      title: "Halloween",

      body: "§eGatilho\n\n§7Jogue em 31 de outubro no mundo real.\n\n§eReação\n\n§7Piadas e comentários específicos de Halloween.",
    },

    [uxyuyr.tkkegl]: {
      title: "Vagar em Dezembro",

      body: "§eGatilho\n\n§7Deixe um Aldeão vagar por aí durante o mês de dezembro.\n\n§eReação\n\n§7Comentários sazonais enquanto vaga durante dezembro.",
    },

    [uxyuyr.zoqxvy]: {
      title: "Véspera de Natal",

      body: "§eGatilho\n\n§7Jogue em 24 de dezembro no mundo real.\n\n§eReação\n\n§7Comentários da Véspera de Natal e expectativa festiva.",
    },

    [uxyuyr.rclyrl]: {
      title: "Dia de Natal",

      body: "§eGatilho\n\n§7Jogue em 25 de dezembro no mundo real.\n\n§eReação\n\n§7Saudações e comentários festivos do Dia de Natal.",
    },

    [uxyuyr.ebfifz]: {
      title: "Reunião de Aldeões",

      body: "§eGatilho\n\n§7Espere até o final do dia, quando os Aldeões adultos se reúnem ao redor do Sino da vila.\n\n§eReação\n\n§7Tagarelice geral enquanto os Aldeões adultos se reúnem ao redor do Sino da vila.",
    },

    [uxyuyr.wrjbdd]: {
      title: "Aldeões Fofocando",

      body: "§eGatilho\n\n§7Deixe os Aldeões se encontrarem e fofocarem uns com os outros durante o horário de reunião.\n\n§eReação\n\n§7Trocas de fofocas entre Aldeões durante o horário de reunião.",
    },

    [uxyuyr.trphsn]: {
      title: "Não Consegue Encontrar o Sino",

      body: "§eGatilho\n\n§7Faça um Aldeão chegar ao horário de reunião enquanto não consegue encontrar um Sino da vila próximo.\n\n§eReação\n\n§7Comentários confusos ou frustrados quando chega o horário de reunião, mas o Sino não pode ser encontrado.",
    },

    [uxyuyr.gmrypkswxeva]: {
      title: "Dois Aldeões Vagam Juntos",

      bkltkm: "Dois Aldeões Vagando",

      body: "§eGatilho\n\n§7Deixe dois Aldeões vagarem próximos um do outro por tempo suficiente para começarem uma conversa.\n\n§eReação\n\n§7Conversas mais longas e divididas em várias partes entre dois Aldeões vagando juntos.",
    },

    [uxyuyr.bygaxwswxeva]: {
      title: "Um Aldeão Está sem Nariz",

      bkltkm: "Um sem Nariz",

      body: "§eGatilho\n\n§7Deixe dois Aldeões vagarem juntos enquanto um deles estiver sem o Nariz.\n\n§eReação\n\n§7Conversas diferentes enquanto vagam quando um Aldeão está sem o Nariz.",
    },

    [uxyuyr.loicswswxeva]: {
      title: "Dois Aldeões sem Nariz",

      bkltkm: "Dois Aldeões, Sem Narizes",

      body: "§eGatilho\n\n§7Deixe dois Aldeões vagarem juntos enquanto ambos estiverem sem seus narizes.\n\n§eReação\n\n§7Conversas diferentes enquanto vagam quando os dois Aldeões estão sem seus Narizes.",
    },

    [uxyuyr.wrswgiswxeva]: {
      title: "Dois Aldeões em uma Fogueira",

      bkltkm: "Dois em uma Fogueira",

      body: "§eGatilho\n\n§7Mantenha dois Aldeões juntos perto de uma Fogueira por tempo suficiente para começar uma conversa ao redor da Fogueira.\n\n§eReação\n\n§7Conversas mais longas e divididas em várias partes entre dois Aldeões reunidos ao redor de uma Fogueira.",
    },

    [uxyuyr.dpwhhs]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que o Prefeito perceba você.\n\n§eReação\n\n§7Saudações suspeitas e comentários evasivos quando o Prefeito percebe você.",
    },

    [uxyuyr.xxehbq]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto do Prefeito enquanto ele estiver vagando.\n\n§eReação\n\n§7Tagarelice ociosa específica do Prefeito enquanto vaga.",
    },

    [uxyuyr.njyapy]: {
      title: lkryzq.btpxnr,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Prefeito.\n\n§eReação\n\n§7Comentários específicos do Prefeito quando a janela de negociação é aberta.",
    },

    [uxyuyr.bgzmea]: {
      title: lkryzq.hswdvp,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Prefeito, não compre nada e depois feche-a.\n\n§eReação\n\n§7Comentários decepcionados quando você sai sem negociar.",
    },

    [uxyuyr.shrrya]: {
      title: lkryzq.ntnerb,

      body: "§eGatilho\n\n§7Conclua uma Troca com o Prefeito e depois feche a janela de negociação.\n\n§eReação\n\n§7Despedidas satisfeitas depois de uma Troca bem-sucedida.",
    },

    [uxyuyr.cmkesu]: {
      title: "Jogador Usa o Chapéu do Prefeito",

      bkltkm: "Jogador Usa o Chapéu do Prefeito",

      body: "§eGatilho\n\n§7Use o Chapéu do Prefeito perto do Prefeito.\n\n§eReação\n\n§7Reações ao ver você usando o Chapéu do Prefeito.",
    },

    [uxyuyr.ssbhiv]: {
      title: lkryzq.nopqsh,

      body: "§eGatilho\n\n§7Faça o Prefeito sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Reações gerais do Prefeito ao sofrer dano.",
    },

    [uxyuyr.ltdnvy]: {
      title: lkryzq.rqqnxr,

      body: "§eGatilho\n\n§7Ataque diretamente o Prefeito.\n\n§eReação\n\n§7Reações mais fortes do Prefeito quando o jogador é responsável pelo dano.",
    },

    [uxyuyr.xccwah]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que o Aldeão #5 perceba você.\n\n§eReação\n\n§7Saudações do Aldeão #5, comentários de celebridade e apresentações no estilo de Notícias.",
    },

    [uxyuyr.legnsy]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto do Aldeão #5 enquanto ele estiver vagando.\n\n§eReação\n\n§7Tagarelice ociosa com tema de Notícias enquanto o Aldeão #5 vaga.",
    },

    [uxyuyr.sclaoa]: {
      title: lkryzq.btpxnr,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Aldeão #5.\n\n§eReação\n\n§7Comentários do Aldeão #5 quando a janela de negociação é aberta.",
    },

    [uxyuyr.nfdery]: {
      title: lkryzq.ijfhbo,

      body: "§eGatilho\n\n§7Feche a janela de negociação do Aldeão #5.\n\n§eReação\n\n§7Despedidas do Aldeão #5 quando a janela de negociação fecha.",
    },

    [uxyuyr.msofrj]: {
      title: lkryzq.ntnerb,

      body: "§eGatilho\n\n§7Conclua uma Troca com o Aldeão #5 e depois feche a janela de negociação.\n\n§eReação\n\n§7Despedidas do Aldeão #5 após uma Troca bem-sucedida.",
    },

    [uxyuyr.mjyhgw]: {
      title: "Jogador Usa o Bigode do Aldeão #5",

      bkltkm: "Jogador Usa o Bigode",

      body: "§eGatilho\n\n§7Use o Bigode do Aldeão #5 perto do Aldeão #5.\n\n§eReação\n\n§7Comentários sobre ver você usando o Bigode do Aldeão #5.",
    },

    [uxyuyr.behifz]: {
      title: lkryzq.nopqsh,

      body: "§eGatilho\n\n§7Faça o Aldeão #5 sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Reações do Aldeão #5 ao sofrer dano.",
    },

    [uxyuyr.kzogzi]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que o Aldeão #9 perceba você.\n\n§eReação\n\n§7Saudações no estilo de repórter, perguntas e tentativas de entrevista do Aldeão #9.",
    },

    [uxyuyr.ezgbfw]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto do Aldeão #9 enquanto ele estiver vagando.\n\n§eReação\n\n§7Tagarelice ociosa no estilo de repórter enquanto o Aldeão #9 vaga.",
    },

    [uxyuyr.snnkrl]: {
      title: lkryzq.btpxnr,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Aldeão #9.\n\n§eReação\n\n§7Comentários do Aldeão #9 quando a janela de negociação é aberta.",
    },

    [uxyuyr.hvjfnk]: {
      title: lkryzq.ijfhbo,

      body: "§eGatilho\n\n§7Feche a janela de negociação do Aldeão #9.\n\n§eReação\n\n§7Despedidas do Aldeão #9 quando a janela de negociação fecha.",
    },

    [uxyuyr.adhvqz]: {
      title: "Segurando o Microfone",

      body: "§eGatilho\n\n§7Fique perto do Aldeão #9 enquanto ele estiver segurando seu microfone.\n\n§eReação\n\n§7Diálogo extra no estilo de repórter enquanto o Aldeão #9 segura o Microfone.",
    },

    [uxyuyr.wrbvvp]: {
      title: lkryzq.nopqsh,

      body: "§eGatilho\n\n§7Faça o Aldeão #9 sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Reações do Aldeão #9 ao sofrer dano.",
    },

    [uxyuyr.asuufu]: {
      title: lkryzq.rqqnxr,

      body: "§eGatilho\n\n§7Ataque diretamente o Aldeão #9.\n\n§eReação\n\n§7Reações mais fortes do Aldeão #9 quando o jogador é responsável pelo dano.",
    },

    [uxyuyr.nmwmrz]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que o Homem Testificate perceba você.\n\n§eReação\n\n§7Saudações heroicas e ofertas de Troca do Homem Testificate.",
    },

    [uxyuyr.luoibc]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto do Homem Testificate enquanto ele estiver vagando.\n\n§eReação\n\n§7Tagarelice ociosa com tema de super-herói enquanto o Homem Testificate vaga.",
    },

    [uxyuyr.mpbnsm]: {
      title: lkryzq.btpxnr,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Homem Testificate.\n\n§eReação\n\n§7Comentários do Homem Testificate quando a janela de negociação é aberta.",
    },

    [uxyuyr.ctzfzj]: {
      title: lkryzq.ijfhbo,

      body: "§eGatilho\n\n§7Feche a janela de negociação do Homem Testificate.\n\n§eReação\n\n§7Despedidas do Homem Testificate quando a janela de negociação fecha.",
    },

    [uxyuyr.rdugrl]: {
      title: lkryzq.hswdvp,

      body: "§eGatilho\n\n§7Abra a janela de negociação do Homem Testificate, não compre nada e depois feche-a.\n\n§eReação\n\n§7Comentários decepcionados do Homem Testificate quando você sai sem negociar.",
    },

    [uxyuyr.xcjort]: {
      title: lkryzq.ntnerb,

      body: "§eGatilho\n\n§7Conclua uma Troca com o Homem Testificate e depois feche a janela de negociação.\n\n§eReação\n\n§7Despedidas do Homem Testificate após uma Troca bem-sucedida.",
    },

    [uxyuyr.rooiup]: {
      title: "Jogador Usa o Capacete do Homem Testificate",

      bkltkm: "Jogador Usa o Capacete",

      body: "§eGatilho\n\n§7Use o Capacete do Homem Testificate perto do Homem Testificate.\n\n§eReação\n\n§7Comentários sobre ver você usando o Capacete do Homem Testificate.",
    },

    [uxyuyr.pbbywc]: {
      title: "Aldeão Usa o Capacete do Homem Testificate",

      bkltkm: "Aldeão Usa o Capacete",

      body: "§eGatilho\n\n§7Faça outro Aldeão usar o Capacete do Homem Testificate perto do Homem Testificate.\n\n§eReação\n\n§7Comentários quando o Homem Testificate vê outro Aldeão usando seu Capacete.",
    },

    [uxyuyr.fzoqwd]: {
      title: lkryzq.nopqsh,

      body: "§eGatilho\n\n§7Faça o Homem Testificate sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Reações do Homem Testificate ao sofrer dano.",
    },

    [uxyuyr.uvtocs]: {
      title: lkryzq.nkigij,

      body: "§eGatilho\n\n§7Aproxime-se o suficiente para que Wooly perceba você.\n\n§eReação\n\n§7A saudação normalmente pouco entusiasmada de Wooly quando ele percebe você.",
    },

    [uxyuyr.vmohcm]: {
      title: lkryzq.ppzfyu,

      body: "§eGatilho\n\n§7Fique perto de Wooly enquanto ele estiver vagando.\n\n§eReação\n\n§7Tagarelice ociosa e impassível de Wooly enquanto vaga.",
    },

    [uxyuyr.fskcce]: {
      title: "Interagir com Wooly",

      body: "§eGatilho\n\n§7Interaja diretamente com Wooly.\n\n§eReação\n\n§7Respostas impassíveis quando você interage com Wooly.",
    },

    [uxyuyr.jqaekk]: {
      title: "Tosquiar Wooly",

      body: "§eGatilho\n\n§7Use uma tesoura em Wooly.\n\n§eReação\n\n§7Reação de Wooly ao ser tosquiado.",
    },

    [uxyuyr.eyiraw]: {
      title: lkryzq.nopqsh,

      body: "§eGatilho\n\n§7Faça Wooly sofrer dano de qualquer fonte.\n\n§eReação\n\n§7Reações gerais de Wooly ao sofrer dano.",
    },

    [uxyuyr.ncyeaw]: {
      title: lkryzq.rqqnxr,

      body: "§eGatilho\n\n§7Ataque diretamente Wooly.\n\n§eReação\n\n§7Reações mais fortes de Wooly quando o jogador é responsável pelo dano.",
    },

    [uxyuyr.eltxge]: {
      title: "Tentar Alcançar o Aldeão Intocável",

      bkltkm: "Alcançar o Intocável",

      body: "§eGatilho\n\n§7Tente chegar perto do Aldeão Intocável.\n\n§eReação\n\n§7Comentários provocativos enquanto o Aldeão Intocável continua se afastando para ficar fora do alcance.",
    },

    [uxyuyr.lyatyf]: {
      title: "Encontrar o Prefeito",

      body: "§eGatilho\n\n§7Aproxime o Prefeito de um Aldeão comum.\n\n§eReação\n\n§7Comentários de um Aldeão comum sobre encontrar o Prefeito.",
    },

    [uxyuyr.kmvqxe]: {
      title: "Encontrar o Aldeão #5",

      body: "§eGatilho\n\n§7Aproxime o Aldeão #5 de um Aldeão comum.\n\n§eReação\n\n§7Comentários de um Aldeão comum sobre encontrar o Aldeão #5.",
    },

    [uxyuyr.sifqsj]: {
      title: "Encontrar o Aldeão #9",

      body: "§eGatilho\n\n§7Aproxime o Aldeão #9 de um Aldeão comum.\n\n§eReação\n\n§7Comentários de um Aldeão comum sobre encontrar o Aldeão #9.",
    },

    [uxyuyr.zvamyb]: {
      title: "Encontrar o Homem Testificate",

      body: "§eGatilho\n\n§7Aproxime o Homem Testificate de um Aldeão comum.\n\n§eReação\n\n§7Comentários de um Aldeão comum sobre encontrar o Homem Testificate.",
    },
  };
function pgcgto(e) {
  return pyveoi[e];
}
function ibxtkh(e) {
  return eawipt[e];
}
function ddsuoh(e) {
  const n = nrbfth[e];
  return n.bkltkm ?? n.title;
}
function zrnxoq(e) {
  return nrbfth[e].body;
}
var tqnoka = zmbtbz.uktlch(({ elements: e, erfwzq: n }) => {
    const t = [e.Label({ text: zrnxoq(n.hinisi) })];
    return (
      t.push(whbmbl({ dcvebb: !0, dhclhg: n.dhclhg, hinisi: n.iqsqhl })),
      t
    );
  }),
  tqhsxc = { [hbkffr.qllzox]: mqptgt };
function agoaja(e, n) {
  const t = [],
    i = new Set();
  for (const o of e)
    for (const e of negxgt[o]) {
      const o = tqhsxc[e];
      if (void 0 === o)
        for (const o of qoimcn[e])
          i.has(o) ||
            (i.add(o),
            t.push({
              hinisi: o,
              label: ddsuoh(o),
              section: ibxtkh(e),
              link: n(o),
            }));
      else
        for (const r of o) {
          const o = `${e}:${r.header}`;
          i.has(o) ||
            (i.add(o),
            t.push({
              hinisi: e,
              label: r.header,
              section: ibxtkh(e),
              link: n(e),
            }));
        }
    }
  return t;
}
var freanq = zmbtbz.uktlch(({ fbuvpe: e, elements: n, erfwzq: t }) => {
    const i = e.state(""),
      o = e.map(i, (e) => !twbwaq(e)),
      r = [
        n.Spacer(),
        n.Label({ text: t.ulqert }),
        n.Spacer(),
        cxhmyl({ hxfxiz: t.hxfxiz, qhenit: i, dhclhg: t.dhclhg }),
      ],
      a = Object.entries(t.buttons);
    a.length > 0 && r.push(n.Spacer({ mbcmcy: o }));
    for (const [e, l] of a)
      r.push(
        n.Button({
          text: e,
          mbcmcy: o,
          ubztis(e) {
            (i.set(""), t.dhclhg.set(l.hinisi), e.nanuwd.anohai(l.link));
          },
          key: "yumfep",
        }),
      );
    return (
      r.push(
        whbmbl({
          dcvebb: !0,
          dhclhg: t.dhclhg,
          hinisi: t.iqsqhl,
          lhaetn: () => i.set(""),
        }),
      ),
      r
    );
  }),
  hgphbc = [
    juuyxy.guahxn,
    juuyxy.cqapzu,
    juuyxy.xwplil,
    juuyxy.qlcnxv,
    juuyxy.baby_villagers,
    juuyxy.qafldp,
    juuyxy.iuhcfa,
    juuyxy.caxgqd,
    juuyxy.fruxap,
    juuyxy.tvzvms,
    juuyxy.uiemjr,
    juuyxy.tdyddq,
  ],
  negxgt = {
    [juuyxy.guahxn]: [
      hbkffr.akcirp,
      hbkffr.uqowsu,
      hbkffr.qfqrxu,
      hbkffr.ykbnjz,
      hbkffr.eijwgk,
      hbkffr.mjstvm,
      hbkffr.lfyjnk,
      hbkffr.rkhktm,
    ],
    [juuyxy.cqapzu]: [
      hbkffr.ksfwad,
      hbkffr.calzfj,
      hbkffr.nurtuf,
      hbkffr.ysaann,
      hbkffr.fdzeay,
    ],
    [juuyxy.xwplil]: [
      hbkffr.kofiuc,
      hbkffr.nzcigz,
      hbkffr.ulpsru,
      hbkffr.rginym,
      hbkffr.llrygn,
    ],
    [juuyxy.qlcnxv]: [
      hbkffr.ejpqed,
      hbkffr.nttjzb,
      hbkffr.vinmma,
      hbkffr.cclcew,
      hbkffr.tucpej,
      hbkffr.cdgeyw,
    ],
    [juuyxy.baby_villagers]: [
      hbkffr.cnqpja,
      hbkffr.bmctvi,
      hbkffr.euaovt,
      hbkffr.ubuint,
      hbkffr.taykmn,
      hbkffr.buzjmt,
    ],
    [juuyxy.qafldp]: [
      hbkffr.gqkbmm,
      hbkffr.qyrdkp,
      hbkffr.tpjqab,
      hbkffr.vpjubi,
      hbkffr.gjxuxo,
      hbkffr.ldpjjt,
      hbkffr.nejtzv,
    ],
    [juuyxy.iuhcfa]: [
      hbkffr.yenahn,
      hbkffr.zqvgyv,
      hbkffr.hyqmhi,
      hbkffr.wvavrh,
    ],
    [juuyxy.caxgqd]: [hbkffr.pdqcgq, hbkffr.ysxshu, hbkffr.tdrrse],
    [juuyxy.fruxap]: [hbkffr.pppugx, hbkffr.zgronf],
    [juuyxy.tvzvms]: [
      hbkffr.zyfqgm,
      hbkffr.lgyjgs,
      hbkffr.ckecgt,
      hbkffr.cubhuo,
      hbkffr.qllzox,
      hbkffr.mkeewg,
    ],
    [juuyxy.uiemjr]: [hbkffr.hpmjjv, hbkffr.qiqjcm, hbkffr.yoerqx],
    [juuyxy.tdyddq]: [
      hbkffr.glftid,
      hbkffr.bksfzp,
      hbkffr.kvrkge,
      hbkffr.yqqvyb,
      hbkffr.sdujnf,
      hbkffr.ipnprs,
      hbkffr.mjmrtm,
    ],
  },
  qoimcn = {
    [hbkffr.uqowsu]: [
      uxyuyr.xfpjxq,
      uxyuyr.cavwps,
      uxyuyr.zsmvzb,
      uxyuyr.cstyvg,
    ],
    [hbkffr.akcirp]: [
      uxyuyr.edrtbe,
      uxyuyr.dfdkli,
      uxyuyr.qxgbwi,
      uxyuyr.ajexrq,
      uxyuyr.pizztd,
      uxyuyr.akerwb,
      uxyuyr.tdomqw,
      uxyuyr.gytgzn,
      uxyuyr.vgysma,
      uxyuyr.qfhrlh,
      uxyuyr.elexev,
      uxyuyr.pfelrr,
    ],
    [hbkffr.qfqrxu]: [
      uxyuyr.ijeqws,
      uxyuyr.lqxmlx,
      uxyuyr.hiuxvo,
      uxyuyr.mewsnd,
    ],
    [hbkffr.ykbnjz]: [
      uxyuyr.nwkgqg,
      uxyuyr.xgfebs,
      uxyuyr.smcrvj,
      uxyuyr.psgzod,
      uxyuyr.pdiwlk,
    ],
    [hbkffr.eijwgk]: [
      uxyuyr.khepip,
      uxyuyr.ezoztr,
      uxyuyr.agbxhr,
      uxyuyr.puhgbq,
      uxyuyr.iifcei,
      uxyuyr.nxxita,
      uxyuyr.gigkln,
      uxyuyr.raozeh,
      uxyuyr.pswvuu,
      uxyuyr.qfygop,
      uxyuyr.ekdktf,
      uxyuyr.xxkdpo,
      uxyuyr.iqtydx,
      uxyuyr.fqbjfv,
    ],
    [hbkffr.mjstvm]: [
      uxyuyr.tfzlsw,
      uxyuyr.zstdjn,
      uxyuyr.stuirs,
      uxyuyr.omgcte,
      uxyuyr.kcbenk,
      uxyuyr.jlendb,
      uxyuyr.gnetsk,
    ],
    [hbkffr.lfyjnk]: [
      uxyuyr.fhhqxg,
      uxyuyr.ohtblt,
      uxyuyr.ibcrvx,
      uxyuyr.xuyypm,
      uxyuyr.arzojk,
    ],
    [hbkffr.rkhktm]: [
      uxyuyr.hzjycq,
      uxyuyr.dxcjqn,
      uxyuyr.elcjbb,
      uxyuyr.bipqej,
      uxyuyr.hevyeb,
    ],
    [hbkffr.ksfwad]: [
      uxyuyr.zejman,
      uxyuyr.awappv,
      uxyuyr.ejvpis,
      uxyuyr.clzrea,
      uxyuyr.qimink,
      uxyuyr.osbwpz,
      uxyuyr.mabmbl,
      uxyuyr.rptjbd,
      uxyuyr.pclmft,
    ],
    [hbkffr.calzfj]: [
      uxyuyr.knywuy,
      uxyuyr.ujkoue,
      uxyuyr.kdfaao,
      uxyuyr.ktkmhn,
      uxyuyr.jtsycy,
      uxyuyr.nxveql,
      uxyuyr.fpcepp,
      uxyuyr.nziize,
      uxyuyr.dgrgul,
      uxyuyr.ckniqq,
      uxyuyr.fazcvg,
      uxyuyr.mxmrpn,
      uxyuyr.xezbvo,
      uxyuyr.vubtsn,
      uxyuyr.fvdzot,
      uxyuyr.sbolpm,
      uxyuyr.fwiopr,
      uxyuyr.zqzrsm,
      uxyuyr.gxepwi,
      uxyuyr.cudgjr,
      uxyuyr.oimgrg,
      uxyuyr.gnbpco,
      uxyuyr.vgufsp,
      uxyuyr.vxhugl,
      uxyuyr.clpxov,
      uxyuyr.afdrdd,
      uxyuyr.lnhdzn,
      uxyuyr.gjsote,
      uxyuyr.ydfscf,
      uxyuyr.ahabbf,
      uxyuyr.veaotb,
      uxyuyr.gzzzpj,
      uxyuyr.whbvvh,
      uxyuyr.ehtaer,
      uxyuyr.tqnwzp,
      uxyuyr.negvfb,
      uxyuyr.rseoxb,
      uxyuyr.kodgox,
      uxyuyr.qyvelv,
      uxyuyr.nocwsk,
      uxyuyr.ejbqqc,
      uxyuyr.rtmqmc,
      uxyuyr.piupkf,
      uxyuyr.fdqdok,
      uxyuyr.yckvyp,
    ],
    [hbkffr.nurtuf]: [
      uxyuyr.pgwqkg,
      uxyuyr.gzhbtb,
      uxyuyr.xwcoip,
      uxyuyr.crvciv,
      uxyuyr.myylcq,
      uxyuyr.tgggsl,
      uxyuyr.ididel,
      uxyuyr.knjvae,
      uxyuyr.bpgyfa,
      uxyuyr.rykqwl,
      uxyuyr.mfsmim,
      uxyuyr.xzpfwa,
      uxyuyr.gtqcjn,
      uxyuyr.dyvwqv,
      uxyuyr.iqvgzk,
      uxyuyr.hojlbk,
      uxyuyr.ykycil,
      uxyuyr.lifrrj,
      uxyuyr.mjmgwj,
      uxyuyr.lnlwnl,
      uxyuyr.thmfsh,
      uxyuyr.jexbze,
      uxyuyr.wykqdb,
      uxyuyr.pvwkxp,
      uxyuyr.ktzfvk,
      uxyuyr.yiwncn,
      uxyuyr.kljgyu,
      uxyuyr.xemdbt,
    ],
    [hbkffr.ysaann]: [
      uxyuyr.hqmkpb,
      uxyuyr.qbuuop,
      uxyuyr.bimuve,
      uxyuyr.cdltxm,
      uxyuyr.hlxzen,
      uxyuyr.nwiopk,
      uxyuyr.jggged,
      uxyuyr.adtdit,
      uxyuyr.wsjvjd,
      uxyuyr.wwmhos,
      uxyuyr.edjqet,
      uxyuyr.ntnicx,
    ],
    [hbkffr.fdzeay]: [
      uxyuyr.oqjzko,
      uxyuyr.tavxec,
      uxyuyr.xbttae,
      uxyuyr.nrzcxn,
      uxyuyr.uvgkny,
      uxyuyr.lfwbvu,
      uxyuyr.repalq,
      uxyuyr.oziqss,
    ],
    [hbkffr.kofiuc]: [
      uxyuyr.dortcb,
      uxyuyr.xtooxu,
      uxyuyr.wboncy,
      uxyuyr.gcoysc,
      uxyuyr.atwycp,
      uxyuyr.lqzdqk,
      uxyuyr.bxbibd,
      uxyuyr.nsosix,
      uxyuyr.gtmfpl,
      uxyuyr.rzvitn,
      uxyuyr.odwhzm,
      uxyuyr.lwcrnt,
      uxyuyr.yeqxvm,
      uxyuyr.nwzvkb,
      uxyuyr.dxeaal,
      uxyuyr.nwlcij,
      uxyuyr.jicosq,
      uxyuyr.satsrf,
      uxyuyr.xxjkmo,
    ],
    [hbkffr.nzcigz]: [
      uxyuyr.lvzfcv,
      uxyuyr.jqdeef,
      uxyuyr.vxycol,
      uxyuyr.afxbav,
      uxyuyr.hggexx,
      uxyuyr.ynxhfb,
      uxyuyr.vvntcf,
      uxyuyr.aqxgxh,
      uxyuyr.rbkjsr,
      uxyuyr.bmimxe,
      uxyuyr.yazvzs,
      uxyuyr.ysbfqu,
      uxyuyr.spfefr,
      uxyuyr.pguaqp,
      uxyuyr.trkugw,
      uxyuyr.aqtshb,
      uxyuyr.neoxpu,
      uxyuyr.swewsr,
      uxyuyr.toolzx,
      uxyuyr.vapupl,
      uxyuyr.turlrl,
      uxyuyr.ozmthf,
      uxyuyr.tqishj,
    ],
    [hbkffr.ulpsru]: [
      uxyuyr.hzahog,
      uxyuyr.htibul,
      uxyuyr.eccdga,
      uxyuyr.pjcwec,
      uxyuyr.knjdbi,
      uxyuyr.hyzwpr,
      uxyuyr.sxikgq,
      uxyuyr.ualabt,
      uxyuyr.gggzar,
      uxyuyr.qqtnlm,
      uxyuyr.zvwapr,
      uxyuyr.nstwos,
      uxyuyr.qltnkz,
      uxyuyr.hwltxk,
      uxyuyr.vakwgb,
    ],
    [hbkffr.rginym]: [
      uxyuyr.cuchwi,
      uxyuyr.qffeco,
      uxyuyr.kxjegd,
      uxyuyr.ktdshy,
      uxyuyr.rnlher,
      uxyuyr.lxvofx,
    ],
    [hbkffr.llrygn]: [uxyuyr.dmcjmd, uxyuyr.gjtuqd],
    [hbkffr.ejpqed]: [uxyuyr.lvigit, uxyuyr.gbxzxv, uxyuyr.uookqp],
    [hbkffr.nttjzb]: [
      uxyuyr.zndzjx,
      uxyuyr.qawras,
      uxyuyr.sdhkke,
      uxyuyr.umdvtb,
      uxyuyr.tgggoh,
      uxyuyr.fezzjw,
      uxyuyr.opxfuo,
      uxyuyr.fzjope,
      uxyuyr.djpksc,
      uxyuyr.ueczyh,
      uxyuyr.wuoloh,
      uxyuyr.hkowex,
      uxyuyr.ljewqf,
      uxyuyr.yldlzt,
      uxyuyr.ivktls,
      uxyuyr.ccpvqj,
      uxyuyr.aobqjt,
      uxyuyr.tdvtmn,
      uxyuyr.ywzhwz,
      uxyuyr.fltegg,
      uxyuyr.pnvkfy,
    ],
    [hbkffr.vinmma]: [
      uxyuyr.wkfbuv,
      uxyuyr.uqguqj,
      uxyuyr.ioxtmt,
      uxyuyr.asqzby,
      uxyuyr.ctptjt,
      uxyuyr.viwaal,
    ],
    [hbkffr.cclcew]: [
      uxyuyr.dxmmiu,
      uxyuyr.vkhrme,
      uxyuyr.ujyxfg,
      uxyuyr.zywcju,
      uxyuyr.zjwpzi,
      uxyuyr.habfnx,
      uxyuyr.ebyrtk,
      uxyuyr.rlfjux,
      uxyuyr.bbjsik,
      uxyuyr.nqktml,
      uxyuyr.ytydjc,
      uxyuyr.locuih,
      uxyuyr.cvltyw,
    ],
    [hbkffr.tucpej]: [uxyuyr.fbuabj, uxyuyr.pbmrxx, uxyuyr.kzemrz],
    [hbkffr.cdgeyw]: [
      uxyuyr.spfsrr,
      uxyuyr.qmpcxi,
      uxyuyr.armupg,
      uxyuyr.vskjkl,
      uxyuyr.ivumgm,
    ],
    [hbkffr.cnqpja]: [
      uxyuyr.lgjtnf,
      uxyuyr.smvnbj,
      uxyuyr.rfnirh,
      uxyuyr.vhwksn,
      uxyuyr.vbclem,
      uxyuyr.ecslqo,
      uxyuyr.wsxfok,
      uxyuyr.ggitzq,
      uxyuyr.abfwiv,
      uxyuyr.durjjd,
      uxyuyr.wkwcrf,
      uxyuyr.msemoe,
    ],
    [hbkffr.bmctvi]: [
      uxyuyr.wtuguc,
      uxyuyr.aezdiy,
      uxyuyr.jfuftm,
      uxyuyr.fzyrfm,
      uxyuyr.ahcvzd,
    ],
    [hbkffr.euaovt]: [
      uxyuyr.rlkdqd,
      uxyuyr.riezum,
      uxyuyr.cxeziv,
      uxyuyr.svdjdk,
    ],
    [hbkffr.ubuint]: [
      uxyuyr.hbalps,
      uxyuyr.hcdvqm,
      uxyuyr.gotjxf,
      uxyuyr.qrdzmt,
      uxyuyr.saxuwk,
    ],
    [hbkffr.taykmn]: [uxyuyr.gzsztp, uxyuyr.cmrqhw],
    [hbkffr.buzjmt]: [uxyuyr.zeykfp, uxyuyr.mqnapy, uxyuyr.nxalcz],
    [hbkffr.gqkbmm]: [
      uxyuyr.vevdkl,
      uxyuyr.lpuocy,
      uxyuyr.slbqfwswxeva,
      uxyuyr.rueszy,
      uxyuyr.yjctyw,
      uxyuyr.huhcbd,
      uxyuyr.hmadgp,
      uxyuyr.gesjov,
      uxyuyr.qqyjjg,
      uxyuyr.hpnsfu,
    ],
    [hbkffr.qyrdkp]: [
      uxyuyr.mytmrk,
      uxyuyr.qhpyaw,
      uxyuyr.swomdw,
      uxyuyr.nkcoqb,
      uxyuyr.rtikom,
      uxyuyr.uveohs,
      uxyuyr.caykki,
      uxyuyr.hfmwvf,
    ],
    [hbkffr.tpjqab]: [
      uxyuyr.cifbit,
      uxyuyr.etkxko,
      uxyuyr.elryje,
      uxyuyr.igebly,
      uxyuyr.rogpvp,
      uxyuyr.nsxmkr,
      uxyuyr.yzqpvi,
      uxyuyr.vnaodx,
      uxyuyr.fcbygh,
    ],
    [hbkffr.vpjubi]: [
      uxyuyr.dlrxes,
      uxyuyr.gacgtq,
      uxyuyr.onindz,
      uxyuyr.xemyaj,
      uxyuyr.yebifs,
    ],
    [hbkffr.gjxuxo]: [
      uxyuyr.ydigbg,
      uxyuyr.wancdi,
      uxyuyr.pmaqgq,
      uxyuyr.bodvsv,
      uxyuyr.fxbysi,
    ],
    [hbkffr.ldpjjt]: [
      uxyuyr.wyvzhk,
      uxyuyr.uzdxum,
      uxyuyr.wbbxpo,
      uxyuyr.hivgme,
    ],
    [hbkffr.nejtzv]: [uxyuyr.pkvhpv, uxyuyr.pmqrpb],
    [hbkffr.yenahn]: [
      uxyuyr.xmkwxd,
      uxyuyr.czvvwy,
      uxyuyr.lilimm,
      uxyuyr.laztau,
    ],
    [hbkffr.zqvgyv]: [
      uxyuyr.nlbhku,
      uxyuyr.nukxsf,
      uxyuyr.lhdgsy,
      uxyuyr.klabhl,
      uxyuyr.zalmof,
    ],
    [hbkffr.hyqmhi]: [
      uxyuyr.clbjww,
      uxyuyr.qmdvft,
      uxyuyr.xduuwm,
      uxyuyr.kuhvdv,
      uxyuyr.vlrsrn,
    ],
    [hbkffr.wvavrh]: [
      uxyuyr.hxlyuc,
      uxyuyr.stqafd,
      uxyuyr.yubpbb,
      uxyuyr.bvrbhy,
      uxyuyr.uzdvsi,
      uxyuyr.erbcfn,
      uxyuyr.kxoqky,
      uxyuyr.vggdrt,
      uxyuyr.jkeahu,
      uxyuyr.myajyt,
      uxyuyr.dbzjqi,
    ],
    [hbkffr.pdqcgq]: [
      uxyuyr.jktrnd,
      uxyuyr.dcvgnm,
      uxyuyr.kxrhxt,
      uxyuyr.akfekx,
      uxyuyr.kejscw,
    ],
    [hbkffr.ysxshu]: [
      uxyuyr.orogba,
      uxyuyr.wurmgu,
      uxyuyr.ozxzla,
      uxyuyr.inirxg,
      uxyuyr.ckjbyd,
      uxyuyr.anrhns,
    ],
    [hbkffr.tdrrse]: [uxyuyr.vqlrqf],
    [hbkffr.pppugx]: [
      uxyuyr.ocerok,
      uxyuyr.ybwgyt,
      uxyuyr.tjkgmv,
      uxyuyr.zvbnea,
      uxyuyr.zqfvby,
    ],
    [hbkffr.zgronf]: [uxyuyr.igyvcw, uxyuyr.ifppja],
    [hbkffr.zyfqgm]: [
      uxyuyr.zkoewx,
      uxyuyr.kopthx,
      uxyuyr.qknpqr,
      uxyuyr.sotbtt,
      uxyuyr.jqgkhy,
      uxyuyr.mgmzeh,
      uxyuyr.ohdwnz,
      uxyuyr.uqwdqn,
    ],
    [hbkffr.lgyjgs]: [
      uxyuyr.scbmka,
      uxyuyr.ikrwzy,
      uxyuyr.felign,
      uxyuyr.tftmbe,
      uxyuyr.rweawq,
      uxyuyr.zpcnhu,
      uxyuyr.ehjhvi,
    ],
    [hbkffr.ckecgt]: [
      uxyuyr.ycynep,
      uxyuyr.zpjrtq,
      uxyuyr.wwcbib,
      uxyuyr.uhbigm,
      uxyuyr.bvtmmz,
      uxyuyr.iubjul,
    ],
    [hbkffr.cubhuo]: [uxyuyr.mgiaiw, uxyuyr.qarzxp],
    [hbkffr.qllzox]: [],
    [hbkffr.mkeewg]: [
      uxyuyr.uyqiwv,
      uxyuyr.xljknt,
      uxyuyr.fabiyx,
      uxyuyr.obitls,
      uxyuyr.iriuqa,
      uxyuyr.qfcwvz,
      uxyuyr.mltyge,
      uxyuyr.adhxce,
      uxyuyr.tkkegl,
      uxyuyr.zoqxvy,
      uxyuyr.rclyrl,
    ],
    [hbkffr.hpmjjv]: [uxyuyr.ebfifz, uxyuyr.wrjbdd, uxyuyr.trphsn],
    [hbkffr.qiqjcm]: [
      uxyuyr.gmrypkswxeva,
      uxyuyr.bygaxwswxeva,
      uxyuyr.loicswswxeva,
    ],
    [hbkffr.yoerqx]: [uxyuyr.wrswgiswxeva],
    [hbkffr.glftid]: [
      uxyuyr.dpwhhs,
      uxyuyr.xxehbq,
      uxyuyr.njyapy,
      uxyuyr.bgzmea,
      uxyuyr.shrrya,
      uxyuyr.cmkesu,
      uxyuyr.ssbhiv,
      uxyuyr.ltdnvy,
    ],
    [hbkffr.bksfzp]: [
      uxyuyr.xccwah,
      uxyuyr.legnsy,
      uxyuyr.sclaoa,
      uxyuyr.nfdery,
      uxyuyr.msofrj,
      uxyuyr.mjyhgw,
      uxyuyr.behifz,
    ],
    [hbkffr.kvrkge]: [
      uxyuyr.kzogzi,
      uxyuyr.ezgbfw,
      uxyuyr.snnkrl,
      uxyuyr.hvjfnk,
      uxyuyr.adhvqz,
      uxyuyr.wrbvvp,
      uxyuyr.asuufu,
    ],
    [hbkffr.yqqvyb]: [
      uxyuyr.nmwmrz,
      uxyuyr.luoibc,
      uxyuyr.mpbnsm,
      uxyuyr.ctzfzj,
      uxyuyr.rdugrl,
      uxyuyr.xcjort,
      uxyuyr.rooiup,
      uxyuyr.pbbywc,
      uxyuyr.fzoqwd,
    ],
    [hbkffr.sdujnf]: [
      uxyuyr.uvtocs,
      uxyuyr.vmohcm,
      uxyuyr.fskcce,
      uxyuyr.jqaekk,
      uxyuyr.eyiraw,
      uxyuyr.ncyeaw,
    ],
    [hbkffr.ipnprs]: [uxyuyr.eltxge],
    [hbkffr.mjmrtm]: [
      uxyuyr.lyatyf,
      uxyuyr.kmvqxe,
      uxyuyr.sifqsj,
      uxyuyr.zvamyb,
    ],
  },
  tpnctt = {
    home: uhmfzy,
    sxjosu: "Guia",
    xrcvxx: "Visão Geral",
    qzbxij: "Aldeões Especiais",
    birpba: "Cosméticos",
    ynokwd: "Gatilhos e Reações",
    nlheqm: "Informações Gerais",
    settings: "Configurações",
    oqakoi: "Redes Sociais",
    support: "Suporte",

    ...pyveoi,
    ...eawipt,
    ...Object.fromEntries(Object.entries(nrbfth).map(([e, n]) => [e, n.title])),
  };
function ossigs(e) {
  const n = zmbtbz.vcoenw(uhmfzy),
    t = map(n, (e) => tpnctt[e] ?? uhmfzy);
  return zmbtbz
    .dzcckw({
      closeButton: !1,
      title: t,
      lrxfyp: "home",
      pages: {
        home: ({ link: e }) =>
          hekmzk({
            ulqert: srriea,
            dhclhg: n,
            iqsqhl: "",
            buttons: {
              Guia: { link: e("sxjosu"), hinisi: "sxjosu" },
              Configurações: { link: e("settings"), hinisi: "settings" },
              Redes_sociais: { link: e("oqakoi"), hinisi: "oqakoi" },
              Suporte: { link: e("support"), hinisi: "support" },
            },
          }),
        sxjosu: ({ link: e }) =>
          hekmzk({
            ulqert: xhyuay,
            iqsqhl: "",
            dhclhg: n,
            buttons: {
              "Visão Geral": { link: e(fsfrpf), hinisi: fsfrpf },
              "Aldeões Especiais": { link: e(glrecb), hinisi: glrecb },
              Cosméticos: { link: e(xofwvt), hinisi: xofwvt },
              "Gatilhos e Reações": { link: e(ddjhwh), hinisi: ddjhwh },
            },
            backButton: !0,
          }),
        xrcvxx: () =>
          zskpep({
            kvksvp:
              "Tudo o que você precisa saber sobre O Jornal Aldeão, desde como os Aldeões se comportam até os recursos que os trazem à vida.",
            entries: cphxgl,
            iqsqhl: "sxjosu",
            dhclhg: n,
          }),
        qzbxij: () =>
          zskpep({
            kvksvp:
              "Aldeões especiais são Aldeões que têm uma aparência única e podem ter comportamentos diferentes dos Aldeões normais.",
            entries: gucqpi,
            iqsqhl: "sxjosu",
            dhclhg: n,
          }),
        birpba: () =>
          zskpep({
            dhclhg: n,
            iqsqhl: "sxjosu",
            kvksvp:
              "Colete cosméticos especiais para usar você mesmo ou dar aos Aldeões.",
            entries: vxivvu,
          }),
        ynokwd: ({ link: e }) =>
          freanq({
            ulqert: lloshc,
            iqsqhl: "sxjosu",
            dhclhg: n,
            hxfxiz: agoaja(hgphbc, e),
            buttons: {
              "Informações Gerais": { link: e(qaewxq), hinisi: qaewxq },
              ...Object.fromEntries(
                hgphbc.map((n) => [pgcgto(n), { link: e(n), hinisi: n }]),
              ),
            },
          }),
        nlheqm: () =>
          zskpep({
            kvksvp:
              "Como os gatilhos e reações funcionam e por que os Aldeões podem não responder todas as vezes.",
            entries: vhbeyx,
            iqsqhl: ddjhwh,
            dhclhg: n,
          }),
        [juuyxy.guahxn]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.guahxn].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.cqapzu]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.cqapzu].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.xwplil]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.xwplil].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.qlcnxv]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.qlcnxv].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.baby_villagers]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.baby_villagers].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.qafldp]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.qafldp].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.iuhcfa]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.iuhcfa].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.caxgqd]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.caxgqd].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.fruxap]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.fruxap].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.tvzvms]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.tvzvms].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.uiemjr]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.uiemjr].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [juuyxy.tdyddq]: ({ link: e }) =>
          hekmzk({
            ulqert: abrlxg,
            iqsqhl: ddjhwh,
            dhclhg: n,
            buttons: Object.fromEntries(
              negxgt[juuyxy.tdyddq].map((n) => [
                ibxtkh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.uqowsu]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.uqowsu].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.akcirp]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.akcirp].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.qfqrxu]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.qfqrxu].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ykbnjz]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ykbnjz].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.eijwgk]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.eijwgk].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.mjstvm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.mjstvm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.lfyjnk]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.lfyjnk].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.rkhktm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.guahxn,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.rkhktm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ksfwad]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.cqapzu,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ksfwad].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.calzfj]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.cqapzu,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.calzfj].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.nurtuf]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.cqapzu,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.nurtuf].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ysaann]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.cqapzu,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ysaann].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.fdzeay]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.cqapzu,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.fdzeay].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.kofiuc]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.xwplil,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.kofiuc].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.nzcigz]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.xwplil,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.nzcigz].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ulpsru]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.xwplil,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ulpsru].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.rginym]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.xwplil,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.rginym].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.llrygn]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.xwplil,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.llrygn].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ejpqed]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ejpqed].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.nttjzb]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.nttjzb].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.vinmma]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.vinmma].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.cclcew]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.cclcew].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.tucpej]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.tucpej].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.cdgeyw]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qlcnxv,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.cdgeyw].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.cnqpja]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.cnqpja].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.bmctvi]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.bmctvi].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.euaovt]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.euaovt].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ubuint]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ubuint].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.taykmn]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.taykmn].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.buzjmt]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.baby_villagers,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.buzjmt].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.gqkbmm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.gqkbmm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.qyrdkp]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.qyrdkp].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.tpjqab]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.tpjqab].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.vpjubi]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.vpjubi].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.gjxuxo]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.gjxuxo].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ldpjjt]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ldpjjt].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.nejtzv]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.qafldp,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.nejtzv].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.yenahn]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.iuhcfa,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.yenahn].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.zqvgyv]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.iuhcfa,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.zqvgyv].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.hyqmhi]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.iuhcfa,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.hyqmhi].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.wvavrh]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.iuhcfa,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.wvavrh].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.pdqcgq]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.caxgqd,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.pdqcgq].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ysxshu]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.caxgqd,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ysxshu].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.tdrrse]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.caxgqd,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.tdrrse].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.pppugx]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.fruxap,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.pppugx].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.zgronf]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.fruxap,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.zgronf].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.zyfqgm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.zyfqgm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.lgyjgs]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.lgyjgs].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ckecgt]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ckecgt].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.cubhuo]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.cubhuo].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.qllzox]: () =>
          zskpep({
            kvksvp:
              "Navegue pelos gatilhos abaixo para ver como ativá-los e qual reação eles causam.",
            entries: mqptgt,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
          }),
        [hbkffr.mkeewg]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tvzvms,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.mkeewg].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.hpmjjv]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.uiemjr,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.hpmjjv].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.qiqjcm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.uiemjr,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.qiqjcm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.yoerqx]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.uiemjr,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.yoerqx].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.glftid]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.glftid].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.bksfzp]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.bksfzp].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.kvrkge]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.kvrkge].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.yqqvyb]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.yqqvyb].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.sdujnf]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.sdujnf].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.ipnprs]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.ipnprs].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [hbkffr.mjmrtm]: ({ link: e }) =>
          hekmzk({
            ulqert: ulshpd,
            iqsqhl: juuyxy.tdyddq,
            dhclhg: n,
            buttons: Object.fromEntries(
              qoimcn[hbkffr.mjmrtm].map((n) => [
                ddsuoh(n),
                { link: e(n), hinisi: n },
              ]),
            ),
            backButton: !0,
          }),
        [uxyuyr.xfpjxq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.uqowsu, hinisi: uxyuyr.xfpjxq }),
        [uxyuyr.cavwps]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.uqowsu, hinisi: uxyuyr.cavwps }),
        [uxyuyr.zsmvzb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.uqowsu, hinisi: uxyuyr.zsmvzb }),
        [uxyuyr.cstyvg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.uqowsu, hinisi: uxyuyr.cstyvg }),
        [uxyuyr.edrtbe]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.edrtbe }),
        [uxyuyr.dfdkli]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.dfdkli }),
        [uxyuyr.qxgbwi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.qxgbwi }),
        [uxyuyr.ajexrq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.ajexrq }),
        [uxyuyr.pizztd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.pizztd }),
        [uxyuyr.akerwb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.akerwb }),
        [uxyuyr.tdomqw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.tdomqw }),
        [uxyuyr.gytgzn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.gytgzn }),
        [uxyuyr.vgysma]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.vgysma }),
        [uxyuyr.qfhrlh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.qfhrlh }),
        [uxyuyr.elexev]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.elexev }),
        [uxyuyr.pfelrr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.akcirp, hinisi: uxyuyr.pfelrr }),
        [uxyuyr.ijeqws]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qfqrxu, hinisi: uxyuyr.ijeqws }),
        [uxyuyr.lqxmlx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qfqrxu, hinisi: uxyuyr.lqxmlx }),
        [uxyuyr.hiuxvo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qfqrxu, hinisi: uxyuyr.hiuxvo }),
        [uxyuyr.mewsnd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qfqrxu, hinisi: uxyuyr.mewsnd }),
        [uxyuyr.nwkgqg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ykbnjz, hinisi: uxyuyr.nwkgqg }),
        [uxyuyr.xgfebs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ykbnjz, hinisi: uxyuyr.xgfebs }),
        [uxyuyr.smcrvj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ykbnjz, hinisi: uxyuyr.smcrvj }),
        [uxyuyr.psgzod]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ykbnjz, hinisi: uxyuyr.psgzod }),
        [uxyuyr.pdiwlk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ykbnjz, hinisi: uxyuyr.pdiwlk }),
        [uxyuyr.khepip]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.khepip }),
        [uxyuyr.ezoztr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.ezoztr }),
        [uxyuyr.agbxhr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.agbxhr }),
        [uxyuyr.puhgbq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.puhgbq }),
        [uxyuyr.iifcei]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.iifcei }),
        [uxyuyr.nxxita]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.nxxita }),
        [uxyuyr.gigkln]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.gigkln }),
        [uxyuyr.raozeh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.raozeh }),
        [uxyuyr.pswvuu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.pswvuu }),
        [uxyuyr.qfygop]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.qfygop }),
        [uxyuyr.ekdktf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.ekdktf }),
        [uxyuyr.xxkdpo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.xxkdpo }),
        [uxyuyr.iqtydx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.iqtydx }),
        [uxyuyr.fqbjfv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.eijwgk, hinisi: uxyuyr.fqbjfv }),
        [uxyuyr.tfzlsw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.tfzlsw }),
        [uxyuyr.zstdjn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.zstdjn }),
        [uxyuyr.stuirs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.stuirs }),
        [uxyuyr.omgcte]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.omgcte }),
        [uxyuyr.kcbenk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.kcbenk }),
        [uxyuyr.jlendb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.jlendb }),
        [uxyuyr.gnetsk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjstvm, hinisi: uxyuyr.gnetsk }),
        [uxyuyr.fhhqxg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lfyjnk, hinisi: uxyuyr.fhhqxg }),
        [uxyuyr.ohtblt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lfyjnk, hinisi: uxyuyr.ohtblt }),
        [uxyuyr.ibcrvx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lfyjnk, hinisi: uxyuyr.ibcrvx }),
        [uxyuyr.xuyypm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lfyjnk, hinisi: uxyuyr.xuyypm }),
        [uxyuyr.arzojk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lfyjnk, hinisi: uxyuyr.arzojk }),
        [uxyuyr.hzjycq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rkhktm, hinisi: uxyuyr.hzjycq }),
        [uxyuyr.dxcjqn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rkhktm, hinisi: uxyuyr.dxcjqn }),
        [uxyuyr.elcjbb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rkhktm, hinisi: uxyuyr.elcjbb }),
        [uxyuyr.bipqej]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rkhktm, hinisi: uxyuyr.bipqej }),
        [uxyuyr.hevyeb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rkhktm, hinisi: uxyuyr.hevyeb }),
        [uxyuyr.zejman]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.zejman }),
        [uxyuyr.awappv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.awappv }),
        [uxyuyr.ejvpis]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.ejvpis }),
        [uxyuyr.clzrea]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.clzrea }),
        [uxyuyr.qimink]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.qimink }),
        [uxyuyr.osbwpz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.osbwpz }),
        [uxyuyr.mabmbl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.mabmbl }),
        [uxyuyr.rptjbd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.rptjbd }),
        [uxyuyr.pclmft]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ksfwad, hinisi: uxyuyr.pclmft }),
        [uxyuyr.knywuy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.knywuy }),
        [uxyuyr.ujkoue]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ujkoue }),
        [uxyuyr.kdfaao]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.kdfaao }),
        [uxyuyr.ktkmhn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ktkmhn }),
        [uxyuyr.jtsycy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.jtsycy }),
        [uxyuyr.nxveql]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.nxveql }),
        [uxyuyr.fpcepp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.fpcepp }),
        [uxyuyr.nziize]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.nziize }),
        [uxyuyr.dgrgul]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.dgrgul }),
        [uxyuyr.ckniqq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ckniqq }),
        [uxyuyr.fazcvg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.fazcvg }),
        [uxyuyr.mxmrpn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.mxmrpn }),
        [uxyuyr.xezbvo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.xezbvo }),
        [uxyuyr.vubtsn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.vubtsn }),
        [uxyuyr.fvdzot]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.fvdzot }),
        [uxyuyr.sbolpm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.sbolpm }),
        [uxyuyr.fwiopr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.fwiopr }),
        [uxyuyr.zqzrsm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.zqzrsm }),
        [uxyuyr.gxepwi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.gxepwi }),
        [uxyuyr.cudgjr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.cudgjr }),
        [uxyuyr.oimgrg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.oimgrg }),
        [uxyuyr.gnbpco]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.gnbpco }),
        [uxyuyr.vgufsp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.vgufsp }),
        [uxyuyr.vxhugl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.vxhugl }),
        [uxyuyr.clpxov]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.clpxov }),
        [uxyuyr.afdrdd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.afdrdd }),
        [uxyuyr.lnhdzn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.lnhdzn }),
        [uxyuyr.gjsote]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.gjsote }),
        [uxyuyr.ydfscf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ydfscf }),
        [uxyuyr.ahabbf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ahabbf }),
        [uxyuyr.veaotb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.veaotb }),
        [uxyuyr.gzzzpj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.gzzzpj }),
        [uxyuyr.whbvvh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.whbvvh }),
        [uxyuyr.ehtaer]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ehtaer }),
        [uxyuyr.tqnwzp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.tqnwzp }),
        [uxyuyr.negvfb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.negvfb }),
        [uxyuyr.rseoxb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.rseoxb }),
        [uxyuyr.kodgox]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.kodgox }),
        [uxyuyr.qyvelv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.qyvelv }),
        [uxyuyr.nocwsk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.nocwsk }),
        [uxyuyr.ejbqqc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.ejbqqc }),
        [uxyuyr.rtmqmc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.rtmqmc }),
        [uxyuyr.piupkf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.piupkf }),
        [uxyuyr.fdqdok]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.fdqdok }),
        [uxyuyr.yckvyp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.calzfj, hinisi: uxyuyr.yckvyp }),
        [uxyuyr.pgwqkg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.pgwqkg }),
        [uxyuyr.gzhbtb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.gzhbtb }),
        [uxyuyr.xwcoip]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.xwcoip }),
        [uxyuyr.crvciv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.crvciv }),
        [uxyuyr.myylcq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.myylcq }),
        [uxyuyr.tgggsl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.tgggsl }),
        [uxyuyr.ididel]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.ididel }),
        [uxyuyr.knjvae]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.knjvae }),
        [uxyuyr.bpgyfa]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.bpgyfa }),
        [uxyuyr.rykqwl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.rykqwl }),
        [uxyuyr.mfsmim]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.mfsmim }),
        [uxyuyr.xzpfwa]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.xzpfwa }),
        [uxyuyr.gtqcjn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.gtqcjn }),
        [uxyuyr.dyvwqv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.dyvwqv }),
        [uxyuyr.iqvgzk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.iqvgzk }),
        [uxyuyr.hojlbk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.hojlbk }),
        [uxyuyr.ykycil]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.ykycil }),
        [uxyuyr.lifrrj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.lifrrj }),
        [uxyuyr.mjmgwj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.mjmgwj }),
        [uxyuyr.lnlwnl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.lnlwnl }),
        [uxyuyr.thmfsh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.thmfsh }),
        [uxyuyr.jexbze]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.jexbze }),
        [uxyuyr.wykqdb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.wykqdb }),
        [uxyuyr.pvwkxp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.pvwkxp }),
        [uxyuyr.ktzfvk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.ktzfvk }),
        [uxyuyr.yiwncn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.yiwncn }),
        [uxyuyr.kljgyu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.kljgyu }),
        [uxyuyr.xemdbt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nurtuf, hinisi: uxyuyr.xemdbt }),
        [uxyuyr.hqmkpb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.hqmkpb }),
        [uxyuyr.qbuuop]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.qbuuop }),
        [uxyuyr.bimuve]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.bimuve }),
        [uxyuyr.cdltxm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.cdltxm }),
        [uxyuyr.hlxzen]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.hlxzen }),
        [uxyuyr.nwiopk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.nwiopk }),
        [uxyuyr.jggged]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.jggged }),
        [uxyuyr.adtdit]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.adtdit }),
        [uxyuyr.wsjvjd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.wsjvjd }),
        [uxyuyr.wwmhos]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.wwmhos }),
        [uxyuyr.edjqet]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.edjqet }),
        [uxyuyr.ntnicx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysaann, hinisi: uxyuyr.ntnicx }),
        [uxyuyr.oqjzko]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.oqjzko }),
        [uxyuyr.tavxec]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.tavxec }),
        [uxyuyr.xbttae]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.xbttae }),
        [uxyuyr.nrzcxn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.nrzcxn }),
        [uxyuyr.uvgkny]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.uvgkny }),
        [uxyuyr.lfwbvu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.lfwbvu }),
        [uxyuyr.repalq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.repalq }),
        [uxyuyr.oziqss]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.fdzeay, hinisi: uxyuyr.oziqss }),
        [uxyuyr.dortcb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.dortcb }),
        [uxyuyr.xtooxu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.xtooxu }),
        [uxyuyr.wboncy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.wboncy }),
        [uxyuyr.gcoysc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.gcoysc }),
        [uxyuyr.atwycp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.atwycp }),
        [uxyuyr.lqzdqk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.lqzdqk }),
        [uxyuyr.bxbibd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.bxbibd }),
        [uxyuyr.nsosix]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.nsosix }),
        [uxyuyr.gtmfpl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.gtmfpl }),
        [uxyuyr.rzvitn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.rzvitn }),
        [uxyuyr.odwhzm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.odwhzm }),
        [uxyuyr.lwcrnt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.lwcrnt }),
        [uxyuyr.yeqxvm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.yeqxvm }),
        [uxyuyr.nwzvkb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.nwzvkb }),
        [uxyuyr.dxeaal]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.dxeaal }),
        [uxyuyr.nwlcij]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.nwlcij }),
        [uxyuyr.jicosq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.jicosq }),
        [uxyuyr.satsrf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.satsrf }),
        [uxyuyr.xxjkmo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kofiuc, hinisi: uxyuyr.xxjkmo }),
        [uxyuyr.lvzfcv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.lvzfcv }),
        [uxyuyr.jqdeef]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.jqdeef }),
        [uxyuyr.vxycol]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.vxycol }),
        [uxyuyr.afxbav]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.afxbav }),
        [uxyuyr.hggexx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.hggexx }),
        [uxyuyr.ynxhfb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.ynxhfb }),
        [uxyuyr.vvntcf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.vvntcf }),
        [uxyuyr.aqxgxh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.aqxgxh }),
        [uxyuyr.rbkjsr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.rbkjsr }),
        [uxyuyr.bmimxe]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.bmimxe }),
        [uxyuyr.yazvzs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.yazvzs }),
        [uxyuyr.ysbfqu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.ysbfqu }),
        [uxyuyr.spfefr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.spfefr }),
        [uxyuyr.pguaqp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.pguaqp }),
        [uxyuyr.trkugw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.trkugw }),
        [uxyuyr.aqtshb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.aqtshb }),
        [uxyuyr.neoxpu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.neoxpu }),
        [uxyuyr.swewsr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.swewsr }),
        [uxyuyr.toolzx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.toolzx }),
        [uxyuyr.vapupl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.vapupl }),
        [uxyuyr.turlrl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.turlrl }),
        [uxyuyr.ozmthf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.ozmthf }),
        [uxyuyr.tqishj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nzcigz, hinisi: uxyuyr.tqishj }),
        [uxyuyr.hzahog]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.hzahog }),
        [uxyuyr.htibul]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.htibul }),
        [uxyuyr.eccdga]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.eccdga }),
        [uxyuyr.pjcwec]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.pjcwec }),
        [uxyuyr.knjdbi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.knjdbi }),
        [uxyuyr.hyzwpr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.hyzwpr }),
        [uxyuyr.sxikgq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.sxikgq }),
        [uxyuyr.ualabt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.ualabt }),
        [uxyuyr.gggzar]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.gggzar }),
        [uxyuyr.qqtnlm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.qqtnlm }),
        [uxyuyr.zvwapr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.zvwapr }),
        [uxyuyr.nstwos]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.nstwos }),
        [uxyuyr.qltnkz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.qltnkz }),
        [uxyuyr.hwltxk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.hwltxk }),
        [uxyuyr.vakwgb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ulpsru, hinisi: uxyuyr.vakwgb }),
        [uxyuyr.cuchwi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.cuchwi }),
        [uxyuyr.qffeco]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.qffeco }),
        [uxyuyr.kxjegd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.kxjegd }),
        [uxyuyr.ktdshy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.ktdshy }),
        [uxyuyr.rnlher]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.rnlher }),
        [uxyuyr.lxvofx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.rginym, hinisi: uxyuyr.lxvofx }),
        [uxyuyr.dmcjmd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.llrygn, hinisi: uxyuyr.dmcjmd }),
        [uxyuyr.gjtuqd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.llrygn, hinisi: uxyuyr.gjtuqd }),
        [uxyuyr.lvigit]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ejpqed, hinisi: uxyuyr.lvigit }),
        [uxyuyr.gbxzxv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ejpqed, hinisi: uxyuyr.gbxzxv }),
        [uxyuyr.uookqp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ejpqed, hinisi: uxyuyr.uookqp }),
        [uxyuyr.zndzjx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.zndzjx }),
        [uxyuyr.qawras]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.qawras }),
        [uxyuyr.sdhkke]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.sdhkke }),
        [uxyuyr.umdvtb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.umdvtb }),
        [uxyuyr.tgggoh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.tgggoh }),
        [uxyuyr.fezzjw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.fezzjw }),
        [uxyuyr.opxfuo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.opxfuo }),
        [uxyuyr.fzjope]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.fzjope }),
        [uxyuyr.djpksc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.djpksc }),
        [uxyuyr.ueczyh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.ueczyh }),
        [uxyuyr.wuoloh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.wuoloh }),
        [uxyuyr.hkowex]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.hkowex }),
        [uxyuyr.ljewqf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.ljewqf }),
        [uxyuyr.yldlzt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.yldlzt }),
        [uxyuyr.ivktls]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.ivktls }),
        [uxyuyr.ccpvqj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.ccpvqj }),
        [uxyuyr.aobqjt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.aobqjt }),
        [uxyuyr.tdvtmn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.tdvtmn }),
        [uxyuyr.ywzhwz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.ywzhwz }),
        [uxyuyr.fltegg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.fltegg }),
        [uxyuyr.pnvkfy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nttjzb, hinisi: uxyuyr.pnvkfy }),
        [uxyuyr.wkfbuv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.wkfbuv }),
        [uxyuyr.uqguqj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.uqguqj }),
        [uxyuyr.ioxtmt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.ioxtmt }),
        [uxyuyr.asqzby]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.asqzby }),
        [uxyuyr.ctptjt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.ctptjt }),
        [uxyuyr.viwaal]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vinmma, hinisi: uxyuyr.viwaal }),
        [uxyuyr.dxmmiu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.dxmmiu }),
        [uxyuyr.vkhrme]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.vkhrme }),
        [uxyuyr.ujyxfg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.ujyxfg }),
        [uxyuyr.zywcju]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.zywcju }),
        [uxyuyr.zjwpzi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.zjwpzi }),
        [uxyuyr.habfnx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.habfnx }),
        [uxyuyr.ebyrtk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.ebyrtk }),
        [uxyuyr.rlfjux]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.rlfjux }),
        [uxyuyr.bbjsik]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.bbjsik }),
        [uxyuyr.nqktml]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.nqktml }),
        [uxyuyr.ytydjc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.ytydjc }),
        [uxyuyr.locuih]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.locuih }),
        [uxyuyr.cvltyw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cclcew, hinisi: uxyuyr.cvltyw }),
        [uxyuyr.fbuabj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tucpej, hinisi: uxyuyr.fbuabj }),
        [uxyuyr.pbmrxx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tucpej, hinisi: uxyuyr.pbmrxx }),
        [uxyuyr.kzemrz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tucpej, hinisi: uxyuyr.kzemrz }),
        [uxyuyr.spfsrr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cdgeyw, hinisi: uxyuyr.spfsrr }),
        [uxyuyr.qmpcxi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cdgeyw, hinisi: uxyuyr.qmpcxi }),
        [uxyuyr.armupg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cdgeyw, hinisi: uxyuyr.armupg }),
        [uxyuyr.vskjkl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cdgeyw, hinisi: uxyuyr.vskjkl }),
        [uxyuyr.ivumgm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cdgeyw, hinisi: uxyuyr.ivumgm }),
        [uxyuyr.lgjtnf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.lgjtnf }),
        [uxyuyr.smvnbj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.smvnbj }),
        [uxyuyr.rfnirh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.rfnirh }),
        [uxyuyr.vhwksn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.vhwksn }),
        [uxyuyr.vbclem]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.vbclem }),
        [uxyuyr.ecslqo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.ecslqo }),
        [uxyuyr.wsxfok]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.wsxfok }),
        [uxyuyr.ggitzq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.ggitzq }),
        [uxyuyr.abfwiv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.abfwiv }),
        [uxyuyr.durjjd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.durjjd }),
        [uxyuyr.wkwcrf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.wkwcrf }),
        [uxyuyr.msemoe]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cnqpja, hinisi: uxyuyr.msemoe }),
        [uxyuyr.wtuguc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bmctvi, hinisi: uxyuyr.wtuguc }),
        [uxyuyr.aezdiy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bmctvi, hinisi: uxyuyr.aezdiy }),
        [uxyuyr.jfuftm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bmctvi, hinisi: uxyuyr.jfuftm }),
        [uxyuyr.fzyrfm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bmctvi, hinisi: uxyuyr.fzyrfm }),
        [uxyuyr.ahcvzd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bmctvi, hinisi: uxyuyr.ahcvzd }),
        [uxyuyr.rlkdqd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.euaovt, hinisi: uxyuyr.rlkdqd }),
        [uxyuyr.riezum]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.euaovt, hinisi: uxyuyr.riezum }),
        [uxyuyr.cxeziv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.euaovt, hinisi: uxyuyr.cxeziv }),
        [uxyuyr.svdjdk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.euaovt, hinisi: uxyuyr.svdjdk }),
        [uxyuyr.hbalps]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ubuint, hinisi: uxyuyr.hbalps }),
        [uxyuyr.hcdvqm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ubuint, hinisi: uxyuyr.hcdvqm }),
        [uxyuyr.gotjxf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ubuint, hinisi: uxyuyr.gotjxf }),
        [uxyuyr.qrdzmt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ubuint, hinisi: uxyuyr.qrdzmt }),
        [uxyuyr.saxuwk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ubuint, hinisi: uxyuyr.saxuwk }),
        [uxyuyr.gzsztp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.taykmn, hinisi: uxyuyr.gzsztp }),
        [uxyuyr.cmrqhw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.taykmn, hinisi: uxyuyr.cmrqhw }),
        [uxyuyr.zeykfp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.buzjmt, hinisi: uxyuyr.zeykfp }),
        [uxyuyr.mqnapy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.buzjmt, hinisi: uxyuyr.mqnapy }),
        [uxyuyr.nxalcz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.buzjmt, hinisi: uxyuyr.nxalcz }),
        [uxyuyr.vevdkl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.vevdkl }),
        [uxyuyr.lpuocy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.lpuocy }),
        [uxyuyr.slbqfwswxeva]: () =>
          tqnoka({
            dhclhg: n,
            iqsqhl: hbkffr.gqkbmm,
            hinisi: uxyuyr.slbqfwswxeva,
          }),
        [uxyuyr.rueszy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.rueszy }),
        [uxyuyr.yjctyw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.yjctyw }),
        [uxyuyr.huhcbd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.huhcbd }),
        [uxyuyr.hmadgp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.hmadgp }),
        [uxyuyr.gesjov]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.gesjov }),
        [uxyuyr.qqyjjg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.qqyjjg }),
        [uxyuyr.hpnsfu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gqkbmm, hinisi: uxyuyr.hpnsfu }),
        [uxyuyr.mytmrk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.mytmrk }),
        [uxyuyr.qhpyaw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.qhpyaw }),
        [uxyuyr.swomdw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.swomdw }),
        [uxyuyr.nkcoqb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.nkcoqb }),
        [uxyuyr.rtikom]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.rtikom }),
        [uxyuyr.uveohs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.uveohs }),
        [uxyuyr.caykki]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.caykki }),
        [uxyuyr.hfmwvf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qyrdkp, hinisi: uxyuyr.hfmwvf }),
        [uxyuyr.cifbit]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.cifbit }),
        [uxyuyr.etkxko]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.etkxko }),
        [uxyuyr.elryje]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.elryje }),
        [uxyuyr.igebly]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.igebly }),
        [uxyuyr.rogpvp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.rogpvp }),
        [uxyuyr.nsxmkr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.nsxmkr }),
        [uxyuyr.yzqpvi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.yzqpvi }),
        [uxyuyr.vnaodx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.vnaodx }),
        [uxyuyr.fcbygh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tpjqab, hinisi: uxyuyr.fcbygh }),
        [uxyuyr.dlrxes]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vpjubi, hinisi: uxyuyr.dlrxes }),
        [uxyuyr.gacgtq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vpjubi, hinisi: uxyuyr.gacgtq }),
        [uxyuyr.onindz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vpjubi, hinisi: uxyuyr.onindz }),
        [uxyuyr.xemyaj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vpjubi, hinisi: uxyuyr.xemyaj }),
        [uxyuyr.yebifs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.vpjubi, hinisi: uxyuyr.yebifs }),
        [uxyuyr.ydigbg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gjxuxo, hinisi: uxyuyr.ydigbg }),
        [uxyuyr.wancdi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gjxuxo, hinisi: uxyuyr.wancdi }),
        [uxyuyr.pmaqgq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gjxuxo, hinisi: uxyuyr.pmaqgq }),
        [uxyuyr.bodvsv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gjxuxo, hinisi: uxyuyr.bodvsv }),
        [uxyuyr.fxbysi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.gjxuxo, hinisi: uxyuyr.fxbysi }),
        [uxyuyr.wyvzhk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ldpjjt, hinisi: uxyuyr.wyvzhk }),
        [uxyuyr.uzdxum]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ldpjjt, hinisi: uxyuyr.uzdxum }),
        [uxyuyr.wbbxpo]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ldpjjt, hinisi: uxyuyr.wbbxpo }),
        [uxyuyr.hivgme]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ldpjjt, hinisi: uxyuyr.hivgme }),
        [uxyuyr.pkvhpv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nejtzv, hinisi: uxyuyr.pkvhpv }),
        [uxyuyr.pmqrpb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.nejtzv, hinisi: uxyuyr.pmqrpb }),
        [uxyuyr.xmkwxd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yenahn, hinisi: uxyuyr.xmkwxd }),
        [uxyuyr.czvvwy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yenahn, hinisi: uxyuyr.czvvwy }),
        [uxyuyr.lilimm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yenahn, hinisi: uxyuyr.lilimm }),
        [uxyuyr.laztau]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yenahn, hinisi: uxyuyr.laztau }),
        [uxyuyr.nlbhku]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zqvgyv, hinisi: uxyuyr.nlbhku }),
        [uxyuyr.nukxsf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zqvgyv, hinisi: uxyuyr.nukxsf }),
        [uxyuyr.lhdgsy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zqvgyv, hinisi: uxyuyr.lhdgsy }),
        [uxyuyr.klabhl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zqvgyv, hinisi: uxyuyr.klabhl }),
        [uxyuyr.zalmof]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zqvgyv, hinisi: uxyuyr.zalmof }),
        [uxyuyr.clbjww]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hyqmhi, hinisi: uxyuyr.clbjww }),
        [uxyuyr.qmdvft]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hyqmhi, hinisi: uxyuyr.qmdvft }),
        [uxyuyr.xduuwm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hyqmhi, hinisi: uxyuyr.xduuwm }),
        [uxyuyr.kuhvdv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hyqmhi, hinisi: uxyuyr.kuhvdv }),
        [uxyuyr.vlrsrn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hyqmhi, hinisi: uxyuyr.vlrsrn }),
        [uxyuyr.hxlyuc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.hxlyuc }),
        [uxyuyr.stqafd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.stqafd }),
        [uxyuyr.yubpbb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.yubpbb }),
        [uxyuyr.bvrbhy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.bvrbhy }),
        [uxyuyr.uzdvsi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.uzdvsi }),
        [uxyuyr.erbcfn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.erbcfn }),
        [uxyuyr.kxoqky]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.kxoqky }),
        [uxyuyr.vggdrt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.vggdrt }),
        [uxyuyr.jkeahu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.jkeahu }),
        [uxyuyr.myajyt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.myajyt }),
        [uxyuyr.dbzjqi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.wvavrh, hinisi: uxyuyr.dbzjqi }),
        [uxyuyr.jktrnd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pdqcgq, hinisi: uxyuyr.jktrnd }),
        [uxyuyr.dcvgnm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pdqcgq, hinisi: uxyuyr.dcvgnm }),
        [uxyuyr.kxrhxt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pdqcgq, hinisi: uxyuyr.kxrhxt }),
        [uxyuyr.akfekx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pdqcgq, hinisi: uxyuyr.akfekx }),
        [uxyuyr.kejscw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pdqcgq, hinisi: uxyuyr.kejscw }),
        [uxyuyr.orogba]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.orogba }),
        [uxyuyr.wurmgu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.wurmgu }),
        [uxyuyr.ozxzla]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.ozxzla }),
        [uxyuyr.inirxg]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.inirxg }),
        [uxyuyr.ckjbyd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.ckjbyd }),
        [uxyuyr.anrhns]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ysxshu, hinisi: uxyuyr.anrhns }),
        [uxyuyr.vqlrqf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.tdrrse, hinisi: uxyuyr.vqlrqf }),
        [uxyuyr.ocerok]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pppugx, hinisi: uxyuyr.ocerok }),
        [uxyuyr.ybwgyt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pppugx, hinisi: uxyuyr.ybwgyt }),
        [uxyuyr.tjkgmv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pppugx, hinisi: uxyuyr.tjkgmv }),
        [uxyuyr.zvbnea]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pppugx, hinisi: uxyuyr.zvbnea }),
        [uxyuyr.zqfvby]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.pppugx, hinisi: uxyuyr.zqfvby }),
        [uxyuyr.igyvcw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zgronf, hinisi: uxyuyr.igyvcw }),
        [uxyuyr.ifppja]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zgronf, hinisi: uxyuyr.ifppja }),
        [uxyuyr.zkoewx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.zkoewx }),
        [uxyuyr.kopthx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.kopthx }),
        [uxyuyr.qknpqr]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.qknpqr }),
        [uxyuyr.sotbtt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.sotbtt }),
        [uxyuyr.jqgkhy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.jqgkhy }),
        [uxyuyr.mgmzeh]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.mgmzeh }),
        [uxyuyr.ohdwnz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.ohdwnz }),
        [uxyuyr.uqwdqn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.zyfqgm, hinisi: uxyuyr.uqwdqn }),
        [uxyuyr.scbmka]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.scbmka }),
        [uxyuyr.ikrwzy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.ikrwzy }),
        [uxyuyr.felign]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.felign }),
        [uxyuyr.tftmbe]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.tftmbe }),
        [uxyuyr.rweawq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.rweawq }),
        [uxyuyr.zpcnhu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.zpcnhu }),
        [uxyuyr.ehjhvi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.lgyjgs, hinisi: uxyuyr.ehjhvi }),
        [uxyuyr.ycynep]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.ycynep }),
        [uxyuyr.zpjrtq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.zpjrtq }),
        [uxyuyr.wwcbib]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.wwcbib }),
        [uxyuyr.uhbigm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.uhbigm }),
        [uxyuyr.bvtmmz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.bvtmmz }),
        [uxyuyr.iubjul]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ckecgt, hinisi: uxyuyr.iubjul }),
        [uxyuyr.mgiaiw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cubhuo, hinisi: uxyuyr.mgiaiw }),
        [uxyuyr.qarzxp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.cubhuo, hinisi: uxyuyr.qarzxp }),
        [uxyuyr.jpucos]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.jpucos }),
        [uxyuyr.gkvlqc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.gkvlqc }),
        [uxyuyr.lgeeem]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.lgeeem }),
        [uxyuyr.dkpihl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.dkpihl }),
        [uxyuyr.qiqiez]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.qiqiez }),
        [uxyuyr.gwakiz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.gwakiz }),
        [uxyuyr.caiyte]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.caiyte }),
        [uxyuyr.zglkgp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.zglkgp }),
        [uxyuyr.cxtvsx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.cxtvsx }),
        [uxyuyr.ypyumu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.ypyumu }),
        [uxyuyr.lfhnxz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.lfhnxz }),
        [uxyuyr.ildosa]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.ildosa }),
        [uxyuyr.zckxrc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.zckxrc }),
        [uxyuyr.uzvatl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.uzvatl }),
        [uxyuyr.ckngck]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.ckngck }),
        [uxyuyr.bkyidl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.qllzox, hinisi: uxyuyr.bkyidl }),
        [uxyuyr.uyqiwv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.uyqiwv }),
        [uxyuyr.xljknt]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.xljknt }),
        [uxyuyr.fabiyx]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.fabiyx }),
        [uxyuyr.obitls]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.obitls }),
        [uxyuyr.iriuqa]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.iriuqa }),
        [uxyuyr.qfcwvz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.qfcwvz }),
        [uxyuyr.mltyge]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.mltyge }),
        [uxyuyr.adhxce]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.adhxce }),
        [uxyuyr.tkkegl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.tkkegl }),
        [uxyuyr.zoqxvy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.zoqxvy }),
        [uxyuyr.rclyrl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mkeewg, hinisi: uxyuyr.rclyrl }),
        [uxyuyr.ebfifz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hpmjjv, hinisi: uxyuyr.ebfifz }),
        [uxyuyr.wrjbdd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hpmjjv, hinisi: uxyuyr.wrjbdd }),
        [uxyuyr.trphsn]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.hpmjjv, hinisi: uxyuyr.trphsn }),
        [uxyuyr.gmrypkswxeva]: () =>
          tqnoka({
            dhclhg: n,
            iqsqhl: hbkffr.qiqjcm,
            hinisi: uxyuyr.gmrypkswxeva,
          }),
        [uxyuyr.bygaxwswxeva]: () =>
          tqnoka({
            dhclhg: n,
            iqsqhl: hbkffr.qiqjcm,
            hinisi: uxyuyr.bygaxwswxeva,
          }),
        [uxyuyr.loicswswxeva]: () =>
          tqnoka({
            dhclhg: n,
            iqsqhl: hbkffr.qiqjcm,
            hinisi: uxyuyr.loicswswxeva,
          }),
        [uxyuyr.wrswgiswxeva]: () =>
          tqnoka({
            dhclhg: n,
            iqsqhl: hbkffr.yoerqx,
            hinisi: uxyuyr.wrswgiswxeva,
          }),
        [uxyuyr.dpwhhs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.dpwhhs }),
        [uxyuyr.xxehbq]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.xxehbq }),
        [uxyuyr.njyapy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.njyapy }),
        [uxyuyr.bgzmea]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.bgzmea }),
        [uxyuyr.shrrya]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.shrrya }),
        [uxyuyr.cmkesu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.cmkesu }),
        [uxyuyr.ssbhiv]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.ssbhiv }),
        [uxyuyr.ltdnvy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.glftid, hinisi: uxyuyr.ltdnvy }),
        [uxyuyr.xccwah]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.xccwah }),
        [uxyuyr.legnsy]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.legnsy }),
        [uxyuyr.sclaoa]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.sclaoa }),
        [uxyuyr.nfdery]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.nfdery }),
        [uxyuyr.msofrj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.msofrj }),
        [uxyuyr.mjyhgw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.mjyhgw }),
        [uxyuyr.behifz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.bksfzp, hinisi: uxyuyr.behifz }),
        [uxyuyr.kzogzi]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.kzogzi }),
        [uxyuyr.ezgbfw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.ezgbfw }),
        [uxyuyr.snnkrl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.snnkrl }),
        [uxyuyr.hvjfnk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.hvjfnk }),
        [uxyuyr.adhvqz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.adhvqz }),
        [uxyuyr.wrbvvp]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.wrbvvp }),
        [uxyuyr.asuufu]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.kvrkge, hinisi: uxyuyr.asuufu }),
        [uxyuyr.nmwmrz]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.nmwmrz }),
        [uxyuyr.luoibc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.luoibc }),
        [uxyuyr.mpbnsm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.mpbnsm }),
        [uxyuyr.ctzfzj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.ctzfzj }),
        [uxyuyr.rdugrl]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.rdugrl }),
        [uxyuyr.xcjort]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.xcjort }),
        [uxyuyr.rooiup]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.rooiup }),
        [uxyuyr.pbbywc]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.pbbywc }),
        [uxyuyr.fzoqwd]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.yqqvyb, hinisi: uxyuyr.fzoqwd }),
        [uxyuyr.uvtocs]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.uvtocs }),
        [uxyuyr.vmohcm]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.vmohcm }),
        [uxyuyr.fskcce]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.fskcce }),
        [uxyuyr.jqaekk]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.jqaekk }),
        [uxyuyr.eyiraw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.eyiraw }),
        [uxyuyr.ncyeaw]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.sdujnf, hinisi: uxyuyr.ncyeaw }),
        [uxyuyr.eltxge]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.ipnprs, hinisi: uxyuyr.eltxge }),
        [uxyuyr.lyatyf]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjmrtm, hinisi: uxyuyr.lyatyf }),
        [uxyuyr.kmvqxe]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjmrtm, hinisi: uxyuyr.kmvqxe }),
        [uxyuyr.sifqsj]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjmrtm, hinisi: uxyuyr.sifqsj }),
        [uxyuyr.zvamyb]: () =>
          tqnoka({ dhclhg: n, iqsqhl: hbkffr.mjmrtm, hinisi: uxyuyr.zvamyb }),
        settings: () => sqyxux({ dhclhg: n, iqsqhl: "" }),
        oqakoi: () =>
          zskpep({
            dhclhg: n,
            iqsqhl: "",
            kvksvp: "Siga as equipes que criaram e traduziram este addon.",
            entries: oshzpy,
          }),
        support: () =>
          hekmzk({
            iqsqhl: "",
            dhclhg: n,
            ulqert:
              "Precisa de ajuda, encontrou um bug ou tem algum feedback? Entre em contato com a Oreville Studios abaixo.\n\n§eWebsite\n§7orevillestudios.com\n\n§eEmail Support\n§7support@orevillestudios.com\n\n§eCommunity Discord\n§7orevillestudios.com/discord",
            backButton: !0,
          }),
      },
    })
    .xmbbkf(e);
}
var hdifwd = "oreville_vn:kfjmlk",
  anofdg = new Map();
(stwlip.beforeEvents.itemUse.subscribe(({ source: e, itemStack: n }) => {
  void 0 !== n &&
    n.typeId === hdifwd &&
    amfzxg.run(() => {
      let n = anofdg.get(e);
      (void 0 === n && ((n = ossigs(e)), anofdg.set(e, n)), n.show());
    });
}),
  stwlip.afterEvents.playerSpawn.subscribe(({ player: e, initialSpawn: n }) => {
    if (!n) return;
    !0 !== e.getDynamicProperty("tmffhm") &&
      (e.runCommand(
        "execute unless entity @s[hasitem={item=oreville_vn:kfjmlk}] run give @s oreville_vn:kfjmlk",
      ),
      e.setDynamicProperty("tmffhm", !0));
  }));
