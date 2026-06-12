module.exports = {
  default: {
    require: [
      'src/steps/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    requireModule: ['ts-node/register']
  }
};