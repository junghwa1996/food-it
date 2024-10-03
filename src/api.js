export async function getFoodsList({ order = "createdAt", cursor = "", limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/0917/foods?${query}`);
  const body = await response.json();
  return body;
}
