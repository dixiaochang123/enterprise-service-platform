<template>
  <div class="shopdetails">
    <van-nav-bar title="编辑评论" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field
            v-model="message"
            rows="10"
            autosize
            name="message"
            type="textarea"
            placeholder="请输入评论"
            />
      <div style="margin: 16px">
        <van-button class="see" round block type="primary" native-type="submit">确认修改</van-button>
      </div>
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
import axios from "axios";
import { appealSave, getsysCombox,getUserInfo } from "@/api/personal";
import { Dialog } from "vant";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      message:''
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.addressInfo.USER_ID = this.userInfo.ID;
    this.getsysCombox();
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserInfo({
        USER_ID:this.userInfo.ID
      }).then(res=>{
        let {code,data} = res;
        console.log(code,data)
        if(code==0) {
          this.addressInfo.ADDRESS = data.orgMap.ORG_ADDRESS
        }
        

      }).catch(error=>console.log(error))
    },
    
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onSubmit(values) {
      console.log(values);
      return
      let { NAME, CONTENT, SER_TYPE, ATTACHS, USER_ID, ID ,ADDRESS} = this.addressInfo;
      let params1 = { NAME, CONTENT, SER_TYPE, ATTACHS, USER_ID, ID ,ADDRESS};
      appealSave(params1)
        .then((res) => {
          Dialog.alert({
            title: "提示",
            message: "保存成功",
          }).then(() => {
            this.$router.push({
              name: "Myappeal",
            });
          });
        })
        .catch((error) => console.log(error));
      return;
      
    }
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
  text-align: left;
  background-color: #F6F6F6;
  padding: 10px 20px;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
</style>
