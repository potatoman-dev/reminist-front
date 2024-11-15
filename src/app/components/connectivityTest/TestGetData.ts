export const TestGetData = async () => {
    const res = await fetch('http://localhost:3000/api/v1/connectivity_tests');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
}