import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { Form, FormGroup, Label, Input, Row, Col, Container, Button } from 'reactstrap';
import { Controller, useForm, useWatch, useFieldArray } from 'react-hook-form';
import css from "./AddQuoteModal.css";
import axios from "axios";

const AddQuoteModal = ({setShowAddModal}) => {
    const modalRef = useRef();
    const { handleSubmit, control, formState: { errors } } = useForm();
    
    const [tags, setTags] = React.useState([]);
    
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowAddModal(false);
        }
    };

    const removeTag = indexToRemove => {
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
    }, [tags]);

    const onSubmit = data => { 
        console.log(data); 
        // axios.post('api/quotes/', data)
        // .then(res => {
            //     console.log(res);
            //     setShowAddModal(false);
            // })
            // .catch(err => console.log(err));
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags"
    });
        
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
                                    <button onClick={() => setShowAddModal(false)} className="closeButton">
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

export default AddQuoteModal;