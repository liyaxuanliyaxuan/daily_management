//表单验证
import cookie from 'react-cookies'
//发送请求
const sendLoginForm = (that) => {
    let ifAdmin = false;
    const {username, password} = {...that.state}
    if(username === 'admin')ifAdmin = true;
    let user = that.$qs.stringify({
        password,
        username
    })
    that.$axios.post(`/login?${user}`)
        .then((res) => {
            console.log(res);
            if (res.code === 200) {
                if(ifAdmin){
                    window.sessionStorage.setItem('ifAdmin','1')
                }
                const expires = new Date()
                expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
                cookie.save(
                    'ifLogin',
                    that.state.username,
                    {
                        path: '/',
                        expires,
                        maxAge: 1000,
                        domain: 'localhost',
                        secure: false,
                        httpOnly: false
                    }
                )
                window.location.assign('/file-share')
    
            } else if (res.code === 1001) {
                alert(res.message)
            } else {
                return
            }
    
        }).catch((err) => {
            console.log(err);
        })
}
export default sendLoginForm