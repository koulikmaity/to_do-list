import React, { useEffect, useState } from 'react';
import './Todo.css'
import todo from "../componants/images/todo.svg"



// get items from local-storage
const getLocalItems = () => {
    let list = localStorage.getItem('todo-list')
    console.log(list);

    if(list)
    {
        return  JSON.parse(localStorage.getItem('todo-list'))
    }
    else
    {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)

    // add item
    const addItem = () => {
        if (!inputData) {
            alert('please add item')
        }
        else if(inputData && !toggleSubmit)
        {
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem)
                    {
                        return {...elem , name:inputData}
                    }
                    return elem;
                })
            )
            setInputData('');
            setToggleSubmit(true)
            setIsEditItem(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    // delete each item
    const deleteItem = (index) => {
        const updatedData = items.filter((elem) => {
            return index !== elem.id;
        })

        setItems(updatedData)
    }

    // edit each item
    const editItem = (id) => {
            let newEditItem = items.find((elem) => {
                    return elem.id === id
            });
            console.log(newEditItem);
            setToggleSubmit(false);
            setInputData(newEditItem.name);
            setIsEditItem(id)

    }

    // remove all
    const removeAll = () => {
        setItems([]);
    }

    // add data to local-storage
    useEffect(() => {
        localStorage.setItem('todo-list' , JSON.stringify(items) )
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption> Add your list here 👇 </figcaption>
                    </figure>

                    {/* Input Data */}
                    <div className="addItems">
                        <input type="text" placeholder="✍️   add items" value={inputData} onChange={(e) => setInputData(e.target.value)}></input>
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add item" onClick={addItem}></i> : <i className="fa fa-edit add-btn" title="Update item" onClick={addItem}></i>
                        }
                        
                    </div>

                    {/* Show Data */}
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h2> {elem.name} </h2>
                                        <div className="todo-btn">
                                            <i className="fa fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>
                                            <i className="fa fa-trash add-btn" title="Delete item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> <span> CHECK LIST </span> </button>
                    </div>
                </div>
            </div>












































            {/*
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add Item" className="form-control" />

                        <i className="far fa-edit add-btn"  ></i>

                        <i className="fa fa-plus add-btn" ></i>

                    </div>
                     show our items  
                    
                    <div className="showItems">
                        <div className="eachItem" >

                            <div className="todo-btn">
                                <i className="far fa-edit add-btn" ></i>
                                <i className="far fa-trash-alt add-btn"></i>
                            </div>
                        </div>

                    </div>

                     rmeove all button 
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All">
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        */}
        </>
    )
}

export default Todo