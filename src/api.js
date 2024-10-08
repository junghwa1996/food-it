const BASE_URL = "https://learn.codeit.kr/0917";

export async function getFoodsList({
  order = "",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const query = new URLSearchParams({
    order,
    cursor,
    limit,
    search,
  });
  const response = await fetch(`${BASE_URL}/foods?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createFood(formData) {
  const response = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function updateFood(id, formData) {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 수정하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
