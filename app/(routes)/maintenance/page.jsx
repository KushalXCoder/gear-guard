"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Wrench } from 'lucide-react';

// Mock data for maintenance requests
const mockEvents = [
  {
    id: '1',
    title: 'CNC Machine #4 - Routine Check',
    start: new Date('2025-12-29T09:00:00'),
    end: new Date('2025-12-29T11:00:00'),
    type: 'Preventive',
    equipmentName: 'CNC Machine #4',
    technician: 'Alex Foster',
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'Hydraulic Press #3 - Oil Leak',
    start: new Date('2025-12-27T14:00:00'),
    end: new Date('2025-12-27T16:30:00'),
    type: 'Corrective',
    equipmentName: 'Hydraulic Press #3',
    technician: 'Sarah Chen',
    color: '#f97316'
  },
  {
    id: '3',
    title: 'Generator - Monthly Inspection',
    start: new Date('2025-12-30T10:00:00'),
    end: new Date('2025-12-30T12:00:00'),
    type: 'Preventive',
    equipmentName: 'Generator',
    technician: 'Marcus Reid',
    color: '#3b82f6'
  },
  {
    id: '4',
    title: 'HVAC Unit - Filter Replacement',
    start: new Date('2025-12-28T08:00:00'),
    end: new Date('2025-12-28T09:30:00'),
    type: 'Preventive',
    equipmentName: 'HVAC Unit',
    technician: 'Emily Torres',
    color: '#3b82f6'
  },
  {
    id: '5',
    title: 'Conveyor Belt #5 - Emergency Repair',
    start: new Date('2025-12-25T15:00:00'),
    end: new Date('2025-12-25T18:00:00'),
    type: 'Corrective',
    equipmentName: 'Conveyor Belt #5',
    technician: 'Alex Foster',
    color: '#ef4444',
    isOverdue: true
  },
  {
    id: '6',
    title: 'Boiler Unit #1 - Safety Check',
    start: new Date('2025-12-31T13:00:00'),
    end: new Date('2025-12-31T15:00:00'),
    type: 'Preventive',
    equipmentName: 'Boiler Unit #1',
    technician: 'Sarah Chen',
    color: '#3b82f6'
  },
  {
    id: '7',
    title: 'Forklift #4 - Battery Issue',
    start: new Date('2025-12-27T10:00:00'),
    end: new Date('2025-12-27T12:00:00'),
    type: 'Corrective',
    equipmentName: 'Forklift #4',
    technician: 'Marcus Reid',
    color: '#f97316'
  }
];

// Calendar Header Component
const CalendarHeader = ({ currentDate, onToday, onPrev, onNext, view, onViewChange }) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const getDateRange = () => {
    if (view === 'week') {
      const weekStart = getWeekStart(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Maintenance Calendar</h1>
        <p className="text-sm text-slate-600 mt-1">{getDateRange()}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
        >
          Today
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrev}
            className="p-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            className="p-2 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => onViewChange('week')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === 'week'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onViewChange('month')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              view === 'month'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Month
          </button>
        </div>
      </div>
    </div>
  );
};

