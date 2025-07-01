import { useState } from "react"

export function SearchBar ({ onSearch }){
    const [searchItem, setSearchItem] = useState('')

    // useEffect(() => {console.log(searchItem)},[searchItem])

    const handleOnChange = (event) => {
        setSearchItem(event.target.value)
    }

    const handleSubmit = (event) => {
        // 1. 阻止表单提交时的默认刷新行为
        event.preventDefault()
        
        // 2. 调用从父组件传来的 onSearch 函数，并把当前 state 交出去
        onSearch(searchItem)
    }

    return(
        // 3. 将我们自己定义的 handleSubmit 函数作为事件处理器
        <form onSubmit={handleSubmit} className="search-form">
            <input 
                type="text" 
                placeholder="搜索电影..." 
                onChange={handleOnChange} 
                value={searchItem}
            />
            {/* 4. (最佳实践) 为按钮明确 type="submit" */}
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    )
}
