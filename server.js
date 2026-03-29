const express = require("express");
const app = express();

app.use(express.json());

let cards = [];

app.get("/api/cards", (req, res) => {
        res.status(200).json(cards);
});

app.get("/api/cards/:id", (req, res) => {
        const card = cards.find(c => c.id === req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });
        res.json(card);
});

app.post("/api/cards", (req, res) => {
        const newCard = {
                id: Date.now().toString(),
                suit: req.body.suit,
                value: req.body.value,
                collection: req.body.collection
        };

        cards.push(newCard);
        res.status(201).json(newCard);
});

app.put("/api/cards/:id", (req, res) => {
        const index = cards.findIndex(c => c.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: "Card not found" });

        cards[index] = { id: req.params.id, ...req.body };
        res.json(cards[index]);
});

app.patch("/api/cards/:id", (req, res) => {
        const card = cards.find(c => c.id === req.params.id);
        if (!card) return res.status(404).json({ message: "Card not found" });

        Object.assign(card, req.body);
        res.json(card);
});

app.delete("/api/cards/:id", (req, res) => {
        cards = cards.filter(c => c.id !== req.params.id);
        res.status(204).send();
});

app.listen(3000, () => console.log("Server running on port 3000"));