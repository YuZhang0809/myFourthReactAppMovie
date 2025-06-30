const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjIzZDZkZDY0NTE3OWIxZTEwM2VmZDQ3MGI0NzkxZiIsIm5iZiI6MTc1MDI4ODc4NS4xNDcsInN1YiI6IjY4NTM0OTkxYzdkYWVlMmVlNWMxMDAwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZbgB9oJw_uIQpX3bxOrpzvcCe04kkmxmoyUjBiLfIjA';
const BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query,page=1) {
  // 1. 使用 URL 和 URLSearchParams 来安全地构建 URL
  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.append('query', query);
  url.searchParams.append('page', page);
  // TMDB API 通常还需要其他参数，比如语言
  // url.searchParams.append('language', 'en-US');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const res = await fetch(url, options);

    // 2. 检查响应是否成功，这是处理API层面错误的地方
    if (!res.ok) {
      const errorData = await res.json();
      // 抛出从API获取的更具体的错误信息
      throw new Error(errorData.status_message || 'Failed to fetch movies');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    // 3. 重新抛出错误，以便调用者可以捕获并处理它
    // 这样，我们的UI层才能知道请求失败了
    console.error('API Error:', error.message);
    throw error;
  }
}

async function fetchDetail(movieID) {
  // 1. 使用 URL 和 URLSearchParams 来安全地构建 URL
  const url = new URL(`${BASE_URL}/movie/${movieID}`);
  // TMDB API 通常还需要其他参数，比如语言
  url.searchParams.append('language', 'en-US');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const res = await fetch(url, options);

    // 2. 检查响应是否成功，这是处理API层面错误的地方
    if (!res.ok) {
      const errorData = await res.json();
      // 抛出从API获取的更具体的错误信息
      throw new Error(errorData.status_message || 'Failed to fetch movie detail');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    // 3. 重新抛出错误，以便调用者可以捕获并处理它
    // 这样，我们的UI层才能知道请求失败了
    console.error('API Error:', error.message);
    throw error;
  }
}

async function fetchPopular() {
  // 1. 使用 URL 和 URLSearchParams 来安全地构建 URL
  const url = new URL(`${BASE_URL}/movie/popular`);
  // TMDB API 通常还需要其他参数，比如语言
  url.searchParams.append('language', 'en-US');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const res = await fetch(url, options);

    // 2. 检查响应是否成功，这是处理API层面错误的地方
    if (!res.ok) {
      const errorData = await res.json();
      // 抛出从API获取的更具体的错误信息
      throw new Error(errorData.status_message || 'Failed to fetch movie detail');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    // 3. 重新抛出错误，以便调用者可以捕获并处理它
    // 这样，我们的UI层才能知道请求失败了
    console.error('API Error:', error.message);
    throw error;
  }
}


export {searchMovies, fetchDetail, fetchPopular}