import { useState } from 'react';

import Editor from './components/Editor';
import List from './components/List';
import Menu from './components/Menu';
import Panel from './components/Panel';
import Preview from './components/Preview';

import uuid from "react-uuid";

import './App.css';

// const itemsInitial = [{
//   id:0,
//   title:"mi primera nota",
//   text:"# hola a todos",
//   pinned: false,
//   date: Date.now()
// },
// {
//   id:1,
//   title:"mi 2 notadddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//   text:"# hola a todos",
//   pinned: true,
//   date: Date.now()
// }]

function App() {
  const [items, setItems] = useState([])

  const handleNew = ({title,text}) =>{
    const note = 
    {
      id: uuid(),
      title:title || "",
      text:text || "",
      pinned: false,
      date: Date.now()
    }

    setItems([...items,note])
  }

  return (
    <div className="App container">
      <Panel >
        <Menu handleNew={handleNew} />
        <List items={items} />
      </Panel>
      {/* <div className='container-derecha'> */}
        <Editor />
        <Preview />
      {/* </div> */}
    </div>
  );
}

export default App;
