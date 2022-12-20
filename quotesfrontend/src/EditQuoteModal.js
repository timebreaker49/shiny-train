import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import {Form, FormGroup, Label, Input, Row, Col, Container, Button} from 'reactstrap';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import './EditQuoteModal.css';
import axios from "axios";

const EditQuoteModal = ({setShowEditModal, quote}) => {
    const modalRef = useRef();
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            id: quote.id,
            author: quote.author,
            quote: quote.quote,
            tags: quote.tags
        }
    });
    const [tags, setTags] = React.useState([]);
    const { append, remove } = useFieldArray({
        control,
        name: "tags"
    });

    useEffect(() => {
        console.log('quote: ' + quote.tags);
        axios.get(`/api/quotes/${quote.id}`)
            .then(res => {
                console.log(res.data);
                setTags(quote.tags);
            })
        .catch(err => console.log(err));
    }, [])

    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowEditModal(false);
        }
    };

    const removeTag = indexToRemove => {
        remove(indexToRemove);
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    }

    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Enter' && event.target.value !== '') {
            event.preventDefault();
            setTags([...tags, event.target.value]);
            append(event.target.value);
            event.target.value = '';
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    }, [tags, append]);
    const onSubmit = data => { 
        axios.put(`api/quotes/${quote.id}/`, data)
        .then(res => {
            console.log(res);
            setShowEditModal(false);
        })
        .catch(err => console.log(err));
    }
    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="editQuoteContainer" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <Container>
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <FormGroup>
                                <Col sm={12} className="">
                                    <h1>
                                        Edit Quote
                                    </h1>                            
                                </Col>
                                <Col sm={2}>
                                    <button onClick={() => setShowEditModal(false)} className="closeButton">
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
                            <FormGroup row>
                                <Label for="Tags" sm={2}>
                                    Tags
                                </Label>
                                <Col sm={10}>           
                                        <Controller 
                                            control={control}
                                            name="tags"
                                            render={({ field: { onChange, value, ref, ...fieldProps } }) =>(
                                                <div className="tags-container">                                                 
                                                    <ul id="tags">
                                                        {tags.map((tag, index) => (
                                                            <li key={index} className="tag">
                                                                <span className='tag-title'>{tag}</span>
                                                                <span className="tag-close-icon" 
                                                                    onClick={() => removeTag(index)}
                                                                >
                                                                    x
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <input
                                                        className="tag-input"
                                                        ref={ref}
                                                        {...fieldProps}
                                                        type='text'                                                                                                           
                                                    />
                                                </div>
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

export default EditQuoteModal;