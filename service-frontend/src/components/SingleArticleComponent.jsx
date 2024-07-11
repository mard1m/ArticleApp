import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import ArticleService from "../services/ArticleService";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";

class SingleArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: '',
            article: {
                id: '',
                header: '',
                body: '',
                likes: [
                    {
                        id: '',
                        username: '',
                        name: '',
                        password: '',
                        photoBytes: '',
                        articleIds: [],
                        role: [],
                    }
                ],
                disLikes: [
                    {
                        id: '',
                        username: '',
                        name: '',
                        password: '',
                        photoBytes: '',
                        articleIds: [],
                        role: [],
                    }
                ],
                createdDate: '',
                author: {
                    id: '',
                    username: '',
                    name: '',
                    password: '',
                    photoBytes: '',
                    articleIds: [],
                    role: [],
                }
            }
        }
    }
    doLike = () => {
        if(this.state.article.disLikes.map(author => author.id).includes(this.state.currentUserId)) {
            ArticleService.undoDisLike(this.state.article.id)
        }
        if(this.state.article.likes.map(author => author.id).includes(this.state.currentUserId)) {
            ArticleService.undoLike(this.state.article.id).then(res => {
                if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                    console.log(res);
                    document.location = res.request.responseURL;
                } else {
                    console.log(res);
                    console.log('data => ' + res.data);
                    this.getArticle()
                }
            })
        } else {
            ArticleService.doLike(this.state.article.id).then(res => {
                if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                    console.log(res);
                    document.location = res.request.responseURL;
                } else {
                    console.log(res);
                    console.log('data => ' + res.data);
                    this.getArticle()
                }
            })
        }
    }
    doDisLike = () => {
        if(this.state.article.likes.map(author => author.id).includes(this.state.currentUserId)) {
            ArticleService.undoLike(this.state.article.id)
        }
        if(this.state.article.disLikes.map(author => author.id).includes(this.state.currentUserId)) {
            ArticleService.undoDisLike(this.state.article.id).then(res => {
                if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                    console.log(res);
                    document.location = res.request.responseURL;
                } else {
                    console.log(res);
                    console.log('data => ' + res.data);
                    this.getArticle()
                }
            })
        } else {
            ArticleService.doDisLike(this.state.article.id).then(res => {
                if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                    console.log(res);
                    document.location = res.request.responseURL;
                } else {
                    console.log(res);
                    console.log('data => ' + res.data);
                    this.getArticle()
                }
            })
        }
    }
    componentDidMount() {
        this.getArticle()
    }
    getArticle() {
        ArticleService.getSpecificArticle(this.props.match.params.id).then((res) => {
            if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                console.log(res);
                document.location = res.request.responseURL;
            } else {
                console.log(res);
                console.log('data => ' + res.data);
                this.setState({
                    article: res.data,
                });
                UserService.getCurrentUser().then(res => {
                        console.log("user data")
                        console.log(res.data)
                        this.setState({
                            currentUserId: res.data.id
                        })
                        console.log("id")
                        console.log(this.state.currentUserId)
                })
            }
        })

    }

    render() {
        const isLiked = this.state.article.likes.map(author => author.id).includes(this.state.currentUserId)
        const isDisLiked = this.state.article.disLikes.map(author => author.id).includes(this.state.currentUserId)
        const LikeButtonColor = isLiked ? 'danger' : 'success';
        const LikeButtonText = isLiked ? 'Liked' : 'Lke';
        const DisLikeButtonColor = isDisLiked ? '#266b5c' : '#379683';
        const DisLikeButtonText = isDisLiked ? 'Disliked' : 'Dislike';
        return (
            <div>
                <h1 style={{ color: "#05386B" }}>{this.state.article.header}</h1>
                <Card className="mb-3">
                    <Card.Body>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {this.state.article.author.photoBytes &&
                                <img
                                    src={`data:image/png;base64,${this.state.article.author.photoBytes}`}
                                    alt="Author Avatar"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',  // Make the image round
                                        border: '4px solid #05386B',  // Add a blue border
                                        marginRight: '20px',
                                    }}
                                />
                            }
                            <div>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Author: {this.state.article.author.name == null ? "Anonymous" : this.state.article.author.name}
                                </Card.Subtitle>
                                <Card.Text>{this.state.article.body}</Card.Text>
                                <Button variant={LikeButtonColor} className="mr-2" onClick={this.doLike}>
                                    {LikeButtonText} ({this.state.article.likes.length})
                                </Button>
                                <Button style={{backgroundColor: DisLikeButtonColor}} className="mr-2" onClick={this.doDisLike}>
                                    {DisLikeButtonText} ({this.state.article.disLikes.length})
                                </Button>
                            </div>
                        </div>
                        <br />
                        <br />
                        <Link to="/articles" className="btn btn-primary text-white" style={{ backgroundColor: "#05386B", textDecoration: 'none' }} > {'<- Back'}</Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SingleArticleComponent;