## 介绍

**一起来-公众号**


## 使用

```
$ npm install
$ npm run dev
```
## 注意事项
- 接口域名 http://218.93.116.192:9000/wjyql
- 分发字段/wjyql
- [后端接口文档](http://218.93.116.192:9000/wjyql)
- [接口请求示例](http://218.93.116.192:9000/wjyql)

## 账号密码
```
18862631752/123456
18006246117/111111
```
## 获取用户所在城市--方式1
```
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
let returnCitySN = {"cip": "111.203.35.210", "cid": "110000", "cname": "北京市"};

```
## 获取用户所在城市--方式2
```
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=unvIq48XGE1jR7NIf1RSwszH4PQT696I"></script>
var geolocation=new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function(r){
        // var city=r.address.city//返回当前城市
        // that.currCity = city;
        console.log(r)
    })

```


