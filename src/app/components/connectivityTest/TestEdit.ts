export const TestEdit = async (id: string, name: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/connectivity_tests/${id}`, {
        method: 'PUT',
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