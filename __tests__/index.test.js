import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import { expect, test } from '@jest/globals'
import parseFile from '../src/script.js'
import genDiff from '../src/index.js'
import stylish from '../src/formatters/stylish.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getExt = (filepath) => {
  const pathSplit = filepath.split('.')
  const fileExt = pathSplit.at(-1)
  return fileExt
}

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

test('test reading unsupported file format', () => {
  const file1 = getFixturePath('file1.txt')
  expect(() => {
    parseFile(file1)
  }).toThrow(Error)
})

test('test json files in non-existent format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  expect(() => {
    genDiff(file1, file2, 'qwerty')
  }).toThrow(Error)
})

test('test stylish format handling unexpected tree case', () => {
  const treeErr = [
    {
      type: 'added',
      key: 'woah',
      value: 'dog',
    },
    {
      type: 'unlisted',
      key: 'hello',
      value: 'bye',
    },
  ]

  expect(() => {
    stylish(treeErr)
  }).toThrow(Error)
})

test('test parser yaml file', () => {
  const file1Data = readFile('file1.yaml')
  const file1ext = getExt('file1.yaml')
  const expected = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value', doge: { wow: 'too much' } },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345, deep: { id: 45 } },
    group4: {
      default: null,
      foo: 0,
      isNested: false,
      nest: { bar: '', isNested: true },
      type: 'bas',
    },
    language: 'js',
  }

  expect(parseFile(file1Data, file1ext)).toEqual(expected)
})

test('test json files in default format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2)).toEqual(expected)
})

test('test yml files in default format', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2)).toEqual(expected)
})

test('test json files in stylish format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2, 'stylish')).toEqual(expected)
})

test('test json files in plain format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file_plain.txt').trim()

  expect(genDiff(file1, file2, 'plain')).toEqual(expected)
})

test('test json files in json format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected_file_json.txt').trim()

  expect(genDiff(file1, file2, 'json')).toEqual(expected)
})
test('test yml files in stylish format', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected_file.txt').trim()

  expect(genDiff(file1, file2, 'stylish')).toEqual(expected)
})

test('test yml files in plain format', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected_file_plain.txt').trim()

  expect(genDiff(file1, file2, 'plain')).toEqual(expected)
})

test('test yml files in json format', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected_file_json.txt').trim()

  expect(genDiff(file1, file2, 'json')).toEqual(expected)
})
