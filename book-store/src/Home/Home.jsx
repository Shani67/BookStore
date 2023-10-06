import axios from 'axios'
import React, { useState,useEffect } from 'react';
import './home.css'

const Home = () => {
    //Define the showing table action after clicking table button
    const [active ,setActive]= useState('table')
    const showTable=()=>{
      setActive('table activeTable')
    }
    //Define the removing table action after clicking remove button
    const removeTable=()=>{
        setActive('table')
      }
        const [book, setBook] = useState({
          title: '',
          author: '',
          isbn: '',
        });
//to fetch the data into the table        
        useEffect(() => {
            axios.get('/api/books') 
              .then((response) => {
                setBook(response.data);
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          }, []);
        
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setBook({
            ...book,
            [name]: value,
          });
        };
//define action of adding a book      
        const handleAddBook = async () => {
          try {
            await axios.post('/api/books', book); 
            console.log('Book added successfully.');
          } catch (error) {
            console.error('Error adding book:', error);
          }
        };
//define action of fetching all books
        const handleFetchBooks = async () => {
            try {
              const response = await axios.get('/api/books'); 
              console.log('Fetched books:', response.data);
            } catch (error) {
              console.error('Error fetching books:', error);
            }
          };
//define action of deletion
          const handleDeleteBook = async () => {
            const isbnToDelete = book.isbn; 
            try {
              await axios.delete(`/api/books/${isbnToDelete}`); 
              console.log('Book deleted successfully.');
            } catch (error) {
              console.error('Error deleting book:', error);
            }
          };
          
     //Form for the adding a book and displaying data in a table     
  return (<>
<section className='home'>
        <h2>Book Store</h2><br/>
            <div className="homecontent container">
                
        <div className="bookName">
          <label htmlFor="book">Book Name</label>
            <div className="input flex">
              <input type="text" placeholder='Enter Book name..' name="title"
                value={book.title}
                onChange={handleInputChange}/>
            </div>
        </div><br/>
        <div className="bookAuthor">
          <label htmlFor="author">Author</label>
            <div className="input flex">
              <input type="text" placeholder='Enter Author name..' name="author"
                value={book.author}
                onChange={handleInputChange} />
            </div>
        </div><br/>
        <div className="bookISBN">
          <label htmlFor="isbn">ISBN</label>
            <div className="input flex">
              <input type="text" placeholder='Enter ISBN..' name="isbn"
                value={book.isbn}
                onChange={handleInputChange}/>
            </div>
        </div><br/>
        <button className='btn blue' onClick={handleAddBook}>Add</button>
       <br/>
        </div>
       
    </section><br/>
    <button className='btn green flex' onClick={handleFetchBooks} >Fetch</button>
    <button className='btn green flex' onClick={showTable}>Table</button>
    <button className='btn red flex' onClick={removeTable}>Remove</button>


<br/>
    <div className={active}>
      <table class='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td> <button className='btn red' onClick={handleDeleteBook}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
        
    </>);
    }

export default Home