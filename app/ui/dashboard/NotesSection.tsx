// app/ui/dashboard/NotesSection.tsx
'use client';

import React, { useState } from 'react';
import { Card, Button, Label, TextInput, Modal, Textarea } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          title: newNote.title,
          content: newNote.content,
          createdAt: new Date(),
        },
      ]);
      setNewNote({ title: '', content: '' });
      setOpenModal(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create New Note</Modal.Header>
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
          <Button onClick={handleCreateNote}>Create Note</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
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
                <Button color="gray" size="sm">
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