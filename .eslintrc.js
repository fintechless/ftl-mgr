module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "no-loss-of-precision": "off",
    "no-nonoctal-decimal-escape": "off",
    "no-unsafe-optional-chaining": "off",
    "no-useless-backreference": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
