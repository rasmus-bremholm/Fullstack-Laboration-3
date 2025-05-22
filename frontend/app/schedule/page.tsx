"use client";

// Detta paketet funkade inte, provar nästa
// import { Schedule } from "@konnorkooi/schedule-glance";

import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import type { weekday } from "../types/types";

const url = "https://fullstack-laboration-3.onrender.com";

export default function Shedule() {
	const localizer = momentLocalizer(moment);
	const [events, setEvents] = useState([]);

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
			const response = await fetch(`${url}/api/posts`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});

			// Måste typa denna, urk.... Väntar på console loggen och ser därefter
			if (!response.ok) {
				console.log("Vi kunde inte fetcha");
			} else {
				const { schedule } = await response.json();
				console.log(schedule);
				setEvents(
					schedule.map((item) => ({
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
			<Calendar
				defaultView='week'
				views={["week"]}
				toolbar={false}
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 700 }}
			/>
		</div>
	);
}
