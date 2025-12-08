import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import { expect, test } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

test('test JSON read', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2)).toEqual(expected)
})

test('test YML read', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2)).toEqual(expected)
})

test('test stylish format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2, 'stylish')).toEqual(expected)
})

test('test plain format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file_plain.txt').trim()

  expect(genDiff(file1, file2, 'plain')).toEqual(expected)
})

test('test json format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file_json.txt').trim()

  expect(genDiff(file1, file2, 'json')).toEqual(expected)
})
