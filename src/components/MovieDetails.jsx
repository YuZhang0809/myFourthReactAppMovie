import { useEffect } from "react"
import { useState } from "react"
import { fetchDetail } from "../services/api"

export function MovieDetails({movieID, onBack}) {

    const ImgBaseURL = 'https://image.tmdb.org/t/p/w500';
    const [MovieDetail,setMovieDetail] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[error, setError] = useState(null)

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
    }
    ,[movieID])

    return (
        <div className="movie-details">
        <button onClick={onBack}>Go Back</button>
        {isLoading && <p>正在加载中...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && 
            <div>
                <title>Title : {MovieDetail.original_title}</title>
                <p>Detail : {MovieDetail.overview}</p>
                <img src={ImgBaseURL + MovieDetail.poster_path}/>
            </div>
            }
        </div>
    )
}