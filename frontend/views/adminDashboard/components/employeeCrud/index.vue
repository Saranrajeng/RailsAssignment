<template>
  <div>
    <createEmployee />
    <editEmployee />
    <listEmployee />
  </div>
</template>

<script setup lang="ts">
import createEmployee from '../createEmployee.vue';
import listEmployee from '../listEmployee.vue';
import editEmployee from '../editEmployee.vue';
</script>

<style scoped></style>