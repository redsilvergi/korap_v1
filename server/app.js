const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
// const axios = require("axios");
const turf = require("@turf/turf");
// const { S3 } = require("@aws-sdk/client-s3");
const path = require("path");

app.use(cors());
app.use(express.json());

// const s3 = new S3({
//   region: "ap-northeast-2",
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "+r3c/daDyekbkxRmhD0",
//   },
// });
// const params = {
//   Bucket: "",
//   Key: "",
// };

// app.get("/lanes/:laneNumber", (req, res) => {
//   const laneNumber = req.params.laneNumber;

//   fs.readFile(`${__dirname}/datafolder/data.json`, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error reading JSON file");
//     }

//     try {
//       const jsonData = JSON.parse(data);

//       // Filter the features based on properties.RVWD <= 10
//       const filteredFeatures = jsonData.features.filter(
//         (feature) => feature.properties.RDLN === parseFloat(laneNumber)
//       );

//       const features = filteredFeatures.flatMap((feature) =>
//         feature.geometry.coordinates.flatMap((line) => turf.lineString(line))
//       );
//       const collection = turf.featureCollection(features);
//       const mergedGJ = turf.combine(collection);

//       res.send(mergedGJ);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error parsing JSON data");
//     }

//     console.log("lane GeoJsonData transferred");
//   });
// });

// app.get("/proxy-tiles", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://studio.mapbox.com/tilesets/redsilver522.3nx27h6v/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,
//       {
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/x-protobuf",
//         },
//       }
//     );
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving tiles");
//   }
// });

// app.get("/road:roadNo", (req, res) => {
//   const roadNo = req.params.roadNo;
//   fs.readFile(`${__dirname}/datafolder/data.json`, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error reading JSON file");
//     }

//     try {
//       const jsonData = JSON.parse(data);
//       // Filter the features based on properties.RVWD <= 10
//       const filteredFeatures = jsonData.features.filter((feature) =>
//         feature.properties.RDNU.includes(roadNo)
//       );

//       const features = filteredFeatures.flatMap((feature) =>
//         feature.geometry.coordinates.flatMap((line) => turf.lineString(line))
//       );
//       const collection = turf.featureCollection(features);
//       const mergedGJ = turf.combine(collection);

//       res.send(mergedGJ);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error parsing JSON data");
//     }

//     console.log("road fetched");
//   });
// });

// app.get("/conditions/:roadNo/:widthOps/:laneOps/:facilOps", (req, res) => {
//   const roadNo =
//     req.params.roadNo === "null"
//       ? null
//       : req.params.roadNo.split(",").map(Number);
//   const widthOps =
//     req.params.widthOps === "null" ? null : req.params.widthOps.split(",");
//   const laneOps =
//     req.params.laneOps === "null" ? null : req.params.laneOps.split(",");
//   const facilOps =
//     req.params.facilOps === "null" ? null : req.params.facilOps.split(",");

//   console.log("roadNo:", roadNo);
//   console.log("widthOps: ", widthOps);
//   console.log("laneOps:", laneOps);
//   console.log("facilOps:", facilOps);

//   fs.readFile(`${__dirname}/datafolder/data.json`, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error reading JSON file");
//     }

//     try {
//       const jsonData = JSON.parse(data);
//       // /////////////////////////////////////////////////////////////////////
//       // const unique = new Set();

