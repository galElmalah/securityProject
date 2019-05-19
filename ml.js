const trainingData = require('./metaData.json');
const regression = require('regression');

const x = Object.values(trainingData.metaData)
  .map(({ blocks, size }) => ({ blocks }))
  .map(obj => Object.values(obj))
  .slice(0, 500);
const y = [...trainingData.untilObfuscation.map(num => [num])];
const vec = [];
for (let i = 0; i < 500; i++) {
  vec.push([x[i][0], y[i][0]]);
}
// console.log(vec);
const result = regression.linear(vec);
