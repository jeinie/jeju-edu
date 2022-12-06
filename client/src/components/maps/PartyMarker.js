import React, { useEffect } from "react";
import styled from "styled-components";

// 개설된 스터디 상세페이지에서 사용될 지도 와 마커
export default function PartyMarker({ lat, lon }) {
  const { kakao } = window;

  useEffect(() => {
    setTimeout(() => {
      const markerPosition = new kakao.maps.LatLng(lat, lon);
      // 마커(스터디장소)를 찍기 위한 변수
      const container = document.getElementById("map");
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // const displayMarker = (localPosition, message) => {
      //   const marker = new kakao.maps.Marker({
      //     map: map,
      //     position: localPosition,
      //     image: markerImage,
      //   });

      //   let markerMessage = message;
      //   let markerRemoveAble = true;

      //   const infoWindow = new kakao.maps.InfoWindow({
      //     content: markerMessage,
      //     removable: markerRemoveAble,
      //   });

      //   infoWindow.open(map, marker);
      //   map.setCenter(localPosition);
      // };

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      const options = {
        center: new kakao.maps.LatLng(lat, lon),
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
  ]);

  return (
    <MapContainer>
      <div className="map">
        <div className="MapContainer" id="map"></div>
      </div>
    </MapContainer>
  );
}

const MapContainer = styled.section`
  .map {
    height: 150px;
  }

  #map {
    height: 150px;
  }
`;
