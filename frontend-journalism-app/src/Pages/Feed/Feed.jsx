import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Card } from "antd";
import "./Feed.css";

import img1 from "../../data/img-1.jpeg";
import img2 from "../../data/img-2.jpeg";
import img3 from "../../data/img-3.jpeg";
import img4 from "../../data/img-4.jpeg";

const Feed = () => {
  const [post, setPost] = useState([]);
  const [content, setContent] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [img, setImg] = useState("");
  const [uuid, setUuid] = useState("");

  const _fetchPost = async () => {
    setIsLoad(true);
    // const data = await contract.getAllPosts();
    setPost([
      {
        title: "Hackers",
        content:
          "A look into the world of ethereum and the role it played in the success of ETH India 2023.",
        image: img1,
      },
      {
        title: "The venue",
        content:
          "A detailed overview of the venue that hosted the grand ETH India 2023 hackathon.",
        image: img2,
      },
      {
        title: "Close to the finish line",
        content:
          "The nail-biting final stages of the ETH India 2023 hackathon and the intensity it brought to the participants.",
        image: img3,
      },
      {
        title: "ETH India",
        content:
          "A comprehensive recap of the highlights and key takeaways from the ETH India 2023 hackathon.",
        image: img4,
      },
    ]); // Placeholder for fetched data
    setIsLoad(false);
  };
  const _fetchData = async () => {
    const data = await axios.get('https://094c-44-192-50-105.ngrok-free.app/',
    {
      headers: {
        "ngrok-skip-browser-warning": "true" 
      }
    });
    console.log(data.data);
    setContent(data.data);
    setImg(data.data.contentState[data.data.contentState.length - 1].updatedContent);
    setUuid(data.data.contentState[data.data.contentState.length - 1].uuid);
  }

  useEffect(() => {
    _fetchPost(); // Fetch data on component mount
    _fetchData();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="text-center mb-12">
          <h1
            style={{
              fontSize: "3.25rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Citizen Journalism App
          </h1>
        </div>
        <Card className="w-full">
                <img
                  alt=""
                  className="w-full h-48 object-cover"
                  height="200"
                  src={'data:image/png;base64,' + img}
                  style={{
                    aspectRatio: "350/200",
                    objectFit: "cover",
                  }}
                  width="350"
                />
                <div>
                  <div className="flex items-center mt-4 mb-2">
                    <h2 className="text-lg font-semibold">Latest Image</h2>
                  </div>
                  <p className="text-gray-600 text-left">From Pixel Police Mobile App</p>
                </div>
                <div className="flex justify-end mt-6">
                <a href={`https://pixel-police-history-explorer.vercel.app/${uuid}`}>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    View History
                  </button>
                </a>
                </div>
          </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {post.map(
            (
              item,
              index // Render from post state
            ) => (
              <Card key={index} className="w-full">
                <img
                  alt=""
                  className="w-full h-48 object-cover"
                  height="200"
                  src={item.image}
                  style={{
                    aspectRatio: "350/200",
                    objectFit: "cover",
                  }}
                  width="350"
                />
                <div>
                  <div className="flex items-center mt-4 mb-2">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                  </div>
                  <p className="text-gray-600 text-left">{item.content}</p>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    View History
                  </button>
                </div>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
