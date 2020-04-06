import { BasicConfig, Types } from "react-awesome-query-builder"
import merge from "lodash/merge"

const types: Types = {
  ...BasicConfig.types,
  // examples of  overriding
  boolean: merge(BasicConfig.types.boolean, {
    widgets: {
      boolean: {
        widgetProps: {
          hideOperator: true,
          operatorInlineLabel: "is",
        },
        opProps: {
          equal: {
            label: "is",
          },
          // eslint-disable-next-line @typescript-eslint/camelcase
          not_equal: {
            label: "is not",
          },
        },
      },
    },
  }),
  signal: {
    valueSources: ['value', 'field'],
    defaultOperator: 'equal',
    widgets: {
      signal: {
        operators: ['equal'],
      }
    }
  }
}

export default types
