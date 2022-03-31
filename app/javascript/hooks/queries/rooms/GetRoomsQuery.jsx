import React from "react"
import { useQuery } from "react-query";
import axios from "axios";

export default function GetRoomsQuery() {
  return useQuery("getRooms", () =>
    axios.get('/api/v1/rooms.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => resp.data.data)
  );
}

