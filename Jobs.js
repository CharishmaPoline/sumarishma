import React, { useEffect, useState } from 'react';

const jobKeywords = [
  'software developer',
  'java developer',
  'web developer',
  'data analyst',
  'python developer',
  'salesforce',
  'ui developer',
  'cybersecurity analyst',
  'front end developer',
  'backend engineer'
];

const countries = ['India', 'USA', 'UK', 'Germany', 'Canada', 'Australia', 'Singapore'];

const jobTypes = ['fulltime', 'parttime', 'contractor'];
const timeFilters = ['1', '3', '7', '30']; // days

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    location: '',
    jobType: '',
    daysAgo: '',
  });

  const fetchJobs = async (isNewSearch = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const keywords = searchParams.keywords || getRandomFromArray(jobKeywords);
      const location = searchParams.location || getRandomFromArray(countries);
      const jobType = searchParams.jobType || '';
      const daysAgo = searchParams.daysAgo || '';

      let body = {
        keywords,
        location,
        page: isNewSearch ? 1 : page,
      };

      if (jobType) body.job_type = jobType;
      if (daysAgo) body.days_ago = daysAgo;

      const response = await fetch('https://jooble.org/api/37f27fdc-1a34-43f8-ad91-1b4846ea6704', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.jobs && data.jobs.length > 0) {
        if (isNewSearch) {
          setJobs(data.jobs);
          setPage(2);
        } else {
          setJobs((prev) => [...prev, ...data.jobs]);
          setPage((prev) => prev + 1);
        }
      } else if (isNewSearch) {
        setJobs([]);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        fetchJobs();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(1);
    fetchJobs(true);
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%)',
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 className="text-4xl font-extrabold mb-1 text-center drop-shadow-lg">
        🌍 Real-Time Global Jobs Feed
      </h1>
      <p className="text-center text-lg mb-8 italic drop-shadow-md">Summarishma — Your Job Search Companion</p>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-black">
        <input
          type="text"
          name="keywords"
          value={searchParams.keywords}
          onChange={handleChange}
          placeholder="Job Role (e.g. Java Developer)"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleChange}
          placeholder="Location (e.g. USA)"
          className="p-2 border rounded"
        />
        <select
          name="jobType"
          value={searchParams.jobType}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Job Type (All)</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="contractor">Contractor</option>
        </select>
        <select
          name="daysAgo"
          value={searchParams.daysAgo}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Posted Within (Days)</option>
          <option value="1">Last 1 day</option>
          <option value="3">Last 3 days</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white font-semibold rounded p-2 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 && !loading && (
          <p className="text-center col-span-full">No jobs found, try different filters or scroll for random jobs.</p>
        )}

        {jobs.map((job, index) => (
          <div
            key={index}
            className="border border-white rounded-xl p-4 bg-white bg-opacity-90 text-black shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-700">{job.company}</p>
            <p className="text-sm text-gray-800 mb-2">{job.location}</p>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Apply Now →
            </a>
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4 text-white">🔄 Loading more jobs...</p>}
    </div>
  );
};

export default Jobs;
