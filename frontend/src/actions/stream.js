import streams from "../apis/streams";
import history from "../history";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

const owner = localStorage.getItem("user");

export const createStream = (formValues) => async (dispatch) => {
  const response = await streams.post("/streams/stream", {
    ...formValues,
    owner,
  });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  history.push("/");
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/stream/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  const response = await streams.delete(`/streams/stream/${id}`);

  dispatch({ type: DELETE_STREAM, payload: response.data._id });

  history.push("/");
};
