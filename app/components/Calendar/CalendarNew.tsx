'use client';
import { useEffect, useState } from 'react';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';
import { DayPicker } from 'react-day-picker';

interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface CalendarProps {
  serviceSlug: string;
  onSlotSelect?: (slot: AvailabilitySlot) => void;
}

export default function CalendarNew({ serviceSlug, onSlotSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch availability for the selected month
  const fetchAvailability = async (date: Date) => {
    setLoading(true);
    try {
      const startDate = startOfDay(date);
      const endDate = endOfDay(addDays(startDate, 30)); // Next 30 days
      
      const response = await fetch(
        `/api/availability?serviceId=${serviceSlug}&from=${startDate.toISOString()}&to=${endDate.toISOString()}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailability(data.availability || []);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, serviceSlug]);

  const getAvailableSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability.filter(slot => slot.date === dateStr && !slot.isBooked);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slot: AvailabilitySlot) => {
    if (onSlotSelect) {
      onSlotSelect(slot);
    }
  };

  const availableSlots = selectedDate ? getAvailableSlotsForDate(selectedDate) : [];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3>Select a Date</h3>
      </div>
      
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={(date) => date < new Date()}
        className="calendar-picker"
      />

      {selectedDate && (
        <div className="time-slots">
          <h4>Available Times for {format(selectedDate, 'MMMM d, yyyy')}</h4>
          {loading ? (
            <p>Loading available times...</p>
          ) : availableSlots.length > 0 ? (
            <div className="slots-grid">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  className="time-slot-btn"
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          ) : (
            <p>No available times for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
