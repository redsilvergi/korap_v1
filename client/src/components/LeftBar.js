import "./LeftBar.css";
import React, { useEffect, useState } from "react";
// import Slider from "react-rangeslider";
// import "react-rangeslider/lib/index.css";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Accordion from "./Accordion";
import CheckboxForm from "./CheckboxForm";

const LeftBar = ({
  setData1,
  setLength,
  setLD,
  setIsFilter,
  setInfo,
  info,
}) => {
  const [state, setState] = useState({
    roadNo: null,
  });

  const handleCondition = async () => {
    setLD(true);
    const response = await axios.get(
      `http://localhost:4000/conditions/${state.roadNo}/${info.laneOps.checkboxes}/${info.facilOps.checkboxes}/${info.speedOps.checkboxes}/${info.barrierOps.checkboxes}/${info.lightOps.checkboxes}/${info.caronlyOps.checkboxes}/${info.onewayOps.checkboxes}`
    );
    setData1(response.data.mergedGJ);
    setLD(false);
    setIsFilter(true);
    setLength(response.data.lengthSum);
    console.log(response.data);
  };
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  const allowedValues = [
    1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47,
    48, 56, 58, 59, 60, 67, 75, 77, 79, 82, 87, 88,
  ];

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  const options = allowedValues.map((item) => {
    return { value: item, label: `국도 ${item}호선` };
  });

  useEffect(() => {
    console.log("state:", state);
  }, [state]);

  const handleRoad = (options) => {
    if (options.length > 0) {
      const tempOpts = options.map((item) => {
        return item.value;
      });
      setState((prev) => ({ ...prev, roadNo: tempOpts }));
    } else {
      setState((prev) => ({ ...prev, roadNo: null }));
    }
  };

  const checklist = [
    // {
    //   name: "도로폭별",
    //   options: ["4m 이하", "4-8m ", "8-12m", "12m 초과"],
    //   updateF: (checked) => setState((prev) => ({ ...prev, width: checked })),
    // },
    {
      name: "차로수별",
      options: ["1차선", "2차선", "4차선", "5-8차선", "9차선 이상"],
      // updateF: (checked) => setState((prev) => ({ ...prev, laneOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, laneOps: obj })),
    },
    {
      name: "교통시설물별",
      options: ["일반도로", "교량", "터널", "고가도로", "지하도로"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, facilOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, facilOps: obj })),
    },
    {
      name: "제한속도별",
      options: ["20", "30", "40", "50", "60", "70", "80", "90이상", "결측"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, speedOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, speedOps: obj })),
    },
    {
      name: "중앙분리대유형별",
      options: ["없음", "벽", "봉", "화단", "안전지대", "금속", "기타"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, barrierOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, barrierOps: obj })),
    },
    {
      name: "신호등개수별",
      options: ["0", "1", "2", "3", "4", "결측"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, lightOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, lightOps: obj })),
    },
    {
      name: "자동차전용도로유무별",
      options: ["비해당", "해당", "결측"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, caronlyOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, caronlyOps: obj })),
    },
    {
      name: "일방통행유무별",
      options: ["비해당", "해당"],
      // updateF: (checked) =>
      //   setState((prev) => ({ ...prev, onewayOps: checked })),
      updateInfo: (obj) => setInfo((prev) => ({ ...prev, onewayOps: obj })),
    },
  ];

  const roadStatusItems = [
    {
      id: "국도번호별",
      label: "- 국도번호별",
      content: (
        <div className="roadNo">
          <Select
            options={options}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            isMulti
            onChange={handleRoad}
          />
        </div>
      ),
    },
    // {
    //   id: "도로폭별",
    //   label: "- 도로폭별",
    //   content: (
    //     <div className="width roadItem">
    //       <CheckboxForm name={"도로폭별"} checklist={checklist} />
    //     </div>
    //   ),
    // },
    {
      id: "차로수별",
      label: "- 차로수별",
      content: (
        <div className="lane roadItem">
          <CheckboxForm name={"차로수별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "교통시설물별",
      label: "- 교통 시설물별",
      content: (
        <div className="facil roadItem">
          <CheckboxForm name={"교통시설물별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "제한속도별",
      label: "- 제한속도별",
      content: (
        <div className="speed roadItem">
          <CheckboxForm name={"제한속도별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "중앙분리대유형별",
      label: "- 중앙분리대 유형별",
      content: (
        <div className="barrier roadItem">
          <CheckboxForm name={"중앙분리대유형별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "신호등개수별",
      label: "- 신호등개수별",
      content: (
        <div className="light roadItem">
          <CheckboxForm name={"신호등개수별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "자동차전용도로유무별",
      label: "- 자동차전용도로 유무별",
      content: (
        <div className="caronly roadItem">
          <CheckboxForm name={"자동차전용도로유무별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "일방통행유무별",
      label: "- 일방통행 유무별",
      content: (
        <div className="oneway roadItem">
          <CheckboxForm name={"일방통행유무별"} checklist={checklist} />
        </div>
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////
  const items = [
    {
      id: "도로현황",
      label: "도로현황",
      content: <Accordion items={roadStatusItems} setState={setState} />,
    },
    {
      id: "TMS",
      label: "통행량(TMS)",
      content: <div className="prep">- 준비중</div>,
    },
    {
      id: "TAAS",
      label: "교통사고(TAAS)",
      content: <div className="prep">- 준비중</div>,
    },
  ];
  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="left_column">
        <p>일반국도현황</p>
        <button onClick={handleCondition}>S</button>
      </div>
      <div className="detail_div">
        <div className="accordion_div">
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
