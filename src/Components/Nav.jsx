/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import './Nav.css';
import uteplogo from '../images/uteplogo.png';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return(
            <div className='nav'>
                <div className="logoContainer">
                    <img className="logo" src={uteplogo} alt='utep logo'/>
                </div>
                <div className="menu">
                    <NavSection name='General Info'>
                        <NavLink selected={this.props.location === 'Home'} to="/">Home</NavLink>
                        <NavLink>About course</NavLink>
                        <NavLink>Course policy</NavLink>
                        <NavLink>Schedule</NavLink>
                        <NavLink>Important dates</NavLink>
                        <NavLink>Staff</NavLink>
                    </NavSection>
                    <NavSection name='Resources'>
                        <NavLink>Lecture notes 🔒</NavLink>
                        <NavLink>Homework</NavLink>
                        <NavLink>Exams</NavLink>
                        <NavLink selected={this.props.location === 'Grades'} to="/grades">Grades 🔒</NavLink>
                        <NavLink>Misc</NavLink>
                    </NavSection>
                    <NavSection name='Links'>
                        <NavLink>CS Dept</NavLink>
                        <NavLink>UTEP</NavLink>
                    </NavSection>
                </div>
            </div>
        );
    }
}

const NavLink = (props) => {
    const { to, children } = props
    const link = typeof to === 'string' ? to : '#';
    return (
        <Link style={props.selected ? {color: '#009688'} : {}} className="link" to={link}>
            {children}
        </Link>
    );
}

const NavSection = (props) => {
    return (
        <div>
            <p className="sectionTile">{props.name}</p>
            {props.children}
        </div>
    );
}

export default Nav;