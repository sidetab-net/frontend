<template>
  <div class="container">
    <div class="notice" v-for="(i, index) in notice" :key="i.id">
      <h3 v-if="index < 1">
        {{ i.text }}
      </h3>
    </div>
    <div class="searchBox">
      <div class="icon">
        <icon name="search" />
      </div>
      <input type="text" v-model="search" placeholder="HTML Nedir?, CSS Nedir?">
    </div>
    <div class="tags">
      <span class="tag html" @click="search = 'html'">HTML</span>
      <span class="tag css" @click="search = 'css'">CSS</span>
      <span class="tag js" @click="search = 'javascript'">JavaScript</span>
      <span class="tag vue" @click="search = 'vuejs'">VueJS</span>
      <span class="tag node" @click="search = 'nodejs'">NodeJS</span>
      <span class="tag php" @click="search = 'php'">PHP</span>
    </div>
  </div>
</template>

<script>
export default {
name: "Search",
  data(){
    return{
      search: "",
    }
  },
  computed: {
    notice(){
      return this.$store.getters.getNotice;
    }
  },
  watch: {
    search(){
      this.$emit('search', this.search.trim());
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  min-height: 350px;
  .notice{
    width: 500px;
    margin-bottom: 50px;
    h3{
      font-size: 28px;
      color: #0e1238;
      text-align: center;
    }
  }
  .searchBox{
    width: 80%;
    display: flex;
    position: relative;
    input{
      outline: none;
      width: 100%;
      height: 80px;
      padding: 0 20px 0 90px;
      border: 1px solid #dfe8ed;
      border-radius: 40px;
      font-size: 20px;
      color: #6b7289;
      font-family: Mulish, sans-serif -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .icon{
      position: absolute;
      top: 0;
      left: 20px;
      height: 80px;
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        width: 34px;
        height: 34px;
        opacity: .4;
      }
    }

  }
  .tags{
    max-width: 100%;
    margin-top: 15px;
    text-align: center;
    .tag{
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 5px;
      padding: 4px 14px;
      border: 1px solid #fff;
      border-radius: 4px;
      cursor: pointer;
      transition: 300ms;
      &::selection{
        background: none;
      }
      &.html{
        background: rgba(#E54D27, .4);
      }
      &.css{
        background: rgba(#33A9DC, .4);
      }
      &.js{
        background: rgba(#EFD81D, .4);
      }
      &.vue{
        background: rgba(#41B883, .4);
      }
      &.node{
        background: rgba(#68A063, .4);
      }
      &.php{
        background: rgba(#777BB3, .4);
      }
    }
  }
}
@media (max-width: 1016px) {
  .searchBox{
    width: 100% !important;
  }
  .tags{
    width: 100%;
  }
}
@media screen and (max-width: 550px) {
  .notice{
    width: 100% !important;
    h3{
      font-size: 22px !important;
    }
  }
  .searchBox{
    width: 100% !important;
    .icon{
      padding: 0 5px;
      left: 7px !important;
      height: 100% !important;
      width: 40px !important;
      svg{
        width: 25px !important;
        height: 25px !important;
      }
    }
    input{
      border-radius: 10px !important;
      height: 65px !important;
      padding: 0 5px 0 50px !important;
      font-size: 16px !important;
      &::placeholder{
         opacity: .5;
      }
    }
  }
}
</style>
