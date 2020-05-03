module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  // only rules that can be fixed automatically
  "rules": {
    // Possible Errors
    "no-extra-semi": "error",

    // Best Practices
    "no-multi-spaces": "error",
    "no-useless-return": "error",
    "yoda": "error",

    // Stylistic Issues
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", 2],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "linebreak-style": ["error", "unix"],
    "multiline-comment-style": ["error", "starred-block"],
    "no-lonely-if": "error",
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "object-curly-spacing": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "single"],
    "semi": "error",
    "semi-spacing": ["error", { "before": false, "after": true }],
    "sort-vars": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", {"words": true, "nonwords": false}],
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": ["error", {"after": true, "before": false}],
    "template-tag-spacing": ["error", "never"],

    // ECMAScript 6
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error", { "before": true, "after": true }],

    // JSX related
    "jsx-quotes": ["error", "prefer-single"]
  }
}
