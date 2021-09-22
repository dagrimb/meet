import React, { Component } from 'react';
import Event from './Event';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { WarningAlert } from './Alert';



class EventList extends Component {
  state = {
//    infoText: '',
    //events: this.props.events,
  }

  /*warnTimeSensitive = () => {
    const events = this.state.events;
    console.log("EVENTS", events)

    let date1 = new Date();
    date1 = date1.toISOString();
    let date2 = events.start.dateTime;
    let twoDaysOut = Math.abs(new Date(date1).getTime() + 172800000);
    let difference = Math.abs(twoDaysOut - new Date(date2));
    if (date2 > date1 && difference <= 172800000) {
      this.setState({
        infoText: "You have events taking place in the 48 hours. Time is of the essence.",
      });
    } else {
      return this.setState({
        infoText:''
      });
    }
    this.props.updateEvents(events);
  }

  componentDidMount() {
    this.mounted = true;
   // this.updateEvents().then((events) => {
      if (this.mounted) {
        this.warnTimeSensitive();
      }
    //})
  }*/

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
                  <Event event={event} warnTimeSensitive={(event) => this.warnTimeSensitive(event)} />
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