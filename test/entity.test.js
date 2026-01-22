import { test, expect } from 'bun:test'
import { entity } from '../src/entity.js'

test('entity creates with defaults', () => {
  let e = entity()
  expect(e.x).toBe(0)
  expect(e.y).toBe(0)
  expect(e.width).toBe(0)
  expect(e.height).toBe(0)
  expect(e.ttl).toBe(-1)
})

test('entity creates with props', () => {
  let e = entity({ x: 10, y: 20, width: 30, height: 40 })
  expect(e.x).toBe(10)
  expect(e.y).toBe(20)
  expect(e.width).toBe(30)
  expect(e.height).toBe(40)
})

test('entity x/y setters work', () => {
  let e = entity()
  e.x = 100
  e.y = 200
  expect(e.x).toBe(100)
  expect(e.y).toBe(200)
  expect(e.pos.x).toBe(100)
  expect(e.pos.y).toBe(200)
})

test('entity update applies velocity', () => {
  let e = entity({ x: 0, y: 0, dx: 10, dy: 20 })
  e.update(1) // 1 second
  expect(e.x).toBe(10)
  expect(e.y).toBe(20)
})

test('entity update applies acceleration', () => {
  let e = entity({ x: 0, y: 0, dx: 0, dy: 0, ddx: 10, ddy: 10 })
  e.update(1) // 1 second
  expect(e.vel.x).toBe(10)
  expect(e.vel.y).toBe(10)
  expect(e.x).toBe(10)
  expect(e.y).toBe(10)
})

test('entity isAlive with infinite ttl', () => {
  let e = entity()
  expect(e.isAlive()).toBe(true)
})

test('entity isAlive decrements ttl', () => {
  let e = entity({ ttl: 1 })
  expect(e.isAlive()).toBe(true)
  e.update(0.5)
  expect(e.isAlive()).toBe(true)
  expect(e.ttl).toBe(0.5)
  e.update(0.5)
  expect(e.isAlive()).toBe(false)
})

test('entity copies extra props', () => {
  let e = entity({ x: 0, y: 0, health: 100, name: 'player' })
  expect(e.health).toBe(100)
  expect(e.name).toBe('player')
})

test('entity custom update function', () => {
  let called = false
  let e = entity({ 
    x: 0, 
    update() { called = true } 
  })
  e.update(1)
  expect(called).toBe(true)
})
