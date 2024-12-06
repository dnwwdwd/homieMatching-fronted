import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

export const URL = '后端地址:后端端口';

const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : '线上地址',
})

myAxios.defaults.withCredentials = true; //设置为true

myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦');
    return config;
}, function (error) {
    return Promise.reject(error);
});

myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦');
    console.log(response?.data.code);
    // 未登录则跳转登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?=redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;