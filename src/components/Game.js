import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardTitle,
  CardText,
  CardFooter,
  CardHeader,
  Row,
  Col,
  Badge,
} from 'reactstrap';
// import Bounce from 'react-reveal/Bounce';
import { connect } from 'react-redux';

// import firebase from '../firebase';
// import LoadingSpinner from './LoadingSpinner';
import {
  endGame,
  makePlay,
  getRoundOutcome,
} from '../actions/game';

import {
  changePlayerStatus,
} from '../actions/gatheringActions';

import gameStatuses from '../gameStatuses';


class Game extends Component {

  componentDidMount() {
    // console.log('in componentDidMount');
    const { user, gathering, } = this.props;
    const inGame = true;
    const player = this.props.players.find(player1 => player1.uid === user.uid);
    const player1 = { ...player, inGame };
    this.props.changePlayerStatus(player1, gathering);
  }

  componentDidUpdate(prevProps) {
    const { gameStatus, myUid, } = this.props.game;
    // console.log('myUid', myUid, 'this.props.game.gameData', this.props.game.gameData.player1);
    if (gameStatus === gameStatuses.DETERMINING_ROUND_WINNER && gameStatus !== prevProps.game.gameStatus && prevProps.game.gameStatus.length > 0 && myUid === this.props.game.gameData.player1) {
      this.props.getRoundOutcome(this.props.gameUID);
    }
  }

  getState() {
    // this isn't really the state it is getting, it is just transforming props to needed stuff for render
    // console.log('running getState');
    const { user } = this.props;
    const {
      // gameInProgress,
      // maxNumberOfGames,
      player1: player1UID,
      player2: player2UID,
      player1Wins,
      player2Wins,
      player1Name,
      player2Name,
      ties,
      winner,
      // playInProgress,
    } = this.props.game.gameData;
    // const { uid: myUID, displayName: myName } = user;
    const { uid: myUID, } = user;
    // console.log(`player1UID ${player1UID}, player2UID ${player2UID}, myUID ${myUID}, player1UID === myUID: ${player1UID === myUID}`);
    const player1 = { uid: player1UID, name: player1Name, wins: player1Wins };
    const player2 = { uid: player2UID, name: player2Name, wins: player2Wins };
    // const { uid: opponentUID, name: opponentName, wins: opponentWins } = player1UID === myUID ? player2 : player2UID === myUID ? player1 : null;
    const { name: opponentName, wins: opponentWins } = player1UID === myUID ? player2 : player2UID === myUID ? player1 : {};
    const { wins: myWins } = player1UID === myUID ? player1 : player2;
    // const player1or2 = player1UID === myUID ? "player1" : "player2";

    return ({
      // myUID,
      // opponentUID,
      opponentName,
      myWins,
      opponentWins,
      ties,
      winner,
      // maxNumberOfGames,
      // gameInProgress,
      // player1or2,
      // playInProgress,
    });
  }


  play = (e) => {
    const { value: playerAction } = e.target;
    // const player = playerid === game.player1 ? "player1" : "player2";
    const { player1: player1UID, player2: player2UID } = this.props.game.gameData;
    const { uid: myUID } = this.props.user;
    const player1or2 = player1UID === myUID ? "player1" : player2UID === myUID ? "player2" : "";
    // const { player1or2 } = this.state;
    // console.log('e.target', e.target, 'playerAction ', playerAction);
    // console.log('player1UID', player1UID, 'myUID', myUID, 'player1or2', player1or2, 'playerAction', playerAction);
    if (playerAction.match(/(rock|paper|scissors)/) != null && player1or2 && player1or2.length > 1) {
      const { gameKey } = this.props.game;
      // this.props.makePlay(gameKey, player1or2, playerAction);
      this.props.makePlay(gameKey, player1or2, myUID, playerAction);
    }
    else {
      console.log('invalid playerAction or playerinfo', playerAction, player1or2);
    }
  }

  endCurrentGame = () => {
    console.log('ending current game');
    if (this.props.endGame && this.props.gameUID) {
      console.log('creating endGame action');
      this.props.endGame(this.props.gameUID);
    }
  }

