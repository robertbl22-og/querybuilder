/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Component } from "react"
import {
  Query,
  Builder,
  BasicConfig,
  Utils,
  //types:
  ImmutableTree,
  Config,
  BuilderProps,
  JsonTree,
  JsonLogicTree,
} from "react-awesome-query-builder"
import { Button, Popconfirm, Tabs, Typography, Table, message } from "antd"
import throttle from "lodash/throttle"
import loadedConfig from "./config/index"
import loadedInitValue from "./data/exampleQuery.json"
import loadedInitLogic from "./data/init_logic"
import "antd/dist/antd.css"
import "react-awesome-query-builder/css/styles.scss"
import "react-awesome-query-builder/css/compact_styles.scss"
import { CopyToClipboard } from "react-copy-to-clipboard"
import jsonLogic from "json-logic-js"
import exampleData from "./data/exampleData.json"
import { suppressionFormat } from "./data/exportSuppressionQuery";

const stringify = JSON.stringify
const {
  queryBuilderFormat,
  jsonLogicFormat,
  queryString,
  mongodbFormat,
  sqlFormat,
  getTree,
  checkTree,
  loadTree,
  uuid,
  loadFromJsonLogic,
} = Utils
const preStyle = {
  backgroundColor: "#E0E0E0",
  margin: "10px",
  padding: "10px",
  borderRadius: 5,
  overflow: "scroll",
}
const preErrorStyle = {
  backgroundColor: "lightpink",
  margin: "10px",
  padding: "10px",
  borderRadius: 5,
}
const { TabPane } = Tabs

const emptyInitValue: JsonTree = { id: uuid(), type: "group" }

let initValue: JsonTree =
  loadedInitValue && Object.keys(loadedInitValue).length > 0
    ? (loadedInitValue as JsonTree)
    : emptyInitValue
const initLogic: JsonLogicTree | undefined =
  loadedInitLogic && Object.keys(loadedInitLogic).length > 0
    ? (loadedInitLogic as JsonLogicTree)
    : undefined
let initTree: ImmutableTree
initTree = checkTree(loadTree(initValue), loadedConfig)
// initTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig); // <- this will work same

interface DemoQueryBuilderProps {}

interface DemoQueryBuilderState {
  tree: ImmutableTree
  config: Config
  matchResults: {}[]
}

export default class DemoQueryBuilder extends Component<
  DemoQueryBuilderProps,
  DemoQueryBuilderState
> {
  private immutableTree: ImmutableTree | undefined
  private config: Config | undefined

  constructor(props: DemoQueryBuilderProps) {
    super(props)

    this.state = {
      tree: initTree,
      config: loadedConfig,
      matchResults: [],
    }
  }

  componentDidMount() {
    // @ts-ignore
    window.addEventListener("update", this.onConfigChanged)
  }

  componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener("update", this.onConfigChanged)
  }

  onConfigChanged = ({ detail: { config, _initTree, _initValue } }: CustomEvent) => {
    this.setState({
      config,
    })
    initTree = _initTree
    initValue = _initValue
  }

  /**
   * Test data against rule using jsonLogic
   */
  handleGenerateList = () => {
    const { tree, config, matchResults } = this.state
    const { logic, data, errors } = jsonLogicFormat(tree, config)
    const results = exampleData.filter((r) => {
      const isMatch = jsonLogic.apply(
        logic, // Rule
        r // Data
      )
      console.log(isMatch, logic, exampleData)
      return isMatch
    })
    if (results.length > 0) message.success("Results found")
    else message.warn("No results found")
    this.setState({ matchResults: results })
    console.log(results)
  }

  resetValue = () => {
    this.setState({
      tree: initTree,
      matchResults: [],
    })
  }

  clearValue = () => {
    this.setState({
      tree: loadTree(emptyInitValue),
      matchResults: [],
    })
  }

  onChange = (immutableTree: ImmutableTree, config: Config) => {
    this.immutableTree = immutableTree
    this.config = config
    this.updateResult()
    const jsonTree = getTree(immutableTree) //can be saved to backend
  }

  updateResult = throttle(() => {
    this.setState({ tree: this.immutableTree!, config: this.config! })
  }, 100)

  render = () => (
    <>
      <Tabs defaultActiveKey="0" type="card">
        <TabPane tab="QueryBuilder" key="0">
          <Query
            {...this.state.config}
            value={this.state.tree}
            onChange={this.onChange}
            renderBuilder={(props: BuilderProps) => (
              <div className="query-builder qb-lite">
                <Builder {...props} />
                <div style={{ textAlign: "right", marginRight: 5, marginTop: 10 }}>
                  <Button type="ghost" onClick={this.resetValue} style={{ marginRight: 10 }}>
                    Reset
                  </Button>
                  <Button type="ghost" onClick={this.clearValue} style={{ marginRight: 10 }}>
                    Clear
                  </Button>
                  {/*<Popconfirm
                  title="Feature not implemented!"
                  okText="OK"
                  cancelText="Cancel"
                  style={{ marginRight: 5 }}>
                  <Button type="primary" onClick={this.handleGenerateList}>Generate List</Button>
                </Popconfirm>*/}
                  <Button
                    type="primary"
                    onClick={this.handleGenerateList}
                    style={{ marginRight: 5 }}>
                    Generate List
                  </Button>
                </div>
              </div>
            )}
          />
        </TabPane>
        {FormattedTabs(this.state)}
      </Tabs>
      <Table
        dataSource={this.state.matchResults}
        rowKey="id"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Domains",
            dataIndex: "Domains",
            key: "Domains",
            render: (i) => `${i.Names.toString()}, ${i.Groups.toString()}`
          },
          {
            title: "Date of Birth",
            dataIndex: "DateOfBirth",
            key: "DateOfBirth",
            render: (i) => new Date(i).toLocaleDateString()
          },
          {
            title: "Gender",
            dataIndex: "Gender",
            key: "Gender",
            render: (i) => i === "Male" ? "M" : "F"
          },
          {
            title: "Attributors",
            dataIndex: "Signal.Attributors",
            key: "Attributors",
          },
          {
            title: "Record Types",
            dataIndex: "Signal.RecordTypes",
            key: "RecordTypes",
          },
          {
            title: "Seen",
            dataIndex: "Signal.Seen.Days",
            key: "Days",
          },
        ]}
      />
    </>
  )
}

