import { useState, useRef } from 'react';
import {Input, InputWithBtn, Checkbox, Button, InputWithBtnContainer} from '../components/form';
import styled from 'styled-components';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import fir from '../img/fir.png';
import axios from 'axios';

export default function Join() {
    
    const navigate = useNavigate();

    const handleConfirmId = (id) => {
        //TODO id중복체크
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            id:e.target.id.value,
            pw:e.target.pw.value,
            name:e.target.name.value,
            nick:e.target.name.value
        };

        axios.post(`/api/auth/join`, body)
        .then((response) => {
            if (response.data.success === 200) {
                navigate("/login");
            } else {
                alert("저장실패")
            }
        })
    }
    
    return (
        <JoinContainer>
            <JoinForm onSubmit={handleSubmit}>
                <BsChevronLeft className='header-goback' onClick={()=>navigate(-1)}/>
                <h1 className="header-title">회원가입</h1>
                <hr/>
                <ImageContainer>
                    <img src={fir} alt="logo" />
                </ImageContainer>
                <Input label="이름*" name="name" placeholder="이름을 입력해주세요." style={{marginBottom:"20px"}} maxLength={10}/>
                <LoginInput label="아이디*" name="id" placeholder="아이디를 입력해주세요." description="6~20자의 영문,숫자만 입력해주세요." style={{marginBottom:"20px"}} btnTitle="중복확인" onClick={(id)=>handleConfirmId(id)}/>
                <Input label="비밀번호*" name="pw" placeholder="비밀번호를 입력해주세요." description="8~16자의 영문,숫자, 특수문자를 사용해주세요." password style={{marginBottom:"20px"}}/>
                <Input label="비밀번호 확인*" placeholder="비밀번호를 다시 입력해주세요." password style={{marginBottom:"20px"}}/>
                <InputWithBtn label="휴대폰인증*" placeholder="'-' 없이 입력해주세요." btnTitle="인증요청"/>
                <Checkbox label={"젠프라의 <b>서비스이용약관, 개인정보 취급 방침</b>에 동의합니다. (필수)"} style={{marginTop:"50px"}}/>
                <Button text="회원가입 완료하기" marginTop="44px"/>
            </JoinForm>
        </JoinContainer>
    );
};

const LoginInput = (props) => {

    const inputRef = useRef();
    const [description, setDescription] = useState(props?.description);
    const [value, setValue] = useState("");

    const validationCheck = (e) => {
        if(e.target.value) {

        }
    }

    return (
        <InputWithBtnContainer style={props?.style}>
            <label>{props?.label}</label>
            <div>
                <input className="input" name={props?.name} placeholder={props?.placeholder} ref={inputRef} onChange={validationCheck}/>
                <input type="button" className="btn-sm" onClick={()=>props.onClick(value)} value={props.btnTitle} />
            </div>
            <p>{description}</p>
        </InputWithBtnContainer>
    )
};

const JoinForm = styled.form`
    margin:32px 32px;
    .header-goback {
        float:left;
        color:#727272;
    }
    .header-title {
        text-align:center;
    }
`

const JoinContainer = styled.div`
    position: absolute;
    background: #f4ede7;
    background-size: cover;
`

const ImageContainer = styled.div`
    text-align:center;
    margin: 38px auto 38px;
`