import React,{Component} from 'react';
import * as $ from 'jquery';
import {Tooltip,List, Input, Button,message} from 'antd';


class Todolist extends React.Component{
    constructor(props){
        super(props)
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            todolist:["todolist例子","ananh"],
            jqhover:'',
            content:''
        }
       
    }
 handleChange = (event)=>{
    this.setState(
        {
            content:event.target.value
        }
    )
    
}


handleAdd = ()=>{
  
 const settxt = this.state.content;
//  判断内容是否为空或者已经存在
 if(!settxt) {
     message.info("输入的内容不能为空");
     return ;
 }
 if(this.state.todolist.includes(settxt)){
     message.info("你输入的内容以及存在，请重新输入");
     return ;
 }
  
   this.setState({
       content:"",
       todolist:[...(this.state.todolist),settxt]
   })
  

    // console.log('data',data)
}
handleRecover= ()=>{
    const data = {
        content:this.state.todolist
    };
    
    $.ajax({
        type: 'POST',
        url: 'todolist.json',
        data: 'data',
        success: ()=>{
            console.log("aaa")
        },
        dataType: "json"
      });
      
}
handleRemove(item ,index){
    const selectClass = "."+(item+index);
    console.log("index",index)
  this.state.todolist.splice(index,1)
    // console.log("data",data)
    this.setState({
        jqhover:this.state.todolist,
        
        
    })
   
    $(selectClass).css({"color":"red"});
    alert("你确定删除"+$(selectClass).text()+"？")
    
}



    render(){
        console.log('todolist',this.state.todolist)
        const {content,todolist } = this.state;
       const selectclass = this.state.jqhover;
    //    console.log("select",selectclass)
        $('.remove').hover(()=>{
            $('.remove').css("color","red");
        })
        // 增加点击事件，让增加的todolist提交到当前文件夹下的todolist.txt 用jQuery的on事件
      
 
        return (
            <>
                <Input
                 placeholder = {"请输入所需要添加的内容"} onChange = {this.handleChange} 
                 value= {this.state.content}
                 style = {{width:"400px"}}
                 />
                <Button onClick = {this.handleAdd} style = {{float:"left" ,maigin:"auto 40px"}} className ='add'>添加</Button>
                <List
                size="small"
                header={<div ><strong>react jquery的todolist</strong></div>}
                footer={<div>Footer</div>}
                style = {{width:"466px",marginTop:"24px",}}
                bordered
                dataSource={todolist}
                renderItem={(item,index) => <List.Item 
                    className = {item+index}
                    actions ={[<a onClick = {this.handleRemove.bind(this,item,index)} className="remove">删除</a>]}>
                        {item}
                    </List.Item>}
                 />   
                 <Button className = 'recove' onClick = {this.handleRecover}>把内容记录到TXT</Button>            
              </>
        )
    }
}

export default Todolist;