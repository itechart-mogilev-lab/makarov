export function calculateTime({ values }) {
    let time;
  
    if ((values.type === "office") | (values.type === "industrial")) {
      time = values.squareMeters * 8;
    } else {
      time =
        values.smallRooms * 18 + values.bigRooms * 30 + values.bathRooms * 23;
    }
  
    if (values.service.indexOf("pool") !== -1) time += 90;
    if (values.service.indexOf("furniture") !== -1) time += 60;
    if (values.service.indexOf("carpet") !== -1)
      time += values.smallCarpets * 13 + values.bigCarpets * 20;
  
    return time;
  }