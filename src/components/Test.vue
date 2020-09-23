<template>
  <div class="home" v-title data-title="首页">
    <div class="img">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div
      v-for="(item,index) in 4"
      :key="index"
      ref="drap"
      class="resize wow fadeInLeft"
      @mouseup="rup()"
      @mousemove="move($event)"
      @mousedown="zoomBind($event)"
    ></div>
    <div class="nav">
      <div
        v-for="(item,index) in 4"
        :key="index"
        data-wow-duration="1s"
        :data-wow-delay="index/2+'s'"
        class="navItem wow fadeInLeft"
      >{{item}}</div>
    </div>
    <div class="number">
      <animate-number from="1" to="10" duration="1000" easing="easeOutQuad" :formatter="formatter"></animate-number>
      <br />
      <!-- from是开始值，to是结束值 -->
      <animate-number from="1" to="10"></animate-number>
      <br />
      <animate-number
        ref="myNum"
        duration="1000"
        style="color:red"
        from="0"
        to="1000"
        mode="manual"
      ></animate-number>
      <br />
      <!-- 也可以通过按钮去触发-->
      <button type="button" @click="startAnimate()">animate!</button>
    </div>
    <div class="nav">
      <div ref="line" :style="`width:100px;left:${100*currentIndex}px`" class="line"></div>
      <ul>
        <li ref="he" v-for="(item,index) in nav" :key="index">
          <h2
            :style="index==currentIndex?'color:#4accff;font-weight:normal':''"
            @click="toLink(item,index)"
          >{{item.title}}</h2>
          <!-- <div
            v-if="item.nav"
            :style="item.nav?(index==moverIndex?`height:${50 *item.nav.length}px`:''):''"
            class="mnav animate__animated animate__fadeIn"
          >
            <ul>
              <li
                v-for="(litem,lindex) in item.nav"
                @click="ltoLink(litem,index)"
                :key="lindex"
              >{{litem.title}}</li>
            </ul>
          </div>-->
        </li>
      </ul>
    </div>
    <div class="swipe">
      <!-- <el-carousel :interval="5000" indicator-position="none" height="calc(100vh)" arrow="always"> -->
      <el-carousel :interval="5000" height="600" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="../assets/test.png" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
