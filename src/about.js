import { Container,Figure,Row } from 'react-bootstrap';

import Header from './header';
import Img from './siva.gif';

export default function About(){
    return(
        <>
            <Header/>
            <Container fluid className="about-container">
                <Row className="about-heading"><code>const about={"{"}<br/>name:"Siva chidamabaram" <br/>
                qualification:"MCA" <br/>
                website:"sivachidambaram.com"<br/>
                {"};"}</code>
                </Row>
                <Figure className="img-container">
                    <Figure.Image
                    src={Img}
                    className="img"
                    />
                </Figure>
            </Container>
            <Row>
                <h5 className="text-center quote-text">LIVE TO CODE</h5>
            </Row>
        </>
    )
}