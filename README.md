# geotiff-precise-no-data
Get the Precise No Data Value for a GeoTIFF. Avoid Floating Point Arithmetic Issues.

## install
```bash
npm install geotiff-precise-no-data
```

## usage
```js
import { fromFile } from "geotiff";
import getPreciseNoDataValue from "./geotiff-precise-no-data";

const tif = await fromFile("vestfold.tif");
const image = await tif.getImage();
getPreciseNoDataValue(image);
"-3.39999999999999996e+38"

// get raw value
getPreciseNoDataValue(image, { raw: true });
"-3.39999999999999996e+38\u0000"

// pass in file directory object
// like { GDAL_NODATA: "-3.39999999999999996e+38\u0000", ... }
getPreciseNoDataValue(image.fileDirectory);
"-3.39999999999999996e+38"

// normalizes infinity
const tif = await fromFile("abetow-ERD2018-EBIRD_SCIENCE-20191109-a5cf4cb2_hr_2018_abundance_median.tiff");
const image = await tif.getImage();
getPreciseNoDataValue(image);
"-Infinity"
```