export default {
  name: "Home",
  data() {
    return {
      isDrop: false,
      x: 0,
      y: 0,
      number: 600,
      nav: [
        {
          title: "首页",
          url: "/main"
        },
        {
          title: "公司简介",
          url: "/comContent",
          nav: [
            { title: "公司简介", url: "gsjj" },
            { title: "主要领导介绍", url: "zyldjs" },
            { title: "组织结构", url: "zzjg" },
            { title: "专家顾问", url: "zjgw" }
          ]
        },
        {
          title: "信息动态",
          url: "/news",
          nav: [
            { title: "行业新闻", url: "hyxw" },
            { title: "政策法规", url: "zcfg" },
            { title: "项目动态", url: "xmdt" },
            {
              title: "通知公告",
              url: "tzgg"
            }
          ]
        },
        {
          title: "业务介绍",
          url: "/goods",
          nav: [{ title: "教育培训领域", url: "jypxly" }]
        },
        {
          title: "交流中心",
          url: "/center",
          nav: [
            { title: "论坛", url: "lt" },
            { title: "问题解答", url: "wtyd" }
          ]
        },
        {
          title: "行业合作",
          url: "/computions",
          nav: [
            { title: "合作模式", url: "hzms" },
            { title: "合作机构", url: "hzjg" },
            { title: "产品推广", url: "cptg" }
          ]
        },
        {
          title: "联系我们",
          url: "/conntect",
          nav: [
            { title: "联系方式", url: "lxfs" },
            { title: "加入我们", url: "jrwm" },
            { title: "留言板", url: "lyb" }
          ]
        },
        {
          title: "产品",
          url: "/cp",
          nav: [
            { title: "针刺练习模型", url: "zclxmx" },
            { title: "中医针刺实训", url: "zyzcxs" },
            { title: "中医推拿实训", url: "zytnxs" },
            { title: "中医诊断实训", url: "zyzdxs" },
            { title: "中医基础实训", url: "zyjcxs" }
          ]
        }
      ],
      currentIndex: 0,
      moverIndex: -1,
      moverItem: {},
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      let wow = new WOW.WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true
      });
      wow.init();
    }, 200);
    this.mySwiper.slideTo(0, 1000, true);
  },
  directives: {
    swiper: directive
  },
  methods: {
    // 点击跳转
    toLink(item, index) {
      this.currentIndex = index;
    },
    // 鼠标移出
    noHeight(item, index) {
      this.currentIndex = -1;
      // this.$refs.he[index].childNodes[1].style = "height:0";
    },
    // 鼠标移动切换导航栏
    changHeight(item, index) {
      this.currentIndex = index;
      this.moverItem = item;
      // if (item.nav) {
      //   this.$refs.he[index].childNodes[1].style = `height:${50 *
      //     item.nav.length}px`;
      //   this.$refs.line.style = `width:100px;left:${100*(index-1)+72}px`;
      // } else {
      //   this.$refs.line.style = `width:72px;`;
      // }
    },
    formatter: function(num) {
      return num.toFixed(2);
    },
    startAnimate: function() {
      this.$refs.myNum.start();
    },
    zoomBind(e) {
      let box = this.$refs.drap;
      var e = e || window.event;
      this.x = e.clientX - box.offsetLeft;
      this.y = e.clientY - box.offsetTop;
      this.isDrop = true; //设为true表示可以移动
    },
    move(e) {
      let box = this.$refs.drap;
      if (this.isDrop) {
        var e = e || window.event;
        var moveX = e.clientX - this.x; //得到距离左边移动距离
        var moveY = e.clientY - this.y; //得到距离上边移动距离
        box.style.left = moveX + "px";
        box.style.top = moveY + "px";
      } else {
        return;
      }
    },
    rup() {
      this.isDrop = false;
    }
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
.home {
  .nav {
    position: relative;
    .line {
      width: 0px;
      border-bottom: 1px solid #000;
      position: absolute;
      transition: 0.5s all linear;
      left: 0;
      top: 49px;
    }
    ul {
      display: flex;
      align-items: center;
      color: #333333;
      li {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        position: relative;

        h2 {
          padding: 0 10px;
          margin-bottom: 20px;
          cursor: pointer;
          font-weight: 600;
        }

        .mnav {
          height: 0;
          width: 100px;
          background-color: rgb(65, 91, 118);
          position: absolute;
          transition: 0.5s linear all;
          left: 0;
          top: 50px;
          overflow: hidden;

          ul {
            margin: 0;
            color: #ffffff;
            display: flex;
            align-items: center;
            font-size: 15px;
            flex-direction: column;
            text-align: center;

            li {
              height: 50px;
              line-height: 50px;
              cursor: pointer;
              &:hover {
                background-color: #347ffe;
              }
            }
          }
        }
      }

      li:hover {
        h2 {
          font-weight: normal;
        }
      }
    }
  }
  .img {
    margin: 30px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 1s all linear;
      &:hover {
        transform: scale(1.5);
      }
    }
  }
  .resize {
    width: 137px;
    height: 137px;
    margin: 30px;
    position: absolute;
    top: 0px;
    left: 830px;
    background-color: #ddd;
    border: 1px solid #000;
    cursor: pointer;
  }
  .nav {
    display: flex;
    .navItem {
      width: 100px;
      height: 100px;
      background-color: #4a4daa;
      margin-left: 30px;
    }
  }
  .number {
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .swipe {
    margin: 30px 0;
    width: 100%;
    .el-carousel__item {
      img {
        width: 100%;
      }
    }
    .el-carousel__container {
      .el-carousel__button {
        background-color: red;
      }
      .el-carousel__indicators--horizontal {
        bottom: 300px !important;
      }
      .el-carousel__arrow {
        border-radius: 30%;
        background-color: #4accff;
      }
    }
  }
  .swiper-container /deep/ .swiper-pagination-bullet {
    width: 100px;
    height: 30px;
    background-color: red;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
