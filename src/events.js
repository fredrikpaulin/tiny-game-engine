let h = {}
export let on = (n, f) => (h[n] = h[n] || []).push(f)
export let off = (n, f) => h[n]?.splice(h[n].indexOf(f), 1)
export let emit = (n, ...a) => h[n]?.forEach(f => f(...a))
export let once = (n, f) => { let w = (...a) => (off(n, w), f(...a)); on(n, w) }
export let clear = n => n ? delete h[n] : h = {}
