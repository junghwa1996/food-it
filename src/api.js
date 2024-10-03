export async function getFoodsList(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(`https://learn.codeit.kr/0917/foods?${query}`);
  const body = await response.json();
  return body;
}
