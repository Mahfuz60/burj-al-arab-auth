import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [logInUser, setLogInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + logInUser.email,{
        method:'GET',
        headers: { 'Content-Type': 'application/json',
                    authorization:`Bearer ${sessionStorage.getItem('token')}`
    }

    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  const bookStyle = {
    width: "600px",
    listStyle: "none",
    color: "white",
    border: "2px solid silver",
    margin: "10px",
    padding: "10px",
    fontSize: "18px",
    backgroundColor: "grey",
    marginLeft: "400px",
  };
  return (
    <div>
      <h3>You have:{bookings.length} Booking Room</h3>

      {bookings.map((book) => (
        <li  style={bookStyle} key={book._id}>
          Name:{book.name} From:
          {new Date(book.checkIn).toDateString("dd/MM/YY")} To:
          {new Date(book.checkOut).toDateString("dd/MM/YY")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
