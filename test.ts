import test from "flug";
import { fromFile } from "geotiff";

import getPreciseNoDataValue from "./geotiff-precise-no-data";

const files: [string, string | undefined, string | undefined][] = [
  [
    "abetow-ERD2018-EBIRD_SCIENCE-20191109-a5cf4cb2_hr_2018_abundance_median.tiff",
    "-inf\u0000",
    "-Infinity"
  ],
  [
    "eu_pasture.tiff",
    "-3.4028234663852886e+038\u0000",
    "-3.4028234663852886e+038"
  ],
  ["gadas.tif", undefined, undefined],
  ["GeogToWGS84GeoKey5.tif", undefined, undefined],
  [
    "nt_20201024_f18_nrt_s.tif",
    "-3.39999999999999996e+38\u0000",
    "-3.39999999999999996e+38"
  ],
  [
    "vestfold.tif",
    "-3.39999999999999996e+38\u0000",
    "-3.39999999999999996e+38"
  ],
  ["wildfires.tiff", undefined, undefined],
  ["wind_direction.tif", undefined, undefined]
];

files.forEach(([filename, dirty, clean]) => {
  test(filename, async ({ eq }) => {
    const tif = await fromFile("./data/" + filename);
    const image = await tif.getImage();
    eq(getPreciseNoDataValue(image), clean);
    eq(getPreciseNoDataValue(image, { raw: true }), dirty);
  });
});
