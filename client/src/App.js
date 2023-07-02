// [230,0,60]

import React, { useState } from "react";
import { Map } from "react-map-gl"; //MapProvider
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { MVTLayer } from "@deck.gl/geo-layers";
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import "./App.css";
import disolvedRoad from "./National_Road_dissolve.json";
import LeftBar from "./components/LeftBar";

// import { MapboxLayer } from "@deck.gl/mapbox";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";

const MAP_STYLE = "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz";
// const MAP_STYLE = "mapbox://styles/redsilver522/clj3xdv8e00qy01r112kq5hot";

const INITIAL_VIEW_STATE = {
  longitude: 126.7064342204934,
  latitude: 36.03264929491407,
  zoom: 6.7,
  bearing: 0,
  pitch: 0,
};

function App() {
  const [LD, setLD] = useState(false);
  const [isBase, setIsBase] = useState(true);
  const [isDetail, setIsDetail] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [data1, setData1] = useState(null);
  const [length, setLength] = useState(null);
  const [info, setInfo] = useState({
    roadNo: null,
    laneOps: { name: "차로수", selected: null, checkboxes: null },
    facilOps: { name: "교통시설물", selected: null, checkboxes: null },
    speedOps: { name: "제한속도", selected: null, checkboxes: null },
    barrierOps: { name: "중앙분리대유형", selected: null, checkboxes: null },
    lightOps: { name: "신호등개수", selected: null, checkboxes: null },
    caronlyOps: {
      name: "자동차전용도로유무",
      selected: null,
      checkboxes: null,
    },
    onewayOps: { name: "일방통행유무", selected: null, checkboxes: null },
  });

  // const handleClick = (data) => {
  //   console.log(data);
  // };

  // const gjlRoad =
  //   isRoad &&
  //   NATIONALROAD_DATA &&
  //   new GeoJsonLayer({
  //     id: "nationalroad",
  //     data: NATIONALROAD_DATA,
  //     //Styles
  //     lineWidthMaxPixels: 10,
  //     getLineColor: (d) => {
  //       const lanes = d.properties.LANES;
  //       const maxLanes = 10; // Maximum number of lanes for the color gradient

  //       // Calculate the red component based on the lane value
  //       const red = Math.floor((lanes / maxLanes) * 255);

  //       return [red, 0, 0, 255]; // Use red gradient with white as the starting color
  //     },

  //     pickable: true,
  //     autoHighlight: true,
  //     getLineWidth: 500,
  //     visible: view.zoom >= 6,
  //     onClick: (d) => handleClick(d.object.properties.LANES),
  //   });

  ///////////////////////////////////////

  const layer1 = new MVTLayer({
    id: "mvt-layer1",
    data: `https://api.mapbox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    // data: `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    // data: `https://a.tiles.mapbox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    // data: `https://b.tiles.mapox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
    //Stylesb
    minZoom: 10,
    maxZoom: 22,
    lineWidthScale: 20,
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 15,

    pickable: true,
    autoHighlight: true,
    getLineColor: [255, 0, 0],
    // (d) => {
    //   const lanes = d.properties.RDLN;
    //   if (lane === lanes) {
    //     return [0, 0, 0];
    //   } else {
    //     return [230, 0, 60];
    //   }
    // },
    visible: isDetail,
    // updateTriggers: {
    //   getLineColor: lane,
    // },

    onClick: (d) => handleClick(d.object.properties),
  });

  // const layer2 = new MVTLayer({
  //   id: "mvt-layer2",
  //   data: `https://api.mapbox.com/v4/redsilver522.lds2.json?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   //Styles

  //   lineWidthScale: 20,
  //   lineWidthMinPixels: 1,
  //   lineWidthMaxPixels: 15,

  //   pickable: true,
  //   autoHighlight: true,
  //   getLineColor: (d) => {
  //     const roadNoTemp = d.properties.ROAD_NO;
  //     if (roadNoTemp == roadNo) {
  //       return [0, 0, 0, 255];
  //     } else {
  //       return [0, 0, 0, 0];
  //     }
  //   },
  //   visible: isDetail,
  //   updateTriggers: {
  //     getLineColor: roadNo,
  //   },
  //   onClick: (d) => handleClick(d.object.properties.RDLN),
  // });

  const layer3 = new GeoJsonLayer({
    id: "oneroad",
    data: disolvedRoad,
    lineWidthMaxPixels: 3,
    getLineColor: [0, 0, 0, 150],
    getLineWidth: 500,
    visible: isBase && view.zoom >= 6 && view.zoom <= 9.7,
  });

  const layer4 =
    data1 &&
    new GeoJsonLayer({
      id: "updatedData",
      data: data1,
      lineWidthMaxPixels: 8,
      lineWidthMinPixels: 4,
      getLineColor: [230, 0, 60],
      getLineWidth: 1000,
      pickable: true,
      autoHighlight: true,
      visible: isFilter && view.zoom >= 6,

      onClick: (i, e) => console.log(i, e),
    });

  const layers = [layer3, layer4, layer1];
  // console.log(
  //   `lat: ${view.latitude}, long: ${view.longitude}, zoom: ${view.zoom}, bear: ${view.bearing}, pitch: ${view.pitch}`
  // );

  const handleClick = (d) => {
    console.log(d);
  };

  ////////////////////////////////////////////////////////////
  function getTooltip({ object }) {
    return (
      object && {
        html: `
        <div>
          ${`${info.laneOps.name}: ${
            info.laneOps.selected ? info.laneOps.selected.join(", ") : "미선택"
          }`}
        </div>
        <div>
        ${`${info.facilOps.name}: ${
          info.facilOps.selected ? info.facilOps.selected.join(", ") : "미선택"
        }`}
        </div>
        <div>
        ${`${info.speedOps.name}: ${
          info.speedOps.selected ? info.speedOps.selected.join(", ") : "미선택"
        }`}
        </div>
        <div>
        ${`${info.barrierOps.name}: ${
          info.barrierOps.selected
            ? info.barrierOps.selected.join(", ")
            : "미선택"
        }`}
        </div>
        <div>
        ${`${info.lightOps.name}: ${
          info.lightOps.selected ? info.lightOps.selected.join(", ") : "미선택"
        }`}
        </div>
        <div>
        ${`${info.caronlyOps.name}: ${
          info.caronlyOps.selected
            ? info.caronlyOps.selected.join(", ")
            : "미선택"
        }`}
        </div>
        <div>
        ${`${info.onewayOps.name}: ${
          info.onewayOps.selected
            ? info.onewayOps.selected.join(", ")
            : "미선택"
        }`}
        </div>
      
      `,
      }
    );
  }
  ////////////////////////////////////////////////////////////
  return (
    <div className="testc">
      <LeftBar
        setData1={setData1}
        setLength={setLength}
        setLD={setLD}
        setIsFilter={setIsFilter}
        setInfo={setInfo}
        info={info}
      />
      <div className="container">
        <div className="toggle_button_div">
          <button className="toggle_button" onClick={() => setIsBase(!isBase)}>
            {isBase ? "Hide Base" : "Show Base"}
          </button>
          <button
            className="toggle_button"
            onClick={() => setIsDetail(!isDetail)}
          >
            {isDetail ? "Hide Detail" : "Show Detail"}
          </button>
          <button
            className="toggle_button"
            onClick={() => setView(INITIAL_VIEW_STATE)}
          >
            ф
          </button>
          <button
            className="toggle_button"
            onClick={() => setIsFilter(!isFilter)}
          >
            {isFilter ? "Hide Filter" : "Show Filter"}
          </button>
          <button className="toggle_button" onClick={() => console.log(info)}>
            STATE
          </button>
        </div>

        <div className="lengthSum">
          선택구간 연장 <span>{length ? length : 0}</span> km
        </div>

        <DeckGL
          initialViewState={view}
          onViewStateChange={({ viewState }) => setView(viewState)}
          controller={true}
          layers={layers}
          getTooltip={getTooltip}
        >
          <Map mapStyle={MAP_STYLE} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div>

      {LD && (
        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
