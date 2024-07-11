import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dogImage from "../assets/images/dogs/dog_gray_bg.jpeg";

const login: React.FC = () => {
  return (
    <div
      className="bg-gradient-primary"
      style={{
        height: "100vh",
        minHeight: "inherit",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image">
                      <img
                        className="flex-grow-1 bg-login-image"
                        src={dogImage.src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form className="user">
                        <div className="mb-3">
                          <input
                            id="exampleInputEmail"
                            className="form-control form-control-user"
                            type="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            id="exampleInputPassword"
                            className="form-control form-control-user"
                            type="password"
                            placeholder="Password"
                            name="password"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-checkbox small">
                            <div className="form-check">
                              <input
                                id="formCheck-1"
                                className="form-check-input"
                                type="checkbox"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="formCheck-1"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Login
                        </button>
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <i className="fab fa-google"></i> Login with Google
                        </a>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
