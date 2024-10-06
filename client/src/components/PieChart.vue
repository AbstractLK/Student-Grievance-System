<template>
  <div>
    <Pie :chartData="chartData"></Pie>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'PieChartComponent', // Avoid naming conflict
  components: {
    Pie,
  },
  data() {
    return {
      chartData: {
        labels: ['Not Processed', 'In Process', 'Closed'],
        datasets: [
          {
            label: 'Complaints',
            backgroundColor: ['#FF6384', '#FFCD56', '#36A2EB'],
            data: [12, 8, 5],
          },
        ],
      },
    };
  },
};
</script>
