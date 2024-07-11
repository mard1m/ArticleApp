import React, {Component} from 'react';
import UserService from "../services/UserService";

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                username: '',
                name: '',
                password: '',
                photoBytes: '',
                articleIds: [],
                role: [],
            },
        };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        await UserService.getCurrentUser().then((res) => {
            if (res.config !== null && res.request != null && res.config.url !== res.request.responseURL && res.request.responseURL.includes('/login')) {
                console.log(res);
                document.location = res.request.responseURL;
            } else {
                console.log(res);
                console.log('data => ' + res.data);
                this.setState({
                    user: res.data,
                });
                console.log('data after => ' );
                console.log(this.state.user);
            }
        })
    };

    render() {

        return (
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card" style={{ backgroundColor: "#8EE4AF" }}>
                                <div className="card-body text-center rounded-5">
                                    {this.state.user != null ? (
                                        <div>
                                            <img
                                                src={`data:image/png;base64,${this.state.user.photoBytes}`}
                                                alt="Avatar"
                                                className="img-fluid rounded-circle"
                                            />
                                            <h2 className="mt-3">{this.state.user.name}</h2>
                                            <h2 className={"fw-bold"} style={{ color: "#05386B" }}>Username: {this.state.user.username}</h2>
                                            <h2 className={"fw-bold"} style={{ color: "#05386B" }}>Number of Articles: {this.state.user.articleIds.length}</h2>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComponent;