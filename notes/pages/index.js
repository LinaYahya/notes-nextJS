import { Card, Button, CardContent, CardHeader } from "semantic-ui-react";
import Link from "next/link";

function Home({ notes }) {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes?.map((note) => (
          <div key={note._id}>
            <Card>
              <CardContent>
                <CardHeader>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </CardHeader>
              </CardContent>
              <CardContent extra>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();
  return { props: {notes: data} };
};


export default Home;
