export const TestDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/connectivity_tests/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
}