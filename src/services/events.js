import axios from "axios";
import { authorizationHeader } from "./jwt";
import { CONST } from "../constaints";

export const getEventDetail = async (id, token) => {
  return axios.get(`${CONST.API_URL}/api/events/${id}`, {
    headers: {
      Authorization: authorizationHeader(token),
    },
  });
};

// For admin
export const getAllEvents = async (adminToken) => {
  return axios.get(`${CONST.API_URL}/api/admin/events`, {
    headers: {
      Authorization: authorizationHeader(adminToken),
    },
  });
};

export const updateEventStatus = async (adminToken, id, status) => {
  return axios.put(
    `${CONST.API_URL}/api/admin/events/${id}/verify`,
    { status },
    {
      headers: {
        Authorization: authorizationHeader(adminToken),
      },
    }
  );
};
