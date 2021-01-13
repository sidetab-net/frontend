<template>
  <div>
    <div v-for="blog in blogs" :key="blog.id">
      <div class="container" v-if="blog.id == $route.params.id">
        <div class="popup" :class="sharePopup === true ? 'open' : ''">
          <div class="popup-inner share-popup">
            <label class="popup-close" @click="sharePopup = false">
              <icon name="close" />
            </label>
            <h4>Paylaş</h4>
            <ul>
              <li>
                <a
                    target="_blank"
                    :href="
                    'https://twitter.com/intent/tweet?text=' +
                      blog.title +
                      '&url=http://sidetab.net' +
                      $route.path
                  "
                >
                  <icon name="twitter" />
                </a>
              </li>
              <li>
                <a
                    target="_blank"
                    :href="
                    'https://www.facebook.com/sharer/sharer.php?u=http://sidetab.net' +
                      $route.path
                    ">
                  <icon name="facebook" />
                </a>
              </li>
              <li>
                <a
                    target="_blank"
                    :href="
                    'https://www.linkedin.com/shareArticle?mini=true&url=http://sidetab.net' +
                      $route.path
                    ">
                  <icon name="linkedin" />
                </a>
              </li>
            </ul>
            <h6>veya linki kopyala</h6>
            <div class="input" :class="linkCopy === true ? 'click' : ''">
              <input
                  type="text"
                  readonly
                  id="input-url"
                  :value="'http://sidetab.net' + $route.path"
              />
              <button type="button" @click="copy('input-url')">Kopyala</button>
            </div>
          </div>
        </div>
        <div class="alert" :class="linkCopy === true ? 'active' : ''">
          Başarıyla kopyalandı.
        </div>
        <div class="header">
          <div class="avatar">
            <div class="image">
              <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="">
            </div>
            <div class="author">
              <a :href="blog.social_media" :target="blog.social_media !== null ? '_blank' : ''"> {{ blog.author }} </a>
              <span> {{ blog.created_date }} </span>
            </div>
          </div>
          <div class="share" @click="sharePopup = !sharePopup">
            <icon name="share" />
            <span>Paylaş</span>
          </div>
        </div>
        <div>
          <div class="content">
            <div class="content-title">
              <h1>{{ blog.title }}</h1>
            </div>
            <div class="content-text" v-html="blog.text">
            </div>
            <div class="content-footer">
              <span>Kategori: <h5>{{ blog.category }}</h5></span>
            </div>
          </div>
        </div>
        <div class="comments">
          <div class="comments-header">
            <span>SİTE İÇİ YORUMLAR</span>
          </div>
          <div class="error-box" v-if="errorBox">{{ errorText }}</div>
          <div class="success-box" v-if="successBox">{{ successText }}</div>
          <div class="comments-form">
            <div class="author-info">
              <div class="input-box">
                <span>Ad Soyad</span>
                <input v-model="commentData.author" type="text">
              </div>
              <div class="input-box">
                <span>Email</span>
                <input type="email" v-model="commentData.email">
              </div>
            </div>
            <div class="input-box">
              <span>Yorumunuz</span>
              <textarea v-model="commentData.comment"></textarea>
            </div>
            <div class="button">
              <button type="button" @click="sendComment">Gönder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
