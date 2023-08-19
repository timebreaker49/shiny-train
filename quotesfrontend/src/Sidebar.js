import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import { useWindowSize } from './Hooks/UseWindowSize';

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
        <>
            {windowSize.width < 600
                ? <div>
                    <Button 
                        style={{position: 'absolute', right: '8px', top: '10px'}} 
                        onClick={toggleSidebar}>
                        <MenuIcon />
                    </Button>
                    <Button 
                        style={{position: 'absolute', right: '8px', top: '60px'}} 
                        onClick={handleAddClick}>
                        <AddIcon />
                    </Button>
                    <Button 
                        style={{position: 'absolute', right: '8px', top: '110px'}}
                        onClick={toggleEdit}>
                        <EditIcon />
                    </Button>
                    <Button 
                        style={{position: 'absolute', right: '8px', top: '160px'}}
                        onClick={toggleDelete}>
                        <RemoveIcon />
                    </Button>

                    <div className={sidebarClass} style={{overflowY: 'scroll', paddingTop: '5px'}}>
                        <Row>
                            <h3>Categories</h3>
                            <div className='toggledSidebarTagContainer'>
                                {tags.map(tag =>
                                    <span key={tag}>
                                        <div>
                                            <button 
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: 'Transparent',
                                                    border: 'None'
                                                }}
                                                onClick={() => setTag(tag)}>
                                                {tag}
                                            </button>   
                                        </div>
                                    </span>)
                                }                        
                            </div>
                        </Row>
                        <Row>
                            <h3>Authors</h3>
                            <div className='toggledSidebarAuthorContainer'>
                                {authors.map(author => 
                                    <span key={author}>
                                        <div>
                                            <button
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: 'Transparent',
                                                    border: 'None'
                                                }}
                                                onClick={() => setAuthor(author)}>
                                                {author}
                                            </button>
                                        </div>
                                    </span>)
                                }
                            </div>
                        </Row>
                    </div> 
                </div>   
                : <div style={{
                        maxHeight: windowSize.height * 0.9, 
                        overflowY: 'scroll', 
                        marginTop: '2%'}}> 
                    <Row>
                        <div>
                            <button className='buttonBase newQuoteButton' 
                                onClick={handleAddClick}>
                                Add Quote
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <button className='buttonBase toggleEditButton'
                                onClick={toggleEdit}> 
                                Edit Quote
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <button className='buttonBase deleteMultipleButton' 
                                onClick={toggleDelete}>
                                Delete Quote(s)
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Dropdown className='sortDropdown'
                                direction="down" 
                                isOpen={dropdownOpen} 
                                toggle={toggleSort} >
                                <DropdownToggle 
                                    caret 
                                    className='sortDropdownText'>
                                    {sortBy === '' ? 'Sort' : `Sort by: ${sortBy}`}
                                </DropdownToggle>
                                <DropdownMenu name="sortType">
                                    <DropdownItem 
                                        name="NameDesc" 
                                        value="Name ↓" 
                                        onClick={e => handleDropdownChange(e)}>
                                            Name ↓
                                    </DropdownItem>
                                    <DropdownItem 
                                        name="NameAsc" 
                                        value="Name ↑" 
                                        onClick={
                                            e => handleDropdownChange(e)}>
                                            Name ↑
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Row>
                    <Row>
                        <h3>Categories</h3>
                        <div className='sidebarTagContainer'>
                            {tags.map(tag =>
                                <span key={tag}>
                                    <div>
                                        <button 
                                            className='tagName'
                                            onClick={() => setTag(tag)}>
                                            {tag}
                                        </button>   
                                    </div>
                                </span>)
                            }                        
                        </div>
                    </Row>
                    <Row>
                        <h3>Authors</h3>
                        <div className='sidebarAuthorContainer'>
                            {authors.map(author => 
                                <span key={author}>
                                    <div>
                                        <button
                                            className='authorName'
                                            onClick={() => setAuthor(author)}>
                                            {author}
                                        </button>
                                    </div>
                                </span>)
                            }
                        </div>
                    </Row>
                </div>
            }
        </>
    );
}

export default Sidebar;