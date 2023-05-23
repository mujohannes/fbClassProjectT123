import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";

import { FBDbContext } from '../contexts/FBDbContext';

export function Home () {
    const[ data, setData ] = useState([])

    const FBDb = useContext(FBDbContext)

    const getData = async () => {
        // get data from firestore collection called "books"
        const querySnapshot = await getDocs( collection(FBDb, "books") )
        // an array to store all the books from firestore
        let books = []
        querySnapshot.forEach( (doc) => {
            let book = doc.data()
            book.id = doc.id
            // add the book to the array
            books.push(book)
        })
        // set the books array as the data state
        setData(books)
        console.log(books)
    }

    useEffect( () => {
        if( data.length === 0 ) {
            getData()
        }
    })

    const Columns = data.map( (book, key) => {
        return(
            <Col md="4" key={key}>
                <h3>{book.title}</h3>
            </Col>
        )
    })

    return (
       <Container>
            <Row>
                {Columns}
            </Row>
       </Container>
    )
}