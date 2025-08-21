require("dotenv").config()
const express = require("express")
const { MongoClient } = require("mongodb")

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

const app = express()
const client = new MongoClient(MONGO_URI)

app.get("/", async (_req, res) => {
  try {
    await client.connect()
    return res.json({ message: "Successfully connected to the database!" })
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to the database." })
  } finally {
    await client.close()
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
