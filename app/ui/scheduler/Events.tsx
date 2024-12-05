"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { 
  Modal, 
  Label, 
  TextInput, 
  Textarea, 
  Button, 
  Select 
} from 'flowbite-react';
import { 
  CalendarDays, 
  PlaneTakeoff, 
  MapPin, 
  NotebookText, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { getTravelEvents, createTravelEvent } from '@/app/lib/action';

interface TravelEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    description: string;
    status: 'PLANNED' | 'BOOKED';
  };
}

interface NewEventForm {
  title: string;
  description: string;
  start: string;
  end?: string;
  status: 'PLANNED' | 'BOOKED';
}

interface TourismCalendarProps {
  userId: string;
}

const TourismCalendar: React.FC<TourismCalendarProps> = ({ userId }) => {
  const [events, setEvents] = useState<TravelEvent[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: '',
    description: '',
    start: '',
    end: '',
    status: 'PLANNED'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userEvents = await getTravelEvents(userId);
        setEvents(userEvents.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start.toISOString(),
          end: event.end?.toISOString(),
          backgroundColor: event.status === 'BOOKED' ? '#22c55e' : '#f97316', // Green for booked, Orange for planned
          borderColor: event.status === 'BOOKED' ? '#22c55e' : '#f97316',
          extendedProps: {
            description: event.description || '',
            status: event.status
          }
        })));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userId]);

  const handleDateClick = (arg: DateClickArg): void => {
    setSelectedDate(arg.dateStr);
    setNewEvent({
      ...newEvent,
      start: arg.dateStr,
      end: ''
    });
    setOpenModal(true);
  };

  const handleEventClick = (arg: EventClickArg): void => {
    const event = arg.event;
    setNewEvent({
      title: event.title,
      description: event.extendedProps.description as string,
      start: event.startStr,
      end: event.endStr || '',
      status: event.extendedProps.status as 'PLANNED' | 'BOOKED'
    });
    setSelectedDate(event.startStr);
    setOpenModal(true);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      const eventData = {
        ...newEvent,
        userId: userId
      };

      const createdEvent = await createTravelEvent(eventData);

      // Update local state
      const newEventFormatted: TravelEvent = {
        id: createdEvent.id,
        title: createdEvent.title,
        start: createdEvent.start.toISOString(),
        end: createdEvent.end?.toISOString(),
        backgroundColor: createdEvent.status === 'BOOKED' ? '#22c55e' : '#f97316',
        borderColor: createdEvent.status === 'BOOKED' ? '#22c55e' : '#f97316',
        extendedProps: {
          description: createdEvent.description || '',
          status: createdEvent.status
        }
      };

      // Update events state
      setEvents(prevEvents => {
        // Remove existing event if it exists
        const filteredEvents = prevEvents.filter(e => e.id !== newEventFormatted.id);
        return [...filteredEvents, newEventFormatted];
      });

      // Reset form and close modal
      setNewEvent({
        title: '',
        description: '',
        start: '',
        end: '',
        status: 'PLANNED'
      });
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    } 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 py-8 px-4 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl"
        >
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <CalendarDays className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white">
            Travel Planner
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-wrap gap-4 justify-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white/30 dark:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white font-semibold">Booked</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white/30 dark:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-white font-semibold">Planned</span>
          </motion.div>
        </motion.div>
  
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        >
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
            eventClassNames={(arg) => 'hover:scale-105 transition-transform duration-200'}
            eventColor="#10B981"
            eventBorderColor="#10B981"
            contentHeight="auto"
            // Dark mode specific calendar styling can be added here if needed
          />
        </motion.div>
  
        <Modal 
          show={openModal} 
          onClose={() => setOpenModal(false)}
          size="md"
          popup
        >
          <Modal.Header className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 text-white">
            <div className="flex items-center gap-3 p-4">
              <PlaneTakeoff className="w-6 h-6" />
              <span className="text-lg font-semibold">
                {selectedDate ? `Add Event for ${selectedDate}` : 'Event Details'}
              </span>
            </div>
          </Modal.Header>
          <Modal.Body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-500" /> Title
                </Label>
                <TextInput
                  id="title"
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                  required
                  icon={() => <MapPin className="w-5 h-5 text-green-500" />}
                />
              </div>
              <div>
              <Label htmlFor="description" className="flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                <NotebookText className="w-4 h-4 text-blue-500" /> Description
              </Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Add notes or description"
                required
                rows={4}
                className="text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start" className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-500" /> Start Date
                  </Label>
                  <TextInput
                    id="start"
                    type="date"
                    value={newEvent.start.split('T')[0]}
                    onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end" className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-500" /> End Date (Optional)
                  </Label>
                  <TextInput
                    id="end"
                    type="date"
                    value={newEvent.end ? newEvent.end.split('T')[0] : ''}
                    onChange={(e) => setNewEvent({...newEvent, end: e.target.value || undefined})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status" className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> Status
                </Label>
                <Select
                  id="status"
                  value={newEvent.status}
                  onChange={(e) => setNewEvent({...newEvent, status: e.target.value as 'PLANNED' | 'BOOKED'})}
                  required
                >
                  <option value="PLANNED">Planned</option>
                  <option value="BOOKED">Booked</option>
                </Select>
              </div>
            </motion.div>
          </Modal.Body>
          <Modal.Footer className="bg-white/95">
            <Button 
              color="gray" 
              onClick={() => setOpenModal(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                color="success" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Save Event
                  </>
                )}
              </Button>
            </motion.div>
          </Modal.Footer>
        </Modal>
      </div>
    </motion.div>
  );
};

export default TourismCalendar;