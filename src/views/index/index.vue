<template>
  <div class="main">

    <!-- <NavBarDolad /> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="home">
        <div class="header">
          <div class="admin-info">
            <!-- <van-image v-if="userInfo.REAL_NAME" @click="login" round width="5rem" height="5rem" :src="photo" /> -->
            <img v-if="userInfo.REAL_NAME" class="photo" :src="photo" alt="">
            <van-image v-if="!userInfo.REAL_NAME" @click="login" round width="5rem" height="5rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            <div v-if="userInfo.REAL_NAME" class="admin-info-text">
              <div class="t-1">
                <p>{{userInfo.REAL_NAME}}</p>
                <p class="t-1-2" style="visibility: hidden;"></p>
                <p class="t-1-2"></p>
                <p class="t-1-2" style="visibility: hidden;"></p>
              </div>
              <div class="t-2">
                <p>{{userInfo.ORG_PLATE}}</p>
                <p class="t-2-2">常州新区大港街道XXX网格</p>
              </div>
            </div>
            <div v-else class="admin-info-text">
              <div class="t-1">
                <p>请登录</p>
                <p class="t-1-2"></p>
              </div>
            </div>
          </div>
          <div class="info-flex">
            <div class="info-flex-img">
              <div class="flex-item" @click="handleclickgetinto('Enterpriseappeal')">
                <img width="4rem" height="4rem" src="../../assets/yiqilai/index/诉求提供@3x.png" alt="">
                <p>诉求提供</p>
              </div>
              <div class="flex-item" @click="handleclickgetinto('Myappeal')">
                <img width="4rem" height="4rem" src="../../assets/yiqilai/index/政策解读@3x.png" alt="">
                <p>我的诉求</p>
              </div>
              <div class="flex-item" @click="handleclickgetinto('Policyint')">
                <img width="4rem" height="4rem" src="../../assets/yiqilai/index/我的诉求@3x.png" alt="">
                <p>政策解读</p>
              </div>
              <div class="flex-item" @click="handleclickgetinto('Want')">
                <img width="4rem" height="4rem" src="../../assets/yiqilai/index/猜您想问@3x.png" alt="">
                <p>猜您想问</p>
              </div>
            </div>
            <div class="right-top">
              <div><img width="4rem" height="4rem" src="../../assets/yiqilai/index/搜索@3x.png" alt=""></div>
              <div @click="handletomessage"><img width="4rem" height="4rem" src="../../assets/yiqilai/index/系统消息@3x.png" alt=""></div>

            </div>

          </div>

        </div>
        <div class="content">
          <div class="zcsd">
            <div class="hd">
              <p>政策速达</p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2"></p>
            </div>
            <div class="myswipe">
              <van-swipe :loop="false" height="100%" :width="320">
                <van-swipe-item v-for="item in indexData.policyList" :key="item.ID">
                  <div class="vsi">
                    <!-- <img class="vsiimg" v-if="item.ATTACHS" :src="url+item.ATTACHS" alt=""> -->
                    <img class="vsiimg" src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
                    <div class="vsi-1">
                      <p class="p1" style="vertical-align: bottom;"><span></span><span style="visibility: hidden;"></span> 政策类别</p>
                      <p class="p2">{{item.NAME}}</p>
                      <p class="p3"></p>
                      <p class="p3" style="visibility: hidden;"></p>
                      <p class="p1">{{item.ORG_ID_}}</p>
                    </div>
                    <van-button class="vsi-2" round type="info" @click="zcsdhandleclick(item)">立即申请</van-button>
                  </div>
                </van-swipe-item>
              </van-swipe>

            </div>

          </div>
          <div class="zcsd">
            <div class="hd">
              <p>交流园地</p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2"></p>
            </div>
            <div class="myswipe" @click="handleclickcommunication">
              <van-swipe :loop="false" height="100%" :width="320">
                <van-swipe-item v-for="item in indexData.postList" :key="item.ID">
                  <div class="vsi">
                    <img class="vsiimg" src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
                    <div class="vsi-1">
                      <p class="p1" style="vertical-align: bottom;"><span></span><span style="visibility: hidden;"></span> {{item.TITLE}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.CREATETIME}}</p>
                      <p class="p2">{{item.CONTENT}}</p>
                      <!-- <p class="p3"></p>
                      <p class="p3" style="visibility: hidden;"></p>
                      <p class="p1">常州市财政部 拷贝</p> -->
                    </div>
                    <!-- <van-button class="vsi-2" round type="info">立即申请</van-button> -->
                  </div>
                </van-swipe-item>
              </van-swipe>

            </div>

          </div>
          <div class="zcsd">
            <div class="hd">
              <p>一网办理</p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2" style="visibility: hidden;"></p>
              <p class="p2"></p>
            </div>
            <div class="myswipe myswipe11">
              <div class="myswipe1">

                  <div class="vsi">
                    <div class="vsi-1">
                      <p class="p1" style="vertical-align: bottom;"><span></span></p>
                      <p class="p2">审批服务</p>
                      <p class="p3"></p>
                      <p class="p3" style="visibility: hidden;"></p>
                    </div>
                    <van-button class="vsi-2" round type="info">更多</van-button>
                  </div>
                  <div class="vsi vsi2">
                    <div class="vsi-1">
                      <p class="p1" style="vertical-align: bottom;"><span></span></p>
                      <p class="p2">人才申报</p>
                      <p class="p3"></p>
                      <p class="p3" style="visibility: hidden;"></p>
                    </div>
                    <van-button class="vsi-2" round type="info">更多</van-button>
                  </div>
                  <div class="vsi">
                    <div class="vsi-1">
                      <p class="p1" style="vertical-align: bottom;"><span></span></p>
                      <p class="p2">金融服务</p>
                      <p class="p3"></p>
                      <p class="p3" style="visibility: hidden;"></p>
                    </div>
                    <van-button class="vsi-2" round type="info">更多</van-button>
                  </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getHomeList } from "@/api/personal";
