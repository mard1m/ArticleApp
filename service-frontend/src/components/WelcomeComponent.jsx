import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class WelcomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null, // Информация о пользователе, если он вошел в систему
        };
    }

    render() {
        return (
            <div
                style={{
                    backgroundSize: 'cover',
                    color: '#000000',
                    padding: '20px',
                    textAlign: 'center',
                    height: '100vh', // Высота на весь экран
                }}
            >
                <Container style={{ backgroundColor: 'rgba(196,217,217,0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', padding: "24px"}}>
                        <h1>Welcome to DBlog</h1>
                        <p>Explore the latest articles, share your thoughts, and be part of the DBlog community.</p>
                        <Button variant="dark" href="/articles">
                            Explore Articles
                        </Button>
                </Container>
            </div>
        );
    }

    handleLogout = () => {
        // Реализуйте логику выхода из системы, если необходимо
        this.setState({ user: null });
    };
}

export default WelcomePage;
