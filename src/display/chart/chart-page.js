import React from 'react'
import '../../main-app/app.scss'
import { useGlobalContext } from '../../context'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const ChartPage = () => {
  const {
    foodSummary,
    clothingSummary,
    schoolExpSummary,
    tpSummary,
    bf_gfSummary,
    dataSummary,
  } = useGlobalContext()
  return (
    <div className='menu-page-section'>
      <Doughnut
        className='chart'
        data={{
          labels: [
            'Food',
            'Clothing',
            'School-Expenses',
            'Transport',
            'Bf/Gf',
            'Data',
          ],
          datasets: [
            {
              label: 'Total Expenses',
              data: [
                foodSummary,
                clothingSummary,
                schoolExpSummary,
                tpSummary,
                bf_gfSummary,
                dataSummary,
              ],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(171, 255, 46)',
                'rgb(138, 43, 226)',
                'rgb(221, 145, 3)',
              ],
              hoverOffset: 2,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: true,
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
        }}
      />
    </div>
  )
}

export default ChartPage
