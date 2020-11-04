/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Nav, Content } from '../Components';
import './Grades.css';
import { csvToJson, jsonToCsv } from '../Parser';
import FileSaver from 'file-saver';

class Home extends React.Component {
    validateFiles = undefined;
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: '',
            password: '',
            fileName: '',
            updateFileName: '',
            type: '',
        }

        this.handleSubmit = this.uploadFile.bind(this);
        this.fileInput = React.createRef();

        this.validateFiles = require('../../public/users/index.json');
    }

    uploadFile = (event) => {
        event.preventDefault();

        const { updateFileName } = this.state;
        const file = this.fileInput.current.files[0];
        const reader = new FileReader()

        reader.readAsText(file);

        reader.onload = function() {
            const csv = reader.result;
            const json = csvToJson(csv);
            const path = '../../public/users/';

            const jsonFile = new File([new Blob([json], {type: 'text/json'})], `${updateFileName}.json`);
            FileSaver.saveAs(jsonFile);
        };
    }

    render() {
        const UserTable = () => {
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

        const downloadFile = (data, fileName) => {
            const csv = jsonToCsv(data);
            const file = new File([new Blob([csv], {type: 'text/csv'})], `${fileName}.csv`);
            FileSaver.saveAs(file);
        }

        const DisplayStudents = () => {
            const users = Object.keys(this.validateFiles.userList);
            return(
                <table className="table">
                    <tr>
                        <th>Student</th>
                    </tr>
                    <tbody>
                        {users.map(user => {
                            if (this.validateFiles.userList[user].type !== "admin"){
                                const fileName = this.validateFiles.userList[user].file;
                                const data = require('../../public/users/' + fileName + '.json');
                                return (
                                    <tr>
                                        <td><a href="#" onClick={() => downloadFile(data, fileName)}>{user}</a></td>
                                    </tr>
                                );
                            }
                            return <></>;
                        })}
                    </tbody>
                </table>
            )
        }

        const validateUser = (event) => {
            const { username, password } = this.state;
            const { userList } = this.validateFiles;
            const userListKeys = Object.keys(userList);

            if (userListKeys.includes(username) && userList[username].password === password){
                this.setState({
                    loggedIn: true,
                    fileName: userList[username].file,
                    type: userList[username].type
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

        const handleUploadFileName = (event) => {
            this.setState({
                updateFileName: event.target.value
            });
        }

        const LogInForm = (
            <form className="form" onSubmit={validateUser}>
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

        const UpdateGrade = (
            <form className="form" onSubmit={this.uploadFile}>
                <div className="formItem">
                    <div>File Name</div>
                    <input onChange={handleUploadFileName}/>
                </div>
                <div className="formItem">
                    <div>Upload file</div>
                    <input className="formItem" type="file" ref={this.fileInput} />
                </div>
                <input className="formItem" type="submit" value="Upload File"/>
            </form>
        );

        return (
            <div className="Grades">
                <Nav location="Grades"/>
                <Content>
                    <div className="data">
                        {this.state.loggedIn ?
                            (this.state.type === "admin" ?
                                <>
                                    <DisplayStudents/>
                                    {UpdateGrade}
                                </>
                            : <UserTable/>)
                        : LogInForm}
                    </div>
                </Content>
            </div>
        );
    }
}

export default Home;