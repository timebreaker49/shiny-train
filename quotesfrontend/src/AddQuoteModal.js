import React, { useRef } from "react";
import ReactDom from "react-dom";
import {Form, FormGroup, Label, Input, Row, Col, Container, Button} from 'reactstrap';
import { useForm} from 'react-hook-form';
import css from './AddQuoteModal.css';

const AddQuoteModal = ({setShowModal}) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="addQuoteContainer" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <Container>
                    <Form className="form">
                        <Row>
                            <FormGroup>
                                <Col sm={12} className="">
                                    <h1>
                                        Add new quote
                                    </h1>                            
                                </Col>
                                <Col sm={2}>
                                    <button onClick={() => setShowModal(false)} className="closeButton">
                                        X
                                    </button>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup row>
                                <Label for="Quote" sm={2}>
                                Quote
                                </Label>
                                <Col sm={10}>                        
                                    <Input
                                    id="quote"
                                    name="quote"
                                    placeholder="Life is like a box of chocolates"
                                    type="textarea"
                                    />
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup row>
                                <Label for="Author" sm={2}>
                                Author
                                </Label>
                                <Col sm={10}>                            
                                    <Input
                                    id="author"
                                    name="author"
                                    placeholder="Charles Dickens"
                                    />
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col sm={{ offset: 2, size: 8 }} >
                            <FormGroup row>
                                <Button className="submitButton">
                                    Submit
                                </Button>
                            </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
      </div>,
      (document.getElementById("addQuoteModal"))
    );
}

export default AddQuoteModal;