import React, { useContext } from "react";
import { DarkModeContext } from "../../context/createContext";
import "./readme.scss";
import Image from "../../resource/ganjar.jpeg";
import Image2 from "../../resource/placeholder.jpeg";

const Readme = () => {
  const { currentMode } = useContext(DarkModeContext);
  return (
    <div className={`readme ${currentMode && "dark"}`}>
      <div className="readmeContainer">
        <div className="imageContainer">
          <img src={Image2} alt="imageContainer" />
        </div>
        <div className="writer">
          <img src={Image} alt="writerPhoto" />
          <div className="writerInfo">
            <p className="username">John Doe</p>
            <p className="date">Published 2 minutes ago</p>
          </div>
          <div className="buttonAction">
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
        </div>
        <div className="writerContent">
          <h1 className="title">Lorem Ipsum doler sir amet</h1>
          <div className="writerMainContent">
            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?" 1914 translation by H. Rackham "But I must explain
            to you how all this mistaken idea of denouncing pleasure and
            praising pain was born and I will give you a complete account of the
            system, and expound the actual teachings of the great explorer of
            the truth, the master-builder of human happiness. No one rejects,
            dislikes, or avoids pleasure itself, because it is pleasure, but
            because those who do not know how to pursue pleasure rationally
            encounter consequences that are extremely painful. Nor again is
            there anyone who loves or pursues or desires to obtain pain of
            itself, because it is pain, but because occasionally circumstances
            occur in which toil and pain can procure him some great pleasure. To
            take a trivial example, which of us ever undertakes laborious
            physical exercise, except to obtain some advantage from it? But who
            has any right to find fault with a man who chooses to enjoy a
            pleasure that has no annoying consequences, or one who avoids a pain
            that produces no resultant pleasure?" Section 1.10.32 of "de Finibus
            Bonorum et Malorum", written by Cicero in 45 BC "Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
            ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
            in ea voluptate velit esse quam nihil molestiae consequatur, vel
            illum qui dolorem eum fugiat quo voluptas nulla pariatur?" 1914
            translation by H. Rackham "But I must explain to you how all this
            mistaken idea of denouncing pleasure and praising pain was born and
            I will give you a complete account of the system, and expound the
            actual teachings of the great explorer of the truth, the
            master-builder of human happiness. No one rejects, dislikes, or
            avoids pleasure itself, because it is pleasure, but because those
            who do not know how to pursue pleasure rationally encounter
            consequences that are extremely painful. Nor again is there anyone
            who loves or pursues or desires to obtain pain of itself, because it
            is pain, but because occasionally circumstances occur in which toil
            and pain can procure him some great pleasure. To take a trivial
            example, which of us ever undertakes laborious physical exercise,
            except to obtain some advantage from it? But who has any right to
            find fault with a man who chooses to enjoy a pleasure that has no
            annoying consequences, or one who avoids a pain that produces no
            resultant pleasure?"
          </div>
        </div>

        <div className="commentSection">
          <div className="user">
            <img src={Image} alt="userIMage" />
            <p>Jane Doe</p>
          </div>
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
