install: 
	npm ci

gendiff: 
	node bin/gendiff.js

gend work: 
	node bin/gendiff.js ../__fixtures__/file1.json