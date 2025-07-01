import { useState, useEffect } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { searchMovies, fetchPopular } from "./services/api";
import { MovieList } from "./components/MovieList";
import { MovieDetails } from "./components/MovieDetails"
import { getWatchlist } from "./services/storage";


function App() {

const[searchItem, setSearchItem] = useState(null)
const[movies, setMovies] = useState([])
const[isLoading, setIsLoading] = useState(false)
const[error, setError] = useState(null)
const[selectedMovie, setSelectedMovie] = useState(null)
const[page, setPage] = useState(1)
const[totalPage, setTotalPage] = useState(1)
const[isLoadingMore, setIsLoadingMore] = useState(false)
const[viewMode, setViewMode] = useState('all')
const[watchList, setWatchList] = useState([])

const handleSelectMovie = (movieID) => {setSelectedMovie(movieID)}
const handleBackToList = () => {setSelectedMovie(null)}

useEffect(() =>{ 
const fetchPop = async() => {
  setIsLoading(true)
  setError(null)
  try {
    const data = await fetchPopular()
    setMovies(data.results)
  } catch (error) {
    console.error('API Error:', error.message); 
    setError(error.message)
  }
  finally{
    setIsLoading(false)
  }
}
fetchPop()
}
, [])

const handleMore = async (searchItem, page) => {
  setIsLoadingMore(true)
  setError(null)

  try {
    const data = await searchMovies(searchItem, page + 1)
    setMovies([...movies,...data.results])
    setPage(prevPage => prevPage + 1)
  } catch (error) {
    console.error('API Error:', error.message);
    setError(error.message)
  }
  finally{
    setIsLoadingMore(false)
  }

}


const handleSearch = async (searchItem) => {
  setPage(1)
  setIsLoading(true)
  setError(null)
  setSearchItem(searchItem)

  try {
    const data = await searchMovies(searchItem)
    setMovies(data.results || [])
    setTotalPage(data.total_pages || 1)
  } catch (error) {
    console.error('API Error:', error.message);
    setError(error.message)
  }
  finally{
    setIsLoading(false)
  }

}

const hanldWatchList = () => {
  setError(null)
  setIsLoading(true)
  if (viewMode === 'all'){
    try {
      setWatchList(getWatchlist())
      setViewMode('watchlist')
    } catch (error) {
      setError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  else{
    setViewMode('all')
    setIsLoading(false)
  }
}

  return (
    <div>
      <h1>电影搜索</h1>
      <header>
        <SearchBar onSearch={handleSearch}/>
      </header>
      <main>
        {viewMode === 'all'?
                <div>
                <div className="header-actions">
                  <button onClick={hanldWatchList} className="btn btn-secondary">我的收藏</button>
                </div>
                {error && <p>出错了: {error}</p>}
                {!isLoading && !error && !selectedMovie && movies.length === 0 && <p>输入关键词搜索电影吧！</p>}
                {!isLoading && !error && !selectedMovie && movies.length > 0 && <MovieList movies={movies} onMovieClick={handleSelectMovie}/>}
                {!isLoading && !error && selectedMovie && <MovieDetails movieID={selectedMovie} onBack={handleBackToList}/>}
                {page < totalPage && <button onClick={() => handleMore(searchItem, page)} className="btn btn-secondary load-more-btn">加载更多</button>}
                {isLoadingMore && <p>正在加载更多...</p>} 
                </div>
                :
                <div>
                <div className="header-actions">
                  <button onClick={hanldWatchList} className="btn btn-secondary">搜索结果/热门数据</button>  
                </div>
                {!isLoading && !error && watchList.length === 0 && <p>暂无收藏，去添加吧</p>}
                {!isLoading && !error && watchList.length > 0 && <MovieList movies={watchList} />}
                </div>
        }
      </main>
    </div>
  )
}

export default App
