import React from "react"
import DemoQueryBuilder from "./AwesomeQueryBuilder/DemoQueryBuilder"
import { Layout } from "antd"

function App() {
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: "white", padding: 20}}>
        <DemoQueryBuilder />
      </Layout.Content>
    </Layout>
  )
}

export default App
