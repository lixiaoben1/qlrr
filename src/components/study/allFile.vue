<script setup>
import VueOfficePdf from '@vue-office/pdf'
const pdf = '../../复习资料/表格(重要).pdf'
</script>

<template>
  <vue-office-pdf :src="pdf" />
</template>

<style scoped></style>
