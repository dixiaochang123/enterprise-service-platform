<template>
  <div class="shopdetails">
    <van-nav-bar title="诉求详情" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.realname" name="诉求目的" label="诉求目的" placeholder="请输入诉求目的" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-model="addressInfo.realname" name="企业名称" label="企业名称" placeholder="请输入您所在的企业" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-model="addressInfo.realname" name="上报人" label="上报人" placeholder="请输入上报人" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-model="addressInfo.realname" readonly="readonly" label="服务类型" right-icon="arrow" @click="showname = true" />
      <van-field v-model="addressInfo.realname" name="上报时间" label="上报时间" placeholder="请输入上报时间" :rules="[{ required: true, message: '请填写收件人' }]" />
      <van-field v-model="addressInfo.realname" name="诉求内筒" label="诉求内筒" readonly />
      <van-field v-model="addressInfo.realname" class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" />
      <van-uploader v-model="fileList" :max-size="50000 * 1024" multiple :max-count="5" :after-read="onRead" :before-delete="onDelete" @oversize="onOversize">
        <div class="upload">
          <img src="../../assets/personal/矩形 846 拷贝.png" alt="">
        </div>
      </van-uploader>
      <van-field v-model="addressInfo.realname" name="处理流程" label="处理流程" readonly />
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
      <!-- 评价<van-rate v-model="value" /> -->
      <van-field name="rate" label="评价">
        <template #input>
            <van-rate v-model="value" />
        </template>
        </van-field>
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import areaList from "@/utils/area.js";
import { getAppealMap } from "@/api/personal";
import axios from "axios";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
        value:3,
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      showname: false,
      areaList,
      hotcities: [],
      addressInfo: {
        realname: "",
        phone: "",
        address: "",
        provinceID: "",
        cityID: "",
        areaID: "",
        utype: "kuhu",
      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      fileList: [
        { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true },
      ],
      uploadImages: [],

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
    // this.ShoppingAddress();
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
    this.getAppealMap()
  },
  methods: {
    getAppealMap() {
      getAppealMap({
        ID:this.$route.query.id
      }).then(res=>{

      }).catch(error=>console.log(error))
    },
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },
    ShoppingAddress() {
      axios
        .get(
          `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`
        )
        .then((res) => {
          let { code, info } = res.data.data;
          if (!!info) {
            this.addressInfo = info || null;
            this.area1 = [
              this.addressInfo.province,
              this.addressInfo.city,
              this.addressInfo.area,
            ];
            this.area =
              this.areaList.province_list[this.addressInfo.province] +
              "/" +
              this.areaList.city_list[this.addressInfo.city] +
              "/" +
              this.areaList.county_list[this.addressInfo.area];
          }
          // this.addressInfo.phone = !!this.addressInfo &&  !!this.addressInfo.phone ? this.mobileNumberChange(this.addressInfo.phone):null;
        })
        .catch((error) => console.log(error));
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onConfirm1(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showname = false;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast("取消");
    },
    onConfirm(values) {
      console.log(values);
      this.area1 = values.map((item) => item.code);
      // this.area1 = values.map(item=>item.name)
      this.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      console.log(this.area);
      this.showArea = false;
    },
    change(picker, value, index) {
      // console.log('索引',picker, value, index)
      // this.GetCity(value[0].code);
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      xhr.open("post", "http://cj.pydoton.com/?s=App.Examples_Upload.GoFtp");
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          _this.uploadImages.push(data.url);
          console.log(_this.fileList, _this.uploadImages);
        }
      };
      // console.log(file);
    },
    onDelete(file, { index }) {
      this.uploadImages.splice(index, 1);
      console.log(this.fileList, this.uploadImages);
      return true;
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
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
        utype: "kuhu",
      };
      let paramsstr = "";
      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
          paramsstr += `&${key}=${params[key]}`;
        }
      }
      console.log("submit", values);

      axios
        .get(
          `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save${paramsstr}`
        )
        .then((res) => {
          // axios({
          //   method: "post",
          //   url: "http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save",
          //   data: params,
          //   withCredentials: true,
          // })
          //   .then((res) => {
          let { msg } = res.data;
          if (msg == "保存成功!") {
            this.$router.push({
              name: "Confirmorder",
              query: { ...this.$route.query },
            });
          }
          console.log(msg);
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
  background: #ffffff;
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
      // &::before {
      //   content: "+86";
      //   font-size: 14px;
      //   color: "646566";
      // }
    }
    ::v-deep .van-field--error .van-field__control,
    ::v-deep .van-field--error .van-field__control::placeholder {
      color: #323233;
      -webkit-text-fill-color: currentColor;
    }
  }
}
.van-uploader {
  position: relative;
  display: inline-block;
  padding: 20px;
}
.upload {
  width: 146px;
  height: 146px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 53px;
    width: 52px;
  }
}

.see {
  width: 80%;
  height: 80px;
  padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: rgba(86, 131, 255, 1);
  border: none;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
</style>
