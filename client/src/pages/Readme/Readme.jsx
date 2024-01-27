import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/createContext";
import "./readme.scss";
import Image from "../../resource/ganjar.jpeg";
import Image2 from "../../resource/placeholder.jpeg";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";

const Readme = () => {
  const [postData, setPostData] = useState({});
  const { currentUser } = useContext(DarkModeContext);
  const { pathname } = useLocation();
  const location = pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/posts/${location}`);
      setPostData(res.data);
      // console.log(postData);
    };
    fetchData();
  }, [location, postData]);

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
          <p>10 comments</p>
          <form className="formComment">
            <input type="text" placeholder="Your Comment" />
            <button>Submit</button>
          </form>

          <div className="listComments">
            <div className="userComment">
              <img src={Image} alt="userImage" />
              <div className="commentInfo">
                <div className="userCommentInfo">
                  <span className="name">John Doe</span>
                  <span className="date">1 hari yang lalu</span>
                </div>
                <p className="comment">
                  Generate Lorem Ipsum placeholder text. Select the number of
                  characters, words, sentences or paragraphs, and hit generate!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readme;
