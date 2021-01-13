<template>
  <div class="home">
    <Search @search = "search = $event" />
    <Blogs :search="search" />
  </div>
</template>

<script>
import Search from "@/components/Home/Search";
import Blogs from "@/components/Home/Blogs";
export default {
  name: 'Home',
  components: {Blogs, Search},
  data(){
    return{
      search: "",
    }
  }
}
</script>
<style scoped lang="scss">
.home{
   min-height: 100vh;
}
</style>
