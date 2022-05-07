import { Link } from 'react-router-dom';
import '../style/login.css'
import firebase from '../firebase'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import ProductHeader from '../Component/ProductHeader';

function LoginPage() {

  const [otpStates, setOtpStates] = useState(false)
  const [{ user }] = useDataLayerValue()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const OtpMain = (props) => {
    const [EnteredOTP, setEnteredOTP] = useState()
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
  // console.log(currentUser)
  const signIn = (e) => {
    e.preventDefault()
    setUpRecaptch()


    const phoneNumber = `+91${formData.phone}`;
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
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