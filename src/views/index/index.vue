<template>
<div class="main">

    <NavBarDolad />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="home">
      <!-- <Header /> -->
      <Swiper :banner="banner" />
      <Category :cateList="cateList" />
      <!-- <Session :session-list="sessionList" /> -->
      <Goods
        v-if="list.length>0"
        v-model="loading"
        :goods-list="list"
        :is-finished="finished"
        @onReachBottom="onReachBottom"
      />
      <Ranking
        v-model="loading"
        :goods-list="RankingList"
        :is-finished="finished"
        @onReachBottom="onReachBottom" />
        <div style="height: 20px"></div>
      <!-- <back-top /> -->
      <!-- <Skeleton v-if="isSkeletonShow" /> -->

    </div>
  </van-pull-refresh>
</div>
</template>

<script>
import { getBanner, getCategory, getSession, getList } from '@/api/home'
import { getBanner1,getRank,GetAllMatch,GetRecommend } from '@/api/home1'
import NavBarDolad from '../../components/NavBarDolad'
import Header from './modules/Header'
import Swiper from './modules/Swiper'
import Category from './modules/Category'
import Session from './modules/Session'
import Goods from './modules/Goods'
import Skeleton from './modules/Skeleton'
import Ranking from './modules/Ranking'

export default {
  name: 'Index',
  components: {
    NavBarDolad,
    Header,
    Swiper,
    Category,
    Session,
    Goods,
    Skeleton,
    Ranking
  },
  data() {
    return {
      banner: [],
      cateList: [],
      sessionList: [],
      list: [],
      RankingList:[],
      pageNo: 0,
      pageSize: 4,
      loading: false,
      finished: false,
      refreshing: false,
      isSkeletonShow: true
    }
  },
  mounted() {
    this.getBanner1()
    this.getRank()
    this.GetAllMatch()
    this.GetRecommend()
    // Promise.all([this.getBanner(), this.getCategory(), this.getSession()]).then(
    //   () => {
    //     this.isSkeletonShow = false
    //   }
    // )
  },
  methods: {

    getBanner1() {
      return new Promise((resolve) => {
        getBanner1().then((res) => {
          let {ret,data} = res;
          this.banner = data.info
          resolve()
        }).catch(error=>console.log(error))
      })
    },
    getRank() {
      getRank().then(res=>{
        let {ret,data} = res;
        this.RankingList = data.info;
      }).catch(error=>console.log(error))

    },
    async GetAllMatch() {
      try {
        let cateList1 = await this.GetAllMatch1();
        // let cateList2 = await this.GetAllMatch2();
        // this.cateList = [...cateList1, ...cateList2];
        this.cateList = cateList1;
      } catch (error) {
        console.log(error);
      }
      
    },
    GetAllMatch1() {
      return new Promise((resolve,reject)=>{
        GetAllMatch(1).then(res=>{
          let {ret,data} = res;
          resolve(data.info.list)
          // this.cateList = data.info.list;
        }).catch(error=>console.log(error))
      })
    },
    GetAllMatch2() {
      return new Promise((resolve,reject)=>{
        GetAllMatch(-1).then(res=>{
          let {ret,data} = res;
          resolve(data.info.list)
          // this.cateList = data.info.list;
        }).catch(error=>console.log(error))
      })
    },
    // category
    getCategory() {
      return new Promise((resolve) => {
        getCategory().then((res) => {
          const data = res.entry
          // this.cateList = data
          resolve()
        })
      })
    },
    // session
    getSession() {
      return new Promise((resolve) => {
        getSession().then((res) => {
          this.sessionList = res.entry
          resolve()
        })
      })
    },
    GetRecommend() {
      GetRecommend().then(res=>{
        let {ret,data} = res;

        if (this.refreshing) {
          this.list = data.info;
          this.refreshing = false
          this.finished = false
        } else {
          this.list = data.info;
          this.finished = true;
        }
        this.loading = false
      }).catch(error=>console.log(error))
    },
    // reach-bottom
    onReachBottom() {
      if (!this.finished) {
        this.loading = true
        // this.pageNo += 1
        // this.getGoodsList()
        this.GetRecommend()
      }
    },

    // pull-refresh
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true
        this.pageNo = 1
        this.GetRecommend()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {

  background: #f5f5f5;
}
.home {
  background: #f5f5f5;
  min-height: 100vh;
  padding:0 18px;
  .logo {
    display: block;
    width: 200px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .menu__right {
    width: 50px;
  }
}
</style>
