import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Dropdown, Spinner } from 'react-bootstrap';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterField, setFilterField] = useState('likes');
  const [sortOrder, setSortOrder] = useState('asc');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: {
          query: searchQuery,
          filterField,
          sortOrder,
          limit,
          skip,
        }
      });
      setResults(response.data.data);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newSkip) => {
    setSkip(newSkip);
    handleSearch();
  };

  const totalPages = Math.ceil(totalItems / limit);

  const renderPagination = () => {
    const pageNumbers = [];
    const currentPage = Math.floor(skip / limit) + 1;

    if (currentPage > 3) pageNumbers.push(1);
    if (currentPage > 4) pageNumbers.push('...');

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) pageNumbers.push('...');

    if (currentPage < totalPages - 2) pageNumbers.push(totalPages);

    return (
      <div className="pagination d-flex justify-content-center">
        {pageNumbers.map((pageNum, index) => (
          <Button
            key={index}
            variant={currentPage === pageNum ? 'primary' : 'outline-secondary'}
            className="mx-1"
            onClick={() => {
              if (pageNum === '...') return;
              handlePageChange((pageNum - 1) * limit);
            }}
          >
            {pageNum}
          </Button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    handleSearch();
  }, [limit, skip]);

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h1 className="text-center mb-4">Search and Filter Articles</h1>

          <Form className="d-flex mb-4">
            <Form.Control
              type="text"
              placeholder="Search by title or body..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="me-2"
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Form>

          <Row className="mb-4">
            <Col md={4}>
              <Dropdown onSelect={(e) => setFilterField(e)}>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  Sort by reactions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="likes">Likes</Dropdown.Item>
                  <Dropdown.Item eventKey="dislikes">Dislikes</Dropdown.Item>
                  <Dropdown.Item eventKey="views">Views</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={4}>
              <Dropdown onSelect={(e) => setSortOrder(e)}>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  Sort Order
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
                  <Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={4}>
              <Dropdown onSelect={(e) => { setLimit(Number(e)); setSkip(0); }}>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  Items per page
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="5">5</Dropdown.Item>
                  <Dropdown.Item eventKey="10">10</Dropdown.Item>
                  <Dropdown.Item eventKey="20">20</Dropdown.Item>
                  <Dropdown.Item eventKey="50">50</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}

          <ListGroup>
            {results.map((item) => (
              <ListGroup.Item key={item.id}>
                <h5>{item.title}</h5>
                <p>{item.body}</p>
                <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
                <p><strong>Likes:</strong> {item.reactions.likes}, <strong>Dislikes:</strong> {item.reactions.dislikes}, <strong>Views:</strong> {item.views}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row className="mt-4">
            <Col className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => handlePageChange(skip - limit)}
                disabled={skip <= 0}
              >
                Previous
              </Button>
              {renderPagination()}
              <Button
                variant="outline-secondary"
                onClick={() => handlePageChange(skip + limit)}
                disabled={skip + limit >= totalItems}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
