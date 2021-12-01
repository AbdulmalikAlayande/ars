import Modal from "../Components/UI/Modal";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import { useState, useEffect } from "react";

import { ReservationItem } from "../Components/User/Flights/ReservationItem";
export const ViewReservedFlights = () => {
  const [deleteId, setDeleteId] = useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onCancelHandler(id) {
    setDeleteId(id);
    setModalIsOpen(true);
  }

  async function deleteHandler() {
    await fetch(
      `http://localhost:5000/api/reservations/deleteReservation/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    setModalIsOpen(false);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/reservations/userReservations/61a4ff997630339cd3b786ae`
      );

      const data = await response.json();

      setReservations(data.data);
      setIsLoading(false);
    };

    if (!ModalIsOpen) {
      fetchData();
    }
  }, [ModalIsOpen]);

  const listItems =
    reservations === [] ? null : (
      <ul>
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation._id}
            reservation={reservation}
            onCancel={onCancelHandler}
          ></ReservationItem>
        ))}
      </ul>
    );

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {ModalIsOpen ? (
        <Modal onClose={closeModalHandler}>
          <h2>Are you sure you want to Cancel this reservation?</h2>
          <button
            style={{ margin: "10px" }}
            className="btn--flat"
            onClick={closeModalHandler}
          >
            Cancel
          </button>
          <button className="btn" onClick={deleteHandler}>
            Yes
          </button>
        </Modal>
      ) : null}

      <div style={{ marginBottom: "-10px" }} className="centered">
        <h2>Your reservations</h2>
      </div>
      <hr />
      {listItems}
    </div>
  );
};

/*{ModalIsOpen ? (
  <Modal>
    <h2>Are you sure you want to delete this flight?</h2>
    <button onClick={closeModalHandler}>Cancel</button>
    <button
      style={{ margin: "10px", fontSize: "1rem" }}
      onClick={closeModalHandler}
    >
      Yes
    </button>
  </Modal>
) : null}
{ModalIsOpen && <Backdrop onClick={closeModalHandler} />}*/
