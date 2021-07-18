import { connectToDatabase } from "../util/mongodb";
export default function Movies({ reviews }) {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      
      <ul>
        {reviews.map((reviews) => (
          <li>
            <h2>{reviews.name}</h2>
            <h3>{reviews.rating}</h3>
            <p>{reviews.cuisine}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const reviews = await db
    .collection("reviews")
    .find({})
    .sort({ metacritic: -1 })
    .limit(200)
    .toArray();
  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}