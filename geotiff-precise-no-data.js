function getPreciseNoDataValue(data, options) {
  if (data.fileDirectory) data = data.fileDirectory;
  if (data.GDAL_NODATA) data = data.GDAL_NODATA;
  if (typeof data !== "string") return undefined;

  if (options && options.raw) return data;

  data = data.replace("\u0000", "").trim();

  if (["-inf", "-infinity"].includes(data)) {
    return "-Infinity";
  }

  if (["+inf", "inf", "+infinity", "infinity"].includes(data)) {
    return "Infinity";
  }

  // remove preceding plus
  data = data.replace(/^\+/, "");

  return data;
}

if (typeof module === "object") {
  module.exports = getPreciseNoDataValue;
  module.exports.default = getPreciseNoDataValue;
  module.exports.getPreciseNoDataValue = getPreciseNoDataValue;
}
