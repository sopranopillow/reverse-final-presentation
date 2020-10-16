import React from 'react';
import './Home.css';
import { Nav, Content } from '../Components';
import newImg from '../images/newImg.png';

const Home = () => {
  return (
    <div className="Home">
      <Nav location="Home"/>
      <Content>
        <div className="Content">
          <p style={{margin: '15px 0px', fontSize: 15}}>
            This is the home page of the Fall 2018 offering of CS 3360 at <a href="http://www.utep.edu/">The University of Texas at El Paso</a>
            , as taught by <a href="http://www.cs.utep.edu/cheon">Yoonsik Cheon</a>.
          </p>
          <Table/>
          <p style={{fontSize: '0.8em', color: '#888'}}>
            Last modified by <a href="http://www.cs.utep.edu/cheon">Yoonsik Cheon</a>: $Id: news.html,v 1.112 2020/10/12 00:08:27 cheon Exp $
          </p>
        </div>
      </Content>
    </div>
  );
}

const Table = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top"></td>
          <th>Date</th>
          <th>News</th>
        </tr>
        <tr>
          <td valign="top">
          <img src={newImg} alt="new news item"/>
          </td>
          <td valign="top">10/11</td>
          <td>Quiz 7 (OOP) is out and due by next Tuesday before class.</td>
        </tr>

        <tr>
          <td valign="top">
          <img src={newImg} alt="new news item"/>
          </td>
          <td valign="top">10/11</td>
          <td>HW1 grades are posted on the <a href="?page=grade">Grade</a> page.
              If you have questions re: your grade, talk to TA (Mali) first.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">10/04</td>
          <td>Quiz 6 (Data types) is out and due by next Tuesday before class.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">10/02</td>
          <td>Quiz 5 (Chap 5) is out and due by Thursday before class.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/26</td>
          <td>The PHP assignment is officially out, and the handout is available
              from the <a href="?page=homework">Homework</a> page.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/13</td>
          <td>Quiz 4 (PHP) is out and due by next Tuesday before class.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/11</td>
          <td>Please, refer to the <a href="?page=staff">Staff</a> page for
              TA/IA's office hours and contact information.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/11</td>
          <td>Please bring your laptop to this Thursday's class.
              We will configure a PHP development environment:
              Eclipse + PDT + PHP (see <a href="?page=misc">Misc</a> page).
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/11</td>
          <td>HW1 is out and is availalbe from the
              <a href="?page=homework">Homework</a> page.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/06</td>
          <td>Quiz 3 (Sec 3.4) is out and due by next Tuesday before class.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/04</td>
          <td>Quiz 2 (Sec 3.1-3.3) is out and due by this Thursday before class.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">9/04</td>
          <td>Quiz 1 grades are posted on the
              <a href="?page=grade">Grade</a> page.
          </td>
        </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">8/28</td>
          <td>The first quiz (Quiz 1) is now out and available on MoQuiz;
              it's due by next Tuesday before class. You will need to read
              Chapter 1 of the textbook.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">8/28</td>
          <td>Today's lecture note is available from the
              <a href="?page=notes">Lecture notes</a> page.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">8/23</td>
          <td>A draft course syllabus is available
              <a href="data/syllabus.pdf">[syllabus.pdf]</a>.
            </td>
          </tr>

        <tr>
          <td valign="top">
          </td>
          <td valign="top">8/23</td>
          <td>The textbook is Robert W. Sebesta's
            <cite>Concepts of Programming Languages</cite>
            (11th edition, Addison Wesley, 2015);
            if you can find a copy of the 12th edition, that will work too.
            The textbook should be available at the
            <a href="https://web.archive.org/web/20181022220845/http://www.utepbookstore.com/">UTEP bookstore</a>,
            and you are expected to acquire a copy for your use in this
            course, as reading assignments will be taken from the textbook
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Home;
