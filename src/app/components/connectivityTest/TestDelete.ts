export const TestDelete = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/v1/connectivity_tests/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
}