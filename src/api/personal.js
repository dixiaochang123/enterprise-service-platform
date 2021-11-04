import request1 from '@/utils/request1'

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

