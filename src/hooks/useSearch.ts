import { useMemo, useState } from 'react';

import { Event } from '../types';
import { getWeekDates } from '../utils/dateUtils';
import { getFilteredEvents } from '../utils/eventUtils';
import { expandRecurringEvents } from '../utils/repeatUtils';

export const useSearch = (events: Event[], currentDate: Date, view: 'week' | 'month') => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    const searchedEvents = getFilteredEvents(events, searchTerm, currentDate, view);

    let rangeStart: Date;
    let rangeEnd: Date;

    if (view === 'week') {
      const weekDates = getWeekDates(currentDate);
      rangeStart = weekDates[0];
      rangeEnd = weekDates[6];
    } else { // month view
      rangeStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      rangeEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
    }

    return expandRecurringEvents(searchedEvents, rangeStart, rangeEnd);
  }, [events, searchTerm, currentDate, view]);

  return {
    searchTerm,
    setSearchTerm,
    filteredEvents,
  };
};
