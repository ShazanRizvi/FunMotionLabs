import callAPI from "@/http/axios";

const formatDisplayDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const normalizeBlog = (blog) => ({
  ...blog,
  author: blog.author ?? blog.Author ?? "FunMotion Labs",
  readTime: blog.readTime ?? (blog.timetoRead ? `${blog.timetoRead} min read` : ""),
  date: blog.date ?? formatDisplayDate(blog.publishedAt),
  content: blog.content ?? "",
});

const normalizeGame = (game) => ({
  ...game,
  image: game.image ?? game.cardImageUrl ?? game.bannerImageUrl ?? "",
  releaseDate: game.releaseDate
    ? formatDisplayDate(game.releaseDate)
    : formatDisplayDate(game.publishedAt),
  genre: game.genre ?? "Action",
  studio: game.studio ?? "FunMotion Labs",
  platform: game.platform ?? "PC",
});

export const fetchBlogsList = async () => {
  const response = await callAPI("GET", "/api/blogs");
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map(normalizeBlog);
};

export const fetchGamesList = async () => {
  const response = await callAPI("GET", "/api/games");
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map(normalizeGame);
};

export const fetchFeaturedGames = async () => {
  const response = await callAPI("GET", "/api/games?isFeatured=true");
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map(normalizeGame);
};
