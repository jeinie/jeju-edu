import React from "react";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";

export default function ViewDetail() {
  return (
    <ViewDetailContainer>
      <div className="wrapper">
        <div className="containerHeader">
          <div className="headerLeft">
            <section className="headerLeftContent">
              <div className="headerProfile"></div>
              <div className="headerTitle">
                <p>user name</p>
                <p>party title</p>
              </div>
            </section>
            <section className="placeData">
              <div className="placeAddress">
                <HiLocationMarker />
                <h6 className="addressTitle">place</h6>
                <p className="address">00동</p>
              </div>
              <div className="memberContainer">
                <MdPeopleAlt />
                <p className="partyMembers">{`member/10`}</p>
              </div>
            </section>
          </div>
          <div className="headerCircle"></div>
        </div>
        {/* <textarea className="partyDesc" cols="30" row="5" readonly>
          서버에서 통신받아온 qweqwe 데이터 넣기.
        </textarea> */}
        <div>주황색 동그라미 안에 하트</div>
        <div>
          <div>하트아이콘</div>
          <button>{`J-JOIN(D-1)`}</button>
        </div>
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
    /* margin-bottom: 4px; */
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
    border: 1px solid red;
  }
`;
