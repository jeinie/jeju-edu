import { useRef, useState } from "react";
import styled from "styled-components";

const Input = (props) => {
    const inputRef = useRef();
    return (
        <InputContainer style={props?.style}>
            <label>{props?.label}</label>
            <input type={props.password ? "password":"text"} name={props?.name} placeholder={props?.placeholder} ref={inputRef} maxLength={props.maxLength} />
            <p>{props?.description}</p>
        </InputContainer>
    );
};

const InputWithBtn = (props) => {
    const inputRef = useRef();
    const [value, setValue] = useState("");

    return (
        <InputWithBtnContainer style={props?.style}>
            <label>{props?.label}</label>
            <div>
                <input name={props?.name} className="input" placeholder={props?.placeholder} ref={inputRef} onChange={(e)=>setValue(e.target.value)}/>
                <input type="button" className="btn-sm" onClick={()=>props.onClick(value)} value={props.btnTitle} />
            </div>
            <p>{props?.description}</p>
        </InputWithBtnContainer>
    );
};

const Checkbox = (props) => {
    return (
        <CheckboxContainer style={props.style}>
            <CustomCheckbox>
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
            </CustomCheckbox>
            <label dangerouslySetInnerHTML={{__html:props?.label}} />
        </CheckboxContainer>
    );
};

const Button = (props) => {
    return (
        <CustomButton marginTop={props.marginTop}>{props?.text}</CustomButton>
    );
};

const InputWithBtnContainer = styled.div`
    
    div {
        display: flex;
        flex-direction: row;
        margin-top:7px;
        height: 42px;
    }

    label {
        margin-left:11px;
        margin-bottom:10px;
        /* font-weight:bold; */
    }

    .input {
        padding-left:11px;
        border-radius: 21px;
        border: none;
        flex:1;
        margin-right: 5px;
    }

    .btn-sm {
        border-radius: 21px;
        width: 80px;
        float:right;
        background:black;
        color:white;
        border: none;
    }

    p {
        padding-left:11px;
        color:#8E8E8E;
        font-size:12px;
        margin-top:9px;
    }
`

const InputContainer = styled.div`
    label {
        margin-left:11px;
        margin-bottom:10px;
        /* font-weight:bold; */
    }
    input {
        padding-left:11px;
        margin-top:7px;
        width: 100%;
        height: 42px;
        border-radius: 21px;
        border: none;
    }
    p {
        padding-left:11px;
        color:#8E8E8E;
        font-size:12px;
        margin-top:9px;
    }  
`;

const CheckboxContainer = styled.div`
    display:flex;
    label {
        margin-left:20px;
    }
`;

const CustomButton = styled.button`
    width: 100%;
    height: 36px;
    border-radius: 25px;
    border: 1px solid #e47b00;
    color: #e47b00;
    margin-top: ${props=> `${props.marginTop}`};
`;

const CustomCheckbox = styled.div`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        width: 30px;
        background-color: white;
        border-radius:50%;
    }

    /* When the checkbox is checked, add a blue background */
        input:checked ~ .checkmark {
        background-color: #2196F3;
    }
      
    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
      
    /* Show the checkmark when checked */
    input:checked ~ .checkmark:after {
        display: block;
    }
      
    /* Style the checkmark/indicator */
    .checkmark:after {
        left: 12px;
        top: 5px;
        width: 5px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`


export {Input, InputWithBtn, Checkbox, Button, InputWithBtnContainer};