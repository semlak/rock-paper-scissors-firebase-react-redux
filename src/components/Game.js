import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardTitle,
  CardText,
  CardFooter,
  CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';

// import firebase from '../firebase';
import LoadingSpinner from './LoadingSpinner';
import {
  endGame,
  makePlay,
  getRoundOutcome,
} from '../actions/game';
import gameStatuses from '../gameStatuses';


class Game extends Component {
  state = this.getInitialState();

  getInitialState() {
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
      playInProgress,
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
      // maxNumberOfGames,
      // gameInProgress,
      // player1or2,
      playInProgress,
    });
  }

  componentDidUpdate(prevProps) {
    const { gameStatus } = this.props.game;
    if (gameStatus === gameStatuses.DETERMINING_ROUND_WINNER && gameStatus !== prevProps.game.gameStatus && prevProps.game.gameStatus.length > 0) {
      this.props.getRoundOutcome(this.props.gameUID);
    }
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
      // messages,
      // maxNumberOfGames,
      // gameInProgress,
      // playInProgress,
    } = this.state; 

    const { gameStatus } = this.props.game;
    // const playEnabled = gameStatus !== gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT && gameStatus !== gameStatuses.DETERMINING_ROUND_WINNER;
    const playEnabled = true;


    // const loadingMessage = 'You played ...';
    const loadingMessage = gameStatus;

    // const loadingMessageClass = '
    const loadingMessageStyle = { textAlign: 'center', marginTop: '1em', size: '22px' };
    // const { loading, file } = this.state;
    const playInProgress = !playEnabled;
    // playInProgress = false;
    const loading = playInProgress;
    const spinnerProps = {
      // loadingMessage,
      loadingMessageStyle,
      loading,
      className: 'loading-viewer',
      // delay: 500,
      // fadeIn: true,
      id: "loading-spinner",
    };
    // console.log('spinnerProps', spinnerProps);


    const activeCardBody = (
      <CardBody className="">
        <p> Your Opponent: <span id="opponent-display-name">{opponentName || "Loading..."}</span></p>
        <p>
          Your score: <span id="your-score">{myWins}</span>
        </p>
        <p>
          Opponent Score: <span id="opponent-score">{opponentWins}</span>
        </p>
        <p>
          Ties: <span id="ties">{ties}</span>
        </p>
        { playInProgress ? <LoadingSpinner {...spinnerProps} /> :
            <>
              <Button color="primary" className="mr-2 game-action" onClick={this.play} value="rock" disabled={!playEnabled}> Rock </Button>
              <Button color="primary" className="mr-2 game-action" onClick={this.play} value="paper" disabled={!playEnabled}> Paper </Button>
              <Button color="primary" className="mr-2 game-action" onClick={this.play} value="scissors" disabled={!playEnabled}> Scissors </Button>
              <br />
              <br />
            </>
        }
        <Button color="danger" onClick={this.endCurrentGame} id="end-game">End Game</Button>
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


export default connect(mapStateToProps, { endGame, makePlay, getRoundOutcome })(Game);
