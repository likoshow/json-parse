module.exports = {
    extends: ['eslint:recommended'],
    env: {
        browser: true,
        es6: true,
        amd: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
            modules: true
        }
    },
    globals: {
    },
    rules: {
    }
};
