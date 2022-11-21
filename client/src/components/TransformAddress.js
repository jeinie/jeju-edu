import { useEffect } from "react";

const TransformAddress = ({ lat, lon }) => {
  const { kakao } = window;

  useEffect(() => {
    const mapCenter = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 1,
    };
    let map = new kakao.maps.Map(mapCenter, mapOption);
    // 지도 생성
    let geocoder = new kakao.maps.services.Geocoder();
    // 주소-좌표 변환 객체를 생성.
    let marker = new kakao.maps.Marker();
    // 클릭한 위치를 표시할 마커 ( 내가 필요없는 기능 )
    let InfoWindow = new kakao.maps.InfoWindow({ zindex: 1 });
    // 클릭한 위치에 대한 주소를 표시할 인포윈도우( 내가 필요없는 기능 )

    // searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  }, [
    kakao.maps.InfoWindow,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.Marker,
    kakao.maps.services.Geocoder,
  ]);

  return <div id="map" style={{ height: "200px" }}></div>;
};

export default TransformAddress;
