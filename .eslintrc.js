module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb-base", "plugin:react/recommended", "plugin:prettier/recommended", "prettier/react"],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-restricted-syntax": [
      'error',
      'ForInStatement',
      'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "arrow-parens": ["off"],
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "prefer-destructuring": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": ["error", { "ignore": ["electron"] }],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "promise/param-names": 2,
    "promise/always-return": 2,
    "promise/catch-or-return": 2,
    "promise/no-native": 0,
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": "off",
    "jsx-a11y/no-static-element-interactions": 0,
    "prettier/prettier": ["error", {"singleQuote": true, "tabWidth": 2,}]
  },
  "plugins": [
    "promise",
    "react",
    "import",
    "prettier"
  ],
  "settings": {
    "import/resolver": "webpack",
    "react": {
      "version": "16.6.3"
    }
  }
}
