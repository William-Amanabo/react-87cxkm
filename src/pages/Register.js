import React, { useState } from "react";
import styled from "styled-components";
import useStore from "../store/useStore";
import logo from "../assets/logo@2x-2.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matNo, setMatNo] = useState("");

  const { Register } = useStore();

  return (
    <StyledRegister>
      <img className="form-logo" src={logo} />
      <form>
        <div className="form-header">Register</div>
        <div className="input-container">
          <input
            type="text"
            className="username"
            onChange={(e) => {
              setMatNo(e.target.value);
            }}
            required
          />
          <label for="">Matric Number</label>
        </div>
        <button
          className="signin-button"
          onClick={(e) => {
            e.preventDefault();
            Register(matNo);
          }}
        >
          Register
        </button>
      </form>
    </StyledRegister>
  );
}


const StyledRegister = styled.div`
  max-width: 400px;
  width: 80%;
  margin: auto;
  margin-top: 10%;
  .form-logo {
    width: 65%;
    margin: 10px 20%;
  }
  form {
    .form-header {
      font-size: 2rem;
      color: rgb(1, 1, 1);
      font-weight: 400;
    }
    .input-container {
      position: relative;
      label {
        color: rgb(194, 192, 255);
        position: absolute;
        top: 42px;
        left: 13px;
        transition: 0.5s;
        pointer-events: none;
      }
      .username,
      .password {
        font-size: 1rem;
        background-color: rgb(240, 239, 255);
        border-radius: 10px;
        border: none;
        width: 94%;
        margin-top: 35px;
        padding: 15px 0 15px 20px;
      }

      &:focus-within > label,
      & input:valid + label {
        top: 0;
        color: rgb(77, 71, 195);
      }
      input:valid + label {
        top: 0;
        color: rgb(77, 71, 195);
      }
      input:valid {
        border: 1px solid rgba(77, 71, 195);
      }
    }

    .forgot {
      color: rgb(211, 211, 211);
      text-align: right;
      margin-top: 10px;
      width: 100%;
      font-size: 0.9rem;
      transition: 0.5s;
      &:hover {
        color: rgb(77, 71, 195);
      }
    }
    .signin-button {
      width: 100%;
      min-height: 50px;
      color: rgba(255, 255, 255, 1);
      box-shadow: 0 0 20px 10px rgb(198, 192, 216);
      border: none;
      background-color: rgb(77, 71, 195);
      padding: 10px;
      border-radius: 10px;
      margin-top: 25px;
      transition: 0.5s;
      &:hover {
        transform: translateY(-10px);
      }
    }
  }
`;
