import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { appRoutes } from "../enum/routes";
import { useNavigate } from "react-router-dom";
import Event from "./Event";
import CommonModal from "../components/Modal";
import AdminEventItem from "../components/Admin/AdminEventItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsAsync } from "../store/actions/events";
import { sGetAllEventsForAdmin } from "../store/selectors";
import RefreshButton from "../components/Button/RefreshButton";

const AdminEventList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector(sGetAllEventsForAdmin);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getAllEventsAsync());
  }, [dispatch]);

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate(appRoutes.ADMIN);
  };

  const handleChooseEvent = (id) => {
    setSelectedEventId(id);
    setOpenModal(true);
  };

  const handleChange = (event) => {
    const textValue = event.target.value;
    setSearchValue(textValue);
  };

  const handleRefresh = async () => {
    dispatch(getAllEventsAsync());
  };

  const renderBody = () => {
    let filteredEvents = events;

    if (searchValue.trim() !== "") {
      filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    return filteredEvents.length === 0 ? (
      <div className="flex justify-start font-medium px-4">No events match</div>
    ) : (
      filteredEvents.map((event) => (
        <AdminEventItem
          key={event._id}
          event={event}
          handleChooseEvent={handleChooseEvent}
        />
      ))
    );
  };

  return (
    <main className="h-screen overflow-hidden grid grid-cols-4">
      <aside className="px-5 border-r border-gray-100">
        <h1 className="w-full py-4 px-2 font-bold text-2xl font-['Lemon']">
          <span className="text-blue-800">Travel</span>
          <span className="text-blue-500">Vibes</span>
          <span className="text-xs">Admin</span>
        </h1>
        <nav>
          <ul className="flex flex-col space-y-2">
            <li className="font-bold hover:bg-gray-200 rounded-md py-1 px-2 hover:cursor-pointer">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon="fa-solid fa-calendar-days"
                  className="text-xl w-5"
                />
                <span className="text-lg">Events</span>
              </div>
            </li>
            <li className="hover:bg-gray-200 rounded-md py-1 px-2 hover:cursor-pointer">
              <button onClick={handleLogOut} className="rounded-full">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon
                    icon="fa-solid fa-right-from-bracket"
                    className="text-xl w-5"
                  />
                  <span className="text-lg">Log out</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <section className="col-span-3 flex flex-col h-screen overflow-auto">
        <div className="p-4 flex justify-start sticky top-0 z-50">
          <input
            className="flex-1 border mr-2 rounded-xl p-2 resize-none max-w-sm focus:outline-none bg-gray-100"
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
          />
          <RefreshButton onRefresh={handleRefresh} />
        </div>
        <CommonModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          className="p-5 h-[90%] w-[90%] overflow-auto z-50"
        >
          <Event id={selectedEventId} onClose={() => setOpenModal(false)} />
        </CommonModal>
        {events.length === 0 ? "No events" : renderBody()}
      </section>
    </main>
  );
};

export default AdminEventList;
