import { handleError, apiKey } from './fetchNews.service';

const formNewsQuery = (categories) => {
    const endPoint = categories.filter(item => item.category === 'Endpoint');
    const endPointValue = (endPoint && endPoint.length > 0 && endPoint[0].selectedValue) ? endPoint[0].selectedValue : 'top-headlines';
    const country = categories.filter(item => item.category === 'Country');
    const countryValue = (country && country.length > 0 && country[0].selectedValue) ? country[0].selectedValue : 'all';
    const newsCategory = categories.filter(item => item.category === 'Category');
    const newsCategoryValue = (newsCategory && newsCategory.length > 0 && newsCategory[0].selectedValue) ? newsCategory[0].selectedValue : 'all';
    const source = categories.filter(item => item.category === 'Sources');
    const sourceValue = (source && source.length > 0 && source[0].selectedValue) ? source[0].selectedValue : 'google-news-in';
    const query = categories.filter(item => item.category === 'q');
    const queryValue = (query && query.length > 0 && query[0].selectedValue) ? query[0].selectedValue : '';
    const pageSize = categories.filter(item => item.category === 'pageSize');
    const pageSizeValue = (pageSize && pageSize.length > 0 && pageSize[0].selectedValue) ? pageSize[0].selectedValue : '20';
    const pageNo = categories.filter(item => item.category === 'page');
    const pageNum = (pageNo && pageNo.length > 0 && pageNo[0].selectedValue) ? pageNo[0].selectedValue : '1';
    if (endPointValue === 'sources') {
        return `https://newsapi.org/v2/${endPointValue}?language=en&country=${countryValue}&apikey=${apiKey}`;
    } else if (endPointValue === 'top-headlines') {
        // consider source value
        return `https://newsapi.org/v2/${endPointValue}?sources=${sourceValue}&language=en&q=${queryValue}&pageSize=${pageSizeValue}&apikey=${apiKey}&page=${pageNum}`;
    } else if (endPointValue === 'everything') {
        return `https://newsapi.org/v2/${endPointValue}?sources=${sourceValue}&language=en&q=${queryValue}&sortBy=publishedAt&pageSize=${pageSizeValue}&apikey=${apiKey}&page=${pageNum}`;
    }
    return `https://newsapi.org/v2/${endPointValue}?country=${countryValue}&language=en&category=${newsCategoryValue}&q=${queryValue}&pageSize=${pageSizeValue}&apikey=${apiKey}&page=${pageNum}`;
}

async function filterNewsAsync(categories) {
    const url = formNewsQuery(categories);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { filterNewsAsync };