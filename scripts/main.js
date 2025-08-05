import { mainFetch } from "./fetchingData.mjs"; 

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";

mainFetch(mainUrl)
  .then(() => console.log("Data fetched successfully"))