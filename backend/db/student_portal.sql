--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

-- Started on 2025-05-28 13:57:15 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 2 (class 3079 OID 16399)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 227 (class 1259 OID 16555)
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id integer NOT NULL,
    group_id integer,
    title text NOT NULL,
    description text,
    weekday text,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    CONSTRAINT events_weekday_check CHECK ((weekday = ANY (ARRAY['Monday'::text, 'Tuesday'::text, 'Wednesday'::text, 'Thursday'::text, 'Friday'::text])))
);


--
-- TOC entry 226 (class 1259 OID 16554)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 226
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 225 (class 1259 OID 16538)
-- Name: group_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.group_members (
    id integer NOT NULL,
    student_id integer,
    group_id integer
);


--
-- TOC entry 224 (class 1259 OID 16537)
-- Name: group_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 224
-- Name: group_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_members_id_seq OWNED BY public.group_members.id;


--
-- TOC entry 223 (class 1259 OID 16529)
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


--
-- TOC entry 222 (class 1259 OID 16528)
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 222
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- TOC entry 229 (class 1259 OID 16574)
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    sender_id integer,
    text text NOT NULL,
    group_id integer,
    created_at timestamp without time zone DEFAULT now()
);


--
-- TOC entry 228 (class 1259 OID 16573)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 228
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 219 (class 1259 OID 16503)
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    profile_picture text DEFAULT '/images/default-avatar.png'::text
);


--
-- TOC entry 218 (class 1259 OID 16502)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 218
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- TOC entry 221 (class 1259 OID 16514)
-- Name: weekly_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.weekly_schedule (
    id integer NOT NULL,
    student_id integer,
    weekday text,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    CONSTRAINT weekly_schedule_weekday_check CHECK ((weekday = ANY (ARRAY['Monday'::text, 'Tuesday'::text, 'Wednesday'::text, 'Thursday'::text, 'Friday'::text])))
);


--
-- TOC entry 220 (class 1259 OID 16513)
-- Name: weekly_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.weekly_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 220
-- Name: weekly_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.weekly_schedule_id_seq OWNED BY public.weekly_schedule.id;


--
-- TOC entry 3249 (class 2604 OID 16558)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 16541)
-- Name: group_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_members ALTER COLUMN id SET DEFAULT nextval('public.group_members_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 16532)
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 16577)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 16506)
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 16517)
-- Name: weekly_schedule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.weekly_schedule ALTER COLUMN id SET DEFAULT nextval('public.weekly_schedule_id_seq'::regclass);


--
-- TOC entry 3428 (class 0 OID 16555)
-- Dependencies: 227
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (id, group_id, title, description, weekday, start_time, end_time) FROM stdin;
1	1	Programmering	Programmeringsgruppen	Tuesday	10:00:00	11:00:00
2	2	UX	UX Design	Thursday	09:00:00	11:30:00
\.


--
-- TOC entry 3426 (class 0 OID 16538)
-- Dependencies: 225
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.group_members (id, student_id, group_id) FROM stdin;
1	1	1
2	2	1
3	2	2
4	5	1
5	10	1
6	11	1
\.


--
-- TOC entry 3424 (class 0 OID 16529)
-- Dependencies: 223
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.groups (id, name, description) FROM stdin;
2	UX Design	I UX gruppen pratar vi om UX Design och läran om användarvänlighet.
1	Social	Den allmänna sociala kanalen.
3	Programmering	Programmeringsgruppen på tisdagar vid 10:00 sammlas vi i Tetris och går igenom almäna programmeringskoncept
\.


--
-- TOC entry 3430 (class 0 OID 16574)
-- Dependencies: 229
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, sender_id, text, group_id, created_at) FROM stdin;
1	1	Lorem ipsum schabado text, något viktigt här!	1	2025-05-23 08:53:49.150753
2	1	Lorem ipsum two, im coming for youuu	1	2025-05-23 08:53:49.150753
3	2	Denna posten ska inte ses av medlemmar i grupp 1, bara grupp 2	2	2025-05-23 08:53:49.150753
5	2	Hello	1	2025-05-23 08:53:49.150753
6	2	Hello UX design!	2	2025-05-23 08:53:49.150753
7	2	Testar Cors	1	2025-05-23 08:53:49.150753
8	1	Hacker!	1	2025-05-23 08:53:49.150753
9	1	123	1	2025-05-23 08:53:49.150753
10	1	456	1	2025-05-23 08:53:49.150753
11	1	Hej!	1	2025-05-23 08:53:49.150753
12	2	Hejsan	1	2025-05-23 09:45:02.08613
13	1	Hejsan Josef	1	2025-05-23 12:12:44.163232
\.


--
-- TOC entry 3420 (class 0 OID 16503)
-- Dependencies: 219
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, first_name, last_name, email, password, profile_picture) FROM stdin;
1	rasmus	bremholm	rasmus.bremholm@gmail.com	abc123	/images/default-avatar.png
4	Test	Testsson	test@test.com	abc123	/images/default-avatar.png
2	Alexander	Gustavsson	alexg@gmail.com	abc123	/images/default-avatar.png
5	Jacob	Pålinger	jpal@gmail.com	abc123	/images/default-avatar.png
10	Test+1	Testsson+1	abc123@gmail.com	abc123	/images/default-avatar.png
11	Test+2	Testsson+2	test+2@gmail.com	abc123	/images/default-avatar.png
\.


--
-- TOC entry 3422 (class 0 OID 16514)
-- Dependencies: 221
-- Data for Name: weekly_schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.weekly_schedule (id, student_id, weekday, start_time, end_time) FROM stdin;
1	1	Monday	08:00:00	16:00:00
2	1	Wednesday	08:00:00	16:00:00
3	1	Friday	08:00:00	16:00:00
4	2	Tuesday	09:00:00	12:00:00
5	2	Thursday	09:00:00	12:00:00
6	2	Friday	08:00:00	11:00:00
\.


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 226
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.events_id_seq', 2, true);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 224
-- Name: group_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.group_members_id_seq', 6, true);


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 222
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.groups_id_seq', 3, true);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 228
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 13, true);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 218
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 11, true);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 220
-- Name: weekly_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.weekly_schedule_id_seq', 6, true);


--
-- TOC entry 3265 (class 2606 OID 16563)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 3263 (class 2606 OID 16543)
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16536)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 16581)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 16512)
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- TOC entry 3257 (class 2606 OID 16510)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3259 (class 2606 OID 16522)
-- Name: weekly_schedule weekly_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.weekly_schedule
    ADD CONSTRAINT weekly_schedule_pkey PRIMARY KEY (id);


--
-- TOC entry 3271 (class 2606 OID 16564)
-- Name: events events_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- TOC entry 3269 (class 2606 OID 16549)
-- Name: group_members group_members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- TOC entry 3270 (class 2606 OID 16544)
-- Name: group_members group_members_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- TOC entry 3272 (class 2606 OID 16587)
-- Name: posts posts_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- TOC entry 3273 (class 2606 OID 16582)
-- Name: posts posts_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- TOC entry 3268 (class 2606 OID 16523)
-- Name: weekly_schedule weekly_schedule_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.weekly_schedule
    ADD CONSTRAINT weekly_schedule_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


-- Completed on 2025-05-28 13:57:19 CEST

--
-- PostgreSQL database dump complete
--

