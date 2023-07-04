import "./LeftBar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Accordion from "./Accordion";
import CheckboxForm from "./CheckboxForm";
import useInfo from "../hooks/use-info";
import { FiSearch } from "react-icons/fi";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import Modal from "./Modal";
import guide from "../img/guide.PNG";

const LeftBar = ({ setData1, setLength, setLD, setIsFilter }) => {
  const { info, setInfo, isSelect, setIsSelect } = useInfo();
  //Modal/////////////////////////////////////////////////////////////
  const [showModal, setShowModal] = useState(false);

  const handleModOpen = () => {
    setShowModal(true);
  };

  const handleModClose = () => {
    setShowModal(false);
  };

  const modal = (
    <Modal onClose={handleModClose}>
      <img src={guide} alt="guide1" width="160%" />
    </Modal>
  );

  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    !isSelect &&
      setInfo((prev) => ({
        ...prev,
        roadNo: { ...prev.roadNo, selected: null },
      }));
  }, [isSelect, setInfo]);

  const handleCondition = async () => {
    setLD(true);
    const response = await axios.get(
      `http://13.208.248.233:4000/conditions/${info.roadNo.selected}/${info.laneOps.checkboxes}/${info.facilOps.checkboxes}/${info.speedOps.checkboxes}/${info.barrierOps.checkboxes}/${info.lightOps.checkboxes}/${info.caronlyOps.checkboxes}/${info.onewayOps.checkboxes}`
    );
    setData1(response.data.mergedGJ);
    setLD(false);
    setIsFilter(true);
    setLength(response.data.lengthSum);
    // console.log(response.data);
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

  // useEffect(() => {
  //   console.log("info:", info);
  // }, [info]);

  const handleRoad = (options) => {
    if (options.length > 0) {
      const tempOpts = options.map((item) => {
        return item.value;
      });
      // console.log("tempOpts:", tempOpts);
      setInfo((prev) => ({
        ...prev,
        roadNo: { name: "국도번호", selected: tempOpts },
      }));
    } else {
      setInfo((prev) => ({
        ...prev,
        roadNo: { name: "국도번호", selected: null },
      }));
    }
  };

  const checklist = [
    {
      name: "차로수별",
      options: ["1차선", "2차선", "4차선", "5-8차선", "9차선 이상"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          laneOps: { ...prev.laneOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "교통시설물별",
      options: ["일반도로", "교량", "터널", "고가도로", "지하도로"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          facilOps: { ...prev.facilOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "제한속도별",
      options: ["20", "30", "40", "50", "60", "70", "80", "90이상", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          speedOps: { ...prev.speedOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "중앙분리대유형별",
      options: ["없음", "벽", "봉", "화단", "안전지대", "금속", "기타"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          barrierOps: { ...prev.barrierOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "신호등개수별",
      options: ["0", "1", "2", "3", "4", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          lightOps: { ...prev.lightOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "자동차전용도로유무별",
      options: ["비해당", "해당", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          caronlyOps: { ...prev.caronlyOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "일방통행유무별",
      options: ["비해당", "해당"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          onewayOps: { ...prev.onewayOps, selected: sel, checkboxes: chb },
        })),
    },
  ];

  const roadStatusItems = [
    {
      id: "국도번호별",
      label: "- 국도번호별",
      content: (
        <div className="roadNo" onClick={() => setIsSelect(!isSelect)}>
          {/* <Select
            options={options}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            isMulti
            onChange={handleRoad}
          /> */}
          <div>선택</div>
          {isSelect ? <GoTriangleLeft /> : <GoTriangleRight />}
        </div>
      ),
    },
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
      content: <Accordion items={roadStatusItems} />,
    },
    {
      id: "TMS",
      label: "교통량(TMS)",
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
        <a href="./">
          <p>일반국도현황</p>
        </a>
      </div>
      <div className="detail_div">
        <div className="accordion_div">
          <Accordion items={items} />
        </div>
        <div className="footnote">
          <div>
            <div className="fnt">도로정보 출처</div>
            2021, 수치지형도(도로중심선데이터), 국토지리원
          </div>
          <div>
            <div className="fnt">속성정보 출처</div>
            2019, 국가교통망 GIS 데이터, 국토부/KOTI
          </div>
          <br />
          <div>*시차로 인한 속성정보 누락구간에 유의·활용 바랍니다.</div>
          <div onClick={handleModOpen} className="guide">
            설명서
          </div>
          {showModal && modal}
        </div>
      </div>
      {isSelect && (
        <div className="selectRoad">
          <Select
            options={options}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            isMulti
            onChange={handleRoad}
          />
        </div>
      )}
      <div className="searchB" onClick={handleCondition}>
        <FiSearch />
        필터적용
      </div>
    </div>
  );
};

export default LeftBar;
