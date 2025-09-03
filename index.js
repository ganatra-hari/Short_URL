require("dotenv").config();
const ex = require("express");
const path = require("path");
const connection = require("./connect")
const urlRouter = require("./Routes/url");
const URL = require('./Models/url')

const app = ex();
const PORT = process.env.PORT || 8001;

connection().then(()=>
    console.log("Connected Successfully!")
)
.catch((err)=> {
    console.log("Database Connection Error!",err);
})

app.use(ex.json());

app.use("/url", urlRouter);

// serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitade: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // return updated doc
    );

    if (!entry) {
      return res.status(404).send("❌ Short URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error handling redirect:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => console.log("Server Started! At PORT:", PORT))