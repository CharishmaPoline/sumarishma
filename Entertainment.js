import React, { useEffect, useState, useCallback } from "react";

const Entertainment = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("latest movie trailers");
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // 🆕 for error display

  const API_KEY = "AIzaSyDRWULvMBc7jfD9ufGoqQ6YNGt7_BxNZ9A"; // your key

  const fetchVideos = useCallback(async () => {
    if (!hasMore || !searchTerm) return;
    setLoading(true);
    setErrorMsg(""); // clear any previous error

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchTerm
        )}&type=video&maxResults=10&pageToken=${pageToken || ""}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data?.error) {
        setErrorMsg("Quota exceeded or API error. Please try again later.");
        setHasMore(false);
      } else if (data.items && data.items.length > 0) {
        setVideos((prev) => [...prev, ...data.items]);
        setPageToken(data.nextPageToken || null);
        setHasMore(!!data.nextPageToken);
      } else {
        setErrorMsg("No videos found. Please try again tomorrow.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setErrorMsg("Something went wrong. Try again later.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, pageToken, hasMore]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (triggerSearch) {
      fetchVideos();
      setTriggerSearch(false);
    }
  }, [triggerSearch, fetchVideos]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !loading &&
        hasMore
      ) {
        fetchVideos();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchVideos, loading, hasMore]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setVideos([]);
      setPageToken(null);
      setHasMore(true);
      setErrorMsg(""); // reset error
      setTriggerSearch(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background:
          "linear-gradient(135deg, #f6d365, #fda085, #fbc2eb, #a18cd1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.8rem",
          color: "#6a1b9a",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        SUMARISHMA ENTERTAINMENT ZONE
      </h1>
      <h3
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "#e91e63",
          marginBottom: "30px",
        }}
      >
        “Where Entertainment Begins – Watch, Smile, Repeat!”
      </h3>

      <form
        onSubmit={handleSearch}
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <input
          type="text"
          value={searchTerm}
          placeholder="Search trailers or shows..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            backgroundColor: "#8e44ad",
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {errorMsg && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {errorMsg}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}
      >
        {videos
          .filter((video) => video.id?.videoId)
          .map((video) => (
            <div
              key={video.id.videoId}
              style={{
                border: "2px solid #ffb6c1",
                borderRadius: "12px",
                padding: "10px",
                backgroundColor: "#fff0f5",
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              }}
            >
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "10px" }}
              ></iframe>
              <h4
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#6a1b9a",
                }}
              >
                {video.snippet.title}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {video.snippet.channelTitle}
              </p>
            </div>
          ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more videos...
        </p>
      )}
    </div>
  );
};

export default Entertainment;
