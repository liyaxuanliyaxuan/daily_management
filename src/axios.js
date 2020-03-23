
import Axios from 'axios'
import qs from 'qs'

import {Component} from 'react'
Axios.defaults.baseURL = 'https://nmid.manage.itrover.cn/api'

Component.prototype.$axios=Axios //将axios挂载到Component上，以供全局使用
Component.prototype.$qs = qs

Axios.interceptors.response.use(function (response) {
    return response.data;//只获取data数据
  }, function (error) {
    return Promise.reject(error);
  });
