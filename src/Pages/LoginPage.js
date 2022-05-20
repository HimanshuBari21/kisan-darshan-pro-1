import { Link } from 'react-router-dom';
import '../style/login.css'
import firebase from '../firebase'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import ProductHeader from '../Component/ProductHeader';

function LoginPage() {

  const [otpStates, setOtpStates] = useState(false)
  const [otpIsLoading, setOtpIsLoading] = useState(false)

  const [{ user }] = useDataLayerValue()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const OtpMain = (props) => {
    const [EnteredOTP, setEnteredOTP] = useState()
    setOtpIsLoading(false)
    const verifyOtp = (e) => {
      e.preventDefault()
      var confirmationResult = window.confirmationResult
      confirmationResult.confirm(EnteredOTP).then((result) => {
        setOtpStates(false)
        var uid = result.user.uid
        firebase.database().ref('users/').child(uid).on('value', (snapshot) => {
          var user = snapshot.val()
          if (user === null) {
            window.location.replace('/register')
          }
          else {
            window.location.replace('/home')
          }
        })
      }).catch((error) => {
        if (error.code === "auth/invalid-verification-code") {
          Swal.fire("Invalid OTP", "Enter correct OTP and try again", 'error')
        }
      })

    }
    return (
      <>
        <div className="otp-main">
          <div className="otp-box">
            <h3>Enter Otp</h3>
            <p>An OTP has been sent to the +91{props.phoneNo}</p>
            <form action="" onSubmit={verifyOtp}>
              <input className="input" type="number" placeholder="Enter OTP" value={EnteredOTP} onChange={(e) => { setEnteredOTP(e.target.value) }} />
              <input className="btn btn-primary" type="submit" value="Verify" />
            </form>
          </div>
        </div>
      </>
    )
  }
  const setUpRecaptch = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        signIn();
      }
    });
  }
  const SendOtpLoding = () => {
    return (
      <div style={{zIndex: 400,background: "#00000066" , width: "100vw", height: "100vh", position: "fixed",transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}>
        <div  className="h-100 d-flex justify-content-center align-items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt="" />
        </div>
      </div>
    )

  }
  // console.log(currentUser)
  const signIn = (e) => {
    e.preventDefault()
    setOtpIsLoading(true)
    setUpRecaptch()

    
    const phoneNumber = `+91${formData.phone}`;
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).catch((error)=>{
      var code = error.code
      if(error.code==="auth/invalid-phone-number"){
        Swal.fire("Invalid phone number", "Enter correct phone number and try again", 'error').then(()=>{
          window.location.reload()
        })
      } 
    })
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpStates(true)

      }).catch((error) => {
        console.log(error)
      });
  }

  if (user.userAuthData !== null) {
    window.location.replace("/home")
  }
  else {
    return (

      <>
        {
          otpStates === true && <OtpMain phoneNo={formData.phone} />
        }
        { 
          otpIsLoading === true && <SendOtpLoding />
        }
        <div className="d-none">
          <ProductHeader />
        </div>
        <div className="login-page">
          <form onSubmit={signIn} action="">

            <div id="wrapper">
              <legend>Login <span className="material-icons">
                login
              </span></legend>
              <div className='main-form'>
                <div className="inputs">
                  <span className="material-icons input-icon">
                    call
                  </span>
                  <input onChange={(event) => { setFormData({ ...formData, phone: event.target.value }) }} placeholder="Phone No." max="9999999999" min="1000000000" required="required" type="number"  ></input>

                </div>

                <input id="submit" type="submit" value="Login" />
              </div>


              <div id="recaptcha-container"></div>

            </div>

          </form>
        </div>
      </>
    );
  }
}


export default LoginPage;