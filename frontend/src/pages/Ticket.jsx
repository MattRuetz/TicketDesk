import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const modalStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
};

// Connect modal to ROOT element
Modal.setAppElement('#root');

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('');

    // ticketId given as URL param
    const { ticketId } = useParams();

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.tickets
    );

    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.notes
    );

    // const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [isError, message, ticketId]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket closed');
        navigate('/tickets');
    };

    // Submit button handler
    const onNoteSubmit = (e) => {
        e.preventDefault();
        console.log('Subbed');
        closeModal();
    };

    // Toggle modal open
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    if (isLoading || notesIsLoading) {
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
                <h2>Notes</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button className="btn" onClick={openModal}>
                    <FaPlus />
                    Note
                </button>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>
                    ❌
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className="form-control"
                            placeholder="Note text..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
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
