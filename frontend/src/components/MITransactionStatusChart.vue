<template>
  <div>
    <apexchart type="pie" width="100%" height="200%" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
const options = {
  chart: {
    id: 'mi-transaction-status'
  },
  labels: ['Blue', 'Green', 'Orange']
};

const series = [40, 30, 30];

</script>