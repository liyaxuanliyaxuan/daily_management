
import Axios from 'axios'
import qs from 'qs'

import {Component} from 'react'
//Axios.defaults.baseURL = 'http://localhost:3000/api'
Axios.defaults.baseURL = 'https://nmid.manage.itrover.cn/api'
if(window.localStorage.getItem('token')){
  Axios.defaults.headers.common['Authorization'] =  window.localStorage.getItem('token')
}


Component.prototype.$axios=Axios //将axios挂载到Component上，以供全局使用
Component.prototype.$qs = qs

Axios.interceptors.response.use(function (response) {
    return response.data;//只获取data数据
  }, function (error) {
    if(error.response){
      switch (error.response.status){
        case 401:
          window.location.assign('/#/')
      }
      return Promise.reject(error);
    }  
  });
