import { ActionTypes } from "../contants/action-types";

export const setMembers = (members) => {
  return {
    type: ActionTypes.SET_MEMBERS,
    payload: members,
  };
};

export const selectedMember = (member) => {
  return {
    type: ActionTypes.SELECTED_MEMBERS,
    payload: member,
  };
};
