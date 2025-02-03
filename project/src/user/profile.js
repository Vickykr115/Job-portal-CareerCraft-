import { useState, useEffect } from "react";
import "./profile.css"; // Import the CSS file for styling

const Myprofile = () => {
    const [fullname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [edu, setEdu] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const getprofile = () => {
        let url = "http://localhost:1234/userapi/" + localStorage.getItem("userid");
        fetch(url)
            .then((response) => response.json())
            .then((user) => {
                setName(user.fname);
                setEmail(user.email);
                setPassword(user.password);
                setMobile(user.mobile);
                setDob(user.dob);
                setEdu(user.education);
                setState(user.state);
                setCity(user.city);
                setAddress(user.address);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    };

    useEffect(() => {
        getprofile();
    }, []);

    const update = (obj) => {
        obj.preventDefault(); // Prevent page reload
        let userinfo = {
            fname: fullname,
            mobile: mobile,
            email: email,
            state: state,
            city: city,
            address: address,
            dob: dob,
            education: edu,
            password: password,
            type: localStorage.getItem("usertype"),
        };

        let url = "http://localhost:1234/userapi/" + localStorage.getItem("userid");
        let postdata = {
            headers: { "Content-Type": "application/json" },
            method: "put",
            body: JSON.stringify(userinfo),
        };

        fetch(url, postdata)
            .then((response) => response.json())
            .then((info) => {
                setMessage("Your Profile Updated Successfully");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                setMessage("Failed to update profile. Please try again.");
            });
    };

    return (
        <div className="profile-container">
            <div className="profile-background"></div>
            <div className="profile-box">
                <div className="profile-header">
                    <h1 className="text-primary">Manage Profile</h1>
                    <p className="text-danger">
                        <i>{message}</i>
                    </p>
                </div>
                <form onSubmit={update}>
                    <div className="profile-card">
                        <div className="card-header">
                            <i className="fa fa-user"></i> Edit / Update Profile
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={fullname}
                                            onChange={(obj) => setName(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Mobile No</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={mobile}
                                            onChange={(obj) => setMobile(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(obj) => setEmail(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={password}
                                            onChange={(obj) => setPassword(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dob}
                                            onChange={(obj) => setDob(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={edu}
                                            onChange={(obj) => setEdu(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={state}
                                            onChange={(obj) => setState(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={city}
                                            onChange={(obj) => setCity(obj.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea
                                    className="form-control"
                                    value={address}
                                    onChange={(obj) => setAddress(obj.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button type="submit" className="btn-update">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Myprofile;