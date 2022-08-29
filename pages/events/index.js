import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

const AllEventsPage = () => {
  const allEvents = getAllEvents();

  return (
    <div>
      <EventSearch />
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventsPage;
