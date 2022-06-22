<template>
<<<<<<< Updated upstream:frontend/src/components/TestBar.vue
  <div>
    <apexchart
      type="bar"
      width="100%"
      height="250%"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
=======
    <div>
        <apexchart type="bar" width="100%" height="200%" :options="options" :series="series"></apexchart>
    </div>
>>>>>>> Stashed changes:frontend/src/components/ModeOfPaymentChart.vue
</template>

<script setup>
const options = {
<<<<<<< Updated upstream:frontend/src/components/TestBar.vue
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const series = [
  {
    name: "series",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];
</script>
=======
        chart: {
          id: 'mode-of-payment'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      };
      
      const series = [{
        name: 'series',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }];
</script>
>>>>>>> Stashed changes:frontend/src/components/ModeOfPaymentChart.vue
