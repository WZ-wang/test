<template>
  <div class="main">
    <div class="swipe">
      <el-carousel :interval="5000" indicator-position="none" height="calc(100vh)" arrow="always">
        <!-- <el-carousel :interval="5000" height="600" arrow="always"> -->
        <el-carousel-item v-for="item in 4" :key="item">
          <img style="width:100%;height:100%" src="../assets/swip.png" alt />
        </el-carousel-item>
      </el-carousel>
      <div class="sTitle">
        <h1>让未来一起迎风起航</h1>
        <p>我们的基本目标实现四个基本目标</p>
      </div>
    </div>
    <div class="program">
      <div class="showProgram">
        <div class="pHeader">
          <div class="pleft"></div>
          <div class="pcenter"></div>
          <div class="pright"></div>
        </div>
        <h2>PROJECT PRESENTATION</h2>
        <h1>项目展示</h1>
        <div class="pwrapper">项目内容</div>
      </div>
    </div>
    <div class="news">
      <div class="nHeader">
        <img src="../assets/bg.png" alt />
      </div>
      <div class="newsWrapper">
        <div class="newsLeft">
          <div class="newsLfetContent">
            <h2>NEWS INFORMATION</h2>
            <h1>新闻资讯</h1>
            <img src="../assets/swip.png" alt />
            <div class="newsLeftContentTime">
              <p>时间: 2020-09-11</p>
              <p>浏览量: 1121</p>
            </div>
            <div class="newsLeftContentTitle">
              <h3>新闻标题大声道撒大所大所大所大所大所大所多新闻标题大声道撒大所大所大所大所大所大所多</h3>
            </div>
            <p>大厦大家都撒会觉得会撒娇大好时机的撒回到家阿萨德大厦大家都撒会觉得会撒娇大好时机的撒回到家阿萨德大厦大家都撒会觉得会撒娇大好时机的撒回到家阿萨德</p>
            <h4>查看详情 -></h4>
          </div>
        </div>
        <div class="newsRight">
          <div class="newsRightNav">
            <div ref="line" :style="`left:${110*currentIndex}px`" class="line"></div>
            <ul>
              <li ref="he" v-for="(item,index) in nav" :key="index">
                <h2
                  :style="index==currentIndex?'color:#fff;':''"
                  @click="toLink(item,index)"
                >{{item.title}}</h2>
              </li>
            </ul>
          </div>
          <div class="newsRightWrapper">
            <div class="newsRightContent" v-for="(item,index) in 5" :key="index">
              <h3>新闻标题啥打卡时间的哈萨克动画</h3>
              <div class="newsRightContentTime">
                <p>时间: 2020-09-11</p>
                <p>浏览量: 1121</p>
              </div>
            </div>
            <h5>查看全部新闻动态 -></h5>
          </div>
        </div>
      </div>
    </div>
    <div class="compution">
      <h2>COOPERATIVE ORGANIZATION</h2>
      <h1>合作机构</h1>
      <div class="comContent">
        <div class="comWrapper" v-for="(item,index) in 5" :key="index">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="comLeft el-icon-arrow-left"></div>
        <div class="comRight el-icon-arrow-right"></div>
      </div>
      <div class="getMore">查看更多</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      nav: [
        {
          title: "行业动态",
          url: "/news"
        },
        {
          title: "机构动态",
          url: "/goods"
        },
        {
          title: "项目动态",
          url: "/center"
        }
      ],
      currentIndex: 0
    };
  },
  methods: {
    // 点击跳转
    toLink(item, index) {
      this.currentIndex = index;
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  .swipe {
    width: 100%;
    position: relative;
    .sTitle {
      height: 100%;
      z-index: 10;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      color: #ffffff;
      h1 {
        margin-top: calc(15%);
        font-size: 36px;
        margin-bottom: 60px;
      }
      p {
        font-size: 16px;
      }
    }
  }
  .program {
    position: relative;
    padding-bottom: 20px;
    background-color: #fafafa;
    width: 100%;
    height: 420px;
    .showProgram {
      background-color: #fff;
      width: 854px;
      margin: 0 auto;
      height: 600px;
      box-shadow: 2px 2px 6px #ccc;
      position: absolute;
      top: -180px;
      z-index: 12;
      text-align: center;
      left: calc((100% - 854px) / 2);
      .pHeader {
        height: 20px;
        display: flex;
        justify-content: space-between;
        .pleft {
          width: 160px;
          background-color: #0588c7;
        }
        .pcenter {
          margin: 0 5px;
          flex: 1;
          background-color: #f5f5f5;
        }
        .pright {
          width: 160px;
          background-color: #ff7233;
        }
      }

      h2 {
        font-size: 16px;
        color: #3c3c3c;
        margin-top: 40px;
      }
      h1 {
        font-size: 24px;
        color: #000;
        margin: 10px 0 40px;
      }
    }
  }
  .news {
    width: 100%;
    .nHeader {
      width: 100%;
      height: 200px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .newsWrapper {
      width: 100%;
      height: 640px;
      display: flex;
      align-items: flex-end;
      .newsLeft {
        width: 44%;
        height: 100%;
        padding-top: 60px;
        display: flex;
        justify-content: flex-end;
        background-color: #376095;
        .newsLfetContent {
          margin-right: 44px;
          width: 300px;
          h2 {
            font-size: 16px;
            color: #fefffc;
            margin: 20px 0 10px;
          }
          h1 {
            font-size: 24px;
            color: #fff;
            margin-bottom: 40px;
          }
          img {
            width: 100%;
            height: 200px;
          }
          .newsLeftContentTime {
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            p {
              line-height: 1;
            }
          }
          .newsLeftContentTitle {
            margin-bottom: 20px;
            h3 {
              font-size: 20px;
              color: #fff;
              line-height: 1.5;
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          p {
            max-height: 84px;
            overflow: hidden;
            color: #d5d5d5;
            line-height: 1.5;
            font-size: 14px;
          }
          h4 {
            font-size: 14px;
            cursor: pointer;
            color: #fff;
            margin-top: 30px;
            &:hover {
              color: #ff7233;
            }
          }
        }
      }
      .newsRight {
        width: 56%;
        height: 100%;
        background-color: #4a77b3;
        padding-left: 60px;
        .newsRightNav {
          margin-bottom: 40px;
          margin-top: 40px;
          position: relative;
          .line {
            width: 70px;
            height: 2px;
            background-color: #fff;
            position: absolute;
            transition: 0.3s all linear;
            left: 0;
            bottom: -6px;
          }
          ul {
            display: flex;
            align-items: center;
            color: #d5d5d5;
            li {
              width: 70px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-right: 40px;
              font-size: 16px;
              h2 {
                margin-bottom: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .newsRightWrapper {
          width: 460px;
          .newsRightContent {
            width: 100%;
            border-bottom: 1px dotted #fff;
            h3 {
              font-size: 16px;
              color: #fff;
              margin-top: 20px;
              cursor: pointer;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:hover {
                text-decoration: underline;
              }
            }
            .newsRightContentTime {
              margin: 20px 0;
              display: flex;
              justify-content: space-between;
              p {
                line-height: 1;
                font-size: 14px;
                color: #d5d5d5;
              }
            }
          }
          h5 {
            display: flex;
            justify-content: flex-end;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            margin-top: 30px;
            &:hover {
              color: #ff7233;
            }
          }
        }
      }
    }
  }
  .compution {
    width: 100%;
    background-color: #fafafa;
    text-align: center;
    padding-bottom: 60px;
    h2 {
      font-size: 16px;
      padding-top: 56px;
      color: #000;
      margin: 0px 0 10px;
    }
    h1 {
      font-size: 24px;
      color: #0588c9;
      margin-bottom: 40px;
    }
    .comContent {
      width: 854px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      position: relative;
      height: 150px;
      .comWrapper {
        width: 150px;
        height: 150px;
        border: #aaa solid 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
          line-height: 150px;
          text-align: center;
        }
      }
      .comLeft{
          position: absolute;
          left: -30px;
          top: 63px;
          font-size: 24px;
      }
      .comRight{
          position: absolute;
          right: -30px;
          top: 63px;
          font-size: 24px;
      }
    }
    .getMore {
      margin: 40px auto ;
      font-size: 16px;
      color: #000;
      cursor: pointer;
      border: 1px solid #aaa;
      width: 110px;
      height: 30px;
      line-height: 30px;
      &:hover{
          background-color: #ff7233;
          color: #fff;
      }
    }
  }
}
</style>