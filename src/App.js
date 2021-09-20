import React from 'react';
import axios from 'axios';
import {Button,Modal,Form,Card,Container} from 'react-bootstrap';

import Header from './header';

const API_URL='https://jsonplaceholder.typicode.com/posts';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            posts:[],
            id:'',
            userId:'',
            title:'',
            body:'',
            showAddPost:false,
            postButton:'Add post',
            delete:false,
            deleteId:'',
        };
    }

    createPost=async()=>{

        try{
            console.log(this.state);
            const {userId,title,body}= this.state;
            const {data:post}= await axios.post(`${API_URL}`,{
                userId,
                title,
                body,
            })
            const posts = [...this.state.posts];
            console.log(post);
            posts.push(post);
            this.setState({posts,
                userId:'',
                title:'',
                body:'',
                id:'',
                showAddPost:false,
            });
            console.log(posts);
        } catch(err){
            console.log(err);
        }

    }

    readPosts= async()=>{
        try{
            const {data}= await axios.get(API_URL);
            this.setState({
                posts:data
            })
            console.log(data);
        } catch(err){
            console.log(err);
        }
    }

    getUsers=async()=>{
        try{
            const {data}=await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log(data);
            const usersData= data.map((user)=>{
                return (user.username);
            })
            usersData.unshift('Click to select a user');
            console.log(usersData);
            this.setState({
                users:usersData
            })
        }catch(err){
            console.log('Error fetching users',err);
        }
    }

    deletePost=async(postId)=>{
        console.log(postId);
        try{
            const response= await axios.delete(`${API_URL}/${postId}`);
            let posts= [...this.state.posts];
            posts= posts.filter((post)=>post.id!==postId);
            this.setState({posts:posts,delete:false});
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

    updatePost=async()=>{
        try{
            const {id,userId,title,body}=this.state;
            const {data:post}= await axios.put(`${API_URL}/${id}`,{
                userId,
                title,
                body,
            });
            const posts= [...this.state.posts];
            const index= posts.findIndex(eachPost=>eachPost.id===id);
            posts[index]= post;
            this.setState({posts,showAddPost:false,postButton:'Add post'});
        }catch(err){
            console.log('Error updating data',err);
        }
    }

    handleChange=({target:{name,value}})=>this.setState({[name]:value})
    
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
        if(this.state.id) this.updatePost();
        else this.createPost();
    }

    // validateInputs=()=>{
    //     if(this.state.userId==='') 
    // }

    handleUserChange=({target:{value}})=>{
        console.log(value);
        const userId= this.state.users.findIndex(user=>user===value);
        this.setState({userId});
    }

    handleClose = () => this.setState({showAddPost:false,postButton:'Add post'});
    handleShow = () => this.setState({showAddPost:true});
    handleDeleteShow=(postId)=>this.setState({delete:true,deleteId:postId});
    handleDeleteClose=()=>this.setState({delete:false,deleteId:''});

    componentDidMount(){
        this.getUsers();
        this.readPosts();
    }

    render(){
        return(
            <>
            <Header/>
            <Container>
            <br/>
            <h1 className="text-center">Posts</h1> 
            <br/>
                <Button variant="primary" onClick={this.handleShow}>Add new post</Button>
                <br/>
                <Modal show={this.state.showAddPost} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.state.postButton}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>User name</Form.Label><br/>
                        <Form.Control as ="select" onChange={this.handleUserChange} hidden={this.state.showAddPost}>
                       {this.state.users.map((user,index)=>{
                           return(
                               <option key={index} value={user}> {user}</option>
                           )
                       })}
                       </Form.Control>
                    <div>
                    <br/>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} name="title" onChange={this.handleChange}></Form.Control>
                    </div>
                    <div>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" value={this.state.body} name="body" onChange={this.handleChange}></Form.Control>
                    </div>
                    <br/>
                    <Button variant="primary" type="submit">{this.state.postButton}</Button>
                    </Form>
                    </Modal.Body>
                </Modal>
            
                 <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                                    <Modal.Header>
                                        <Modal.Title>Delete post</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure to delete this post?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleDeleteClose}>Close</Button>
                                        <Button variant="danger" onClick={()=>{this.deletePost(this.state.deleteId)}}>Delete</Button>
                                    </Modal.Footer>
                                </Modal>
            </Container> <br/>
            <Container>
            {this.state.posts.map((post)=>{
                    return(
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <Button variant="success" onClick={()=>{this.props.history.push(`/comments/${post.id}`) }}>View</Button> &nbsp;
                                <Button variant= "warning" onClick={()=>{this.setState({...post,showAddPost:true,postButton:'Update post'})}}>Edit</Button> &nbsp;
                                {/* <Button variant="danger" onClick={()=>{this.deletePost(post.id)}}>Delete</Button> */}
                                <Button variant="danger" onClick={()=>{this.handleDeleteShow(post.id)}}>Delete</Button>
                            </Card.Body>
                        </Card>
                       );
                })}
          </Container>
           
            </>
        );

    }
}

export default App;