# Fullstack Laboration 3

Länk till deployment: [Deployment](https://fullstack-laboration-3.vercel.app/)

## Table of Contents

-   [Introduction](#introduction)
-   [Requirements](#requirements)
-   [Documentation](#documentation)
    -   [API](#api)
    -   [Database Structure](#database-structure)
-   [Todo List](#todo)
-   [Changelog](#changelog)
-   [Post Mortem](#post-mortem)

## Introduction

For the third lab in my fullstack development course i wanted to focus on a couple of key areas.

-   First of all, i wanted to revisit NextJS and explore the oppurtunities that NextJS 15.0 offered.
-   I also wanted to try my hands at as well of a login/auth system as I could make at this time. Security and user experience are the main
    areas of auth I wanted to focus on, where a solid mechanism could keep the user signed in until they choose to logout.
-   Third, I wanted to make something that would have real life benefits, and the idea of the usecase for this app is a student portal
    for my old workplace.

## Requirements

In the course we have varius limitations that dictate how the app could be built. Main problems with my choise of techstack is that
the backend had to be written in express and using a postgre database. And for extra credits in the course the app had to be deployed
on the web. Something that atfirst didn't worry me, but became a huge headache down the line.

## Documentation

### API

Following this is a documentation of the different API routes and the data that gets returned. Updates Continously

### Database Structure

Database structure and avalible fields. Updates Continously

## Todo

### Pre Handin

-   [x] Profile Page
-   [ ] Edit Groups
-   [ ] Edit Profile Picture
-   [ ] Edit Name/Email
-   [ ] Add/Remove Events

### Post Handin

-   [ ] [Finish writing this documentation](#finish-documentation)
-   [ ] [Move the backend to NextJS](#move-backend)
-   [ ] [Concider Supabase as an alternative Database](#supabase-db)
-   [ ] [Concider Supabase Auth, moving away from JWT](#supabase-auth)
-   [ ] [Adjust all fetching to be done server side](#ssr)

## Changelog

Nothing to see here yet.

## Post Mortem

#### Finish Documentation

I'll aim to finish a version 0.1 of this documentation before i turn the project in, but the README has to be updated continously
with new updates done to the backend and DB. As for now I will treat this as a postmortem, before i continue on working on version 1.0.
Woring on the README will take place when I have time over from acctual implementation of features.

#### Move Backend

First thing ill do is to look to move the backend from Renders Express to the Nextjs App, i knew the separate backend wouldnt play nice with
Nextjs from the get go and Id have to make strange workarounds but as it was a requirement for the assignment i made the compromise. Having the backend on the server enables me
to add moore elegant form-handeling and API routes. Ill also look into the conventional logic of fetching on the server.

#### Supabase DB

I probably want to use the Supabase PostgreSQL database going forward. Nothing wrong with the Render once, but price wise it makes sense to go Supabase.
Since I also ant to head in the Supabase direction for auth its 2 birds 1 stone.

#### Supabase Auth

#### SSR
