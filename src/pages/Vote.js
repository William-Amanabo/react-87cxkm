import React from "react";
import candidatesList from "../util/candidates";
import useStore from "../store/useStore";
import styled from "styled-components";

function Vote() {
  const { submitVote, matricNo } = useStore();
  const submit = () => {
    let answers = [];
    let vote = {};
    candidatesList.forEach((ele) => {
      var checked = document.querySelectorAll(
        `input[name=${ele.position}]:checked`
      )[0];
      if (checked === undefined) {
        console.log("checked with issues", checked);
        alert("You have to vote for all Positions!");
        return;
      }
      answers.push({
        position: ele.position,
        vote: checked.value,
      });

      vote[`${ele.position}`] = checked.value;
    });
    console.log(answers);
    const payload = {
      matno: matricNo,
      vote: vote,
    };
    submitVote(payload);
  };
  return (
    <StyledVote>
      <h1>Vote your alumini !</h1>
      <div className="vote-container">
        {candidatesList.map((ele) => {
          return (
            <>
              <div className="post-title">{ele.position}</div>
              <div className="candidates-container">
                {ele.candidates.map((candidates) => {
                  return (
                    <>
                      <div className="candidate">
                        <img src={`/${candidates.matricNo}.jpeg`} />
                        <div className="candidate-name">
                          {candidates.firstName}
                        </div>
                        <div className="candidate-surname">
                          {candidates.lastName}
                        </div>
                        <label>
                          <input
                            type="radio"
                            name={ele.position}
                            value={candidates.matricNo}
                          />
                        </label>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
        <div className="submit-container">
          <button className="submit" onClick={submit}>
            Vote !
          </button>
        </div>
      </div>
    </StyledVote>
  );
}

export default Vote;

const StyledVote = styled.div`
h1 {
      text-align: center;
      margin-bottom: 20px;
      text-transform: capitalize;
    }
  .vote-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    
    .post-title {
      font-size: 1.3rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .candidates-container {
      background: white;
      width: 100%;
      //border-bottom: 1px solid rgba(0,0,0,0.2);
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 4rem;
      padding-bottom: 2rem;
      &:active{
        input{
          checked:true
        }
      }
      @media (max-width: 768px) {
        flex-direction: column;
	.candidate{
		width:80% !important;
	}
      }
      .candidate {
        box-shadow: 0 0 20px 1px rgb(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 100%;
        transition: all 0.3s ease-in-out;

        &:hover {
          box-shadow: 0 10px 20px 1px rgb(0, 0, 0, 0.1);
          transform: translateY(-10%);
        }
        img {
          width: 70%;
          border-radius: 50% !important;
        }
        .candidate-name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .candidate-surname {
          font-size: 1.1rem;
          font-weight: 200;
        }

        
      }
    }
    .submit-container {
      width: 200px;
          .submit {
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
  }
`;
