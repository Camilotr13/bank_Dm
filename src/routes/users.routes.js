import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/accounts", async (req, res) => {
   const { rows } = await pool.query("SELECT * FROM accounts");
   res.json(rows);
});

router.get("/accounts/:id", async (req, res) => {
   const { id } = req.params;

   const { rows } = await pool.query(
      "SELECT * FROM accounts WHERE id = $1",
      [id]
   );

   if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found" });
   }

   res.json(rows[0]);
});

router.get("/accounts/:id/balance", async (req, res) => {
   const { id } = req.params;

   const { rows } = await pool.query(
      "SELECT balance FROM accounts WHERE id = $1",
      [id]
   );

   if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found" });
   }

   res.json(rows[0]);
});

router.post("/accounts", async (req, res) => {
   const { name, balance } = req.body;

   if (!name || balance === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   const { rows } = await pool.query(
      "INSERT INTO accounts (name, balance) VALUES ($1, $2) RETURNING *",
      [name, balance]
   );

   res.json(rows[0]);
});

router.post("/accounts/:id/deposit", async (req, res) => {
   const { id } = req.params;
   const { amount } = req.body;

   if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
   }

   await pool.query(
      "UPDATE accounts SET balance = balance + $1 WHERE id = $2",
      [amount, id]
   );

   res.json({ message: "Deposit successful" });
});

router.post("/accounts/:id/withdraw", async (req, res) => {
   const { id } = req.params;
   const { amount } = req.body;

   if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
   }

   const { rows } = await pool.query(
      "SELECT balance FROM accounts WHERE id = $1",
      [id]
   );

   if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found" });
   }

   if (rows[0].balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
   }

   await pool.query(
      "UPDATE accounts SET balance = balance - $1 WHERE id = $2",
      [amount, id]
   );

   res.json({ message: "Withdrawal successful" });
});

router.delete("/accounts/:id", async (req, res) => {
   const { id } = req.params;

   const { rowCount } = await pool.query(
      "DELETE FROM accounts WHERE id = $1",
      [id]
   );

   if (rowCount === 0) {
      return res.status(404).json({ message: "Account not found" });
   }

   res.json({ message: "Account deleted successfully" });
});

router.put("/accounts/:id", async (req, res) => {
   const { id } = req.params;
   const { name } = req.body;
   const { balance } = req.body;

   const { rows } = await pool.query(
      "UPDATE accounts SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
   );

   if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found" });
   }

   res.json(rows[0]);
});

export default router;



//crear cuenta post
//consultar cuenta  buscar por id get
//consultar balance get
//depositar dinero post  // {"amount": 500}
// retirar dinero con post


