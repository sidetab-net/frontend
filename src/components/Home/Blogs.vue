<template>
  <div class="container" v-if="searchCount === 0">
    <div class="errorBox">Maalesef "{{ search }}" ile ilgili herhangi bir sonuç bulunamadı!</div>
  </div>
  <div class="cards container" v-else>
     <Card :search="search" :blog="blog" v-for="(blog, index) in blogs" :key="index" />
  </div>
</template>

<script>
import Card from "@/components/Shared/Card";
export default {
  name: "Blogs",
  components: {Card},
  props: ["search"],
  data(){
    return{
      searchCount: null
    }
  },
  computed: {
    blogs(){
      return this.$store.getters.getBlogs;
    }
  },
  watch: {
    search() {
      this.searchCount = this.blogs.length;
      this.blogs.forEach(blog => {
        if(blog.text.toLowerCase().includes(this.search) ||
            blog.title.toLowerCase().includes(this.search) ||
            blog.author.toLowerCase().includes(this.search) ||
            blog.category.toLowerCase(). includes(this.search) && blog.active !== 1){
          this.searchCount++;
        }else{
          this.searchCount--;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .errorBox{
    line-height: 30px;
    text-align: center;
    overflow: hidden;
  }
  .cards {
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
  }
  @media (max-width: 850px) {
    .cards{
      flex-direction: column;
    }
  }

</style>
