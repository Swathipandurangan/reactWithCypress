import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class DisplayCard extends React.Component {
    render() {
        const { card } = this.props;
        if (card != null) {
            return <Card data-type="newsCard">
                <Card.Img variant="top" src={card.urlToImage ? card.urlToImage : ''} data-image="newsCardImage" />
                <Card.Body>
                    <Card.Title data-title="newsCardTitle">{card.title ? card.title : ''}</Card.Title>
                    {!(this.props.isReadNow) && <Button variant="primary" onClick={() => this.props.readLater(card)} data-readlater="readLater">{'Read Later'}</Button>}
                </Card.Body>
            </Card>;
        }
        return null;
    }    
}

export default DisplayCard;