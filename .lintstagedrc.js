module.exports = {
  '*.(ts|tsx|js|jsx)': ['eslint --cache --fix'],
  '*': 'prettier --check --ignore-unknown',
};