name: "BlogDetail",
  data(){
    return{
      sharePopup: false,
      linkCopy: false,
      errorBox: false,
      errorText: "Lütfen boş alan bırakmayınız!",
      successBox: false,
      successText: "Yorumunuz başarılı bir şekilde gönderildi!",
      commentData: {
        author: "",
        email: "",
        comment: "",
      }
    }
  },
  methods: {
    copy(id) {
      document.getElementById(id).select();
      document.execCommand("copy");
      this.notification();
    },
    notification() {
      this.linkCopy = true;
      setTimeout(() => {
        this.linkCopy = false;
      }, 2500);
    },
    sendComment(){
      if(this.commentData.author.length > 1 && this.commentData.email.length > 1 && this.commentData.comment.length > 3){
        let reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        if(reg.test(this.commentData.email)){
          Axios.post(this.$store.state.baseURL + 'add/comment', {
            author: this.commentData.author,
            email: this.commentData.email,
            comment: this.commentData.comment,
          }).then(res => {
            if(res.data.status === 1){
              this.errorBox = false;
              this.successBox = true;
              this.commentData.author = "";
              this.commentData.email = "";
              this.commentData.comment = "";
              setTimeout(() => {this.successBox = false}, 7000)
            }else{
              this.errorBox = true;
              this.errorBox = "Bir hata oluştu, lütfen tekrar deneyin!"
              setTimeout(() => {this.errorBox = false}, 7000)
            }
          })
        }else{
          this.errorBox = true;
          this.errorText = "Lütfen geçerli bir e-mail adresi giriniz!"
          setTimeout(() => {this.errorBox = false}, 7000)
        }
      }else{
        this.errorBox = true;
        this.errorText = "Lütfen boş alan bırakmayınız!"
        setTimeout( () => {this.errorBox = false}, 5000 )
      }
    }
  },
  computed: {
    blogs(){
      return this.$store.getters.getBlogs;
    }
  },
  mounted(){
     Axios.post(this.$store.state.baseURL + 'update/views/' + Number(this.$route.params.id));
  }
}
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    .avatar{
      display: flex;
      align-items: center;
      .image{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        background: gray;
        position: relative;
        &::before{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
      .author{
        a{
          display: block;
          font-weight: 500;
          font-size: 19px;
        }
        span{
          color: rgba(black, .5);
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
    .share {
      font-size: 14px;
      font-weight: bold;
      padding: 10px 15px;
      display: inline-flex;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #ebebf2;
      cursor: pointer;
      transition: 250ms;
      &::selection {
        background: none;
      }
      &:hover{
        border-color: #ccc;
      }
      svg {
        width: 20px;
        margin-right: 10px;
      }
    }
  }
  .comments{
    margin-top: 30px;
    width: 100%;
    border: 1px solid #ccc;
    margin-bottom: 50px;

    &-header{
      width: 100%;
      height: 50px;
      background: #0e1238;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      span{
        color: white;
        font-size: 18px;
      }
    }
    &-form{
      padding: 30px 15px;
      .input-box{
        span{
          display: block;
          margin-bottom: 4px;
          font-size: 17px;
        }
        textarea{
          width: 100%;
          height: 200px;
          border: 1px solid #ccc;
          resize: none;
          outline: none;
          padding: 10px;
          font-family: sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 17px;
        }
      }
      .author-info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input-box{
          width: 100%;
          margin-bottom: 20px;
          &:not(:last-child){
            margin-right: 15px;
          }
          input{
            width: 100%;
            height: 35px;
            font-size: 17px;
            padding: 0 5px;
            outline: none;
            border: 1px solid #ccc;
          }
        }
      }
      .button{
        text-align: right;
        button{
          width: 150px;
          height: 40px;
          margin-top: 10px;
          background: #0e1238;
          border: 1px solid transparent;
          outline: none;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          border-radius: 3px;
          transition: 300ms;
          &:hover{
            border-color: #0e1238;
            background: none;
            color: black;
          }
        }
      }
    }
    .error-box, .success-box{
      width: 100%;
      height: 50px;
      background: red;
      display: flex;
      align-items: center;
      padding: 0 15px;
    }
    .success-box{
      background: #CCE5FF;
      color: #004085;
    }
    .error-box{
      background: #F8D7DA;
      color: #721c24;
    }

  }
  @media (max-width: 1180px) {
     .container {
        padding: 40px 15px;
     }
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    opacity: 0;
    visibility: hidden;
    &.open {
      opacity: 1;
      visibility: visible;
    }
    .popup-close-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .popup-close {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background: #f7f7fc;
      position: absolute;
      top: 25px;
      right: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 300ms background-color;
      &:hover {
        background: darken(#f7f7fc, 3%);
      }
      svg {
        height: 15px;
      }
    }
    .popup-inner {
      position: relative;
    }
    .share-popup {
      width: 808px;
      padding: 55px 78px;
      background: #fff;
      border-radius: 15px;
      h4 {
        font-size: 22px;
        font-weight: bold;
        color: #242e4c;
        margin-bottom: 40px;
      }
      ul {
        display: flex;
        list-style: none;
        margin-bottom: 40px;
        li {
          flex: 1;
          text-align: center;
          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 82px;
            height: 82px;
            border-radius: 50%;
            border: 1px solid #ebebf2;
            transition: 300ms border-color ease-in;
            svg {
              height: 35px;
            }
            &:hover {
              border-color: #00aced;
            }
          }
        }
      }
      h6 {
        font-size: 13px;
        font-weight: bold;
        color: #242e4c;
        margin-bottom: 10px;
      }
      .input {
        position: relative;
        border: 1px solid #ebebf2;
        &.click {
          border-color: green;
          button {
            border-left-color: green;
          }
        }
        button {
          position: absolute;
          top: 0;
          right: 0;
          height: 57px;
          padding: 0 40px;
          line-height: 57px;
          font-size: 14px;
          font-weight: bold;
          color: black;
          background: #fff;
          cursor: pointer;
          border: none;
          outline: none;
          border-left: 1px solid #ebebf2;
        }
        input {
          height: 57px;
          border-radius: 5px;
          width: 100%;
          padding: 0 15px;
          font-size: 16px;
          color: #242e4c;
          outline: none;
          border: none;
          &:focus {
            border-color: green;
          }
        }
      }
    }
  }
  .alert {
    position: fixed;
    bottom: -60px;
    left: 1%;
    padding: 13px 45px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #1b1b30;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: 300ms all;
    z-index: 11;
    &.active {
      bottom: 1%;
      opacity: 1;
      visibility: visible;
    }
  }
</style>
