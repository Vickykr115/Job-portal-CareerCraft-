import { Link } from "react-router-dom";
import { useState } from "react";
import "./signup.css"; // Import the CSS file for styling

const Createaccount = () => {
    const [userinfo, setInfo] = useState({});

    const pickValue = (obj) => {
        setInfo({ ...userinfo, [obj.target.name]: obj.target.value });
    };

    const save = (frmobj) => {
        frmobj.preventDefault();
        let url = "http://localhost:1234/userapi";
        let postdata = {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify(userinfo),
        };
        fetch(url, postdata)
            .then((response) => response.json())
            .then((info) => {
                alert(userinfo.fname + " Registered Successfully");
                frmobj.target.reset();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Registration Failed. Please try again.");
            });
    };

    return (
        <div className="create-account-container">
            <div className="create-account-background"></div>
            <div className="create-account-box">
                <form onSubmit={save}>
                    <div className="create-account-card">
                        <div className="create-account-header">
                            <i className="fa fa-user-plus"></i> Create Account{" "}
                            <Link to="/login" className="float-end">
                                Already Have an Account?
                            </Link>
                        </div>
                        <div className="create-account-body">
                            <div className="form-group">
                                <label>Profile Type</label>
                                <select className="form-select" name="type" onChange={pickValue} required>
                                    <option value="">Choose</option>
                                    <option value="COMPANY">COMPANY</option>
                                    <option value="USER">USER</option>
                                </select>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" className="form-control" name="fname" onChange={pickValue} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Mobile No</label>
                                        <input type="number" className="form-control" name="mobile" onChange={pickValue} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" onChange={pickValue} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" onChange={pickValue} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input type="date" className="form-control" name="dob" onChange={pickValue} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Education</label>
                                        <input type="text" className="form-control" name="education" onChange={pickValue} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input type="text" className="form-control" name="state" onChange={pickValue} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" className="form-control" name="city" onChange={pickValue} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea className="form-control" name="address" onChange={pickValue} required></textarea>
                            </div>
                        </div>
                        <div className="create-account-footer">
                            <button type="submit" className="btn-submit">
                                Submit
                            </button>
                            <button type="reset" className="btn-reset">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createaccount;