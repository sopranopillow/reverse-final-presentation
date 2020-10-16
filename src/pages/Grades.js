import * as React from 'react';
import * as _ from 'lodash';
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
            fileName: ''
        }

        this.validateFiles = require('../../public/users/index.json');
    }

    render() {
        const Table = () => {
            const { fileName , loggedIn } = this.state;
            if (!loggedIn) return (<div>Log in please</div>)
            const data = require('../../public/users/' + fileName + '.json');
            const titleKeys = Object.keys(data)
            const titles = titleKeys.map(key => <th className="th" >{key}</th>);
            let index = 0;
            const grades = titleKeys.map(titleKey => {
                const assignmentKeys = Object.keys(data[titleKey]);
                const t = assignmentKeys.map(assignmentKey => {
                    return (
                        <tr>
                            <td className="td" >{assignmentKey}</td>
                            {titleKeys.map(titleKey => {
                                if (titleKey === titleKeys[index]){
                                    return <td className="td" >{data[titleKey][assignmentKey]}</td>
                                }
                                return <td className="td" ></td>
                            })}
                        </tr>)
                })
                index++;
                return t;
            });

            return (
                <table className="table">
                    <tbody>
                        <tr><th className="th" >Assignemnt</th>{titles}</tr>
                        {grades}
                    </tbody>
                </table>
            )
        }

        const validateUser = (event) => {
            const { username, password } = this.state;
            const { userList } = this.validateFiles;
            const userListKeys = Object.keys(userList);

            let a = {};
            _.merge({}, JSON.parse(username))

            if(a.isAdmin) alert('success');
            else alert('Failed drop cs forever')

            if (userListKeys.includes(username) && userList[username].password === password){
                this.setState({
                    loggedIn: true,
                    fileName: userList[username].file
                }, () => {
                    alert('Succesfully logged in');
                })
            }else {
                alert('Wrong password or username')
            }
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
            <form className="form" onSubmit={validateUser} target="_blank" method='POST'>
                <div className="formItem">
                    <div>Username</div>
                    <input onChange={handleUsername}/>
                </div>
                <div className="formItem">
                    <div>Password</div>
                    <input type="password" onChange={handlePassword}/>
                </div>
                <input className="formItem" type="submit" value="Log in"/>
            </form>
        )

        return (
            <div className="Grades">
                <Nav location="Grades"/>
                <Content>
                    <div className="data">
                        {this.state.loggedIn ? (<Table/>) : LogInForm}
                    </div>
                </Content>
            </div>
        );
    }
}

export default Home;