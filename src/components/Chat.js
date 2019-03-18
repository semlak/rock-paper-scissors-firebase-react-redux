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
  Input,
  InputGroup,
  InputGroupAddon,
  Form,
  FormText,
  // InputGroupText,
  // FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import moment from 'moment';

import './Chat.css';

import { sendMessageFull, createChatUpdateListeners, updateStatus } from '../actions/chatActions';
// import { joinGathering } from '../actions/gatheringActions';
// import {
//   changePlayerStatus,
// } from '../actions/gatheringActions';


const PlayerAvatar = ({ player }) => {
  const size = 37;
  return (
    player.photoURL && player.photoURL.length > 0 ?
      // <img className="avatar-image" src={player.photoURL} height="37" alt={player.displayName} /> :
      <Avatar src={player.photoURL} size={size} textSizeRatio={2} round /> :
      <Avatar name={player.displayName} color={Avatar.getRandomColor('sitebase', ['green'])} size={size} textSizeRatio={2} round />
  );
};

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
  // console.log('d', d);
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
      <Col sm={{ size: 6, order: direction === 'incoming' ? 2 : 1, offset: direction === 'incoming' ? 0 : 5 }} className={direction === 'incoming' ? 'received_msg' : 'sent_msg'}>
        <Card className={`border-0 p ${direction === 'incoming' ? 'received_withd_msg' : 'sent_withd_msg'}`} >
          <CardBody className={`message bg-${direction === 'outgoing' ? 'primary' : 'light'}`}>{text}</CardBody>
          <CardFooter className="time_date">{time} | {date}</CardFooter>
        </Card>
      </Col>
    </Row>
  );
};


class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.state = {
      messageText: "",
      // userIsTyping: false,
      // timeoutRef: null,
    };
  }
  componentDidMount() {
    // const { opponentUid: opponentUID, gameKey: gameUID } = this.props.game;
    const { gameKey: gameUID } = this.props.game;
    const { player1: player1UID, player2: player2UID } = this.props.game.gameData;
    const { uid: myUID } = this.props.auth;
    const opponentUID = myUID === player1UID ? player2UID : player1UID;
    this.props.createChatUpdateListeners({ opponentUID, gameUID });
  }

  componentDidUpdate() {
  }


  handleSend(e) {
    // if (e && e.preventDefault) {
    e.preventDefault();
    // }
    const { messageText } = this.state;
    if (messageText.length > 0) {
      // this.props.sendMessage(messageText);
      const { gameKey: gameUID } = this.props.game;
      const { uid: playerUID } = this.props.auth;
      this.props.sendMessage({ message: messageText, gameUID, playerUID });
      this.setState({ messageText: '' });
    }
  }

  stopTypingTimeout = null;

  resetStopTypingTimeout = () => {
    const { stopTypingTimeout } = this;
    if (stopTypingTimeout) {
      clearTimeout(stopTypingTimeout);
    }
    this.stopTypingTimeout = setTimeout(() => {
      // this.isTyping = false;
      const { gameKey: gameUID } = this.props.game;
      const { uid: userUID } = this.props.auth;
      this.props.updateStatus({ userIsTyping: false, gameUID, userUID });
      this.stopTypingTimeout = undefined;
    }, 3000);
  };

  handleInputChange = event => {
    // const { timeoutRef } = this.state;
    // clearTimeout(timeoutRef);
    this.resetStopTypingTimeout();
    this.setState({ [event.target.name]: event.target.value });
    const { gameKey: gameUID } = this.props.game;
    const { uid: userUID } = this.props.auth;

    const { userStatus } = this.props.chat;
    const { isTyping: userIsTyping } = userStatus;
    if (!userIsTyping) {
      this.props.updateStatus({ userIsTyping: true, gameUID, userUID });
    }
    // this.props.updateStatus({ isTyping: true });
  }

  render() {

    const { messages: msgs, opponentStatus } = this.props.chat;
    const { isTyping: opponentIsTyping } = opponentStatus;
    // console.log('opponentIsTyping', opponentIsTyping, 'opponentStatus', opponentStatus);
    const { uid: myUID } = this.props.auth;
    const { player1Name, player1: player1UID, player2Name, } = this.props.game.gameData;
    const myName = player1UID === myUID ? player1Name : player2Name;
    const opponentName = player1UID === myUID ? player2Name : player1Name;
    const messages = Object.keys(msgs).map(key => {
      const m = msgs[key];
      return {
        direction: m.playerUID === myUID ? 'outgoing' : 'incoming',
        timestamp: m.timestamp,
        text: m.message,
        // imgSrc:
        name: m.playerUID === myUID ? myName : opponentName,
        id: key,
      };
    });
    messages.sort((a, b) => b.timestamp - a.timestamp);
    // console.log('messages:', messages, this.props.messages);
    const { messageText } = this.state;

    return (
      <Card outline color="info" className="chat border-info app" id="available-players">
        <CardHeader className="text-white bg-info">Chat</CardHeader>
        <CardBody>
          <Row>
            <div className="mesgs">
              <Form onSubmit={this.handleSend}>
                <FormText className="text-left" style={{ marginBottom: '10px' }}>{opponentIsTyping ? `${opponentName} is typing...` : 'You can type a message at anytime...'}</FormText>
                <InputGroup>
                  <Input type="text" onChange={this.handleInputChange} value={messageText} name="messageText" id="message" placeholder="Type a message..." />
                  <InputGroupAddon addonType="append">
                    <Button color="info" className="msg_send_btn" type="submit"><FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" onSubmit={this.handleSend} /></Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <div className="msg_history">
                {messages.map(message => <Message key={message.id || `${message.text}_${message.timestamp}`} {...message} />)}
              </div>
            </div>
          </Row>
        </CardBody>
      </Card>
    );
  }
}


function mapStateToProps({ auth, game, chat, }) {
  // const onlinePlayers = gathering != null ? gathering.onlinePlayers || [] : [];
  return { auth, game, chat, };
}

// export default connect(mapStateToProps, { joinGathering })(UserList);
export default connect(mapStateToProps, { sendMessage: sendMessageFull, createChatUpdateListeners, updateStatus })(Chat);
