import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [notes, setNotes] = useState([]);
  const [select, setSelect] = useState(null);

  console.log(index,history.length);

  const OnUndo = () => {
    if (index > 0) {
      setTitle(history[index - 1].title);
      setContent(history[index - 1].content);
    }
    else{
      setTitle('');
      setContent('');
    }
    setIndex(index - 1);
  };

  const OnRedo = () => {
    if (index < history.length) {
      setTitle(history[index + 1].title);
      setContent(history[index + 1].content);
      setIndex(index + 1);
    }
  };

  const OnSave = () => {
    if (title != "") {
      if (select != null) {
        //update

        const idx = notes.findIndex((note) => {
          return note.id == select;
        })

        console.log(idx);

        notes[idx].title = title;
        notes[idx].content = content

      } else {
        setNotes((data) => [
          { id: notes.length, title: title, content: content },
          ...data,
        ]);
      }

      setTitle("");
      setContent("");
      setHistory([{ title: "", content: "" }]);
      setIndex(0);
      setSelect(null);
    }
  };

  const OnDelete = (index) => {
    const newArr = notes.filter((object) => {
      return object.id !== notes[index].id;
    });

    setNotes(newArr);
  };

  const OnEdit = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setSelect(notes[index].id);
    setHistory([]);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-25 overflow-hidden">
        {notes.map((note, index) => {
          return (
            <div key={index} className="border-bottom p-3 bg-light">
              <h4>{(note.title).length > 20 ? (note.title.slice(0, 20)+'...') : (note.title)}</h4>
              <span className="text-muted">{(note.content).length > 50 ? (note.content.slice(0, 50)+'...') : (note.content)}</span>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => OnEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => OnDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border p-3 w-50 h-100">
        <div>
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(even) => {
              setTitle(even.target.value);
              setHistory((data) => [
                ...data,
                { title: even.target.value, content: content },
              ]);
              setIndex(history.length);
            }}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="content">
            Content:
          </label>
          <textarea
            className="form-control"
            type="text"
            id="content"
            value={content}
            onChange={(even) => {
              setContent(even.target.value);
              setHistory((data) => [
                ...data,
                { title: title, content: even.target.value },
              ]);
              setIndex(history.length);
            }}
          />
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => OnUndo()}
              disabled={!title & !content ? true : false}
            >
              undo
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => OnRedo()}
              disabled={(index + 1) < history.length ? false : true}
            >
              redo
            </button>
          </div>
          <div>
            <button className="btn btn-secondary me-3"
            disabled={select == null}
            onClick={() => {
              setTitle('');
              setContent('');
              setSelect(null);
              setHistory([])
            }} >Cancel</button>
            <button onClick={() => OnSave()} className="btn btn-success">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
