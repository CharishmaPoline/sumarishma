import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "7e8093862c984db2a181459b9bfc9f1b";

const predefinedBusinessIdeas = [
  {
    title: "How to Become a Successful Businessman",
    description:
      "Start by learning about your industry, networking, and managing finances effectively.",
    url: "https://www.entrepreneur.com/article/288963",
  },
  {
    title: "Top 10 Small Business Ideas in 2025",
    description:
      "Explore trending small business ideas including e-commerce, consulting, and digital marketing.",
    url: "https://www.businessnewsdaily.com/15752-small-business-ideas.html",
  },
  {
    title: "Ways to Make Money from Business",
    description:
      "Understand revenue streams, marketing strategies, and customer retention to boost profits.",
    url: "https://www.forbes.com/sites/forbesbusinesscouncil/2021/08/18/10-ways-to-increase-your-business-revenue/",
  },
  {
    title: "How to Write a Business Plan",
    description:
      "A solid business plan helps attract investors and guides your company to success.",
    url: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
  },
  {
    title: "Marketing Tips for Small Business",
    description:
      "Effective marketing can help your business grow and reach new customers.",
    url: "https://www.shopify.com/blog/small-business-marketing",
  },
];

const Business = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showIdeas, setShowIdeas] = useState(true);

  const fetchBusinessNews = async (query) => {
    setLoading(true);
    setError("");
    try {
      const url = query
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            query
          )}&language=en&sortBy=relevance&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${API_KEY}`;

      const response = await axios.get(url);

      if (response.data.articles.length === 0) {
        setError("No articles found for this search.");
        setArticles([]);
      } else {
        setArticles(response.data.articles);
      }
    } catch (err) {
      setError("Failed to fetch business news.");
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinessNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchBusinessNews();
      setShowIdeas(true);
    } else {
      fetchBusinessNews(searchTerm.trim());
      setShowIdeas(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-md p-4">
        <h1 className="text-2xl font-bold text-indigo-700 text-center">
          📈 Business News & Ideas
        </h1>

        <form
          onSubmit={handleSearch}
          className="mt-4 flex justify-center gap-2 flex-wrap"
        >
          <input
            type="text"
            placeholder="Search business topics, ideas, tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-80 max-w-full rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-700"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                fetchBusinessNews();
                setShowIdeas(true);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Clear
            </button>
          )}
        </form>
      </header>

      {/* Loading/Error */}
      <div className="text-center my-4">
        {loading && <p className="text-indigo-500">Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Business Ideas */}
      {showIdeas && !loading && !error && (
        <section className="mb-10 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
            💡 Popular Business Ideas & Tips
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {predefinedBusinessIdeas.map((idea, idx) => (
              <a
                href={idea.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="block p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 text-indigo-800"
              >
                <h3 className="text-lg font-bold mb-2">{idea.title}</h3>
                <p className="text-sm mb-3">{idea.description}</p>
                <span className="text-sm text-blue-600 underline">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      {!showIdeas && !loading && articles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6 text-center">
            📰 Business News Articles
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {article.description || "No description available."}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Business;
