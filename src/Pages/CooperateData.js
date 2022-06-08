// import "./styles.css";
import { useDataLayerValue } from "../DataLayer/DataLayer";
import { useNavigate } from "react-router-dom";
const Corporate = () => {
    const { user } = useDataLayerValue()
    const navigate = useNavigate()
    if (user.userAuthData) {
        if (!user.userData.cooperateData) {
            return (
                <>
                    <div id="wrapper">
                        <legend>Complete Profile</legend>
                        <select className="inputs-reg" name="company-type" id="company-type">
                            <option value="">Company Type</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Seller-Vendors-Distributor">Seller/Vendors/Distributor</option>
                            <option value="FPO-SHG">FPO (Farmer Producer Orgnisation)/SHG (Self Help Group)</option>
                        </select>
                        <div>
                            <input className="inputs-reg" type="text" name="name" id="name" placeholder="Company Name" />
                        </div>
                        <div>
                            <input className="inputs-reg" type="text" name="contact-person-name" id="contact-person-name"
                                placeholder="Contact Person Name" />
                        </div>
                        <div>
                            <input className="inputs-reg" type="text" name="contact-person-email" id="contact-person-email"
                                placeholder="Contact Person Email (optional)" />
                        </div>
                        <div>
                            <input className="inputs-reg" type="tel" maxlength="10" minlength="10" name="contact-person-phone"
                                id="contact-person-phone" placeholder="Contact Person Phone" />
                        </div>
                        <div>
                            <input className="inputs-reg" type="text" name="address" id="address"
                                placeholder="Company Address (Please provide full address)" />
                            <br />
                            <div>
                                <input className="inputs-reg" type="number" name="gst" id="gst" placeholder="GST IN (optional)" />
                            </div>
                            <div>
                                <input className="inputs-reg" type="number" name="iso" id="iso"
                                    placeholder="ISO Certification Number (optional)" />
                            </div>
                            <div>
                                <input className="inputs-reg" type="text" name="website" id="website"
                                    placeholder="Company Website (optional)" />
                            </div>

                        </div>

                        <div>
                            <input type="checkbox" name="agree" id="agree" />
                            <label for="agree">I agree to the terms and condition mentioned in privacy policy and agreement statement</label>
                            <br />
                        </div>
                        <input className="inputs-reg" id="submit" type="submit" value="Submit" />
                    </div >
                </>
            );
        }
        else {
            navigate("/")
        }
    }
    else {
        navigate("/")
    }
}

export default Corporate;