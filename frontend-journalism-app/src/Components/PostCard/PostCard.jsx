import { Card } from 'antd';
import React from 'react';
const { Meta } = Card;

const PostCard = (props) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="post" src={`https://gateway.pinata.cloud/ipfs/${props.postData.imageCID}`} />}
  >
    <Meta title={props.postData.captionText} description={"#" + props.postData.userName} />
  </Card>
);

export default PostCard;