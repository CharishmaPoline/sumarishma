import React, { useState, useEffect, useRef } from "react";

const topBusinessLeadersFull = [
  {
    name: "Elon Musk",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    story:
      "Founder of SpaceX and Tesla, Elon Musk revolutionized electric vehicles and space exploration.",
    link: "https://en.wikipedia.org/wiki/Elon_Musk",
  },
  {
    name: "Oprah Winfrey",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Oprah_in_2014.jpg",
    story:
      "From humble beginnings to media mogul, Oprah is known for her philanthropy and empowering content.",
    link: "https://en.wikipedia.org/wiki/Oprah_Winfrey",
  },
  {
    name: "Jeff Bezos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Jeff_Bezos_2019.jpg",
    story:
      "Founder of Amazon, Bezos transformed retail and cloud computing industries worldwide.",
    link: "https://en.wikipedia.org/wiki/Jeff_Bezos",
  },
  {
    name: "Indra Nooyi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Indra_Nooyi_March_2009.jpg",
    story:
      "Former CEO of PepsiCo, Indra Nooyi led global strategy and innovation in the food industry.",
    link: "https://en.wikipedia.org/wiki/Indra_Nooyi",
  },
  {
    name: "Mukesh Ambani",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/Mukesh_Ambani_2010.jpg",
    story:
      "Chairman of Reliance Industries, Mukesh Ambani is a key player in India’s business and energy sectors.",
    link: "https://en.wikipedia.org/wiki/Mukesh_Ambani",
  },
  // Add few more leaders to enable scroll effect better
  {
    name: "Warren Buffett",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Warren_Buffett_KU_Visit.jpg",
    story:
      "One of the most successful investors, Buffett heads Berkshire Hathaway.",
    link: "https://en.wikipedia.org/wiki/Warren_Buffett",
  },
  {
    name: "Sara Blakely",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Sara_Blakely_by_Gage_Skidmore_2.jpg",
    story:
      "Founder of Spanx, Blakely turned $5,000 into a billion-dollar shapewear company.",
    link: "https://en.wikipedia.org/wiki/Sara_Blakely",
  },
];

// Topics array
const businessTopicsFull = [
  "Entrepreneurship",
  "Startup Funding",
  "Marketing Strategies",
  "Financial Management",
  "E-commerce Trends",
  "Leadership Skills",
  "Digital Transformation",
  "Sustainability in Business",
  "Customer Engagement",
  "Business Analytics",
  "Business Innovation",
  "Corporate Social Responsibility",
  "Product Development",
  "Negotiation Skills",
  "Risk Management",
];

const predefinedBusinessIdeas = [
  {
    title: "How to Start a Successful Business",
    description:
      "Understand your market, create a plan, manage finances carefully, and build customer relationships.",
    url: "https://www.entrepreneur.com/article/288963",
  },
  {
    title: "Ways to Make Money from Business",
    description:
      "Learn about revenue models, sales strategies, and marketing techniques to increase profits.",
    url: "https://www.forbes.com/sites/forbesbusinesscouncil/2021/08/18/10-ways-to-increase-your-business-revenue/",
  },
  {
    title: "Marketing Tips for Small Businesses",
    description:
      "Use social media, content marketing, and local advertising to grow your customer base.",
    url: "https://www.shopify.com/blog/small-business-marketing",
  },
  {
    title: "How to Write a Business Plan",
    description:
      "A good business plan helps you attract investors and plan your company’s growth.",
    url: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
  },
  {
    title: "Popular Small Business Ideas in 2025",
    description:
      "Explore trending ideas like e-commerce, consulting, digital services, and more.",
    url: "https://www.businessnewsdaily.com/15752-small-business-ideas.html",
  },
];

