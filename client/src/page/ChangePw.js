import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Input, Button } from '../components/form';
import styled from 'styled-components';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
/**
 * 2022-12-18 hssuh
 * 패스워드 변경
 */
export default function ChangePw() {
    const navigate = useNavigate();

    const id = useSelector((state) => state.user.id);
    
    const [pw, setPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPwConfirm, setNewPwConfirm] = useState("");

    const pwRef = useRef(false);
    const newPwRef = useRef(false);
    const newPwConfirmRef = useRef(false);

    const [pwDesc, setPwDesc] = useState({}); 
    const [newPwDesc, setNewPwDesc] = useState({type:"DEFAULT", text:"8~16자의 영문,숫자, 특수문자를 사용해주세요."});
    const [newPwConfirmDesc, setNewPwConfirmDesc] = useState({});

    const [pwOk, setPwOk] = useState(false);
    const [newPwOk, setNewPwOk] = useState(false);
    const [newPwConfirmOk, setNewPwConfirmOk] = useState(false);

    const [totalOk, setTotalOk] = useState(false);

    const pwValidCheck = () => {
        if (pw.length < 8) {
            setPwOk(false);
            setPwDesc({type:"WARN", text:"8자 이상 입력해주세요."});
        } else {
            setPwOk(true);
            setPwDesc({});
        }
    }

    const newPwValidCheck = () => {
        if (newPw.length < 8) {
            setNewPwOk(false);
            setNewPwDesc({type:"WARN", text:"8자 이상 입력해주세요."});
        } else {
            setNewPwOk(true);
            setNewPwDesc({type:"SUCCESS", text:"적합한 비밀번호 입니다."});
        }
    }

    const newPwConfirmValidCheck = () => {
        if (newPw !== newPwConfirm) {
            setNewPwConfirmOk(false);
            setNewPwConfirmDesc({type:"WARN", text:"비밀번호가 일치하지 않습니다."});
        } else {
            setNewPwConfirmOk(true);
            setNewPwConfirmDesc({type:"SUCCESS", text:"비밀번호가 일치합니다."});
        }
    }

    const totalValidCheck = () => {
        return pwOk && newPwOk && newPwConfirmOk;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            id:id,
            pw:e.target.pw.value,
            newPw:e.target.newPw.value
        };

        axios.post(`/api/auth/message/modifyPW`, body)
        .then((response) => {
            if (response.data.code === 200) {
                alert("변경완료")
                navigate("/login");
            } else if (response.data.code === 202){
                setPwOk(false);
                setPwDesc({type:"WARN", text:"현재 비밀번호가 아니에요"})
            } else {
                alert("변경실패 : 서버오류")
            }
        })
    };

    useEffect(()=>{
        if (pwRef.current) pwValidCheck();
		else pwRef.current = true;
    }, [pw]);

    useEffect(()=>{
        if (newPwRef.current) newPwValidCheck();
		else newPwRef.current = true;
    }, [newPw]);

    useEffect(()=>{
        if (newPwConfirmRef.current) newPwConfirmValidCheck();
        else newPwConfirmRef.current = true;
    }, [newPwConfirm]);

    useEffect(()=>setTotalOk(totalValidCheck()), [pw, newPw, newPwConfirm, pwOk, newPwOk, newPwConfirmOk,]);

    return (
        <ChangePwContainer>
            <ChangePwForm onSubmit={handleSubmit}>
                <BsChevronLeft className='header-goback' onClick={()=>navigate(-1)}/>
                <h1 className="header-title">비밀번호변경</h1>
                <hr/>
                <Input label="현재 비밀번호*" name="pw" placeholder="현재 사용하고 있는 비밀번호를 입력해주세요" value={pw} setValue={setPw} desc={pwDesc} style={{marginBottom:"20px", marginTop:"52px"}} maxLength={16} password/>
                <Input label="변경하실 비밀번호*" name="newPw" placeholder="변경하실 비밀번호를 입력해주세요" value={newPw} setValue={setNewPw} desc={newPwDesc} style={{marginBottom:"20px"}} maxLength={16} password/>
                <Input label="변경하실 비밀번호 확인*" name="newPwConfirm" placeholder="변경하실 비밀번호를 입력해주세요" value={newPwConfirm} setValue={setNewPwConfirm} desc={newPwConfirmDesc} style={{marginBottom:"20px"}} maxLength={16} password/>
                <Button text="비밀번호 변경완료" style={{position:"absolute", bottom:"20px"}} disabled={!totalOk}/>
            </ChangePwForm>
        </ChangePwContainer>
    );
}

const ChangePwForm = styled.form`
    height:90vh;
    margin:32px 32px;
    position:relative;
    .header-goback {
        float:left;
        color:#727272;
    }
    .header-title {
        text-align:center;
    }
`

const ChangePwContainer = styled.div`
    position: absolute;
    background: #f4ede7;
    background-size: cover;
`
