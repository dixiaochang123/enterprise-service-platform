<template>
  <div class="personal">
    <van-nav-bar title="通知公告" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <div class="box-main">
        <p class="p1" style="text-align: center;"><span></span><span style="visibility: hidden;"></span>加大援企稳岗力度</p>
        <p class="p2">所谓企业管理成功，关键是企业管理成功需要如何写。 卢梭说过一句富有哲理的话，浪费时间是一桩大罪过。我希望诸位也能好好地体会这句话。 总结的来说， 带着这些问题，我们来审视一下企业管理成功。 要想清楚，企业管理成功，到底是一种怎么样的存在。 爱尔兰曾经提到过，越是无能的人，越喜欢挑剔别人的错儿。这启发了我， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 经过上述讨论， 这样看来， 我们不得不面对一个非常尴尬的事实，那就是， 了解清楚企业管理成功到底是一种怎么样的存在，是解决一切问题的关键。 企业管理成功，到底应该如何实现。 生活中，若企业管理成功出现了，我们就不得不考虑它出现了的事实。 企业管理成功，发生了会如何，不发生又会如何。</p>
        <p class="p3">-XX指挥中心</p>
      </div>
      <div style="height:20px;"></div>
      <div class="box-main">
        <p class="p5">
          <van-icon name="cart-o" color="#1989fa" />
          <van-icon style="visibility: hidden;" name="cart-o" color="#1989fa" />
          <span>关于XX企业管理的通知.doc</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import {
  GetUserInfo,
  UpdateNickname,
  UpdateSex,
  UpdateBirthday,
} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      info: {},
      NicknameShow: false,
      Nickname: "",
      newNickname: "",
      sexShow: false,
      sex: "",
      actions: [
        { name: "保密", disabled: true },
        { name: "男" },
        { name: "女" },
      ],
      ageShow: false,
      age: "13611366910",
      showname: false,
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2020, 1, 1),
      currentDate: new Date(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetUserInfo();
  },
  methods: {
    loginout() {
      this.$router.push({
        name: "Login",
      });
    },
    GetUserInfo() {
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
      };
      GetUserInfo(params)
        .then((res) => {
          let { info } = res.data;
          this.info = info;
          this.info.avatar_thumb =
            !!info.avatar_thumb && info.avatar_thumb != "/default_thumb.jpg"
              ? info.avatar_thumb
              : require("../../assets/index/已登陆默认头像.png");
          this.Nickname = info.user_nicename;
          this.sex = this.actions[info.sex].name;
          this.age = this.info.birthday;
          console.log(info);
        })
        .catch((error) => console.log(error));
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onBeforeClose(action, done) {
      if (action == "confirm") {
        if (this.newNickname == "") {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    onConfirm1(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showname = false;
      this.sex = value;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.sex = value;
    },
    onCancel() {
      Toast("取消");
    },
    onConfirm() {
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        nickname: this.newNickname,
      };
      UpdateNickname(params)
        .then((res) => {
          let { code } = res.data;
          if (code == 1) {
            this.Nickname = this.newNickname;
          }
        })
        .catch((error) => console.log(error));
      this.NicknameShow = false;
    },
    select(action, index) {
      console.log(action, index);
      // this.sex = action.name;
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        sex: index,
      };
      UpdateSex(params)
        .then((res) => {
          let { code } = res.data;
          if (code == 1) {
            this.sex = action.name;
          }
        })
        .catch((error) => console.log(error));
    },
    confirm(value) {
      var yearNow = value.getFullYear();
      var monthNow = value.getMonth() + 1;
      var dayNow = value.getDate();
      let str = yearNow + "-" + monthNow + "-" + dayNow;
      let age = this.getAge(str);
      if (typeof age == "number") {
        // this.age = age
        let params = {
          uid: this.userInfo.id,
          token: this.userInfo.token,
          birthday: age,
        };
        UpdateBirthday(params)
          .then((res) => {
            let { code } = res.data;
            if (code == 1) {
              this.age = age;
            }
          })
          .catch((error) => console.log(error));
      } else {
        Toast("年龄有误，请重新选择");
      }
      console.log(typeof age);

      this.ageShow = false;
    },
    getAge(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
      if (r == null) return false;

      var d = new Date(r[1], r[3] - 1, r[4]);
      var returnStr = "输入的日期格式错误！";

      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var date = new Date();
        var yearNow = date.getFullYear();
        var monthNow = date.getMonth() + 1;
        var dayNow = date.getDate();

        var largeMonths = [1, 3, 5, 7, 8, 10, 12], //大月， 用于计算天，只在年月都为零时，天数有效
          lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12, // 上一个月的月份
          isLeapYear = false, // 是否是闰年
          daysOFMonth = 0; // 当前日期的上一个月多少天

        if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {
          // 是否闰年， 用于计算天，只在年月都为零时，天数有效
          isLeapYear = true;
        }

        if (largeMonths.indexOf(lastMonth) > -1) {
          daysOFMonth = 31;
        } else if (lastMonth === 2) {
          if (isLeapYear) {
            daysOFMonth = 29;
          } else {
            daysOFMonth = 28;
          }
        } else {
          daysOFMonth = 30;
        }

        var Y = yearNow - parseInt(r[1]);
        var M = monthNow - parseInt(r[3]);
        var D = dayNow - parseInt(r[4]);
        if (D < 0) {
          D = D + daysOFMonth; //借一个月
          M--;
        }
        if (M < 0) {
          // 借一年 12个月
          Y--;
          M = M + 12; //
        }

        if (Y < 0) {
          returnStr = "出生日期有误！";
        } else if (Y === 0) {
          if (M === 0) {
            // returnStr = D + "D";
            returnStr = D;
          } else {
            // returnStr = M + "M";
            returnStr = M;
          }
        } else {
          if (M === 0) {
            // returnStr = Y + "Y";
            returnStr = Y;
          } else {
            // returnStr = Y + "Y" + M + "M";
            returnStr = Y;
          }
        }
      }

      return returnStr;
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
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    span {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .p2 {
      text-indent: 2em;
      font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 41px;
  }
  .p3 {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    text-align: right;
  }
}
</style>
