const { ruleName, messages } = require("./..");

testRule({
  ruleName,
  config: [""],
  accept: [{
    code: "@include foo;",
    description: "Empty rule."
  }],
});

testRule({
  ruleName,
  config: "",
  accept: [{
    code: "@include foo;",
    description: "Empty rule."
  }],
});

testRule({
  ruleName,
  config: ["foo"],
  accept: [{
    code: "@include foobar;",
    description: "Different mixin, allowed.",
  }, {
    code: "@include baz;",
    description: "Different mixin, allowed.",
  }],
  reject: [{
    code: "@include foo;",
    message: messages.rejected("foo"),
    description: "Matching mixin, not allowed.",
    line: 1,
  }, {
    code: "@include foo();",
    message: messages.rejected("foo"),
    description: "Matching mixin, not allowed.",
    line: 1,
  }],
});

testRule({
  ruleName,
  config: [["foo-bar", "foo/bar"]],
  accept: [{
    code: "@include foo;",
    description: "Different mixin, allowed.",
  }, {
    // eslint-disable-next-line no-useless-escape
    code: "@include foo\/bar-baz;",
    description: "Different mixin, allowed.",
  }],
  reject: [{
    code: "@include foo-bar;",
    message: messages.rejected("foo-bar"),
    description: "Matching mixin, not allowed.",
    line: 1,
  }, {
    // eslint-disable-next-line no-useless-escape
    code: "@include foo\/bar;",
    message: messages.rejected("foo/bar"),
    description: "Matching mixin, not allowed.",
    line: 1,
  }],
});
