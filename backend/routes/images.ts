import express, { Router, Request, Response } from "express";
import { fetchResults } from "../helpers";

const router: Router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const search_key = (req.query.key as string) || "";
    const page = 1;
    const fetchHelper = fetchResults(search_key, page);
    fetchHelper
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Oh no! Something went wrong!");
      });
  } catch (err) {
    console.log(err);
    res.status(500).json("Oh no! Something went wrong!");
  }
});

router.get("/next", async (req: Request, res: Response) => {
  try {
    const search_key = (req.query.key as string) || "";
    const next_page = parseInt(req.query.next_page as string);
    const fetchHelper = fetchResults(search_key, next_page);
    fetchHelper
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Oh no! Something went wrong!");
      });
  } catch (err) {
    res.status(500).json("Oh no! Something went wrong!");
  }
});

export default router;
