import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";
import Review from "../../components/Review/Review";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loading from "../../components/Loading/Loading";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";

const GamePage = ({ setAlert }) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/id/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const json = await response.json();
        setGameDetails(json);
      } catch (error) {
        console.error("Error fetching game:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("JWT token:", token);
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ gameId: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to add game to wishlist");
      }
      setAlert("Game added to wishlist successfully!", "success");
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
      setAlert("Failed to add game to wishlist", "danger");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : gameDetails ? (
        <div>
          <div className="container" id="bigcontainer">
            <div id="cover">
              <img
                src={gameDetails.game_background_image}
                width="550"
                height="590"
                alt="Game Background"
              />
              <div className="covertags">
                <div className="tag-container field-name">
                  ESRB Rating:
                  <span className="tags">
                    <span className="tag">
                      <span className="name">
                        {gameDetails.game_esrb || "Not Rated"}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="tag-container field-name">
                  Rating:
                  <span className="tags">
                    <span className="tag">
                      <span className="name">
                        {gameDetails.game_rating
                          ? `${gameDetails.game_rating} / 5`
                          : "Not Rated"}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div id="info-block">
              <div id="info">
                <h1 className="title">
                  <span className="">{gameDetails.game_name}</span>
                </h1>

                <section id="tags">
                  <div className="tag-container field-name">
                    Genres:
                    <span className="tags">
                      {gameDetails.game_genres.map((genre, index) => (
                        <span key={index} className="tag">
                          <span className="name">{genre}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="tag-container field-name">
                    Platforms:
                    <span className="tags">
                      {gameDetails.game_platforms.map((platform, index) => (
                        <span key={index} className="tag">
                          <span className="name">{platform}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="tag-container field-name">
                    Tags:
                    <span className="tags">
                      {gameDetails.game_tags.map((tag, index) => (
                        <span key={index} className="tag">
                          <span className="name">{tag}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="tag-container field-name">
                    <span className="tags">
                      Release Date: {gameDetails.game_released.substring(0, 10)}
                    </span>
                  </div>
                </section>

                <div className="buttons">
                  <a className="btn btn-primary btn-disabled tooltip">
                    <button onClick={handleAddToWishlist}>
                      Add to wishlist
                    </button>
                    <div className="top">
                      You need to log in to add to Wishlist!<i></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container" id="bigcontainer">
            <h2 className="d">Discription</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus tempore sunt dignissimos eligendi, iusto recusandae
              sequi fugit adipisci inventore et voluptatum, ab illo consequatur
              eius architecto sit quia ex vero.
            </p>
          </div>

          <div className="container-reviews">
            <Review gameId={id} />
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default connect(null, { setAlert })(GamePage);
