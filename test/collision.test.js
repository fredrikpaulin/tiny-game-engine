import { test, expect } from 'bun:test'
import { aabb, circle, circleRect, pointRect, pointCircle } from '../src/collision.js'

test('aabb detects collision', () => {
  let a = { x: 0, y: 0, width: 10, height: 10 }
  let b = { x: 5, y: 5, width: 10, height: 10 }
  expect(aabb(a, b)).toBe(true)
})

test('aabb detects no collision', () => {
  let a = { x: 0, y: 0, width: 10, height: 10 }
  let b = { x: 20, y: 20, width: 10, height: 10 }
  expect(aabb(a, b)).toBe(false)
})

test('aabb edge case - touching', () => {
  let a = { x: 0, y: 0, width: 10, height: 10 }
  let b = { x: 10, y: 0, width: 10, height: 10 }
  expect(aabb(a, b)).toBe(false) // not overlapping, just touching
})

test('circle detects collision', () => {
  let a = { x: 0, y: 0, r: 5 }
  let b = { x: 8, y: 0, r: 5 }
  expect(circle(a, b)).toBe(true)
})

test('circle detects no collision', () => {
  let a = { x: 0, y: 0, r: 5 }
  let b = { x: 15, y: 0, r: 5 }
  expect(circle(a, b)).toBe(false)
})

test('circle works with radius property', () => {
  let a = { x: 0, y: 0, radius: 5 }
  let b = { x: 8, y: 0, radius: 5 }
  expect(circle(a, b)).toBe(true)
})

test('circleRect detects collision', () => {
  let c = { x: 15, y: 5, r: 5 }
  let r = { x: 0, y: 0, width: 10, height: 10 }
  expect(circleRect(c, r)).toBe(false)
  
  c.x = 12
  expect(circleRect(c, r)).toBe(true)
})

test('circleRect circle inside rect', () => {
  let c = { x: 5, y: 5, r: 2 }
  let r = { x: 0, y: 0, width: 10, height: 10 }
  expect(circleRect(c, r)).toBe(true)
})

test('pointRect detects point inside', () => {
  let p = { x: 5, y: 5 }
  let r = { x: 0, y: 0, width: 10, height: 10 }
  expect(pointRect(p, r)).toBe(true)
})

test('pointRect detects point outside', () => {
  let p = { x: 15, y: 5 }
  let r = { x: 0, y: 0, width: 10, height: 10 }
  expect(pointRect(p, r)).toBe(false)
})

test('pointCircle detects point inside', () => {
  let p = { x: 3, y: 4 }
  let c = { x: 0, y: 0, r: 10 }
  expect(pointCircle(p, c)).toBe(true)
})

test('pointCircle detects point outside', () => {
  let p = { x: 10, y: 10 }
  let c = { x: 0, y: 0, r: 5 }
  expect(pointCircle(p, c)).toBe(false)
})
