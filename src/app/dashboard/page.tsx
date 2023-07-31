import { Suspense } from "react";
import { PostFeed, Weather } from "./Components";

export default function Dashboard() {
  return (
    <section>
      <h3>Dashboard page</h3>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