// Calendar Sidebar Component
const CalendarSidebar = ({ currentDate, onDateSelect }) => {
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());

  const handleDateClick = (date) => {
    onDateSelect(date);
  };

  const handleMiniPrev = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setMiniCalendarDate(newDate);
  };

  const handleMiniNext = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setMiniCalendarDate(newDate);
  };

  const generateMiniCalendar = () => {
    const year = miniCalendarDate.getFullYear();
    const month = miniCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === currentDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-8 flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
            isToday
              ? 'bg-indigo-600 text-white font-semibold'
              : isSelected
              ? 'bg-indigo-50 text-indigo-600 font-medium'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            {monthNames[miniCalendarDate.getMonth()]} {miniCalendarDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={handleMiniPrev}
              className="p-1 text-slate-600 hover:text-slate-900 transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleMiniNext}
              className="p-1 text-slate-600 hover:text-slate-900 transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="h-8 flex items-center justify-center text-xs font-medium text-slate-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateMiniCalendar()}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-900 mb-3">Event Types</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-xs text-slate-700">Preventive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span className="text-xs text-slate-700">Corrective</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-xs text-slate-700">Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get week start (Sunday)
const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

// Week View Component
const WeekView = ({ currentDate, events }) => {
  const weekStart = getWeekStart(currentDate);
  const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 6 AM to 10 PM
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const getCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if (hours < 6 || hours > 22) return null;
    return ((hours - 6) * 60 + minutes) / (17 * 60) * 100;
  };

  const getEventPosition = (event, day) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    if (eventStart.toDateString() !== day.toDateString()) return null;

    const startHour = eventStart.getHours();
    const startMinute = eventStart.getMinutes();
    const endHour = eventEnd.getHours();
    const endMinute = eventEnd.getMinutes();

    if (startHour < 6 || startHour > 22) return null;

    const top = ((startHour - 6) * 60 + startMinute) / (17 * 60) * 100;
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const height = (duration / (17 * 60)) * 100;

    return { top, height };
  };

  const handleSlotClick = (day, hour) => {
    const dateTime = new Date(day);
    dateTime.setHours(hour, 0, 0, 0);
    console.log('Create Maintenance at:', dateTime.toISOString());
    alert(`Create new maintenance request for: ${dateTime.toLocaleString()}`);
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    alert(`Maintenance Request Details:
Equipment: ${event.equipmentName}
Type: ${event.type}
Technician: ${event.technician}
Start: ${event.start.toLocaleString()}
End: ${event.end.toLocaleString()}`);
  };

  const currentTimeTop = getCurrentTimePosition();
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-8 border-b border-slate-200">
        <div className="p-4 bg-slate-50"></div>
        {days.map((day, i) => {
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={i}
              className={`p-4 text-center border-l border-slate-200 ${
                isToday ? 'bg-blue-50' : 'bg-slate-50'
              }`}
            >
              <div className="text-xs font-semibold text-slate-600">{dayNames[i]}</div>
              <div
                className={`text-2xl font-semibold mt-1 ${
                  isToday ? 'text-indigo-600' : 'text-slate-900'
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative overflow-y-auto" style={{ maxHeight: '600px' }}>
        <div className="grid grid-cols-8">
          <div className="bg-slate-50">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 px-3 py-2 text-xs font-medium text-slate-600 border-b border-slate-200"
              >
                {hour % 12 || 12}:00 {hour >= 12 ? 'PM' : 'AM'}
              </div>
            ))}
          </div>

          {days.map((day, dayIndex) => {
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div key={dayIndex} className="relative border-l border-slate-200">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => handleSlotClick(day, hour)}
                    className={`h-16 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-all duration-200 ${
                      isToday ? 'bg-blue-50/30' : ''
                    }`}
                  />
                ))}

                {events
                  .map((event) => {
                    const pos = getEventPosition(event, day);
                    if (!pos) return null;
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        style={{
                          top: `${pos.top}%`,
                          height: `${pos.height}%`,
                          backgroundColor: event.color
                        }}
                        className={`absolute left-1 right-1 rounded-lg p-2 text-white text-xs cursor-pointer hover:opacity-90 transition-all duration-200 overflow-hidden ${
                          event.isOverdue ? 'ring-2 ring-red-600' : ''
                        }`}
                      >
                        <div className="font-semibold truncate">{event.equipmentName}</div>
                        <div className="opacity-90 mt-1">{event.type}</div>
                        <div className="opacity-80 mt-1 flex items-center gap-1">
                          <User size={10} />
                          <span className="truncate">{event.technician}</span>
                        </div>
                        {event.isOverdue && (
                          <div className="font-semibold mt-1">⚠ OVERDUE</div>
                        )}
                      </div>
                    );
                  })
                  .filter(Boolean)}

                {isToday && currentTimeTop !== null && (
                  <div
                    style={{ top: `${currentTimeTop}%` }}
                    className="absolute left-0 right-0 border-t-2 border-red-500 z-10"
                  >
                    <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Month View Component
const MonthView = ({ currentDate, events }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  const weeks = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
    days.push({ date: prevMonthDay, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ date: new Date(year, month, day), isCurrentMonth: true });
  }

  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
  }

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getEventsForDay = (date) => {
    return events.filter(
      (event) => new Date(event.start).toDateString() === date.toDateString()
    );
  };

  const handleDayClick = (date) => {
    console.log('Create Maintenance at:', date.toISOString());
    alert(`Create new maintenance request for: ${date.toLocaleDateString()}`);
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation();
    console.log('Event clicked:', event);
    alert(`Maintenance Request Details:
Equipment: ${event.equipmentName}
Type: ${event.type}
Technician: ${event.technician}
Start: ${event.start.toLocaleString()}
End: ${event.end.toLocaleString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 border-b border-slate-200">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <div key={day} className="p-4 text-center font-semibold text-sm text-slate-700 bg-slate-50 border-r border-slate-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 border-b border-slate-200 last:border-b-0">
          {week.map((day, dayIndex) => {
            const isToday = day.date.toDateString() === new Date().toDateString();
            const dayEvents = getEventsForDay(day.date);

            return (
              <div
                key={dayIndex}
                onClick={() => day.isCurrentMonth && handleDayClick(day.date)}
                className={`min-h-[120px] p-2 border-r border-slate-200 last:border-r-0 cursor-pointer hover:bg-slate-50 transition-all duration-200 ${
                  !day.isCurrentMonth ? 'bg-slate-50/50' : ''
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div
                  className={`text-sm font-semibold mb-2 ${
                    !day.isCurrentMonth
                      ? 'text-slate-400'
                      : isToday
                      ? 'text-indigo-600'
                      : 'text-slate-900'
                  }`}
                >
                  {day.date.getDate()}
                </div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(e, event)}
                      style={{ backgroundColor: event.color }}
                      className="text-xs text-white px-2 py-1 rounded truncate hover:opacity-90 transition-all duration-200"
                    >
                      {event.equipmentName}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-slate-600 px-2">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Main Calendar Component
const MaintenanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <CalendarHeader
          currentDate={currentDate}
          onToday={handleToday}
          onPrev={handlePrev}
          onNext={handleNext}
          view={view}
          onViewChange={handleViewChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {view === 'week' ? (
            <WeekView currentDate={currentDate} events={mockEvents} />
          ) : (
            <MonthView currentDate={currentDate} events={mockEvents} />
          )}

          <CalendarSidebar currentDate={currentDate} onDateSelect={handleDateSelect} />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;