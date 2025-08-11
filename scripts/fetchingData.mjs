export async function mainFetch(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}