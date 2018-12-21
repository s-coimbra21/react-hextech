module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true
      }
    ],
    "arrow-parens": [
      "off"
    ],
    "consistent-return": "off",
    "generator-star-spacing": "off",
    "prefer-destructuring": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "electron"
        ]
      }
    ],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "promise/param-names": 2,
    "promise/always-return": 2,
    "promise/catch-or-return": 2,
    "promise/no-native": 0,
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/forbid-prop-types": "off",
    "jsx-a11y/no-static-element-interactions": 0
  },
  "plugins": [
    "promise",
    "react",
    "import"
  ],
  "settings": {
    "import/resolver": "webpack",
    "react": {
      "version": "16.6.3"
    }
  }
}