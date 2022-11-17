import styled from "styled-components";

export default function StudyCard() {

    return (
      <StudyBox>
        <StudyIcon/>
        <UserName className="font"/>
        <StudyTitle className="font-bold"/>
      </StudyBox>
    );
}

const StudyBox = styled.div`
    height: 75px;
    margin: 20px;
    border: 1px solid black;
`;

const StudyIcon = styled.div`
    width: 24px;
    height: 24px;
    background : #D3D3D3;
    border-radius : 50%;
`;

const UserName = styled.input`
    color: #000000;
`;

const StudyTitle = styled.input`
    color: #000000;
`;