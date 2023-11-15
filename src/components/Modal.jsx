import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isVisible, onClose, onSave }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content" style={{ animation: 'fadeIn 0.5s' }}>
                <form onSubmit={onSave}>
                    <fieldset>
                        <legend>Days of Week:</legend>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <label key={day}>
                                <input type="checkbox" name="days" value={day} />
                                {day}
                            </label>
                        ))}
                    </fieldset>
                    <br/>
                    <label>
                        Time:
                        <input type="time" name="time" />
                    </label>
                    <br/>
                    <label>
                        Food Portion:
                        <input type="number" name="portion" />
                    </label>
                    <br/>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
