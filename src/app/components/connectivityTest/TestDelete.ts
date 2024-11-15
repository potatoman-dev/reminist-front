export const TestDelete = async (id: string) => {
    const res = await fetch(`https://reminist-back.onrender.com/api/v1/connectivity_tests/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
}