import styled from "styled-components";
import { HeartFillIcon, LocationIcon } from "@goorm-dev/gds-goormthon";

export default function StudyCard() {

    return (
      <StudyBox>
        <IconBox style={{borderRadius:'50%',  background : '#D3D3D3', float:'left'}}/>
        <IconBox style={{float:'right'}}>
            <HeartFillIcon style={{color:"lightGray"}}/>
        </IconBox>
        <UserName className="font">username</UserName>
        <StudyTitle className="font-bold">스터디</StudyTitle>
        <LocationIcon/>
      </StudyBox>
    );
}

const StudyBox = styled.div`
    height: 75px;
    margin: 20px;
    border: 1px solid black;
`;


const IconBox = styled.div`
    width: 24px;
    height: 24px;
    margin : 10px 16px;
`;

const UserName = styled.p`
    color: #000000;
    margin-top:10px;
    text-align:left;
    font-size:4px;
`;

const StudyTitle = styled.h1`
    text-align:left;
    color: #000000;
    margin-top: 4px;
    font-size: 12px;
`;