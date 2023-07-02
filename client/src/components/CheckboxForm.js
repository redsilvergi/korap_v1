import "./CheckboxForm.css";
import React, { useCallback, useEffect, useState, useRef } from "react";

const CheckboxForm = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;

  const [checkboxes, setCheckboxes] = useState(() => {
    const initialCheckboxes = {};
    for (let i = 1; i <= list.length; i++) {
      initialCheckboxes[`checkbox${i}`] = false;
    }
    return initialCheckboxes;
  });

  const updateF = useCallback(() => {
    // obj.updateF(Object.values(checkboxes));
    // console.log("THIS", Object.values(checkboxes), checkboxes);

    const sortedItems = Object.values(checkboxes).reduce((acc, val, i) => {
      if (val) {
        acc.push([...list][i]);
      }
      return acc;
    }, []);

    const infoObj = {
      name: obj.name.slice(0, -1),
      selected: sortedItems,
      checkboxes: Object.values(checkboxes),
    };
    // const combinedData = Object.values(checkboxes).map((value, index) => ({
    //   value,
    //   item: [...list][index],
    // }));
    obj.updateInfo(infoObj);
    console.log("infoObj", infoObj);
  }, [checkboxes, obj, list]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    updateF();
  }, [updateF]);

  return (
    <form>
      {[...list].map((item, index) => (
        <label key={`checkbox${index + 1}`}>
          <input
            type="checkbox"
            name={`checkbox${index + 1}`}
            checked={checkboxes[`checkbox${index + 1}`]}
            onChange={handleCheckboxChange}
          />
          <p>{item}</p>
        </label>
      ))}
    </form>
  );
};

export default CheckboxForm;

// import React, { useEffect, useState, useCallback } from "react";

// const CheckboxForm = ({ name, checklist }) => {
//   const obj = checklist.filter((item) => item.name === name)[0];
//   const list = obj.options;
//   const { updateF } = obj;

//   const [checkboxes, setCheckboxes] = useState(() => {
//     const initialCheckboxes = {};
//     for (let i = 1; i <= list.length; i++) {
//       initialCheckboxes[`checkbox${i}`] = false;
//     }
//     return initialCheckboxes;
//   });

//   const handleCheckboxChange = useCallback((event) => {
//     const { name, checked } = event.target;
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [name]: checked,
//     }));
//   }, []);

//   useEffect(() => {
//     console.log("checks log:", Object.values(checkboxes));
//     updateF(Object.values(checkboxes));
//   }, [checkboxes, updateF]);

//   return (
//     <form>
//       {[...list].map((item, index) => (
//         <label key={`checkbox${index + 1}`}>
//           <input
//             type="checkbox"
//             name={`checkbox${index + 1}`}
//             checked={checkboxes[`checkbox${index + 1}`]}
//             onChange={handleCheckboxChange}
//           />
//           <p>{item}</p>
//         </label>
//       ))}
//     </form>
//   );
// };

// export default CheckboxForm;
