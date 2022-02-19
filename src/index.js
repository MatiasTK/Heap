import React from "react";
import ReactDOM from "react-dom";
import './styles.css';

const maxArraySize = 10;

class Heap {
    constructor(array){
        this.array = [...array];
    }

    /* Must have build heap before */
    heapsort(maximal=true){
        let array = this.array;
        let size = array.length;
        for(let i = size - 1; i > 0; i--){
            let helper = array[0];
            array[0] = array[i];
            array[i] = helper;

            if(maximal){
                this.maxHeapify(array,i,0);
            }else{
                this.minHeapify(array,i,0);
            }
        }
    }
    
    maxHeapify(array,size,index){
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;

        if(left < size && array[left] > array[largest]){
            largest = left;
        }
        if(right < size && array[right] > array[largest]){
            largest = right;
        }

        if(largest != index){
            let helper = array[index];
            array[index] = array[largest];
            array[largest] = helper;
            this.maxHeapify(array,size,largest);
        }
    }

    minHeapify(array,size,index){
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if(left < size&& array[left] < array[smallest]){
            smallest = left;
        }
        if(right < size&& array[right] < array[smallest]){
            smallest = right;
        }
        if(smallest != index){
            [array[index], array[smallest]] = [array[smallest], array[index]];
            this.minHeapify(array,size,smallest);
        }
    }

    buildHeap(maximal = true){
        let array = this.array;
        let size = this.array.length;
        for(let i = parseInt(size/2 -1); i >= 0; i--){
            if(maximal){
                this.maxHeapify(array,size,i);
            }else{
                this.minHeapify(array,size,i);
            }
        }
    }

    logHeap(){
        console.log(this.array);
    }

    arrayHeap(){
        return this.array;
    }
}

class Vector extends React.Component{
    renderSquare(i,index){
        return(
            <button className="square" key={index}>{i}</button>
        )
    }
    
    renderTree(){
        let array = this.props.array;

        return(
            <div className="tree-flex">
                <div className="tree">
                <p>{"ㅤㅤㅤ" + "┌── " + " " + array[0] + " ──┐"}</p>
                <p>{"ㅤ " + "┌─ " + array[1] + " ─┐" + "ㅤ " + "┌─ " + array[2] + " ─┐"}</p>
                <p>{"┌ " + array[3] + " ┐" + "ㅤ" + "┌ " + array[4] + "ㅤ " +  array[5] + " ㅤㅤ " + array[6]}</p>
                <p>{array[7] + "ㅤ" + array[8] + "ㅤ" + array[9]}</p>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className="fila">
                {this.props.array.map((i,index) => this.renderSquare(i,index))}
                {this.renderTree()}
            </div>
        )
    }
}

class App extends React.Component {
    state = {
        vector: [...Array(maxArraySize)].map( ()=> Math.floor(Math.random() * 100)),
    }

    reset(){
        const nuevoVector = [...Array(maxArraySize)].map( ()=> Math.floor(Math.random() * 100));
        this.setState({
            vector: nuevoVector,
        })
    }

    customArray(){
        let input = prompt("Note: this function is exprimental and may break the tree functionality use with caution.\nInsert the new array(Recommended 10 length array).\nFormat: 1,2,3,4");
        let nuevoVector = (input.split(",")).map((i) => parseInt(i));
        this.setState({
            vector: nuevoVector,
        })
    }

    render(){
        let maxHeapify = new Heap(this.state.vector);
        maxHeapify.buildHeap();
        let maxHeapsort = new Heap(this.state.vector);
        maxHeapsort.buildHeap();
        maxHeapsort.heapsort();

        let minHeapify = new Heap(this.state.vector);
        minHeapify.buildHeap(false);
        let minHeapsort = new Heap(this.state.vector);
        minHeapsort.buildHeap(false);
        minHeapsort.heapsort(false);

        return(
            <div className="heap">
                <div className="original">
                    <p className="title">Starter Array:</p>
                        <Vector array={this.state.vector}/>
                </div>
                <div className="operations">
                    <div className="heapify">
                        <div>
                            <p className="title">Max-Heapify:</p>
                                <Vector array={maxHeapify.arrayHeap()}/>
                        </div>
                        <div>
                            <p className="title">Min-Heapify: </p>
                                <Vector array={minHeapify.arrayHeap()}/>
                        </div>
                    </div>
                    <div className="heapsort">
                        <div>
                            <p className="title">Max-Heapsort:</p>
                                <Vector array={maxHeapsort.arrayHeap()}/>
                        </div>
                        <div>
                            <p className="title">Min-HeapSort:</p>
                                <Vector array={minHeapsort.arrayHeap()}/>
                        </div>
                    </div>
                </div>
                <div className="botones-flex">
                    <div className="botones">
                        <button className="boton" onClick={()=> this.reset()}>Randomize Array</button>
                        <button className="boton" onClick={()=> this.customArray()}>Custom Array</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);