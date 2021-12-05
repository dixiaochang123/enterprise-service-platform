<template>
  <div class="shopdetails">
    <van-nav-bar title="我的评论" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="list" v-for="item in datas" :key="item.ID">
        <h3>{{item.TITLE}}</h3>
        <p><span class="my">我的评论：</span> {{item.CONTENT}}</p>
        <p style="visibility: hidden;">11111111111111</p>
        <div><span style="color:#333333;">{{item.CREATETIME}}</span> 
        <p class="btns">
            <span v-if="item.STATE==0" style="color:#F15353">待审核</span>
            <span v-if="item.STATE==1" style="color:#F15353">审核未通过</span>
            <span style="color:#22BD53;" v-if="item.STATE==2">审核通过</span>
            <van-button @click="edit(item)" v-if="item.STATE==1" type="primary" size="mini">编辑</van-button>
            </p>
        </div>

    </div>
    <van-dialog v-model="show" title="评论" show-cancel-button @confirm="confirm111">
          <van-field input-align="center" v-model="message" rows="3" autosize label="" type="textarea" placeholder="请输入评论">
          </van-field>
        </van-dialog>
    

  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import axios from "axios";
import { getMyPasteList,getUserInfo,pasteSave } from "@/api/personal";
import { Dialog } from "vant";
export default {
  name: "comment",
  components: {},
  data() {
    return {
      datas:[],
      show:false,
      message:'',
      ID:'',
      PID:'',
      orgMap:{}
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.getMyPasteList();
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserInfo({
        USER_ID:this.userInfo.ID
      }).then(res=>{
        let {code,data} = res;
        this.orgMap = data.orgMap
        

      }).catch(error=>console.log(error))
    },
    getMyPasteList() {
      getMyPasteList({
        USER_ID:this.userInfo.ID
      }).then(res=>{
        let {code,data} = res;
        console.log(code,data)
        this.datas = data.list
        console.log(this.datas)
        
        

      }).catch(error=>console.log(error))
    },
    confirm111() {
      if(!this.message)return;
      this.pasteSave()
    },
    edit(item) {
        console.log(item.ID)
        this.ID = item.ID;
        this.PID = item.PID;
        this.show = true
    },
    pasteSave() {
      //    "PID":"40",                                            		帖子ID
      // "CONTENT":"测试单位测试单位测试单位",						评论内容
      // "ORG_ID":"63",								              企业ID
      // "ID":""					        						评论ID（新增为空）
      let params = {
        PID: this.PID, //   		帖子ID
        CONTENT: this.message, // 		评论内容
        ORG_ID: this.orgMap.ID, //   企业ID
        ID: this.ID, // 	评论ID（新增为空）
        USER_ID:this.userInfo.ID
      };

      pasteSave(params)
        .then((res) => {
          let {code,data,msg} = res;
          if(code==0) {

            Dialog.alert({
              title: "提示",
              message: "评论成功",
            }).then(() => {
              
            });
            this.getMyPasteList();
          } else {
             Dialog.alert({
              title: "提示",
              message: msg,
            }).then(() => {
              
            });
          }
        })
        .catch((error) => console.log(error));
    },
    
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #F6F6F6;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.list {
    background-color: #fff;
    padding:20px;
    margin: 20px 0;
    h3 {
        font-size: 31px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 48px;
    }
    div,p {
        font-size: 25px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
        line-height: 40px;
    }
    .my {
        font-size: 25px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 40px;
    }
    > div {
        display: flex;;
        justify-content: space-between;
            align-items: center;
    }
    .btns {
        display: flex;;
        justify-content: flex-end;
            align-items: center;
    }
    .van-button--mini {
width: 60px;
height: 30px;
background-color: #5683FF;
margin-left: 10px;
    }
    .van-button__content {
        color: #fff;

    }
}
</style>
