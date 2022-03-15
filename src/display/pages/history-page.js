import React from 'react'
import ChartPage from '../chart/chart-page'
import ChartSummary from '../chart/chart-summary'
import { useGlobalContext } from '../../context'

const HistoryPage = () => {
  const { summaryDetails } = useGlobalContext()
  return (
    <div className='history-main-page'>
      <h2 className='history-page-title'>CATEGORY:</h2>
      <ChartPage />
      <h2 className='summary-title'>SUMMARY:</h2>
      <div className='container-chart-summary'>
        <table>
          <tr>
            <th>Category</th>
            <th>Percentage</th>
            <th>Amount</th>
          </tr>
          {summaryDetails.map((value) => {
            return <ChartSummary key={value.id} {...value} />
          })}
        </table>
      </div>
    </div>
  )
}

export default HistoryPage
