import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/createContext";
import "./readme.scss";
// import Image from "../../resource/ganjar.jpeg";
import Image2 from "../../resource/placeholder.jpeg";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import Alert from "@mui/material/Alert";

const Readme = () => {
  const [postData, setPostData] = useState({});
  const [postDataComments, setPostDataComments] = useState([]);
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(DarkModeContext);
  const { pathname } = useLocation();
  const location = pathname.split("/")[2];

  const handleComment = async (e) => {
    e.preventDefault();
    const commentData = {
      commentId: postData?.id || location,
      comment: comment,
      commentDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    await axios.post("/comments", commentData);
    setComment("");
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/posts/${location}`);
      setPostData(res.data);
      // console.log(postData);
    };
    fetchData();
  }, [location, postData]);

  useEffect(() => {
    const fetchDataComment = async () => {
      const res = await axios.get(`/comments/${location}`);
      setPostDataComments(res.data);
      // console.log(res.data);
    };

    fetchDataComment();
  }, [postDataComments, location]);

  const { currentMode } = useContext(DarkModeContext);
  return (
    <div className={`readme ${currentMode && "dark"}`}>
      <div className="readmeContainer">
        <div className="imageContainer">
          <img
            src={`../upload/${postData.postImg}` || Image2}
            alt="imageContainer"
          />
        </div>
        <div className="writer">
          <img src={postData.writerImg} alt="writerPhoto" />
          <div className="writerInfo">
            <p className="username">{postData.writername}</p>
            <p className="date">Published {moment(postData.date).fromNow()}</p>
          </div>
          {currentUser && (
            <div
              className="buttonAction"
              style={{
                display: currentUser.id === postData.userid ? "flex" : "none",
              }}>
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
            </div>
          )}
        </div>
        <div className="writerContent">
          <h1 className="title">{postData.title}</h1>
          <div className="writerMainContent">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postData.description),
              }}></div>
          </div>
        </div>

        <div className="commentSection">
          {currentUser && (
            <div className="user">
              <img src={currentUser.img} alt="userIMage" />
              <p>{currentUser.username}</p>
            </div>
          )}
          <p>
            {postDataComments
              ? `${postDataComments.length} comment${
                  postDataComments.length > 1 && "s"
                }`
              : "There is no comment yet"}
          </p>
          <form className="formComment">
            <input
              type="text"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={currentUser ? false : true}
              onClick={handleComment}>
              Submit
            </button>
          </form>

          <div className="listComments">
            {postDataComments ? (
              postDataComments?.map((data) => (
                <div className="userComment" key={data.id}>
                  <img src={data.img} alt={data.username} />
                  <div className="commentInfo">
                    <div className="userCommentInfo">
                      <span className="name">@{data.username}</span>
                      <span className="date">
                        {moment(data.commentDate).fromNow()}
                      </span>
                    </div>
                    <p className="comment">{data.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <Alert severity="info">There is no comment yet</Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readme;
