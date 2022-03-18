import { useState, useEffect } from 'react';
import './App.css';

import Editor from './components/Editor';
import List from './components/List';
import Menu from './components/Menu';
import Panel from './components/Panel';
import Preview from './components/Preview';
import Item from './components/Item';

import uuid from "react-uuid";

import useDocumentitle from './hook/Documentitle';
import ItemsContext from "./components/Items-context"
import StatusContext from "./components/status-context"

import {get,put,post} from "./lib/http"

function App() {
  const url = "http://localhost:3010/";

  const [items, setItems] = useState([])
  const [copyItems, setCopyItems] = useState([])
  const [actualIndex, setActualIndex] = useState(-1)

  const [lock, setLock] = useState(false)
  const [status, setStatus] = useState(0)

  useDocumentitle(copyItems[actualIndex]?.title, "Notes")

  useEffect(() => {
    getItems(url)
  }, [])

  async function getItems (url) {
    let data = await get(url);
    let res = getOrderedNotes(data);

    setItems(res);
    setCopyItems(res);

    if(items.length > 0) setActualIndex(0)
  }
  
  const handleNew = ({title,text}) =>{
    const note = 
    {
      id: uuid(),
      title:title || "sin titulo",
      text:text || "sin texto",
      pinned: false,
      date: Date.now()
    }

    let notes = [...items]

    notes.unshift(note)

    let res = getOrderedNotes(notes)

    setItems(res)
    setCopyItems(res)

    post(`${url}new`, note)
  }

  const handlePinned = (item,i) =>{
    setActualIndex(i);
    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;

    let res = getOrderedNotes(notes);

    setItems(res)
    setCopyItems(res)

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
    setCopyItems(notes)
  }

  function onChangeText(e){
    const text = e.target.value; 
    
    let notes = [...items];
    notes[actualIndex].text = text;

    setItems(notes)
    setCopyItems(notes)
  }

  function handleSearch(e){
    const q = e.target.value;

    if(q === "") setCopyItems([...items])
    else {
      let res = items.filter(x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0);
      
      if(res.length === 0){
        setActualIndex(-1)
      }
      else{
        setCopyItems([...res]);
        setActualIndex(0);
      }
    }
  }

  function autosave (){
    if(!lock){
      setLock(true);
      setStatus(1);
      setTimeout(()=>{
        save();
        setLock(false)
      },3000)
    }
  }

  async function save(){
    const item = items[actualIndex];

     await put(`${url}update`,item)

    setStatus(2)

    setTimeout(()=>{
      setStatus(0)
    },1000)
  }

  return (
    <div className="App container">
      <Panel >
        <ItemsContext.Provider value={{onSearch:handleSearch,onNew:handleNew}}>
          <Menu />
        </ItemsContext.Provider>
        <List>
          {
            copyItems.map((item, i) => <Item 
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
            <StatusContext.Provider value={{status: status,autosave}}>
              <Editor item={copyItems[actualIndex]} onChangeTitle={onChangeTitle} onChangeText={onChangeText} />
            </StatusContext.Provider>
            <Preview text={copyItems[actualIndex].text}/>
          </>
          : null
        }
      {/* </div> */}
    </div>
  );
}

export default App;
