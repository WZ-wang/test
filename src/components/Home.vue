<template>
  <div class="home">
    <header>
      <div class="head">
        <div class="hleft">
          <div class="logo">
            <img src="../assets/logot.png" alt />
          </div>
        </div>
        <div class="hright">
          <div class="nav">
            <div ref="line" :style="`left:${90*currentIndex+15}px`" class="line"></div>
            <ul>
              <li ref="he" v-for="(item,index) in nav" :key="index">
                <h2
                  :style="index==currentIndex?'color:#fe7333;':''"
                  @click="toLink(item,index)"
                >{{item.title}}</h2>
              </li>
            </ul>
          </div>
          <div class="search">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              @keyup.enter.native="search"
              v-model="keyword"
              size="small"
              style="width:150px"
            ></el-input>
            <div class="userInfo">
              <div class="userlogin" v-if="false">
                <span>登录</span> |
                <span>注册</span>
              </div>
              <div v-else class="lInfo">
                <el-dropdown trigger="click" placement="bottom" @command="setDialogInfo">
                  <span class="el-dropdown-link">
                    <img src="../assets/logo.png" alt />
                    <!-- <span>欢迎，{{phone}}</span>
                    <i class="el-icon-caret-bottom el-icon--right"></i>-->
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="password">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="right">
          <el-input
            size="small"
            @keyup.enter.native="search"
            placeholder="请输入内容"
            v-model="keyword"
            style="width:150px"
            clearable
          ></el-input>
          <i @click="search()" class="iconfont icon-sousuo"></i>
        </div>-->
      </div>
    </header>
    <keep-alive>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <footer>
      <div class="fot">
        <div class="content">
          <img src="../assets/logob.png" alt="">
          <div class="phone">
            <h4><span>电</span>话:136-2100-0732</h4>
            <h4><span>邮</span>箱:bjwlgk2018@163.com</h4>
            <h4><span>地</span>址:sdasdasdas</h4>
            <h4>技术支持:北京蔚来高科</h4>
          </div>
        </div>
        <div class="map">
          <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events">
            <el-amap-marker
              :position="marker.position"
              :events="marker.events"
              :visible="marker.visible"
              :draggable="marker.draggable"
            ></el-amap-marker>
          </el-amap>
        </div>
        <div class="fimg">
          <img src="../assets/logo.png" alt="">
        </div>
      </div>
      <h1>Copyright ©2018 北京蔚来高科技术有限公司（www.bjwlgk.com） 版权所有 | ICP经营许可证:京ICP备18061172号</h1>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Bus from "@/utils/bus.js";
