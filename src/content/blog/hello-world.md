---
title: "Hello, world"
description: "The first post on this blog, and a quick note on how it's built."
pubDate: 2026-10-16
---

Welcome to the blog. This first post is plain Markdown: no JavaScript gets
shipped to your browser for it, which is exactly what keeps the page fast.

## Why plain Markdown

Most posts here will be text, headings, links, and images. For that, there's
no reason to send any client-side code at all. The build turns this file into
static HTML ahead of time.

## When posts get interactive

Some posts need more: a map, a chart, a runnable code sample. Those load their
own small bit of JavaScript, and only on the page that uses them. The next
post shows a working chart as an example.

That's the whole idea: static by default, interactive only where it earns its
place.
