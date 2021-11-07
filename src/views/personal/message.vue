<template>
  <div class="personal">
    <van-nav-bar title="系统消息" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell to="/notice">
        <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
        </div>
        <div class="text">
          <h3>您的诉求“申报企业贷款”已完成办理</h3>
          <p>
            <span>2020-3-18  15:00</span>
          </p>
        </div>
      </van-cell>
      <van-cell to="/notice">
        <template #right-icon>
          <span style="line-height:5;color: #999999;">2020/03/27</span>
        </template>
        <!-- <van-image round width="45" height="45" src="https://img01.yzcdn.cn/vant/cat.jpeg" /> -->
        <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
        </div>
        <div class="text">
          <h3>系统通知</h3>
          <p>
            <span>恭喜你获得一等奖</span>
          </p>
        </div>
      </van-cell>
      
    </div>

  </div>
</template>

<script>
import Nodata from "../like/modules/Nodata"
import {GetUserNotice} from "@/api/personal";
import { mapGetters } from "vuex";
export default {
  name: "Message",
  components: {
    Nodata
  },
  data() {
    return {
      page:1
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetUserNotice()
  },
  methods: {
    GetUserNotice() {
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
        page:this.page
      }
      GetUserNotice(params).then(res=>{
        let { info } = res.data
        console.log(info)
      }).catch(error=>console.log(error))

    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #ffffff;
  min-height: 100vh;
  //   width: 100vw;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}

.box {
  .van-cell__value {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    padding: 10px;
  }
  .imgbox {
      width: 90px;
        height: 90px;
        background: #78AAFF;
        border-radius: 50%;
        text-align: center;
        line-height: 90px;
  }
  .text {
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding-left: 26px;
    h3 {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 800;

      color: #3a3a3a;
    }
    p {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      display: flex;
      align-content: center;
    }
  }
  img {
    width: 30px;
    height: 30px;
    padding-top: 25px;
  }
}

</style>
