import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import "./Accordion.css";

function Accordion({ items, setState }) {
  const [expandedIndex, setExpandedIndex] = useState([]);

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex.includes(nextIndex)) {
        if (items[nextIndex].id === "국도번호별") {
          setState((prev) => ({ ...prev, roadNo: null }));
        }
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
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
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
