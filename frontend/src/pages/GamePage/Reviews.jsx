import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Reviews.css';

const Reviews = ({ gameId, isAuthenticated }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewBody, setReviewBody] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [error, setError] = useState('');
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchReviews();
    }, [gameId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/games/review/${gameId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error.response.data.message);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewBody.trim()) {
            setError('Review body cannot be empty.');
            return;
        }
        // Remove or adjust this check based on your actual ID format
        // if (!gameId.match(/^[0-9a-fA-F]{24}$/)) {
        //     setError('Invalid game ID');
        //     return;
        // }
        try {
            const response = await axios.post(`/api/games/review/${gameId}`, {
                body: reviewBody,
                rating: reviewRating
            });
            setReviewBody('');
            setReviewRating(5);
            fetchReviews(); // Reload reviews
            setError('');
        } catch (error) {
            setError(error.response.data.message || 'Error posting review');
            console.error('Error posting review:', error.response.data.message);
        }
    };


    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`/api/games/review/${gameId}/${reviewId}`);
            fetchReviews(); // Reload reviews
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.msg
                ? error.response.data.msg
                : 'Error deleting review';
            console.error('Error deleting review:', errorMessage);
        }
    };



    return (
        <div className="reviews-container">
            {isAuthenticated && (
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <textarea value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} placeholder="Write your review here..."></textarea>
                    <div>Rate It:</div>
                    <select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}>
                        {[1, 2, 3, 4, 5].map(rating => <option key={rating} value={rating}>{rating}</option>)}
                    </select>
                    <button type="submit">Submit Review</button>
                </form>
            )}
            <h3>Reviews</h3>
            {error && <div className="error-message">{error}</div>}
            {reviews.map(review => (
                <div key={review._id} className="review">
                    <p><strong>{review.author.name}</strong>: {review.body} - {review.rating}/5</p>
                    {isAuthenticated && user._id === review.author._id && (
                        <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Reviews);
