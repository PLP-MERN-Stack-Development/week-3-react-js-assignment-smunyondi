export async function fetchPosts(page = 1, limit = 10, query = "") {
  let url = `https://dev.to/api/articles?per_page=${limit}&page=${page}`;
  if (query) url += `&tag=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}