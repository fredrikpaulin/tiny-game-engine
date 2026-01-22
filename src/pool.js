export let pool = (create, max = 100) => {
  let items = [], active = []
  return {
    get(p) { let i = items.pop() || create(); p && Object.assign(i, p); active.push(i); return i },
    release(i) { let x = active.indexOf(i); x > -1 && (active.splice(x, 1), items.length < max && items.push(i)) },
    update(dt) { for (let i = active.length; i--;) { let o = active[i]; o.update?.(dt); o.isAlive && !o.isAlive() && this.release(o) } },
    render(ctx) { for (let i = 0; i < active.length; i++) active[i].render?.(ctx) },
    get active() { return active },
    get size() { return active.length },
    clear() { items.push(...active); active.length = 0 }
  }
}
