<template>
  <div id="app">
    <div class="loader-container" v-if="this.$store.state.loader">
      <div class="loader"></div>
    </div>
    <div class="github-repo" v-if="githubRepo">
      <div class="container">
        <h4>sidetab.net açık kaynak geliştirilen bir projedir. Destek olmak isterseniz
          <a href="https://github.com/sidetab-net" target="_blank">Github Repo</a>'suna buradan ulaşabilirsiniz!
        </h4>
        <button @click="githubRepo = false">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
        </button>
      </div>
    </div>
    <a href="" class="back-to-top" id="backtotop" @click="backtotop">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" class="up-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
    </a>
    <Nav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Nav from "@/components/Shared/Nav";
import Footer from "@/components/Shared/Footer";
export default {
  data(){
    return{
      githubRepo: true,
    }
  },
  components: {Footer, Nav},
  created() {
    this.$store.dispatch('fetchBlogs');
    this.$store.dispatch('fetchNotice');
  },
  methods: {
    backtotop(e){
       e.preventDefault();
       window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500&display=swap%27');
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@800&display=swap');
// colors => background:#FAFCFD color:#000 blue:#242486 nav-background: #10101D
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
}
html{
  scroll-behavior: smooth;
}
html,body{
  font-family: 'Mulish', sans-serif;
  background: #FAFCFD;
  color: #f1f1f1;
}
.container{
  width: 1100px;
  height: 100%;
  margin: 0 auto;
}
.errorBox{
  font-size: 16px;
  background: #F8D7DA;
  color: #721c24;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 20px 0;
}
.github-repo{
  width: 100%;
  height: 40px;
  font-family: 'Mulish', sans-serif;
  background: #242e4c;
  .container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
      border: none;
      background: none;
      outline: none;
      width: 25px;
      height: 25px;
      cursor: pointer;
      svg{
        width: 100%;
        path{
          fill: #e0e0e0;
        }
      }
    }
    h4{
      font-size: 15px;
      font-weight: 500;
      color: #e0e0e0;
      &::selection{
        background: none;
      }
      a{
        color: #03A9F4;
      }
    }
  }
}

.back-to-top{
  width: 35px;
  height: 35px;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  display: none;
  place-content: center;
  cursor: pointer;
  z-index: 999;
  .up-svg{
    width: 13px;
    path{
      fill: #e0e0e0;
    }
  }
}

.card .text *{
   font-size: 16px;
   font-weight: normal;
   &::selection{
      background: none;
   }
}
.card .text ul,
.card .text ol,
.card .text li{
   display: none;
}

/* @blogDetail  */
.content{
  margin: 50px 0;
  h1{
    font-size: 35px;
    margin-bottom: 15px;
  }
  &-text{
    h2{
      font-size: 27px;
      margin-top: 25px;
    }
    h3{
      font-size: 23px;
      margin-top: 25px;
    }
    p{
      font-size: 20px;
      line-height: 35px;
    }
    ul, ol{
      font-size: 20px;
      line-height: 35px;
      margin: 10px 0 10px 17px;
    }
    a{
      color: #004085;
    }
    pre{
      background: #23241F;
      color: white;
      padding: 15px;
      border-radius: 5px;
      font-size: 15px;
      margin: 10px 0;
    }
    blockquote{
      border-left: 5px solid #23241F;
      border-radius: 2px;
      padding-left: 10px;
      font-size: 20px;
      line-height: 35px;
      margin: 8px 0;
    }
  }
  &-footer{
    margin-top: 30px;
    font-size: 18px;
    text-align: right;
    span h5{
      font-size: 18px;
      font-weight: 500;
      display: inline-block;
    }
  }
}

@media (max-width: 1125px){
   .container{
      width: 100% !important;
      padding: 0 20px;
   }
  .github-repo{
    display: none;
  }
}
@media (max-width: 550px) {
   .header{
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .share{
         margin-top: 20px;
      }
   }
   .ql-syntax{
      width: 100%;
      overflow-x: auto;
   }
}

.loader-container{
  width: 100%;
  height: 100vh;
  position: fixed;
  background: #1D1F20;
  display: grid;
  place-items: center;
  z-index: 999;
}
.loader  {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
}
.loader:before,
.loader:after {
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
}
.loader:before {
  animation: ball1 1s infinite;
  background-color: #cb2025;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}
.loader:after {
  animation: ball2 1s infinite;
  background-color: #00a096;
  box-shadow: 30px 0 0 #97bf0d;
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(0.8);
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(0.8);
    -moz-transform: rotate(720deg) scale(0.8);
  }
}
@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
}
@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #97bf0d;
  }
  50% {
    box-shadow: 0 0 0 #97bf0d;
    margin-top: -20px;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #97bf0d;
    margin-top: 0;
  }
}
</style>
