import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import {Form, FormGroup, Label, Input, Row, Col, Container, Button} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import css from './AddQuoteModal.css';
import axios from "axios";

const AddQuoteModal = ({setShowModal}) => {
    const modalRef = useRef();
    const { handleSubmit, control, formState: { errors } } = useForm();

    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };
    const onSubmit = data => { 
        console.log(data); 
        axios.post('api/quotes/', data)
        .then(res => {
            console.log(res);
            setShowModal(false);
        })
        .catch(err => console.log(err));
    }
    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="addQuoteContainer" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <Container>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                                    <Controller
                                        control={control}
                                        name="quote"
                                        render={({ field: { ref, ...fieldProps } }) => (
                                            <FormGroup>
                                              <Input id="quote" type="textarea" innerRef={ref} {...fieldProps} />
                                            </FormGroup>
                                          )}
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
                                    <Controller
                                        control={control}
                                        name="author"
                                        render={({ field: { ref, ...fieldProps } }) => (
                                            <FormGroup>
                                              <Input id="author" innerRef={ref} {...fieldProps} />
                                            </FormGroup>
                                          )}
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