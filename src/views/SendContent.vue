<template>
  <div class="container">
      <div v-if="!sentContent" class="header">
        <div class="title">
          <h2>İçerik Gönder</h2>
        </div>
        <div class="alert">
          <span>Önemli hatırlatma!</span> İçerik gönderebilmeniz için gerekli tüm alanları doldurmanız gerekiyor. Gerekli tüm
          alanları doldurup içeriği gönderdikten sonra onaylama sürecine giren içeriğinizde bir hata görülmediği sürece onaylanacaktır. Desteğiniz için şimdiden teşekkür ederiz.
        </div>
      </div>
      <div v-if="sendingError !== null" class="errorBox">{{ sendingError }}</div>
      <div v-if="!sentContent" class="form">
        <div class="inputBox">
          <span>İçerik Başlığı</span>
          <input type="text" required v-model="sendContent.title">
        </div>
        <div class="inputBox">
          <span>Kategori Seçiniz</span>
          <select v-model="otherCategoriesControl">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="vuejs">VueJS</option>
            <option value="nodejs">NodeJS</option>
            <option value="php">PHP</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div class="inputBox" v-if="otherCategories">
          <span>Lütfen İçeriğinizin Kategorisini Yazarak Belirtiniz!</span>
          <input type="text" required v-model="sendContent.category">
        </div>
        <div class="inputBox">
          <span>İçeriğiniz</span>
          <vue-editor id="editor" :editor-toolbar="editorToolbar"  v-model="sendContent.text"> </vue-editor>
        </div>
        <div class="inputBox">
          <span>Adınız - Soyadınız</span>
          <input type="text" v-model="sendContent.fullName">
        </div>
         <div class="inputBox">
            <span>Sosyal Medya Linkiniz</span>
            <input type="text" v-model="sendContent.socialMedia">
         </div>
        <div class="permit">
          <label>
            <span  @click.prevent="anonymousAuthor = !anonymousAuthor">İçeriğin yazarı olarak adımı göster</span>
            <input type="checkbox" :checked="anonymousAuthor === true ? 'checked' : ''"  @click="anonymousAuthor = !anonymousAuthor">
          </label>
        </div>
        <div class="buttonBox">
          <button @click="sendingContent">İçeriği Gönder</button>
        </div>
      </div>
      <div class="sent" v-else>
        <div class="text">
          İçeriğiniz başarılı bir şekilde gönderildi. Desteğiniz için teşekkür ederiz!
        </div>
        <div class="svg">
          <svg class="heart-loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" version="1.1">
            <g class="heart-loader__group">
              <path class="heart-loader__square" stroke-width="1" fill="none" d="M0,30 0,90 60,90 60,30z"/>
              <path class="heart-loader__circle m--left" stroke-width="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"/>
              <path class="heart-loader__circle m--right" stroke-width="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"/>
              <path class="heart-loader__heartPath" stroke-width="2" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0" />
            </g>
          </svg>
        </div>
      </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { defaultEditorToolbar } from '../editorConfig';
