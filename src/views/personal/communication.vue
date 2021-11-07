<template>
  <div class="personal">
    <van-nav-bar title="交流园地" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-search v-model="value1" shape="round" background="#ffffff" input-align="center" placeholder="请输入搜索关键词" />
      <div class="box-main">
        <p class="p1"><span class="s-1">寻求口罩机零配件供应商</span><span class="s-2">2020.03.18</span></p>
        <p class="p2"><span class="s-1"></span><span class="s-1" style="visibility: hidden;"></span>虹新技术有限公司</p>
        <div class="img">
          <van-image height="260" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
      <div style="height:20px;"></div>
      <div class="box-main">
        <p class="p1"><span class="s-1">寻求口罩机零配件供应商</span><span class="s-2">2020.03.18</span></p>
        <p class="p2"><span class="s-1"></span><span class="s-1" style="visibility: hidden;"></span>虹新技术有限公司</p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  //   name: "Userinfo",
  components: {},
  data() {
    return {
      value1: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    // this.GetUserInfo();
  },
  methods: {
    loginout() {
      this.$router.push({
        name: "Login",
      });
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
  width: 100%;
  padding: 0 20px;
  padding-top: 20px;
  box-sizing: border-box;
}
.box-main {
  width: 100%;
  padding: 20px;
  background-color: #f3f4f7;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  p {
    line-height: 50px;
  }
  .p1 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .s-1 {
      font-size: 32px;
      display: inline-block;
    }
  }
  .p2 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    font-weight: 400;
    .s-1 {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .img {
      height: 260px;
      border-radius: 20px;
      overflow: hidden;
  }
}
</style>
