# Fatt Next

A [FreeAgent](https://www.freeagent.com/) integration to help with time tracking.

I found the method integrated into FreeAgent powerful and mobile friendly but not intuitive, especially if time sheets are done monthly.

This tool gives a month by month view and will highlight any working days that don't have enough hours logged against them.

## Using it

There is a copy hosted at https://fatt-next.vercel.app/ that uses oauth to authenticate against your FreeAgent account.

## Running it locally

* `nmp install`
* Copy `example.env.development.local` to `.env.development.local` and get an oauth UserID and Secret from [FreeAgent API](https://dev.freeagent.com/docs)
* Run using `nmp run dev`

## Hosting your self

Since this is written in Next.js and uses some server features, I host on vercel for ease.

