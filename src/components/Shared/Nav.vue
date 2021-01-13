<template>
  <nav>
    <div class="container">
      <router-link tag="div" to="/" class="logo">
        SideTab
      </router-link>
      <div class="actions">
        <div class="sendContent">
          <router-link tag="a" to="/send-content">İçerik Gönder</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
name: "Nav"
}
</script>

<style lang="scss" scoped>
nav{
  width: 100%;
  height: 60px;
  background: #10101D;
  border-bottom: 1px solid rgba(#ccc, .2);
  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      font-size: 30px;
      color: #FAFCFD;
      cursor: pointer;
       font-family: 'Dosis', sans-serif;
       &::selection{
          background: none;
       }
    }
    .actions{
      display: flex;
      .sendContent{
        background: #242486;
        border-radius: 5px;
        display: inline-block;
        text-align: center;
        padding: 10px 15px;
        a{
          color: #FAFCFD;
        }
      }
    }
  }
}
</style>
