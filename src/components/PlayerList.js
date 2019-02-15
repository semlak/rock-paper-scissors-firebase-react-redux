import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardTitle,
  // CardText,
  // CardFooter,
  // CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';

// import defaultPlayerImage from '../img/user.png';

// import { joinGathering } from '../actions/gatheringActions';
import {
  changePlayerStatus,
} from '../actions/gatheringActions';


const PlayerAvatar = ({ player }) => (
  player.photoURL && player.photoURL.length > 0 ?
    <img src={player.photoURL} height="25" alt={player.displayName} /> :
    <Avatar name={player.displayName} color={Avatar.getRandomColor('sitebase', ['green'])} size="25" textSizeRatio={2} />
);

// const UserList = (props) => {
class UserList extends Component {
  componentDidMount() {
    this.updatePlayerStatusIfNeccessary();
    // console.log('in componentDidMount');
    // const { auth: user, gathering, } = this.props;
    // const inGame = false;
    // const player = this.props.players.find(player1 => player1.uid === user.uid);
    // // console.log('player', player);
    // if (player && player.inGame !== inGame) {
    //   const player1 = { ...player, inGame };
    //   // console.log('going to updatePlayerStatus, player1', player1);
    //   this.props.changePlayerStatus(player1, gathering);
    // }
  }

  componentDidUpdate() {
    this.updatePlayerStatusIfNeccessary();
    // console.log('in componentDidUpdate');
    // const { auth: user, gathering, } = this.props;
    // const inGame = false;
    // const player = this.props.players.find(player1 => player1.uid === user.uid);
    // // console.log('player', player);
    // if (player && player.inGame !== inGame) {
    //   const player1 = { ...player, inGame };
    //   // console.log('going to updatePlayerStatus, player1', player1);
    //   this.props.changePlayerStatus(player1, gathering);
    // }
  }

  updatePlayerStatusIfNeccessary() {
    const { auth: user, gathering, } = this.props;
    const inGame = false;
    const player = this.props.players.find(player1 => player1.uid === user.uid);
    // console.log('player', player);
    if (player && player.inGame !== inGame) {
      const player1 = { ...player, inGame };
      // console.log('going to updatePlayerStatus, player1', player1);
      this.props.changePlayerStatus(player1, gathering);
    }
  }


  render() {
    // const { selectPlayer } = props;
    const { props } = this;
    const { selectPlayer, auth } = props;
    const players = props.players && Array.isArray(props.players) ? props.players : [];

    // console.log('players', players, 'props', props);

    return (
      <Card className="border-info app" id="available-players" style={{ display: "block" }} >
        {/* <CardHeader className="text-white bg-info">
          Other Available Users
        </CardHeader> */}
        <CardBody className="">
          { players.length < 1 ? 'Loading players...' : players.map(player => (
            <Button
              key={player.uid}
              onClick={() => selectPlayer(player.uid)}
              color="primary"
              className="mr-1 mb-1"
              outline
              disabled={player.uid === auth.uid || player.inGame}
              title={`${player.displayName}${player.inGame ? ' is currently in a game' : ''}`}
            >{ player.uid === auth.uid ? `You (${player.displayName})` : player.displayName} <span> <PlayerAvatar player={player} /></span>
            </Button>
          ))}
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
export default connect(mapStateToProps, { changePlayerStatus })(UserList);
