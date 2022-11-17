import React from "react";
import styled from "styled-components";
import { MdPeopleAlt } from "react-icons/md";

export default function ProfileDetail({ items }) {
  console.log(items.data);
  const list = items.data;

  return list.length !== 0
    ? list.map((el, idx) => {
        return (
          <ListContainer key={idx}>
            <div className="header">
              <div>
                {/* <p>{items}</p> */}
                <p>studyTitle</p>
              </div>
              <div>
                <button>매칭</button>
              </div>
            </div>
            <div>
              <div>
                <MdPeopleAlt />
              </div>
              <div></div>
            </div>
          </ListContainer>
        );
      })
    : null;
}

const ListContainer = styled.section`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .header {
    display: flex;
  }
`;
