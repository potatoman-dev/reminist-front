export const TestGetData = async () => {
    const res = await fetch('https://reminist-back.onrender.com/api/v1/connectivity_tests');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
}