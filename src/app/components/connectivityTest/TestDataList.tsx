'use client'

import { FormEvent, useEffect, useState } from "react";
import { TestGetData } from "./TestGetData";
import { TestPost } from "./TestPost";
import { TestDelete } from "./TestDelete";
import { TestEdit } from "./TestEdit";


type Test = {
  id: string;
  name: string;
}

export const TestDataList = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [name, setName] = useState('');
  const [editName, setEditName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    TestGetData().then(data => setTests(data));
  }, [tests]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await TestPost(name)
      const newTest = await response.json();
      setTests([...tests, newTest]);
      setName('');
    } catch (error) {
      console.error('Failed to create test:', error);
    }
  };

   const deleteTest = async (id: string) => {
    try {
      TestDelete(id)
      setTests(tests.filter(test => test.id !== id)); // UIからも削除
    } catch (error) {
      console.error('Failed to delete test:', error);
    }
  };

  const editTest = async (id: string) => {
    try {
      await TestEdit(id, editName);
      setTests(tests.map(test => test.id === id ? { ...test, name: editName } : test));
      setEditId(null);
      setEditName(''); // 編集フォームのリセット
    } catch (error) {
      console.error('Failed to edit test:', error);
    }
  };


  return (
    <div>
      <h2>Tests</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a new test"
          className="shadow appearance-none border rounded py-2 px-3 mr-2 text-black"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Test
        </button>
      </form>
      <ul className="list-disc pl-5">
        {tests.map(test => (
          <li key={test.id} className="mb-2">
            {editId === test.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-black"
              />
            ) : (
              <span className="text-grey-darker">{test.name}</span>
            )}
            <button onClick={() => { setEditId(test.id); setEditName(test.name); }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2">
              Edit
            </button>
            <button onClick={() => deleteTest(test.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
              Delete
            </button>
            {editId === test.id && (
              <button onClick={() => editTest(test.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">
                Save
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
