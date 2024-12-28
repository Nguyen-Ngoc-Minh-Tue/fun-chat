module.exports = {
  // "parser": "babel-eslint",
  "extends": "react-app",
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-anonymous-default-export": [
      "error", {
        "allowArray": false,
        "allowArrowFunction": true,
        "allowAnonymousClass": false,
        "allowAnonymousFunction": false,
        "allowCallExpression": true, // The true value here is for backward compatibility
        "allowLiteral": false,
        "allowObject": false
      }],
  }
};
