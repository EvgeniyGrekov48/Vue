<template>
  <div id="app">
    <MyTable :title="msg"/>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import MyTable from "@/components/MyTable.vue";

export default defineComponent({
  components: {
    MyTable
  },
  data() {
    return {
      msg: 'Запись на мероприятие 1 мая в 18.00',
    }
  }
});
</script>

<style lang="scss">
body {
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 75rem;
}
</style>
