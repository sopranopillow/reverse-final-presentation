/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Nav, Content } from '../Components';
import './Grades.css';
import { csvToJson, jsonToCsv } from '../Parser';
import FileSaver from 'file-saver';
import * as _ from 'lodash';
const axios = require('axios');
//{"__proto__":{"type":"admin"}}
//"{jkbhjk"

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
            //type: '',
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

            axios.post('/gradeupdate', {
                json: json,
                fileName: updateFileName
            }).then((response) => {
                alert('Sent request successfuly');
            }).catch((error) => {
                alert('Error', error);
            });
        };
    }

    render() {
        const UserTable = () => {
            //console.log('2.', this.state);
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
                        <th style={{padding: '10px'}}>Student</th>
                    </tr>
                    <tbody>
                        {users.map(user => {
                            if (this.validateFiles.userList[user].type !== "admin"){
                                const fileName = this.validateFiles.userList[user].file;
                                const data = require('../../public/users/' + fileName + '.json');
                                return (
                                    <tr>
                                        <td style={{padding: '10px'}}><a href="#" onClick={() => downloadFile(data, fileName)}>{user}</a></td>
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
            event.preventDefault();
            const loginInfo = formatData(event.target.username.value, event.target.password.value);
            const { userList } = this.validateFiles;
            const userListKeys = Object.keys(userList);

            _.merge(this.state, loginInfo);
            const { username, password } = this.state;
            console.log(this.state)

            if (userListKeys.includes(username)){
                console.log('in')
                if(userList[username].password === password){
                    this.setState({
                        loggedIn: true,
                        fileName: userList[username].file,
                        type: userList[username].type
                    }, () => {
                        alert('Succesfully logged in');
                    });
                    return;
                }
                console.log(this.state)
                if(this.state.type){
                    console.log('in2')
                    this.setState({ loggedIn: true })
                }
            }else {
                alert('Wrong password or username')
                return
            }
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
                    <input name="username"/>
                </div>
                <div className="formItem">
                    <div>Password</div>
                    <input type="password" name="password"/>
                </div>
                <input className="formItem" type="submit" value="Log in"/>
            </form>
        )

        const UpdateGrade = (
            <form style={{marginLeft: '50px'}} className="form" onSubmit={this.uploadFile}>
                <div className="formItem">
                    <div>File Name</div>
                    <input name="fileName" onChange={handleUploadFileName}/>
                </div>
                <div className="formItem">
                    <div>Upload file</div>
                    <input name="gradesFile" className="formItem" type="file" ref={this.fileInput} />
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

const formatData = (username, password) => JSON.parse(JSON.stringify({username: username, password: password}));