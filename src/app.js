path = require("path");
express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//define paths for express configuratio
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting up handle bars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Static hbs file",
    name: "Kirti Krishnn",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Static help file",
    name: "Kirti Krishnn",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Static about file",
    name: "Kirti Krishnn",
  });
});

app.get("/weather", (req, res) => {
  geocode("Agra", (error, response = []) => {
    if (error != undefined) {
      res.send("Error: ", error);
    } else {
      [lat, long] = response;
      forecast(lat, long, (error, response) => {
        if (error != undefined) {
          res.send("Error: ", error);
        } else {
          res.send(response);
        }
      });
    }
  });
});
app.get("/help/*", (req, res) => {
  res.send("The requested help page could not be found");
});
app.get("*", (req, res) => {
  res.send("My 404 Page");
});

// Import the Node.js fs module

/* app.get("/weather", (req, res) => {
  // Read the header.hbs file
  fs.readFile(
    path.join(__dirname, "../templates/partials/header.hbs"),
    "utf8",
    (err, headerTemplate) => {
      if (err) {
        // Handle any errors that occur while reading the file
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      // Render the header template using Handlebars
      const headerHtml = Handlebars.compile(headerTemplate)({
        title: "Weather Page", // Include any data you want to pass to the header template
        name: "Kirti Krishnn",
      });

      const weatherData = {
        forecast: "It's sunny outside",
        location: "Agra",
      };

      // Combine the header HTML with the rest of your response content
      const weatherContent = `
  <h1>From a weather file</h1>
  <p>Forecast: ${weatherData.forecast}</p>
  <p>Location: ${weatherData.location}</p>
`;

      // Send the combined HTML as the response
      res.send(headerHtml + weatherContent);
    }
  );
}); */

app.listen(3000, () => {
  console.log("HI, server is up and running");
});
