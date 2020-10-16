import * as React from 'react';
import { Nav, Content } from '../Components';
import './Grades.css';

class Home extends React.Component {
    validateFiles = undefined;
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: '',
            password: '',
        }

        this.validateFiles = require(process.env.PUBLIC_URL + '/users/index.json');
    }

    render() {
        const table = <div>Hello</div>;
        const loggedIn = false;

        const validateUser = (event) => {
            console.log(this.validateFiles)
            event.preventDefault();
        }

        const handlePassword = (event) => {
            this.setState({
                password: event.target.value
            });
        }

        const handleUsername = (event) => {
            this.setState({
                username: event.target.value
            });
        }

        const LogInForm = (
            <form onSubmit={validateUser}>
                <div>
                    <div>Username</div>
                    <input onChange={handleUsername}/>
                </div>
                <div>
                    <div>Password</div>
                    <input onChange={handlePassword}/>
                </div>
                <input type="submit" value="Log in"/>
            </form>
        )

        return (
            <div className="Grades">
                <Nav location="Grades"/>
                <Content>
                    {loggedIn && table}
                    {!loggedIn && LogInForm}
                </Content>
            </div>
        );
    }
}

export default Home;