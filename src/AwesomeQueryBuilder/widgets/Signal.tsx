import React from "react"
import { Widgets } from "react-awesome-query-builder"

const { SelectWidget } = Widgets

const Signal = (props: any) => {
  const handleChange = (e: any) => {
    console.log(e)
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Attributors:</td>
          <td>
            <SelectWidget
              {...props}
              {...props.customProps}
              listValues={props.customProps.attributors}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Record Types:</td>
          <td>
            <SelectWidget
              {...props}
              {...props.customProps}
              listValues={props.customProps.recordTypes}
              onChange={handleChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Signal
