import axios from "axios";
import React, { useRef, useState } from "react";

export default function Address() {
  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();

  const handleAddress = () => {
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      `${location.current.value}`,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setUserAddress(location);
          console.log(coords);
          alert(`${location} 가 맞나요?`);
        } else {
          alert("주소를 확인해 주세요 !");
          console.log("err");
        }
      }
    );
  };

  return (
    <div>
      <input ref={location} />
      <button onClick={() => handleAddress()}>check</button>
    </div>
  );
}
