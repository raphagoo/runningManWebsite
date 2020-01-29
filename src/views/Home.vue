<template>
  <div class="home">
    <p>Hello word</p>
    <ApiConsumption/>
  </div>
</template>

<script>
import ApiConsumption from '../components/ApiConsumption.vue'

export default {
    name: 'home',
    components: {
        ApiConsumption
    }
}
</script>
