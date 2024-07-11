import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dogImage from "../assets/images/dogs/dog_orange_bg.jpeg";

const Register: React.FC = () => {
  return (
    <div
      className="bg-gradient-primary"
      style={{
        height: "100vh",
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
                        <h4 className="text-dark mb-4">Create an Account!</h4>
                      </div>
                      <form className="user">
                        <div className="row mb-3">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              className="form-control form-control-user"
                              type="text"
                              id="exampleFirstName"
                              placeholder="First Name"
                              name="first_name"
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              className="form-control form-control-user"
                              type="text"
                              id="exampleLastName"
                              placeholder="Last Name"
                              name="last_name"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                            name="email"
                          />
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="examplePasswordInput"
                              placeholder="Password"
                              name="password"
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="exampleRepeatPasswordInput"
                              placeholder="Repeat Password"
                              name="password_repeat"
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Register Account
                        </button>
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <i className="fab fa-google"></i> Register with Google
                        </a>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="/login">
                          Already have an account? Login!
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

export default Register;
