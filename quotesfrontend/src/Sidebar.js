import React, { useEffect } from 'react';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import { useWindowSize } from './Hooks/UseWindowSize';

const Sidebar = ({ isOpen, toggleSidebar, tags, authors, handleAddClick }) => {

const Sidebar = ({ 
    authors,
    dropdownOpen,
    handleAddClick,
    handleDropdownChange,
    isOpen,
    setAuthor,
    setTag,
    sortBy,
    toggleDelete,
    toggleEdit,
    toggleSidebar,
    toggleSort,
    tags
}) => {

    const windowSize = useWindowSize();
    const sidebarClass = isOpen ? "sidebar open" : "sidebar";

    return(
        <Col sm={8}>
            <Button onClick={toggleSidebar} className='sidebar-toggle'>
                <MenuIcon />
            </Button >
            <Button style={{position: 'absolute', right: '5px', top: '50px'}} onClick={handleAddClick}>
                <AddIcon />
            </Button>
            <Button style={{position: 'absolute', right: '5px', top: '100px'}}>
                <EditIcon />
            </Button>
            <Button style={{position: 'absolute', right: '5px', top: '150px'}}>
                <RemoveIcon />
            </Button>
            <div className={sidebarClass} style={{overflowY: 'scroll'}}>
                <Row>
                    <h3>Categories</h3>
                    <div className='tagContainer'>
                        {tags.map(tag =>
                            <span key={tag}>
                                <div>
                                    <button 
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'Transparent',
                                            border: 'None'
                                        }}
                                        // onClick={() => {
                                        //     setSelectedTag(tag);
                                        // }}
                                    >
                                        {tag}
                                    </button>   
                                </div>
                            </span>)
                        }                        
                    </div>
                </Row>
                <Row>
                    <h3>Authors</h3>
                    <div className='authorContainer'>
                        {authors.map(author => 
                            <span key={author}>
                                <div>
                                    <button
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'Transparent',
                                            border: 'None'
                                        }}
                                        // onClick={() => {
                                        //     getQuotesByAuthor(author);
                                        // }}
                                    >
                                        {author}
                                    </button>
                                </div>
                            </span>)
                        }
                    </div>
                </Row>
            </div>
        </Col>
    );
}

export default Sidebar;