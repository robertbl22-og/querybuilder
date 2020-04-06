import { BasicConfig, LocaleSettings, Settings, Widgets } from "react-awesome-query-builder"
import React from "react"
// eslint-disable-next-line @typescript-eslint/camelcase
import en_US from "antd/lib/locale-provider/en_US"
const { FieldSelect, FieldDropdown, FieldCascader, FieldTreeSelect, VanillaFieldSelect } = Widgets

const localeSettings: LocaleSettings = {
  locale: {
    short: "en",
    full: "en-US",
    // eslint-disable-next-line @typescript-eslint/camelcase
    antd: en_US,
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  funcLabel: "Function",
  fieldPlaceholder: "Select field",
  funcPlaceholder: "Select function",
  operatorPlaceholder: "Select operator",
  deleteLabel: undefined,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  delGroupLabel: undefined,
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: {
    title: "Are you sure delete this rule?",
    okText: "Yes",
    okType: "danger",
  },
  removeGroupConfirmOptions: {
    title: "Are you sure delete this group?",
    okText: "Yes",
    okType: "danger",
  },
}

const settings: Settings = {
  ...BasicConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: "Value",
    },
    field: {
      label: "Field",
      widget: "field",
    },
    func: {
      label: "Function",
      widget: "func",
    },
  },
  // canReorder: true,
  // canRegroup: true,
  // showNot: true,
  // showLabels: true,
  maxNesting: 3,
  canLeaveEmptyGroup: true, //after deletion

  // renderField: (props) => <FieldCascader {...props} />,
  //@ts-ignore
  renderOperator: (props) => <FieldDropdown {...props} />,
  //@ts-ignore
  renderFunc: (props) => <FieldSelect {...props} />,
}

export default settings
