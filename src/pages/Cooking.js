import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const languages = ["English", "Telugu", "Hindi", "Tamil", "Kannada"];

function Cooking() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeLanguages, setRecipeLanguages] = useState({}); // lang per recipe
  const [translatedTitles, setTranslatedTitles] = useState({}); // translated titles cache
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const API_KEY = "0556b992e93f42869e94519202c3a6e6";

  // Load initial recipes on mount
  useEffect(() => {
    fetchRecipes("popular", 0, false);
  }, []);

  // Infinite scroll - load more when near bottom
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 300 &&
        !loading &&
        hasMore
      ) {
        fetchRecipes(query || "popular", offset, true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, offset, query]);

  // Fetch recipes from Spoonacular API
  const fetchRecipes = async (searchTerm, offsetValue, append = false) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: searchTerm,
            number: 30, // load more at once for fuller screen
            offset: offsetValue,
            apiKey: API_KEY,
          },
        }
      );

      const fetched = response.data.results || [];

      if (append) {
        setRecipes((prev) => [...prev, ...fetched]);
      } else {
        setRecipes(fetched);
        setTranslatedTitles({}); // reset translated cache on new search
        setRecipeLanguages({});
      }

      setOffset(offsetValue + 30);
      setHasMore(fetched.length > 0);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Handle search button or enter key
  const handleSearch = () => {
    if (!query.trim()) return;
    setOffset(0);
    fetchRecipes(query.trim(), 0, false);
    setSelectedRecipe(null);
  };

  // Handle recipe click to show details
  const handleRecipeClick = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: { apiKey: API_KEY },
        }
      );
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
    setLoading(false);
  };

  // Change language for a recipe and translate title
  const handleLanguageChange = (recipeId, lang) => {
    setRecipeLanguages((prev) => ({ ...prev, [recipeId]: lang }));
    // If selected language is English, no translation needed
    if (lang === "English") {
      setTranslatedTitles((prev) => {
        const newTitles = { ...prev };
        delete newTitles[recipeId];
        return newTitles;
      });
      return;
    }
    translateTitle(recipeId, lang);
  };

  // Translate recipe title using LibreTranslate (free API, no key)
  const translateTitle = useCallback(
    async (recipeId, targetLang) => {
      const recipe = recipes.find((r) => r.id === recipeId);
      if (!recipe) return;

      // Check if already translated
      if (translatedTitles[recipeId]) return;

      const langCodeMap = {
        English: "en",
        Telugu: "te",
        Hindi: "hi",
        Tamil: "ta",
        Kannada: "kn",
      };

      try {
        const res = await axios.post(
          "https://libretranslate.de/translate",
          {
            q: recipe.title,
            source: "en",
            target: langCodeMap[targetLang] || "en",
            format: "text",
          },
          {
            headers: { accept: "application/json" },
          }
        );
        setTranslatedTitles((prev) => ({
          ...prev,
          [recipeId]: res.data.translatedText,
        }));
      } catch (err) {
        console.error("Translation error:", err);
      }
    },
    [recipes, translatedTitles]
  );

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #fff3e0, #fce4ec, #f3e5f5)",
      }}
    >
      <blockquote className="text-center italic text-2xl font-semibold mb-8 text-pink-600">
        "Cooking is like love — it should be entered into with abandon or not at
        all." — Harriet Van Horne
      </blockquote>

      <h1 className="text-4xl font-bold text-center text-rose-700 mb-4">
        🍲 Sumarishma’s Kitchen Delights
      </h1>

      {/* Search */}
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a dish (e.g., Biryani, Pasta)..."
          className="border rounded-l px-4 py-2 w-64 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* Recipe List */}
      {!selectedRecipe && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => {
              const lang = recipeLanguages[recipe.id] || "English";
              const displayTitle =
                lang === "English"
                  ? recipe.title
                  : translatedTitles[recipe.id] || "Translating...";
              return (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      {displayTitle}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        [{lang}]
                      </span>
                    </h2>
                    <select
                      className="border border-gray-300 rounded px-1 py-0.5 text-sm"
                      onClick={(e) => e.stopPropagation()}
                      value={lang}
                      onChange={(e) =>
                        handleLanguageChange(recipe.id, e.target.value)
                      }
                    >
                      {languages.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700 col-span-full">
              No recipes found. Try searching something else.
            </p>
          )}
        </div>
      )}

      {/* Selected Recipe Detail */}
      {selectedRecipe && (
        <div className="text-left mt-6 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-rose-600">
            {selectedRecipe.title}
          </h2>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p
            className="text-gray-800"
            dangerouslySetInnerHTML={{
              __html:
                selectedRecipe.instructions || "No instructions available.",
            }}
          />
          {selectedRecipe.sourceUrl ? (
            <a
              href={selectedRecipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              🔗 View Full Recipe
            </a>
          ) : (
            <p className="text-gray-500 mt-4">No external link available.</p>
          )}
          <button
            className="mt-4 ml-4 text-sm text-blue-600 underline"
            onClick={() => setSelectedRecipe(null)}
          >
            ← Back to results
          </button>
        </div>
      )}
    </div>
  );
}

export default Cooking;
