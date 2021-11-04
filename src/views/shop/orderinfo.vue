<template>
  <div class="shopdetails">
    <van-nav-bar title="确认订单" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.realname" name="收件人" label="收件人" placeholder="请填写收件人" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field class="mobile" v-model="addressInfo.phone" maxlength="11" type="number" name="手机号码" label="手机号码" placeholder="请填写收件人手机号码" :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号码!',
          },
        ]" />
      <van-field v-model="area" name="所在地区" label="所在地区" :value="area" readonly="readonly" placeholder="省市区县、乡镇等" @click="showArea = true" />
      <van-field v-model="addressInfo.address" name="详细地址" label="详细地址" placeholder="街道、楼牌号等" :rules="[{ required: true, message: '请填写详细地址' }]" />
      <div style="margin: 16px">
        <van-button class="see" round block type="info" native-type="submit">保存并使用</van-button>
      </div>
    </van-form>

    <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup>
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import areaList from "@/utils/area.js";
import axios from "axios";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      areaList,
      hotcities: [],
      addressInfo:{
        realname:'',
        phone: '',
        address: "",
        provinceID: '',
        cityID: '',
        areaID: '',
        utype:"kuhu"
      }

      // uid: 999845591,
      // utype: kuhu,
      // provinceID: 110000,
      // cityID: ,
      // areaID: ,
      // address: 大V发地址,
      // realname: 呵呵呵,
      // mobile: 13611366910,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.ShoppingAddress()
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
  },
  methods: {
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },
    ShoppingAddress() {
      axios.get(`http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`).then(res=>{
      let {code,info} = res.data.data;
      if(!!info) {
        this.addressInfo = info || null;
        this.area1 = [this.addressInfo.province,this.addressInfo.city,this.addressInfo.area]
        this.area = this.areaList.province_list[this.addressInfo.province]+'/'+this.areaList.city_list[this.addressInfo.city]+'/'+this.areaList.county_list[this.addressInfo.area] ;

      }
      // this.addressInfo.phone = !!this.addressInfo &&  !!this.addressInfo.phone ? this.mobileNumberChange(this.addressInfo.phone):null;
      }).catch(error=>console.log(error))
    },
    onClickLeft() {
      this.$router.push({
        name: "Shopdetails",
        query:{...this.$route.query}
      });
    },
    onConfirm(values) {
      console.log(values);
      this.area1 = values.map((item) => item.code);
      // this.area1 = values.map(item=>item.name)
      this.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
        console.log(this.area)
      this.showArea = false;
    },
    change(picker, value, index) {
      // console.log('索引',picker, value, index)
      // this.GetCity(value[0].code);
    },
    onSubmit(values) {
      // &utype=kuhu&provinceID=110000&cityID=&areaID=&address=%E5%A4%A7V%E5%8F%91%E5%9C%B0%E5%9D%80&realname=%E5%91%B5%E5%91%B5%E5%91%B5&phone=13611366910
      let params = {
        uid: this.userInfo.id,
        token: this.userInfo.token,
        provinceID: this.area1[0],
        cityID: this.area1[1],
        areaID: this.area1[2],
        address: this.addressInfo.address,
        realname: this.addressInfo.realname,
        phone: this.addressInfo.phone,
        utype:"kuhu"
      };
      let paramsstr = "";
      for (const key in params) {
          if (Object.hasOwnProperty.call(params, key)) {
              paramsstr+=`&${key}=${params[key]}`
              
          }
      }
      console.log("submit", values);

      axios.get(`http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save${paramsstr}`).then(res=>{
      // axios({
      //   method: "post",
      //   url: "http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save",
      //   data: params,
      //   withCredentials: true,
      // })
      //   .then((res) => {
          let { msg } = res.data;
          if(msg=="保存成功!") {

            this.$router.push({
              name: "Confirmorder",
              query:{...this.$route.query}
            });
          }
          console.log(msg)
        })
        .catch((error) => console.log(error));
    },
    seeOrder() {
      this.$router.push({
        name: "Confirmorder",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.van-form {
  .van-cell__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
  }
  ::v-deep .van-field__label {
    width: 4.2em;
  }
  ::v-deep .van-field--error .van-field__control::placeholder {
    color: #969799 !important;
    -webkit-text-fill-color: currentColor !important;
  }
  .mobile {
    ::v-deep input {
      padding-left: 10px;
    }
    ::v-deep .van-field__body {
      &::before {
        content: "+86";
        font-size: 14px;
        color: "646566";
      }
    }
    ::v-deep .van-field--error .van-field__control,::v-deep .van-field--error .van-field__control::placeholder {
        color: #323233;
        -webkit-text-fill-color: currentColor;
    }
  }
}

.see {
  width: 80%;
  height: 80px;
  padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: linear-gradient(0deg, #fa342e, #ff6f53);
  border: none;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
