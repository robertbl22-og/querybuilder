import { BasicConfig, OperatorProximity, Operators } from "react-awesome-query-builder"

const proximity: OperatorProximity = {
  ...BasicConfig.operators.proximity,
  valueLabels: [
    { label: "Word 1", placeholder: "Enter first word" },
    { label: "Word 2", placeholder: "Enter second word" },
  ],
  textSeparators: [
    //'Word 1',
    //'Word 2'
  ],
  options: {
    ...BasicConfig.operators.proximity.options,
    optionLabel: "Near", // label on top of "near" selectbox (for config.settings.showLabels==true)
    optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
    optionPlaceholder: "Select words between", // placeholder for "near" selectbox
    minProximity: 2,
    maxProximity: 10,
    defaults: {
      proximity: 2,
    },
    customProps: {},
  },
}

const operators: Operators = {
  ...BasicConfig.operators,
  // examples of  overriding
  between: {
    ...BasicConfig.operators.between,
    valueLabels: ["Value from", "Value to"],
    textSeparators: ["from", "to"],
  },
  proximity,
}

export default operators
