import { createContext, useState } from "react";

const InfoContext = createContext();

function InfoProvider({ children }) {
  const [info, setInfo] = useState({
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

  const [isSelect, setIsSelect] = useState(false);

  return (
    <InfoContext.Provider value={{ info, setInfo, isSelect, setIsSelect }}>
      {children}
    </InfoContext.Provider>
  );
}

export { InfoProvider };
export default InfoContext;
