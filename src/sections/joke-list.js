import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { loadingJokes } from '../redux/slices/jokes.slice';
import '../styles/joke-list.scss';

export default function JokeList({ jokes, setSelectedTag, selectedTag, loading, searchKey }) {
    
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (jokes && !categories.length) {
            let categories = jokes.reduce((val, cur, index) => [...val, ...cur.categories], []);
            categories = categories.filter((value, index, self) => self.indexOf(value) === index);
            categories = categories.map(e => e.substr(0, 1).toUpperCase() + e.substr(1));
            setCategories(categories);
        }
    }, [jokes])

    const handleonClick = (e) => {
        setPage(1);
        if (e === selectedTag) {
            setSelectedTag('');
        } else {
            setSelectedTag(e);
        }
    }

    const handleViewJoke = (id) => {
        navigate(`/details/${id}`)
    }

    return (
        <div className="joke-list">
            <div className='category-selection'>
                <h3>Categories:</h3>
                <div className='category-list'>
                    {
                        categories.map(e =>
                            <button onClick={() => handleonClick(e)} className={selectedTag === e ? 'active' : ''}>
                                {e}
                                <img src='/icons/check.png' />
                            </button>
                        )
                    }
                </div>
            </div>
            <div className='jokes-container'>
                {
                    selectedTag || searchKey ? null :
                        <>
                            <h4 className='section-title'>TOP 5 JOKES THIS WEEK</h4>
                            <div className='joke-cards'>
                                {
                                    !loading && jokes?.slice(0, 5).map(e =>
                                        <div className='joke-card'>
                                            <div className='joke-card-content'>
                                                <h4>{e.categories[0] ?? 'Uncategorized'}</h4>
                                                <p>{e.value}</p>
                                                {/* <div className='tags'>
                                        <span className='tag'>Tag 1</span>
                                    </div> */}
                                            </div>
                                            <div className="joke-card-footer">
                                                <button onClick={() => handleViewJoke(e.id)}>Go <img className='go-icon' src="/icons/right-arrow.png" /></button>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    loading ?
                                        <>
                                            <div className='joke-card joke-card-skeleton'>
                                                <div className='joke-card-content'>
                                                    <div className='skeleton-title'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                </div>
                                                <div className='joke-card-footer'>
                                                    <div className='skeleton-btn'></div>
                                                </div>
                                            </div>
                                            <div className='joke-card joke-card-skeleton'>
                                                <div className='joke-card-content'>
                                                    <div className='skeleton-title'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                </div>
                                                <div className='joke-card-footer'>
                                                    <div className='skeleton-btn'></div>
                                                </div>
                                            </div>
                                            <div className='joke-card joke-card-skeleton'>
                                                <div className='joke-card-content'>
                                                    <div className='skeleton-title'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                    <div className='skeleton-text'></div>
                                                </div>
                                                <div className='joke-card-footer'>
                                                    <div className='skeleton-btn'></div>
                                                </div>
                                            </div>
                                        </>
                                        : null
                                }
                            </div>
                        </>
                }
                <h4 className='section-title'>
                    {
                        selectedTag ? `Category: ${selectedTag}` : searchKey ? `Search Results: ${searchKey}` : 'All Jokes'
                    }
                </h4>
                {
                    jokes?.length || loading ?
                        <div className='joke-cards'>
                            {
                                !loading && jokes?.slice(((page - 1) * 9), (page * 9)).map(e =>
                                    <div className='joke-card'>
                                        <div className='joke-card-content'>
                                            <h4>{e.categories[0] ?? 'Uncategorized'}</h4>
                                            <p>{e.value}</p>
                                            {/* <div className='tags'>
                                        <span className='tag'>Tag 1</span>
                                    </div> */}
                                        </div>
                                        <div className="joke-card-footer">
                                            <button onClick={() => handleViewJoke(e.id)}>Go <img className='go-icon' src="/icons/right-arrow.png" /></button>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                loading ?
                                    <>
                                        <div className='joke-card joke-card-skeleton'>
                                            <div className='joke-card-content'>
                                                <div className='skeleton-title'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                            </div>
                                            <div className='joke-card-footer'>
                                                <div className='skeleton-btn'></div>
                                            </div>
                                        </div>
                                        <div className='joke-card joke-card-skeleton'>
                                            <div className='joke-card-content'>
                                                <div className='skeleton-title'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                            </div>
                                            <div className='joke-card-footer'>
                                                <div className='skeleton-btn'></div>
                                            </div>
                                        </div>
                                        <div className='joke-card joke-card-skeleton'>
                                            <div className='joke-card-content'>
                                                <div className='skeleton-title'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                                <div className='skeleton-text'></div>
                                            </div>
                                            <div className='joke-card-footer'>
                                                <div className='skeleton-btn'></div>
                                            </div>
                                        </div>
                                    </>
                                    : null
                            }
                        </div> : null
                }
                {
                    jokes?.length ?
                        <div className='pagination'>
                            {
                                page === 1 ?
                                    <div className='fullWidth'>
                                        {/* <span></span> */}
                                    </div>
                                    : <div className='fullWidth'>
                                        <button onClick={() => setPage(page - 1)}><img src='/icons/back.png' /> Prev</button>
                                    </div>
                            }
                            {
                                jokes ?
                                    <div className='page-indicator'>
                                        {`Page ${page} of ${Math.ceil(jokes.length / 9)}`}
                                    </div>
                                    : null
                            }
                            {
                                page >= (jokes?.length / 9) ?
                                    <div className='fullWidth'>
                                        <span></span>
                                    </div>
                                    : <div className='next-btn'>
                                        <button onClick={() => setPage(page + 1)}>Next <img src='/icons/Next.png' /></button>
                                    </div>
                            }
                        </div> :
                        <>
                            {
                                !loading ?
                                    <h5 align="center">No jokes found for you.</h5>
                                    : null
                            }
                        </>
                }
            </div>
        </div>
    )
}