import { mapGetters } from "vuex";
const config = require('../../utils/config')
export default {
  name: "Index",
  components: {},
  data() {
    return {
      isLogin: false,
      refreshing:false,
      loading:false,
      photo:config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId=',
      url:config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId=',
      indexData:{}
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.photo +=''+this.userInfo.PHOTO ||12067;
    this.getHomeList()
  },
  methods: {
    getHomeList() {
      getHomeList({
        USER_ID:this.userInfo.ID
      }).then(res=>{
 let {code,data} = res;
        if(code==0) {
          data.policyList.map(item=>{
            console.log(item.ATTACHS)
            if(item.ATTACHS) {

              item.ATTACHS = item.ATTACHS.split(",")[0]
            }
          })
          data.postList.map(item=>{

            if(item.ATTACHS) {

              item.ATTACHS = item.ATTACHS.split(",")[0]
            }
          })
          this.indexData = data;
          console.log(this.indexData)
        }

      }).catch(error=>console.log(error))
    },
    zcsdhandleclick(data){
      this.$router.push({
        name:'Policyintitem',
        query:{
          id:data.ID
        }
      })
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
      }
    },
    login() {
      this.$router.push({
        name:'Login'
      })
    },
    handleclickgetinto(val) {
      this.$router.push({
        name:val
      })
    },
    handletomessage() {
      this.$router.push({
        name:'Message'
      })
    },
    handleclickcommunication() {
      this.$router.push({
        name:'Communication'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #f4f7f9;
}
.home {
  background: #f4f7f9;
  min-height: 100vh;
}
.header {
  width: 100%;
  height: 439px;
  background: linear-gradient(0deg, #565dff, #568cff);
  position: relative;
  padding-top: 50px;
  .admin-info {
    padding: 0 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .photo {
      width: 127px;
      height: 127px;
      border-radius: 50%;
    }
    .admin-info-text {
      padding-left: 13px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .t-1 {
      font-size: 53px;
      font-family: PingFangSC;
      font-weight: 800;
      color: #ffffff;
    }
    .t-1-2 {
      width: 48px;
      height: 4px;
      background: #44ebff;
      border-radius: 2px;
    }
    .t-2 {
      font-size: 27px;
      font-family: PingFangSC;
      font-weight: bold;
      color: #ffffff;
    }
    .t-2-2 {
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 300;
      color: #ffffff;
    }
  }
  .info-flex {
    width: 100%;
    height: 253px;
    background: #ffffff;
    border-radius: 50px;
    position: absolute;
    bottom: -50px;
    .info-flex-img {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .flex-item {
      text-align: center;
      img {
        width: 75px;
        height: 73px;

      }
      p {
        padding-top: 20px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 500;
        color: #000000;
        opacity: 0.7;
      }
    }
  }
  .right-top {
    position: absolute;
    right: 0;
    top: -50px;
    display: flex;
    justify-content: flex-end;
    div {
      width: 84px;
      height: 84px;
      background-color: #ffffff;
      border-radius: 50%;
      margin: 0 13px;
      box-shadow: 0px 9px 13px 1px rgba(102, 139, 255, 0.17);
      text-align: center;
      img {
        box-sizing: border-box;
        margin-top: 15px;
        width: 60%;
        height: 60%;
      }
    }
  }
}
.content {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #fff;
  margin-top: 81px;
  // height: 100px;
  .hd {
    padding: 33px;
    font-size: 46px;
    font-family: PingFangSC;
    font-weight: 800;
    color: #000000;
    .p2 {
      width: 48px;
      height: 4px;
      background: #1f56f5;
      border-radius: 2px;
    }
  }
}
.zcsd {
  .myswipe {
    padding-left: 33px;
    width: 100%;
    height: 320px;
    ::v-deep .van-swipe {
      height: 100%;
    }
    ::v-deep .van-swipe-item {
      // background-color: blue;
      // padding-right: 20px;
      border-radius: 20px;
      
    }
    .vsi {
      // width: calc(100% - 40px);
      height: 100%;
      width: 94%;
      border-radius: 20px;
      background: linear-gradient(0deg, #557EFF, #91ACFF);
      // margin-right: 80px;
      padding:40px 0 26px 26px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-size: 17px;
      color: #FFFFFF;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      .vsiimg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .p1 {
        span {
          display: inline-block;
          width: 17px;
          height: 17px;
          border: 3px solid #5CF1E7;;
        }
        position: relative;
        z-index: 1;
      }
      .p2 {
        font-size: 30px;
        font-family: PingFangSC;
        font-weight: bold;
        color: #FFFFFF;
        padding:20px 0 9px;
      }
      .p3 {
        width: 35px;
        height: 4px;
        background: #FFFFFF;
        border-radius: 2px;
        // padding-bottom: 10px;
      }
    }
    .vsi-2 {
      width: 163px;
      height: 53px;
      background: rgba(255, 255, 255, 0.3);
      // opacity: 0.3;
      border-radius: 27px;
      font-size: 25px;
      font-family: PingFangSC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 27px;
          white-space: nowrap;
    }
    .vsilast {
      margin-right: 0;
    }
  }
.myswipe11 {
  padding-left: 0;
}
  .myswipe1 {
    width: calc(100% - 66px);
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    
    .vsi {
      width: calc(100% / 3);
      height: 253px;;
    }
    .vsi2 {
      margin:0 13px;
      background: linear-gradient(0deg, #05CD4B, #5AE4A2);
    }
  }
}
::v-deep .van-button--info {
    color: #fff;
    background-color: #1989fa;
    border: 1px solid transparent;
}
</style>
