import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query  
  const movies = await db
    .collection("movies")
    .find({'_id':ObjectID(id)})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  console.log(id)
  res.json(movies);
};