//       // // Iterate over each feature and add the ROAD_NO value to the set
//       // jsonData.features.forEach((feature) => {
//       //   unique.add(Number(feature.properties.FACIL_KIND));
//       // });
//       // console.log("unique", unique);
//       // const sorted = Array.from(unique).sort((b, a) => b - a);
//       // console.log("sorted", sorted);
//       // /////////////////////////////////////////////////////////////////////
//       // create filter conditions
//       const filterConditions = [];
//       if (roadNo) {
//         filterConditions.push((feature) =>
//           roadNo.includes(parseInt(feature.properties.ROAD_NO))
//         );
//       }
//       // create width filter conditions for or calculation
//       if (widthOps) {
//         const widthRanges = [
//           { min: 0, max: 4 },
//           { min: 4, max: 8 },
//           { min: 8, max: 12 },
//           { min: 12, max: Infinity },
//         ];
//         var widthConditions = widthOps
//           .map((widthOp, index) => {
//             if (widthOp === "true") {
//               const widthRange = widthRanges[index];
//               return (feature) =>
//                 feature.properties.RVWD > widthRange.min &&
//                 feature.properties.RVWD <= widthRange.max;
//             } else {
//               return null;
//             }
//           })
//           .filter((condition) => condition !== null);
//       } else {
//         var widthConditions = [];
//       }
//       if (laneOps) {
//         const laneRanges = [
//           { min: 0, max: 1 },
//           { min: 1, max: 2 },
//           { min: 2, max: 3 },
//           { min: 3, max: 4 },
//           { min: 4, max: 8 },
//           { min: 8, max: Infinity },
//         ];
//         var laneConditions = laneOps
//           .map((laneOp, index) => {
//             if (laneOp === "true") {
//               return (feature) =>
//                 feature.properties.RDLN > laneRanges[index].min &&
//                 feature.properties.RDLN <= laneRanges[index].max;
//             } else {
//               return null;
//             }
//           })
//           .filter((condition) => condition !== null);
//       } else {
//         var laneConditions = [];
//       }
//       if (facilOps) {
//         const facilRanges = [
//           { min: 0, max: 1 },
//           { min: 1, max: 2 },
//           { min: 2, max: 3 },
//           { min: 3, max: 4 },
//           { min: 4, max: Infinity },
//         ];
//         var facilConditions = facilOps
//           .map((facilOp, index) => {
//             if (facilOp === "true") {
//               return (feature) =>
//                 feature.properties.FACIL_KIND > facilRanges[index].min &&
//                 feature.properties.FACIL_KIND <= facilRanges[index].max;
//             } else {
//               return null;
//             }
//           })
//           .filter((condition) => condition !== null);
//       } else {
//         var facilConditions = [];
//       }

//       console.log("filterConditions:", filterConditions);
//       console.log("widthConditions:", widthConditions);
//       console.log("laneConditions:", laneConditions);
//       console.log("facilConditions:", facilConditions);
//       //filter the raw data in the server & form geojson & send to client
//       const filteredFeatures = jsonData.features.filter((feature) => {
//         return (
//           filterConditions.every((condition) => condition(feature)) &&
//           (widthConditions.length === 0 ||
//             widthConditions.some((condition) => condition(feature))) &&
//           (laneConditions.length === 0 ||
//             laneConditions.some((condition) => condition(feature))) &&
//           (facilConditions.length === 0 ||
//             facilConditions.some((condition) => condition(feature)))
//         );
//       });
//       const features = filteredFeatures.flatMap((feature) =>
//         feature.geometry.coordinates.flatMap((line) => turf.lineString(line))
//       );
//       const collection = turf.featureCollection(features);
//       const mergedGJ = turf.combine(collection);
//       res.send(mergedGJ);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error parsing JSON data");
//     }

//     console.log("road fetched");
//   });
// });

// app.get(
//   "/conditions/:roadNo/:laneOps/:facilOps/:speedOps/:barrierOps/:lightOps/:caronlyOps/:onewayOps",
//   (req, res) => {
//     const roadNo =
//       req.params.roadNo === "null"
//         ? null
//         : req.params.roadNo.split(",").map(Number);
//     const laneOps =
//       req.params.laneOps === "null" ? null : req.params.laneOps.split(",");
//     const facilOps =
//       req.params.facilOps === "null" ? null : req.params.facilOps.split(",");
//     const speedOps =
//       req.params.speedOps === "null" ? null : req.params.speedOps.split(",");
//     const barrierOps =
//       req.params.barrierOps === "null"
//         ? null
//         : req.params.barrierOps.split(",");
//     const lightOps =
//       req.params.lightOps === "null" ? null : req.params.lightOps.split(",");
//     const caronlyOps =
//       req.params.caronlyOps === "null"
//         ? null
//         : req.params.caronlyOps.split(",");
//     const onewayOps =
//       req.params.onewayOps === "null" ? null : req.params.onewayOps.split(",");

