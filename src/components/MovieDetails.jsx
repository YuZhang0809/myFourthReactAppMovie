import { useState, useEffect } from "react"
import { fetchDetail } from "../services/api"
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "../services/storage";

export function MovieDetails({movieID, onBack}) {

    const ImgBaseURL = 'https://image.tmdb.org/t/p/w500';
    const [MovieDetail,setMovieDetail] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[error, setError] = useState(null)
    const[inWatchList, setInWatchList] = useState(false)

    useEffect(() =>{
            const fetchData = async() => {
            setIsLoading(true)
            try {
                const data = await fetchDetail(movieID)                
                setMovieDetail(data || {})  
            } catch (error) {
                console.error('API Error:', error.message);
                setError(error.message)    
            }
            finally{
                setIsLoading(false)
            }
            
        }
    fetchData()
    setInWatchList(isInWatchlist(movieID))
    }
    ,[movieID])

    function handleClickWatchList() {
        if (inWatchList) {
            removeFromWatchlist(movieID)
            setInWatchList(false)           
        }
        else{
            addToWatchlist(MovieDetail)
            setInWatchList(true)
        }
    }

    return (
        <div className="movie-details">
        <div className="detail-actions">
          <button onClick={onBack} className="btn btn-secondary">Go Back</button>
          {inWatchList?
            <button onClick={handleClickWatchList} className="btn btn-danger">Remove from watch list</button>
            :
            <button onClick={handleClickWatchList} className="btn btn-primary">Add to watch list</button>
          }
        </div>
        {isLoading && <p>正在加载中...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && 
            <div>
                <h2>Title : {MovieDetail.original_title}</h2>
                <p>Detail : {MovieDetail.overview}</p>
                <img src={ImgBaseURL + MovieDetail.poster_path} alt={MovieDetail.original_title}/>
            </div>
            }
        </div>
    )
}