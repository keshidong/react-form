module.exports = {
    root: true,
    parserOptions: {
        ecmascript: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    extends: 'airbnb',
    rules: {
        indent: ["error", 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-filename-extension': ['error', { 'extensions': ['.js'] }],
        'react/prop-types': ['error', { ignore: ['dispatch'], customValidators: [] }],
        'no-param-reassign': ['warn', {
            props: true,
            ignorePropertyModificationsFor: [
                'acc', // for reduce accumulators
                'e', // for e.returnvalue
                'ctx', // for Koa routing
                'req', // for Express requests
                'request', // for Express requests
                'res', // for Express responses
                'response', // for Express responses
                '$scope', // for Angular 1 scopes
            ],
        },
        ],
        'consistent-return': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent-props': [1, 4],
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/href-no-hash': "off",
    },
};
