import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import NoteModel from "../../models/Note";
import dbConnect from "../../utils/dbConnect";

const EditNote = ({ note }) => {
  const newNote = JSON.parse(note);
  const [form, setForm] = useState({
    title: newNote.title,
    description: newNote.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(
        `/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>Update Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              label="Descriprtion"
              placeholder="Description"
              name="description"
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              value={form.description}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query: { id } }) {
  dbConnect();
  const note = await NoteModel.findById(id);
  return {
    props: { note: JSON.stringify(note) },
  };
}

export default EditNote;
