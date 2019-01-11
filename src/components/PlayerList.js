import React from 'react';
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

import defaultPlayerImage from '../img/user.png';

// import { joinGathering } from '../actions/gatheringActions';

const UserList = (props) => {
  // const { selectPlayer } = props;
  const { selectPlayer, auth } = props;
  const players = props.players && Array.isArray(props.players) ? props.players : [];

  // console.log('players', players, 'props', props);

  return (
    <Card className="border-info app" id="available-players" style={{ display: "block" }} >
      {/* <CardHeader className="text-white bg-info">
        Other Available Users
      </CardHeader> */}
      <CardBody className="">
        { players.map(player => (
          <Button
            key={player.uid}
            onClick={() => selectPlayer(player.uid)}
            color="primary"
            className="mr-1"
            outline
            disabled={player.uid === auth.uid}
          >{ player.uid === auth.uid ? `You (${player.displayName})` : player.displayName} <span> <img src={player.photoURL && player.photoURL.length > 0 ? player.photoURL : defaultPlayerImage} height="25" alt={player.displayName} /></span>
          </Button>
        ))}
      </CardBody>
      {/* <CardFooter className="card-footer">Select a user to play!</CardFooter> */}
    </Card>
  );
};

function mapStateToProps({ auth, gathering }) {
  const onlinePlayers = gathering != null ? gathering.onlinePlayers || [] : [];
  return { auth, gathering, players: onlinePlayers };
}

// export default connect(mapStateToProps, { joinGathering })(UserList);
export default connect(mapStateToProps)(UserList);
