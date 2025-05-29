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

#### Get Student

Gets the current logged in user. JWT token has to be passed to the request.headers.authorization field.

```
/api/user
```

This returns the entire user object wich is structured like so:

```javascript
{
    student: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        profile_picture: string
    },
    schedule: {
        weekday: string,
        start_time: string,
        end_time: string
    },
    groups: [
        {
        id: number,
        name: string,
        description: string
    },
    ],
    events: [
        {
           id: number,
           group_id: number,
           title: string,
           description: string,
           weekday: string, (Allowed "Monday", "Tuesday", "Wednesday", "Thursday" , "Friday")
           start_time: string, (Time without timezone hh:mm:ss)
           end_time: string, (Time without timezone hh:mm:ss)
        }
    ]
}
```

### Database Structure

Database structure and avalible fields. Updates Continously

## Todo

### Pre Handin

-   [x] Profile Page
-   [ ] Limit amount of posts getting fetched (maybe 25?)
-   [ ] Images for posts (needs blob storage)
-   [ ] Delete Student
-   [ ] Edit Groups
-   [ ] Edit Profile Picture
-   [x] Edit Name/Email
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

Here I will take notes on what went wrong and what went right.
Link to something I need to understand https://nextjs.org/docs/app/getting-started/server-and-client-components

---

#### Finish Documentation

I'll aim to finish a version 0.1 of this documentation before i turn the project in, but the README has to be updated continously
with new updates done to the backend and DB as the project finishes. The documentation will be moore extencive once the project is finished and i'm no longer adding more features.
So right now, working on the README will take place when I have time over from acctual implementation of features.

#### Move Backend

First thing i'll do is to look to move the backend from Renders Express to the Nextjs App, i knew the separate backend wouldnt play nice with
Nextjs from the get go and Id have to make strange workarounds but as it was a requirement for the assignment i made the compromise. Having the backend on the server enables me
to add moore elegant form-handeling and API routes. I'll also look into the conventional logic of fetching on the server.

#### Supabase DB

I probably want to use the Supabase PostgreSQL database going forward. Nothing wrong with the one currently deployed on Render, but price wise it makes sense to go Supabase.
Since I also ant to head in the Supabase direction for auth its 2 birds 1 stone.

#### Supabase Auth

JWT Tokens where a good pick for this assignment, it let me do what I wanted for the time beeing. But every time we need to check if user is authed or get access to the user
we have to do it client side, something witch i want to avoid going forward. In the future I want the client to be dumb and server to be the authorative voice passing down data to client components.
This pairs well with Supabase auth, but alot more reseach is required to see if this fits with my project. Well if im already paying for the Supabase DB i might aswell try the supabase auth.

#### SSR

The largest failiure of my project is that almost everything in the frontend is client side rendered. This needs to change. I want to move as much as I can into server-side rendered components.
Especially server actions for all of my forms. This "should" be easier if I move the backend to NextJS.
