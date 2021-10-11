import React, { Component } from 'react';
import Event from './Event';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { WarningAlert } from './Alert';



class EventList extends Component {
  state = {
  }

  render() {
   //const { events } = this.props;
 //  console.log(events);
    return (
      <ul className="EventList">
        <Container className="eventContainer">
          <Row>
            {this.props.events.map(event =>
              <Col className="eventCol justify-md-content-center" xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
                <li key={event.id}>
                  <Event event={event} />
                </li>
              </Col>
            )}
          </Row>
      </Container>
      </ul>
    );
  }
}

export default EventList;