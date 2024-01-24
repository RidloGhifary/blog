import React, { useContext } from "react";
import "./home.scss";
import { DarkModeContext } from "../../context/createContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentMode } = useContext(DarkModeContext);

  const posts = [
    {
      id: 1,
      title: "Material UI - Overview",
      description:
        "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
      image:
        "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
    },
    {
      id: 2,
      title: "Material UI - Overview",
      description:
        "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
      image:
        "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
    },
    {
      id: 3,
      title: "Material UI - Overview",
      description:
        "Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.",
      image:
        "https://images.pexels.com/photos/19626268/pexels-photo-19626268/free-photo-of-modern-building-facade.jpeg",
    },
  ];

  return (
    <div className={`home ${currentMode && "dark"}`}>
      <div className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <img src={post.image} alt={post.title} />
              <Link className="title" to={`/readme/${post.id}`}>
                {post.title}
              </Link>
              <p>{post.description}</p>
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
