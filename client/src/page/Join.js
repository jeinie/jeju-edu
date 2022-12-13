import { useState, useEffect, useRef } from 'react';
import {Input, Checkbox, Button, InputWithBtn} from '../components/form';
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
    const [check, setCheck] = useState(false);

    const [idDesc, setIdDesc] = useState(""); //6~20자의 영문,숫자만 입력해주세요.
    const [pwDesc, setPwDesc] = useState(""); //8~16자의 영문,숫자, 특수문자를 사용해주세요.
    const [pwConfirmDesc, setPwConfirmDesc] = useState("");

    const [idOk, setIdOk] = useState(false);
    const [pwOk, setPwOk] = useState(false);
    const [pwConfirmOk, setPwConfirmOk] = useState(false);

    const [totalOk, setTotalOk] = useState(false);

    const idMount = useRef(false);
    const pwMount = useRef(false);
    const pwConfirmMount = useRef(false);

    const totalValidCheck = () => {
        return (name !== "") && (nick !== "") && idOk && pwOk && pwConfirmOk && check
    };
    
    const idValidCheck = () => {
        if (id.length < 6) {
            setIdOk(false);
            setIdDesc("6자 이상 입력해주세요.");
        } else if (!idOk) setIdDesc("아이디 중복확인을 해주세요.");
    }

    const pwValidCheck = () => {
        setPwConfirmDesc("");
        if (password.length < 8) {
            setPwOk(false);
            setPwDesc("8자 이상 입력해주세요.");
        } else {
            setPwOk(true);
            setPwDesc("적합한 비밀번호 입니다.")
        }
    }

    const pwConfirmCheck = () => {
        if (password !== passwordConfirm) {
            setPwConfirmOk(false);
            setPwConfirmDesc("비밀번호가 일치하지 않습니다.");
        } else {
            setPwConfirmOk(true);
            setPwConfirmDesc("비밀번호가 일치합니다.");
        }
    }

    const handleConfirmId = () => {
        axios.post("/api/auth/checkDupId", {id:id}).then((res)=>{
            if( res.data?.code === 200 ) {
                setIdDesc("사용 가능한 아이디입니다.");
                setIdOk(true);
            } else {
                setIdDesc("중복된 아이디입니다.");
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
                alert("가입을 완료했습니다.")
                navigate("/login");
            } else {
                alert("저장실패")
            }
        })
    }

    useEffect(()=>{
        if (idMount.current) idValidCheck();
		else idMount.current = true;
    },[id]);
    useEffect(()=>{
        if (pwMount.current) pwValidCheck();
		else pwMount.current = true;
    },[password]);
    useEffect(()=> {
        if (pwConfirmMount.current) pwConfirmCheck();
        else pwConfirmMount.current = true;
    }, [passwordConfirm])
    useEffect(()=>setTotalOk(totalValidCheck()), [name, nick, idOk, pwOk, pwConfirmOk, check])
    
    return (
        <JoinContainer>
            <JoinForm onSubmit={handleSubmit}>
                <BsChevronLeft className='header-goback' onClick={()=>navigate(-1)}/>
                <h1 className="header-title">회원가입</h1>
                <hr/>
                <ImageContainer><img src={fir} alt="logo" /></ImageContainer>
                <Input label="이름*" name="name" placeholder="이름을 입력해주세요." style={{marginBottom:"20px"}} maxLength={10} value={name} setValue={setName}/>
                <Input label="닉네임*" name="nick" placeholder="활동명으로 사용할 닉네임을 입력해주세요." style={{marginBottom:"20px"}} maxLength={10} value={nick} setValue={setNick}/>
                <InputWithBtn label="아이디*" name="id" placeholder="아이디를 입력해주세요." desc={idDesc} style={{marginBottom:"20px"}} maxLength={20} btnTitle="중복확인" onClick={handleConfirmId} value={id} setValue={setId}/>
                <Input label="비밀번호*" name="pw" placeholder="비밀번호를 입력해주세요." password desc={pwDesc} value={password} setValue={setPassword} style={{marginBottom:"20px"}} maxLength={16}/>
                <Input label="비밀번호 확인*" placeholder="비밀번호를 다시 입력해주세요." password desc={pwConfirmDesc} value={passwordConfirm} setValue={setPasswordConfirm} style={{marginBottom:"20px"}} maxLength={16}/>
                {/*<InputWithBtn label="휴대폰인증*" placeholder="'-' 없이 입력해주세요." btnTitle="인증요청"/>*/}
                <Checkbox label={"젠프라의 <b>서비스이용약관, 개인정보 취급 방침</b>에 동의합니다. (필수)"} value={check} setValue={setCheck} style={{marginTop:"50px"}} />
                <Button text="회원가입 완료하기" marginTop="44px" disabled={!totalOk}/>
            </JoinForm>
        </JoinContainer>
    );
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