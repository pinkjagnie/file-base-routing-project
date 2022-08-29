import { useRouter } from "next/router";

import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";

import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numberYear = +filteredYear;
  const numberMonth = +filteredMonth;

  if (
    isNaN(numberYear) ||
    isNaN(numberMonth) ||
    numberYear > 2023 ||
    numberYear < 2021 ||
    numberMonth < 1 ||
    numberMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please select one more time!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEventsList = getFilteredEvents({
    year: numberYear,
    month: numberMonth,
  });

  if (!filteredEventsList || filteredEventsList.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events has been planned for selected period</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numberYear, numberMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEventsList} />
    </div>
  );
};

export default FilteredEventsPage;
