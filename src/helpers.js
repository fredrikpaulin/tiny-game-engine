export let lerp = (a, b, t) => a + (b - a) * t
export let clamp = (n, x, v) => v < n ? n : v > x ? x : v
export let degToRad = d => d * .017453292519943295
export let radToDeg = r => r * 57.29577951308232
export let rand = (n = 0, x = 1) => Math.random() * (x - n) + n
export let randInt = (n, x) => n + ~~(Math.random() * (x - n + 1))
export let pick = a => a[~~(Math.random() * a.length)]
