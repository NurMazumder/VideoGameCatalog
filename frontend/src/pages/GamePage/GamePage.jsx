import React, { useState, useEffect } from "react";
import "./GamePage.css";
import { useParams } from "react-router-dom";
import Review from "../../components/Review/Review";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loading from "../../components/Loading/Loading";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const GamePage = ({ setAlert }) => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/id/${id}`);
        const json = await response.json();
        setGameDetails(json);
      } catch (error) {
        setAlert("Failed fetching game details.", "danger");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ gameId: id }),
      });
      if (response.status === 200) {
        setAlert("Game added to wishlist successfully!", "success");
      } else {
        setAlert(
          "User must be logged in and not have the game already added to their list.",
          "warning"
        );
      }
    } catch (error) {
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
                <div className="tag-container field-name">
                  Release Date:
                  <span className="tags">
                    <span className="tag">
                      <span className="name">
                        {gameDetails.game_released.substring(0, 10)}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="tag-container field-name">
                  Website Link:
                  <span className="tags">
                    <span className="tag">
                      <Link to={gameDetails.game_website} className="name">
                        {gameDetails.game_website}
                      </Link>
                    </span>
                  </span>
                </div>
                <div className="tag-container field-name">
                  Source of data:{" "}
                  <Link
                    to="https://rawg.io/apidocs"
                    className="tag"
                    id="rawg-link"
                  >
                    https://rawg.io/apidocs
                  </Link>
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
                </section>
                <div className="buttons">
                  <a className="btn btn-primary btn-disabled tooltip">
                    <button onClick={handleAddToWishlist}>
                      Add to wishlist
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container" id="bigcontainer">
            <h2 className="desc">Description</h2>
            <p>{gameDetails.game_description}</p>
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
