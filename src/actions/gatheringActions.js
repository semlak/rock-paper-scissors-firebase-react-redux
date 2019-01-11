import firebase from '../firebase';
// import { gathering } from '../firebase';
import Gathering from '../gathering';
// import { FETCH_PLAYERS, JOIN_GATHERING, LEAVE_GATHERING } from './types';
import { gatheringActions } from './types';
import { createNewGameListener } from './game';

// export const fetchPlayers = (gathering) => dispatch => {
//   // console.log('in fetchPlayers action, gathering', gathering);
//   if (gathering != null && typeof gathering.onUpdated === 'function') {
//     // console.log('found gathering');
//     gathering.onUpdated((count, players) => { 
//       // console.log("gathering players", players, 'count', count);
//       const onlinePlayers = count > 0 && players && Object.keys(players).length > 0 ?
//         Object.keys(players)
//           // .filter(uid => uid !== user.uid)
//           .map(uid => ({ ...players[uid], uid })) :
//         [];
//       // console.log('dispatching online players ', onlinePlayers);
//       dispatch({
//         type: FETCH_PLAYERS,
//         payload: onlinePlayers
//       });
//       // this.setState({ onlinePlayers });
//     });
//   }
//   else {
//     // console.log('did not find gathering ref');
//   }
// };

export const joinGathering = (user) => dispatch => {
  // console.log('in joinGathering action, user', user);
  const gathering = new Gathering(firebase.database(), 'OnlineUsers');
  // gathering = new Gathering(firebase.database(), 'OnlineUsers');
  const inGame = false;
  const { photoURL } = user;
  // gathering.join(user.id, { displayName: user.displayName, inGame, photoURL });
  gathering.join(user.uid, { displayName: user.displayName, inGame, photoURL })
    .then(() => {
      // console.log('in then clause of joinGathering, gathering:', gathering);
      // fetchPlayers(gathering);
      gathering.onUpdated((count, players) => { 
        // console.log("gathering players", players, 'count', count);
        const onlinePlayers = count > 0 && players && Object.keys(players).length > 0 ?
          Object.keys(players)
            // .filter(uid => uid !== user.uid)
            .map(uid => ({ ...players[uid], uid })) :
          [];
        // console.log('dispatching online players ', onlinePlayers);
        dispatch({
          type: gatheringActions.FETCH_PLAYERS,
          payload: onlinePlayers
        });
        // this.setState({ onlinePlayers });
        // get my gathering id
        // const myGatheringUid = onlinePlayers.find(player => player.uid === user.uid);
        // dispatch({
        //   type: 'UPDATE_ID',
        //   payload: myGatheringUid
        // });
      });
      // createNewGameListener(dispatch, user.uid);
      dispatch(createNewGameListener(user.uid));
    })
    .catch(error => console.log('error when joining gathering', error));
  // gathering.onUpdated((count, players) => { 
  //   console.log("gathering players", players, 'count', count);
  //   const onlinePlayers = count > 0 && players && Object.keys(players).length > 0 ?
  //     Object.keys(players)
  //       .filter(uid => uid !== user.uid)
  //       .map(uid => ({ ...players[uid], uid })) :
  //     [];
  //   // this.setState({ onlinePlayers });
  // });
  dispatch({
    type: gatheringActions.JOIN_GATHERING,
    payload: gathering
    // payload: null
  });
};

export const leaveGathering1 = (user, gathering) => dispatch => {
  console.log('in leaveGathering action, user', user);
  // const gathering = 
  gathering.leave();
  dispatch({
    type: gatheringActions.LEAVE_GATHERING,
    payload: null
  });
};


// export const leaveGathering = () => {
export const leaveGathering = (gathering) => dispatch => {
  // console.log('in leaveGathering action, user', user);
  // const gathering = 
  // const gathering = new Gathering(firebase.database(), 'OnlineUsers');
  // const gathering = firebase.database().ref('gatherings/OnlineUsers');
  // const gathering = firebase.database().ref('gatherings');
  // gathering.on('value', snapshot => console.log('gathering snapshot:', snapshot.val()));
  // gathering.leave();
  if (gathering != null && typeof gathering !== 'undefined') {
    // console.log('gathering', gathering);
    gathering.leave();
    dispatch({
      type: gatheringActions.LEAVE_GATHERING,
      // payload: null
    });
  }
};
