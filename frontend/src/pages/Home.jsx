import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
    return (
        <>
            <section className="heading">
                <h1>How can we help?</h1>
                <p>Please choose an option from the list:</p>
            </section>

            <Link to="/new-ticket" className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to="/tickets" className="btn btn-block">
                <FaTicketAlt /> View My Tickets
            </Link>
        </>
    );
}

export default Home;
