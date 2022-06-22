<template>
  <div>
    <apexchart type="bar" width="100%" height="200%" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
const options = {
  chart: {
    id: 'transaction-status'
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