export default {
  name: "Home",
  data() {
    let self = this;
    return {
      zoom: 12,
      center: [116.315423, 39.986708],
      searchOption: {
        city: "全国",
        citylimit: true
      },
      marker: {
        position: [116.315423, 39.986708]
      },
      address: "",
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.marker.position = [lng, lat];
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      lng: 0,
      lat: 0,
      nav: [
        {
          title: "首页",
          url: "/main"
        },
        {
          title: "关于我们",
          url: "/comContent"
        },
        {
          title: "公司动态",
          url: "/news"
        },
        {
          title: "信息公开",
          url: "/goods"
        },
        {
          title: "活动展示",
          url: "/center"
        },
        {
          title: "交流中心",
          url: "/computions"
        },
        {
          title: "合作中心",
          url: "/conntect"
        }
      ],
      keyword: "",
      currentIndex: 0,
      moverIndex: -1,
      moverItem: {}
    };
  },
  mounted() {
    this.getCurrent();
    Bus.$on("getCurrent", e => {
      this.getCurrent();
    });
  },
  methods: {
    // 点击跳转
    toLink(item, index) {
      this.currentIndex = index;
    },
    setDialogInfo(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          if (this.$store.state.isLogin) {
            this.showInfoList();
          } else {
            this.$message.warning("当前用户身份过期，请退出重新登录");
          }
          break;
        case "password":
          if (this.$store.state.isLogin) {
            this.editPass();
          } else {
            this.$message.warning("当前用户身份过期，请退出重新登录");
          }
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    // 鼠标移出
    noHeight(item, index) {
      this.moverIndex = -1;
      // this.$refs.he[index].childNodes[1].style = "height:0";
    },
    // 鼠标移动切换导航栏
    changHeight(item, index) {
      this.moverIndex = index;
      this.moverItem = item;
      // if (item.nav) {
      //   this.$refs.he[index].childNodes[1].style = `height:${50 *
      //     item.nav.length}px`;
      //   this.$refs.line.style = `width:100px;left:${100*(index-1)+72}px`;
      // } else {
      //   this.$refs.line.style = `width:72px;`;
      // }
    },
    ltoLink(litem, index) {
      this.$router.push({ name: litem.url, params: { title: true } });
      this.currentIndex = index;
    },
    // 检查是否被选中
    getCurrent() {
      console.log(window.location.hash);
      this.nav.forEach((item, index) => {
        if (item.nav) {
          item.nav.forEach(litem => {
            if (
              litem.url ==
              window.location.hash.substring(2, window.location.hash.length)
            ) {
              this.currentIndex = index;
              return false;
            }
          });
        } else {
          if (
            item.url ==
            window.location.hash.substring(1, window.location.hash.length)
          ) {
            this.currentIndex = index;
            return false;
          }
        }
      });
    },
    // 搜索
    search() {
      if (this.keyword) {
        const sNew = this.$router.resolve({
          name: "search",
          query: { content: this.keyword }
        });
        this.keyword = "";
        window.open(sNew.href, "_blank");
      } else {
        this.$message.warning("搜索内容不能为空");
      }
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@color: #512475;
.home {
  width: 100%;
  .v-enter {
    opacity: 0;
  }
  .v-enter-active {
    transition: 0.5s;
  }
  .v-enter-to {
    opacity: 1;
  }
  .v-leave {
    opacity: 1;
  }
  .v-leave-to {
    opacity: 0;
  }
  .v-leave-active {
    transition: 0.5s;
  }
  header {
    height: 70px;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    .head {
      display: flex;
      .hleft {
        width: 300px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-right: 10px solid #0588c7;
        background-color: #fff;
        .logo {
          img {
            width: 200px;
            height: 42px;
            margin-right: 20px;
          }
        }
      }
      .hright {
        flex: 1;
        height: 70px;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nav {
          flex: 1;
          position: relative;
          .line {
            width: 60px;
            height: 4px;
            background-color: #fe7333;
            position: absolute;
            transition: 0.3s all linear;
            left: 0;
            bottom: 0;
          }
          ul {
            display: flex;
            align-items: center;
            color: #fff;
            li {
              width: 90px;
              height: 70px;
              line-height: 70px;
              text-align: center;
              font-size: 15px;
              position: relative;

              h2 {
                padding: 0 10px;
                margin-bottom: 20px;
                cursor: pointer;
              }
            }
          }
        }
        .search {
          width: 360px;
          height: 70px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .userInfo {
            margin-left: 30px;
            margin-right: 100px;
            .userlogin {
              font-size: 14px;
              color: #fff;
              span {
                cursor: pointer;
              }
            }
            .lInfo {
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  footer {
    width: 100%;
    background-color: #3b3b3b;
    color: #fff;
    padding: 20px 0;

    h1{
      text-align: center;
      margin-top: 20px;
    }
  
    .fot {
      display: flex;
      width: 854px;
      margin: 0 auto;
      justify-content: space-between;

      .content {
        img {
          width: 240px;
          height: 46px;
        }
        .phone{
          margin-top: 30px;
          h4{
           color: #fff;
           font-size: 14px;
           margin: 10px 0;
           letter-spacing: 1px;
           span{
            letter-spacing: 30px;
           }
          }
        }
       
      }

      .map {
        width: 300px;
        height: 120px;
        margin: 20px 0;
        padding: 0 20px;
        border-left: 1px solid #999999;
        border-right: 1px solid #999999;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .fimg{
        margin-top: 25px;
        width: 110px;
        height: 110px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