  render = () => {
    const {
      opponentName,
      // myUID,
      // opponentUID,
      myWins,
      opponentWins,
      ties,
      winner,
      // messages,
      // maxNumberOfGames,
      // gameInProgress,
      // playInProgress,
    } = this.getState();
    // } = this.state; 

    const { gameStatus, } = this.props.game;
    const { gameInProgress, round } = this.props.game.gameData;
    const playEnabled = gameInProgress && gameStatus !== gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT && gameStatus !== gameStatuses.DETERMINING_ROUND_WINNER;
    console.log('gameInProgress', gameInProgress, 'gameStatus', gameStatus);
    // const playEnabled = true;


    // const loadingMessage = 'You played ...';
    // const loadingMessage = gameStatus;
    const messages = {
      [gameStatuses.DETERMINING_ROUND_WINNER]: 'Determining Round Winner...',
      [gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT]: 'You have played, and we are waiting on your opponent...',
      [gameStatuses.WAITING_FOR_BOTH_PLAYERS]: 'Waiting for both players to make a play...',
      [gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER]: 'Your opponent has played and is waiting for you to play...',
      [gameStatuses.GAME_STARTED]: 'Game started...',
      [gameStatuses.GAME_ENDED]: 'Game is over...',
      [gameStatuses.NO_GAME]: 'No Game currently in progress...',
    };

    const loadingMessage = gameStatus === gameStatuses.GAME_ENDED && winner > 0 ?
      myWins > opponentWins ?
        'You Won!' :
        'You lost.' :
      messages[gameStatus];
      // gameStatus;

    const activeCardBody = (
      <CardBody className="">
        <Row>
          <Col className="text-right">Your Opponent:</Col>
          <Col className="text-left">{opponentName}</Col>
        </Row>
        <Row>
          <Col className="text-right">Round Number:</Col>
          <Col className="text-left "><Badge color="secondary">{round}</Badge></Col>
        </Row>

        <Row>
          <Col className="text-right">Your Wins:</Col>
          {/* <Col className="text-left">{loadingMessage === 'You Won!' ? <Bounce>{myWins}</Bounce> : myWins}</Col> */}
          <Col className="text-left"><Badge>{myWins}</Badge></Col>
          {/* <Col className="text-left"><Bounce><Badge>{myWins}</Badge></Bounce></Col> */}
        </Row>
        <Row>
          <Col className="text-right">Opponent Wins:</Col>
          <Col className="text-left"><Badge>{opponentWins}</Badge></Col>
        </Row>
        <Row className="mb-2">
          <Col className="text-right">Ties:</Col>
          <Col className="text-left"><Badge>{ties}</Badge></Col>
        </Row>

        {/* { playInProgress ? <LoadingSpinner {...spinnerProps} /> : */}
        {/*     <>                                                    */}
        <Button color="primary" className="mr-2 game-action" onClick={this.play} value="rock" disabled={!playEnabled}> Rock </Button>
        <Button color="primary" className="mr-2 game-action" onClick={this.play} value="paper" disabled={!playEnabled}> Paper </Button>
        <Button color="primary" className="mr-2 game-action" onClick={this.play} value="scissors" disabled={!playEnabled}> Scissors </Button>
        <br />
        <br />
        {/*     </> */}
        {/* }       */}
        <Button color="danger" onClick={this.endCurrentGame} id="end-game">End Match</Button>
      </CardBody>
    );
    // return <LoadingSpinner loading/>


    return (
      <Card className="border-success game" style={{ display: "block" }} >
        <CardHeader className="text-white bg-success bg">
          Your Active Game
        </CardHeader>
        {/* {playInProgress ? <LoadingSpinner {...spinnerProps} /> : activeCardBody} */}
        {activeCardBody}
        <CardFooter><CardText>{loadingMessage}</CardText></CardFooter>
      </Card>
    );
  }
}


function mapStateToProps({ auth, gathering, game }) {
  const onlinePlayers = gathering != null ? gathering.onlinePlayers || [] : [];
  return {
    user: auth,
    gathering,
    players: onlinePlayers,
    game,
    gameUID: game.gameKey,
  };
}


export default connect(mapStateToProps, { endGame, makePlay, getRoundOutcome, changePlayerStatus })(Game);
