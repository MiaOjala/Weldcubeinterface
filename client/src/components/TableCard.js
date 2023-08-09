import React from 'react'
import Table from 'react-bootstrap/Table';

function TableCard(props) {
  const tbody = props.data.map((x, i) => {
    return (
      <tr key={i}>
        {props.headers.map((header, index) => {
          var elem
          if (isNaN(x[header])) {
            elem = x[header]
          } else {

            elem = Math.round(x[header] * 100) / 100
          }
          return (
            <td className='text-start' key={index}>
              {elem}
            </td>
          )
        })}
      </tr>
    )
  })

  return (
      <Table striped hover>
        <thead>
          <tr>
            {props.headers.map((x, i) => {
              return (
                <th className='text-start' key={x}>{x}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </Table>
  )
}

export default TableCard