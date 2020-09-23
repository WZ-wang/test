import axios from "@/utils/axiosRequest"
// 封装登录的方法
export const login = (user)=>{
    return axios.request({
        url:"/note/seloneuserclass",
        method:"POST",
        data:user
    })
}
// 获取轮播图数据
export const getFocus = ()=>{
    return axios.request({
        url:"/user/photo",
    })
}
// 获取企业文化数据
export const getqy = ()=>{
    return axios.request({
        url:"/func/selectbrief",
    })
}
// 获取合作机构
export const getCom = (com)=>{
    return axios.request({
        url:"/func/selectcoll",
        method:"POST",
        data:com
    })
}
export const test = ()=>{
    return axios.request({
        url:"/note/selfaculty",
    })
}