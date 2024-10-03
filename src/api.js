export async function getFoodsList() {
  const response = await fetch("https://learn.codeit.kr/0917/foods");
  const body = await response.json();
  return body;
}
