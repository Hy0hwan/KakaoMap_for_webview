import React, { useEffect } from 'react';

const KakaoMaps = () => {
  // URL 파라미터 파싱
  const searchParams = new URLSearchParams(window.location.search);
  const xValue = parseFloat(searchParams.get('x'));
  const yValue = parseFloat(searchParams.get('y'));

  useEffect(() => {
    // Check if kakao object exists
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAPS_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.kakao.maps.LatLng(xValue, yValue),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);

        var markerPosition = new window.kakao.maps.LatLng(xValue, yValue);
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        console.log('map : ', map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [xValue, yValue]);

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
};

export default KakaoMaps;
