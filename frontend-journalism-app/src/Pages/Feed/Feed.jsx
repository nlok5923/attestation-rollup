import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "./Feed.css";

const Feed = () => {
  const [post, setPost] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const _fetchPost = async () => {
    setIsLoad(true);
    // const data = await contract.getAllPosts();
    setPost([
      {
        title: "Dummy Title",
        content: "Dummy content for the post",
        image: "",
      },
      {
        title: "Another Dummy Title",
        content: "Another dummy content for the post",
        image: "",
      },
      {
        title: "Another Dummy Title",
        content: "Another dummy content for the post",
        image: "",
      },
      {
        title: "Another Dummy Title",
        content: "Another dummy content for the post",
        image: "",
      },
    ]); // Placeholder for fetched data
    setIsLoad(false);
  };

  useEffect(() => {
    _fetchPost(); // Fetch data on component mount
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="text-center mb-12">
          {/* <h1 className="text-4xl font-bold mb-4">True Journalism App</h1> */}
          <h1
            style={{
              fontSize: "3.25rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            True Journalism App
          </h1>
        </div>
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
