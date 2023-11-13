const { createPlugin, utils } = require("stylelint");

const ruleName = "plugin/at-include-disallowed-list";

const messages = utils.ruleMessages(ruleName, {
  rejected: (name) => `Unexpected at-include "${name}"`,
});

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

module.exports = createPlugin(ruleName, (primaryOption) => {
  const disallowedMixins = [].concat(primaryOption);

  return (postcssRoot, postcssResult) => {
    const validOptions = utils.validateOptions(postcssResult, ruleName, {
      actual: primaryOption,
      possible: [isString],
    });

    if (!validOptions) {
      return;
    }

    postcssRoot.walkAtRules("include", (atRule) => {
      let mixin;

      // Mixin call with no parentheses
      if (atRule.params.search(/\(/) === -1) {
        mixin = atRule.params;
      } else {
        mixin = atRule.params.split("(")[0].trim();
      }

      if (disallowedMixins.includes(mixin)) {
        utils.report({
          ruleName,
          result: postcssResult,
          node: atRule,
          message: messages.rejected,
          messageArgs: [mixin],
        })
      }
    });
  }
});

module.exports.primaryOptionArray = true;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
