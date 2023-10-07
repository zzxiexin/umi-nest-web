import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { history } from 'umi';
import { message } from 'antd';

// 重定向登陆界面
const RedirectLogin = () => {
    history.push('/login')
}

// 创建一个自定义的 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const access_token = localStorage.getItem('access_token')
    config.headers = {
        'Authorization': access_token ? `Bearer ${access_token}` : ''
    }
    if (!config?.headers?.Authorization){
        RedirectLogin()
    }
    return config as InternalAxiosRequestConfig;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么，如处理返回的结果等
    // if (!response?.data?.success){
    //   message.error('请求失败');
    // }
    console.log('response.data', response.data)
    return response.data;
  },
  (error: any) => {
    // 处理响应错误
    if (error?.response?.status === 401){
      RedirectLogin()
    }
    return Promise.reject(error);
  }
);

export const post = (url: string, params: unknown) => instance.post(url, params);

export const get = (url: string, params?: any) => instance.get(url, params);

export default instance;
