import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'


ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

const DoughnutChart = () => {

    const [chart, setChart] = useState ([])

    var baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10'
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var apiKey = 'coinranking88b2e53f7f2d9931ffd3d2e7b68f6f92bd14221cc0ae38b0'

    useEffect(()=>{
        const fetchCoins = async () =>{
            await fetch(`${proxyUrl}${baseUrl}`,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin':'*'
                }
            }).then((response)=>{
                response.json().then((json)=>{
                    console.log(json)
                    setChart(json.data)
                })
            }).catch(error =>{
                console.log(error)
            })
        }
        fetchCoins();
    },[baseUrl,proxyUrl,apiKey])

    var data= {
        labels:chart?.coins?.map(x => x.name),
        datasets: [{
          label: `${chart?.coins?.length} Coins Available`,
          data: chart?.coins?.map(x => x.price),
          borderWidth: 1
        }]
      }
     
    var options =  {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        legend:{
            labels:{
                fontSize:26
            }
        }
      }  


  return (
    <div>
        <Doughnut 
            data={data}
            height={400}
            options={options}
        />
    </div>
  )
}

export default DoughnutChart