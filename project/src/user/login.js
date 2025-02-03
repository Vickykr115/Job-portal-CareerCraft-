import { Link } from "react-router-dom";
import { useState } from "react";
import "./login.css"; // Import the CSS file for styling

const Login = () => {
    const [message, setMessage] = useState("");
    const [userinfo, setInfo] = useState({});

    const pickValue = (obj) => {
        setInfo({ ...userinfo, [obj.target.name]: obj.target.value });
    };

    const loginCheck = (frmobj) => {
        frmobj.preventDefault();
        setMessage("Please Wait Validating....");

        let url = "http://localhost:1234/userapi";
        fetch(url)
            .then((response) => response.json())
            .then((info) => {
                let userfound = false;
                info.forEach((user) => {
                    if (user.email === userinfo.email && user.password === userinfo.password) {
                        userfound = true;
                        setMessage("Login Success: Redirecting...");
                        localStorage.setItem("userid", user.id);
                        localStorage.setItem("fullname", user.fname);
                        localStorage.setItem("usertype", user.type);
                        window.location.href = "#/profile";
                        window.location.reload();
                    }
                });

                if (!userfound) {
                    setMessage("Login Failed: Invalid Credentials or User Does Not Exist");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="login-box">
                <p className="login-message">{message}</p>
                <form onSubmit={loginCheck}>
                    <div className="login-card">
                        <div className="login-header">
                            <i className="fa fa-lock"></i> Login{" "}
                            <Link to="/signup" className="float-end">
                                New User?
                            </Link>
                        </div>
                        <div className="login-body">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    onChange={pickValue}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={pickValue}
                                    required
                                />
                            </div>
                        </div>
                        <div className="login-footer">
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;