module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        "semi": 0,
        "space-before-function-parentheses": "off",
        "vue/html-closing-bracket-newline": "error",
        "indent": ["error", 2]
    }
}