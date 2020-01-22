# Repository for Thorikosdash
Dashboard for making data visible and understandable

## Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/ffb4fc85-192c-46d9-b242-6fc6df04a54b/deploy-status)](https://app.netlify.com/sites/hungry-hugle-63f43c/deploys)

[Demo Link](https://hungry-hugle-63f43c.netlify.com/)

<img src="src/images/github-images/productionbuild.png">

## Introduction

Project Thorikosdash is focused on bringing usefull insights about the archaeological findings Floris van der Eijnde and his team gathered throughout the years of searching
at Thorikos. Floris and his team searched for fragments inside a grid, the grid tiles are devided in multiple parts. The biggest tile of the grid is 50 meters X 50 meters
which gets devided into 4 tiles of 25 X 25 (these tiles are called mesosquares). These mesosquares get devided again into 4 parts of 12,5 x 12,5. These smallest tiles
of 12,5 by 12,5 get assigned to 1 person who gets to search this "tile" for 20 minutes and document all the shards they find.

## Grid
Below is an image of the geo locations we got from Floris, and as you can see there are a lot of points missing inside this grid.
<img src="src/images/github-images/productionbuild.png">

But what can we do with this information? I began searching for a possible solution to the problem at hand. I searched for ways to calculate with latitudes and longitudes
and found out that you need a few things to start calculating point which are a beginning point, destination point and a bearing (which is the angle between the beginning point and destination point).

With this information i began searching for a library that chould help me calculate all these new locations and bearings. I quickly came across the [ge0lib](https://github.com/manuelbieh/geolib) library which had all the functions i needed
to get started calculating all the grid point locations.

I started gathering all the rows with their begin point and end point and with the help of [ge0lib](https://github.com/manuelbieh/geolib) i started calculating all the points.
Now i had the 50 x 50 meter grid points but i still needed to get the 25 x 25 tiles, so i had to calculate a row in between rows to devide the 50 x 50 tiles into 25 x 25 tiles.

After a lot of strugling i got to this outcome  

### 50x50 points
<img src="src/images/github-images/50x50grid.png">

### 25x25 grid
<img src="src/images/github-images/25x25grid.png">
