import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Review.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Review = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/games/review/${gameId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewBody.trim()) {
      setError("Review body cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(`/api/games/review/${gameId}`, {
        body: reviewBody,
        rating: reviewRating,
      });
      setReviewBody("");
      setReviewRating(5);
      setReviews(response.data);
      setError("");
    } catch (error) {
      setError("Error posting review");
      console.error("Error posting review:", error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `/api/games/review/${gameId}/${reviewId}`
      );
      setReviews(response.data);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Error deleting review";
      console.error("Error deleting review:", errorMessage);
    }
  };

  return (

    <div>

      {isAuthenticated ? (
        <div className="container" id="bigcontainer">
          <h3 className="r">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div>Rate It:</div>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
            <div>Comment:</div>
            <textarea
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>

            <button type="submit">Submit Review</button>
          </form>
        </div>

      ) : (
        <div className="container" id="bigcontainer">
          <h2 className="r">Post a Review</h2>
          <p className="prompt">
            Please <a href="/login">Log In</a> or{" "}
            <a href="/register">Sign Up</a> to submit a review.
          </p>
        </div>
      )}
      {reviews.length > 0 ? (

        <div className="container" id="bigcontainer">
          {error && <div className="error-message">{error}</div>}
          <h3 className="Reviews">Reviews</h3>
          {reviews.map((review) => (
            <div key={review._id} className="review">
              <p>
                <strong>{review.author.name}</strong>: {review.body}  <FontAwesomeIcon icon={faStar} />  {" "}
                {review.rating}/5
              </p>
              {isAuthenticated && user && user._id === review.author._id && (
                <button className="delete" onClick={() => handleDeleteReview(review._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="container" id="bigcontainer">
          <p>No reviews yet. Write one here!</p>
        </div>
      )}
    </div>
  );
};

export default Review;
