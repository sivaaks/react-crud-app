import { Container,Row,Col, Card } from "react-bootstrap";

import './style.css';
import Header from './header';

export default function Home(){
    return (
        <>
        <Header/>
        <Container fluid className="home-container">
           <Row className="home-content">
                <h1 className="hero-text">React Posts CRUD App</h1>
                <h4 className="text-center">This app is created using</h4>
           </Row>
           
           <Row className="cards">
               <Card className="card-item"><Card.Title>React js</Card.Title></Card>
               <Card className="card-item"><Card.Title>Bootstrap</Card.Title></Card>
               <Card className="card-item"><Card.Title>HTML</Card.Title></Card>
               <Card className="card-item"><Card.Title>CSS</Card.Title></Card>
            </Row>

        </Container>
        <Row className="features-container">
            <h1 className="text-center">Features</h1>
            <Card className="feature-card-item">
            <Card.Body>
                <Card.Title>Add new post</Card.Title>
                <Card.Text>Add a new post on posts page</Card.Text>
            </Card.Body>
            </Card>
            <Card className="feature-card-item">
                <Card.Body>
                <Card.Title>Edit, Delete post</Card.Title>
                <Card.Text>Edit or delete added posts</Card.Text>
                </Card.Body>
            </Card>
            <Card className="feature-card-item">
                <Card.Body>
                <Card.Title>View post info</Card.Title>
                <Card.Text>View comments,info of a post</Card.Text>
                </Card.Body>
            </Card>
            <Card className="feature-card-item">
                <Card.Body>
                <Card.Title>Add comments</Card.Title>
                <Card.Text>Add new comment on a post</Card.Text>
                </Card.Body>
            </Card>
        </Row>
        </>
    )
}