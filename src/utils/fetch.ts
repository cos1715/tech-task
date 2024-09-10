async function loadApi<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('🚀 ~ res==>>', data);
    return data;
  } catch (e) {
    console.log('🚀 ~ loadApi ~ e==>>', e);
    return null;
  }
}

export default loadApi;
