//表单验证
import cookie from 'react-cookies'
import Axios from '../../axios'
//发送请求
const sendLoginForm = (that) => {
    //let ifAdmin = false;
    const {username, password} = {...that.state}
    
    // let user = that.$qs.stringify({
    //     password,
    //     username
    // })
    const userData = JSON.stringify(
        {
            username,
            password
        }
    )
    // userData.append('username',username)
    // userData.append('password',password)
   //let userName;
    that.$axios.post(`/login`,userData,
    {
        //transformRequest:data=>{return JSON.stringify(data)},
       
        headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res);
            if (res.code === 200) { 
                //userName = that.state.username
                if(username === 'admin')  //根据名字判断是否是管理员身份
                if(ifAdmin){
                    window.sessionStorage.setItem('ifAdmin','1');
                }
                localStorage.setItem('token',res.data)//TODO
               
            
                const expires = new Date()
                expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
                cookie.save(
                    'ifLogin',
                    that.state.username,
                    {
                        path: '/',
                        expires,
                        maxAge: 1000,
                       // domain: 'nmid.manage.itrover.cn',
                       domain:'localhost',
                        secure: false,
                        httpOnly: false
                    }
                )
                Axios.defaults.headers.common['token'] =  window.localStorage.getItem('token')
                //window.location.assign('/#/home')
    
            } else {
               alert(res.message) 
            }
    
        }).catch((err) => {
            console.log(err);
        })
    
}
export default sendLoginForm;