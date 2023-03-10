import { Station } from "./station.js";

getMinUnleadedPrice: {
  if (Station.title.length > 0) {
    let minPrice = Station.unleaded_price[0].unleaded_price;
    for (let i = 0; i < Station.title.length; i++) {
      console.log(Station.title[i].unleaded_price);
      if (Station.unleaded_price[i].unleaded_price <= minPrice) {
        minPrice = Station.unleaded_price[i].unleaded_price;
      }
    }
    return minPrice;
  }
}

getMaxUnleadedPrice: {
  if (Station.title.length > 0) {
    let maxPrice = Station.unleaded_price[0].unleaded_price;
    for (let i = 0; i < Station.title.length; i++) {
      console.log(Station.title[i].unleaded_price);
      if (Station.unleaded_price[i].unleaded_price >= maxPrice) {
        maxPrice = Station.unleaded_price[i].unleaded_price;
      }
    }
    return maxPrice;
  }
}
