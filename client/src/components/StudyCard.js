import styled from "styled-components";

export default function StudyCard() {

    return (
      <StudyBox>
        <StudyIcon/>
        <UserName/>
        <StudyTitle/>
      </StudyBox>
    );
}

const StudyBox = styled.div`
    position: absolute;
    width: 280px;
    height: 75px;
    left: 20px;
    top: 170px;
`;

const StudyIcon = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 36px;
    top: 180px;
`;

const UserName = styled.input`
    position: absolute;
    left: 32%;
    right: -92%;
    top: 0%;
    bottom: 0%;

    font-family: 'NanumSquare Neo';
    font-style: normal;
    font-weight: 350;
    font-size: 8px;
    line-height: 9px;
    text-align: center;

    color: #000000;
`;

const StudyTitle = styled.input`
    position: absolute;
    left: 11.11%;
    right: -11.11%;
    top: 0%;
    bottom: 0%;

    font-family: 'NanumSquare Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    text-align: center;

    color: #000000;
`