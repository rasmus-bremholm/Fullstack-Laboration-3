"use client";

// Detta paketet funkade inte, provar nästa
// import { Schedule } from "@konnorkooi/schedule-glance";

import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import type { calendar_event, schedule_event, weekday } from "../types/types";

const url = "https://fullstack-laboration-3.onrender.com";

export default function Shedule() {
	const localizer = momentLocalizer(moment);
	const [events, setEvents] = useState<calendar_event[]>([]);

	const getDateForWeekdays = (weekday: string, time: string): Date => {
		const days: Record<weekday, number> = {
			Sunday: 0,
			Monday: 1,
			Tuesday: 2,
			Wednesday: 3,
			Thursday: 4,
			Friday: 5,
			Saturday: 6,
		};

		const [hours, minutes] = time.split(":");
		const now = new Date();
		const base = new Date(now.setDate(now.getDate() - now.getDay() + days[weekday as weekday]));
		base.setHours(+hours, +minutes, 0, 0);

		return new Date(base);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		async function fetchSchedule() {
			const response = await fetch(`${url}/api/schedule`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});

			// Måste typa denna, urk.... Väntar på console loggen och ser därefter
			if (!response.ok) {
				console.log("Vi kunde inte fetcha");
			} else {
				const { schedule }: { schedule: schedule_event[] } = await response.json();
				if (!schedule) {
					console.error("Inget sschema från APIn");
					return;
				}
				console.log(schedule);
				setEvents(
					schedule.map((item: schedule_event) => ({
						title: item.title,
						start: getDateForWeekdays(item.weekday, item.start),
						end: getDateForWeekdays(item.weekday, item.end),
					}))
				);
			}
		}
		fetchSchedule();
	}, []);

	return (
		<div>
			<h1>Ditt Veckoschema</h1>
			<Calendar
				defaultView='week'
				views={["week"]}
				toolbar={false}
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 700 }}
				// Sätter en begränsning. Jävla piss dokumentation.
				min={new Date(1989, 1, 1, 8, 0)}
				max={new Date(1989, 1, 1, 16, 45)}
			/>
		</div>
	);
}
