import axios from "@/utils/axiosRequest"
// 获取加入我们的数据
export const add = ()=>{
    return axios.request({
        url:"/func/seljoinus",
    })
}
// 留言板提交
export const addInfo = (com)=>{
    return axios.request({
        url:"/note/insetleaveword",
        method:"POST",
        data:com
    })
}
export const test = ()=>{
    return axios.request({
        url:"/note/selfaculty",
    })
}