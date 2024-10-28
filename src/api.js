export const fetchData = async () => {
  const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
  const data = await response.json();
  return data;
};