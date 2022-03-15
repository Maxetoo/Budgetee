import React from 'react'
import { useGlobalContext } from '../../context'

const ChartSummary = ({ category, percentage, totalValue }) => {
  const { listEmpty } = useGlobalContext()
  return (
    <>
      <tr>
        <td>{category}</td>
        <td>{listEmpty ? '0.00' : percentage}%</td>
        <td>N{listEmpty ? '0.00' : totalValue}</td>
      </tr>
    </>
  )
}

export default ChartSummary
