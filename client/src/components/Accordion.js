import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import "./Accordion.css";
import useInfo from "../hooks/use-info";

function Accordion({ items }) {
  const { setInfo, setIsSelect } = useInfo();
  const [expandedIndex, setExpandedIndex] = useState([]);

  const reset = () => {
    setInfo({
      roadNo: { name: "국도번호", selected: null },
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
    setIsSelect(false);
  };
  const updateInfoState = (nextIndex) => {
    switch (items[nextIndex].id) {
      case "도로현황":
        reset();
        break;
      case "국도번호별":
        setIsSelect(false);
        break;
      case "차로수별":
        setInfo((prev) => ({
          ...prev,
          laneOps: { ...prev.laneOps, selected: null, checkboxes: null },
        }));
        break;
      case "교통시설물별":
        setInfo((prev) => ({
          ...prev,
          facilOps: { ...prev.facilOps, selected: null, checkboxes: null },
        }));
        break;
      case "제한속도별":
        setInfo((prev) => ({
          ...prev,
          speedOps: { ...prev.speedOps, selected: null, checkboxes: null },
        }));
        break;
      case "중앙분리대유형별":
        setInfo((prev) => ({
          ...prev,
          barrierOps: { ...prev.barrierOps, selected: null, checkboxes: null },
        }));
        break;
      case "신호등개수별":
        setInfo((prev) => ({
          ...prev,
          lightOps: { ...prev.lightOps, selected: null, checkboxes: null },
        }));
        break;
      case "자동차전용도로유무별":
        setInfo((prev) => ({
          ...prev,
          caronlyOps: { ...prev.caronlyOps, selected: null, checkboxes: null },
        }));
        break;
      case "일방통행유무별":
        setInfo((prev) => ({
          ...prev,
          onewayOps: { ...prev.onewayOps, selected: null, checkboxes: null },
        }));
        break;
      default:
        break;
    }
  };

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        updateInfoState(nextIndex);
        return currentExpandedIndex.filter((item) => item !== nextIndex);
      } else {
        return [...currentExpandedIndex, nextIndex];
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex.includes(index);

    const icon = (
      <span className="icon">
        {isExpanded ? <GoTriangleUp /> : <GoTriangleDown />}
      </span>
    );

    return (
      <div key={item.id} className={`${item.id + "_accitem"}`}>
        <div
          className={`d1 ${item.id + "_d1"}`}
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {isExpanded && (
          <div className={`expanded ${item.id + "_exp"}`}>{item.content}</div>
        )}
      </div>
    );
  });

  return <div className={`accordion`}>{renderedItems}</div>;
}

export default Accordion;
