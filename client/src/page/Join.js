import { useState, useRef, useEffect } from 'react';
import {Input, Checkbox, Button, InputWithBtnContainer} from '../components/form';
import styled from 'styled-components';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import fir from '../img/fir.png';
import axios from 'axios';

/**
 * 2022-12-12 hssuh
 * 회원가입
 */
export default function Join() {
    
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [terms, setTerms] = useState(false);

    const [isOk, setIsOk] = useState(false);

    const validationCheck = () => {
        //모든 유효성 검사는 여기서
    }

    const handleConfirmId = (id) => {
        axios.post("/api/auth/checkDupId", {id:id}).then((res)=>{
            if( res.data?.code === 200 ) {
                alert(res.data?.message);
            } else {
                alert(res.data?.message);
            }
        })
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

    useEffect(()=>setIsOk(validationCheck()), [name, nick, id, password, passwordConfirm, terms])
    
    return (
        <JoinContainer>
            <JoinForm onSubmit={handleSubmit}>
                <BsChevronLeft className='header-goback' onClick={()=>navigate(-1)}/>
                <h1 className="header-title">회원가입</h1>
                <hr/>
                <ImageContainer><img src={fir} alt="logo" /></ImageContainer>
                <Input label="이름*" name="name" placeholder="이름을 입력해주세요." style={{marginBottom:"20px"}} maxLength={10}/>
                <Input label="닉네임*" name="nick" placeholder="활동명으로 사용할 닉네임을 입력해주세요." style={{marginBottom:"20px"}} maxLength={10}/>
                <LoginInput label="아이디*" name="id" placeholder="아이디를 입력해주세요." description="6~20자의 영문,숫자만 입력해주세요." style={{marginBottom:"20px"}} btnTitle="중복확인" onClick={(id)=>handleConfirmId(id)}/>
                <Input label="비밀번호*" name="pw" placeholder="비밀번호를 입력해주세요." description="8~16자의 영문,숫자, 특수문자를 사용해주세요." password style={{marginBottom:"20px"}}/>
                <Input label="비밀번호 확인*" placeholder="비밀번호를 다시 입력해주세요." password style={{marginBottom:"20px"}}/>
                {/*<InputWithBtn label="휴대폰인증*" placeholder="'-' 없이 입력해주세요." btnTitle="인증요청"/>*/}
                <Checkbox label={"젠프라의 <b>서비스이용약관, 개인정보 취급 방침</b>에 동의합니다. (필수)"} style={{marginTop:"50px"}} />
                <Button text="회원가입 완료하기" marginTop="44px" disabled={!isOk}/>
            </JoinForm>
        </JoinContainer>
    );
};

const LoginInput = (props) => {

    const inputRef = useRef();
    const [description, setDescription] = useState(props?.description);
    const [value, setValue] = useState("");

    const validationCheck = (e) => {
        setValue(e.target.value);
        if(e.target.value) {
            //TODO id validation check
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