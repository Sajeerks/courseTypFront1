import { Helmet } from "react-helmet-async";
import "./Dashboard.css";
import { Fragment, useEffect, useState } from "react";
import { StatsModelTypeFronend, getStatsFrontend } from "../Redux/otherReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { toast } from "react-toastify";
import { Loading } from "../Loading/Loading";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';








ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};




const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, error, allData } = useSelector(
    (state: RootState) => state.otherStats
  );

  interface allDataType{
    stats: StatsModelTypeFronend[];
    usersCount: number;
    viewsCount: number;
    subscriptionsCount: number;
    userPercentage: number;
    viewsPercentage: number;
    subscriptionsPercentage: number;
    userProfit: number;
    viewsProfit: number;
    subscriptionsProfit: number;
  }
  
  const [alldataState, setalldataState] = useState < allDataType | null>(null)






  let labelsforLinechart  =[ ...Array(12).keys() ];
  labelsforLinechart = Array(12).fill(0).map((_e,i)=>i+1)


  console.log({labelsforLinechart});


// console.log( "datata",  alldataState &&  alldataState?.stats.map(singleStat=>singleStat.views));
  const dataForLineChart = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: labelsforLinechart,

    datasets: [
      {
        label: 'no of views for the last 12 months',
        // data:[1,2,3,4,5,7] ,
        data: alldataState &&  alldataState?.stats.map(singleStat=>singleStat.views) ,

        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Previous Month',
      //   data:[7,8,9,1,10] ,
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };


  const optionsForLineChart =  {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  



  function getLastYearMonths() {
    const labels = [];
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  

  

if(alldataState?.stats){
  for (let i = 0; i < alldataState?.stats.length; i++) {
  

    if(alldataState?.stats[i].createdAt){
      labels.push(  months[new Date(alldataState?.stats[i]?.createdAt as Date).getMonth()]  )

    }else{
          
    }

  
   }
}
  

    // const currentMonth = new Date().getMonth();
    // console.log({currentMonth});
  
    // const remain = 11 - currentMonth;
  
    // for (let i = currentMonth; i < months.length; i--) {
    //   const element = months[i];
    //   labels.unshift(element);
    //   if (i === 0) break;
    // }
  
    // for (let i = 11; i > remain; i--) {
    //   if (i === currentMonth) break;
    //   const element = months[i];
    //   labels.unshift(element);
    // }
  
    return labels;
  }
  

// console.log( "Sa" ,alldataState && alldataState?.stats.map(singleStat=>singleStat.views));
// console.log("all nosths",getLastYearMonths());
  const data2 = {
    // labels:getLastYearMonths(),
    labels:moment.months(),

    datasets: [
      {
        label: 'no of views',
        data:alldataState && alldataState?.stats.map(singleStat=>singleStat.views),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 25, 132, 0.2)',
          'rgba(54, 158, 235, 0.2)',
          'rgba(255, 247, 86, 0.2)',
          'rgba(75, 214, 192, 0.2)',
          'rgba(153, 21, 255, 0.2)',
          'rgba(255, 210, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 25, 132, 1)',
          'rgba(54, 158, 235, 1)',
          'rgba(255, 247, 86, 1)',
          'rgba(75, 214, 192, 1)',
          'rgba(153, 21, 255, 1)',
          'rgba(255, 210, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  





  useEffect(() => {
    setalldataState(allData)
  }, [loading]);
  
  useEffect(() => {
    dispatch(getStatsFrontend());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  return (

    <Fragment>
      {loading ?(<Loading/>):(
 <div className="dashboard_maindiv">
 <Helmet>
   <title>coursebundler dashboard</title>
 </Helmet> 

 
<Box width={"90vw"}>
<Pie data={data2}   />
</Box>



<Box width={'90vw'}   >

 <Line options={optionsForLineChart} data={dataForLineChart} />
</Box>



<Box>
  <Typography>Parameters per month</Typography>
   <ul>
    <li>usersCount:{alldataState &&  alldataState?.usersCount} </li>
    <li>viewsCount:{alldataState &&  alldataState?.viewsCount} </li>
    <li>userPercentage:{alldataState &&  Number( alldataState?.userPercentage).toFixed(2)}% </li>
    <li>viewsPercentage:{alldataState &&  Number( alldataState?.viewsPercentage).toFixed(2)}% </li>
    <li>subscriptionsPercentage:{alldataState &&  Number( alldataState?.subscriptionsPercentage).toFixed(2)}% </li>

    {/* <li>userProfit:{alldataState &&  alldataState?.userProfit}  </li>

    <li>viewsProfit:{alldataState &&  alldataState?.viewsProfit} </li>
    <li>subscriptionsProfit:{alldataState &&  alldataState?.subscriptionsProfit} </li> */}





   </ul>
</Box>

</div>


      )}
    </Fragment>
   
  );
};

export default Dashboard;
