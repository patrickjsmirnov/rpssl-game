
const initialState = {
  roomId: null,
  isLinkShow: false,
  isReadyPlay: false,
  selectedGesture: null,
  clientId: null,
  gestureOfOpponent: null,
  waitingForOpponentGesture: false,
  resultOfGame: null,
  isInstructionsOpen: false
};

const rootReducer = (state = initialState, action) => state;


export default rootReducer;
