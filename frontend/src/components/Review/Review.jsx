import React, { useState, useEffect } from "react";
import "./Review.css";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { filterBadWords } from "../../utils/bannedWords";

const Review = ({ gameId, setAlert }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/game/${gameId}`);
      const filteredReviews = response.data.map((review) => ({
        ...review,
        body: filterBadWords(review.body),
      }));
      setReviews(filteredReviews);
    } catch (error) {
      setAlert("Error fetching reviews!", "danger");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewBody.trim()) {
      setAlert("Review body cannot be empty.", "warning");
      return;
    }
    try {
      const filteredReviewBody = filterBadWords(reviewBody);
      const response = await axios.post(`/api/reviews/game/${gameId}`, {
        body: filteredReviewBody,
        rating: reviewRating,
      });
      setReviewBody("");
      setReviewRating(5);
      setReviews(
        response.data.map((review) => ({
          ...review,
          body: filterBadWords(review.body),
        }))
      );
      setAlert("Review submitted successfully!", "success");
    } catch (error) {
      setAlert("Error posting review!", "danger");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `/api/reviews/game/${gameId}/${reviewId}`
      );
      setReviews(
        response.data.map((review) => ({
          ...review,
          body: filterBadWords(review.body),
        }))
      );
      setAlert("Review deleted successfully!", "success");
    } catch (error) {
      setAlert("Failed to delete review!", "danger");
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
          <h3 className="Reviews">Reviews</h3>
          {reviews.map((review) => (
            <div key={review._id} className="review">
              <p>
                <strong>{review.author.name}</strong>: {review.body}{" "}
                <FontAwesomeIcon icon={faStar} /> {review.rating}/5
              </p>
              {isAuthenticated && user && user._id === review.author._id && (
                <button
                  className="delete"
                  onClick={() => handleDeleteReview(review._id)}
                >
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

export default connect(null, { setAlert })(Review);
