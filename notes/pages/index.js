import { Card, Button, CardContent, CardHeader } from "semantic-ui-react";
import Link from "next/link";
import dbConnect from '../utils/dbConnect';
import Note from '../models/Note';

function Home({ note }) {
  const notes = JSON.parse(note);
  
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

export async function getServerSideProps() {
  dbConnect();
  const notes = await Note.find({});
  return { props: {note: JSON.stringify(notes)} };
};

export default Home;
