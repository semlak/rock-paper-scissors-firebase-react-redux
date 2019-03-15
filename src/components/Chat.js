import React, { Component } from 'react';
import {
  Button,
  // Container,
  Row,
  Col,
  Card,
  CardBody,
  // CardTitle,
  // CardText,
  CardFooter,
  CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import moment from 'moment';

// import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';
import './Chat.css';

// import Avatar from 'react-avatar';

// import defaultPlayerImage from '../img/user.png';

// import { joinGathering } from '../actions/gatheringActions';
import {
  changePlayerStatus,
} from '../actions/gatheringActions';


const PlayerAvatar = ({ player }) => (
  player.photoURL && player.photoURL.length > 0 ?
    <img src={player.photoURL} height="37" alt={player.displayName} /> :
    <Avatar name={player.displayName} color={Avatar.getRandomColor('sitebase', ['green'])} size="37" textSizeRatio={2} round={true} />
);

const getTimeFromStamp = (timestamp) => {
  // const d = new Date(timestamp);
  const d = moment(timestamp);
  // timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
  // const timeStampCon = d.getHours() + ':' + d.getMinutes();
  const timeStampCon = d.format("h:mm A");
  return timeStampCon;
};


const getDateFromStamp = (timestamp) => {
  // const d = new Date(timestamp);
  const d = moment(timestamp);
  // timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
  console.log('d', d);
  // const dateStampCon = (d.getMonth()) + '/' + d.getDate();
  const dateStampCon = d.format("MMMM DD");
  // d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();
  // timeStampCon = d.getHours() + ':' + d.getMinutes();
  return dateStampCon;
};

const Message = ({ direction, text, timestamp, imgSrc, name }) => {
  
  const time = getTimeFromStamp(timestamp);
  const date = getDateFromStamp(timestamp);

  return (
    <Row className={direction === 'incoming' ? 'incoming_msg' : 'outgoing_msg'}>
      <Col sm={{ size: 1, order: direction === 'incoming' ? 1 : 2, offset: 0 }} >
        <PlayerAvatar player={{ photoURL: imgSrc, displayName: name }} />
      </Col>
     

      {/* <Col className="incoming_msg_img1">                     */}
      {/*   <img src={imgSrc} className="img-fluid" alt={name} /> */}
      {/* </Col>                                                  */}
      <Col sm={{ size: 6, order: direction === 'incoming' ? 2 : 1, offset: direction === 'incoming' ? 0 : 5 }} className={direction === 'incoming' ? 'received_msg' : 'sent_msg'}>
        <Card className={direction === 'incoming' ? 'received_withd_msg1' : 'sent_withd_msg1'}>
          <CardBody>{text}</CardBody>
          <CardFooter className="time_date">{time} | {date}</CardFooter>
        </Card>
      </Col>

      {/* { imgSrc ? <div className={`${direction}_msg_img`}><img src={imgSrc} alt={name} /> </div> : "" } */}
      {/* <div className={direction === 'incoming' ? 'received_msg' : 'sent_msg'}> */}
      {/*   <div className={direction === 'incoming' ? 'received_withd_msg' : ''}> */}
      {/*     <p>{text}</p>                                                        */}
      {/*     <span className="time_date">{time} | {date}</span>                   */}
      {/*   </div>                                                                 */}
      {/* </div>                                                                   */}
    </Row>
  );
};

// const Message = ({ direction, text, timestamp, imgSrc, name }) => {
//   const time = getTimeFromStamp(timestamp);
//   const date = getDateFromStamp(timestamp);
//   return (
//     <div className={direction === 'incoming' ? 'incoming_msg' : 'outgoing_msg'}>
//       <PlayerAvatar player={{ photoURL: imgSrc, displayName: name }} />
//       [> { imgSrc ? <div className={`${direction}_msg_img`}><img src={imgSrc} alt={name} /> </div> : "" } <]
//       <div className={direction === 'incoming' ? 'received_msg' : 'sent_msg'}>
//         <div className={direction === 'incoming' ? 'received_withd_msg' : ''}>
//           <p>{text}</p>
//           <span className="time_date">{time} | {date}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UserList = (props) => {
class Chat extends Component {
  componentDidMount() {
  }

  componentDidUpdate() {
  }


  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    // addResponseMessage(newMessage);
  }

  render() {
    const messages = [{
      direction: 'incoming',
      timestamp: moment('06/09/2018 11:01'),
      text: "Test which is a new approach to have all solutions",
      imgSrc: "https://ptetutorials.com/images/user-profile.png",
      name: "sunil",
    }, {
      direction: 'outgoing',
      timestamp: moment('06/09/2018 11:00'),
      text: "Test which is a new approach to have all solutions",
      // imgSrc: "https://ptetutorials.com/images/user-profile.png",
      name: "xena",
    }];

    const blah = (
      <Row>
        <div className="mesgs">
          <div className="msg_history">
            {messages.map(message => <Message key={`${message.text}_${message.timestamp}`} {...message} />)}
            {/* <Message                                                    */}
            {/*   direction="incoming"                                      */}
            {/*   // timestamp={1552603967218}                              */}
            {/*   timestamp={moment('06/09/2018 11:01')}                    */}
            {/*   text="Test which is a new approach to have all solutions" */}
            {/*   imgSrc="https://ptetutorials.com/images/user-profile.png" */}
            {/*   name="sunil"                                              */}
            {/* />                                                          */}
            {/* <div className="incoming_msg">                                                                                  */}
            {/*   <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> */}
            {/*   </div>                                                                                                        */}
            {/*   <div className="received_msg">                                                                                */}
            {/*     <div className="received_withd_msg">                                                                        */}
            {/*       <p>Test which is a new approach to have all solutions</p>                                                 */}
            {/*       <span className="time_date"> 11:01 AM    |    June 9</span>                                               */}
            {/*     </div>                                                                                                      */}
            {/*   </div>                                                                                                        */}
            {/* </div>                                                                                                          */}
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>Test which is a new approach to have all solutions</p>
                <span className="time_date"> 11:01 AM    |    June 9</span>
              </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Test, which is a new approach to have</p>
                  <span className="time_date"> 11:01 AM    |    Yesterday</span>
                </div>
              </div>
            </div>
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span className="time_date"> 11:01 AM    |    Today</span>
              </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"><img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>We work directly with our designers and suppliers,
                    and sell direct to you, which means quality, exclusive
                    products, at a price anyone can afford.
                  </p>
                  <span className="time_date"> 11:01 AM    |    Today</span>
                </div>
              </div>
            </div>
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input type="text" className="write_msg" placeholder="Type a message" />
              {/* <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button> */}
              <Button className="msg_send_btn" type="button"><FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" /></Button>
            </div>
          </div>
        </div>
      </Row>
    );

    // const { selectPlayer } = props;
    // const { props } = this;
    // const { selectPlayer, auth } = props;
    // const players = props.players && Array.isArray(props.players) ? props.players : [];

    // console.log('players', players, 'props', props);

    return (
      <Card outline color="info" className="border-info app mt-2" id="available-players" style={{ display: "block" }} >
        <CardHeader className="text-white bg-info">Chat</CardHeader>
        <CardBody>
          { blah }
        </CardBody>
        {/* <CardFooter className="card-footer">Select a user to play!</CardFooter> */}
      </Card>
    );
  }
}

function mapStateToProps({ auth, gathering }) {
  const onlinePlayers = gathering != null ? gathering.onlinePlayers || [] : [];
  return { auth, gathering, players: onlinePlayers, };
}

// export default connect(mapStateToProps, { joinGathering })(UserList);
export default connect(mapStateToProps, { changePlayerStatus })(Chat);
