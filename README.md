# at-include-disallowed-list

Stylelint rule for specifying a list of disallowed mixins to at-include (`@include`).

## Installation

```shell
npm install stylelint-at-include-disallowed-list --save-dev
```

## Usage

Add this config to your Stylelint configuration file:

```json
{
  "plugins": ["stylelint-at-include-disallowed-list"],
  "rules": {
    "plugin/at-include-disallowed-list": [
      [
        "array",
        "of",
        "mixins"
      ]
    ]
  }
}
```

The [message secondary option](https://github.com/stylelint/stylelint/blob/main/docs/user-guide/configure.md#message) can accept the arguments of this rule.

## Options

`array|string`: `["array", "of", "mixins"]|"mixin"`

Given:

```json
["foo", "bar", "foo\\/bar"]
```

The following patterns are considered problems:

```scss
a {
  @include foo;
}
```

```scss
a {
  @include bar();
}
```

```scss
a {
  @include foo\/bar();
}
```

The following patterns are *not* considered problems:

```scss
a {
  @include foobar;
}
```

```scss
a {
  @include foo\\/bar-baz();
}
```
