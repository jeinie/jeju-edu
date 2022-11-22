import React, { useEffect } from "react";

// 개설된 스터디 상세페이지에서 사용될 지도 와 마커
export default function PartyMarker({ lat, lon }) {
  const { kakao } = window;
  const markerPosition = new kakao.maps.LatLng(lat, lon);
  // 마커(스터디장소)를 찍기 위한 변수

  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById("map");
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const displayMarker = (localPosition, message) => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: localPosition,
          image: markerImage,
        });

        let markerMessage = message;
        let markerRemoveAble = true;

        const infoWindow = new kakao.maps.InfoWindow({
          content: markerMessage,
          removable: markerRemoveAble,
        });

        infoWindow.open(map, marker);
        map.setCenter(localPosition);
      };
      // if (navigator.geolocation) {
      //   const handlePosition = (position) => {
      //     let lat = position.coords.latitude;
      //     let lon = position.coords.longitude;

      //     let locPosition = new kakao.maps.LatLng(lat, lon);
      //     let message = '<div style="padding:5px;">현위치</div>';

      //     displayMarker(locPosition, message);
      //   };

      //   const handlePositionError = (err) => {
      //     console.log(err);
      //   };
      //   navigator.geolocation.getCurrentPosition(
      //     handlePosition,
      //     handlePositionError,
      //     { timeout: 10000 }
      //   );
      // } else {
      //   var locPosition = new kakao.maps.LatLng(33.499655, 126.531362),
      //     message = "현재 위치를 알 수 없어 기본 위치로 이동합니다.";
      //   console.log("err");
      //   displayMarker(locPosition, message);
      // }

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      const options = {
        center: new kakao.maps.LatLng(lat, lon), // lat,lon 으로 변경할것.
        level: 5,
      };
      const map = new kakao.maps.Map(container, options);
      marker.setMap(map);
    }, 1500);
  }, [
    kakao.maps.InfoWindow,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.Marker,
    kakao.maps.MarkerImage,
    kakao.maps.Size,
    lat,
    lon,
    markerPosition,
  ]);

  return (
    <div>
      <div className="Map" style={{ height: "150px" }}>
        <div
          className="MapContainer"
          id="map"
          style={{ height: "150px" }}
        ></div>
        {/* <SearchBox>
          <div className="test-box"></div>
        </SearchBox> */}
      </div>
    </div>
  );
}

// const SearchBox = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;

//   .test-box {
//     background-color: black;
//     width: 100px;
//     height: 50px;
//     position: absolute;
//     z-index: 99;
//   }
// `;
