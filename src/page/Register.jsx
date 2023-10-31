import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../Api/axios";
import { Link } from "react-router-dom";

// Regular Expressions
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^[0-9].{10}$/;

const Register_URL = "register";

const Register = () => {
  // for accessability
  const userRef = useRef();
  const errRef = useRef();

  // user data /////////////////

  // first name
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  // lastName
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // confirm password
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  // phone
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  // Error
  const [errMsg, setErrMsg] = useState("");

  // success
  const [success, setSuccess] = useState(false);

  // first name
  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
  }, [firstName]);

  // lastName
  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
  }, [lastName]);

  // email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // password
  useEffect(() => {
    // password
    setValidPwd(PWD_REGEX.test(pwd));

    // confirm password
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // phone
  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  // rest the error massage
  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, pwd, matchPwd, phone]);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(true);

    try {
      const response = await axiosInstance.post(
        Register_URL,
        JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: pwd,
          phone: phone,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration sFailed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h2>you have registered successfully</h2>
          <p>{/* go to <a href="#"> log in</a> page */}</p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1 className="title">Register</h1>

          <form onSubmit={handleSubmit}>
            {/* first name */}
            <label htmlFor="firstName">
              First Name :
              <span className={validFirstName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validFirstName || !firstName ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
              aria-invalid={validFirstName ? "false" : "true"}
              aria-describedby="firstNameNote"
            />

            <p
              id="firstNameNote"
              className={
                firstNameFocus && firstName && !validFirstName
                  ? "instructions"
                  : "offScreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
            </p>

            {/* last name */}

            <label htmlFor="lastName">
              Last Name :
              <span className={validLastName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validLastName || !lastName ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="lastName"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="lastNameNote"
            />

            <p
              id="lastNameNote"
              className={
                lastNameFocus && lastName && !validLastName
                  ? "instructions"
                  : "offScreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
            </p>

            {/* Email */}

            <label htmlFor="email">
              Email :
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="EmailNote"
            />

            <p
              id="EmailNote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offScreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
            </p>

            {/* password */}

            <label htmlFor="pwd">
              password :
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="Pwd"
              required
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdNote"
            />

            <p
              id="pwdNote"
              className={pwdFocus && !validPwd ? "instructions" : "offScreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character
            </p>

            {/* confirm password */}

            <label htmlFor="matchPwd">
              confirm password :
              <span className={validMatchPwd && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="matchPwd"
              required
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="matchPwdNote"
            />

            <p
              id="matchPwdNote"
              className={
                matchPwdFocus && !validMatchPwd ? "instructions" : "offScreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Confirm password and password must match
            </p>

            {/* phone */}

            <label htmlFor="phone">
              Phone number :
              <span className={validPhone ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPhone || !phone ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              aria-invalid={validPhone ? "false" : "true"}
              aria-describedby="phoneNote"
            />

            <p
              id="phoneNote"
              className={
                phoneFocus && phone && !validPhone
                  ? "instructions"
                  : "offScreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid phone number
            </p>

            <button
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPwd ||
                !validMatchPwd ||
                !validPhone
                  ? true
                  : false
              }
              type="submit"
            >
              Sign up
            </button>
          </form>

          <p>
            Already Registered?
            <br />
            <span><Link to={"/login"}> log in </Link></span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
