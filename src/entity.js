import { vec, add, scale } from './vec.js'

export let entity = (p = {}) => {
  let e = {
    pos: vec(p.x ?? 0, p.y ?? 0), vel: vec(p.dx ?? 0, p.dy ?? 0), acc: vec(p.ddx ?? 0, p.ddy ?? 0),
    width: p.width ?? 0, height: p.height ?? 0, rotation: p.rotation ?? 0,
    anchor: p.anchor ?? { x: 0, y: 0 }, opacity: p.opacity ?? 1, ttl: p.ttl ?? -1,
    get x() { return e.pos.x }, set x(v) { e.pos.x = v },
    get y() { return e.pos.y }, set y(v) { e.pos.y = v },
    update(dt) { add(e.vel, scale(e.acc, dt), e.vel); add(e.pos, scale(e.vel, dt), e.pos); e.ttl > 0 && (e.ttl -= dt); p.update?.call(e, dt) },
    isAlive() { return e.ttl !== 0 }
  }
  for (let k in p) k in e || (e[k] = p[k])
  return e
}
