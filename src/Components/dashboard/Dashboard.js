import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { fetchNewsAsync, saveNewsAsync } from '../../services/fetchNews.service';
import { filterNewsAsync } from '../../services/filter.service';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.totalResults = 0;
        this.state = {
            showModal: false,
            newsArticles: [],
            categories: [
                { category: 'Endpoint', options: ['top-headlines', 'everything', 'sources'], selectedValue: 'top-headlines' },
                { category: 'Country', options: [
                    'all', 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk',
                    'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl',
                    'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
                ], selectedValue: 'all' },
                { category: 'Category', options: ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'], selectedValue: 'all' },
                { category: 'Sources', options: ['abc-news', 'bbc-news', 'cnbc', 'espn', 'fox-news', 'google-news-in', 'news-24', 'time', 'usa-today', 'wired'], selectedValue: 'google-news-in' },
                { category: 'q', selectedValue: '' },
                { category: 'pageSize', options: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], selectedValue: '20' },
                { category: 'page', selectedValue: '1' }
            ]
        };
    }

    handleCategoryChange = (selectedCategory, selectedOption) => {
        const pageSize = (selectedCategory === 'pageSize') ? selectedOption : this.state.categories.filter(item => item.category === 'pageSize')[0].selectedValue;
        const updatedCategories = this.state.categories.map(item => {
            let option = item.selectedValue;          
            if (selectedCategory.category !== 'q' && selectedCategory.category !== 'page') {
                if(item.category === selectedCategory.category) {
                    option = selectedOption;
                }
                return { category: item.category, options: item.options, selectedValue: option };
            } else if (item.category === 'q' && selectedCategory.category === 'q' && selectedOption.target.value) {
                option = selectedOption.target.value;
                return { category: selectedCategory.category, selectedValue: option };
            } else if (item.category === 'page' && selectedCategory.category === 'page' && selectedOption.target.value) {
                option = selectedOption.target.value.replace(/\D/,'');
                if (option && ((option*pageSize) < this.totalResults)) {
                    return { category: selectedCategory.category, selectedValue: option };
                }                
            }
            return { category: item.category, options: item.options, selectedValue: option };      
        });
        this.setState({ categories: updatedCategories });
    }

    onClickFilter = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
        this.filterNews();
    }

    transformArticlesData = articles => {
        return articles.map(article => {
            return { title: article.title, urlToImage: article.urlToImage, description: article.description, author: article.author }
        })
    }

    groupArticlesRowWise = articles => {
        let dataInRows = {};
        const remainder = (articles.length % 3) > 0 ? 1 : 0;
        const noOfRows = Math.floor(articles.length/3)+remainder;
        let k = 0;
        for (let i = 0;i < articles.length;i++) {
            if (i > 0 && i % 3 === 0) {
                k++;
                this.addRow(dataInRows, articles.slice((i-3), i), i);
            }
            if (remainder > 0 && k === (noOfRows-1)) {
                k++;
                this.addRow(dataInRows, articles.slice(i), i+1);
            }
        }
        return dataInRows;
    }

    addRow = (dataInRows, articles, rowIndex) => {
        const rowData = Object.assign(dataInRows, { ['row'+rowIndex]: articles.map((article, i) => <Col key={'row-col-'+i}><Card card={article} readLater={this.onReadLater} {...this.props} /></Col>) });
        return rowData;
    }

    componentDidMount() {
        let bearerToken = '';
        if (this.props.location && this.props.location.state && this.props.location.state.tokenResponse) {
            bearerToken = this.props.location.state.tokenResponse;
            bearerToken = bearerToken.token ? bearerToken.token : '';
        }
        bearerToken = !bearerToken ? sessionStorage.getItem("authToken") : bearerToken;
        if (this.props.location && this.props.location.state && this.props.location.state.userName) {
            sessionStorage.setItem("userName", this.props.location.state.userName);
        }        
        fetchNewsAsync(bearerToken, false)
        .then(res => {
            const articles = (res && res.articles) ? res.articles : [];
            this.totalResults = (res && res.totalResults) ? res.totalResults : 0;
            if(articles.length > 0) {
                this.setState({ newsArticles: this.transformArticlesData(articles) });
            }
        })
        .catch(error => {
            console.log('Error in fetching News Headlines:: ', error);
        })   
    }

    filterNews = () => {
        const { categories } = this.state;      
        filterNewsAsync(categories)
        .then(res => {
            const articles = (res && res.articles) ? res.articles : [];
            this.totalResults = (res && res.totalResults) ? res.totalResults : 0;
            if(articles.length > 0) {
                this.setState({ newsArticles: this.transformArticlesData(articles) });
            }
        })
        .catch(error => {
            console.log('Error in filtering News:: ', error);
        })
    }

    onReadLater = (article) => {
        let bearerToken = '';
        if (this.props.location && this.props.location.state && this.props.location.state.tokenResponse) {
            bearerToken = this.props.location.state.tokenResponse;
            bearerToken = bearerToken.token ? bearerToken.token : '';
            sessionStorage.setItem("authToken", bearerToken);
        }
        saveNewsAsync('http://localhost:3001/api/v1/news', article, bearerToken)
        .then(res => {
            const { newsArticles } = this.state;
            this.setState({ newsArticles: newsArticles.filter(article => (res.title !== article.title && res.author !== article.author && res.description !== article.description))})
        })
        .catch(error => {
            console.log('Error in saving News Headlines:: ', error);
            return Promise.reject(error);
        })
    }

    render() {
        const { newsArticles, categories } = this.state;
        const rowWiseData = this.groupArticlesRowWise(newsArticles);
        return <div>
            <Container className="cardsContainer">
             <Row className = "row-header">
                <Header 
                    isReadNow={false} 
                    categories={categories} 
                    handleChange={this.handleCategoryChange}
                    onClickFilter={this.onClickFilter}
                    showModal={this.state.showModal}
                    hideModal={this.hideModal}
                    {...this.props} 
                />
            </Row>
            <CardDeck data-foo="cardDeck" className="cardDeck">
                {Object.keys(rowWiseData).map((rowData, i) => <Row key={'row-'+i} data-foo="cardsRow">{rowWiseData[rowData]}</Row> )}
            </CardDeck>
            <Row className = "row-footer">
                <Footer></Footer>
            </Row>
            </Container>
        </div>;
    }
}

export default Dashboard;