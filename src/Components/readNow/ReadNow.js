import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { fetchNewsAsync } from '../../services/fetchNews.service';
import Card from '../card/Card';
import Footer from '../footer/Footer';
import Header from '../header/Header';

class ReadNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArticles: []
        };
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
        const rowData = Object.assign(dataInRows, { ['row'+rowIndex]: articles.map((article, i) => <Col key={'row-col-'+i}><Card card={article} {...this.props} isReadNow={true} /></Col>) });
        return rowData;
    }

    componentDidMount() {
        const { newsArticles } = this.state;
        let bearerToken = '';
        if (this.props.location && this.props.location.state && this.props.location.state.tokenResponse) {
            bearerToken = this.props.location.state.tokenResponse;
            bearerToken = bearerToken.token ? bearerToken.token : '';
        }
        bearerToken = !bearerToken ? sessionStorage.getItem("authToken") : bearerToken;
        if (this.props.location && this.props.location.state && this.props.location.state.userName) {
            sessionStorage.setItem("userName", this.props.location.state.userName);
        }        
        if (!newsArticles || newsArticles.length === 0) {
            fetchNewsAsync(bearerToken, true)
            .then(res => {
                if(res && res.length > 0) {
                    this.setState({ newsArticles: this.transformArticlesData(res) });
                }
            })
            .catch(error => {
                console.log('Error in fetching News Headlines:: ', error);
            })
        }        
    }

    render() {
        const { newsArticles } = this.state;
        const rowWiseData = this.groupArticlesRowWise(newsArticles);
        return <div>
            <Container className="cardsContainer">
             <Row className = "row-header">
                <Header isReadNow={true} {...this.props} />
            </Row>
            <CardDeck data-foo="cardDeck">
                {Object.keys(rowWiseData).map((rowData, i) => <Row key={'row-'+i} data-foo="cardsRow">{rowWiseData[rowData]}</Row> )}
            </CardDeck>
            <Row className = "row-footer">
                <Footer></Footer>
            </Row>
            </Container>
        </div>;
    }
}

export default ReadNow;