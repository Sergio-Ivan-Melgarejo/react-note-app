import { useState } from 'react';

import Editor from './components/Editor';
import List from './components/List';
import Menu from './components/Menu';
import Panel from './components/Panel';
import Preview from './components/Preview';
import Item from './components/Item';

import uuid from "react-uuid";

import './App.css';

const itemsInitial = [{
  id:0,
  title:"mi primera nota",
  text:"# hola a todos",
  pinned: false,
  date: Date.now()
},
{
  id:1,
  title:"mi 2 notadddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  text:"# hola a todos",
  pinned: false,
  date: Date.now()
}]

function App() {
  const [items, setItems] = useState(itemsInitial)
  const [copyItems, setCopyItems] = useState([])
  const [actualIndex, setActualIndex] = useState(-1)

  const handleNew = ({title,text}) =>{
    const note = 
    {
      id: uuid(),
      title:title || "",
      text:text || "",
      pinned: false,
      date: Date.now()
    }

    let notes = [...items]

    notes.unshift(note)

    let res = getOrderedNotes(notes)

    setItems(res)
  }

  const handlePinned = (item,i) =>{
    setActualIndex(i);
    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;

    let res = getOrderedNotes(notes);

    setItems(res)

    let index = res.findIndex(x => x.id === id);
    
    setActualIndex(index)
  }

  function getOrderedNotes(arr){
    let items = [...arr];
    let pinned = items.filter(x => x.pinned === true);
    let rest = items.filter(x => x.pinned === false);

    pinned = sortByDate(pinned, true);
    rest = sortByDate(rest, true);

    return [...pinned,...rest]
  }

  const sortByDate = (arr,asc = false) =>{
    if(asc) return arr.sort((a,b)=> new Date(b.created) - new Date(a.created));
    return arr.sort((a,b)=> new Date(a.created) - new Date(b.created));
  }

  const handleSelectNote= (item,e) =>{
    if(e.target.classList.contains("pinButton")) return

    const index = items.findIndex(x => x === item);
    setActualIndex(index);
  }
 
  function onChangeTitle(e){
    const title = e.target.value; 
    
    let notes = [...items];
    notes[actualIndex].title = title;

    setItems(notes)
  }
  function onChangeText(e){
    const text = e.target.value; 
    
    let notes = [...items];
    notes[actualIndex].text = text;

    setItems(notes)
  }

  return (
    <div className="App container">
      <Panel >
        <Menu handleNew={handleNew} />
        <List>
          {
            items.map((item, i) => <Item 
              key={item.id}
              actualIndex={actualIndex} 
              item={item} 
              index={i} 
              handlePinned={handlePinned} 
              handleSelectNote={handleSelectNote} 
            />)
          }
        </List>
      </Panel>
      {/* <div className='container-derecha'> */}
        {
          actualIndex >= 0 ?
          <>
            <Editor item={items[actualIndex]} onChangeTitle={onChangeTitle} onChangeText={onChangeText} />
            <Preview text={items[actualIndex].text}/>
          </>
          : null
        }
      {/* </div> */}
    </div>
  );
}

export default App;
