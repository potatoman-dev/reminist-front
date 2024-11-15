export const TestPost = async (name: string) => {
    const res = await fetch('https://reminist-back.onrender.com/api/v1/connectivity_tests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
}