import React, { useState, useEffect } from 'react';
import axios from 'axios';

const learningPlatforms = [
  { name: "W3Schools", logo: "https://www.w3schools.com/images/w3schools_logo_436_2.png", url: "https://www.w3schools.com/" },
  { name: "JavaTpoint", logo: "https://static.javatpoint.com/images/logo/jtp_logo.png", url: "https://www.javatpoint.com/" },
  { name: "TutorialsPoint", logo: "https://www.tutorialspoint.com/images/logo.png", url: "https://www.tutorialspoint.com/" },
  { name: "GeeksforGeeks", logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/logo.png", url: "https://www.geeksforgeeks.org/" },
  { name: "Coursera", logo: "https://about.coursera.org/static/whiteCourseraIcon-98f39f3f59c204a9e3f2f01ab80a02d5.svg", url: "https://www.coursera.org/" },
  { name: "Udemy", logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg", url: "https://www.udemy.com/" },
  { name: "YouTube", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", url: "https://www.youtube.com/" },
  { name: "edX", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/EdX.svg", url: "https://www.edx.org/" },
  { name: "Khan Academy", logo: "https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png", url: "https://www.khanacademy.org/" },
  { name: "Pluralsight", logo: "https://www.pluralsight.com/etc.clientlibs/pluralsight/clientlibs/clientlib-base/resources/images/pluralsight-logo.png", url: "https://www.pluralsight.com/" },
  { name: "Simplilearn", logo: "https://www.simplilearn.com/ice9/new_logo.svgz", url: "https://www.simplilearn.com/" },
  { name: "Great Learning", logo: "https://media.licdn.com/dms/image/C560BAQF8ztp8WKuLlg/company-logo_200_200/0/1631361815810/great_learning_logo?e=2147483647&v=beta&t=Q_Hq9YvqV3AKkkx1kKDHDIevqRPQBoY_BzDn66q9IoY", url: "https://www.mygreatlearning.com/" },
];

const randomSkills = ['Python', 'Java', 'Machine Learning', 'Cybersecurity', 'Web Development', 'Cloud Computing', 'Data Science', 'AI', 'DevOps'];

const ITSkills = () => {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async (skillQuery) => {
      if (!skillQuery) return;
      setLoading(true);
      setError('');
      setSkills([]);

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(skillQuery)}+skills&language=en&apiKey=8d7266d2681742308fc8444f0484dee6`
        );
        setSkills(response.data.articles);
      } catch (err) {
        setError('The skills fetch encountered an error.');
      } finally {
        setLoading(false);
      }
    };

    const random = randomSkills[Math.floor(Math.random() * randomSkills.length)];
    setQuery(random);
    fetchSkills(random);
  }, []);

  // For Search button click
  const fetchSkills = async (skillQuery = query) => {
    if (!skillQuery) return;
    setLoading(true);
    setError('');
    setSkills([]);

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(skillQuery)}+skills&language=en&apiKey=8d7266d2681742308fc8444f0484dee6`
      );
      setSkills(response.data.articles);
    } catch (err) {
      setError('The skills fetch encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">💡 Search IT Skills</h1>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search skill (e.g., Python, Cloud)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-indigo-300 p-2 rounded w-full sm:w-2/3 shadow-sm"
        />
        <button
          onClick={() => fetchSkills()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow"
        >
          Search
        </button>
      </div>

      {/* Result Section */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4 mb-10">
        {skills.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md border">
            <h2 className="font-bold text-lg mb-2">{item.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{item.description}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>

      {/* Learning Platforms Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg mt-12">
        <h2 className="text-2xl font-semibold text-center text-purple-800 mb-6">
          🌐 Popular Learning Platforms
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {learningPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition duration-300 hover:bg-indigo-100"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="h-12 object-contain mb-2"
              />
              <p className="text-sm font-medium text-indigo-900 text-center">{platform.name}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ITSkills;
