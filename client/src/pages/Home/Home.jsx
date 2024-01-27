import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import { DarkModeContext } from "../../context/createContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import DOMPurify from "dompurify";

const Home = () => {
  const { currentMode } = useContext(DarkModeContext);
  const [dataPosts, setDataPosts] = useState([]);
  const [error, setError] = useState("");
  const { search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${search}`);
        setDataPosts(res.data);
        // console.log(res.data);
      } catch (err) {
        setError(err.message);
        // console.log(err);
      }
    };

    fetchData();
  }, [search, dataPosts]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Material UI - Overview",
  //     description:
  //       "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
  //     image:
  //       "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
  //   },
  //   {
  //     id: 2,
  //     title: "Material UI - Overview",
  //     description:
  //       "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
  //     image:
  //       "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
  //   },
  //   {
  //     id: 3,
  //     title: "Material UI - Overview",
  //     description:
  //       "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
  //     image:
  //       "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
  //   },
  // ];

  return (
    <div className={`home ${currentMode && "dark"}`}>
      <div className="container">
        <div className="posts">
          {error ||
            (dataPosts && dataPosts.length === 0 && (
              <Alert severity="error">{error || "No data available"}</Alert>
            ))}
          {dataPosts?.map((post) => (
            <div className="post" key={post.id}>
              <img src={`../upload/${post.postImg}`} alt={post.title} />
              <Link className="title" to={`/readme/${post.id}`}>
                {post.title}
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description),
                }}></div>
              <Link to={`/readme/${post.id}`} className="button">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
