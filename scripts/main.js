import { mainDisplay } from "./mainDisplay.mjs"; 
import { mainFetch } from "./fetchingData.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";

const data = await mainFetch(mainUrl);
mainDisplay(data)