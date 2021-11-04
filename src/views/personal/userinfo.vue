<template>
  <div class="personal">
    <van-nav-bar title="个人资料" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell style="display: flex;align-items: center;" class="hhh" title="头像" is-link>
        <template #right-icon>
          <van-image
            round
            width="40"
            height="40"
            :src="info.avatar_thumb"
          />
          <!-- <van-icon style="font-size: 16px;color: #969799;" name="arrow" /> -->
        </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="Nickname" @click="NicknameShow = true"></van-cell>
      <van-cell title="性别" is-link :value="sex" @click="sexShow=true"></van-cell>
      <van-cell title="年龄" is-link :value="age" @click="ageShow=true"></van-cell>
    </div>

    <van-dialog class="dialog" v-model="NicknameShow" title="请输入昵称" :before-close="onBeforeClose" @confirm="onConfirm" show-cancel-button>
      <van-cell-group>
        <van-field v-model="newNickname" />
      </van-cell-group>
    </van-dialog>
    <van-action-sheet v-model="sexShow" :actions="actions" cancel-text="取消" close-on-click-action @cancel="sexShow=false" @select="select" />
    <van-popup v-model="ageShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="ageShow = false" @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {GetUserInfo,UpdateNickname,UpdateSex,UpdateBirthday} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
      info:{},
      NicknameShow: false,
      Nickname: "",
      newNickname:'',
      sexShow: false,
      sex: "",
      actions: [{name:'保密',disabled: true},{ name: "男" }, { name: "女" }],
      ageShow: false,
      age: "",
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
    this.GetUserInfo()
  },
  methods: {
    GetUserInfo() {
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
      }
      GetUserInfo(params).then(res=>{
        let {info} = res.data;
        this.info = info;
        this.info.avatar_thumb = (!!info.avatar_thumb && info.avatar_thumb!="/default_thumb.jpg") ? info.avatar_thumb : require("../../assets/index/已登陆默认头像.png")
        this.Nickname = info.user_nicename;
        this.sex = this.actions[info.sex].name;
        this.age = this.info.birthday;
        console.log(info)
      }).catch(error=>console.log(error))
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
    onConfirm() {
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
        nickname:this.newNickname
      }
      UpdateNickname(params).then(res=>{
        let {code} = res.data;
        if(code==1) {
          this.Nickname = this.newNickname
        }
      }).catch(error=>console.log(error))
      this.NicknameShow = false
    },
    select(action, index) {
      console.log(action, index);
      // this.sex = action.name;
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
        sex:index
      }
      UpdateSex(params).then(res=>{
        let {code} = res.data;
        if(code==1) {
          this.sex = action.name;
        }
      }).catch(error=>console.log(error))
    },
    confirm(value) {
      var yearNow = value.getFullYear();
        var monthNow = value.getMonth() + 1;
        var dayNow = value.getDate();
        let str = yearNow+'-'+monthNow+'-'+dayNow
        let age = this.getAge(str)
        if(typeof age == "number") {
          // this.age = age
          let params = {
            uid:this.userInfo.id,
            token:this.userInfo.token,
            birthday:age
          }
          UpdateBirthday(params).then(res=>{
            let {code} = res.data;
            if(code==1) {
              this.age = age
            }
          }).catch(error=>console.log(error))



        } else {
          Toast('年龄有误，请重新选择');
        }
        console.log(typeof age)
      

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
  background: #f5f5f5;
  min-height: 100vh;
  //   width: 100vw;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}

.box {
  img {
    width: 28px;
    height: 28px;
    margin-right: 18px;
    vertical-align: middle;
  }
}
.dialog {
  .van-cell {
    display: flex;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    ::v-deep .van-field__control {
      // width: 571px;
      height: 30px;
      background: #ffffff;
      border: 1px solid #999999;
      border-radius: 5px;
    }
  }
}
</style>
