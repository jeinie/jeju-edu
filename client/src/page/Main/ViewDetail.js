import React from "react";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";

export default function ViewDetail({ list }) {
  if (typeof list === "undefined") {
    return;
  }
  return (
    <ViewDetailContainer>
      <div className="wrapper">
        <div className="containerHeader">
          <div className="headerLeft">
            <section className="headerLeftContent">
              {/* <div className="headerProfile"></div> */}
              <div className="headerTitle">
                <p>{list.who_open}</p>
                <p>{list.study_name}</p>
              </div>
            </section>
            <section className="placeData">
              <div className="placeAddress">
                <HiLocationMarker />
                <h6 className="addressTitle">place</h6>
                <p className="address">{list.location}</p>
              </div>
              <div className="memberContainer">
                <MdPeopleAlt />
                <p className="partyMembers">{`${list.members}/10`}</p>
              </div>
            </section>
          </div>
          <div className="headerCircle"></div>
        </div>
        <pre className="partyDesc">{list.study_detail}</pre>
        <section className="detailCreateBtn">
          <div className="btnBox">
            <div className="likeBtn"></div>
            <button className="joinBtn">{`J-JOIN(D-1)`}</button>
          </div>
        </section>
      </div>
    </ViewDetailContainer>
  );
}

const ViewDetailContainer = styled.section`
  padding-top: 35px;

  .wrapper {
    font-size: 12px;
    margin: 0 20px;
    padding: 0 0 27px 17px;
    box-shadow: 1px 1px 3px 1px #dadce0;
  }
  .containerHeader {
    display: flex;
    margin-top: 16px;
    align-items: top;
    padding-top: 16px;
    justify-content: space-between;
  }
  .headerLeftContent {
    display: flex;
    margin-bottom: 10px;
  }
  .headerLeft {
    display: flex;
    width: 60%;
    flex-direction: column;
  }
  .headerProfile {
    text-align: left;
    margin-right: 6px;
    font-size: 24px;
    width: 24px;
    height: 24px;
    background-color: #d9d9d9;
    border-radius: 50%;
  }
  .headerTitle {
    padding-left: 6px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  .headerCircle {
    text-align: right;
    width: 78px;
    height: 78px;
    background-color: #d9d9d9;
    border-radius: 50%;

    position: relative;
    top: -20px;
    left: 0;
  }

  .placeData {
    padding-left: 6px;
    display: flex;
    flex-direction: column;
  }

  .placeAddress {
    display: flex;
    align-items: center;
  }

  .addressTitle {
    margin: 0 6px 0 18px;
  }

  .memberContainer {
    display: flex;
  }

  .partyMembers {
    margin-left: 18px;
  }

  .partyDesc {
    width: 208px;
    height: 60px;
  }

  .detailCreateBtn {
    display: flex;
    justify-content: center;
    margin-top: 27px;
  }

  .likeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background-color: #e47b00;
    border-radius: 50%;
  }

  .likeBtn:before {
    text-align: center;
    content: "♡";
    font-size: 16px;
    color: white;
  }
  .btnBox {
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  .joinBtn {
    width: 219px;
    height: 28px;
    color: white;
    margin-left: 9px;
    background-color: #e47b00;
    border: none;
    border-radius: 25px;
  }
`;
