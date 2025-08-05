import { mainDisplay, displayHouseDetails } from "./mainDisplay.mjs"; 
import { mainFetch } from "./fetchingData.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";
const houseUrl = "https://potterapi-fedeperin.vercel.app/en/houses";

const data = await mainFetch(mainUrl);
mainDisplay(data)
const house = await mainFetch(houseUrl);
displayHouseDetails(house)