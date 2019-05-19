const trainingData = require('./metaData.json');

const MLR = require('ml-regression-multivariate-linear');
const formatted = trainingData.untilObfuscation.map((res, i) => ({
  input: Object.values(trainingData.metaData[i]).map(num => Number(`0.${num}`)),
  output: [Number(`0.${res}`)],
}));

const x = Object.values(trainingData.metaData)
  .map(obj => Object.values(obj))
  .slice(0, 500);
const y = [...trainingData.untilObfuscation.map(num => [num])];
console.log(x.length);
console.log(y.length);
const mlr = new MLR(x, y);
console.log(mlr.predict([8, 2918, 31281553]));
