import axios from "@/utils/axiosRequest"
// 获取产品
export const getProduct = (news)=>{
    return axios.request({
        url:"/func/selproduct",
        method:"POST",
        data:news
    })
}
// 获取产品详情
export const getDetailData = (news)=>{
    return axios.request({
        url:"/func/selproductid",
        method:"POST",
        data:news
    })
}
