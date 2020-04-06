import React from "react"
import { BasicConfig, Widgets } from "react-awesome-query-builder"
import Signal from "../widgets/Signal"

const widgets: Widgets = {
  ...BasicConfig.widgets,
  // examples of  overriding
  text: {
    ...BasicConfig.widgets.text,
    validateValue: (val, fieldDef) => {
      return val.length < 10
    },
  },
  slider: {
    ...BasicConfig.widgets.slider,
    customProps: {
      width: "300px",
    },
  },
  rangeslider: {
    ...BasicConfig.widgets.rangeslider,
    customProps: {
      width: "300px",
    },
  },
  date: {
    ...BasicConfig.widgets.date,
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
  },
  time: {
    ...BasicConfig.widgets.time,
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
  },
  datetime: {
    ...BasicConfig.widgets.datetime,
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  func: {
    ...BasicConfig.widgets.func,
    customProps: {
      showSearch: true,
    },
  },
  treeselect: {
    ...BasicConfig.widgets.treeselect,
    customProps: {
      showSearch: true,
    },
  },
  signal: {
    ...BasicConfig.widgets.text,
    factory: (props) => <Signal {...props} />,
    customProps: {
      attributors: ["Onpoint", "XVerify", "EmailOversight"],
      recordTypes: ["Lead", "Verified"],
    },
  },
}

export default widgets
