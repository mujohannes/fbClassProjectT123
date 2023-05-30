import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom'

import { useContext, useState, useEffect } from 'react';
import { FBDbContext } from '../contexts/FBDbContext';
import { FBStorageContext } from '../contexts/FBStorageContext';
import { AuthContext } from '../contexts/AuthContext';

import { doc, getDoc } from "firebase/firestore";

export function Detail(props) {
  const [bookData, setBookData] = useState()

  let { bookId } = useParams()

  const FBDb = useContext(FBDbContext)

  const bookRef = doc(FBDb, "books", bookId)

  const getBook = async (id) => {
    let book = await getDoc(bookRef)
    if (book.exists()) {
      setBookData(book.data())
    }
    else {
      // no book exists with the ID
    }
  }

  useEffect(() => {
    if (!bookData) {
      getBook(bookId)
    }
  })

  if (bookData) {
    return (
      <Container>
        <Row>
          <Col>
            <h2>{bookId}</h2>
          </Col>
          <Col>Right</Col>
        </Row>
      </Container>
    )
  }
  else {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}