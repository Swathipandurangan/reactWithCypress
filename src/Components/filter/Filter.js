import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class NewsModal extends React.Component {
    render() {
        return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  News Categories
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Adjust the search criteria, by varying the parameters below:</strong></p>
                <ul className="category-list">
                    {this.props.categories && this.props.categories.map((categoryObj) => {
                            return <li>
                                <div>                                    
                                    {(categoryObj.category !== 'q' && categoryObj.category !== 'page') && <strong>{`${categoryObj.category}: `}</strong>}
                                    {(categoryObj.category === 'q') && <Form.Group>
                                        <Form.Label className="formLabel">{`${categoryObj.category}: `}</Form.Label>
                                        <Form.Control className="formControl" type="text"
                                        value = {categoryObj.selectedValue} 
                                        placeholder="Enter query" 
                                        name = "query"
                                        as = "input"
                                        onChange = {e => this.props.handleChange(categoryObj, e)} />
                                    </Form.Group>}
                                    {(categoryObj.category === 'page') && <Form.Group>
                                        <Form.Label className="formLabel">{`${categoryObj.category}: `}</Form.Label>
                                        <Form.Control className="formControl" type="text"
                                        value = {categoryObj.selectedValue} 
                                        placeholder="Enter page number" 
                                        name = "page"
                                        onChange = {e => this.props.handleChange(categoryObj, e)} />
                                    </Form.Group>}
                                    {(categoryObj.category !== 'q' && categoryObj.category !== 'page') && <DropdownButton
                                            as={ButtonGroup}
                                            key={categoryObj.selectedValue}
                                            id={`dropdown-variants-Secondary`}
                                            variant={categoryObj.selectedValue.toLowerCase()}
                                            title={categoryObj.selectedValue}
                                        >
                                        {categoryObj.options.map((option) => {
                                                const active = categoryObj.selectedValue === option;
                                                return <Dropdown.Item eventKey={`event-key-${option}`} active={active} onSelect={() => this.props.handleChange(categoryObj, option)}>{option}</Dropdown.Item>
                                            })
                                        }
                                        </DropdownButton>
                                    }
                                </div>
                            </li>
                        }
                    )}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }    
}

export default NewsModal;