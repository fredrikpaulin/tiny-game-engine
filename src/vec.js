export let vec = (x = 0, y = 0) => ({ x, y })
export let add = (a, b, o = vec()) => (o.x = a.x + b.x, o.y = a.y + b.y, o)
export let sub = (a, b, o = vec()) => (o.x = a.x - b.x, o.y = a.y - b.y, o)
export let scale = (v, s, o = vec()) => (o.x = v.x * s, o.y = v.y * s, o)
export let len = v => Math.hypot(v.x, v.y)
export let norm = (v, o = vec()) => { let l = len(v) || 1; return scale(v, 1/l, o) }
export let dot = (a, b) => a.x * b.x + a.y * b.y
export let dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
export let set = (v, x, y) => (v.x = x, v.y = y, v)
export let copy = (v, o = vec()) => (o.x = v.x, o.y = v.y, o)
export let angle = v => Math.atan2(v.y, v.x)
export let rotate = (v, r, o = vec()) => { let c = Math.cos(r), s = Math.sin(r); return (o.x = v.x * c - v.y * s, o.y = v.x * s + v.y * c, o) }
