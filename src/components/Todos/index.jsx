import React from "react";
import './style.css';
import user from './mock'
import DataTime from "../date";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : user,
            subtitle: '',
            active: null
        }
    }
    render() {
        localStorage.setItem('data', JSON.stringify(this.state.data))

        const onChange = (e) => {
            const { value, name } = e.target;
            this.setState({ [name]: value })
        }
        const onChangeTitle = (e) => {
            const { value, name } = e.target;
            console.log(value);
            this.setState({ [name]: value })
        }
        const onAdd = () => {
            if (this.state.subtitle.length > 0) {
                let newItem = { id: this.state.data.length + 1, title: this.state.subtitle, checked: false, liked: false };
                this.setState({ data: [...this.state.data, newItem], subtitle: '' });
                localStorage.setItem('data', JSON.stringify(this.state.data))
            }
        }
        const onDelete = (id) => {
            let res = this.state.data.filter((value) => value.id !== id);
            this.setState({ data: res })
        }
        const onChangeColor = (id) => {
            let res = this.state.data.map((value) => value.id === id ? { ...value, liked: !value.liked } : value);
            this.setState({ data: res })

        }
        const onCheck = (id) => {
            let res = this.state.data.map((value) => value.id === id ? { ...value, checked: !value.checked } : value);
            this.setState({ data: res })

        }
        const onClear = () => {
            this.setState({ data: [] })
        }
        const onEdit = ({ id, title,checked,liked }, isSave) => {
            if (isSave) {
                let res = this.state.data.map((value) => value.id === this.state.active.id ? { ...value, title: this.state.subtitle } : value);
                console.log(this.state.subtitle);
                console.log(res);
                this.setState({ active: null, data: res, subtitle:''})

            } else {
                this.setState({ subtitle: title,checked:checked,liked:liked, active: { id, title } })
            }
        }
        return (
            <div className="container" >
                <div className="wrapper">
                    <div className="nav">
                        <h1 className="todoList">To Do List</h1>
                        <div className="date">
                            <h2>{<DataTime></DataTime>}</h2>
                            {/* <h2><DataTime></DataTime></h2> */}
                        </div>
                        <div className="count">
                            <h2>Tasks:{this.state.data.length}</h2>
                            <button className="clearList" onClick={onClear}><h3>Clear List</h3></button>
                        </div>
                    </div>
                    <div className="items">
                        {this.state.data.map(({ id, title, checked, liked }) => {
                            return (
                                <div className="addedItem" key={id}>
                                    <h2 className={`${checked && 'green'} ${liked && 'yellow'}`}>{this.state.active?.id === id ? <input className="changedInput" onChange={onChangeTitle} name="subtitle" value={this.state.subtitle} type={'text'} /> : title}</h2>
                                    <div className="btns" >
                                        <button className="btn" onClick={() => onEdit({ id, title,checked,liked }, this.state.active?.id === id)}>{this.state.active?.id === id ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-pen-to-square"> </i>}</button>
                                        <button className="btn delete_btn" onClick={() => onDelete(id)}><i className="fa-solid fa-trash"></i></button>
                                        <button className={`btn ${liked && 'yellow'}`} onClick={() => onChangeColor(id)}><i className="fa-sharp fa-solid fa-star"></i></button>
                                        <button className={`btn`} onClick={() => onCheck(id)}><i className={checked ? 'fa-solid fa-check-double' : 'fa-solid fa-check'}></i></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="addItem">
                        <input value={this.state.subtitle} className="changeInput" onChange={onChange} name="subtitle" type="text" required />
                        <button className="addBtn" onClick={onAdd}><h3>Add</h3></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo
