async function loadApi<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(`Failed to load data from ${url}`);
  }
}

export default loadApi;
