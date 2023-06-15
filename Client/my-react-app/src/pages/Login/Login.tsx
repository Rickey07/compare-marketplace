import Illustration from '../../assets/LogoInfo.jpg'
import './Login.css'

const Login = () => {
  return (
    <div className='main-login-page-container'>
      <div className="image-container">
        <img src={Illustration} alt={"Logo"}></img>
      </div>
      <div className="login-form-container">
          <div className="main-form-card">
                <div className="tabs-container">
                  <span className='active-tab'>Login</span>
                  <span>Register</span>
                </div>
          </div>
      </div>
    </div>
  )
}

export default Login
