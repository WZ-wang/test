import axios from "@/utils/axiosRequest"
// 获取新闻
export const getData = (news)=>{
    return axios.request({
        url:"/note/selvypublics",
        method:"POST",
        data:news
    })
}
// 获取新闻详情
export const getDetailData = (news)=>{
    return axios.request({
        url:"/note/onepublic",
        method:"POST",
        data:news
    })
}
