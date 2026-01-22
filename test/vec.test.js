import { test, expect } from 'bun:test'
import { vec, add, sub, scale, len, norm, dot, dist, copy, rotate } from '../src/vec.js'

test('vec creates vector with defaults', () => {
  let v = vec()
  expect(v.x).toBe(0)
  expect(v.y).toBe(0)
})

test('vec creates vector with values', () => {
  let v = vec(3, 4)
  expect(v.x).toBe(3)
  expect(v.y).toBe(4)
})

test('add vectors', () => {
  let a = vec(1, 2)
  let b = vec(3, 4)
  let c = add(a, b)
  expect(c.x).toBe(4)
  expect(c.y).toBe(6)
})

test('add vectors with out param (no allocation)', () => {
  let a = vec(1, 2)
  let b = vec(3, 4)
  let out = vec()
  let c = add(a, b, out)
  expect(c).toBe(out) // same reference
  expect(out.x).toBe(4)
  expect(out.y).toBe(6)
})

test('sub vectors', () => {
  let a = vec(5, 7)
  let b = vec(2, 3)
  let c = sub(a, b)
  expect(c.x).toBe(3)
  expect(c.y).toBe(4)
})

test('scale vector', () => {
  let v = vec(3, 4)
  let s = scale(v, 2)
  expect(s.x).toBe(6)
  expect(s.y).toBe(8)
})

test('len calculates length', () => {
  let v = vec(3, 4)
  expect(len(v)).toBe(5)
})

test('norm normalizes vector', () => {
  let v = vec(3, 4)
  let n = norm(v)
  expect(n.x).toBeCloseTo(0.6)
  expect(n.y).toBeCloseTo(0.8)
  expect(len(n)).toBeCloseTo(1)
})

test('dot product', () => {
  let a = vec(1, 2)
  let b = vec(3, 4)
  expect(dot(a, b)).toBe(11)
})

test('dist calculates distance', () => {
  let a = vec(0, 0)
  let b = vec(3, 4)
  expect(dist(a, b)).toBe(5)
})

test('copy creates duplicate', () => {
  let v = vec(3, 4)
  let c = copy(v)
  expect(c).not.toBe(v)
  expect(c.x).toBe(3)
  expect(c.y).toBe(4)
})

test('rotate vector 90 degrees', () => {
  let v = vec(1, 0)
  let r = rotate(v, Math.PI / 2)
  expect(r.x).toBeCloseTo(0)
  expect(r.y).toBeCloseTo(1)
})
