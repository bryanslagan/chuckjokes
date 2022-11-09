import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dislikeJoke, getJokeInterractions, likeJoke, undislikeJoke, unlikeJoke } from "../redux/actions/jokes.actions";
import '../styles/joke-details.scss';

export default function JokeDetails({ jokes }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [joke, setJoke] = useState();
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);

    useEffect(() => {
        setLikesAndDislikes();
    }, [])

    useEffect(() => {
        setJoke(jokes?.filter(e => e.id == id)[0])
    }, [jokes])

    const handlePrevious = () => {
        const index = jokes.findIndex((e) => e.id == joke.id)
        const prevId = jokes[index - 1].id;
        navigate(`/details/${prevId}`)
        window.location.reload();
    }

    const handleNext = () => {
        const index = jokes.findIndex((e) => e.id == joke.id)
        const nextId = jokes[index + 1].id;
        navigate(`/details/${nextId}`)
        window.location.reload();
    }

    const setLikesAndDislikes = () => {
        const { likedJokes, dislikedJokes } = getJokeInterractions(joke?.id);
        console.log(likedJokes, dislikedJokes);
        setLiked(likedJokes);
        setDisliked(dislikedJokes);
    }

    const handleLike = () => {
        likeJoke(joke?.id);
        setLikesAndDislikes();
    }

    const handleDislike = () => {
        dislikeJoke(joke?.id);
        setLikesAndDislikes();
    }

    console.log(joke);
    return (
        <div className="joke-container">
            <div className="navigation">
                <button onClick={() => navigate('/')}>
                    <img src="/icons/left-arrow.png" />
                    Back
                </button>
                <div className="joke-nav">
                    {
                        jokes && jokes?.findIndex((e) => e.id == joke?.id) ?
                            <button onClick={handlePrevious}>
                                <img src="/icons/left-arrow.png" />
                                Previous
                            </button> : null
                    }
                    {
                        jokes && jokes?.findIndex((e) => e.id == joke?.id) != (jokes?.length - 1) ?
                            <button onClick={handleNext}>
                                Next
                                <img src="/icons/right-arrow.png" />
                            </button> : null
                    }
                </div>
            </div>
            {
                joke ?
                    <div className="joke-details">
                        <h3>{joke?.categories[0]?.substr(0, 1).toUpperCase() + joke?.categories[0]?.substr(1) ?? "Uncategorized"}</h3>
                        <p>Posted on {(new Date(joke?.created_at)).toDateString()}</p>
                        <p>{joke?.value}</p>
                        <div className="actions">
                            <button onClick={handleLike}>{liked[joke?.id] ?? 0} Like <img src="/icons/hand.png" /></button>
                            <button onClick={handleDislike}>{disliked[joke?.id] ?? 0} Dislike <img src="/icons/hand-copy.png" /></button>
                        </div>
                    </div> :
                    <div className="joke-details">
                        <div className="skeleton-title"></div>
                        <div className="flex-col flex-gap-1">
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                        </div>
                        <div className="actions">
                            <div className="skeleton-button"></div>
                            <div className="skeleton-button"></div>
                        </div>
                    </div>
            }
        </div>
    )
}