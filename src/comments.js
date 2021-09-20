import React from 'react';
import axios from 'axios';
import {Container,Card,Badge,Button,Form,Row} from 'react-bootstrap';

import Header from './header';

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments:[],
            title:'',
            body:'',
            name:'',
            username:'',
            email:'',
            website:'',
            comment:'',
        };
    }

    getPostDetails=async(postId)=>{
        try{
            const {data:{title,body,userId}}= await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            console.log(title,body);
           this.setState({
               title,
               body,
           })
           this.getUserDetails(userId);
        }catch(err){
            console.log(err);
        }
    };

    getUserDetails=async(userId)=>{
        try{
            const {data:{name,username,email,website}}= await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            this.setState({
                name,username,email,website
            })
        }catch(err){
            console.log(err);
        }
    }

    getComments=async(postId)=>{
        try{
            const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            this.setState({comments:data});
        }catch(err){
            console.log('Error in gettings details',err);
        }
    };

    postComment=()=>{

    }

    handleChange=({target:{name,value}})=>this.setState({[name]:value});

    handleSubmit=(e)=>{
        e.preventDefault();
        const comments= [...this.state.comments];
        const newComment= {body:this.state.comment,name:'Anonyms'}
        comments.unshift(newComment);
        this.setState({comments,comment:''});
    }

    componentDidMount(){
        const postId= this.props.match.params.postId;
        this.getComments(postId);
        this.getPostDetails(postId);
        console.log(this.props.match.params.postId);
    }


    render(){
        return (
            <>
            <Header/>
            <Container>
                <br/>
                <h2 className="text-center">Post Details</h2>
               <Container  className="post-details-container">
                <Card style={{width:'30rem'}}>
                    <Card.Header>Name:{this.state.name}</Card.Header>
                    <Card.Body>
                        <Card.Title><p>Username:{this.state.username}</p></Card.Title>
                        <Card.Text><p>Email:{this.state.email}</p></Card.Text>
                    </Card.Body>
                    <Card.Footer><p>Website:{this.state.website}</p></Card.Footer>
                </Card>
                </Container>
                <br/>
           <Card>
            <Card.Body>
                        <Card.Title><h2>{this.state.title}</h2></Card.Title>
                        <Card.Text><h5>{this.state.body}</h5></Card.Text>
                </Card.Body>
            </Card>
               <br/>
               <Card bg="secondary" text= "light">
                <Card.Body>
                    <Card.Title>Comments<Badge bg="primary" text="light">{this.state.comments.length}</Badge></Card.Title>
                </Card.Body>
               </Card>

            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Your comment</Form.Label>
                <Form.Control as="textarea" value={this.state.comment} onChange={this.handleChange} name="comment"></Form.Control> <br/>
                <Button variant="primary" type="submit">Post comment</Button>
            </Form>   
            <br/>
            {this.state.comments.map((comment,index)=>{
                return(
                    <Card>
                        <Card.Body>
                            <Card.Title><p key={index}>{comment.body}</p></Card.Title>
                            <Card.Text>{comment.name}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
            <br/>
            </Container>
            </>
        )
    }
}

export default Comments;