function FormattedTabs({ tree: immutableTree, config }: { tree: ImmutableTree; config: Config }) {
  const { logic, data, errors } = jsonLogicFormat(immutableTree, config)
  return [
    <TabPane tab="jsonLogic" key="1">
      <CopyToClipboard
        text={stringify(logic, undefined, 2)}
        style={{ color: "#1890ff", cursor: "pointer" }}>
        <span>Copy Rule</span>
      </CopyToClipboard>
      <span style={{ marginLeft: 20, marginRight: 20, color: "#E0E0E0" }}>|</span>
      <CopyToClipboard
        text={stringify(data, undefined, 2)}
        style={{ color: "#1890ff", cursor: "pointer" }}>
        <span>Copy Data</span>
      </CopyToClipboard>
      <span style={{ marginLeft: 20, marginRight: 20, color: "#E0E0E0" }}>|</span>
      <a href="http://jsonlogic.com" target="_blank" rel="noopener noreferrer">
        About jsonLogicFormat
      </a>
      <span style={{ marginLeft: 20, marginRight: 20, color: "#E0E0E0" }}>|</span>
      <a
        href="https://www.nuget.org/packages/JsonLogic.Net/"
        target="_blank"
        rel="noopener noreferrer">
        JsonLogic.Net
      </a>
      {errors!.length > 0 && <pre style={preErrorStyle}>{stringify(errors, undefined, 2)}</pre>}
      {!!logic && (
        <>
          <h2 style={{ marginTop: 20 }}>Rule</h2>
          <pre style={preStyle}>{stringify(logic, undefined, 2)}</pre>
          <h2>Data</h2>
          <pre style={preStyle}>{stringify(data, undefined, 2)}</pre>
        </>
      )}
    </TabPane>,
    <TabPane tab="JSON (QB)" key="7">
      <CopyToClipboard
        text={stringify(queryBuilderFormat(immutableTree, config), undefined, 2)}
        style={{ color: "#1890ff", cursor: "pointer" }}>
        <span>Copy to clipboard</span>
      </CopyToClipboard>
      <pre style={preStyle}>
        {stringify(queryBuilderFormat(immutableTree, config), undefined, 2)}
      </pre>
    </TabPane>,
    <TabPane tab="Suppression" key="8">
      <pre style={preStyle}>{stringify(suppressionFormat(immutableTree, config), undefined, 2)}</pre>
    </TabPane>,
    <TabPane tab="SQL" key="4">
      <pre style={preStyle}>{stringify(sqlFormat(immutableTree, config), undefined, 2)}</pre>
    </TabPane>,
    <TabPane tab="MongoDB" key="5">
      <pre style={preStyle}>{stringify(mongodbFormat(immutableTree, config), undefined, 2)}</pre>
    </TabPane>,
    <TabPane tab="Tree" key="6">
      <CopyToClipboard
        text={stringify(getTree(immutableTree), undefined, 2)}
        style={{ color: "#1890ff", cursor: "pointer" }}>
        <span>Copy to clipboard</span>
      </CopyToClipboard>
      <pre style={preStyle}>{stringify(getTree(immutableTree), undefined, 2)}</pre>
    </TabPane>,
    <TabPane tab="JS String" key="2">
      <pre style={preStyle}>{stringify(queryString(immutableTree, config), undefined, 2)}</pre>
    </TabPane>,
    <TabPane tab="Human Readable(ish)" key="3">
      <pre style={preStyle}>{queryString(immutableTree, config, true)}</pre>
    </TabPane>,
  ]
}
