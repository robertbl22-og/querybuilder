// eslint-disable-next-line @typescript-eslint/camelcase
import { Config } from "react-awesome-query-builder"
import signalFields from "./signalFields"
import widgets from "./widgets"
import types from "./types"
import funcs from "./funcs"
import settings from "./settings"
import operators from "./operators"
import conjunctions from "./conjunctions"

const config: Config = {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields: signalFields,
  funcs,
}

export default config
