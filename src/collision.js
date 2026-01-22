export let aabb = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
export let circle = (a, b) => { let x = a.x - b.x, y = a.y - b.y, r = (a.r || a.radius) + (b.r || b.radius); return x * x + y * y < r * r }
export let circleRect = (c, r) => { let R = c.r || c.radius, x = c.x - Math.max(r.x, Math.min(c.x, r.x + r.width)), y = c.y - Math.max(r.y, Math.min(c.y, r.y + r.height)); return x * x + y * y < R * R }
export let pointRect = (p, r) => p.x >= r.x && p.x <= r.x + r.width && p.y >= r.y && p.y <= r.y + r.height
export let pointCircle = (p, c) => { let x = p.x - c.x, y = p.y - c.y, r = c.r || c.radius; return x * x + y * y < r * r }
