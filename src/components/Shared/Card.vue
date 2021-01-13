<template>
 <div class="card-container"
      v-if="search !== '' && blog !== '' &&
                             blog.text.toLowerCase().includes(search) ||
                             blog.title.toLowerCase().includes(search) ||
                             blog.author.toLowerCase().includes(search) ||
                             blog.category.toLowerCase(). includes(search)">
   <div class="card">
     <div class="title">
       <h3>{{ blog.title }}</h3>
     </div>
     <div class="text" v-html="blog.text.length > 302 ? blog.text.slice(0, 302) + '...' : blog.text">
     </div>
     <div class="actions">
       <router-link tag="div"
                    :to="blog.id + '/' + blog.link"
                    class="readmore">
         <span>Devamını Oku</span>
         <icon name="right-arrow" />
       </router-link>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    blog: {
      required: false,
    },
    search: {
      required: false,
      type: String
    },
  }
}

</script>

<style lang="scss" scoped>
  .card-container{
    padding: 0 7px 14px;
    width: 50%;
  }
  .card{
    min-height: 200px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 20px 53px -30px rgba(95,102,173,.57);
    padding: 25px;
    position: relative;
    overflow: hidden;
    .title h3{
        font-size: 20px;
        letter-spacing: 1px;
    }
    .text{
      padding-top: 10px;
      opacity: .5;
      transition: 300ms;
      *{
         font-weight: normal !important;
         font-size: 16px !important;
      }
    }
    .actions{
      width: 100%;
      padding: 18px 0;
      background: #f9fbfc;
      position: absolute;
      transform: translateY(200px);
      left: 0;
      bottom: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      transition: 300ms;
      *::selection{
        background: none;
      }
      div{
        padding: 8px 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        svg{
          width: 20px;
          height: 20px;
        }
      }
      .readmore{
        background: #0e1238;
        border-radius: 5px;
        svg{
          fill: #FAFCFD;
        }
        span{
          color: white;
        }
      }
    }
    &:hover{
      .text{
         filter: blur(2px);
      }
      .actions{
         transform: translateY(0);
      }
    }
  }

  @media (max-width: 1016px) {
    .card{
      width: 100%;
      min-height: max-content;
    }
  }
  @media (max-width: 850px) {
    .card-container{
      width: 100%;
    }
  }
  @media (max-width: 470px) {
    .actions{
      flex-direction: column;
      div:first-child{
        margin-bottom: 15px;
      }
    }
  }
</style>
