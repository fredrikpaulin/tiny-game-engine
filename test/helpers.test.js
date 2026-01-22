import { test, expect } from 'bun:test'
import { lerp, clamp, degToRad, radToDeg, rand, randInt, pick, wrap } from '../src/helpers.js'

test('lerp interpolates', () => {
  expect(lerp(0, 10, 0)).toBe(0)
  expect(lerp(0, 10, 0.5)).toBe(5)
  expect(lerp(0, 10, 1)).toBe(10)
})

test('lerp extrapolates', () => {
  expect(lerp(0, 10, 2)).toBe(20)
  expect(lerp(0, 10, -1)).toBe(-10)
})

test('clamp within range', () => {
  expect(clamp(0, 10, 5)).toBe(5)
})

test('clamp below min', () => {
  expect(clamp(0, 10, -5)).toBe(0)
})

test('clamp above max', () => {
  expect(clamp(0, 10, 15)).toBe(10)
})

test('degToRad converts correctly', () => {
  expect(degToRad(0)).toBe(0)
  expect(degToRad(90)).toBeCloseTo(Math.PI / 2)
  expect(degToRad(180)).toBeCloseTo(Math.PI)
  expect(degToRad(360)).toBeCloseTo(Math.PI * 2)
})

test('radToDeg converts correctly', () => {
  expect(radToDeg(0)).toBe(0)
  expect(radToDeg(Math.PI / 2)).toBeCloseTo(90)
  expect(radToDeg(Math.PI)).toBeCloseTo(180)
  expect(radToDeg(Math.PI * 2)).toBeCloseTo(360)
})

test('rand returns value in range', () => {
  for (let i = 0; i < 100; i++) {
    let v = rand(5, 10)
    expect(v).toBeGreaterThanOrEqual(5)
    expect(v).toBeLessThan(10)
  }
})

test('rand defaults to 0-1', () => {
  for (let i = 0; i < 100; i++) {
    let v = rand()
    expect(v).toBeGreaterThanOrEqual(0)
    expect(v).toBeLessThan(1)
  }
})

test('randInt returns integer in range', () => {
  for (let i = 0; i < 100; i++) {
    let v = randInt(5, 10)
    expect(Number.isInteger(v)).toBe(true)
    expect(v).toBeGreaterThanOrEqual(5)
    expect(v).toBeLessThanOrEqual(10)
  }
})

test('pick returns element from array', () => {
  let arr = [1, 2, 3, 4, 5]
  for (let i = 0; i < 50; i++) {
    let v = pick(arr)
    expect(arr).toContain(v)
  }
})

test('wrap wraps values', () => {
  expect(wrap(0, 10, 5)).toBe(5)
  expect(wrap(0, 10, 10)).toBe(0)
  expect(wrap(0, 10, 12)).toBe(2)
  expect(wrap(0, 10, -2)).toBe(8)
})