//     async function getData() {
//       try {
//         const data = await s3.getObject(params);
//         console.log("data", data);
//         console.log("data.Body.toString", data.Body.toString()); // Log the string

//         const jsonData = JSON.parse(data.Body.toString());

//         console.log("jsonData", jsonData);
//         // ... use the JSON data here ...
//         // const filterConditions = [];
//         // if (roadNo) {
//         //   filterConditions.push((feature) =>
//         //     roadNo.includes(parseInt(feature.properties.road_no))
//         //   );
//         // }

//         // if (laneOps) {
//         //   const laneRanges = ["1", "2", "3", "4", "5"];
//         //   var laneConditions = laneOps
//         //     .map((laneOp, index) => {
//         //       if (laneOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.width === laneRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var laneConditions = [];
//         // }
//         // if (facilOps) {
//         //   const facilRanges = ["0", "1", "2", "4", "8"];
//         //   var facilConditions = facilOps
//         //     .map((facilOp, index) => {
//         //       if (facilOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.facil_kind === facilRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var facilConditions = [];
//         // }
//         // if (speedOps) {
//         //   const speedRanges = [20, 30, 40, 50, 60, 70, 80];
//         //   var speedConditions = speedOps
//         //     .map((speedOp, index) => {
//         //       if (speedOp === "true") {
//         //         if (index === 8) {
//         //           return (feature) =>
//         //             feature.properties.max_spd === null ||
//         //             feature.properties.max_spd === 0;
//         //         } else if (index === 7) {
//         //           return (feature) =>
//         //             feature.properties.max_spd === 90 ||
//         //             feature.properties.max_spd === 100 ||
//         //             feature.properties.max_spd === 110;
//         //         } else {
//         //           return (feature) =>
//         //             feature.properties.max_spd === speedRanges[index];
//         //         }
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var speedConditions = [];
//         // }
//         // if (barrierOps) {
//         //   const barrierRanges = ["0", "1", "2", "3", "4", "5", "15"];
//         //   var barrierConditions = barrierOps
//         //     .map((barrierOp, index) => {
//         //       if (barrierOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.barrier === barrierRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var barrierConditions = [];
//         // }
//         // if (lightOps) {
//         //   const lightRanges = [0, 1, 2, 3, 4, null];
//         //   var lightConditions = lightOps
//         //     .map((lightOp, index) => {
//         //       if (lightOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.num_cross === lightRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var lightConditions = [];
//         // }
//         // if (caronlyOps) {
//         //   const caronlyRanges = ["0", "1", null];
//         //   var caronlyConditions = caronlyOps
//         //     .map((caronlyOp, index) => {
//         //       if (caronlyOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.auto_exclu === caronlyRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var caronlyConditions = [];
//         // }
//         // if (onewayOps) {
//         //   const onewayRanges = ["0", "1"];
//         //   var onewayConditions = onewayOps
//         //     .map((onewayOp, index) => {
//         //       if (onewayOp === "true") {
//         //         return (feature) =>
//         //           feature.properties.oneway === onewayRanges[index];
//         //       } else {
//         //         return null;
//         //       }
//         //     })
//         //     .filter((condition) => condition !== null);
//         // } else {
//         //   var onewayConditions = [];
//         // }

