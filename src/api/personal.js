import request1 from '@/utils/request1'
import request from '@/utils/request'

//个人信息
export function GetUserInfo(data) {
    return request1({
        url: `/api/public/?service=User.GetUserInfo&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
//修改昵称
export function UpdateNickname(data) {
    return request1({
        url: `/api/public/?service=User.UpdateNickname&uid=${data.uid}&token=${data.token}&nickname=${data.nickname}`,
        method: 'get'
    })
}
//修改性别
export function UpdateSex(data) {
    return request1({
        url: `/api/public/?service=User.UpdateSex&uid=${data.uid}&token=${data.token}&sex=${data.sex}`,
        method: 'get'
    })
}
//修改年龄
export function UpdateBirthday(data) {
    return request1({
        url: `/api/public/?service=User.UpdateBirthday&uid=${data.uid}&token=${data.token}&birthday=${data.birthday}`,
        method: 'get'
    })
}

//通知信息
export function GetUserNotice(data) {
    return request1({
        url: `/api/public/?service=User.GetUserNotice&uid=${data.uid}&token=${data.token}&p=${data.page}`,
        method: 'get'
    })
}
//获取信息
export function GetBaseInfo(data) {
    return request1({
        url: `/api/public/?service=User.GetBaseInfo&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//获取手机验证码 修改手机
export function GetBindMobileCode(data) {
    return request1({
        url: `/api/public/?service=User.GetBindMobileCode&mobile=${data.mobile}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//修改手机
export function UpdateMobile(data) {
    return request1({
        url: `/api/public/?service=User.UpdateMobile&mobile=${data.mobile}&code=${data.code}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
//获取手机验证码  修改密码
export function GetForgetCode(data) {
    return request1({
        url: `/api/public/?service=Login.GetForgetCode&mobile=${data.mobile}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//获取手机验证码  修改密码
export function UserForget(data) {
    return request1({
        url: `/api/public/?service=Login.UserForget&mobile=${data.mobile}&password=${data.password}&uid=${data.uid}&token=${data.token}&code=${data.code}`,
        method: 'get'
    })
}

//上传
export function Examples_Upload(data) {
    return request1({
        url: `/api/public/?service=App.Examples_Upload.GoFtp`,
        method: 'post',
        data
    })
}

//反馈
export function CreateData(data) {
    return request1({
        url: `/api/public/?service=App.FeedBack.CreateData`,
        method: 'post',
        data
    })
}

//积分
export function GetIntegral(mobile) {
    return request1({
        url: `/api/public/?service=App.User_User.GetIntegral&mobile=${mobile}`,
        method: 'get'
    })
}
//政策解读
export function getOrganList(data) {
    return request({
        url: `/wjyql/mobile/getOrganList`,
        method: 'post',
        data
    })
}
//政策解读列表
export function getPolicyList(data) {
    return request({
        url: `/wjyql/mobile/getPolicyList`,
        method: 'post',
        data
    })
}
//政策解读详情
export function getPolicyMap(data) {
    return request({
        url: `/wjyql/mobile/getPolicyMap`,
        method: 'post',
        data
    })
}

//政策解读详情附件下载
export function uploadFile(id) {
    return request({
        url: `/wjyql/uploadFile/downloadFile?attachId=${id}`,
        method: 'get',
    })
}


//获取问题列表
export function getProblemList(data) {
    return request({
        url: `/wjyql/mobile/getProblemList`,
        method: 'post',
        data
    })
}

//获取问题详情
export function getProblemMap(data) {
    return request({
        url: `/wjyql/mobile/getProblemMap`,
        method: 'post',
        data
    })
}

//获取帖子列表
export function getPostList(data) {
    return request({
        url: `/wjyql/mobile/getPostList`,
        method: 'post',
        data
    })
}
//获取帖子详情
export function getPostMap(data) {
    return request({
        url: `/wjyql/mobile/getPostMap`,
        method: 'post',
        data
    })
}
//	帖子保存或修改
export function postSave(data) {
    return request({
        url: `/wjyql/mobile/postSave`,
        method: 'post',
        data
    })
}

//	获取通知列表
export function getNoticeList(data) {
    return request({
        url: `/wjyql/mobile/getNoticeList`,
        method: 'post',
        data
    })
}

//	获取通知列表
export function messagegetProblemMap(data) {
    return request({
        url: `/wjyql/mobile/getProblemMap`,
        method: 'post',
        data
    })
}

