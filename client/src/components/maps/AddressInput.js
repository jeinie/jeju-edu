import { useRef, useState } from "react";
import styled from "styled-components";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
import axios from "axios";
import Modal2 from "../modals/Modal2";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMyLocation } from "react-icons/md";

const AddressInput = ({ update }) => {
  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    axios
      .post(`/api/getStudyList`, { area: "성산읍" })
      .then((data) => update(data.data));
  };

  const handleAddress = () => {
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      `${location.current.value}`,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setUserAddress(location);
          console.log(coords);
        } else {
          console.log("err");
        }
      }
    );
  };

  return (
    <TestBox>
      <div className="par_box">
        <input placeholder="00동 00구" className="inputBox" ref={location} />
        <AiOutlineSearch
          color="white"
          style={{ fontSize: "24px" }}
          onClick={() => handleAddress()}
        />
      </div>
      <div className="btnContainer">
        <p className="myLocation" onClick={handleClick}>
          {/* 위도경도를 주소로 변환하는 함수 적용 */}
          {/* <MyLocationIcon className="myLocation" /> */}
          <MdMyLocation className="myLocation locationIcon" />
          현재 위치로 설정
        </p>
        {popup && <Modal2 open={popup} setOpen={setPopup} />}
      </div>
    </TestBox>
  );
};

export default AddressInput;

const TestBox = styled.div`
  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
  }
  .alarm {
    color: red;
  }

  .par_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 0 21px 12px 21px;
    height: 36px;
    border-radius: 25px;
    background: black;
  }
  .inputBox {
    border-radius: 25px;
    border: none;
    background: black;
    color: white;
    font-weight: bolder;
  }
  .myLocation {
    margin-right: 10px;
  }

  .locationIcon {
    font-size: 25px;
  }
`;