const Business = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredIdeas, setFilteredIdeas] = React.useState(predefinedBusinessIdeas);

  // Scroll state for leaders and topics
  const [visibleLeaders, setVisibleLeaders] = React.useState(
    topBusinessLeadersFull.slice(0, 5)
  );
  const [visibleTopics, setVisibleTopics] = React.useState(businessTopicsFull.slice(0, 7));

  const leadersContainerRef = useRef(null);
  const topicsContainerRef = useRef(null);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (term === "") {
      setFilteredIdeas(predefinedBusinessIdeas);
    } else {
      const filtered = predefinedBusinessIdeas.filter(
        (idea) =>
          idea.title.toLowerCase().includes(term) ||
          idea.description.toLowerCase().includes(term)
      );
      setFilteredIdeas(filtered);
    }
  };

  // Load more leaders on scroll end (simulate infinite scroll)
  const onLeadersScroll = () => {
    const el = leadersContainerRef.current;
    if (!el) return;

    // When scrolled to near end
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
      // Add next 3 leaders if available, else loop back
      const currentCount = visibleLeaders.length;
      let nextLeaders = [];
      if (currentCount + 3 <= topBusinessLeadersFull.length) {
        nextLeaders = topBusinessLeadersFull.slice(currentCount, currentCount + 3);
      } else {
        // loop back from start
        nextLeaders = topBusinessLeadersFull.slice(0, 3);
      }
      setVisibleLeaders((prev) => [...prev, ...nextLeaders]);
    }
  };

  // Load more topics on scroll end (simulate infinite scroll)
  const onTopicsScroll = () => {
    const el = topicsContainerRef.current;
    if (!el) return;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
      const currentCount = visibleTopics.length;
      let nextTopics = [];
      if (currentCount + 5 <= businessTopicsFull.length) {
        nextTopics = businessTopicsFull.slice(currentCount, currentCount + 5);
      } else {
        nextTopics = businessTopicsFull.slice(0, 5);
      }
      setVisibleTopics((prev) => [...prev, ...nextTopics]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white overflow-y-auto p-6">
      <header className="sticky top-0 z-10 bg-white bg-opacity-90 shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">
          💡 Business Ideas & Inspiration
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-2 flex-wrap"
        >
          <input
            type="text"
            placeholder="Search business ideas or tips..."
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
                setFilteredIdeas(predefinedBusinessIdeas);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Clear
            </button>
          )}
        </form>
      </header>

      {/* Scrollable top business leaders */}
      <section
        className="mb-8 max-w-full overflow-x-auto whitespace-nowrap px-4"
        ref={leadersContainerRef}
        onScroll={onLeadersScroll}
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          🌟 Top Business Leaders
        </h2>
        <div className="flex gap-6">
          {visibleLeaders.map((leader, idx) => (
            <div
              key={idx}
              className="inline-block bg-white rounded-xl shadow-md p-4 max-w-xs w-52 hover:shadow-xl transition duration-300"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-20 object-cover rounded-lg mb-2"
                style={{ maxHeight: "80px" }}
              />
              <h3 className="text-lg font-bold text-indigo-700 mb-1">
                {leader.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {leader.story}
              </p>
              <a
                href={leader.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Scrollable business topics */}
      <section
        className="mb-10 max-w-full overflow-x-auto whitespace-nowrap px-4"
        ref={topicsContainerRef}
        onScroll={onTopicsScroll}
      >
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          🔎 Explore Business Topics
        </h2>
        <div className="flex gap-4">
          {visibleTopics.map((topic, idx) => (
            <div
              key={idx}
              className="inline-block bg-indigo-50 text-indigo-700 rounded-full px-5 py-2 font-semibold shadow-sm cursor-pointer hover:bg-indigo-100 transition"
            >
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* Business ideas list */}
      <section className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {filteredIdeas.length === 0 ? (
          <p className="text-center text-red-500 mt-6 col-span-full">
            No business ideas found. Try different keywords.
          </p>
        ) : (
          filteredIdeas.map((idea, idx) => (
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
          ))
        )}
      </section>
    </div>
  );
};

export default Business;
