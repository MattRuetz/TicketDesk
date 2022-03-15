import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
    // ticketId given as URL param
    const { ticketId } = useParams();

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
    }, [isError, message, ticketId]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket closed');
        navigate('/tickets');
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong...</h3>;
    }

    return (
        <div className="ticket-page">
            <header className="ticker-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <hr />
                <div className="ticket-desc">
                    <h3>
                        Product:{' '}
                        <span style={{ fontWeight: 400 }}>
                            {ticket.product}
                        </span>
                    </h3>
                    <h3>Issue Description:</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (
                <button
                    onClick={onTicketClose}
                    className="btn btn-block btn-danger"
                >
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;