import Axios from "axios";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      sentContent: false,
      otherCategories: false,
      otherCategoriesControl: "",
      anonymousAuthor: true,
      sendingError: null,
      sendContent: {
        title: "",
        category: "",
        text: "",
        fullName: "",
        author: "",
        socialMedia: ""
      }
    };
  },
  methods: {
    sendingContent(){
      this.anonymousAuthor === true ? this.sendContent.author = this.sendContent.fullName : this.sendContent.author = 'Anonim'
      console.log(this.sendContent)
      if(this.sendContent.title.length > 0 && this.sendContent.category.length > 0 && this.sendContent.text.length > 20 && this.sendContent.fullName.length > 0 && this.sendContent.author.length > 0){
        Axios.post(this.$store.state.baseURL + 'add/blog', {
          title: this.sendContent.title,
          text: this.sendContent.text,
          category: this.sendContent.category,
          name: this.sendContent.fullName,
          author: this.sendContent.author,
          socialMedia: this.sendContent.socialMedia.length > 4 ? this.sendContent.socialMedia : null
        }).then(res => {
          if(res.data.status === 1){
            this.sendingError = null;
            this.sentContent = true;
            this.sendContent.title = "";
            this.sendContent.category = "";
            this.sendContent.text = "";
            this.sendContent.fullName = "";
            this.sendContent.author = "";
            this.sendContent.socialMedia = "";
            setTimeout(() => { this.sentContent = false }, 10000)
          }else{
            console.log(res)
            this.sendingError = "Bir hata oluştu, lütfen tekrar deneyin!";
            setTimeout(() => { this.sendingError = null }, 10000)
          }
        })

      }else{
        this.sendingError = "Tüm alanları eksiksiz ve doğru bir şekilde dolduruğunuzdan emin olun!";
        setTimeout(() => { this.sendingError = null }, 10000)
      }
    }
  },
  computed: {
    editorToolbar() {
      return defaultEditorToolbar;
    },
  },
  watch: {
    sentContent(){
      setTimeout(() => {this.sentContent = false}, 8100)
    },
    otherCategoriesControl(){
      this.otherCategoriesControl === 'diger' ? this.otherCategories = true : this.otherCategories = false
      this.otherCategories === true ? this.sendContent.category = "" : this.sendContent.category = this.otherCategoriesControl
    },
  }
};
</script>
<style lang="scss" scoped>
.container{
  padding: 50px 0 25px;
  .header{
    width: 100%;
    h2{
      font-size: 39px;
    }
    .alert{
      background: #CCE5FF;
      padding: 20px;
      margin: 20px 0;
      color: #004085;
      border-radius: 5px;
      line-height: 24px;
      span{
        color: #004085;
        font-weight: bold;
      }
    }
  }
  .form{
    .inputBox{
      width: 100%;
      margin-bottom: 25px;
      span{
        display: block;
        font-size: 20px;
        margin-bottom: 5px;
        color: #6b7289;
      }
      input{
        width: 100%;
        height: 40px;
        font-size: 18px;
        padding: 0 10px;
        outline: none;
        border: 1px solid #dfe8ed;
      }
      select{
        width: 100%;
        height: 40px;
        outline: none;
        border: 1px solid #dfe8ed;
        padding: 0 10px;
        appearance: none;
        font-size: 17px;
      }
    }
    .permit{
      width: 100%;
      margin-bottom: 30px;
      font-size: 18px;
      text-align: right;
      *::selection{
        background: none;
      }
      input[type="checkbox"]{
        width: inherit; height: inherit;
        margin-left: 8px;
      }
    }
    .buttonBox{
      width: 100%;
      text-align: right;
      button{
        outline: none;
        border: 2px solid transparent;
        background: #0e1238;
        padding: 12px 22px;
        font-size: 17px;
        color: #dfe8ed;
        cursor: pointer;
        border-radius: 3px;
        transition: 300ms;
        &:hover{
          border-color: #0e1238;
          background: none;
          color: #0e1238;
        }
      }
    }
  }
  .sent{
    width: 100%;
    min-height: 77vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-top: 150px;
    margin: 0 auto !important;
    .text{
      width: 100%;
      text-align: center;
      font-size: 35px;
    }
    .svg{
      width: 100%;
      height: 350px;
    }
  }
}

@media (max-width: 1180px) {
   .container{
      padding: 40px 15px;
   }
   h2{
      text-align: center;
      font-size: 32px !important;
   }
}

$strokeColor: #b8b8b8;
$heartColor: #e21737;
$size: 150px;
$totalAnim: 8s;
$delay: 1s;
$squareLen: 240;
$circleLen: 188.522;
$heartLen: 308.522;
$svgSize: 90px;
$circleW: 60px;

.heart-loader {
  position: relative;
  width: $size;
  height: $size;
  margin-top: 50px;
  margin-left: 150px;
  overflow: visible;

  &__group {
    transform-origin: 0 $svgSize;
    animation: group-anim $totalAnim $delay infinite;
  }
  &__square {
    stroke: $strokeColor;
    stroke-dasharray: $squareLen, $squareLen;
    stroke-dashoffset: $squareLen;
    animation: square-anim $totalAnim $delay infinite;
  }
  &__circle {
    stroke: $strokeColor;
    stroke-dasharray: $circleLen, $circleLen;
    stroke-dashoffset: $circleLen;
    transform-origin: $circleW $circleW/2;

    &.m--left {
      animation: left-circle-anim $totalAnim $delay infinite;
    }

    &.m--right {
      animation: right-circle-anim $totalAnim $delay infinite;
    }
  }
  &__heartPath {
    stroke: $heartColor;
    fill: transparent;
    stroke-dasharray: $heartLen, $heartLen;
    stroke-dashoffset: $heartLen;
    animation: heart-anim $totalAnim $delay infinite;
  }
}
@keyframes square-anim {
  12% {
    stroke-dashoffset: 0;
  }
  43% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
@keyframes left-circle-anim {
  12% {
    stroke-dashoffset: $circleLen;
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateY(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateY($circleW/-2);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateY($circleW/-2);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateY($circleW/-2);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateY($circleW/-2);
    opacity: 0;
  }
}
@keyframes right-circle-anim {
  12% {
    stroke-dashoffset: $circleLen;
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateX(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateX($circleW/2);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateX($circleW/2);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateX($circleW/2);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateX($circleW/2);
    opacity: 0;
  }
}
@keyframes group-anim {
  43% {
    transform: rotate(0);
  }
  54% {
    transform: rotate(-45deg);
  }
  90% {
    transform: rotate(-45deg);
    opacity: 1;
  }
  97% {
    transform: rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: rotate(-45deg);
    opacity: 0;
  }
}
@keyframes heart-anim {
  55% {
    stroke-dashoffset: $heartLen;
    fill: transparent;
  }
  70% {
    stroke-dashoffset: 0;
    fill: transparent;
  }
  87% {
    stroke-dashoffset: 0;
    fill: $heartColor;
  }
  100% {
    stroke-dashoffset: 0;
    fill: $heartColor;
  }
}


</style>
