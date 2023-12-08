import React, { useState, useContext } from "react"
import { useEffect } from "react";
// import Identicon from 'react-identicons';
// import { UserContext } from "../../Provider/contractProvider";
// import Loader from "../../Components/Loader/Loader";
import { Card } from 'antd';
import './Feed.css'

const Feed = () => {
    const { Meta } = Card;
    // const contractData = useContext(UserContext);
    // const { contract, address } = contractData;
    const [post, setPost] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    const _fetchPost = async () => {
        setIsLoad(true);
        // const data = await contract.getAllPosts();
        setIsLoad(false);
    }

    useEffect(() => {
        setPost([1,2,3,4,5]);
    }, [])

    return (
        <div>
            <h1>Journalism App</h1>
                <div className="feed">
                {
                    post.map((data, id) => {
                        return(
                            <Card
                            key = {id}
                            style={{
                                width: 700,
                            }}
                            className="card"
                            cover={
                                <img
                                    alt="example"
                                    src={`https://picsum.photos/200/300`}
                                />
                            }
                            extra={<a href="#">Truth</a>}
                        >
                            <h1> Card heading</h1>
                            <p> Card content</p>
                        </Card>
                           
                        )
                    })
                }
                </div>
        </div>
    )
}

export default Feed;