//         // //filter the raw data in the server & form geojson & send to client
//         // const filteredFeatures = jsonData.features.filter((feature) => {
//         //   return (
//         //     filterConditions.every((condition) => condition(feature)) &&
//         //     (laneConditions.length === 0 ||
//         //       laneConditions.some((condition) => condition(feature))) &&
//         //     (facilConditions.length === 0 ||
//         //       facilConditions.some((condition) => condition(feature))) &&
//         //     (speedConditions.length === 0 ||
//         //       speedConditions.some((condition) => condition(feature))) &&
//         //     (barrierConditions.length === 0 ||
//         //       barrierConditions.some((condition) => condition(feature))) &&
//         //     (lightConditions.length === 0 ||
//         //       lightConditions.some((condition) => condition(feature))) &&
//         //     (caronlyConditions.length === 0 ||
//         //       caronlyConditions.some((condition) => condition(feature))) &&
//         //     (onewayConditions.length === 0 ||
//         //       onewayConditions.some((condition) => condition(feature)))
//         //   );
//         // });

//         // let lengthSum = 0;

//         // for (const feature of filteredFeatures) {
//         //   lengthSum += feature.properties.length;
//         // }

//         // lengthSum = Math.round(lengthSum / 1000);
//         // console.log("Sum of lengths:", lengthSum);

//         // // const features = filteredFeatures.flatMap((feature) =>
//         // //   feature.geometry.coordinates.flatMap((line) =>
//         // //     turf.lineString(line)
//         // //   )
//         // // );
//         // // console.log("features:", features[0]);
//         // // console.log("filteredFeatures.length:", filteredFeatures.length);
//         // // console.log("filteredFeatures:", filteredFeatures);

//         // const GJ = turf.featureCollection(filteredFeatures);
//         // // console.log("collection:", GJ);
//         // // const mergedGJ = turf.combine(GJ);
//         // res.send({ mergedGJ: GJ, lengthSum: lengthSum });
//       } catch (err) {
//         console.error(err);
//         return res.status(500).send("Error reading or parsing JSON file");
//       }
//     }

//     getData();
//   }
// );

