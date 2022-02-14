import { useContext } from 'react';
import AppContext from '../App/Context';
import './StaffDetails.scss';

function StaffDetails() {
    const [{ lastStaffDetails }] = useContext(AppContext);

    if (!lastStaffDetails) return <div />;

    return (
        <section className="staff-details-container">
            <h2 className="staff-details-title">Staff Info</h2>
            <p className="staff-home-town">
                <b>Home town:</b>
                { ` ${lastStaffDetails.homeTown}` }
            </p>
            <p className="staff-age">
                <b>Age:</b>
                { ` ${lastStaffDetails.age}` }
            </p>
        </section>
    );
}

export default StaffDetails;
