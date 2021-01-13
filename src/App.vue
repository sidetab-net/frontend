<template>
  <div id="app">
    <div class="loader-container" v-if="loader">
      <div class="loader"></div>
    </div>
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
      loader: true,
    }
  },
  components: {Footer, Nav},
  created() {
    this.$store.dispatch('fetchBlogs');
    this.$store.dispatch('fetchNotice');
    setTimeout( () => { this.loader = false }, 1000)
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

.card .text *{
   font-size: 16px;
   font-weight: normal;
   overflow: hidden;
   line-height: 25px;
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
