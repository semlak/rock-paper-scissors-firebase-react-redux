import React, { Component } from 'react';
import {
  // Button,
  // Card,
  CardBody,
  // CardTitle,
  // CardText,
  // CardFooter,
  // CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';


import { joinGathering, } from '../actions/gatheringActions';
import { requestGame } from '../actions/game';
import { PlayerList, Game } from '../components';

class Main extends Component {
  // const { users, selectUser } = props;
  state = {
  };

  // counter = 0;

  componentDidMount() {
    const { props: nextProps } = this;
    // console.log('in componentWillUpdate for \'Main\', nextProps', nextProps);
    if (nextProps.auth && !(nextProps.gathering && Object.keys(nextProps.gathering).length > 0)) {
      // console.log('sending joinGathering request');
      this.props.joinGathering(nextProps.auth);
      // this.context.router.history.push("/app");
    }
    else {
      // console.log('not joining gathering');
    }
  }


  selectPlayer = (uid) => {
    const { auth: user, players } = this.props;
    // console.log('creating action request for user, who selected to play against player uid', uid);
    return this.props.requestGame(user, players.find(player => player.uid === uid));
  }


  render() {
    // const { appStatus, appHeaderText, game } = this.props;
    const { game } = this.props;
    const players = this.props.players && Array.isArray(this.props.players) ? this.props.players : [];
    // console.log('rendering main');

    // console.log('players', players, 'this.props', this.props);
    return (
      <div id="main" style={{ display: "block" }} >
        {/* <Card className="border-info " id="main" style={{ display: "block" }} > */}
        {/* <CardHeader className="text-white bg-info">{appHeaderText || ' '}</CardHeader> */}
        <CardBody className="">
          { game && Object.keys(game).length > 1 && game.gameKey && game.gameKey.length > 1 ?
            <Game gameUID={game.key} /> :
            !players || players.length < 0 ?
              <div>Loading...</div> :
              <PlayerList players="players" selectPlayer={this.selectPlayer} /> }
        </CardBody>
        {/* <CardFooter className="card-footer">{appStatus || ' '}</CardFooter> */}
        {/* </Card> */}
      </div>
    );
  }
}

function mapStateToProps({ auth, gathering, game }) {
  const onlinePlayers = gathering != null ? gathering.onlinePlayers || [] : [];
  return {
    auth,
    gathering,
    players: onlinePlayers,
    game
  };
}

export default connect(mapStateToProps, { joinGathering, requestGame })(Main);
