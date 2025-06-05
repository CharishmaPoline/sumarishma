import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'zryWs7CaUxGzGw5blgvSjaYMAnTYF7jd0QHJLZcPGQnuGelJZeonHdLe';

const defaultCategories = [
  'sarees',
  'gold jewelry',
  'kids wear',
  'professional wear',
  'ready made dresses',
  'blouses',
  'traditional wear',
];

const FashionPinterest = () => {
  const [imagesByCategory, setImagesByCategory] = useState({});
  const [pagesByCategory, setPagesByCategory] = useState({});
  const [pinned, setPinned] = useState([]);
  const [modalImg, setModalImg] = useState(null);
  const [categories, setCategories] = useState(defaultCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem('pinnedFashionImages');
    if (saved) setPinned(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pinnedFashionImages', JSON.stringify(pinned));
  }, [pinned]);

  useEffect(() => {
    categories.forEach((cat) => {
      fetchImages(cat, 1);
      setPagesByCategory((prev) => ({ ...prev, [cat]: 1 }));
    });
  }, [categories]);

  const fetchImages = async (category, page) => {
    try {
      const res = await axios.get('https://api.pexels.com/v1/search', {
        headers: { Authorization: PEXELS_API_KEY },
        params: {
          query: category,
          per_page: 10,
          page: page,
        },
      });
      setImagesByCategory((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), ...res.data.photos],
      }));
    } catch (err) {
      console.error(`Error fetching ${category} images:`, err);
    }
  };

  const handleScroll = (category) => {
    const container = scrollRefs.current[category];
    if (!container) return;

    const scrollEnd =
      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 50;
    if (scrollEnd) {
      const nextPage = (pagesByCategory[category] || 1) + 1;
      fetchImages(category, nextPage);
      setPagesByCategory((prev) => ({ ...prev, [category]: nextPage }));
    }
  };

  const handlePin = (img) => {
    if (pinned.find((p) => p.id === img.id)) {
      setPinned(pinned.filter((p) => p.id !== img.id));
    } else {
      setPinned([img, ...pinned]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return;

    if (!categories.includes(trimmed)) {
      setCategories([trimmed, ...defaultCategories]);
    }
    setSearchTerm('');
  };

  const linkStyle = {
    backgroundColor: '#e6f2ff',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    textDecoration: 'none',
    color: '#0077cc',
    border: '1px solid #b3d7ff'
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5e4f7, #fcd4dc)',
        minHeight: '100vh',
        padding: '30px 20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#a0522d',
        }}
      >
        SUMARISHMA FASHION STYLE
      </h1>
      <h3
        style={{
          textAlign: 'center',
          color: '#6a1b9a',
          marginBottom: '30px',
          fontStyle: 'italic',
        }}
      >
        "Fashion is the armor to survive the reality of everyday life."
      </h3>

      <form
        onSubmit={handleSearchSubmit}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <input
          type="text"
          placeholder="Search fashion topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '280px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: '#6a1b9a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Search
        </button>
      </form>

      {categories.map((category) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '12px', color: '#d63384', fontWeight: 'bold' }}>
            {category.toUpperCase()}
          </h2>
          <div
            ref={(el) => (scrollRefs.current[category] = el)}
            onScroll={() => handleScroll(category)}
            style={{
              display: 'flex',
              gap: '14px',
              overflowX: 'auto',
              paddingBottom: '10px',
              scrollBehavior: 'smooth',
            }}
          >
            {imagesByCategory[category]?.map((img) => (
              <div
                key={img.id}
                style={{
                  minWidth: '240px',
                  flexShrink: 0,
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={img.src.medium}
                  alt={img.alt || 'Fashion'}
                  style={{ width: '100%', display: 'block' }}
                  onClick={() => setModalImg(img)}
                />
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#fefefe',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <button
                    onClick={() => handlePin(img)}
                    style={{
                      backgroundColor: pinned.find((p) => p.id === img.id)
                        ? '#ff6b6b'
                        : '#ffc107',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      color: pinned.find((p) => p.id === img.id) ? 'white' : 'black',
                    }}
                  >
                    {pinned.find((p) => p.id === img.id) ? 'Unpin' : 'Pin'}
                  </button>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <a href={`https://www.amazon.in/s?k=${category}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>Amazon</a>
                    <a href={`https://www.flipkart.com/search?q=${category}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>Flipkart</a>
                    <a href={`https://www.myntra.com/${category.replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>Myntra</a>
                    <a href={`https://www.ajio.com/search/?text=${category}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>Ajio</a>
                    <a href={`https://www.meesho.com/search?q=${category}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>Meesho</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <img
            src={modalImg.src.large}
            alt={modalImg.alt || 'Modal'}
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '12px' }}
          />
        </div>
      )}
    </div>
  );
};

export default FashionPinterest;
