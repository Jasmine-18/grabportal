<template>
    <div>
        <apexchart type="pie" width="100%" height="200%" :options="options" :series="series"></apexchart>
    </div>
</template>

<script setup>
const options = {
        chartOptions: {
          id: 'transaction-amount'
        },
        labels: ['Blue', 'Green', 'Orange']
      };
      
      const series = [30, 40, 30];
</script>