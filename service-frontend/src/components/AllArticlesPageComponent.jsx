import React, {Component} from 'react';
import ArticleService from "../services/ArticleService";
import UserService from "../services/UserService";
import {Button, Card, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

class AllArticlesPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: '',
            articles: [
                {
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
            ],
        };
    }

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = () => {
        ArticleService.getAllArticles().then((res) => {
            if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                console.log(res);
                document.location = res.request.responseURL;
            } else {
                console.log(res);
                console.log('data => ' + res.data);
                this.setState({
                    articles: res.data,
                });
                console.log(this.state.articles)
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
    };
    
    render() {

        return (
            <div>
                <h1 style={{color: "#05386B"}}>Article List</h1>
                {this.state.articles.map((article, index) => (
                    <Card key={article.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{article.header}</Card.Title>
                            <Card.Text>{article.body.slice(0, 100)}</Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">
                                Author: {article.author.name}
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                Created Date: {article.createdDate.replace('T', ' ').replace('Z', ' ').split('.')[0]}
                            </Card.Subtitle>
                            <Link to={`/articles/${article.id}`}>
                                <Button variant="primary" className="mr-2" style={{backgroundColor: "#05386B"}}>
                                    View Full Article
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    }
}

export default AllArticlesPageComponent;