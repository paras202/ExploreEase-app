"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Label, TextInput, Textarea, Button, Select } from 'flowbite-react';
import { CalendarDays } from 'lucide-react';

const TourismCalendar = () => {
  // Dummy data for booked events
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Paris Trip',
      start: '2024-11-25',
      end: '2024-11-28',
      backgroundColor: '#22c55e',
      extendedProps: {
        description: 'Booked flight and hotel for Paris vacation',
        status: 'booked'
      }
    },
    {
      id: '2',
      title: 'Beach Resort',
      start: '2024-12-15',
      end: '2024-12-20',
      backgroundColor: '#22c55e',
      extendedProps: {
        description: 'All-inclusive beach resort booking',
        status: 'booked'
      }
    },
    {
      id: '3',
      title: 'Mountain Trek',
      start: '2024-12-05',
      backgroundColor: '#f97316',
      extendedProps: {
        description: 'Interested in mountain trekking tour',
        status: 'planned'
      }
    }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    status: 'planned'
  });

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setOpenModal(true);
  };

  const handleEventClick = (arg) => {
    const event = arg.event;
    setNewEvent({
      title: event.title,
      description: event.extendedProps.description,
      status: event.extendedProps.status
    });
    setSelectedDate(event.startStr);
    setOpenModal(true);
  };

  const handleSubmit = () => {
    const eventId = Math.random().toString(36).substr(2, 9);
    const backgroundColor = newEvent.status === 'booked' ? '#22c55e' : '#f97316';
    
    setEvents([...events, {
      id: eventId,
      title: newEvent.title,
      start: selectedDate,
      backgroundColor,
      extendedProps: {
        description: newEvent.description,
        status: newEvent.status
      }
    }]);

    setNewEvent({ title: '', description: '', status: 'planned' });
    setOpenModal(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-2">
        <CalendarDays className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Travel Calendar</h1>
      </div>
      
      <div className="mb-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-gray-700 dark:text-gray-200">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500" />
          <span className="text-gray-700 dark:text-gray-200">Planned</span>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {selectedDate ? `Add Event for ${selectedDate}` : 'Event Details'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Add notes or description"
                required
                rows={4}
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <Select
                id="status"
                value={newEvent.status}
                onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                required
              >
                <option value="planned">Planned</option>
                <option value="booked">Booked</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourismCalendar;