import { Funcs } from "react-awesome-query-builder"

const funcs: Funcs = {
  LOWER: {
    label: "Lowercase",
    mongoFunc: "$toLower",
    jsonLogic: "toLowerCase",
    jsonLogicIsMethod: true,
    returnType: "text",
    args: {
      str: {
        label: "String",
        type: "text",
        valueSources: ["value", "field"],
      },
    },
  },
  LINEAR_REGRESSION: {
    label: "Linear regression",
    returnType: "number",
    formatFunc: ({ coef, bias, val }, _) => `(${coef} * ${val} + ${bias})`,
    sqlFormatFunc: ({ coef, bias, val }) => `(${coef} * ${val} + ${bias})`,
    mongoFormatFunc: ({ coef, bias, val }) => ({ $sum: [{ $multiply: [coef, val] }, bias] }),
    jsonLogic: ({ coef, bias, val }) => ({ "+": [{ "*": [coef, val] }, bias] }),
    renderBrackets: ["", ""],
    renderSeps: [" * ", " + "],
    args: {
      coef: {
        label: "Coef",
        type: "number",
        defaultValue: 1,
        valueSources: ["value"],
      },
      val: {
        label: "Value",
        type: "number",
        valueSources: ["value"],
      },
      bias: {
        label: "Bias",
        type: "number",
        defaultValue: 0,
        valueSources: ["value"],
      },
    },
  },
}

export default funcs
