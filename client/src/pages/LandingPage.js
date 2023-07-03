// [230,0,60]

import React, { useState } from "react";
import { Map } from "react-map-gl"; //MapProvider
import DeckGL, { GeoJsonLayer } from "deck.gl";
// import { MVTLayer } from "@deck.gl/geo-layers";
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import "./LandingPage.css";
import dissolvedRoad from "../National_Road_dissolve.json";
import intPoint from "../National_Road_Interchange_Final_geojson.json";
// import cityDissolved from "./city_dissolved.json";
import LeftBar from "../components/LeftBar";
import useTooltip from "../hooks/use-tooltip";
import { GiExpand } from "react-icons/gi";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";

const MAP_STYLE = "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz";
// const MAP_STYLE = "mapbox://styles/redsilver522/clj3xdv8e00qy01r112kq5hot";

const INITIAL_VIEW_STATE = {
  longitude: 127.25161672437677,
  latitude: 35.86497806027222,
  zoom: 6.620000000000002,
  bearing: 0,
  pitch: 0,
};

function LandingPage() {
  const [LD, setLD] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [data1, setData1] = useState(null);
  const [length, setLength] = useState(null);
  const { getTooltip } = useTooltip();

  ///////////////////////////////////////
  // const layer1 = new MVTLayer({
  //   id: "mvt-layer1",
  //   data: `https://api.mapbox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   // data: `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   // data: `https://a.tiles.mapbox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   // data: `https://b.tiles.mapox.com/v4/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
  //   //Stylesb
  //   minZoom: 10,
  //   maxZoom: 22,
  //   lineWidthScale: 20,
  //   lineWidthMinPixels: 1,
  //   lineWidthMaxPixels: 15,
  //   pickable: true,
  //   autoHighlight: true,
  //   getLineColor: [255, 0, 0],
  //   // (d) => {
  //   //   const lanes = d.properties.RDLN;
  //   //   if (lane === lanes) {
  //   //     return [0, 0, 0];
  //   //   } else {
  //   //     return [230, 0, 60];
  //   //   }
  //   // },
  //   visible: isDetail,
  //   // updateTriggers: {
  //   //   getLineColor: lane,
  //   // },
  //   onClick: (d) => handleClick(d.object.properties),
  // });

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

  const layer1 = new GeoJsonLayer({
    id: "oneroad",
    data: dissolvedRoad,
    lineWidthMaxPixels: 3,
    getLineColor: [0, 0, 0, 150],
    getLineWidth: 500,
    // visible: isBase && view.zoom >= 6 && view.zoom <= 9.7,
    visible: view.zoom >= 6,
  });

  const layer2 =
    data1 &&
    new GeoJsonLayer({
      id: "updatedData",
      data: data1,
      lineWidthMaxPixels: 5,
      lineWidthMinPixels: 4,
      getLineColor: [230, 0, 60],
      getLineWidth: 1000,
      pickable: true,
      autoHighlight: true,
      visible: isFilter && view.zoom >= 6,

      //   onClick: (i, e) => console.log(i, e),
    });

  const layer3 = new GeoJsonLayer({
    id: "int",
    data: intPoint,
    // pickable: true,
    stroked: true,
    filled: true,
    pointType: "circle",
    lineWidthScale: 20,
    // lineWidthMinPixels: 0,
    lineWidthMaxPixels: 2,
    pointRadiusMaxPixels: 7,
    getFillColor: [229, 252, 246],
    getLineColor: [230, 0, 60],
    getPointRadius: 100,
    // getLineWidth: 1,
    visible: view.zoom >= 9.7,
  });

  // const layer3 = new GeoJsonLayer({
  //   id: "city",
  //   data: cityDissolved,
  //   getFillColor: [229, 252, 246, 255],
  //   // visible: isBase && view.zoom >= 6 && view.zoom <= 9.7,
  //   visible: view.zoom >= 6,
  // });

  const layers = [layer1, layer2, layer3];

  return (
    <div className="testc">
      <LeftBar
        setData1={setData1}
        setLength={setLength}
        setLD={setLD}
        setIsFilter={setIsFilter}
      />
      <div className="container">
        <div className="toggle_button_div">
          <button
            className="toggle_button"
            onClick={() =>
              setView((prev) => {
                return {
                  ...prev,
                  zoom: prev.zoom < 20 ? prev.zoom + 1 : prev.zoom,
                };
              })
            }
          >
            +
          </button>
          <button
            className="toggle_button"
            onClick={() =>
              setView((prev) => ({
                ...prev,
                zoom: prev.zoom > 0.87 ? prev.zoom - 1 : prev.zoom,
              }))
            }
          >
            -
          </button>
          <button
            className="toggle_button"
            onClick={() => setView(INITIAL_VIEW_STATE)}
          >
            <GiExpand />
          </button>
          <button
            className="toggle_button"
            onClick={() => setIsFilter(!isFilter)}
            // onClick={() => console.log(view)}
          >
            F
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

export default LandingPage;
