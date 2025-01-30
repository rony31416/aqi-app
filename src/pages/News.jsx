import { useEffect, useState } from "react";
import axios from "axios";

function NewsComponent() {
  const [news, setNews] = useState([]);
  const API_KEY = "YOUR_API_KEY"; // Replace with your actual GNews API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=AQI+Bangladesh&lang=en&country=bd&token=8c1cfddb0f8982b1cd14e977c2e3261c`
        );
        setNews(response.data.articles.slice(0, 10)); // Limit to 10 news items
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2>🔥 AQI Bangladesh News</h2>
      <div className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img src={article.image} alt="News" className="news-image" />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <button className="news-button">Show News</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsComponent;