app.get(
  "/conditions/:roadNo/:laneOps/:facilOps/:speedOps/:barrierOps/:lightOps/:caronlyOps/:onewayOps",
  (req, res) => {
    const roadNo =
      req.params.roadNo === "null"
        ? null
        : req.params.roadNo.split(",").map(Number);
    const laneOps =
      req.params.laneOps === "null" ? null : req.params.laneOps.split(",");
    const facilOps =
      req.params.facilOps === "null" ? null : req.params.facilOps.split(",");
    const speedOps =
      req.params.speedOps === "null" ? null : req.params.speedOps.split(",");
    const barrierOps =
      req.params.barrierOps === "null"
        ? null
        : req.params.barrierOps.split(",");
    const lightOps =
      req.params.lightOps === "null" ? null : req.params.lightOps.split(",");
    const caronlyOps =
      req.params.caronlyOps === "null"
        ? null
        : req.params.caronlyOps.split(",");
    const onewayOps =
      req.params.onewayOps === "null" ? null : req.params.onewayOps.split(",");

    fs.readFile(
      `${__dirname}/datafolder/National_Road_100.geojson`,
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error reading JSON file");
        }

        try {
          const jsonData = JSON.parse(data);
          // /////////////////////////////////////////////////////////////////////
          // const unique = new Set();

          // // Iterate over each feature and add the ROAD_NO value to the set
          // jsonData.features.forEach((feature) => {
          //   unique.add(Number(feature.properties.length));
          // });
          // const sorted = Array.from(unique).sort((b, a) => b - a);
          // console.log("sorted", sorted);
          // /////////////////////////////////////////////////////////////////////
          // create filter conditions
          const filterConditions = [];
          if (roadNo) {
            filterConditions.push((feature) =>
              roadNo.includes(parseInt(feature.properties.road_no))
            );
          }

          if (laneOps) {
            const laneRanges = ["1", "2", "3", "4", "5"];
            var laneConditions = laneOps
              .map((laneOp, index) => {
                if (laneOp === "true") {
                  return (feature) =>
                    feature.properties.width === laneRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var laneConditions = [];
          }
          if (facilOps) {
            const facilRanges = ["0", "1", "2", "4", "8"];
            var facilConditions = facilOps
              .map((facilOp, index) => {
                if (facilOp === "true") {
                  return (feature) =>
                    feature.properties.facil_kind === facilRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var facilConditions = [];
          }
          if (speedOps) {
            const speedRanges = [20, 30, 40, 50, 60, 70, 80];
            var speedConditions = speedOps
              .map((speedOp, index) => {
                if (speedOp === "true") {
                  if (index === 8) {
                    return (feature) =>
                      feature.properties.max_spd === null ||
                      feature.properties.max_spd === 0;
                  } else if (index === 7) {
                    return (feature) =>
                      feature.properties.max_spd === 90 ||
                      feature.properties.max_spd === 100 ||
                      feature.properties.max_spd === 110;
                  } else {
                    return (feature) =>
                      feature.properties.max_spd === speedRanges[index];
                  }
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var speedConditions = [];
          }
          if (barrierOps) {
            const barrierRanges = ["0", "1", "2", "3", "4", "5", "15"];
            var barrierConditions = barrierOps
              .map((barrierOp, index) => {
                if (barrierOp === "true") {
                  return (feature) =>
                    feature.properties.barrier === barrierRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var barrierConditions = [];
          }
          if (lightOps) {
            const lightRanges = [0, 1, 2, 3, 4, null];
            var lightConditions = lightOps
              .map((lightOp, index) => {
                if (lightOp === "true") {
                  return (feature) =>
                    feature.properties.num_cross === lightRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var lightConditions = [];
          }
          if (caronlyOps) {
            const caronlyRanges = ["0", "1", null];
            var caronlyConditions = caronlyOps
              .map((caronlyOp, index) => {
                if (caronlyOp === "true") {
                  return (feature) =>
                    feature.properties.auto_exclu === caronlyRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var caronlyConditions = [];
          }
          if (onewayOps) {
            const onewayRanges = ["0", "1"];
            var onewayConditions = onewayOps
              .map((onewayOp, index) => {
                if (onewayOp === "true") {
                  return (feature) =>
                    feature.properties.oneway === onewayRanges[index];
                } else {
                  return null;
                }
              })
              .filter((condition) => condition !== null);
          } else {
            var onewayConditions = [];
          }

          //filter the raw data in the server & form geojson & send to client
          const filteredFeatures = jsonData.features.filter((feature) => {
            return (
              filterConditions.every((condition) => condition(feature)) &&
              (laneConditions.length === 0 ||
                laneConditions.some((condition) => condition(feature))) &&
              (facilConditions.length === 0 ||
                facilConditions.some((condition) => condition(feature))) &&
              (speedConditions.length === 0 ||
                speedConditions.some((condition) => condition(feature))) &&
              (barrierConditions.length === 0 ||
                barrierConditions.some((condition) => condition(feature))) &&
              (lightConditions.length === 0 ||
                lightConditions.some((condition) => condition(feature))) &&
              (caronlyConditions.length === 0 ||
                caronlyConditions.some((condition) => condition(feature))) &&
              (onewayConditions.length === 0 ||
                onewayConditions.some((condition) => condition(feature)))
            );
          });

          let lengthSum = 0;

          for (const feature of filteredFeatures) {
            lengthSum += feature.properties.length;
          }

          lengthSum = Math.round(lengthSum / 1000);
          console.log("Sum of lengths:", lengthSum);

          // const features = filteredFeatures.flatMap((feature) =>
          //   feature.geometry.coordinates.flatMap((line) =>
          //     turf.lineString(line)
          //   )
          // );
          // console.log("features:", features[0]);
          // console.log("filteredFeatures.length:", filteredFeatures.length);
          // console.log("filteredFeatures:", filteredFeatures);

          const GJ = turf.featureCollection(filteredFeatures);
          // console.log("collection:", GJ);
          // const mergedGJ = turf.combine(GJ);
          res.send({ mergedGJ: GJ, lengthSum: lengthSum });
        } catch (error) {
          console.error(error);
          res.status(500).send("Error parsing JSON data");
        }

        console.log("road fetched");
      }
    );
  }
);

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
