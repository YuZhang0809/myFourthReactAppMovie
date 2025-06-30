function getWatchlist() {
    const storedWatchList = localStorage.getItem('watchList')   
    let value = []
    if (storedWatchList) {
        try {
            value = JSON.parse(storedWatchList)
        } catch (error) {
            console.error("解析 localStorage 中的电影列表失败:", error);
            value = []
        }
    }
    return value
}

function addToWatchlist(movie) {
    const currentList = getWatchlist()
    if (!(isInWatchlist(movie.id))) {
        try {
            const updatedList = [...currentList,movie]
            localStorage.setItem('watchList',JSON.stringify(updatedList))
        } catch (error) {
            console.error("添加电影到待看清单失败:", error);
        }
    }
    else{
        return
    }
}

function removeFromWatchlist(movieId) {  
    const currentList = getWatchlist(); // 复用现有函数
    const updatedList = currentList.filter(movie => movie.id !== movieId);
    
    // 只有在列表真的发生变化时才保存
    if (updatedList.length !== currentList.length) {
        try {
            localStorage.setItem('watchList', JSON.stringify(updatedList));
        } catch (error) {
            console.error("从待看清单移除电影失败:", error);
        }
    }
}

function isInWatchlist(movieId){
    const currentList = getWatchlist()
    try {
        return !!currentList.find((movie) => movie.id === movieId) || false
    } catch (error) {
        console.error("检查电影是否在待看清单中失败::", error);
        return false
    }
}

export { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };