import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import {Form, FormGroup, Label, Row, Col, Container, Button} from 'reactstrap';
import { useForm } from 'react-hook-form';
import css from './DeleteQuoteModal.css';
import axios from "axios";

const DeleteQuoteModal = ({setShowDeleteModal, quoteId}) => {
    const modalRef = useRef();
    const { handleSubmit, control, formState: { errors } } = useForm();

    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowDeleteModal(false);
        }
    };
    const onSubmit = () => { 
        axios.delete('api/quotes/' + quoteId)
        .then(res => {
            console.log(res);
            setShowDeleteModal(false);
        })
        .catch(err => console.log(err));
    }
    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="deleteQuoteContainer" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <Container>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <FormGroup>
                                <Col sm={12} className="">
                                    <h1>
                                        Delete Quote
                                    </h1>                            
                                </Col>
                                <Col sm={2}>
                                    <button onClick={() => setShowDeleteModal(false)} className="closeButton">
                                        X
                                    </button>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup row>
                                <Label for="Quote" sm={10}>
                                    <p>
                                        Are you sure you want to delete this quote?
                                    </p>                            
                                </Label>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col sm={{ offset: 2, size: 8 }} >
                            <FormGroup row>
                                <Button className="submitButton">
                                    Yes
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

export default DeleteQuoteModal;