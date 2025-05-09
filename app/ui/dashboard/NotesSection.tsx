'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Label, TextInput, Modal, Textarea } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      })));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch notes');
      setIsLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (newNote.title && newNote.content) {
      try {
        const response = await axios.post('/api/notes', {
          title: newNote.title,
          content: newNote.content
        });

        setNotes([
          ...notes,
          {
            ...response.data,
            createdAt: new Date(response.data.createdAt)
          }
        ]);
        
        setNewNote({ title: '', content: '' });
        setOpenModal(false);
      } catch (err) {
        setError('Failed to create note');
      }
    }
  };

  const handleUpdateNote = async () => {
    if (isEditing && newNote.title && newNote.content) {
      try {
        const response = await axios.put(`/api/notes?id=${isEditing.id}`, {
          title: newNote.title,
          content: newNote.content
        });

        setNotes(notes.map(note => 
          note.id === isEditing.id 
            ? { ...response.data, createdAt: new Date(response.data.createdAt) }
            : note
        ));

        setNewNote({ title: '', content: '' });
        setIsEditing(null);
        setOpenModal(false);
      } catch (err) {
        setError('Failed to update note');
      }
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`/api/notes?id=${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const openEditModal = (note: Note) => {
    setNewNote({ title: note.title, content: note.content });
    setIsEditing(note);
    setOpenModal(true);
  };

  const closeModal = () => {
    setNewNote({ title: '', content: '' });
    setIsEditing(null);
    setOpenModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Notes
        </h2>
        <Button onClick={() => setOpenModal(true)}>
          <HiPlus className="mr-2 h-5 w-5" />
          Add Note
        </Button>
      </div>

      <Modal show={openModal} onClose={closeModal}>
        <Modal.Header>{isEditing ? 'Edit Note' : 'Create New Note'}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Note Title" />
              </div>
              <TextInput
                id="title"
                placeholder="Enter note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="content" value="Note Content" />
              </div>
              <Textarea
                id="content"
                placeholder="Enter note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
                rows={4}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={isEditing ? handleUpdateNote : handleCreateNote}>
            {isEditing ? 'Update Note' : 'Create Note'}
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id}>
            <div className="flex justify-between items-start">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {note.title}
              </h5>
              <div className="flex gap-2">
                <Button 
                  color="gray" 
                  size="sm" 
                  onClick={() => openEditModal(note)}
                >
                  <HiPencil className="h-4 w-4" />
                </Button>
                <Button
                  color="failure"
                  size="sm"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <HiTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {note.content}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}