import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ArticleService from '../services/ArticleService';

class WriteNewArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                header: '',
                body: '',
            },
        };
    }

    handleContentChange = (e) => {
        this.setState({
            article: {
                ...this.state.article,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.article);
        ArticleService.createArticle(this.state.article).then((res) => {
            if (
                res.config !== null &&
                res.request != null &&
                res.config.url !== res.request.responseURL &&
                res.request.responseURL.includes('/login')
            ) {
                console.log(res.config);
                console.log(res.request);
                console.log(res.config.url);
                console.log(res.request.responseURL);
                document.location = res.request.responseURL;
            } else {
                console.log(res);
                console.log('data => ' + res.data);
                document.location = '../articles'
            }
        });
    };

    render() {
        const { header, body } = this.state.article;

        return (
            <div>
                <h1 style={{ color: '#05386B' }}>Write an Article</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label style={{ fontSize: '24px', color: '#05386B' }}>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the title of your article"
                            name="header"
                            value={header}
                            onChange={this.handleContentChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formContent">
                        <Form.Label style={{ fontSize: '18px', color: '#05386B' }}>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Write the content of your article"
                            name="body"
                            value={body}
                            onChange={this.handleContentChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit Article
                    </Button>
                </Form>
            </div>
        );
    }
}

export default WriteNewArticleComponent;
