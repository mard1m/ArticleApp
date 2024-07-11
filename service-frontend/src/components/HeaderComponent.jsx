import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    doLogout() {
        
    }
    
    render() {
        return (
            <div>
                <style>
                    {`
                        header {
                            background-color: #5CDB95;
                            padding: 12px;
                        }

                        .navbar a {
                            text-decoration: none;
                            color: #05386B;
                            transition: color 0.3s; /* Добавляем плавный переход для цвета текста */
                        }

                        .navbar a:hover {
                            color: #FFFFFF; /* Изменяем цвет текста при наведении курсора на ссылку */
                        }
                    `}
                </style>
                <nav className="navbar navbar-expand-md navbar-dark">
                    <a className="d-block h1 font-weight-bold ml-5" href="/">DBlog</a>
                    <a className="d-block h2 font-weight-bold ml-5" href="/main">Profile</a>
                    <a className="d-block h2 font-weight-bold mr-5 ml-auto" href="/new-article">Write new Story</a>
                </nav>
            </div>

        )
    }
}

export default HeaderComponent