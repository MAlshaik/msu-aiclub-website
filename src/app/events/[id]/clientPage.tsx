"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Event, eventsData } from '../data';
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import ReactMarkdown from 'react-markdown';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { addUserToEvent, deleteEvent } from '~/server/actions/event';
import { Footer } from '~/components/landing/footer';

export default function EventPageClient({ 
    event,
    isAdmin,
    user
}: { 
    event: any,
    isAdmin: boolean,
    user: any
}) {
    const [code, setCode] = useState('');
    const router = useRouter();

    console.log("user", user);

    if (!event) return <div>Event not found</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const eventId = await addUserToEvent(event.id, user.id, code);

        if (eventId === null) {
            alert("Invalid code");
        } else {
            alert("Event registered successfully");
        }
    };

    const handleDelete = async () => {
        const out = await deleteEvent(event.id);

        if (!out) {
          alert("Error deleting event");
        } else {
          router.push('/events');
        }
    };
 

  return (
    <div className="max-w-[1024px] mx-auto py-8 px-4 relative pt-28">
      {isAdmin && (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/events/edit/${event.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      {event.photo && (
        <Image src={event.photo} alt={event.title} width={800} height={400} className="w-full object-cover max-h-96 mb-6" />
      )}
      {event.description && (
        <div className="prose dark:prose-invert mb-6 !text-foreground"
        dangerouslySetInnerHTML={{ __html: event.description }}
        >
        </div>
      )}
      <div className="mb-4">
        <p><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
        <p><strong>Place:</strong> {event.place}</p>
        <p><strong>Points:</strong> {event.points}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!user}>Register for Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              type="text"
              placeholder="Enter registration code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
