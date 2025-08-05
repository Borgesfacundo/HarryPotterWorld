export async function mainFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}