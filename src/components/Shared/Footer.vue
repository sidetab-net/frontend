<template>
  <footer>
    Copyright © {{ new Date().getFullYear() }} <b>SideTab</b>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
  footer{
    width: 100%;
    line-height: 30px;
    padding: 5px 0;
    border-top: 1px solid #dfe8ed;
    text-align: center;
    margin-top: 40px;
     color: rgba(0, 0, 0, .7);
     b{
        cursor: pointer;
        color: rgba(0, 0, 0, .8);
        &::selection{
           background: none;
        }
     }
  }
</style>
