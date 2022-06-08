import React, { useState } from "react";
import ProductHeader from "../Component/ProductHeader";
import "../style/contactus.css";
import firebase from "../firebase"
import Swal from "sweetalert2";
function ContactPage() {
  const [formData, setFromData] = useState() 
  const submitContactForn = (e) => {
    e.preventDefault()
    console.log(formData)
    var jsx = "^[ a-zA-Z\-\']+$"
    if(formData.phone &&  formData.name.match(jsx) &&  formData.message){
    firebase.database().ref("contactMail").push(formData).then(()=>{
      Swal.fire("Form submited successfully", "We will replay you soon", "success")
    })
    }
    else{
      Swal.fire("Invalid input please enter all the required details", "", "error")
    }
  }

  let name, value
  const handleFormChanges = (e) => {
    name  = e.target.name
    value  = e.target.value
    setFromData({
      ...formData,
      [name] : value
    })
  }
  return (
    <>
      <ProductHeader />
      <div className="main">
        <form onSubmit={submitContactForn} className="form">
          <h1 className="contactus-heading"> Contact Us</h1>
          <br />
          <input
            className="inputs-contact"
            placeholder="Your Name"
            onChange={handleFormChanges}
            type="text"
            required
            name="name"
            id="name" 
            // pattern="/^[A-Za-z]$/"
            // title="Invelid"
          />
          <input
            className="inputs-contact"
            placeholder="Your email ID (optional)"
            onChange={handleFormChanges}
            type="email"
            name="mail"
            id="mail"
          />
          <input
            className="inputs-contact"
            placeholder="Mobile no."
            onChange={handleFormChanges}
            type="number"
            required
            name="phone"
            id="phone"
            maxlength="10"
          />
          <input
            className="inputs-contact"
            placeholder="Address (optional)"
            onChange={handleFormChanges}
            type="text"
            name="address"
            id="Address"
          />
          <br />
          <input
            className="inputs-contact"
            placeholder="Subject (optional)"
            onChange={handleFormChanges}
            type="text"
            name="subject"
            id="subject"
          />
          <textarea
            className="inputs-contact"
            placeholder="Please describe your issue or message here Properly"
            name="message"
            id="message"
            cols="30"
            rows="10"
            onChange={handleFormChanges}
            required
          ></textarea>
          <input className="inputs-contact" 
          type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}

export default ContactPage;
