import { ActionTypes } from "../contants/action-types";

const initialState = {
  members: [
    // {
    //   _id: 1,
    //   name: "Murad",
    // },
  ],
};

export const memberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MEMBERS:
      return { ...state, members: payload };

    default:
      return state;
  }
};
